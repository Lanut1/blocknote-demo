import { Menu, TextInput } from "@mantine/core";
import styled from "@emotion/styled";
import { createReactBlockSpec } from "@blocknote/react";

const ImageContainer = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-left: 4px solid #339af0;
  background-color: #e7f5ff;
  border-radius: 8px;
  margin: 8px 0;
`;

const MenuTrigger = styled.div`
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 8px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const Link = styled.a`
  font-size: 0.875rem;
  color: #1c7ed6;
  text-decoration: underline;
`;

export const imageWidget = createReactBlockSpec(
  {
    type: "imageWidget",
    propSchema: {
      widget_type: { default: "IMAGE", values: ["IMAGE"] },
      image_url: { default: "" },
      description: { default: "" },
      url: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { image_url, description, url } = props.block.props;

      const updateProp = <K extends keyof typeof props.block.props>(
        key: K,
        value: (typeof props.block.props)[K]
      ) => {
        props.editor.updateBlock(props.block, {
          type: "imageWidget",
          props: {
            ...props.block.props,
            [key]: value,
          },
        });
      };

      return (
        <ImageContainer>
          <Menu withinPortal={false} closeOnItemClick={false}>
            <Menu.Target>
              <MenuTrigger contentEditable={false}>Image Widget</MenuTrigger>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Image Settings</Menu.Label>
              <Menu.Divider />
              <Menu.Item>
                <TextInput
                  value={image_url}
                  onChange={(e) => updateProp("image_url", e.currentTarget.value)}
                  placeholder="Image URL"
                />
              </Menu.Item>
              <Menu.Item>
                <TextInput
                  value={description}
                  onChange={(e) => updateProp("description", e.currentTarget.value)}
                  placeholder="Description"
                />
              </Menu.Item>
              <Menu.Item>
                <TextInput
                  value={url}
                  onChange={(e) => updateProp("url", e.currentTarget.value)}
                  placeholder="External Link"
                />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {image_url && <ImagePreview src={image_url} alt={description} />}
          {description && <Description>{description}</Description>}
          {url && (
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </Link>
          )}
        </ImageContainer>
      );
    },
  }
);
