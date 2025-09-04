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
import ScrollToTop from './utils/ScrollToTop';
import PostNewPage from './pages/PostNewPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/found" element={<PostListPage />} />
          <Route path="/lost" element={<PostWritePage />} />
          <Route path="/write" element={<PostNewPage />} />

          
          
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