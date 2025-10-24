import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import lensIcon from '../assets/lens.png';
import cameraIcon from '../assets/camera.png';

interface Post {
  id: number;
  title: string;
  lostDate: string;
  lostLocation: string;
  itemCategory: string;
  itemStatus: string;
}

// 분실물 임시 데이터
const allPosts: Post[] = Array.from({ length: 100 }, (_, i) => {
  const id = 100 - i;

  // 96번 ~ 100번(= id 96..100)은 완전히 다른 임시 데이터로 채움
  if (id >= 96) {
    const special: Omit<Post, 'id'>[] = [
      {
        title: '운동장에서 열쇠를 잃어버렸습니다',
        lostDate: '25.10.02',
        lostLocation: '운동장',
        itemCategory: '열쇠',
        itemStatus: '찾는중'
      },
      {
        title: '기숙사 3층 복도에서 핑크색 텀블러 분실',
        lostDate: '25.10.01',
        lostLocation: '기숙사 3층',
        itemCategory: '주방용품',
        itemStatus: '찾는중'
      },
      {
        title: '학생회관 식당에서 신분증 분실',
        lostDate: '25.09.30',
        lostLocation: '학생회관 식당',
        itemCategory: '신분증',
        itemStatus: '찾는중'
      },
      {
        title: '영실관 B01강의실에 25학번 기계공항과 과잠 분실',
        lostDate: '25.09.28',
        lostLocation: '영실관',
        itemCategory: '의류',
        itemStatus: '찾는중'
      },
      {
        title: '군자관 서점에서 지갑 분실',
        lostDate: '25.09.27',
        lostLocation: '군자관',
        itemCategory: '전자기기',
        itemStatus: '찾는중'
      }
    ];

    const specialIndex = 100 - id;
    const s = special[specialIndex]!;
    return { id, ...s };
  }

  return {
    id,
    title:
      i % 3 === 0
        ? '광개토관에서 에어팟 잃어버렸어요'
        : i % 3 === 1
          ? '도서관에서 지갑 분실'
          : '학생회관에서 핸드폰 잃어버림',
    lostDate: '25.08.15',
    lostLocation: i % 3 === 0 ? '광개토관' : i % 3 === 1 ? '도서관' : '학생회관',
    itemCategory: i % 3 === 0 ? '전자기기' : i % 3 === 1 ? '지갑' : '전자기기',
    itemStatus: '완료'
  };
});

const POSTS_PER_PAGE = 20;

const PostWritePage = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'lost' | 'found'>('lost');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 검색 관련 함수들 추가
  const executeSearch = () => {
    console.log('검색 실행:', searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('이미지 검색:', file);
    }
  };

  // 검색 기능
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.lostLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.itemCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePostClick = (postId: number) => {
    navigate(`/lost/${postId}`);
  };

  const handleWriteClick = () => {
    navigate('/write'); // PostNewPage로 이동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <PageWrapper>
      <Header />

      <SearchContainer>
        <SearchWrapper>
          <SearchIcon isLeft={true} onClick={executeSearch}>
            <img src={lensIcon} alt="검색" />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="제목, 장소, 물품을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon isLeft={false} onClick={handleCameraClick}>
            <img src={cameraIcon} alt="이미지 검색" />
          </SearchIcon>
        </SearchWrapper>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </SearchContainer>

      <ButtonGroup>
        <TabButton
          $active={type === 'lost'}
          onClick={() => navigate('/lost')}  // 현재 페이지 유지
        >
          분실물
        </TabButton>
        <TabButton
          $active={type === 'found'}
          onClick={() => navigate('/found')}  // PostListPage로 이동
        >
          습득물
        </TabButton>
        <EveryTimeButton>에브리타임</EveryTimeButton>
      </ButtonGroup>


      <PostContainer>
        <TableContainer>
          <TableHeader>
            <HeaderCell style={{ width: '8%' }}>NO.</HeaderCell>
            <HeaderCell style={{ width: '35%' }}>제목</HeaderCell>
            <HeaderCell style={{ width: '15%' }}>분실일</HeaderCell>
            <HeaderCell style={{ width: '15%' }}>분실장소</HeaderCell>
            <HeaderCell style={{ width: '12%' }}>물품분류</HeaderCell>
            <HeaderCell style={{ width: '15%' }}>물품상태</HeaderCell>
          </TableHeader>

          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <PostRow key={post.id} onClick={() => handlePostClick(post.id)}>
                <RowCell style={{ width: '8%' }}>{post.id}</RowCell>
                <TitleCell style={{ width: '35%' }}>{post.title}</TitleCell>
                <RowCell style={{ width: '15%' }}>{post.lostDate}</RowCell>
                <RowCell style={{ width: '15%' }}>{post.lostLocation}</RowCell>
                <RowCell style={{ width: '12%' }}>{post.itemCategory}</RowCell>
                <RowCell style={{ width: '15%' }}>{post.itemStatus}</RowCell>
              </PostRow>
            ))
          ) : (
            <NoResultsRow>
              <NoResultsCell>검색 결과가 없습니다.</NoResultsCell>
            </NoResultsRow>
          )}
        </TableContainer>

        {filteredPosts.length > 0 && (
          <PaginationContainer>
            <Pagination>
              <PageButton
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ‹
              </PageButton>

              {getVisiblePages().map((pageNum) => (
                <PageNumber
                  key={pageNum}
                  $active={pageNum === currentPage}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </PageNumber>
              ))}

              <PageButton
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                ›
              </PageButton>
            </Pagination>

            <WriteButton onClick={handleWriteClick}>
              글쓰기
            </WriteButton>
          </PaginationContainer>
        )}
      </PostContainer>
    </PageWrapper>
  );
};

export default PostWritePage;

const PageWrapper = styled.div`
  background-color: transparent;
  min-height: 100vh;
  padding: 1.5rem;
`;

const Title = styled.h1`
  color: #5b4cdb;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 500px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 0.9rem;
  box-sizing: border-box;
  
  &:focus {
    border-color: #5b4cdb;
  }
`;

const SearchIcon = styled.div<{ isLeft: boolean }>`
  position: absolute;
  ${({ isLeft }) => isLeft ? 'left: 1rem;' : 'right: 1rem;'}
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  
  img {
    width: 16px;
    height: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 2rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  background: ${({ $active }) => ($active ? '#5b4cdb' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#666')};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: ${({ $active }) => ($active ? '#4a3eb8' : '#f5f5f5')};
  }
`;

const EveryTimeButton = styled.button`
  padding: 0.75rem 2rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const PostContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 0;
  font-weight: 600;
  color: #495057;
`;

const HeaderCell = styled.div`
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostRow = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9ff;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RowCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
`;

const TitleCell = styled(RowCell)`
  justify-content: flex-start;
  padding-left: 1rem;
  color: #5b4cdb;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #fafbfc;
  border-top: 1px solid #e9ecef;
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  
  &:hover:not(:disabled) {
    background: #f5f5f5;
  }
`;

const PageNumber = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background: ${({ $active }) => ($active ? '#5b4cdb' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#666')};
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 36px;
  
  &:hover {
    background: ${({ $active }) => ($active ? '#4a3eb8' : '#f5f5f5')};
  }
`;

const WriteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #5b4cdb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: #4a3eb8;
  }
`;

const NoResultsRow = styled.div`
  display: flex;
  padding: 3rem 0;
  justify-content: center;
  align-items: center;
`;

const NoResultsCell = styled.div`
  color: #999;
  font-size: 1rem;
  text-align: center;
`;