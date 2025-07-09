// src/pages/Match.tsx
import React, { useState, ChangeEvent } from 'react';
import Button from '../components/Button';

const Match: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      alert('사진을 업로드해주세요!');
      return;
    }

    // 실제 AI 유사도 요청은 여기에서
    alert('AI 유사도 검색 요청 전송!');
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">내 물건 찾기 (AI 유사도 검색)</h2>
      <input type="file" accept="image/*" onChange={handleChange} className="mb-4" />
      {preview && (
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