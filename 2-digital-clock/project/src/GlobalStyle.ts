import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  #root {
  }
  input {
    border: none;
    background-color: transparent;
    outline: none;
    font-family: inherit;
    padding: 0;
  }
  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ul, li, ol{
    list-style: none;
  }
`;

export default GlobalStyle;
