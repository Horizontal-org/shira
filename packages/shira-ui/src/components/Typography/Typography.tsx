import styled from 'styled-components';

// Headings
export const H1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 64px;
  line-height: 1.2;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 48px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 40px;
  }
`;

export const H2 = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 48px;
  line-height: 1.2;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 32px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 24px;
  }
`;

// Subheadings
export const SubHeading1 = styled.h3`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600; // SemiBold
  font-size: 28px;
  line-height: 1.4;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 24px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 21px;
  }
`;

export const SubHeading2 = styled.h4`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600; // SemiBold
  font-size: 24px;
  line-height: 1.4;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 21px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 18px;
  }
`;

export const SubHeading3 = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600; // SemiBold
  font-size: 21px;
  line-height: 1.4;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 18px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

// Body text variants
export const Body1 = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300; // Light
  font-size: 18px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 16px;
  }
`;

export const Body2Regular = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400; // Regular
  font-size: 16px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const Body2SemiBold = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600; // SemiBold
  font-size: 16px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const Body2Italic = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400; // Regular
  font-style: italic;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const Body3 = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400; // Regular
  font-size: 14px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 12px;
  }
`;

export const Body3Bold = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700; // Bold
  font-size: 14px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 12px;
  }
`;

export const Body4 = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400; // Regular
  font-size: 12px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 11px;
  }
`;

// Links
export const Link0 = styled.a`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700; // Bold
  font-size: 21px;
  line-height: 1.4;
  color: #099CDB;
  text-decoration: underline;
  cursor: pointer;
  margin: 0;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 18px;
  }
`;

export const Link1 = styled.a`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700; // Bold
  font-size: 18px;
  line-height: 1.4;
  color: #099CDB;
  text-decoration: underline;
  cursor: pointer;
  margin: 0;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 16px;
  }
`;

export const Link2 = styled.a`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700; // Bold
  font-size: 16px;
  line-height: 1.4;
  color: #099CDB;
  text-decoration: underline;
  cursor: pointer;
  margin: 0;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 14px;
  }
`;

export const Link3 = styled.a`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700; // Bold
  font-size: 14px;
  line-height: 1.4;
  color: #099CDB;
  text-decoration: underline;
  cursor: pointer;
  margin: 0;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 12px;
  }
`;