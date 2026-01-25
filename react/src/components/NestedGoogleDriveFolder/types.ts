export interface Folder {
    id: string,
    title: string,
    type: "file" | "folder"
    parentId: string | null
}