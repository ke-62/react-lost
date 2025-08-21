import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import Logo from '../../assets/Logo.png';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation(); 

  const textLogoPaths = ['/', '/login', '/signup', '/mypage'];

  const showTextLogo = textLogoPaths.includes(location.pathname);

  return (
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
              {/* <NavLink to="/mypage">로그아웃</NavLink> */}
              <LogoutButton onClick={logout}>로그아웃</LogoutButton>
            </>
          ) : (
            <>
              <NavLink to="/signup">회원가입</NavLink>
              <Separator>|</Separator>
              <NavLink to="/login">로그인</NavLink>
            </>
          )}
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
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
    height: 40px; // 로고 이미지 높이 조절
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
  /* NavLink의 스타일을 그대로 복사 */
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