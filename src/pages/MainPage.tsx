// /src/pages/MainPage.tsx
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import CampusMap from '../components/map/CampusMap';
import logoImage from '../assets/Logo.png'; 
import useAuth from '../components/hooks/useAuth';
import lensIcon from '../assets/lens.png';
import cameraIcon from '../assets/camera.png';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            onClick={() => navigate('/posts?type=found')}
          >
            습득물 바로가기
          </ShortcutButton>
          <ShortcutButton
            className="dark"
            onClick={() => navigate('/posts?type=lost')}
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

      <Footer/>
    </PageWrapper>
  );
};

export default MainPage;

// --- Styled Components ---
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