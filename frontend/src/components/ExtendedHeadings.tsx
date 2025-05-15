import { createReactBlockSpec } from "@blocknote/react";
import styled from "@emotion/styled";

const StyledHeading = styled.div`
  font-weight: bold;
  margin: 0;
  font-size: 1.25rem;
`;

export const CustomHeadingBlock = createReactBlockSpec(
    {
      type: "customHeading",
      content: "inline",
      propSchema: {},
    },
    {
      render: (props) => {
        return (
          <StyledHeading
            as='h4'
            ref={props.contentRef}
          />
        );
      },
    }
  );
