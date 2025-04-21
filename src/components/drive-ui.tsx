"use client"

import type React from "react"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { FileText, Folder, ImageIcon, LayoutGrid, List, MoreVertical, Upload } from "lucide-react"
import { mockData, type FileItem, type FolderItem } from "~/lib/mock-data"

export function DriveUI() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [viewType, setViewType] = useState<"grid" | "list">("list")
  const [uploadOpen, setUploadOpen] = useState(false)

  // Get current folder content based on path
  const getCurrentContent = () => {
    let current = mockData

    for (const folder of currentPath) {
      const foundFolder = current.items.find((item) => item.type === "folder" && item.name === folder) as
        | FolderItem
        | undefined

      if (foundFolder) {
        current = foundFolder
      } else {
        return { items: [] }
      }
    }

    return current
  }

  const currentContent = getCurrentContent()

  // Navigate to a folder
  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  // Navigate to a specific path index
  const navigateToPathIndex = (index: number) => {
    setCurrentPath(currentPath.slice(0, index))
  }

  // Handle file click (in a real app, this would open the file)
  const handleFileClick = (file: FileItem) => {
    // In a real app, this would open the file or download it
    console.log(`Opening file: ${file.name}`)
    window.open(`#file-${file.name}`, "_blank")
  }

  // Mock upload handler
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    setUploadOpen(false)
    // In a real app, this would handle the file upload
    console.log("File uploaded successfully!")
  }

  return (
    <div className="flex h-screen bg-background dark">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Google Drive Clone</h1>

          <div className="flex items-center gap-2">
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload size={16} />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload files</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4 pt-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Input type="file" className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer text-primary">
                      Click to select files or drag and drop
                    </label>
                  </div>
                  <Button type="submit">Upload</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Breadcrumb and view options */}
        <div className="p-4 border-b flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => setCurrentPath([])}>My Drive</BreadcrumbLink>
              </BreadcrumbItem>

              {currentPath.map((folder, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbLink onClick={() => navigateToPathIndex(index + 1)}>{folder}</BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-2">
            <Tabs value={viewType} onValueChange={(v) => setViewType(v as "grid" | "list")}>
              <TabsList>
                <TabsTrigger value="grid">
                  <LayoutGrid size={16} />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Files and folders */}
        <div className="flex-1 overflow-auto p-4">
          {viewType === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentContent.items.map((item, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    if (item.type === "folder") {
                      navigateToFolder(item.name)
                    } else {
                      handleFileClick(item)
                    }
                  }}
                >
                  <div className="p-4 flex flex-col items-center text-center">
                    {item.type === "folder" ? (
                      <Folder size={40} className="text-blue-500 mb-2" />
                    ) : (
                      <FileIcon fileType={item.fileType} />
                    )}
                    <div className="mt-2 w-full">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.type === "folder"
                          ? `${(item as FolderItem).items.length} items`
                          : formatFileSize(item.size)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2 mt-2">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 font-medium text-sm text-muted-foreground border-b">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Last Modified</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-1"></div>
              </div>
              {currentContent.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-muted/50 rounded-md cursor-pointer items-center"
                  onClick={() => {
                    if (item.type === "folder") {
                      navigateToFolder(item.name)
                    } else {
                      handleFileClick(item)
                    }
                  }}
                >
                  <div className="col-span-6 flex items-center">
                    {item.type === "folder" ? (
                      <Folder size={20} className="text-blue-500 mr-3 shrink-0" />
                    ) : (
                      <div className="mr-3 shrink-0">
                        <FileIcon fileType={item.fileType} size={20} />
                      </div>
                    )}
                    <div className="font-medium truncate">{item.name}</div>
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">{item.lastModified}</div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {item.type === "folder" ? `${(item as FolderItem).items.length} items` : formatFileSize(item.size)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" size="icon" className="ml-2" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper component for file icons
function FileIcon({ fileType, size = 40 }: { fileType: string; size?: number }) {
  switch (fileType) {
    case "document":
      return <FileText size={size} className="text-blue-600" />
    case "image":
      return <ImageIcon size={size} className="text-green-600" />
    default:
      return <FileText size={size} className="text-gray-600" />
  }
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  const kb = bytes / 1024
  if (kb < 1024) return kb.toFixed(1) + " KB"
  const mb = kb / 1024
  return mb.toFixed(1) + " MB"
}
