import { createReactBlockSpec } from "@blocknote/react";
import type { JSX } from "@emotion/react/jsx-runtime";
import styled from "@emotion/styled";

const StyledHeading = styled.div<{ level: number }>`
  font-weight: bold;
  margin: 0;
  ${({ level }) => {
    switch (level) {
      case 4:
        return "font-size: 1.25rem;";
      case 5:
        return "font-size: 1rem;";
      case 6:
        return "font-size: 0.875rem;";
      default:
        return "";
    }
  }}
`;

export const CustomHeadingBlock = createReactBlockSpec(
    {
      type: "customHeading",
      content: "inline",
      propSchema: {
        level: { default: 4, values: [4, 5, 6] },
      },
    },
    {
      render: (props) => {
        return (
          <StyledHeading
            as={`h${props.block.props.level}` as keyof JSX.IntrinsicElements}
            level={props.block.props.level}
            ref={props.contentRef}
          />
        );
      },
    }
  );
