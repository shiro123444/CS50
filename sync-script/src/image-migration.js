import { basename, join, extname } from 'path';
import { copyFileWithDirs, fileExists } from './fs-utils.js';

/**
 * Regular expressions for different image reference formats
 */
const IMAGE_PATTERNS = {
  // Obsidian wiki-style: ![[image.png]]
  wikiStyle: /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg|webp|bmp))\]\]/gi,
  
  // Standard markdown: ![alt](path/to/image.png)
  markdown: /!\[([^\]]*)\]\(([^)]+\.(png|jpg|jpeg|gif|svg|webp|bmp))\)/gi,
  
  // HTML img tag: <img src="path/to/image.png" />
  html: /<img[^>]+src=["']([^"']+\.(png|jpg|jpeg|gif|svg|webp|bmp))["'][^>]*>/gi
};

/**
 * Extract all image references from markdown content
 * @param {string} content - Markdown content to parse
 * @returns {Array<Object>} Array of image references
 */
export function extractImageReferences(content) {
  const references = [];
  const seen = new Set(); // Avoid duplicates

  // Extract wiki-style references: ![[image.png]]
  let match;
  const wikiRegex = new RegExp(IMAGE_PATTERNS.wikiStyle.source, IMAGE_PATTERNS.wikiStyle.flags);
  while ((match = wikiRegex.exec(content)) !== null) {
    const fileName = match[1];
    if (!seen.has(fileName)) {
      references.push({
        type: 'wiki',
        originalPath: match[0],
        fileName: fileName,
        alt: '',
        fullMatch: match[0]
      });
      seen.add(fileName);
    }
  }

  // Extract standard markdown references: ![alt](path)
  const mdRegex = new RegExp(IMAGE_PATTERNS.markdown.source, IMAGE_PATTERNS.markdown.flags);
  while ((match = mdRegex.exec(content)) !== null) {
    const alt = match[1];
    const path = match[2];
    const fileName = basename(path);
    
    if (!seen.has(fileName)) {
      references.push({
        type: 'markdown',
        originalPath: path,
        fileName: fileName,
        alt: alt,
        fullMatch: match[0]
      });
      seen.add(fileName);
    }
  }

  // Extract HTML img tags: <img src="path" />
  const htmlRegex = new RegExp(IMAGE_PATTERNS.html.source, IMAGE_PATTERNS.html.flags);
  while ((match = htmlRegex.exec(content)) !== null) {
    const path = match[1];
    const fileName = basename(path);
    
    if (!seen.has(fileName)) {
      references.push({
        type: 'html',
        originalPath: path,
        fileName: fileName,
        alt: '',
        fullMatch: match[0]
      });
      seen.add(fileName);
    }
  }

  return references;
}

/**
 * Check if a file is an image based on extension
 * @param {string} fileName - File name to check
 * @returns {boolean} True if file is an image
 */
export function isImageFile(fileName) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'];
  const ext = extname(fileName).toLowerCase();
  return imageExtensions.includes(ext);
}

/**
 * Sanitize file name for web use
 * @param {string} fileName - Original file name
 * @returns {string} Sanitized file name
 */
export function sanitizeFileName(fileName) {
  // Replace spaces with hyphens for URL compatibility
  return fileName.replace(/\s+/g, '-');
}

/**
 * Generate VitePress-compatible image path
 * @param {string} fileName - Image file name
 * @returns {string} VitePress image path
 */
export function generateVitePressPath(fileName) {
  // Sanitize file name and use /images/ path from public directory
  const sanitized = sanitizeFileName(fileName);
  return `/images/${sanitized}`;
}

/**
 * Parse image references and prepare migration data
 * @param {string} content - Markdown content
 * @param {string} attachmentDir - Obsidian attachment directory
 * @returns {Object} Parsed references with source paths
 */
export function parseImageReferences(content, attachmentDir) {
  const references = extractImageReferences(content);
  
  return references.map(ref => {
    const sanitizedFileName = sanitizeFileName(ref.fileName);
    return {
      ...ref,
      sanitizedFileName,
      sourcePath: join(attachmentDir, ref.fileName),
      newPath: generateVitePressPath(ref.fileName)
    };
  });
}

/**
 * Get unique image files from references
 * @param {Array<Object>} references - Image references
 * @returns {Array<string>} Unique image file names
 */
export function getUniqueImages(references) {
  const uniqueFiles = new Set();
  references.forEach(ref => uniqueFiles.add(ref.fileName));
  return Array.from(uniqueFiles);
}

/**
 * Validate image references
 * @param {Array<Object>} references - Image references to validate
 * @returns {Object} Validation result
 */
export function validateImageReferences(references) {
  const valid = [];
  const invalid = [];

  for (const ref of references) {
    if (isImageFile(ref.fileName)) {
      valid.push(ref);
    } else {
      invalid.push({
        ...ref,
        reason: 'Not a valid image file extension'
      });
    }
  }

  return { valid, invalid };
}


/**
 * Copy image from attachment directory to target images directory
 * @param {string} sourcePath - Source image path
 * @param {string} targetPath - Target image path
 * @returns {Promise<Object>} Copy result
 */
export async function copyImage(sourcePath, targetPath) {
  try {
    // Check if source exists
    const sourceExists = await fileExists(sourcePath);
    if (!sourceExists) {
      return {
        success: false,
        error: 'Source file does not exist',
        sourcePath,
        targetPath
      };
    }

    // Check if target already exists (skip duplicate copy)
    const targetExists = await fileExists(targetPath);
    if (targetExists) {
      return {
        success: true,
        skipped: true,
        reason: 'Target file already exists',
        sourcePath,
        targetPath
      };
    }

    // Copy the file
    const copied = await copyFileWithDirs(sourcePath, targetPath);
    
    if (copied) {
      return {
        success: true,
        skipped: false,
        sourcePath,
        targetPath
      };
    } else {
      return {
        success: false,
        error: 'Copy operation failed',
        sourcePath,
        targetPath
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      sourcePath,
      targetPath
    };
  }
}

/**
 * Update image paths in markdown content to VitePress format
 * @param {string} content - Original markdown content
 * @param {Array<Object>} references - Image references with new paths
 * @returns {string} Updated markdown content
 */
export function updateImagePaths(content, references) {
  let updatedContent = content;

  for (const ref of references) {
    const newMarkdown = `![${ref.alt}](${ref.newPath})`;
    
    // Replace based on reference type
    if (ref.type === 'wiki') {
      // Replace ![[image.png]] with ![](newPath)
      const wikiPattern = new RegExp(`!\\[\\[${escapeRegex(ref.fileName)}\\]\\]`, 'g');
      updatedContent = updatedContent.replace(wikiPattern, newMarkdown);
    } else if (ref.type === 'markdown') {
      // Replace ![alt](oldPath) with ![alt](newPath)
      const mdPattern = new RegExp(`!\\[${escapeRegex(ref.alt)}\\]\\(${escapeRegex(ref.originalPath)}\\)`, 'g');
      updatedContent = updatedContent.replace(mdPattern, newMarkdown);
    } else if (ref.type === 'html') {
      // Replace <img src="oldPath" /> with markdown format
      const htmlPattern = new RegExp(`<img[^>]+src=["']${escapeRegex(ref.originalPath)}["'][^>]*>`, 'gi');
      updatedContent = updatedContent.replace(htmlPattern, newMarkdown);
    }
  }

  return updatedContent;
}

/**
 * Escape special regex characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Migrate images for a document
 * @param {string} content - Document content
 * @param {string} attachmentDir - Obsidian attachment directory
 * @param {string} targetImagesDir - VitePress images directory
 * @returns {Promise<Object>} Migration result
 */
export async function migrateImages(content, attachmentDir, targetImagesDir) {
  const result = {
    updatedContent: content,
    copied: [],
    skipped: [],
    warnings: [],
    errors: []
  };

  // Parse image references
  const references = parseImageReferences(content, attachmentDir);
  
  if (references.length === 0) {
    return result; // No images to migrate
  }

  // Copy each unique image
  const uniqueImages = getUniqueImages(references);
  
  for (const fileName of uniqueImages) {
    const sanitizedFileName = sanitizeFileName(fileName);
    const sourcePath = join(attachmentDir, fileName);
    const targetPath = join(targetImagesDir, sanitizedFileName);
    
    const copyResult = await copyImage(sourcePath, targetPath);
    
    if (copyResult.success) {
      if (copyResult.skipped) {
        result.skipped.push({
          fileName: sanitizedFileName,
          reason: copyResult.reason
        });
      } else {
        result.copied.push(sanitizedFileName);
      }
    } else {
      result.errors.push({
        fileName,
        error: copyResult.error
      });
      result.warnings.push(`Image not found: ${fileName}`);
    }
  }

  // Update image paths in content
  result.updatedContent = updateImagePaths(content, references);

  return result;
}
