import { Fragment, useState } from "react";
import "./style.css";
import type { Folder } from "./types";
const folders: Record<string, Folder> = {
  "1": {
    id: "1",
    title: "Root Folder",
    type: "folder",
    parentId: null,
  },
  "2": { id: "2", title: "Documents", type: "folder", parentId: "1" },
  "3": { id: "3", title: "Photos", type: "folder", parentId: "1" },
  "4": { id: "4", title: "Resume.pdf", type: "file", parentId: "2" },
  "5": {
    id: "5",
    title: "Vacation.jpg",
    type: "file",
    parentId: "3",
  },
  "6": { id: "6", title: "Work", type: "folder", parentId: "2" },
  "7": {
    id: "7",
    title: "Project.docx",
    type: "file",
    parentId: "6",
  },
};

function generateBreadcrumbs(activeId: Folder["parentId"]) {
  let currentId = activeId;
  const paths: Array<{
    id: string;
    name: string;
  }> = [];
  while (currentId) {
    const item = folders[currentId];
    if (!item) {
      break;
    }
    paths.unshift({
      id: item.id,
      name: item.title,
    });
    currentId = item.parentId;
  }
  return [{ name: "Home", id: null }, ...paths];
}

function NestedGoogleDriveFolder() {
  const [activeFolderId, setActiveFolderId] = useState<null | string>(null);
  const children = Object.values(folders).filter(
    (folder) => folder.parentId === activeFolderId,
  );
  const breadcrumbs = generateBreadcrumbs(activeFolderId);
  return (
    <div>
      <div className="breadcrumbs">
        {breadcrumbs.map((b, i) => {
          return (
            <Fragment key={b.id}>
              <span
                key={b.name}
                onClick={() => setActiveFolderId(b.id)}
                className="breadcrumb"
                data-active={i === breadcrumbs.length - 1}
              >
                {b.name}
              </span>
              {i < breadcrumbs.length - 1 && (
                <span className="indicator">{" / "}</span>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="folder-container">
        {children.map((folder) => (
          <button
            onClick={() => {
              if (folder.type === "folder") {
                setActiveFolderId(folder.id);
              }
            }}
            key={folder.id}
            className={`box ${folder.type}`}
          >
            {folder.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NestedGoogleDriveFolder;
