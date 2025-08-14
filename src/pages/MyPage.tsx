// /src/pages/MainPage.tsx
// 서비스의 메인 페이지
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import CampusMap from '../components/map/CampusMap';

const MainPage = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키를 누르고, 입력값이 비어있지 않을 때 검색 결과 페이지로 이동 (기능 구현 필요)
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      navigate(`/posts?search=${e.currentTarget.value.trim()}`);
    }
  };

  return (
    <PageWrapper>
      {/* --- 메인 페이지 전용 최소한의 헤더 --- */}
      <MinimalHeader>
        <div className="placeholder">Who Made This</div>
        <AuthLinks>
          <Link to="/login">로그인</Link>
        </AuthLinks>
      </MinimalHeader>

      {/* --- 첫 화면에 보여질 랜딩 섹션 --- */}
      <LandingContainer>
        <Logo>세만추</Logo>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요"
            onKeyDown={handleSearch}
          />
          <SearchIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SearchIcon>
        </SearchWrapper>
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

      {/* --- 스크롤 시 나타나는 지도 섹션 --- */}
      <MapSection>
        <h2>습득물 현황 지도</h2>
        <p>건물을 클릭하면 습득물 목록을 확인할 수 있습니다.</p>
        <MapWrapper>
          <CampusMap />
        </MapWrapper>
      </MapSection>

      {/* --- 메인 페이지 전용 최소한의 푸터 --- */}
      <MinimalFooter>
        <p>© 2025-2 창의학기제 프로젝트. All rights reserved.</p>
      </MinimalFooter>
    </PageWrapper>
  );
};

export default MainPage;

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: #fff;
`;

const MinimalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  color: #A0A0A0;
  font-size: 0.9rem;

  .placeholder {
    font-weight: bold;
    opacity: 0.7;
  }
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  a {
    color: #A0A0A0;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LandingContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 4rem 1rem; /* 헤더/푸터에 가려지지 않도록 패딩 추가 */
`;

const Logo = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  color: #5834d4; /* 이미지의 보라색 계열 색상 */
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
  padding: 1rem 3.5rem 1rem 1.5rem; /* 아이콘을 위해 오른쪽 패딩 추가 */
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

const SearchIcon = styled.div`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShortcutButton = styled.button`
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.pink {
    background-color: #feebf0;
    color: #d6336c;
  }

  &.dark {
    background-color: #4B5563;
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
  background-color: #f8f9fa;
  
  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
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

const MinimalFooter = styled.footer`
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
  background-color: #f8f9fa;
`;