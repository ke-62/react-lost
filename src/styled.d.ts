import 'styled-components';

// styled-components의 DefaultTheme 타입을 확장하여 우리 프로젝트의 테마 타입을 정의합니다.
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
  }
}