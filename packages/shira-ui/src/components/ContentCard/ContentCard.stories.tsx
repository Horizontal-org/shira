import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { LuNotepadText } from 'react-icons/lu';
import { ContentCard } from './ContentCard';
import { Body1, SubHeading2 } from '../Typography';

const meta = {
  title: 'Components/ContentCard',
  component: ContentCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <Container><Story /></Container>],
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const Container = styled.div`
  width: min(580px, calc(100vw - 32px));
`;

const Title = styled(SubHeading2)`
  margin-bottom: 12px;
`;

const EmailLink = styled.a`
  display: block;
  color: inherit;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

export const Default: Story = {
  render: () => (
    <ContentCard aria-labelledby="help-title">
      <Title as="h2" id="help-title">Help Center</Title>
      <Body1>
        Visit our Help Center to learn more about features and how to use Shira
        to train your team or community.
      </Body1>
    </ContentCard>
  ),
};

export const Contact: Story = {
  render: () => (
    <ContentCard aria-labelledby="contact-title">
      <Title as="h2" id="contact-title">Contact us</Title>
      <Body1>
        If you need any support please email us at
        <EmailLink href="mailto:contact@wearehorizontal.org">
          contact@wearehorizontal.org
        </EmailLink>
      </Body1>
    </ContentCard>
  ),
};

const TemplateCard = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardHeader = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 50%;
  color: ${props => props.theme.colors.green7};
  background: ${props => props.theme.colors.light.paleGreen};
`;

export const ClickableTemplate: Story = {
  render: function ClickableTemplateStory() {
    const [clicks, setClicks] = useState(0);
    return (
      <>
        <TemplateCard as="button" type="button" onClick={() => setClicks(value => value + 1)}>
          <CardHeader>
            <CardIcon aria-hidden="true"><LuNotepadText size={24} /></CardIcon>
            <SubHeading2 as="span">Quiz templates</SubHeading2>
          </CardHeader>
          <Body1 as="span">
            Create a quiz instantly by choosing from our quiz templates,
            available in multiple apps and languages.
          </Body1>
        </TemplateCard>
        <Body1 role="status">Card activated {clicks} times</Body1>
      </>
    );
  },
};

export const Narrow: Story = {
  ...Contact,
  decorators: [(Story) => <div style={{ width: 280, maxWidth: '100%' }}><Story /></div>],
};
