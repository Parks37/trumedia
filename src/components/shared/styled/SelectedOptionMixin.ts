import { css } from "styled-components";

import { hexToRGBA } from "@wedgekit/color";

const SelectedOptionMixin = css<{ selected: boolean }>`
  background: ${({ selected }) => selected && "#5f5f7d"};
  cursor: pointer;

  &:hover {
    background: ${({ selected }) =>
      !selected ? hexToRGBA("#5f5f7d", 0.25) : hexToRGBA("#5f5f7d", 0.75)};
  }
`;

export default SelectedOptionMixin;
