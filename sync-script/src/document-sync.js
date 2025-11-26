import { readFile, writeFile } from 'fs/promises';
import { join, relative, dirname, basename } from 'path';
import { scanFiles, shouldSyncFile, ensureDir } from './fs-utils.js';
import { migrateImages } from './image-migration.js';

/**
 * Scan Obsidian directory for Markdown files
 * @param {string} sourceDir - Obsidian source directory
 * @param {string[]} ignorePatterns - Patterns to ignore
 * @returns {Promise<string[]>} Array of markdown file paths
 */
export async function scanMarkdownFiles(sourceDir, ignorePatterns = []) {
  return await scanFiles(sourceDir, '.md', ignorePatterns);
}

/**
 * Determine if a file should be synced based on modification time
 * @param {string} sourceFile - Source file path
 * @param {string} targetFile - Target file path
 * @returns {Promise<boolean>} True if file should be synced
 */
export async function shouldSync(sourceFile, targetFile) {
  return await shouldSyncFile(sourceFile, targetFile);
}

/**
 * Transform source path to target path based on directory mapping
 * @param {string} sourcePath - Source file path
 * @param {string} sourceDir - Source directory root
 * @param {string} targetDir - Target directory root
 * @param {Object} directoryMapping - Directory mapping rules
 * @returns {string} Target file path
 */
export function transformPath(sourcePath, sourceDir, targetDir, directoryMapping = {}) {
  // Get relative path from source directory
  const relativePath = relative(sourceDir, sourcePath);
  
  // For now, use simple mapping - preserve directory structure
  // Future enhancement: apply custom directory mapping rules
  const targetPath = join(targetDir, relativePath);
  
  return targetPath;
}

/**
 * Sync a single document with image migration
 * @param {string} sourcePath - Source document path
 * @param {string} targetPath - Target document path
 * @param {string} attachmentDir - Obsidian attachment directory
 * @param {string} targetImagesDir - VitePress images directory
 * @returns {Promise<Object>} Sync result
 */
export async function syncDocument(sourcePath, targetPath, attachmentDir, targetImagesDir) {
  const result = {
    success: false,
    sourcePath,
    targetPath,
    imagesMigrated: 0,
    imagesSkipped: 0,
    warnings: [],
    error: null
  };

  try {
    // Read source document
    let content = await readFile(sourcePath, 'utf-8');
    
    // Migrate images and update content
    const migrationResult = await migrateImages(content, attachmentDir, targetImagesDir);
    let updatedContent = migrationResult.updatedContent;
    
    // Add Giscus comment component if not already present
    if (!updatedContent.includes('<Giscus')) {
      updatedContent += '\n\n<Giscus />\n';
    }
    
    // Ensure target directory exists
    const targetDir = dirname(targetPath);
    await ensureDir(targetDir);
    
    // Write updated content to target
    await writeFile(targetPath, updatedContent, 'utf-8');
    
    result.success = true;
    result.imagesMigrated = migrationResult.copied.length;
    result.imagesSkipped = migrationResult.skipped.length;
    result.warnings = migrationResult.warnings;
    
  } catch (error) {
    result.error = error.message;
    console.error(`Error syncing ${sourcePath}:`, error.message);
  }

  return result;
}

/**
 * Sync all documents from source to target
 * @param {Object} config - Sync configuration
 * @returns {Promise<Object>} Sync results
 */
export async function syncAllDocuments(config) {
  const {
    obsidianDir,
    attachmentDir,
    targetDocsDir,
    targetImagesDir,
    ignorePatterns,
    directoryMapping
  } = config;

  const result = {
    synced: [],
    skipped: [],
    errors: [],
    totalImages: 0,
    totalWarnings: []
  };

  console.log('Starting document synchronization...');
  console.log(`Source: ${obsidianDir}`);
  console.log(`Target: ${targetDocsDir}`);

  try {
    // Scan for markdown files
    const sourceFiles = await scanMarkdownFiles(obsidianDir, ignorePatterns);
    console.log(`Found ${sourceFiles.length} markdown files`);

    // Process each file
    for (const sourceFile of sourceFiles) {
      try {
        // Transform path
        const targetFile = transformPath(
          sourceFile,
          obsidianDir,
          targetDocsDir,
          directoryMapping
        );

        // Check if sync is needed
        const needsSync = await shouldSync(sourceFile, targetFile);
        
        if (!needsSync) {
          result.skipped.push({
            source: sourceFile,
            target: targetFile,
            reason: 'File is up to date'
          });
          console.log(`Skipped (up to date): ${basename(sourceFile)}`);
          continue;
        }

        // Sync document
        console.log(`Syncing: ${basename(sourceFile)}`);
        const syncResult = await syncDocument(
          sourceFile,
          targetFile,
          attachmentDir,
          targetImagesDir
        );

        if (syncResult.success) {
          result.synced.push({
            source: sourceFile,
            target: targetFile,
            imagesMigrated: syncResult.imagesMigrated,
            imagesSkipped: syncResult.imagesSkipped
          });
          result.totalImages += syncResult.imagesMigrated;
          result.totalWarnings.push(...syncResult.warnings);
          
          console.log(`  ✓ Synced successfully`);
          if (syncResult.imagesMigrated > 0) {
            console.log(`  ✓ Migrated ${syncResult.imagesMigrated} images`);
          }
          if (syncResult.warnings.length > 0) {
            syncResult.warnings.forEach(w => console.log(`  ⚠ ${w}`));
          }
        } else {
          result.errors.push({
            source: sourceFile,
            target: targetFile,
            error: syncResult.error
          });
          console.log(`  ✗ Failed: ${syncResult.error}`);
        }

      } catch (error) {
        result.errors.push({
          source: sourceFile,
          error: error.message
        });
        console.error(`Error processing ${sourceFile}:`, error.message);
        // Continue with next file (error isolation)
      }
    }

  } catch (error) {
    console.error('Fatal error during sync:', error.message);
    throw error;
  }

  // Summary
  console.log('\n=== Sync Summary ===');
  console.log(`Documents synced: ${result.synced.length}`);
  console.log(`Documents skipped: ${result.skipped.length}`);
  console.log(`Images migrated: ${result.totalImages}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.totalWarnings.length}`);

  return result;
}
