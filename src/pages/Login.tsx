import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('학번과 비밀번호를 입력하세요');
      return;
    }
// 임시확인용
    if (username === '24010964' && password === '1234') {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('username', username);
      alert(`환영합니다, ${username}님!`);
      navigate('/');
      return;
    }
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        alert(`환영합니다, ${username}님!`);
        navigate('/');
      } else {
        alert(data.message || '로그인 실패');
      }
    } catch (err) {
      alert('서버 오류');
    }
  };

  return (
    <div className="w-full flex justify-center mt-20 px-4">
      <div className="w-full max-w-sm p-6 rounded-lg bg-zinc-800 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">로그인</h2>
        <input
          type="text"
          placeholder="학번"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-zinc-700 text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 rounded bg-zinc-700 text-white placeholder-gray-400"
        />
        <Button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded hover:bg-zinc-900"
        >
          로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;