import { Menu, Switch, TextInput } from "@mantine/core";
import styled from "@emotion/styled";
import { createReactBlockSpec } from "@blocknote/react";

export const widgetTypes = ["RESOURCE_SIDE", "RESOURCE_INLINE"] as const;
export const subtypes = ["SMALL", "SHORT", "HERO"] as const;

const WidgetContainer = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-left: 4px solid #4c6ef5;
  background-color: #f8f9fa;
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

export const ResourceReference = createReactBlockSpec(
  {
    type: "resourceReference",
    propSchema: {
      widget_type: { default: "RESOURCE_REFERENCE", values: ["RESOURCE_REFERENCE"] },
      show_author: { default: false },
      show_description: { default: true },
      rich_widget_type: { default: "RESOURCE_SIDE", values: widgetTypes },
      resource_subtype: { default: "SMALL", values: subtypes },
      resource_id: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      const {
        show_author,
        show_description,
        rich_widget_type,
        resource_subtype,
        resource_id,
      } = props.block.props;

      const updateProp = <K extends keyof typeof props.block.props>(
        key: K,
        value: (typeof props.block.props)[K]
      ) => {
        props.editor.updateBlock(props.block, {
          type: "resourceReference",
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
              <MenuTrigger contentEditable={false}>Resource Widget</MenuTrigger>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Widget Settings</Menu.Label>
              <Menu.Divider />

              <Menu.Label>Rich Widget Type</Menu.Label>
              {widgetTypes.map((type) => (
                <Menu.Item
                  key={type}
                  onClick={() => updateProp("rich_widget_type", type)}
                >
                  {type}
                </Menu.Item>
              ))}

              <Menu.Label>Subtype</Menu.Label>
              {subtypes.map((subtype) => (
                <Menu.Item
                  key={subtype}
                  onClick={() => updateProp("resource_subtype", subtype)}
                >
                  {subtype}
                </Menu.Item>
              ))}

              <Menu.Divider />
              <Menu.Label>Toggle Options</Menu.Label>
              <Menu.Item>
                <Switch
                  label="Show Author"
                  checked={show_author}
                  onChange={(e) => updateProp("show_author", e.currentTarget.checked)}
                />
              </Menu.Item>
              <Menu.Item>
                <Switch
                  label="Show Description"
                  checked={show_description}
                  onChange={(e) =>
                    updateProp("show_description", e.currentTarget.checked)
                  }
                />
              </Menu.Item>

              <Menu.Divider />
              <Menu.Label>Resource ID</Menu.Label>
              <Menu.Item>
                <TextInput
                  value={resource_id}
                  onChange={(e) => updateProp("resource_id", e.currentTarget.value)}
                  placeholder="Enter Resource ID"
                />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <WidgetInfo>
            <div>
              Widget: <strong>{rich_widget_type}</strong> | Subtype:{" "}
              <strong>{resource_subtype}</strong>
            </div>
            <div>ID: {resource_id || "—"}</div>
            <div>
              {show_author && "Author shown"} {show_description && "Description shown"}
            </div>
          </WidgetInfo>

          <div className="inline-content" ref={props.contentRef} />
        </WidgetContainer>
      );
    },
  }
);
