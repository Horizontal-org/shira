import { FunctionComponent } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  data: Element
}

export const MessagingImage: FunctionComponent<Props> = ({ data }) => {
  const { t } = useTranslation("shira-ui")

  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{ __html: data.outerHTML }}></Content>
      <span>{t("telegram.time")}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 30%;
  min-width: 180px;
  box-sizing: border-box;

  /* Telegram overlays the time on the bottom corner of the photo */
  > span {
    z-index: 3;
    position: absolute;
    bottom: 8px;
    inset-inline-end: 8px;
    padding: 2px 7px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.35);
    font-size: 12px;
    line-height: 1.3;
    color: #fff;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: auto;
    min-width: 0;
    max-width: 80%;
    display: inline-block;

    background: #fff;
    border-radius: 18px;
    padding: 2px;
  }
`

const Content = styled.div`
  min-width: 0;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      width: auto;
      max-width: 100%;
      min-width: 50px;
      min-height: 30px;
      object-fit: contain;
      border-radius: 16px;
    }
  }
`

export default MessagingImage
