import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import RecentItems from '../components/common/RecentItems';
import logoImage from '../assets/Logo.png';
import CampusMap from '../components/map/CampusMap';

interface RecentItem {
  id: number;
  title: string;
  location: string;
  date: string;
  imageUrl?: string;
}

// 이미지 검색 결과용 더미 데이터
const imageSearchResults = [
  {
    id: 100,
    title: '학생회관3층 남자화장실에서 아이폰 14있음',
    location: '학생회관',
    date: '25.08.13',
    imageUrl: '/src/assets/iphone14.jpeg',
    similarity: 95
  },
  {
    id: 99,
    title: '학습정보관 4층 열람실에서 에어팟 프로 발견',
    location: '학습정보관',
    date: '25.08.14',
    imageUrl: '/src/assets/airpods.jpeg',
    similarity: 88
  },
  {
    id: 98,
    title: '광개토관 206강의실에서 학생증 발견',
    location: '광개토관',
    date: '25.08.14',
    imageUrl: '/src/assets/card.JPG',
    similarity: 82
  }
];

// 벡앤드 연동 전 임시 아이템들
const dummyRecentItems: RecentItem[] = [
  {
    id: 1,
    title: '에어팟 프로',
    location: '학술정보원',
    date: '2025-12-03',
    imageUrl: './src/assets/airpods.jpeg'
  },
  {
    id: 2,
    title: '학생증',
    location: '광개토관',
    date: '2025-12-02',
    imageUrl: './src/assets/card.JPG'
  },
  {
    id: 3,
    title: '검정색 카드지갑',
    location: '학생회관',
    date: '2025-12-01',
    imageUrl: './src/assets/wallet.jpeg'
  },
  {
    id: 4,
    title: '아이패드',
    location: '운동장',
    date: '2025-11-28',
    imageUrl: './src/assets/ipad.jpeg'
  },
  {
    id: 5,
    title: '아이폰 14',
    location: '광개토관',
    date: '2025-11-27',
    imageUrl: './src/assets/iphone14.jpeg'
  }
];

const MainPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isImageSearching, setIsImageSearching] = useState(false);
  const [showImageResults, setShowImageResults] = useState(false);

  const handleSearch = () => {
    if (selectedImage) {
      // 이미지 검색
      setIsImageSearching(true);
      setShowImageResults(false);

      // 2초 후 결과 표시
      setTimeout(() => {
        setIsImageSearching(false);
        setShowImageResults(true);
      }, 2000);
    } else if (searchQuery.trim()) {
      // 일반 텍스트 검색
      navigate(`/found?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setShowImageResults(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <PageWrapper>
      <Header />

      <LandingContainer>
        <Logo src={logoImage} alt="세만추 로고" />

        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="잃어버린 물건을 검색해보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!!selectedImage}
          />
          <SearchIconButton onClick={handleSearch}>
            🔍
          </SearchIconButton>
          <ImageUploadLabel htmlFor="image-upload">
            📷
          </ImageUploadLabel>
          <ImageUploadInput
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {selectedImage && (
            <SelectedImageName>
              {selectedImage.name}
              <RemoveImageButton onClick={() => {
                setSelectedImage(null);
                setShowImageResults(false);
              }}>
                ✕
              </RemoveImageButton>
            </SelectedImageName>
          )}
        </SearchWrapper>

        {isImageSearching && (
          <LoadingMessage>
            이미지 분석 중입니다...
          </LoadingMessage>
        )}

        {showImageResults && (
          <ImageResultsContainer>
            <ResultsTitle>유사도 높은 게시물 TOP 3</ResultsTitle>
            <ResultsList>
              {imageSearchResults.map((item, index) => (
                <ResultCard key={item.id} onClick={() => handleResultClick(item.id)}>
                  <RankBadge rank={index + 1}>TOP {index + 1}</RankBadge>
                  <ResultImage src={item.imageUrl} alt={item.title} />
                  <ResultInfo>
                    <ResultTitle>{item.title}</ResultTitle>
                    <ResultMeta>
                      <ResultLocation>{item.location}</ResultLocation>
                      <ResultDate>{item.date}</ResultDate>
                    </ResultMeta>
                    <SimilarityBar>
                      <SimilarityFill width={item.similarity} />
                      <SimilarityText>유사도 {item.similarity}%</SimilarityText>
                    </SimilarityBar>
                  </ResultInfo>
                </ResultCard>
              ))}
            </ResultsList>
          </ImageResultsContainer>
        )}
        <ButtonWrapper>
          <ShortcutButton className="pink" onClick={() => navigate('/lost')}>
            분실물 게시판 바로가기
          </ShortcutButton>
          <ShortcutButton className="dark" onClick={() => navigate('/found')}>
            습득물 게시판 바로가기
          </ShortcutButton>
        </ButtonWrapper>
      </LandingContainer>

      <MapSection>
        <h2>습득물 현황 지도</h2>
        <p>건물을 클릭하면 습득물 목록을 확인할 수 있습니다.</p>
        <MapWrapper>
          <CampusMap />
        </MapWrapper>
      </MapSection>

      <RecentItems
        items={dummyRecentItems}
        title="최근 습득물"
        moreLink="/found"
        moreLinkText="게시물 더보기 >"
        itemLimit={6}
      />
      <FooterSection>
        <FooterContent>
          <FooterColumn>
            <HeaderText>Who Made This</HeaderText>
            <FooterLogo src={logoImage} alt="세만추 로고" />
            <ServiceTitle>잃어버린 물건, 다시 만나다.</ServiceTitle>
            <ServiceTitle>세만추 : 세종대 유실물 포털</ServiceTitle>
            <ServiceDescription>
              세만추는 '세종대에서 잃어버린 물건과의 만남을 추구'하는 서비스입니다.
            </ServiceDescription>
            <ServiceDescription>
              교내에서 물건을 잃어버리거나 습득했을 때, 분실자와 습득자가 쉽고 빠르게 연결될 수 있도록 돕는 세종대학교 학생들을 위한 유실물 플랫폼입니다.
            </ServiceDescription>
          </FooterColumn>

          <FooterColumn>
            <HeaderText>How To Use</HeaderText>

            <UsageSection>
              <UsageTitle>분실물 등록</UsageTitle>
              <UsageDescription>
                물건을 잃어버리셨나요? 잃어버린 물건이 정보와 사진을 업로드해 보세요.<br />
                습득자가 등록된 분실물 게시물을 보고 연락할 수 있습니다.
              </UsageDescription>
            </UsageSection>

            <UsageSection>
              <UsageTitle>습득물 등록</UsageTitle>
              <UsageDescription>
                물건을 주우셨나요? 습득한 물건의 정보와 습득 장소를 등록해 주세요. 분실자가 빠르게 자신의 물건을 찾을 수 있도록 돕습니다.
              </UsageDescription>
            </UsageSection>

            <UsageSection>
              <UsageTitle>이용 순서</UsageTitle>
              <UsageList>
                <li>1. 회원가입/로그인: 세종대학교 학생 인증을 통해 회원가입 후 로그인하세요.</li>
                <li>2. 게시물 등록: 잃어버린 물건이나 습득한 물건을 '분실물', '습득물' 게시판에 등록합니다. 이때, 사진을 첨부하면 더 좋습니다.</li>
                <li>3. 검색 및 확인: 원하는 물건을 찾기 위해 검색 기능을 활용하거나 게시판을 둘러보세요.</li>
                <li>4. 연락 및 전달: 게시물에 댓글을 남기거나 쪽지를 보내 분실자 또는 습득자에게 연락합니다.</li>
                <li>5. 만남 및 전달: 안전한 장소에서 직접 만나 물건을 확인하고 전달합니다.</li>
              </UsageList>
            </UsageSection>
          </FooterColumn>
        </FooterContent>
      </FooterSection>
    </PageWrapper>
  );
};

export default MainPage;

// ...existing styled components...

const SearchIconButton = styled.button`
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ImageUploadLabel = styled.label`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const SelectedImageName = styled.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  font-size: 0.85rem;
  color: #5834d4;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveImageButton = styled.button`
  background: none;
  border: none;
  color: #ff4081;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  
  &:hover {
    opacity: 0.7;
  }
`;

const LoadingMessage = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #5834d4;
  font-weight: 500;
  animation: pulse 1.5s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ImageResultsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const ResultsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ResultCard = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(88, 52, 212, 0.2);
    transform: translateY(-2px);
  }
`;

const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ rank }) =>
    rank === 1 ? '#FFD700' :
      rank === 2 ? '#C0C0C0' :
        '#CD7F32'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1;
`;

const ResultImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const ResultInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const ResultMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const ResultLocation = styled.span``;

const ResultDate = styled.span``;

const SimilarityBar = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
  background: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
`;

const SimilarityFill = styled.div<{ width: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ width }) => width}%;
  background: linear-gradient(90deg, #5834d4, #8b6de8);
  transition: width 0.5s ease;
`;

const SimilarityText = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #333;
  font-weight: 600;
  z-index: 1;
`;

const PageWrapper = styled.div``;

const LandingContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 4rem 1rem;
`;

const Logo = styled.img`
  width: 450px;
  height: auto;
  margin-bottom: 2.5rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 550px;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  &::placeholder {
    color: #c0c0c0;
  }

  &:focus {
    border-color: #5834d4;
    box-shadow: 0 4px 12px rgba(88, 52, 212, 0.2);
  }
`;

const SearchIcon = styled.div<{ isLeft: boolean }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    left: ${({ isLeft }) => (isLeft ? '20px' : 'auto')};
    right: ${({ isLeft }) => (isLeft ? 'auto' : '20px')};

    img {
      width: 20px;
      height: 20px;
      opacity: 0.5;
    }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShortcutButton = styled.button`
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &.pink {
    background-color: #FF83B0;
    color: white;
  }

  &.dark {
    background-color: #5834d4; 
    color: white;
  }
    
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MapSection = styled.section`
  padding: 5rem 2rem;
  text-align: center;
  
  h2 {
    color: #504791; 
    font-size: 2.5rem; 
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: #FF83B0;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const MapWrapper = styled.div`
  height: 600px;
  margin-top: 1rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
`;

const FooterSection = styled.section`
  width: 100%;
  background: transparent;
  padding: 4rem 0 6rem 0;
  margin-top: 4rem;
`;


const HeaderText = styled.h2`
  color: #504791;
  font-size: 32px;
  font-weight: 500;
  margin: 0;
`;

const FooterLogo = styled.img`
  width: 300px;
  height: auto;
  margin: 1rem 0;
`;

const ServiceTitle = styled.h3`
  color: #504791;
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  margin-top: 1rem;
`;

const ServiceDescription = styled.p`
  color: #504791;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
  max-width: 600px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  gap: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const UsageSection = styled.div`
  margin-top: 1rem;
`;

const UsageTitle = styled.h4`
  color: #504791;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const UsageDescription = styled.p`
  color: #504791;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
`;

const UsageList = styled.ol`
  color: #504791;
  font-size: 15px;
  line-height: 1.8;
  margin: 0;
  padding-left: 0;
  list-style: none;

  li {
    margin-bottom: 0.5rem;
  }
`;
