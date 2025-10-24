import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import Logo from '../../assets/Logo.png';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const closeAll = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsTeamModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const textLogoPaths = ['/']; // login, signup 경로 제거
  const showTextLogo = textLogoPaths.includes(location.pathname);

  return (
    <>
      <HeaderWrapper>
        <HeaderContent>
          {showTextLogo ? (
            <PlaceholderLogo onClick={() => setIsTeamModalOpen(true)}>
              Who Made This
            </PlaceholderLogo>
          ) : (
            <ImageLogo>
              <Link to="/">
                <img src={Logo} alt="세만추 로고" />
              </Link>
            </ImageLogo>
          )}
          <Nav>
            {isLoggedIn ? (
              <>
                <NavLink to="/mypage">마이페이지</NavLink>
                <Separator>|</Separator>
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              </>
            ) : (
              <>
                <ModalButton onClick={openSignup}>회원가입</ModalButton>
                <Separator>|</Separator>
                <ModalButton onClick={openLogin}>로그인</ModalButton>
              </>
            )}
          </Nav>
        </HeaderContent>
      </HeaderWrapper>

      {/* 모달들 */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAll}
        onSwitchToSignup={openSignup}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={closeAll}
        onSwitchToLogin={openLogin}
      />

      {/* 팀 소개 모달 */}
      {isTeamModalOpen && (
        <TeamModalOverlay onClick={closeAll}>
          <TeamModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeAll}>×</CloseButton>
            <TeamGrid>
              <TeamRow>
                <TeamRole>BACKEND</TeamRole>
                <TeamMember>권부성</TeamMember>
              </TeamRow>
              <TeamRow>
                <TeamRole>FRONTEND</TeamRole>
                <TeamMember>이고은</TeamMember>
              </TeamRow>
              <TeamRow>
                <TeamRole>AI</TeamRole>
                <TeamMember>최희두</TeamMember>
              </TeamRow>
              <TeamRow>
                <TeamRole>DESIGN</TeamRole>
                <TeamMember>박서현</TeamMember>
              </TeamRow>
            </TeamGrid>
          </TeamModalContent>
        </TeamModalOverlay>
      )}
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  background: transparent;
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlaceholderLogo = styled.div`
  font-weight: bold;
  color: #504791;
  opacity: 0.7;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const ImageLogo = styled.div`
  a {
    display: flex;
    align-items: center;
  }
  img {
    height: 40px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #504791;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0 0.75rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  color: #d2d2d2;
  font-size: 0.8rem;
`;

const LogoutButton = styled.button`
  color: #504791;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ModalButton = styled.button`
  text-decoration: none;
  color: #504791;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0 0.75rem;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TeamModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TeamModalContent = styled.div`
  background: #E8E3F3;
  padding: 3rem;
  border-radius: 16px;
  position: relative;
  min-width: 400px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #504791;
  cursor: pointer;
  line-height: 1;
  
  &:hover {
    opacity: 0.7;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamRole = styled.div`
  color: #504791;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  flex: 1;
`;

const TeamMember = styled.div`
  color: #504791;
  font-size: 1.1rem;
  font-weight: 400;
  text-align: right;
  flex: 1;
`;