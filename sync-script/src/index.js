#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { loadConfig, validateConfig } from './config.js';
import { executeCleanup } from './cleanup.js';
import { syncAllDocuments } from './document-sync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate comprehensive sync report
 * @param {Object} cleanupResult - Cleanup operation result
 * @param {Object} syncResult - Sync operation result
 * @returns {Object} Complete sync report
 */
function generateReport(cleanupResult, syncResult) {
  const report = {
    timestamp: new Date().toISOString(),
    cleanup: {
      filesDeleted: cleanupResult?.deletedFiles?.length || 0,
      filesSkipped: cleanupResult?.skippedFiles?.length || 0,
      errors: cleanupResult?.errors?.length || 0
    },
    sync: {
      documentsSynced: syncResult.synced.length,
      documentsSkipped: syncResult.skipped.length,
      imagesMigrated: syncResult.totalImages,
      warnings: syncResult.totalWarnings.length,
      errors: syncResult.errors.length
    },
    summary: {
      totalOperations: (cleanupResult?.deletedFiles?.length || 0) + syncResult.synced.length,
      successCount: (cleanupResult?.deletedFiles?.length || 0) + syncResult.synced.length,
      errorCount: (cleanupResult?.errors?.length || 0) + syncResult.errors.length
    }
  };

  return report;
}

/**
 * Display sync report
 * @param {Object} report - Sync report to display
 */
function displayReport(report) {
  console.log('\n' + '='.repeat(50));
  console.log('SYNC REPORT');
  console.log('='.repeat(50));
  console.log(`Timestamp: ${report.timestamp}`);
  console.log('');
  
  if (report.cleanup.filesDeleted > 0 || report.cleanup.errors > 0) {
    console.log('GitBook Cleanup:');
    console.log(`  Files deleted: ${report.cleanup.filesDeleted}`);
    console.log(`  Files skipped: ${report.cleanup.filesSkipped}`);
    console.log(`  Errors: ${report.cleanup.errors}`);
    console.log('');
  }
  
  console.log('Document Sync:');
  console.log(`  Documents synced: ${report.sync.documentsSynced}`);
  console.log(`  Documents skipped: ${report.sync.documentsSkipped}`);
  console.log(`  Images migrated: ${report.sync.imagesMigrated}`);
  console.log(`  Warnings: ${report.sync.warnings}`);
  console.log(`  Errors: ${report.sync.errors}`);
  console.log('');
  
  console.log('Summary:');
  console.log(`  Total operations: ${report.summary.totalOperations}`);
  console.log(`  Successful: ${report.summary.successCount}`);
  console.log(`  Failed: ${report.summary.errorCount}`);
  console.log('='.repeat(50));
}

/**
 * Main sync function
 * @param {Object} options - Sync options
 */
async function main(options = {}) {
  const {
    skipCleanup = false,
    dryRun = false,
    configPath = null
  } = options;

  console.log('Obsidian to VitePress Sync Tool');
  console.log('================================\n');

  try {
    // Load configuration
    console.log('Loading configuration...');
    const config = await loadConfig(configPath);
    
    // Validate configuration
    const validation = validateConfig(config);
    if (!validation.isValid) {
      console.error('Configuration validation failed:');
      validation.errors.forEach(err => console.error(`  - ${err}`));
      process.exit(1);
    }
    
    if (validation.warnings.length > 0) {
      console.warn('Configuration warnings:');
      validation.warnings.forEach(warn => console.warn(`  - ${warn}`));
    }
    
    console.log('Configuration loaded successfully\n');

    // Get project root (parent of sync-script directory)
    const projectRoot = join(__dirname, '..', '..');
    
    // Convert relative paths to absolute paths
    const absoluteConfig = {
      ...config,
      targetDocsDir: join(projectRoot, config.targetDocsDir),
      targetImagesDir: join(projectRoot, config.targetImagesDir)
    };
    
    let cleanupResult = null;
    
    // Execute GitBook cleanup (optional)
    if (!skipCleanup) {
      console.log('Step 1: GitBook Cleanup');
      console.log('-'.repeat(50));
      cleanupResult = await executeCleanup(projectRoot, dryRun);
      console.log('');
    } else {
      console.log('Skipping GitBook cleanup\n');
    }

    // Execute document sync
    console.log('Step 2: Document Synchronization');
    console.log('-'.repeat(50));
    const syncResult = await syncAllDocuments(absoluteConfig);
    console.log('');

    // Generate and display report
    const report = generateReport(cleanupResult, syncResult);
    displayReport(report);

    // Exit with appropriate code
    if (report.summary.errorCount > 0) {
      console.log('\n⚠ Sync completed with errors');
      process.exit(1);
    } else {
      console.log('\n✓ Sync completed successfully');
      process.exit(0);
    }

  } catch (error) {
    console.error('\n✗ Fatal error during sync:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  skipCleanup: args.includes('--skip-cleanup'),
  dryRun: args.includes('--dry-run'),
  configPath: null
};

// Check for custom config path
const configIndex = args.indexOf('--config');
if (configIndex !== -1 && args[configIndex + 1]) {
  options.configPath = args[configIndex + 1];
}

// Display help
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Obsidian to VitePress Sync Tool

Usage: npm run sync [options]

Options:
  --skip-cleanup    Skip GitBook cleanup step
  --dry-run         Preview changes without making them
  --config <path>   Use custom configuration file
  --help, -h        Display this help message

Examples:
  npm run sync
  npm run sync -- --skip-cleanup
  npm run sync -- --dry-run
  npm run sync -- --config ./custom-config.json
  `);
  process.exit(0);
}

// Run main function
main(options);
