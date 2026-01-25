import { useCallback } from "react";

function useCopy() {
  return useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      console.log("Clipboard not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(`Error while copy ${text}: `, error);
    }
  }, []);
}

export default useCopy;
