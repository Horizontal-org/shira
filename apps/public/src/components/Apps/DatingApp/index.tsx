import { FunctionComponent } from 'react'
import { Explanation } from '../../../domain/explanation';
import ExplanationTooltip from '../../UI/ExplanationTooltip';
import { Phone } from '../../UI/Phone';
import { Footer } from './Footer';
import { Chat } from './Chat';
import { Header } from './Header';
interface Props {
  phone: {
    textContent: string;
    explanationPosition: string;
  };
  content: HTMLElement;
  explanations?: Explanation[];
  explanationNumber: number;
  showExplanations: boolean
}


const DatingApp: FunctionComponent<Props> = ({ phone, content, explanations, explanationNumber, showExplanations }) => {
  return (
    <Phone className='grindr' background='#1f1f20'>
      {explanations.map(explanation => (
        <ExplanationTooltip 
          explanation={explanation}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Header phone={phone}/>
      <Chat data={content}/>
      <Footer />
    </Phone>
  )
}

export default DatingApp
