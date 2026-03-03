import { FunctionComponent } from 'react'

import { Explanation } from '../../../domain/explanation';


import { Footer } from './Footer';
import { Chat } from './Chat';
import { Header } from './Header';
import ExplanationTooltip from '../components/ExplanationTooltip';
import { Phone } from '../components/Phone';

interface Props {
  senderName: {
    textContent: string;
    explanationPosition: string;
  };
  content: HTMLElement;
  explanations?: Explanation[];
  explanationNumber?: number;
  showExplanations?: boolean
}


export const DatingApp: FunctionComponent<Props> = ({ 
  senderName, 
  content, 
  explanations, 
  explanationNumber, 
  showExplanations 
}) => {
  return (
    <Phone background='#1f1f20'>
      {explanations && explanations.map(explanation => (
        <ExplanationTooltip 
          explanation={explanation}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      ))}
      <Header phone={senderName}/>
      <Chat data={content}/>
      <Footer />
    </Phone>
  )
}

export default DatingApp
