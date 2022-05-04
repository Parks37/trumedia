import styled from "styled-components";

import { hexToRGBA } from "@wedgekit/color";

const WeekPanel = styled.div`
  background: ${hexToRGBA("#5f5f7d", 0.25)};
  padding: 5px;
  border-radius: 5px;
  grid-area: QuickFacts;
`;

export default WeekPanel;
