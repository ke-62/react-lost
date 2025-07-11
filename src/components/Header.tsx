import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 flex justify-between items-center p-4 bg-zinc-700 text-white">
      {isHome ? (
        <>
          <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>AI 유실물 시스템</div>
          <div>
            {isLoggedIn ? (
              <Button onClick={handleLogout} className="bg-white text-black px-3 py-1 rounded">
                로그아웃
              </Button>
            ) : (
              <Button onClick={() => navigate('/login')} className="bg-white text-black px-3 py-1 rounded">
                로그인
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full flex justify-end">
          <Button onClick={() => navigate('/')} className="bg-white text-black px-3 py-1 rounded">
            홈화면 가기
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;