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
          center: new window.kakao.maps.LatLng(37.55183, 127.0738), // 세종대학교 중심 좌표
          level: 1,
          zoomable: false,
        };
    
        const map = new window.kakao.maps.Map(mapContainer.current, options);
        map.removeControl(window.kakao.maps.MapTypeControl);
        map.removeControl(window.kakao.maps.ZoomControl);

        map.setZoomable(false)

        const displayMarkers = async () => {
          //
        };

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