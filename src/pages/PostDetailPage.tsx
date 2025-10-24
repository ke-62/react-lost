import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecentItems from '../components/common/RecentItems';
import useAuth from '../components/hooks/useAuth';

interface PostDetail {
  id: number;
  title: string;
  type: '습득물';
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

  // 습득물 임시 데이터 생성 함수
  const generateFoundPostData = (postId: number): PostDetail => {
    // 96~100번은 특별 데이터
    if (postId >= 96 && postId <= 100) {
      const specialPosts = [
        {
          title: '학생회관3층 남자화장실에서 아이폰 14있음',
          type: '습득물' as const,
          acquisitionDate: '25.08.13',
          acquisitionLocation: '학생회관',
          itemCategory: '전자기기',
          itemStatus: '보관중',
          content: `학생회관 3층 남자 화장실에서 아이폰 14를 습득했습니다.
케이스티파이 케이스가 씌워져 있습니다.`,
          image: '/src/assets/iphone14.jpeg',
          createdAt: '25.08.13'
        },
        {
          title: '학습정보관 4층 열람실에서 에어팟 프로 발견',
          type: '습득물' as const,
          acquisitionDate: '25.08.14',
          acquisitionLocation: '학습정보관',
          itemCategory: '전자기기',
          itemStatus: '보관중',
          content: `학습정보관 4층 열람실 책상에서 에어팟 프로 2를 발견했습니다.
하얀색이며, 케이스는 없습니다.`,
          image: '/src/assets/airpods.jpeg',
          createdAt: '25.08.14'
        },
        {
          title: '광개토관 206강의실에서 학생증 발견',
          type: '습득물' as const,
          acquisitionDate: '25.08.14',
          acquisitionLocation: '광개토관',
          itemCategory: '신분증',
          itemStatus: '보관중',
          content: `광개토관 206호 강의실에서 학생증을 습득했습니다.
컴퓨터공학과 학생증입니다.`,
          image: '/src/assets/card.JPG',
          createdAt: '25.08.14'
        },
        {
          title: '대양 ai 지하 1층 엘리베이터 앞에서 아이패드 주움',
          type: '습득물' as const,
          acquisitionDate: '25.08.13',
          acquisitionLocation: '대양 ai',
          itemCategory: '전자기기',
          itemStatus: '보관중',
          content: `대양 ai 지하 1층 엘리베이터 앞에서 아이패드를 주웠습니다.
검은색 가죽 케이스가 씌워져 있습니다.`,
          image: '/src/assets/ipad.jpeg',
          createdAt: '25.08.13'
        },
        {
          title: '대양ai 투썸에서 검정색 카드지갑 주움',
          type: '습득물' as const,
          acquisitionDate: '25.08.13',
          acquisitionLocation: '대양 ai',
          itemCategory: '지갑',
          itemStatus: '보관중',
          content: `대양 ai 투썸플레이스에서 검정색 카드지갑을 주웠습니다.
운전면허증, 신분증과 몇 장의 카드가 들어있습니다.`,
          image: '/src/assets/wallet.jpeg',
          createdAt: '25.08.13'
        }
      ];

      const specialIndex = 100 - postId;
      return {
        id: postId,
        ...specialPosts[specialIndex]
      };
    }

    // 일반 습득물 데이터
    const i = 100 - postId;

    return {
      id: postId,
      title:
        i % 3 === 0
          ? '광개토관에서 에어팟 발견'
          : i % 3 === 1
            ? '도서관에서 지갑 주움'
            : '학생회관에서 핸드폰 주움',
      type: '습득물' as const,
      acquisitionDate: '25.08.14',
      acquisitionLocation: i % 3 === 0 ? '광개토관' : i % 3 === 1 ? '도서관' : '학생회관',
      itemCategory: i % 3 === 0 ? '전자기기' : i % 3 === 1 ? '지갑' : '전자기기',
      itemStatus: '완료',
      content: i % 3 === 0
        ? '광개토관 2층 휴게실에서 에어팟을 발견했습니다.\n케이스는 없으며, 이름이 적혀있지 않습니다.'
        : i % 3 === 1
          ? '도서관 1층에서 지갑을 주웠습니다.\n검은색 반지갑이며, 카드 3개가 들어있습니다.'
          : '학생회관 2층에서 핸드폰을 주웠습니다.\n삼성 갤럭시 모델이며, 검은색 케이스가 씌워져 있습니다.',
      image: '/src/assets/airpods.jpeg',
      createdAt: '25.12.02'
    };
  };

  useEffect(() => {
    if (id) {
      const postId = parseInt(id);

      // PostNewPage에서 저장한 데이터 불러오기
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const foundPost = savedPosts.find((p: any) => p.id === postId && p.type === '습득물');

      if (foundPost) {
        const postDetail: PostDetail = {
          id: foundPost.id,
          title: foundPost.title,
          type: '습득물',
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
        const tempPost = generateFoundPostData(postId);
        setPost(tempPost);
      }
      setLoading(false);
    }
  }, [id]);

  const handleMessageClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다!');
      return;
    }

    // 새로운 채팅 사용자 정보를 localStorage에 저장
    const newChatUser = {
      id: post?.id || 0,
      name: '익명0100',
      lastMessage: '',
      lastMessageTime: '방금',
      postId: post?.id,
      postTitle: post?.title || '학생회관3층 남자화장실에서 아이폰 14있음' // 게시물 제목 추가
    };

    // 기존 채팅 목록 가져오기
    const existingChats = JSON.parse(localStorage.getItem('chatUsers') || '[]');

    // 이미 해당 게시물에 대한 채팅이 있는지 확인
    const chatExists = existingChats.some((chat: any) => chat.postId === post?.id);

    if (!chatExists) {
      existingChats.push(newChatUser);
      localStorage.setItem('chatUsers', JSON.stringify(existingChats));
    }

    // 해당 채팅방으로 이동하면서 postId를 전달
    navigate('/mypage', { state: { selectedUserId: post?.id } });
  };

  if (loading) {
    return <LoadingWrapper>게시글을 불러오는 중...</LoadingWrapper>;
  }

  if (!post) {
    return <ErrorWrapper>게시글을 찾을 수 없습니다.</ErrorWrapper>;
  }



  return (
    <>
      <Header />
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
                <PostTag className="lost">분실물</PostTag>
                <MessageButton onClick={handleMessageClick}>쪽지하기</MessageButton>
              </TagSection>

              <InfoSection>
                <InfoRow>
                  <InfoLabel>분실일</InfoLabel>
                  <InfoValue>{post.acquisitionDate}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>분실장소</InfoLabel>
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
          title="최근 분실물"
          moreLink="/lost"
          moreLinkText="게시물 더보기 >"
          itemLimit={6}
        />
      </PageWrapper>
      <Footer />
    </>
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
  gap: 1rem;
`;

const PostTag = styled.span`
  padding: 9px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  
  &.lost {
    background: rgba(131, 176, 255, 0.3);
    color: #4A90E2;
  }
  
  &.found {
    background: #e3f2fd;
    color: #1976d2;
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