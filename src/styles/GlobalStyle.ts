// /src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 
  @font-face {
    font-family: 'Paperlogy';
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