import { useEffect, useRef, useState } from "react";

export default function DeferRender({
  children,
  placeholder = null,
  rootMargin = "300px 0px",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const holderRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;

    const node = holderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={holderRef}>{isVisible ? children : placeholder}</div>;
}