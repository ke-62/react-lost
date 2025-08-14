// /src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /*
    1. public/fonts 폴더 안에 'Paperlogy.ttf' 파일이 있는지 확인해주세요.
       (방금 파일 이름을 위와 같이 변경했습니다.)
  */
  @font-face {
    font-family: 'Paperlogy';
    /* 🎨 2. 파일 경로를 방금 수정한 'Paperlogy.ttf'로 정확하게 수정합니다. */
    src: url('/fonts/Paperlogy.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html, body, #root {
    height: 100%; 
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Paperlogy', sans-serif;
  }

  body {
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
  }

  button {
    cursor: pointer;
  }
`;