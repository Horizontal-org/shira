import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {
  Form,
  Button,
  TextInput,
  styled,
  Navbar
} from "@shira/ui";
import backgroundSvg from "../../assets/Background.svg";
import { RadioGroup } from "./components/RadioGroup";
import { GetStartedSuccess } from "./components/GetStartedSucess";

interface Props {}

export const ORG_TYPES = [
  { value: "business", label: "Business" },
  { value: "cibersecurity", label: "Cibersecurity" },
  { value: "non-profit", label: "Non-profit" },
  { value: "individual", label: "Individual" },
];

export const GetStartedLayout: FunctionComponent<Props> = () => {

  const [email, handleEmail] = useState("");
  const [name, handleName] = useState("");
  const [orgType, handleOrgType] = useState(ORG_TYPES[0].value);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) return "Organization name is required"
    if (!email.trim()) return "Email is required"
    if(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) return "Please enter a valid email address"
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/invitation`, {
        email,
        slug: name,
        orgType
      });
      
      setSuccess(true);
      setLoading(false);            
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err.response.message)
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while creating your space. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Navbar
        translatedTexts={{home: "", about: "", menu: "", logIn: "Log in", createSpace: "Create Space"}}
        onNavigate={navigate}
      />
      { success ? (
        <ContentWrapper>
          <BackgroundPattern />
          <Content>
            <GetStartedSuccess />
          </Content>
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          <BackgroundPattern />
          <Content>

            <StyledForm
              title="Get started"
              description="Create your own Shira space to start building your own custom quizzes today. "
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <InputsContainer>
                <TextInput 
                  label="Organization name (optional)" 
                  value={name} 
                  onChange={(e) => handleName(e.target.value)}
                  disabled={loading}
                />
                <TextInput
                  required
                  disabled={loading}
                  label={"Email (required)"}
                  value={email}
                  onChange={(e) => handleEmail(e.target.value)}
                />       
                <RadioGroup 
                  orgType={orgType}
                  setOrgType={handleOrgType}
                  disabled={loading}
                />
              </InputsContainer>

              <ButtonContainer>
                <Button
                  text="Sign up"
                  type="primary"
                  disabled={loading}
                  onClick={handleSubmit}
                />
              </ButtonContainer>
            </StyledForm>
          </Content>
        </ContentWrapper>
      )}
      
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;  
  position: relative; 

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
    padding: 24px;
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    overflow-y: auto;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 16px;
        align-items: flex-start;
        padding-top: 48px; 
    }
`;

const Content = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 48px auto; 
    width: 100%;
    height: auto;
`;


const BackgroundPattern = styled.div`
   background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;
  pointer-events: none; 

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledForm = styled(Form)`
  position: relative;
  z-index:1;
  text-align: left;
  margin-bottom: 32px;
  gap: 16px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
    
    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #d32f2f;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-weight: 500;
`;
