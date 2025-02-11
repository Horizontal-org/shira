import { FunctionComponent, useRef } from "react";
import { styled } from '@shira/ui'
import { Navbar } from "../../UI/Navbar";
import { SceneWrapper } from "../../UI/SceneWrapper";
import { useTranslation } from "react-i18next";
import { Heading } from "../../UI/Title";
import HorizontalLogo from "../../UI/Icons/Horizontal";

interface Props {}

export const PrivacyLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  const bringShiraRef = useRef(null)

  return (
    <AboutSceneWrapper bg='white'>
      
      <Navbar color="#DBE3A3"/>
      <AboutWrapper>
        <Heading>Privacy policy</Heading>
      </AboutWrapper>



      <ContentWrapper>
          <div>

              <LastUpdate><i>Effective date: 1 September 2023</i></LastUpdate>


              <OptionsWrapper>
                <div>
                  <OptionTitle>1. Introduction</OptionTitle>
                  <OptionDescription>This Privacy Policy governs the collection, use, and disclosure of information collected from users of the application Shira (“Shira”, “app”), which is developed and operated by Horizontal (“we”, “us”, “our”). By using Shira, you (“you”, “your”, “Shira user”) agree to the collection and use of information in accordance with this policy.</OptionDescription>
                </div>

                <div>
                  <OptionTitle>2. Collection of personally identifiable information</OptionTitle>
                  <OptionDescription><strong>2.1. Information that could be used to identify you:</strong> we do not collect any personally identifiable information. This means that we do not collect any information that could be used to identify you personally, such as your name, email address, or phone number.</OptionDescription>
                  <OptionDescription><strong>2.2. Information that could be used to identify your device:</strong> We collect IP addresses and User-Agent information only for the purpose of fulfilling the features and functionalities offered by Shira. Any IP address or User-Agent information collected is deleted from our servers every 5 minutes.</OptionDescription>
                </div>


                <div>
                  <OptionTitle>3. Collection of Anonymized Telemetry Data</OptionTitle>
                  <OptionDescription><strong>3.1. Telemetry:</strong> We collect anonymized telemetry data in order to improve Shira, identify bugs, track usage trends, and provide a better user experience. This data includes information such as the device you are using, your geographic region, and how you are using Shira.</OptionDescription>
                  <OptionDescription>The anonymized telemetry data is collected solely for the purpose of analyzing and improving the functionality and performance of Shira. It is never shared, disclosed, or sold to any third-party.</OptionDescription>
                  <OptionDescription><strong>3.2. Anonymization:</strong> The telemetry data we collect is anonymized. This means that it is not linked to any personally identifiable information about you and that we cannot identify you from the data we collect.</OptionDescription>
                  <OptionDescription><strong>3.3 Divvi Up:</strong>  the collection and anonymization of telemetric data uses Divvi Up, a privacy-respecting system for aggregate statistics developed by the nonprofit Internet Security Research Group (ISRG). Like Horizontal, IRSG is never able to link telemetry data to users. To learn more about how Divvi Up functions and how it handles telemetry data, refer to <a href="https://divviup.org/" target="_blank">https://divviup.org/</a>.</OptionDescription>
                </div>


                <div>
                  <OptionTitle>4. Legal Requirements</OptionTitle>
                  <OptionDescription>We may disclose anonymized telemetric data if required to do so by law or in response to a valid legal request, such as a court order or government inquiry. Because the telemetric data is anonymized, such disclosure would not reveal any personally identifiable information about you.</OptionDescription>
                </div>


                <div>
                  <OptionTitle>5. Data Security</OptionTitle>
                  <OptionDescription>We are committed to ensuring the security of your information. We implement appropriate physical, technical, and administrative measures to safeguard and protect any data collected by Shira. However, please be aware that no method of transmission or storage is 100% secure, and we cannot guarantee the absolute security of the data.</OptionDescription>
               </div>


               <div>
                  <OptionTitle>6. Changes to this Privacy Policy</OptionTitle>
                  <OptionDescription>We reserve the right to modify or update this Privacy Policy at any time. Any changes will be effective immediately upon posting the revised policy on this page. It is your responsibility to review this Privacy Policy periodically for any updates or modifications.</OptionDescription>
               </div>


               <div>
                  <OptionTitle>7. Contact Us</OptionTitle>
                  <OptionDescription>If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your data, please contact us at contact@wearehorizontal.org. We will endeavor to respond to your inquiry as soon as reasonably possible.</OptionDescription>
               </div>


               <div>
                  <OptionTitle>8. Continued use of Shira</OptionTitle>
                  <OptionDescription>By continuing to use Shira, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.</OptionDescription>
               </div>
            </OptionsWrapper>
          </div>
      </ContentWrapper>
      
    </AboutSceneWrapper>
  )
}

const LastUpdate = styled.p`
  font-size: 18px;
  font-weight: 300;
`

const HeaderButtonWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
`


const AboutWrapper = styled.div`
  text-align: center;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 20px 0;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
  }

  > h2 {
    margin-bottom: 12px;
  }
`

const OptionsWrapper = styled.div`
  text-align: left;
`

const OptionTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 24px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 16px;
  }
`

const OptionDescription = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  padding-bottom: 24px;
  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`

const AboutSceneWrapper = styled(SceneWrapper)`
  position: relative;


`

const ContentWrapper = styled.div`  
  display: flex;
  justify-content: center;
  
  > div {
    padding: 12px;
    box-sizing: border-box;
    max-width: 1312px;
  }

`