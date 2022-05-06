import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.div`
  background: #1a1919;
  box-sizing: border-box;
  column-gap: 2.5vw;
  display: grid;
  grid-template-areas: "PlayerSelector LineChart ChartPanel" ". QuickFacts ChartPanel";
  grid-template-columns: 15vw auto 15vw;
  grid-template-rows: 55vh auto;
  height: 100vh;
  padding: 2.5vh 2.5vw;
  row-gap: 5vh;
  width: 100vw;
`;

export const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }

  body {
    margin: 0;
    font-family: "Gill Sans", sans-serif;
    color: white;
  }


`;
