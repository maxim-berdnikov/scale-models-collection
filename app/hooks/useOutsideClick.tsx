import React from "react";

export const useOutsideClick = <T extends HTMLElement>(
  callback: () => void
) => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const handleClick = (event: Event) => {
      if (
        ref.current &&
        event.target instanceof HTMLElement &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};
