import { useState, type SyntheticEvent } from "react";

const SCROLL_THRESHOLD = 20;

function WithScroll() {
  const [data, setData] = useState<Array<number>>([...new Array(40)]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    new Promise((resolve) => {
      setIsLoading(true);
      setTimeout(() => {
        resolve([...new Array(10)]);
      }, 2000);
    }).then((d) => {
      setData((prev) => [...prev, ...(d as Array<number>)]);
      setIsLoading(false);
    });
  };

  const handleScroll = (e: SyntheticEvent<HTMLDivElement>) => {
    if (isLoading) return;
    const clientHeight = e.currentTarget.clientHeight;
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const remainingScroll = scrollHeight - (clientHeight + scrollTop);
    if (remainingScroll < SCROLL_THRESHOLD) {
      loadMore();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      style={{ height: "500px", overflow: "auto", width: "500px" }}
    >
      {data.map((_, i) => {
        return <div key={i}>{i}</div>;
      })}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default WithScroll;
