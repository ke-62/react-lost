import React, { useEffect, useRef } from 'react';
import { getMapSummary } from '../../api/mapApi';

// Kakao 지도 라이브러리가 로드된 후 window 객체에 kakao가 할당됩니다.
// 이를 타입스크립트에게 알려주기 위해 window 인터페이스를 확장합니다.
declare global {
  interface Window {
    kakao: any;
  }
}

const CampusMap = () => {
  // 지도를 담을 div를 참조하기 위해 useRef를 사용합니다.
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 지도를 초기화하고 마커를 표시하는 함수
    const initMap = () => {
      if (mapContainer.current) {
        const options = {
          center: new window.kakao.maps.LatLng(37.5516, 127.0735), // 세종대학교 중심 좌표
          level: 3,
        };
        // 지도를 생성합니다.
        const map = new window.kakao.maps.Map(mapContainer.current, options);

        // 백엔드에서 데이터를 가져와 마커를 표시하는 비동기 함수
        const displayMarkers = async () => {
          try {
            // 1. 백엔드 API를 호출하여 건물별 습득물 정보를 가져옵니다.
            const res = await getMapSummary();
            const locations = res.data;

            // 2. 받아온 위치 정보로 지도에 마커를 반복하여 표시합니다.
            locations.forEach((loc) => {
              const markerPosition = new window.kakao.maps.LatLng(loc.latitude, loc.longitude);

              // 마커를 생성합니다.
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map: map,
              });

              // 마커에 표시할 정보창(인포윈도우)을 생성합니다.
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px; text-align:center;">${loc.name}<br>${loc.count}개</div>`,
                // 인포윈도우가 표시될 때 닫기 버튼이 보이지 않도록 설정할 수 있습니다.
                removable: true 
              });

              // 마커에 마우스오버/아웃 이벤트를 등록합니다.
              window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
              window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
            });
          } catch (error) {
            console.error('습득물 위치 정보를 가져오는 데 실패했습니다.', error);
          }
        };

        // 마커 표시 함수를 호출합니다.
        displayMarkers();
      }
    };

    // 카카오맵 스크립트가 이미 로드되어 있는지 확인하고, 없으면 새로 로드합니다.
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      // Vite 환경에서는 process.env 대신 import.meta.env를 사용합니다.
      // --- 바로 이 부분 끝에 &autoload=false를 추가합니다. ---
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      document.head.appendChild(script);
      
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
    }
  }, []); // useEffect가 한 번만 실행되도록 빈 배열을 전달합니다.

  return (
    // 지도가 그려질 div 요소입니다.
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default CampusMap;