// /src/hooks/useInfiniteScroll.ts
// Intersection Observer를 사용한 무한 스크롤 구현을 위한 커스텀 훅
import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void; // 더 많은 데이터를 로드하는 함수
  hasMore: boolean;      // 더 로드할 데이터가 있는지 여부
  isLoading: boolean;    // 현재 로딩 중인지 여부
}

const useInfiniteScroll = ({ onLoadMore, hasMore, isLoading }: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onLoadMore, hasMore, isLoading]);

  return { observerTarget };
};

export default useInfiniteScroll;