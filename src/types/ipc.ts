export interface FileInfo {
  id: string
  name: string
  path: string
  size: number
  ext: string
  isDirectory: boolean
  modifiedAt: number
}

export interface RenameResult {
  oldPath: string
  newPath: string
  success: boolean
  error?: string
}

export interface RenamePreview {
  file: FileInfo
  originalName: string
  newName: string
  hasChanged: boolean
  conflict: boolean
}
