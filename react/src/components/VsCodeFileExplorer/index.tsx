import { useMemo, useState } from "react";
import { sampleData } from "./sampleData";
import { ROOT_ID, type IExplorerItem } from "./types";

function VsCodeFileExplorer() {
  const [items, setItems] = useState(sampleData);
  const [visibleFolderIds, setVisibleFolderIds] = useState<Set<string>>(
    new Set([""]),
  );

  const childrenByParent = useMemo(() => {
    const map = new Map<string | null, IExplorerItem[]>();

    Object.values(items).forEach((item) => {
      const key = item.parentId ?? ROOT_ID;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    });

    return map;
  }, [items]);

  const createItem = (type: IExplorerItem["type"], parentId: string) => {
    setItems((prev) => {
      const id = crypto.randomUUID();

      return {
        ...prev,
        [id]: {
          id,
          type,
          title: type === "folder" ? "New Folder" : "New File",
          parentId,
        },
      };
    });
  };
  const deleteItem = (id: string) => {};

  function renderNode(parentId: string | null) {
    const children = childrenByParent.get(parentId ?? ROOT_ID) ?? [];

    return children.map((child) => (
      <div key={child.id} style={{ paddingLeft: 16 }}>
        <button
          onClick={() => {
            if (child.type === "folder") {
              setVisibleFolderIds((prev) => {
                const next = new Set(prev);
                next.has(child.id) ? next.delete(child.id) : next.add(child.id);
                return next;
              });
            }
          }}
        >
          {child.type === "folder" ? "📁" : "📄"} {child.title}
        </button>

        {child.type === "folder" &&
          visibleFolderIds.has(child.id) &&
          renderNode(child.id)}
      </div>
    ));
  }

  return (
    <div>
      <h2>Files</h2>
      {renderNode(null)}
    </div>
  );
}

export default VsCodeFileExplorer;
