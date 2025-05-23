import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      dark: string;
      light: string;
      gray: string;
      white: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  }
}
