import { createGlobalStyle } from 'styled-components';
import { css } from 'styled-components';

const RobotoFont = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
`;

const GlobalStyle = createGlobalStyle`
 
  *{
    ${RobotoFont}
    margin:0;
    border: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font: 12px Roboto, sans-serif;

    font-weight: 300;

   }
   body{
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font: 12px Roboto, sans-serif;

    font-weight: 300;

  }
  p, .MuiButton-label{
    font: 12px Roboto, sans-serif;
  }
  html, body, .App, #root{
    height: 100%;
    width: 100%;
    flex-wrap: wrap;
    font: 12px Roboto, sans-serif;
   
  }
  .MuiInput-input, .Mui-selected, .MuiListItem-button{
    font: 12px Roboto, sans-serif;
  }
`;

export default GlobalStyle;
