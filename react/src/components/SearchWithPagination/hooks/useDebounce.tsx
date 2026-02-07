import { useCallback, useRef } from "react";

function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
}

export default useDebounce;
