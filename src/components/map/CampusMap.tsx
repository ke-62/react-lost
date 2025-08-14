import React, { useEffect, useRef } from 'react';
// import { getMapSummary } from '../../api/mapApi'; // API 호출은 주석 처리된 상태로 둡니다.

declare global {
  interface Window {
    kakao: any;
  }
}

const CampusMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapContainer.current) {
        const options = {
          center: new window.kakao.maps.LatLng(37.5516, 127.0735), // 세종대학교 중심 좌표
          level: 4,
        };
        // 지도를 생성합니다.
        const map = new window.kakao.maps.Map(mapContainer.current, options);

        // 마커를 표시하는 함수 (내부 로직을 주석 처리하여 아이콘이 나타나지 않도록 함)
        const displayMarkers = async () => {
          /*
          // --- 아이콘(마커) 표시 로직 비활성화 ---
          try {
            console.log("백엔드 연동 전 임시 지도 데이터를 사용합니다.");
            const mockLocations = [
              { name: '대양홀', latitude: 37.5523, longitude: 127.073, count: 2 },
              { name: '광개토관', latitude: 37.5508, longitude: 127.074, count: 5 },
              { name: '학술정보원', latitude: 37.5516, longitude: 127.0755, count: 3 },
              { name: '군자관', latitude: 37.5505, longitude: 127.0723, count: 1 },
            ];
            const locations = mockLocations;
            
            locations.forEach((loc) => {
              const markerPosition = new window.kakao.maps.LatLng(loc.latitude, loc.longitude);

              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map: map,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px; font-size:12px; text-align:center;">${loc.name}<br>습득물: ${loc.count}개</div>`,
                removable: true
              });

              window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
              window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
            });
          } catch (error) {
            console.error('습득물 위치 정보를 가져오는 데 실패했습니다.', error);
          }
          // -----------------------------------------
          */
        };

        // 함수 호출은 유지하되, 내부 로직이 비어있어 아무 작업도 수행하지 않습니다.
        displayMarkers();
      }
    };

    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      document.head.appendChild(script);
      
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
    }
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default CampusMap;