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
    lat: 37.55183,
    lng: 127.0738,
    items: [
      {
        id: 1,
        title: '에어팟 프로',
        location: '학술정보원',
        lat: 37.55183,
        lng: 127.0738,
        type: 'airpods',
        date: '2025-08-21',
        imageUrl: 'https://airpods~'
      },
      {
        id: 2,
        title: '아이폰 14',
        location: '학술정보원',
        lat: 37.55183,
        lng: 127.0738,
        type: 'smartphone',
        date: '2025-08-20'
      }
    ]
  },
  {
    locationId: 'B',
    locationName: '광개토관',
    lat: 37.55163,
    lng: 127.0748,
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
    lat: 37.55203,
    lng: 127.0758,
    items: [
      {
        id: 4,
        title: '검정색 카드지갑',
        location: '대양AI센터',
        lat: 37.55203,
        lng: 127.0758,
        type: 'found',
        date: '2025-08-18',
        imageUrl: 'https://wallet~'
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
              console.log('마커 클릭:', location.locationId);
              setSelectedLocation(location.locationId);
            });
          });
          
          setOverlays(newOverlays);
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

  const selectedLocationData = locationGroups.find(loc => loc.locationId === selectedLocation);

  return (
    <MapWrapper>
      <MapContainer>
        <div
          id="map"
          ref={mapContainer}
          style={{ width: '100%', height: '100%' }}
        />
      </MapContainer>

      {/* 선택된 위치의 분실물 목록 */}
      {selectedLocation && selectedLocationData && (
        <ItemListContainer>
          <ItemListHeader>
            <LocationTitle>{selectedLocationData.locationName} 분실물 목록</LocationTitle>
            <CloseButton onClick={() => setSelectedLocation(null)}>×</CloseButton>
          </ItemListHeader>
          
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
        </ItemListContainer>
      )}
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

// 분실물 목록 스타일
const ItemListContainer = styled.div`
  background: white;
  border-top: 1px solid #e0e0e0;
  max-height: 300px;
  overflow-y: auto;
`;

const ItemListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
`;

const LocationTitle = styled.h3`
  color: #504791;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ItemList = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 1rem;
  flex-shrink: 0;
  
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
  font-size: 1.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
`;

const ItemLocation = styled.p`
  margin: 0 0 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const ItemDate = styled.p`
  margin: 0;
  color: #999;
  font-size: 0.8rem;
`;

const ItemType = styled.div`
  display: flex;
  align-items: center;
`;

const TypeDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;