import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.div`
  background: #1a1919;
  box-sizing: border-box;
  column-gap: 2.5vw;
  display: grid;
  grid-template-areas:"Header Header Header" "PlayerSelector LineChart ChartPanel" ". QuickFacts .";
  grid-template-columns: 15vw auto 15vw;
  grid-template-rows: min-content 50vh auto;
  height: 100vh;
  padding: 2.5vh 2.5vw;
  row-gap: 5vh;
  width: 100vw;
  overflow: auto;

  @media screen and (max-width: 1024px) {
    grid-template-areas:"Header Header" "PlayerSelector ChartPanel" "LineChart LineChart" "QuickFacts QuickFacts"  ;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 30vh 50vh 1fr;
    padding-bottom: 50vh;
`;

export const HeaderWrapper = styled.div`
  grid-area: Header;
  display: flex;
  flex-direction: row;
  justify-content: center;
  & h2 {
    margin: 0;
  }
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
