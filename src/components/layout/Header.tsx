// /src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <HeaderWrapper>
      <HeaderContent>
        <PlaceholderLogo>
          <Link to="/">Who Made This</Link>
        </PlaceholderLogo>
        <Nav>
          {isLoggedIn ? (
            <>
              <NavLink to="/chats">쪽지함</NavLink>
              <Separator>|</Separator>
              <NavLink to="/mypage">마이페이지</NavLink>
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