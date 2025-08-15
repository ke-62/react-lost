// /src/components/layout/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <p>© 2025-2 창의학기제 프로젝트. All rights reserved.</p>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 2rem 0;
  border-top: 1px solid #eee;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto; // 가운데 정렬
  padding: 0 2rem;
  text-align: center;
  color: #888;
`;