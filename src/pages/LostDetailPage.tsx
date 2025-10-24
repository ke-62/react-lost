import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecentItems from '../components/common/RecentItems';
import useAuth from '../components/hooks/useAuth';


interface LostDetail {
    id: number;
    title: string;
    type: '분실물';
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
    title: i % 3 === 0 ? '광개토관에서 에어팟 잃어버렸어요' : i % 3 === 1 ? '도서관에서 지갑 분실' : '학생회관에서 핸드폰 잃어버림',
    location: i % 3 === 0 ? '광개토관' : i % 3 === 1 ? '도서관' : '학생회관',
    date: '25.08.15',
    imageUrl: undefined
}));

const LostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [post, setPost] = useState<LostDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // 분실물 임시 데이터 생성 함수
    const generateLostPostData = (postId: number): LostDetail => {
        // 96~100번은 특별 데이터
        if (postId >= 96 && postId <= 100) {
            const specialPosts = [
                {
                    title: '운동장에서 열쇠를 잃어버렸습니다',
                    type: '분실물' as const,
                    acquisitionDate: '25.10.02',
                    acquisitionLocation: '운동장',
                    itemCategory: '열쇠',
                    itemStatus: '찾는중',
                    content: `운동장에서 차 열쇠를 잃어버렸습니다.
현대 로고가 있는 검은색 키 케이스입니다.`,
                    createdAt: '25.10.02'
                },
                {
                    title: '기숙사 3층 복도에서 핑크색 텀블러 분실',
                    type: '분실물' as const,
                    acquisitionDate: '25.10.01',
                    acquisitionLocation: '기숙사 3층',
                    itemCategory: '주방용품',
                    itemStatus: '찾는중',
                    content: `기숙사 3층 복도에서 핑크색 스탠리 텀블러를 잃어버렸습니다.
이름 스티커가 붙어있습니다.`,
                    createdAt: '25.10.01'
                },
                {
                    title: '학생회관 식당에서 신분증 분실',
                    type: '분실물' as const,
                    acquisitionDate: '25.09.30',
                    acquisitionLocation: '학생회관 식당',
                    itemCategory: '신분증',
                    itemStatus: '찾는중',
                    content: `학생회관 식당에서 주민등록증을 잃어버렸습니다.
투명 카드 케이스에 들어있었습니다.`,
                    createdAt: '25.09.30'
                },
                {
                    title: '영실관 B01강의실에 25학번 기계공항과 과잠 분실',
                    type: '분실물' as const,
                    acquisitionDate: '25.09.28',
                    acquisitionLocation: '영실관',
                    itemCategory: '의류',
                    itemStatus: '찾는중',
                    content: `영실관 B01 강의실에서 기계공항과 과잠을 잃어버렸습니다.
검은색이며 등 뒤에 25학번이 적혀있습니다.`,
                    createdAt: '25.09.28'
                },
                {
                    title: '군자관 서점에서 지갑 분실',
                    type: '분실물' as const,
                    acquisitionDate: '25.09.27',
                    acquisitionLocation: '군자관',
                    itemCategory: '지갑',
                    itemStatus: '찾는중',
                    content: `군자관 서점에서 검정색 지갑을 잃어버렸습니다.
학생증과 신용카드가 들어있습니다.`,
                    image: '/src/assets/wallet.jpeg',
                    createdAt: '25.09.27'
                }
            ];

            const specialIndex = 100 - postId;
            return {
                id: postId,
                ...specialPosts[specialIndex]
            };
        }

        // 일반 분실물 데이터
        const i = 100 - postId;

        return {
            id: postId,
            title:
                i % 3 === 0
                    ? '광개토관에서 에어팟 잃어버렸어요'
                    : i % 3 === 1
                        ? '도서관에서 지갑 분실'
                        : '학생회관에서 핸드폰 잃어버림',
            type: '분실물' as const,
            acquisitionDate: '25.08.15',
            acquisitionLocation: i % 3 === 0 ? '광개토관' : i % 3 === 1 ? '도서관' : '학생회관',
            itemCategory: i % 3 === 0 ? '전자기기' : i % 3 === 1 ? '지갑' : '전자기기',
            itemStatus: '완료',
            content: i % 3 === 0
                ? '광개토관에서 에어팟을 잃어버렸습니다.'
                : i % 3 === 1
                    ? '도서관에서 지갑을 잃어버렸습니다.'
                    : '학생회관에서 핸드폰을 잃어버렸습니다.',
            createdAt: '25.08.15'
        };
    };

    useEffect(() => {
        if (id) {
            const postId = parseInt(id);

            // PostNewPage에서 저장한 데이터 불러오기
            const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
            const foundPost = savedPosts.find((p: any) => p.id === postId && p.type === '분실물');

            if (foundPost) {
                const postDetail: LostDetail = {
                    id: foundPost.id,
                    title: foundPost.title,
                    type: '분실물',
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
                const tempPost = generateLostPostData(postId);
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
        navigate('/mypage');
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
                                <MessageButton
                                    onClick={handleMessageClick}
                                    disabled={post.id <= 95}
                                >
                                    쪽지하기
                                </MessageButton>
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


export default LostDetailPage;

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
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  
  &.lost {
    background: rgba(255, 82, 82, 0.15);
    color: #ff5252;
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

const MessageButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) =>
        disabled ? 'rgba(200, 200, 200, 0.3)' : 'rgba(255, 131, 176, 0.3)'};
  color: ${({ disabled }) =>
        disabled ? '#999' : '#FF83B0'};
  border: none;
  padding: 9px 15px;
  border-radius: 20px; 
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ disabled }) =>
        disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    background: ${({ disabled }) =>
        disabled ? 'rgba(200, 200, 200, 0.3)' : 'rgba(255, 131, 176, 0.5)'};
    color: ${({ disabled }) =>
        disabled ? '#999' : '#FF4081'};
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