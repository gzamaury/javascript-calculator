import { within, userEvent, expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import Key from "../../component/Key/Key";
import icons from "../../component/Key/icons";

export default {
  title: "Project/Key",
  component: Key,
  argTypes: {
    keyId: {
      table: {
        disable: true,
      },
    },
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: "select",
    },
    keyChar: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => <Key {...args} />;

export const Default = Template.bind({});
Default.args = {
  keyId: "zero",
  icon: icons.zero,
  keyChar: "0",
  onClick: action("onClick"),
};

export const NumberKey = Template.bind({});
NumberKey.args = {
  keyId: "seven",
  icon: icons.seven,
  keyChar: "7",
  onClick: action("onClick"),
};

export const SymbolKey = Template.bind({});
SymbolKey.args = {
  keyId: "add",
  icon: icons.add,
  keyChar: "+",
  onClick: action("onClick"),
};

// 'play' functions to simulate a click
NumberKey.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const keyElement = canvas.getByText(NumberKey.args.keyChar);

  // Simulate a click on the key element
  await userEvent.click(keyElement);

  // Verify that the click has occurred
  expect(keyElement).toBeVisible();
};

SymbolKey.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const keyElement = canvas.getByText(SymbolKey.args.keyChar);
  await userEvent.click(keyElement);
  expect(keyElement).toBeVisible();
};
