// /src/pages/MainPage.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CampusMap from '../components/map/CampusMap';
import logoImage from '../assets/Logo.png';
// import useAuth from '../components/hooks/useAuth';
import lensIcon from '../assets/lens.png';
import cameraIcon from '../assets/camera.png';
import Header from '../components/layout/Header';
import RecentItems from '../components/common/RecentItems';
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
  // const { isLoggedIn } = useAuth();
  
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
            onClick={() => navigate('/found')}  // PostWritePage로 변경 (습득물)
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

      <RecentItems 
        items={dummyRecentItems}
        title="최근 습득물"
        moreLink="/found"
        moreLinkText="게시물 더보기 >"
        itemLimit={6}
      />

      <FooterSection>
        <FooterContent>
          <HeaderText>Who Made This</HeaderText>
          <FooterLogo src={logoImage} alt="세만추 로고" />
          <ServiceTitle>세만추 : 세종대 유실물 포털</ServiceTitle>
          <ServiceDescription>
            세종대에서 잃어버린 물건과의 만남을 이곳에서 추구하고자 제작된 서비스입니다.
          </ServiceDescription>
        </FooterContent>
      </FooterSection>
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

const FooterSection = styled.section`
  width: 100%;
  background: transparent;
  padding: 4rem 0 6rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;

const HeaderText = styled.h2`
  color: #504791;
  font-size: 32px;
  font-weight: 500;
  margin: 0;
`;

const FooterLogo = styled.img`
  width: 300px;
  height: auto;
  margin: 1rem 0;
`;

const ServiceTitle = styled.h3`
  color: #504791;
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  margin-top: 1rem;
`;

const ServiceDescription = styled.p`
  color: #504791;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
  max-width: 600px;
`;