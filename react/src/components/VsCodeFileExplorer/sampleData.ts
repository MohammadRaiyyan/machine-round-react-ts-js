import { ROOT_ID, type IExplorer } from "./types";

export const sampleData: IExplorer = {
    "1": { id: "1", title: "my-app", type: "folder", parentId: ROOT_ID },
    "2": { id: "2", title: "src", type: "folder", parentId: "1" },
    "3": { id: "3", title: "public", type: "folder", parentId: "1" },
    "4": { id: "4", title: "node_modules", type: "folder", parentId: "1" },
    "5": { id: "5", title: "package.json", type: "file", parentId: "1" },
    "6": { id: "6", title: "README.md", type: "file", parentId: "1" },
    "7": { id: "7", title: "index.html", type: "file", parentId: "3" },
    "8": { id: "8", title: "favicon.ico", type: "file", parentId: "3" },
    "9": { id: "9", title: "index.js", type: "file", parentId: "2" },
    "10": { id: "10", title: "App.js", type: "file", parentId: "2" },
    "11": { id: "11", title: "App.css", type: "file", parentId: "2" },
    "12": { id: "12", title: "logo.svg", type: "file", parentId: "2" },
    "13": { id: "13", title: "utils", type: "folder", parentId: "2" },
    "14": { id: "14", title: "helpers.js", type: "file", parentId: "13" },
    "15": { id: "15", title: ".gitignore", type: "file", parentId: "1" }

};

