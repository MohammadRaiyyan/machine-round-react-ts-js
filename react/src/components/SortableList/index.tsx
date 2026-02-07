import { useState } from "react";

function SortableList() {
  const [listData, setListData] = useState([...new Array(10)]);
  const [startIndex, setStartIndex] = useState(-1);

  const reset = () => {
    setStartIndex(-1);
  };
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ height: "500px", width: "200px", background: "lightgray" }}>
        {listData.map((_, i) => (
          <div
            draggable
            onDragStart={(e) => {
              setStartIndex(i);
              e.dataTransfer.effectAllowed = "link";
            }}
            onDragEnd={() => reset()}
            style={{
              background: startIndex === i ? "orange" : "gray",
              marginBottom: "2px",
              cursor: "grab",
            }}
            onDrop={(e) => {
              if (i !== startIndex) {
                // swap
              }
            }}
            key={i}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortableList;
