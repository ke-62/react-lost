import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

interface RecentItem {
  id: number;
  title: string;
  location: string;
  date: string; 
  imageUrl?: string;
}

interface RecentItemsProps {
  title?: string;
  moreLink?: string;
  moreLinkText?: string;
  items: RecentItem[];
  itemLimit?: number;
  onItemClick?: (itemId: number) => void;
}

const RecentItems: React.FC<RecentItemsProps> = ({
  title = "최근 습득물",
  moreLink = "/found",
  moreLinkText = "게시물 더보기 >",
  items,
  itemLimit = 6,
  onItemClick
}) => {
  const navigate = useNavigate();

  const handleItemClick = (itemId: number) => {
    if (onItemClick) {
      onItemClick(itemId);
    } else {
      navigate(`/posts/${itemId}`);
    }
  };

  return (
    <RecentItemsSection>
      <SectionHeader>
        <h2>{title}</h2>
        <MoreLink to={moreLink}>{moreLinkText}</MoreLink>
      </SectionHeader>

      <ItemsGridContainer>
        {items.slice(0, itemLimit).map((item) => (
          <ItemCard key={item.id} onClick={() => handleItemClick(item.id)}>
            <ItemImage imageUrl={item.imageUrl} />
            <ItemInfoWrapper>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemMeta>{item.date}</ItemMeta>
            </ItemInfoWrapper>
          </ItemCard>
        ))}
      </ItemsGridContainer>
    </RecentItemsSection>
  );
};

export default RecentItems;

const RecentItemsSection = styled.section`
  padding: 0 2rem 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;

  h2 {
    color: #000000;
    font-size: 36px;
    font-weight: 266;
    margin: 0;
  }
`;

const MoreLink = styled(Link)`
  color: #888; 
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    color: #504791;
  }
`;

const ItemsGridContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  overflow: hidden;
`;

const ItemCard = styled.div`
  flex: 0 0 calc(16.66% - 1rem);
  max-width: calc(16.66% - 1rem);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ItemImage = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 180px; 
  background-color: #f0f0f0;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
`;

const ItemInfoWrapper = styled.div`
  padding: 1rem;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 500; 
  color: #000000; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemMeta = styled.p`
  font-size: 13px; 
  font-weight: 300;
  color: rgba(0, 0, 0, 0.3);
  margin: 0;
`;