import { FunctionComponent } from 'react'
import { styled } from '@shira/ui'

import ChevronDown from '../../assets/arrow_drop_down.png'

import InboxIcon from '../../assets/inbox.png'
import StarIcon from '../../assets/star.png'
import ScheduleIcon from '../../assets/schedule.png'
import SentIcon from '../../assets/sent.png'
import DraftIcon from '../../assets/draft.png'


interface Props {}

const Categories: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <div>
        <Category>
          <CategoryIcon />
          <span>
            Mail
          </span>
        </Category>

        <div>
          <SelectedMailCategory>
            <div>
              <MailCategoryIcon icon={InboxIcon}/>
              <span>
                Inbox
              </span>
            </div>
            <span>
              323
            </span>
          </SelectedMailCategory>
        </div>
        <div>
          <MailCategory>
            <MailCategoryIcon icon={StarIcon}/>
            <span>
              Starred
            </span>
          </MailCategory>
        </div>
        <div>
          <MailCategory>
            <MailCategoryIcon icon={ScheduleIcon}/>
            <span>
              Snoozed
            </span>
          </MailCategory>
        </div>
        <div>
          <MailCategory>
            <MailCategoryIcon icon={SentIcon}/>
            <span>
              Sent
            </span>
          </MailCategory>
        </div>
        <div>
          <MailCategory>
            <MailCategoryIcon icon={DraftIcon}/>
            <span>
              Drafts
            </span>
          </MailCategory>
        </div>     

      </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`

`

const Category = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;

  > span {
    flex-grow: 1;
    color: #202124;
    font-weight: 500;
    font-size: .875rem;
    letter-spacing: .25px;
  }

  &:hover {
    background-color: #f1f3f4;
  }

  &:active {
    background-color: #e8eaed;;
  }
`

const CategoryIcon = styled.div`
  background-image: url(${ChevronDown});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  height: 20px;
  margin: 3px;
  opacity: .71;
  padding: 0;
  width: 20px;
`

const MailCategory = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 12px 0 26px;
  border-radius: 0 16px 16px 0;
  cursor: pointer;

  > span {
    line-height: 20px;
    color: #202124;
    font-size: .875rem;
  }

  &:hover {
    background-color: #f1f3f4;
  }

  &:active {
    background-color: #e8eaed;;
  }
`

const SelectedMailCategory = styled(MailCategory)`
  background: #fce8e6;
  color: #d93025;
  font-weight: bold;
  display: flex; 
  justify-content: space-between;
  
  > div {
    display: flex;
    align-items: center;

    > span {
      font-size: .875rem;
    }
  }

  > span {
    color: #d93025;
  }
  
  &:hover {
    background-color: #fce8e6;
  }

  &:active {
    background-color: #fce8e6;;
  }
`

interface MailCategoryIconProps {
  icon: string;
}

const MailCategoryIcon = styled('div')<MailCategoryIconProps>`
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  width: 20px;
  height: 20px;
  margin-right: 18px;
  opacity: .71;
`

export default Categories