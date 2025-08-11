// /src/pages/MainPage.tsx
// 서비스의 메인 페이지
import React from 'react';
import Button from "../components/common/Button"
import { useNavigate } from 'react-router-dom';
import CampusMap from '../components/map/CampusMap';

const MainPage = () => {
   const navigate = useNavigate();
  return (
    <div>
      {/* 검색창 (키워드 + 이미지 검색) [cite: 8] */}
      <section style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>세종대에서 잃어버린 물건을 찾아보세요 [cite: 6]</h2>
        <input type="text" placeholder="찾으시는 물건을 검색해보세요." style={{ width: '50%', padding: '0.5rem' }} />
      </section>

      {/* 분실물/습득물 바로가기 [cite: 9] */}
      {/* <section style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '2rem' }}> */}
       <Button onClick={() => navigate('/PostListPage')}>분실물 보러가기</Button> 
      <Button onClick={() => navigate('/PostLinkPage')}>등록된 유실물 보기</Button>
      {/* </section> */}

      {/* 유실물 한눈에 보기 (지도) [cite: 11] */}
      <section style={{ padding: '2rem' }}>
        <h3 style={{ textAlign: 'center' }}>습득물 현황 지도</h3>
        <p style={{ textAlign: 'center' }}>건물을 클릭하면 습득물 목록을 확인할 수 있습니다.</p>
        <div style={{ height: '500px', marginTop: '1rem' }}>
          {/* 카카오맵 API를 사용하는 컴포넌트 [cite: 11] */}
          <CampusMap />
        </div>
      </section>
    </div>
  );
};

export default MainPage;