// /src/App.tsx
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
import SignupPage from './pages/SignupPage'; // SignupPage 임포트
import ChatListPage from './pages/ChatListPage';
import ChatRoomPage from './pages/ChatRoomPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 독립적인 레이아웃을 사용하는 페이지들 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/* SignupPage 라우터 추가 */}

          {/* 공통 레이아웃(Header, Footer)을 사용하는 페이지들 */}
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