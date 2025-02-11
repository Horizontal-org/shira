import React from "react";
import { styled } from '@shira/ui'
import ToastContainer from "../components/UI/ToastContainer";

const Ctx = React.createContext(null);

const Toast = ({ children, onDismiss }) => (
  <ToastWrapper
    onClick={onDismiss}
  >
    {children}
  </ToastWrapper>
);

let toastCount = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = content => {
    const id = toastCount++;
    const toast = { content, id };
    setToasts([...toasts, toast]);

    setTimeout(() => {
      removeToast(id)
    }, 2000)
  }

  const removeToast = id => {
    const newToasts = toasts.filter(t => t.id !== id)
    setToasts(newToasts)
  }

  // avoid creating a new fn on every render
  const onDismiss = id => () => removeToast(id)

  return (
    <Ctx.Provider value={{ createToast, removeToast }}>
      {children}
      <ToastContainer>
        {toasts.map(({ content, id, ...rest }) => (
          <Toast key={id} Toast={Toast} onDismiss={onDismiss(id)} {...rest}>
            {content}
          </Toast>
        ))}
      </ToastContainer>
    </Ctx.Provider>
  );
}

export const useToast = () => React.useContext(Ctx);

const ToastWrapper = styled.div`
  background: LemonChiffon;
  cursor: pointer;
  font-size: 14px;
  margin: 10px;
  padding: 10px;  
`
