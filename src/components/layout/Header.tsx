import React, { useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
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
            <PlaceholderLogo>
              <Link to="/">Who Made This</Link>
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
  color: #a0a0a0;
  opacity: 0.7;
  font-size: 0.9rem;

  a {
    text-decoration: none;
    color: inherit;
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

// const LogoutButton = styled.button`
//   background: none;
//   border: none;
//   color: #333;
//   cursor: pointer;
//   font-weight: 500;
  
//   &:hover {
//     color: #5b4cdb;
//   }
// `;
