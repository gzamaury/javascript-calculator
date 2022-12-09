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
};
