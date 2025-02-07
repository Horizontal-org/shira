import { FunctionComponent, ReactNode, useState } from "react";
import { styled } from '@horizontal-org/shira-ui'
import { VscClose } from 'react-icons/vsc'
import { useStore } from "../../../store";
import { Dialog } from "../Dialog";
import { useTranslation } from "react-i18next";

interface Props {
  title?: string;
  hideCloseButton?: boolean;
  action?: ReactNode;
}

export const FooterDesktop: FunctionComponent<Props> = ({
  title,
  action,
}) => {
  const { t } = useTranslation()
  const changeScene = useStore((state) => state.changeScene)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Wrapper>
      <LeftContent>
        <CloseButton onClick={() => setIsDialogOpen(!isDialogOpen)}>
          <VscClose size={24} color='#111' />
        </CloseButton>
        <Title>
          { title }
        </Title>
      </LeftContent>

      { action }

      <Dialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen} 
        title={t('quiz.exit.title')}
        description={t('quiz.exit.description')}
        action={() => { changeScene('welcome') }}
        actionDescription={t('quiz.exit.action_description')}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 86px;
  padding: 8px;

  box-shadow: 0px -6px 10px 4px rgba(0, 0, 0, 0.15), 0px -2px 3px rgba(0, 0, 0, 0.3);
  border-radius: 20px 20px 0px 0px;

  @media (max-width:  ${props => props.theme.breakpoints.sm}) {
    padding: 8px;
  }
  z-index: 99999;
`

const LeftContent = styled.div`
  display: flex;
  align-items: center;
`

const CloseButton = styled.div`
  width: 48px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: $fff;
  border-right: 1px solid ${props => props.theme.colors.dark.mediumGrey};
  margin-right: 16px;
`

const Title = styled.div`
  @media (max-width:  ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
  padding-left: 20px;
  color: black;
  font-size: 16px;
`

FooterDesktop.defaultProps = {
  title: '',
  action: <></>
}