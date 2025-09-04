// /src/pages/MainPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import CampusMap from '../components/map/CampusMap';
import logoImage from '../assets/Logo.png';
import useAuth from '../components/hooks/useAuth';
import lensIcon from '../assets/lens.png';
import cameraIcon from '../assets/camera.png';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface RecentItem {
  id: number;
  title: string;
  location: string;
  date: string; 
  imageUrl?: string;
}

// 벡앤드 연동 전 임시 아이템들
const dummyRecentItems: RecentItem[] = [
  {
    id: 1,
    title: '에어팟 프로',
    location: '학술정보원',
    date: '2025-08-21', 
    imageUrl: 'https://airpods~',
  },
  {
    id: 2,
    title: '학생증',
    location: '광대토관',
    date: '2025-08-02', 
  },
  {
    id: 3,
    title: '검정색 카드지갑',
    location: '학생회관',
    date: '2025-07-20', 
    imageUrl: 'https://wallet~',
  },
  {
    id: 4,
    title: '아이패드',
    location: '운동장',
    date: '2025-06-02',
    imageUrl: 'https://iPad~',
  },
];


const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

 //백엔드 API 연동
  /*
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    // 백엔드에서 최근 습득물 데이터를 가져오는 함수
    const fetchRecentItems = async () => {
      try {
        // const response = await fetch('/api/posts?type=found&limit=10&sort=latest'); // 예시 API
        // const data = await response.json();
        // setRecentItems(data.posts);
      } catch (error) {
        console.error("최근 습득물 데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchRecentItems();
  }, []);
  */

  const executeSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/posts?search=${searchTerm.trim()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };
  
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('선택된 이미지 파일:', file.name);
      alert(`${file.name} 이미지를 검색합니다. (기능 구현 필요)`);
    }
  };

  return (
    <PageWrapper>
      <Header />

      <LandingContainer>
        <Logo src={logoImage} alt="세만추 로고" />
        <SearchWrapper>
          <SearchIcon isLeft={true} onClick={executeSearch}>
            <img src={lensIcon} alt="검색" />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon isLeft={false} onClick={handleCameraClick}>
            <img src={cameraIcon} alt="이미지 검색" />
          </SearchIcon>
        </SearchWrapper>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          style={{ display: 'none' }} 
        />
        <ButtonWrapper>
          <ShortcutButton
            className="pink"
            onClick={() => navigate('/found')}  
          >
            습득물 바로가기
          </ShortcutButton>
          <ShortcutButton
            className="dark"
            onClick={() => navigate('/lost')}   // PostListPage로 변경 (분실물)
          >
            분실물 바로가기
          </ShortcutButton>
        </ButtonWrapper>
      </LandingContainer>

      <MapSection>
        <h2>습득물 현황 지도</h2>
        <p>건물을 클릭하면 습득물 목록을 확인할 수 있습니다.</p>
        <MapWrapper>
          <CampusMap />
        </MapWrapper>
      </MapSection>

      <RecentItemsSection>
         <SectionHeader>
          <h2>최근 습득물</h2>
          <MoreLink to="/found">게시물 더보기 &gt;</MoreLink>  {/* 습득물은 PostWritePage로 */}
        </SectionHeader>

           <ItemsGridContainer>
              {dummyRecentItems.slice(0, 6).map((item) => (
                <ItemCard key={item.id} onClick={() => navigate(`/posts/${item.id}`)}>
                  <ItemImage imageUrl={item.imageUrl} />
                  <ItemInfoWrapper>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemMeta>{item.date}</ItemMeta>
                  </ItemInfoWrapper>
                </ItemCard>
              ))}
            </ItemsGridContainer>
        </RecentItemsSection>

      <Footer/>
    </PageWrapper>
  );
};

export default MainPage;

const PageWrapper = styled.div``;

const LandingContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 4rem 1rem;
`;

const Logo = styled.img`
  width: 450px;
  height: auto;
  margin-bottom: 2.5rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 550px;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  &::placeholder {
    color: #c0c0c0;
  }

  &:focus {
    border-color: #5834d4;
    box-shadow: 0 4px 12px rgba(88, 52, 212, 0.2);
  }
`;

const SearchIcon = styled.div<{ isLeft: boolean }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    left: ${({ isLeft }) => (isLeft ? '20px' : 'auto')};
    right: ${({ isLeft }) => (isLeft ? 'auto' : '20px')};

    img {
      width: 20px;
      height: 20px;
      opacity: 0.5;
    }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShortcutButton = styled.button`
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &.pink {
    background-color: #FF83B0;
    color: white;
  }

  &.dark {
    background-color: #5834d4; 
    color: white;
  }
    
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MapSection = styled.section`
  padding: 5rem 2rem;
  text-align: center;
  
  h2 {
    color: #504791; 
    font-size: 2.5rem; 
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: #FF83B0;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const MapWrapper = styled.div`
  height: 600px;
  margin-top: 1rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
`;

const RecentItemsSection = styled.section`
  padding: 0 2rem 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;

  h2 {
    color: #000000;
    font-size: 36px;
    font-weight: 266;
    margin: 0;
  }
`;

const MoreLink = styled(Link)`
  color: #888; 
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  // align-items: baseline;
  
  &:hover {
    color: #504791;
  }
`;
const ItemsGridContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  overflow: hidden;
`;

const ItemCard = styled.div`
  flex: 0 0 calc(16.66% - 1rem);
  max-width: calc(16.66% - 1rem);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ItemImage = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 180px; 
  background-color: #f0f0f0;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
`;

const ItemInfoWrapper = styled.div`
  padding: 1rem;

`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 500; 
  color: #000000; 
  // margin: 0 0 4px 0; /* 아래쪽 여백 4px 추가 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemMeta = styled.p`
  font-size: 13px; 
  font-weight: 300;
  color: rgba(0, 0, 0, 0.3);
  margin: 0;
`;