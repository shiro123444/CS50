import { readdir, stat, copyFile, mkdir, readFile, access } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { createHash } from 'crypto';
import { constants } from 'fs';

/**
 * Recursively scan directory for files matching a pattern
 * @param {string} dir - Directory to scan
 * @param {string} extension - File extension to match (e.g., '.md')
 * @param {string[]} ignorePatterns - Patterns to ignore
 * @returns {Promise<string[]>} Array of file paths
 */
export async function scanFiles(dir, extension = '.md', ignorePatterns = []) {
  const files = [];

  async function scan(currentDir) {
    try {
      const entries = await readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(currentDir, entry.name);

        // Check if path matches any ignore pattern
        if (shouldIgnore(fullPath, ignorePatterns)) {
          continue;
        }

        if (entry.isDirectory()) {
          await scan(fullPath);
        } else if (entry.isFile() && extname(entry.name) === extension) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${currentDir}:`, error.message);
    }
  }

  await scan(dir);
  return files;
}

/**
 * Check if a path should be ignored based on patterns
 * @param {string} path - Path to check
 * @param {string[]} patterns - Ignore patterns
 * @returns {boolean} True if path should be ignored
 */
function shouldIgnore(path, patterns) {
  return patterns.some(pattern => {
    // Simple wildcard matching
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(path);
    }
    return path.includes(pattern);
  });
}

/**
 * Get file metadata
 * @param {string} filePath - Path to file
 * @returns {Promise<Object>} File metadata
 */
export async function getFileMetadata(filePath) {
  try {
    const stats = await stat(filePath);
    return {
      path: filePath,
      lastModified: stats.mtime,
      size: stats.size,
      exists: true
    };
  } catch (error) {
    return {
      path: filePath,
      exists: false,
      error: error.message
    };
  }
}

/**
 * Calculate file hash for change detection
 * @param {string} filePath - Path to file
 * @returns {Promise<string>} File hash
 */
export async function calculateFileHash(filePath) {
  try {
    const content = await readFile(filePath);
    return createHash('md5').update(content).digest('hex');
  } catch (error) {
    console.error(`Error calculating hash for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Copy file with directory creation
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 * @returns {Promise<boolean>} True if successful
 */
export async function copyFileWithDirs(source, destination) {
  try {
    // Ensure destination directory exists
    const destDir = dirname(destination);
    await mkdir(destDir, { recursive: true });

    // Copy file
    await copyFile(source, destination);
    return true;
  } catch (error) {
    console.error(`Error copying ${source} to ${destination}:`, error.message);
    return false;
  }
}

/**
 * Check if file exists and is accessible
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>} True if file exists and is readable
 */
export async function fileExists(filePath) {
  try {
    await access(filePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if file needs to be synced based on modification time
 * @param {string} sourcePath - Source file path
 * @param {string} targetPath - Target file path
 * @returns {Promise<boolean>} True if file should be synced
 */
export async function shouldSyncFile(sourcePath, targetPath) {
  try {
    const targetExists = await fileExists(targetPath);
    
    if (!targetExists) {
      return true; // Target doesn't exist, needs sync
    }

    const sourceStats = await stat(sourcePath);
    const targetStats = await stat(targetPath);

    // Sync if source is newer than target
    return sourceStats.mtime > targetStats.mtime;
  } catch (error) {
    console.error(`Error checking sync status:`, error.message);
    return true; // On error, sync to be safe
  }
}

/**
 * Ensure directory exists
 * @param {string} dirPath - Directory path
 * @returns {Promise<boolean>} True if successful
 */
export async function ensureDir(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error.message);
    return false;
  }
}
