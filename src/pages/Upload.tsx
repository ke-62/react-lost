import React, { useState, ChangeEvent } from 'react';
import Button from '../components/Button';

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

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

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      alert('업로드 완료!');
    } catch (err) {
      alert('업로드 실패');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 flex flex-col items-center text-center">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="mb-3"
      />

      {file && (
        <div className="mb-2 text-sm text-gray-600">
          선택한 파일: {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </div>
      )}

      {preview && (
        <img
          src={preview}
          alt="preview"
          onError={() => setPreview('')}
          className="w-40 h-40 object-cover mb-4 border rounded"
        />
      )}

      <Button onClick={handleUpload}>유실물 업로드 하기</Button>
    </div>
  );
}

export default Upload;