import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './Button'; // Adjust the import path based on your project structure

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    primary: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    label: { control: 'text' },
    onClick: { action: 'Added to cart' },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const AddToCart = Template.bind({});
AddToCart.args = {
  primary: true,
  backgroundColor: "gray",
  label: 'Add To Cart ',
 
};

export const LogIn  = Template.bind({});
LogIn.args = {
  primary: true,
  backgroundColor: "black",
  label: 'LogIn ',
};