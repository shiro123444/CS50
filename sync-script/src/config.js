import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  obsidianDir: 'D:\\myobsidian\\myobsidian\\CS50',
  attachmentDir: 'D:\\myobsidian\\myobsidian\\附件',
  targetDocsDir: 'docs/courses',
  targetImagesDir: 'docs/public/images',
  ignorePatterns: ['*.tmp', '.obsidian', 'node_modules', '.git'],
  directoryMapping: {
    default: 'chapter-{index}'
  }
};

/**
 * Load configuration from file or use defaults
 * @param {string} configPath - Path to configuration file
 * @returns {Promise<Object>} Configuration object
 */
export async function loadConfig(configPath = null) {
  const defaultPath = join(__dirname, '..', 'sync-config.json');
  const pathToUse = configPath || defaultPath;

  try {
    if (!existsSync(pathToUse)) {
      console.warn(`Configuration file not found at ${pathToUse}, using default configuration`);
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = await readFile(pathToUse, 'utf-8');
    const userConfig = JSON.parse(fileContent);
    
    // Merge with defaults to ensure all required fields exist
    const config = {
      ...DEFAULT_CONFIG,
      ...userConfig,
      // Deep merge for nested objects
      directoryMapping: {
        ...DEFAULT_CONFIG.directoryMapping,
        ...(userConfig.directoryMapping || {})
      },
      ignorePatterns: userConfig.ignorePatterns || DEFAULT_CONFIG.ignorePatterns
    };

    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(`Invalid JSON in configuration file: ${error.message}`);
      console.warn('Using default configuration');
      return { ...DEFAULT_CONFIG };
    }
    throw error;
  }
}

/**
 * Validate configuration object
 * @param {Object} config - Configuration to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
export function validateConfig(config) {
  const errors = [];
  const warnings = [];

  // Check required string fields
  const requiredFields = [
    'obsidianDir',
    'attachmentDir', 
    'targetDocsDir',
    'targetImagesDir'
  ];

  for (const field of requiredFields) {
    if (!config[field] || typeof config[field] !== 'string') {
      errors.push(`Missing or invalid required field: ${field}`);
    }
  }

  // Check ignorePatterns is an array
  if (config.ignorePatterns && !Array.isArray(config.ignorePatterns)) {
    errors.push('ignorePatterns must be an array');
  }

  // Check directoryMapping is an object
  if (config.directoryMapping && typeof config.directoryMapping !== 'object') {
    errors.push('directoryMapping must be an object');
  }

  // Check if paths exist (warnings only, not errors)
  if (config.obsidianDir && !existsSync(config.obsidianDir)) {
    warnings.push(`Obsidian directory does not exist: ${config.obsidianDir}`);
  }

  if (config.attachmentDir && !existsSync(config.attachmentDir)) {
    warnings.push(`Attachment directory does not exist: ${config.attachmentDir}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get default configuration
 * @returns {Object} Default configuration object
 */
export function getDefaultConfig() {
  return { ...DEFAULT_CONFIG };
}
