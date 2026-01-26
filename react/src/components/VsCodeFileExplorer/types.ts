
export interface IExplorerItem {
    id: string,
    type: "file" | "folder",
    title: string,
    parentId: string
}

export const ROOT_ID = "__root__" as const;

export type IExplorer = Record<string, IExplorerItem>;