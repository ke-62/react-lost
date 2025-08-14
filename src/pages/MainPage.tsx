// /src/pages/MainPage.tsx
// 서비스의 메인 페이지
import React, { useState, useRef } from 'react'; // 1. useState와 useRef를 import 합니다.
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import CampusMap from '../components/map/CampusMap';
import logoImage from '../assets/logo.png';
import useAuth from '../components/hooks/useAuth';
import lensIcon from '../assets/lens.png';
import cameraIcon from '../assets/camera.png';

const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  // 2. 검색어 입력을 관리할 state를 추가합니다.
  const [searchTerm, setSearchTerm] = useState('');

  // 3. 숨겨진 파일 입력(input)에 접근하기 위한 ref를 생성합니다.
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 4. 검색 실행 함수를 만듭니다. (Enter키, 돋보기 클릭 시 사용)
  const executeSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/posts?search=${searchTerm.trim()}`);
    }
  };

  // 5. Enter 키를 눌렀을 때 검색을 실행하는 핸들러입니다.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };
  
  // 6. 카메라 아이콘을 클릭했을 때 파일 선택 창을 여는 핸들러입니다.
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // 7. 이미지 파일이 선택되었을 때 처리하는 핸들러입니다.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: 이미지 검색 API 호출 로직 구현
      console.log('선택된 이미지 파일:', file.name);
      alert(`${file.name} 이미지를 검색합니다. (기능 구현 필요)`);
    }
  };

  return (
    <PageWrapper>
      <MinimalHeader>
        <div className="placeholder">Who Made This</div>
        <AuthLinks>
          {isLoggedIn ? (
            <>
              <Link to="/chats">쪽지함</Link>
              <Separator>|</Separator>
              <Link to="/mypage">마이페이지</Link>
            </>
          ) : (
            <>
              <Link to="/signup">회원가입</Link>
              <Separator>|</Separator>
              <Link to="/login">로그인</Link>
            </>
          )}
        </AuthLinks>
      </MinimalHeader>

      <LandingContainer>
        <Logo src={logoImage} alt="세만추 로고" />
        <SearchWrapper>
          <SearchIcon isLeft={true} onClick={executeSearch}> {/* 돋보기 클릭 시 검색 실행 */}
            <img src={lensIcon} alt="검색" />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 입력값을 state에 반영
            onKeyDown={handleKeyDown} // Enter키 이벤트 연결
          />
          <SearchIcon isLeft={false} onClick={handleCameraClick}> {/* 카메라 클릭 시 파일 선택창 열기 */}
            <img src={cameraIcon} alt="이미지 검색" />
          </SearchIcon>
        </SearchWrapper>
        {/* 숨겨진 파일 업로드 input */}
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

      <MinimalFooter>
        <p>© 2025-2 창의학기제 프로젝트. All rights reserved.</p>
      </MinimalFooter>
    </PageWrapper>
  );
};

export default MainPage;

// --- Styled Components (이하 동일) ---
const PageWrapper = styled.div``;

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
  
  a {
    color: #555;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Separator = styled.span`
  margin: 0 0.5rem;
  color: #d2d2d2;
`;

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
`;