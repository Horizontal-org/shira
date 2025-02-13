import type { Meta, StoryObj } from '@storybook/react';
import { MobileMenu } from './MobileMenu';

const meta = {
  title: 'Components/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onNavigate: { 
      description: 'Callback function when menu items are clicked',
      action: 'navigated'
    },
    onClose: {
      description: 'Callback function when close button is clicked',
      action: 'closed'
    },
    translatedTexts: {
      description: 'Object containing translated text for menu items',
      control: 'object'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default view
export const Default: Story = {
  args: {
    translatedTexts: {
      home: 'Home',
      about: 'About',
      logIn: 'Log In',
      createSpace: 'Create Space'
    },
    onNavigate: (route: string) => console.log('Navigate to:', route),
    onClose: () => console.log('Menu closed')
  }
};

// With different language
export const SpanishTranslation: Story = {
  args: {
    ...Default.args,
    translatedTexts: {
      home: 'Inicio',
      about: 'Acerca',
      logIn: 'Iniciar Sesión',
      createSpace: 'Crear Espacio'
    }
  }
};

// With very long text
export const LongText: Story = {
  args: {
    ...Default.args,
    translatedTexts: {
      home: 'Home Page With Very Long Text That Might Wrap',
      about: 'About Us And Our Very Long Company Name Section',
      logIn: 'Log In To Your Account',
      createSpace: 'Create A New Collaborative Space'
    }
  }
};