import React, { useState, ChangeEvent } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

import DatePicker, { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import {ko} from 'date-fns/locale/ko';
registerLocale('ko', ko);
// setDefaultLocale('ko');

function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time,setTime] = useState('');

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
    if (!file || !description.trim() || !location || !description.trim || !date || !time) {
      alert('모든 항목을 입력해 주세요');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('itemName',itemName);
    formData.append('location',location);
    formData.append('description', description);
    formData.append('date', date?.toISOString().split('T')[0] || '');
    formData.append('time',time);

    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      alert('업로드 완료!');
      navigate('/');
    } catch (err) {
      alert('업로드 실패');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 flex flex-col items-center text-center">
      <input
        type="file"
        accept="image/*"
        // capture="environment"
        onChange={handleFileChange}
        className="mb-3"
      />

      {/* {file && (
        <div className="mb-2 text-sm text-gray-600">
          선택한 파일: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )} */}

      {preview && (
        <img
          src={preview}
          alt="preview"
          onError={() => setPreview('')}
          className="w-40 h-40 object-cover mb-4 border rounded"
        />
      )}

      <input  
        type='text'
        placeholder='어떤 물건인가요'
        value={itemName}
        onChange={(e)=> setItemName(e.target.value)}
        className='w-full mb-4 p-2 border rounded'
      />

      <select
        value={location}
        onChange={(e)=> setLocation(e.target.value)}
        className='w-full mb-4 p-2 border rounded'
      >
        <option value="">발견 장소</option>
        <option value="집현관">집현관</option>
        <option value="대양홀">대양홀</option>
        <option value="모짜르트홀">모짜르트홀</option>
        <option value="군자관">군자관</option>
        <option value="광개토관">광개토관</option>
        <option value="이당관">이당관</option>
        <option value="진관홀">진관홀</option>
        <option value="용덕관">용덕관</option>
        <option value="영실관">영실관</option>
        <option value="충무관">충무관</option>
        <option value="율곡관">율곡관</option>
        <option value="다산관">다산관</option>
        <option value="학술정보원(동천관)">학술정보원(동천관)</option>
        <option value="세종관">세종관</option>
        <option value="군자관">군자관</option>
        <option value="학생회관">학생회관</option>
        <option value="대양AI센터">대양AI센터</option>
        <option value="운동장">운동장</option>
        <option value="길목이나 그 외">길목이나 그 외</option>
      </select>


      <textarea 
        placeholder='유실물과 발견 장소에 대한 상세 설명을 입력하세요(ex. 학생회관 지하 1층 식당 앞)'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full mb-4 p-2 border rounded'
        rows={3}
      />

      <DatePicker
        selected={date}
        onChange={(selectedDate: Date | null ) => setDate(selectedDate)}
        locale="ko"
        dateFormat="yyyy-MM-dd"
        placeholderText='습득 날짜'
        className='w-full mb-4 p-2 border rounded'
      />

      <label className='w-full mb-5 text-center text-sm text-gray-300'>
        습득 시간
      </label>
      <input 
        type='time'
        value={time}
        className='w-full mb-4 p-2 border rounded'
        onChange={(e)=> setTime(e.target.value)}
      />

      <Button onClick={handleUpload}>유실물 업로드 하기</Button>
    </div>
  );
}

export default Upload;