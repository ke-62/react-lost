import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RecentItems from '../components/common/RecentItems';
import useAuth from '../components/hooks/useAuth';

interface PostDetail {
  id: number;
  title: string;
  type: '습득물' | '분실물';
  acquisitionDate: string;
  acquisitionLocation: string;
  itemCategory: string;
  itemStatus: string;
  content: string;
  image?: string;
  createdAt: string;
  category?: string;
}

interface RecentItem {
  id: number;
  title: string;
  location: string;
  date: string;
  imageUrl?: string;
}

// 임시 관련 게시물 데이터
const dummyRecentItems: RecentItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: 2000 + i,
  title: i % 3 === 0 ? '광개토관에서 에어팟 발견' : i % 3 === 1 ? '광토 유캔두잇에서 지갑 주움' : '도서관에서 핸드폰 주움',
  location: i % 3 === 0 ? '광개토관' : i % 3 === 1 ? '광개토관' : '도서관',
  date: '25.08.14',
  imageUrl: undefined
}));

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const postId = parseInt(id);
      
      // PostNewPage에서 저장한 데이터 불러오기
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const foundPost = savedPosts.find((p: any) => p.id === postId);
      
      if (foundPost) {
        // PostNewPage에서 저장된 실제 데이터 사용
        const postDetail: PostDetail = {
          id: foundPost.id,
          title: foundPost.title,
          type: foundPost.type,
          acquisitionDate: foundPost.acquisitionDate,
          acquisitionLocation: foundPost.acquisitionLocation,
          itemCategory: foundPost.itemCategory,
          itemStatus: foundPost.itemStatus,
          content: foundPost.content,
          image: foundPost.image,
          createdAt: foundPost.createdAt,
          category: foundPost.category
        };
        setPost(postDetail);
      } else {
        // ID 기반으로 다른 임시 데이터 생성
        const tempPost = generateTempPostData(postId);
        setPost(tempPost);
      }
      setLoading(false);
    }
  }, [id]);

  // ID 기반으로 임시 데이터 생성하는 함수
  const generateTempPostData = (postId: number): PostDetail => {
    const postIndex = (postId ) % 3;
    
    const tempPosts = [
      {
        title: '광개토관에서 에어팟 발견',
        type: '습득물' as const,
        acquisitionDate: '25.08.13',
        acquisitionLocation: '광개토관',
        itemCategory: '전자기기',
        itemStatus: '보관중',
        content: `광개토관 2층 휴게실에서 에어팟을 발견했습니다.
흰색 케이스이며, 이름이 적혀있지 않습니다.`,
        createdAt: '25.08.13'
      },
       {
        title: '광토 유캔두잇에서 지갑 주움',
        type: '습득물' as const,
        acquisitionDate: '25.08.14',
        acquisitionLocation: '광개토관',
        itemCategory: '지갑',
        itemStatus: '상',
        content: `1층에서 유캔두잇에서 습득한 반지갑 습득하였습니다.
검은 색이며, 카드 3개만 들어있습니다.`,
        createdAt: '25.08.14'
      },
      {
        title: '도서관에서 핸드폰 주움',
        type: '분실물' as const,
        acquisitionDate: '25.08.12',
        acquisitionLocation: '도서관',
        itemCategory: '전자기기',
        itemStatus: '중',
        content: `도서관 1층 열람실에서 핸드폰을 주웠습니다.
삼성 갤럭시 모델이며, 검은색 케이스가 씌워져 있습니다.`,
        createdAt: '25.08.12'
      }
    ];

    const selectedPost = tempPosts[postIndex];

    return {
      id: postId,
      title: selectedPost.title,
      type: selectedPost.type,
      acquisitionDate: selectedPost.acquisitionDate,
      acquisitionLocation: selectedPost.acquisitionLocation,
      itemCategory: selectedPost.itemCategory,
      itemStatus: selectedPost.itemStatus,
      content: selectedPost.content,
      createdAt: selectedPost.createdAt
    };
  };


  const handleMessageClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다!');
      return;
    }
    navigate('/mypage');
  };

  if (loading) {
    return <LoadingWrapper>게시글을 불러오는 중...</LoadingWrapper>;
  }

  if (!post) {
    return <ErrorWrapper>게시글을 찾을 수 없습니다.</ErrorWrapper>;
  }

  return (
    <PageWrapper>
      <ContentContainer>
        <MainContent>
          <LeftSection>
            <PostImage 
              src={post.image || '/src/assets/placeholder-image.png'} 
              alt={post.title} 
            />
          </LeftSection>
          
          <RightSection>
            <PostTitle>{post.title}</PostTitle>
            <TagSection>
              <PostTag className={post.type === '습득물' ? 'found' : 'lost'}>
                {post.type}
              </PostTag>
              <MessageButton onClick={handleMessageClick}>쪽지하기</MessageButton>
            </TagSection>
            
            <InfoSection>
              <InfoRow>
                <InfoLabel>{post.type === '습득물' ? '습득일' : '분실일'}</InfoLabel>
                <InfoValue>{post.acquisitionDate}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>{post.type === '습득물' ? '습득장소' : '분실장소'}</InfoLabel>
                <InfoValue>{post.acquisitionLocation}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>물품분류</InfoLabel>
                <InfoValue>{post.itemCategory}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>물품상태</InfoLabel>
                <InfoValue>{post.itemStatus}</InfoValue>
              </InfoRow>
            </InfoSection>
            
            <ContentSection>
              <ContentText>{post.content}</ContentText>
            </ContentSection>
          </RightSection>
        </MainContent>
      </ContentContainer>

       <RecentItems 
        items={dummyRecentItems}
        title="최근 습득물"
        moreLink="/found"
        moreLinkText="게시물 더보기 >"
        itemLimit={6}
      />
    </PageWrapper>
  );
};

export default PostDetailPage;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: transparent;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  gap: 3rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const PostImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #e9ecef;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PostTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* justify-content: space-between 제거하고 gap 추가 */
`;

const PostTag = styled.span`
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  
  &.found {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  &.lost {
    background: #fce4ec;
    color: #c2185b;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  width: 80px;
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #333;
  font-size: 0.9rem;
`;

const ContentSection = styled.div`
  flex: 1;
`;

const ContentText = styled.p`
  line-height: 1.6;
  color: #333;
  font-size: 0.95rem;
  white-space: pre-line;
  margin: 0;
`;

const MessageButton = styled.button`
  background: rgba(255, 131, 176, 0.3);
  color: #FF83B0;
  border: none;
  padding: 9px 15px;
  border-radius: 20px; 
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 131, 176, 0.5); 
    color: #FF4081;
  }
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #e74c3c;
`;