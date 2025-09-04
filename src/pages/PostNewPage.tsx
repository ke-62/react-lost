import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppHeader from '../components/layout/Header';

const PostNewPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    itemDate: '',
    location: '',
    itemCategory: '',
    status: '',
    sort: '',
    content: '',
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageButtonClick = () => {
    document.getElementById('imageInput')?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 확인
    if (!formData.title || !formData.itemDate || !formData.content || !formData.itemCategory || !formData.location || !formData.sort) {
    alert('필수 항목을 모두 입력해주세요.');
    return;
  }
    // 새 게시물 데이터 생성
    const newPost = {
      id: Date.now(), // 임시 ID
      title: formData.title,
      date: formData.itemDate,
      location: formData.location,
      category: formData.itemCategory,
      status: formData.status,
      type: formData.sort, // 습득물/분실물 구분
      content: formData.content,
      image: imagePreview,
      createdAt: new Date().toLocaleDateString('ko-KR')
    };

    // localStorage에 게시물 저장 (백엔드 연동 전 임시)
    const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    existingPosts.unshift(newPost); // 최신 게시물이 맨 위로
    localStorage.setItem('posts', JSON.stringify(existingPosts));

    // 성공 알림
    alert('정상적으로 등록되었습니다.');
    
    // 구분에 따라 해당 페이지로 이동
    if (formData.sort === '습득물') {
      navigate('/found');
    } else if (formData.sort === '분실물') {
      navigate('/lost');
    } else {
      navigate('/found'); // 기본값
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <PageWrapper>
      <AppHeader />
      
      <ContentContainer>
        <FormRow>
          <LabelColumn>제목</LabelColumn>
          <InputColumn>
            <Input 
              type="text" 
              name="title" 
              value={formData.title}
              onChange={handleInputChange}
              placeholder="(필수)제목을 작성해주세요"
              required
            />
          </InputColumn>
        </FormRow>

        <FormRow>
          <LabelColumn>키워드</LabelColumn>
          <InputColumn>
            <Input 
              type="text" 
              name="category" 
              value={formData.category}
              onChange={handleInputChange}
              placeholder="키워드"
              required
            />
          </InputColumn>
        </FormRow>

        <FiveColumnRow>
          <ColumnGroup>
            <Label>습득일(필수)</Label>
            <DateInput 
              type="date" 
              name="itemDate" 
              value={formData.itemDate}
              onChange={handleInputChange}
              max={today}
              required
            />
          </ColumnGroup>
          
          <ColumnGroup>
            <Label>습득장소</Label>
            <Select 
              name="location" 
              value={formData.location}
              onChange={handleInputChange}
              required
            >
              <option value="">(필수)습득장소</option>
              <option value="광개토관">광개토관</option>
              <option value="도서관">도서관</option>
              <option value="학생회관">학생회관</option>
              <option value="공학관">공학관</option>
            </Select>
          </ColumnGroup>
          
          <ColumnGroup>
            <Label>물품분류</Label>
            <Select 
              name="itemCategory" 
              value={formData.itemCategory}
              onChange={handleInputChange}
              required
            >
              <option value="">(필수)물품분류</option>
              <option value="전자기기">전자기기</option>
              <option value="지갑">지갑</option>
              <option value="의류">의류</option>
              <option value="가방">가방</option>
              <option value="기타">기타</option>
            </Select>
          </ColumnGroup>
          
          <ColumnGroup>
            <Label>물품상태</Label>
            <Select 
              name="status" 
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">상태선택</option>
              <option value="상">상</option>
              <option value="중">중</option>
              <option value="하">하</option>
            </Select>
          </ColumnGroup>
          
          <ColumnGroup>
            <Label>구분</Label>
            <Select 
              name="sort" 
              value={formData.sort}
              onChange={handleInputChange}
              required
            >
              <option value="">(필수)구분(습득물/분실물)</option>
              <option value="습득물">습득물</option>
              <option value="분실물">분실물</option>
            </Select>
          </ColumnGroup>
        </FiveColumnRow>

        <ContentSection>
          <ContentTextArea 
            name="content" 
            value={formData.content}
            onChange={handleInputChange}
            placeholder="(필수)내용을 입력하세요"
            rows={15}
            required
          />
        </ContentSection>

        {/* 이미지 미리보기 */}
        {imagePreview && (
          <ImagePreviewSection>
            <ImagePreview src={imagePreview} alt="업로드된 이미지" />
          </ImagePreviewSection>
        )}

        <ButtonSection>
          <ImageButton type="button" onClick={handleImageButtonClick}>
            이미지 업로드
          </ImageButton>
          <HiddenFileInput 
            id="imageInput"
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
          />
          <SubmitButton type="submit" onClick={handleSubmit}>
            등록
          </SubmitButton>
        </ButtonSection>
      </ContentContainer>
    </PageWrapper>
  );
};

export default PostNewPage;

// ...existing styled components...

const ImagePreviewSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

// 기존 styled-components는 그대로...
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 2rem;
`;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const LabelColumn = styled.div`
  width: 100px;
  font-weight: 600;
  color: #333;
  font-size: 18px;
`;

const InputColumn = styled.div`
  flex: 1;
  margin-left: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  background: #F5F5F5;
  
  &:focus {
    outline: none;
    border-color: #5b4cdb;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  background: #F5F5F5;
  
  &:focus {
    outline: none;
    border-color: #5b4cdb;
  }
`;

const FiveColumnRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ColumnGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
`;

const DateInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  background: #F5F5F5;
  
  &:focus {
    outline: none;
    border-color: #5b4cdb;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 2rem;
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 300px;
  background: #F5F5F5;
  
  &:focus {
    outline: none;
    border-color: #5b4cdb;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #ff69b4;
  background: #ff69b4;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95rem;
  
  &:hover {
    background: #ff1493;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  background: #5b4cdb;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  
  &:hover {
    background: #4a3eb8;
  }
`;