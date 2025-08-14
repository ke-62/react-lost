// /src/styles/GlobalStyle.ts
// 프로젝트 전반에 적용될 전역 스타일 정의
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%; 
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    
    background: linear-gradient(
      180deg, 
      #FDFBFF 0%, 
      #FCE1F0 60%, 
      #EADCFE 100% 
    );
    background-attachment: fixed; 
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }
`;