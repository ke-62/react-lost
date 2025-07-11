// src/pages/Match.tsx
import React, { useState, ChangeEvent } from 'react';
import Button from '../components/Button';

const Match: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      setFile(null);
      setPreview('');
    }
  };

  const handleSearch = async () => {
    if (!file) {
      alert('사진을 업로드해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      await fetch('/api/match', {
        method: 'POST',
        body: formData,
      });

      alert('로딩중?  뭐 이런거 해 두기 ai 연동시키면서 ');
    } catch (err) {
      alert('검색 실패');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">내 물건 찾기 (AI 유사도 검색)</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-3"
      />

      {file && (
        <img
          src={preview}
          alt="preview"
          className="w-40 h-40 object-cover border rounded mx-auto mb-4"
        />
      )}

      <Button onClick={handleSearch}>유사한 유실물 검색</Button>
    </div>
  );
};

export default Match;