export interface FileItem {
  type: "file"
  name: string
  size: number
  fileType: "document" | "image" | "other"
  lastModified: string
}

export interface FolderItem {
  type: "folder"
  name: string
  lastModified: string
  items: (FileItem | FolderItem)[]
}

export type DriveItem = FileItem | FolderItem

// Mock data structure
export const mockData: FolderItem = {
  type: "folder",
  name: "My Drive",
  lastModified: "2023-04-15",
  items: [
    {
      type: "folder",
      name: "Work Documents",
      lastModified: "2023-04-10",
      items: [
        {
          type: "file",
          name: "Project Proposal.docx",
          size: 2500000,
          fileType: "document",
          lastModified: "2023-04-08",
        },
        {
          type: "file",
          name: "Budget.xlsx",
          size: 1800000,
          fileType: "document",
          lastModified: "2023-04-05",
        },
        {
          type: "folder",
          name: "Client Presentations",
          lastModified: "2023-03-28",
          items: [
            {
              type: "file",
              name: "Q1 Results.pptx",
              size: 4200000,
              fileType: "document",
              lastModified: "2023-03-25",
            },
            {
              type: "file",
              name: "Product Demo.pptx",
              size: 6800000,
              fileType: "document",
              lastModified: "2023-03-20",
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "Personal",
      lastModified: "2023-04-12",
      items: [
        {
          type: "file",
          name: "Resume.pdf",
          size: 890000,
          fileType: "document",
          lastModified: "2023-04-01",
        },
        {
          type: "file",
          name: "Family Photo.jpg",
          size: 3500000,
          fileType: "image",
          lastModified: "2023-03-15",
        },
        {
          type: "file",
          name: "Vacation Plans.docx",
          size: 720000,
          fileType: "document",
          lastModified: "2023-02-28",
        },
      ],
    },
    {
      type: "file",
      name: "Important Notes.txt",
      size: 45000,
      fileType: "document",
      lastModified: "2023-04-14",
    },
    {
      type: "file",
      name: "Profile Picture.png",
      size: 2100000,
      fileType: "image",
      lastModified: "2023-04-02",
    },
    {
      type: "folder",
      name: "Projects",
      lastModified: "2023-04-08",
      items: [
        {
          type: "file",
          name: "Project Timeline.pdf",
          size: 1200000,
          fileType: "document",
          lastModified: "2023-04-07",
        },
        {
          type: "folder",
          name: "Resources",
          lastModified: "2023-04-06",
          items: [
            {
              type: "file",
              name: "Reference Material.pdf",
              size: 4800000,
              fileType: "document",
              lastModified: "2023-04-05",
            },
            {
              type: "file",
              name: "Design Assets.zip",
              size: 25000000,
              fileType: "other",
              lastModified: "2023-04-04",
            },
          ],
        },
      ],
    },
  ],
}
