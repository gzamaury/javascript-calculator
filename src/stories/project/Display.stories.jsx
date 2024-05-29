/* eslint-disable storybook/use-storybook-expect */
/* expect now is imported form @storybook/test, not @storybook/jest */
import { within, userEvent, expect } from "@storybook/test";
import Display from "../../component/Display/Display";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Project/Display",
  component: Display,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Display {...args} />;

export const Default = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  displayId: "display",
  history: [[]],
  currentInput: ["0"],
};

export const Operation = Template.bind({});

Operation.args = {
  displayId: "display",
  history: [[]],
  currentInput: ["3523", "+", "1254", "=4777"],
};

export const History = {
  play: async ({ canvasElement }) => {
    const historyCopy = History.args.history.slice();
    const historyText = historyCopy
      .reverse()
      .map((subArray) => subArray.join(""))
      .join("");

    const canvas = within(canvasElement);
    const historyButton = canvas.getByRole("button", { name: /history/i });

    await expect(historyButton).toBeInTheDocument();
    await userEvent.click(historyButton);

    const display = canvas.getByTestId("display");

    await expect(display).toHaveTextContent(historyText);
  },
};

History.args = {
  displayId: "display",
  history: [
    ["3523", "+", "1254", "=4777"],
    ["2354", "-", "478", "=1876"],
    ["10541", "/", "3", "=3513.66"],
  ],
  currentInput: ["0"],
};
