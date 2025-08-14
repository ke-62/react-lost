import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

// Layout 및 페이지 컴포넌트 임포트
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import ChatListPage from './pages/ChatListPage';
import ChatRoomPage from './pages/ChatRoomPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지는 헤더/푸터가 없는 독립적인 레이아웃을 사용합니다. */}
          <Route path="/" element={<MainPage />} />

          {/* 로그인 페이지도 독립적인 레이아웃을 사용합니다. */}
          <Route path="/login" element={<LoginPage />} />

          {/* 나머지 페이지들은 Header와 Footer가 포함된 공통 레이아웃을 사용합니다. */}
          <Route element={<Layout />}>
            <Route path="posts" element={<PostListPage />} />
            <Route path="posts/:id" element={<PostDetailPage />} />
            <Route path="write" element={<PostWritePage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="chats" element={<ChatListPage />} />
            <Route path="chats/:id" element={<ChatRoomPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;