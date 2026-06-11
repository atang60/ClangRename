export interface ParsedFileName {
  name: string
  ext: string
}

/**
 * Parse a filename into basename and extension.
 * Handles dotfiles and multiple extensions.
 */
export function parseFileName(fileName: string): ParsedFileName {
  // Handle dotfiles (.gitignore, .env, etc.)
  if (fileName.startsWith('.')) {
    const secondDot = fileName.indexOf('.', 1)
    if (secondDot === -1) {
      return { name: fileName, ext: '' }
    }
    return {
      name: fileName.substring(0, secondDot),
      ext: fileName.substring(secondDot)
    }
  }

  const lastDot = fileName.lastIndexOf('.')
  if (lastDot === -1 || lastDot === 0) {
    return { name: fileName, ext: '' }
  }

  return {
    name: fileName.substring(0, lastDot),
    ext: fileName.substring(lastDot)
  }
}
