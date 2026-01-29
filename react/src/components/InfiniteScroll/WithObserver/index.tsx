import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 20;

function WithObserver() {
  const [data, setData] = useState<Array<number>>([...new Array(40)]);
  const [isLoading, setIsLoading] = useState(false);
  const refList = useRef<Array<HTMLDivElement | null>>([]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        loadMore();
      }
    });
    const lastElement = refList.current.at(-1);
    if (lastElement) observer.observe(lastElement);
    return () => {
      observer.disconnect();
    };
  }, [data.length]);

  return (
    <div style={{ height: "500px", overflow: "auto", width: "500px" }}>
      {data.map((_, i) => {
        return (
          <div ref={(el) => (refList.current[i] = el)} key={i}>
            {i}
          </div>
        );
      })}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default WithObserver;
