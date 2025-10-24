import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

interface LocationItem {
  id: number;
  title: string;
  location: string;
  lat: number;
  lng: number;
  type: 'lost' | 'found' | 'airpods' | 'smartphone';
  date: string;
  imageUrl?: string;
}

interface LocationGroup {
  locationId: string;
  locationName: string;
  lat: number;
  lng: number;
  items: LocationItem[];
}

// 위치별로 그룹화된 데이터
const locationGroups: LocationGroup[] = [
  {
    locationId: 'A',
    locationName: '학술정보원',
    lat: 37.55154,
    lng: 127.07424,
    items: [
      {
        id: 1,
        title: '에어팟 프로',
        location: '학술정보원',
        lat: 37.55140,
        lng: 127.07285,
        type: 'airpods',
        date: '2025-08-21',
        imageUrl: './src/assets/airpods.jpeg'
      },
      {
        id: 2,
        title: '아이폰 14',
        location: '학술정보원',
        lat: 37.55183,
        lng: 127.0738,
        type: 'smartphone',
        date: '2025-08-20',
        imageUrl: './src/assets/iphone14.jpeg'
      }
    ]
  },
  {
    locationId: 'B',
    locationName: '광개토관',
    lat: 37.55011,
    lng: 127.07317,
    items: [
      {
        id: 3,
        title: '학생증',
        location: '광개토관',
        lat: 37.55163,
        lng: 127.0748,
        type: 'lost',
        date: '2025-08-19'
      }
    ]
  },
  {
    locationId: 'C',
    locationName: '대양AI센터',
    lat: 37.55105,
    lng: 127.07579,
    items: [
      {
        id: 4,
        title: '검정색 카드지갑',
        location: '대양AI센터',
        lat: 37.55203,
        lng: 127.0758,
        type: 'found',
        date: '2025-08-18',
        imageUrl: './src/assets/wallet.jpeg'
      },
      {
        id: 5,
        title: '아이패드',
        location: '대양AI센터',
        lat: 37.55203,
        lng: 127.0758,
        type: 'found',
        date: '2025-08-17'
      }
    ]
  }
];

const CampusMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [overlays, setOverlays] = useState<any[]>([]);

  // 아이템 타입별 색상 설정
  const getItemTypeColor = (type: string): string => {
    switch (type) {
      case 'lost':
        return '#4CAF50'; // 초록색
      case 'found':
        return '#FF5722'; // 주황색
      case 'airpods':
        return '#FF5722'; // 주황색
      case 'smartphone':
        return '#FFC107'; // 노란색
      default:
        return '#9E9E9E'; // 회색
    }
  };

  useEffect(() => {
    const initMap = () => {
      if (mapContainer.current) {
        const options = {
          center: new window.kakao.maps.LatLng(37.55183, 127.0738),
          level: 1,
          maxLevel: 3
        };

        const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options);
        setMap(kakaoMap);

        const displayMarkers = () => {
          const newOverlays: any[] = [];

          locationGroups.forEach((location) => {
            const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng);

            // 간단한 A, B, C 마커 생성
            const markerDiv = document.createElement('div');
            markerDiv.innerHTML = `
              <div style="
                position: relative;
                background-color: #504791;
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              ">
                <div style="
                  transform: rotate(45deg);
                  font-size: 16px;
                  color: white;
                  font-weight: bold;
                ">
                  ${location.locationId}
                </div>
              </div>
            `;

            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: markerPosition,
              content: markerDiv,
              yAnchor: 1
            });

            customOverlay.setMap(kakaoMap);
            newOverlays.push(customOverlay);

            // 마커 클릭 이벤트
            markerDiv.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedLocation(prev => (prev === location.locationId ? null : location.locationId));
            });
          });

          setOverlays(newOverlays);
        };

        displayMarkers();

        // 지도 클릭시 팝업 닫기
        if (window.kakao && window.kakao.maps && window.kakao.maps.event) {
          window.kakao.maps.event.addListener(kakaoMap, 'click', () => {
            setSelectedLocation(null);
          });
        }
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

    // cleanup: 오버레이 제거
    return () => {
      if (overlays.length && window.kakao && window.kakao.maps) {
        overlays.forEach(o => o.setMap(null));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedLocationData = locationGroups.find(loc => loc.locationId === selectedLocation);

  return (
    <MapWrapper>
      <MapContainer>
        <div
          id="map"
          ref={mapContainer}
          style={{ width: '100%', height: '100%' }}
        />

        {/* 지도 위에 떠있는 카드 (사진처럼 오른쪽에 떠있도록) */}
        {selectedLocation && selectedLocationData && (
          <FloatingCard role="dialog" aria-label={`${selectedLocationData.locationName} 분실물 목록`}>
            <CardHeader>
              <LocationTitle>{selectedLocationData.locationName}</LocationTitle>
              <CloseButton onClick={() => setSelectedLocation(null)}>×</CloseButton>
            </CardHeader>

            <ItemList>
              {selectedLocationData.items.map((item) => (
                <ItemCard key={item.id}>
                  <ItemImage>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} />
                    ) : (
                      <PlaceholderImage>📷</PlaceholderImage>
                    )}
                  </ItemImage>
                  <ItemInfo>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemLocation>{item.location}</ItemLocation>
                    <ItemDate>{item.date}</ItemDate>
                  </ItemInfo>
                  <ItemType>
                    <TypeDot color={getItemTypeColor(item.type)} />
                  </ItemType>
                </ItemCard>
              ))}
            </ItemList>
          </FloatingCard>
        )}
      </MapContainer>
    </MapWrapper>
  );
};

export default CampusMap;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  position: relative;
  flex: 1;
  margin: 1rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

/* 지도 위에 떠있는 카드 스타일 (우측 중앙에 위치하도록) */
const FloatingCard = styled.div`
  position: absolute;
  right: 2rem;
  top: 18%;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  overflow: hidden;
  z-index: 1000;
  border: 1px solid #ececec;
`;

/* 분실물 목록 스타일 (내부) */
const ItemListContainer = styled.div`
  background: white;
  border-top: 1px solid #e0e0e0;
  max-height: 300px;
  overflow-y: auto;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
`;

const LocationTitle = styled.h3`
  color: #504791;
  font-size: 1.05rem;
  font-weight: bold;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ItemList = styled.div`
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-height: 360px;
  overflow-y: auto;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: white;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
`;

const ItemImage = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
  background: #f6f6f6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h4`
  margin: 0 0 2px 0;
  color: #333;
  font-size: 0.95rem;
  font-weight: 600;
`;

const ItemLocation = styled.p`
  margin: 0 0 2px 0;
  color: #666;
  font-size: 0.82rem;
`;

const ItemDate = styled.p`
  margin: 0;
  color: #999;
  font-size: 0.75rem;
`;

const ItemType = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const TypeDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;