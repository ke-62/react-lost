// src/pages/EditItem.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

const EditItem: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then(res => res.json())
      .then(data => {
        setItemName(data.itemName);
        setDescription(data.description);
        setIsFound(data.found);
      });
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemName, description })
    });
    alert('수정 완료!');
    navigate('/my-items');
  };

  const handleMarkFound = async () => {
    const confirm = window.confirm('한 번 주인 찾음으로 표시하면 되돌릴 수 없습니다. 계속할까요?');
    if (!confirm) return;

    await fetch(`/api/items/${id}/found`, {
      method: 'POST'
    });

    alert('주인 찾음으로 표시되었습니다.');
    setIsFound(true);
  };

  return (
    <div className="pt-24 max-w-xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-white mb-6">유실물 수정</h2>
      <input
        type="text"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        rows={4}
      />
      <div className="flex space-x-4">
        <Button onClick={handleUpdate}>수정 완료</Button>
        <Button onClick={handleMarkFound} className="bg-red-600 hover:bg-red-700">
          주인 찾음
        </Button>
      </div>
    </div>
  );
};

export default EditItem;