import { useState, useEffect } from "react";

export function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMdUp(window.innerWidth >= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMdUp;
}
