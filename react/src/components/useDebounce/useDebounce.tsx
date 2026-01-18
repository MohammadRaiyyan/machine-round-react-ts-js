import { useCallback, useRef } from "react";

interface UseDebounceProps<T extends unknown[]> {
  callbackFn: (...args: T) => void;
  delay?: number;
}

function useDebounce<T extends unknown[]>(props: UseDebounceProps<T>) {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: T) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => {
        props.callbackFn(...args);
      }, props.delay || 500);
    },
    [props.callbackFn, props.delay],
  );
}

export default useDebounce;
