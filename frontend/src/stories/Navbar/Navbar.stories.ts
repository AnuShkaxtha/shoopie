import {Navbar} from "./Navbar"
import { fn } from '@storybook/test';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: { action: 'Logged Out' },
    onCreateAccount: fn(),
  },
};

export const LoggedIn = {
  args: {
    user: {
      name: 'Anushka',
    },
  },
};

export const LoggedOut = {};
