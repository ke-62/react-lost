// /src/components/layout/Layout.tsx
// 공통 레이아웃 컴포넌트. Header와 Footer를 포함합니다.
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', padding: '1rem' }}>
        <Outlet /> {/* 라우팅되는 페이지 컴포넌트가 이곳에 렌더링됩니다. */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;