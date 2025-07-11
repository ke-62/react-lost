import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getToken } from '../utils/auth';
import Button from '../components/Button';

interface Item {
  id: string;
  itemName: string;
  description: string;
  // imageUrl, location 등 진행 경로 보고 수정하기
}

const MyItems: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [errorShown, setErrorShown] = useState(false);
  const [loginAlerted, setLoginAlerted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      if (!isLoggedIn()) {
        if (!loginAlerted) {
          alert('로그인이 필요합니다.');
          setLoginAlerted(true);
        }
        navigate('/login');
        return;
      }

      //임시확인용
      const dummyItems = [
        { id: '24010964', itemName:'에어팟', description: '학술정보원 4층'}, 
        { id: '24010964', itemName:'지갑', description: '학생회관 1층'}
      ];
      setItems(dummyItems);


      try {
        const res = await fetch('/api/my-items', {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });

        if (!res.ok) throw new Error('서버 응답 오류');

        const data = await res.json();
        setItems(data);
      } catch (err) {
        if (!errorShown) {
          alert('여기도 뭐 연동해야 함요~');
          setErrorShown(true);
        }
      }
    };

    fetchItems();
  }, [navigate, loginAlerted, errorShown]);

  return (
    <div className="pt-24 px-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">내가 등록한 유실물</h2>
      {items.length === 0 ? (
        <p className="text-gray-300">등록한 유실물이 없습니다.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="bg-white rounded shadow p-4 mb-3">
            <p className="font-bold">{item.itemName}</p>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <Button onClick={() => navigate(`/edit/${item.id}`)}>
              수정하기
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyItems;