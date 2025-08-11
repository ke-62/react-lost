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
          {/* Header와 Footer가 포함된 공통 레이아웃을 사용하는 페이지 그룹 */}
          <Route path="/" element={<Layout />}>
            {/* path="/"가 Layout의 기본 페이지가 됨 */}
            <Route index element={<MainPage />} />
            <Route path="posts" element={<PostListPage />} />
            <Route path="posts/:id" element={<PostDetailPage />} />
            <Route path="write" element={<PostWritePage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="chats" element={<ChatListPage />} />
            <Route path="chats/:id" element={<ChatRoomPage />} />
          </Route>

          {/* 공통 레이아웃을 사용하지 않는 페이지 */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;