// /src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo>
          <Link to="/">세만추</Link>
        </Logo>
        <Nav>
          <NavLink to="/posts?type=lost">분실물</NavLink>
          <NavLink to="/posts?type=found">습득물</NavLink>
          <NavLink to="/mypage">마이페이지</NavLink>
          <NavLink to="/login">로그인</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;

// 헤더의 배경색과 전체 너비를 설정
const HeaderWrapper = styled.header`
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
`;

// 헤더 내용물을 담고 가운데 정렬하는 컨테이너
const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto; // 이 부분이 가운데 정렬의 핵심입니다.
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #555;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;