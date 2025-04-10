import { FunctionComponent } from 'react'
import { Header } from './Header';
// google font 
import '../../../fonts/GoogleSans/style.css'
import { Footer } from './Footer';
import { Content } from './Content';
import { Phone } from '../components/Phone';
import { Explanation } from '../../../domain/explanation';
import ExplanationTooltip from '../components/ExplanationTooltip';

interface Props {
  phone: {
    textContent: string;
    explanationPosition: string;
  };
  content: HTMLElement;
  explanations?: Explanation[];
  explanationNumber?: number;
  showExplanations?: boolean
}


export const SMS: FunctionComponent<Props> = ({ phone, content, explanations, explanationNumber, showExplanations }) => {
  return (
    <Phone className='android' background='white'>
      {explanations && explanations.map(explanation => (
          <ExplanationTooltip 
            explanation={explanation}
            explanationNumber={explanationNumber}
            showExplanations={showExplanations}
          />
        ))}
        <Header phone={phone}/>
        <Content data={content}/>
        <Footer />
    </Phone>
  )
}
