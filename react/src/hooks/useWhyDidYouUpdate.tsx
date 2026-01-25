import { useEffect, useRef } from "react";

export default function whyDidYouUpdate(
  name: string,
  props: Record<string, unknown>,
) {
  const prevProps = useRef<Record<string, unknown>>(null);

  useEffect(() => {
    if (prevProps.current) {
      const keys = Object.keys({ ...prevProps.current, ...props });
      const whyUpdated: Record<string, { from: unknown; to: unknown }> = {};
      for (let key of keys) {
        if (
          typeof prevProps.current[key] === "object" &&
          typeof props[key] === "object"
        ) {
          if (
            JSON.stringify(prevProps.current[key]) !==
            JSON.stringify(props[key])
          ) {
            whyUpdated[key] = {
              from: prevProps.current[key],
              to: props[key],
            };
          }
        } else {
          if (prevProps.current[key] !== props[key]) {
            whyUpdated[key] = {
              from: prevProps.current[key],
              to: props[key],
            };
          }
        }
      }
      if (Object.keys(whyUpdated).length) {
        console.log(`${name} rerendered because of: `, whyUpdated);
      }
    }
    prevProps.current = props;
  }, [name, props]);
}
