import type { Meta } from '@storybook/react';
import styled from 'styled-components';
import * as Typography from './Typography';

const meta = {
  title: 'Components/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AllTypography = {
  render: () => (
    <Container>
      <Section>
        <Typography.H1>Heading 1 - Bold, 64px</Typography.H1>
        <Typography.H2>Heading 2 - Bold, 48px</Typography.H2>
      </Section>

      <Section>
        <Typography.SubHeading1>Subheading 1 - SemiBold, 28px</Typography.SubHeading1>
        <Typography.SubHeading2>Subheading 2 - SemiBold, 24px</Typography.SubHeading2>
        <Typography.SubHeading3>Subheading 3 - SemiBold, 21px</Typography.SubHeading3>
      </Section>

      <Section>
        <Typography.Body1>
          Body 1 - Light, 18px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography.Body1>
        <Typography.Body2Regular>
          Body 2 Regular - Regular, 16px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography.Body2Regular>
        <Typography.Body2SemiBold>
          Body 2 Semi-bold - SemiBold, 16px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography.Body2SemiBold>
        <Typography.Body2Italic>
          Body 2 Italic - Italic, 16px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography.Body2Italic>
      </Section>

      <Section>
        <Typography.Body3>
          Body 3 - Regular, 14px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography.Body3>
        <Typography.Body3Bold>
          Body 3 Bold - Bold, 14px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography.Body3Bold>
        <Typography.Body4>
          Body 4 - Regular, 12px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography.Body4>
      </Section>
    </Container>
  ),
};

// Links
export const Links = {
    render: () => (
      <Container>
        <Section>
          <Typography.Link0 href="#">Link 0 (21px)</Typography.Link0>
          <Typography.Link1 href="#">Link 1 (18px)</Typography.Link1>
          <Typography.Link2 href="#">Link 2 (16px)</Typography.Link2>
          <Typography.Link3 href="#">Link 3 (14px)</Typography.Link3>
        </Section>
      </Container>
    ),
  };
  
  