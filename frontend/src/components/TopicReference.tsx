import { Menu, TextInput } from "@mantine/core";
import styled from "@emotion/styled";
import { createReactBlockSpec } from "@blocknote/react";

const WidgetContainer = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-left: 4px solid #e67700;
  background-color: #fffbe6;
  border-radius: 8px;
  margin: 8px 0;
`;

const MenuTrigger = styled.div`
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 8px;
`;

const WidgetInfo = styled.div`
  font-size: 0.875rem;
  margin-bottom: 8px;
  color: #555;
`;

export const TopicReference = createReactBlockSpec(
  {
    type: "topicReference",
    propSchema: {
      widget_type: { default: "TOPIC_REFERENCE", values: ["TOPIC_REFERENCE"] },
      ref_topic_id: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { ref_topic_id } = props.block.props;

      const updateProp = <K extends keyof typeof props.block.props>(
        key: K,
        value: (typeof props.block.props)[K]
      ) => {
        props.editor.updateBlock(props.block, {
          type: "topicReference",
          props: {
            ...props.block.props,
            [key]: value,
          },
        });
      };

      return (
        <WidgetContainer>
          <Menu withinPortal={false} closeOnItemClick={false}>
            <Menu.Target>
              <MenuTrigger contentEditable={false}>Topic Widget</MenuTrigger>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Topic Reference Settings</Menu.Label>
              <Menu.Divider />
              <Menu.Item>
                <TextInput
                  value={ref_topic_id}
                  onChange={(e) => updateProp("ref_topic_id", e.currentTarget.value)}
                  placeholder="Enter Topic ID"
                />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <WidgetInfo>
            Topic ID: <strong>{ref_topic_id || "—"}</strong>
          </WidgetInfo>
        </WidgetContainer>
      );
    },
  }
);
