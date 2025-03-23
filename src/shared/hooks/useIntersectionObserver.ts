import { useState, useEffect, useRef } from "react";

type IntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type IntersectionObserverReturn = {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
};

const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = "0%",
}: IntersectionObserverOptions = {}): IntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const currentTarget = ref.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      { threshold, root, rootMargin }
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [threshold, root, rootMargin]);

  return { ref, isIntersecting };
};

export default useIntersectionObserver;
