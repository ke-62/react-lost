// import React from 'react';
// import styled from 'styled-components';

// const Footer = () => {
//   return (
//     <FooterWrapper>
//       <FooterContent>
//         <HeaderText>Who Made This</HeaderText>
//         <LogoText>세만추</LogoText>
//         <ServiceTitle>세만추 : 세종대 유실물 포털</ServiceTitle>
//         <ServiceDescription>
//           세종대에서 잃어버린 물건과의 만남을 이곳에서 추구하고자 제작된 서비스입니다.
//         </ServiceDescription>
//       </FooterContent>
//     </FooterWrapper>
//   );
// };

// export default Footer;

// const FooterWrapper = styled.footer`
//   width: 100%;
//   background: #E8E1F5;
//   padding: 4rem 0 6rem 0;
//   margin-top: 4rem;
// `;

// const FooterContent = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 1.5rem;
// `;

// const HeaderText = styled.h2`
//   color: #5b4cdb;
//   font-size: 2rem;
//   font-weight: 500;
//   margin: 0;
// `;

// const LogoText = styled.h1`
//   color: #5b4cdb;
//   font-size: 4rem;
//   font-weight: bold;
//   margin: 0;
  
//   /* 세만추 로고 스타일 */
//   span:nth-child(1) { color: #5b4cdb; } /* 세 */
//   span:nth-child(2) { color: #ff69b4; } /* 만 */
//   span:nth-child(3) { color: #5b4cdb; } /* 추 */
// `;

// const ServiceTitle = styled.h3`
//   color: #333;
//   font-size: 1.2rem;
//   font-weight: 600;
//   margin: 0;
//   margin-top: 1rem;
// `;

// const ServiceDescription = styled.p`
//   color: #666;
//   font-size: 1rem;
//   line-height: 1.5;
//   margin: 0;
//   max-width: 600px;
// `;

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