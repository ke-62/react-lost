import { DefaultTheme } from 'styled-components';

// declare module 부분이 사라지고, 순수 테마 객체만 남습니다.
const theme: DefaultTheme = {
  colors: {
    primary: '#005bac', // 세종대학교 메인 색상
    secondary: '#d2d2d2',
    accent: '#e60012',
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
  },
};

export default theme;