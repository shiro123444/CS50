import { unlink, readdir, stat } from 'fs/promises';
import { join, basename } from 'path';

/**
 * GitBook-specific file patterns to identify and remove
 */
const GITBOOK_PATTERNS = {
  // Root level GitBook files
  rootFiles: [
    '.gitbook.yaml',
    'SUMMARY.md'
  ],
  
  // GitBook-related documentation files (in docs/resources)
  docPatterns: [
    'GITBOOK_SETUP_GUIDE.md',
    'GITBOOK_QUICK_REFERENCE.md',
    'GITBOOK_COMMENTS_SOLUTION.md',
    'check-gitbook-ready.md'
  ],
  
  // Directories that might contain GitBook content
  directories: [
    '.gitbook'
  ]
};

/**
 * Identify GitBook-related files in the project
 * @param {string} projectRoot - Root directory of the project
 * @returns {Promise<string[]>} Array of file paths to remove
 */
export async function identifyGitbookFiles(projectRoot) {
  const filesToRemove = [];

  // Check root level files
  for (const file of GITBOOK_PATTERNS.rootFiles) {
    const filePath = join(projectRoot, file);
    try {
      await stat(filePath);
      filesToRemove.push(filePath);
    } catch {
      // File doesn't exist, skip
    }
  }

  // Check docs/resources for GitBook documentation
  const resourcesDir = join(projectRoot, 'docs', 'resources');
  try {
    const entries = await readdir(resourcesDir);
    for (const entry of entries) {
      if (GITBOOK_PATTERNS.docPatterns.some(pattern => entry === pattern)) {
        filesToRemove.push(join(resourcesDir, entry));
      }
    }
  } catch (error) {
    console.warn(`Could not scan resources directory: ${error.message}`);
  }

  // Check resources directory (duplicate location)
  const altResourcesDir = join(projectRoot, 'resources');
  try {
    const entries = await readdir(altResourcesDir);
    for (const entry of entries) {
      if (GITBOOK_PATTERNS.docPatterns.some(pattern => entry === pattern)) {
        filesToRemove.push(join(altResourcesDir, entry));
      }
    }
  } catch (error) {
    // Directory might not exist
  }

  return filesToRemove;
}

/**
 * Check if a file is a VitePress configuration or user content
 * @param {string} filePath - Path to check
 * @returns {boolean} True if file should be preserved
 */
function shouldPreserve(filePath) {
  const preservePatterns = [
    '.vitepress',
    'vitepress',
    'package.json',
    'node_modules',
    'courses/chapter-',
    'courses/Week',
    'public/images',
    'VITEPRESS_QUICKSTART.md',
    'GITHUB_PAGES_SETUP.md',
    'GITHUB_ACTIONS_SETUP.md',
    'ENABLE_GITHUB_PAGES.md',
    'ENABLE_DISCUSSIONS.md',
    'GISCUS_SETUP.md',
    'DEPLOYMENT_TEST_CHECKLIST.md',
    'learning-resources.md'
  ];

  return preservePatterns.some(pattern => filePath.includes(pattern));
}

/**
 * Clean up GitBook files from the project
 * @param {string[]} files - Array of file paths to remove
 * @param {boolean} dryRun - If true, only report what would be deleted
 * @returns {Promise<Object>} Cleanup result
 */
export async function cleanupGitbookFiles(files, dryRun = false) {
  const result = {
    deletedFiles: [],
    skippedFiles: [],
    errors: []
  };

  for (const filePath of files) {
    try {
      // Safety check: don't delete VitePress files
      if (shouldPreserve(filePath)) {
        result.skippedFiles.push({
          path: filePath,
          reason: 'Preserved (VitePress or user content)'
        });
        continue;
      }

      if (dryRun) {
        result.deletedFiles.push(filePath);
        console.log(`[DRY RUN] Would delete: ${filePath}`);
      } else {
        await unlink(filePath);
        result.deletedFiles.push(filePath);
        console.log(`Deleted: ${filePath}`);
      }
    } catch (error) {
      result.errors.push({
        path: filePath,
        error: error.message
      });
      console.error(`Error deleting ${filePath}:`, error.message);
    }
  }

  return result;
}

/**
 * Execute full GitBook cleanup process
 * @param {string} projectRoot - Root directory of the project
 * @param {boolean} dryRun - If true, only report what would be deleted
 * @returns {Promise<Object>} Cleanup result with summary
 */
export async function executeCleanup(projectRoot, dryRun = false) {
  console.log('Starting GitBook cleanup...');
  console.log(`Project root: ${projectRoot}`);
  
  if (dryRun) {
    console.log('DRY RUN MODE - No files will be deleted');
  }

  // Identify files
  const filesToRemove = await identifyGitbookFiles(projectRoot);
  console.log(`Found ${filesToRemove.length} GitBook-related files`);

  // Clean up files
  const result = await cleanupGitbookFiles(filesToRemove, dryRun);

  // Summary
  console.log('\n=== Cleanup Summary ===');
  console.log(`Files deleted: ${result.deletedFiles.length}`);
  console.log(`Files skipped: ${result.skippedFiles.length}`);
  console.log(`Errors: ${result.errors.length}`);

  if (result.deletedFiles.length > 0) {
    console.log('\nDeleted files:');
    result.deletedFiles.forEach(file => console.log(`  - ${file}`));
  }

  if (result.errors.length > 0) {
    console.log('\nErrors:');
    result.errors.forEach(err => console.log(`  - ${err.path}: ${err.error}`));
  }

  return result;
}
