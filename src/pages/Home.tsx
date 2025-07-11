import React from "react";
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">AI 기반 유실물 통합 시스템</h1>
      <p className="text-gray-600 mb-6">사진으로 빠르게 유실물을 찾아보세요.</p>

      {/* ✅ 버튼 두 개 나란히 배치 */}
      <div className="flex space-x-4">
        <Button onClick={() => navigate('/upload')}>습득한 유실물 등록하기</Button>
        <Button onClick={() => navigate('/result')}>등록된 유실물 보기</Button>
        <Button onClick={() => navigate('/match')}>내 물건 찾기</Button>
        <Button onClick={()=> navigate('/My-Items')}>내가 등록한 유실물 확인하기</Button>
      </div>
    </div>
  );
};

export default Home;