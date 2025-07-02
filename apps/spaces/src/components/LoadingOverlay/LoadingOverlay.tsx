import { styled } from '@shira/ui'

export const LoadingOverlay = () => (
  <Overlay>
    <LoadingContent>
      <LoadingText>Uploading image...</LoadingText>
      <ProgressBar>
        <ProgressFill />
      </ProgressBar>
    </LoadingContent>
  </Overlay>
)

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 16px;
`

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
`

const LoadingText = styled.div`
  color: #52752C;
  font-weight: 500;
  font-size: 14px;
`
const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: #f3f3f3;
  border-radius: 2px;
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  background: #52752C;
  border-radius: 2px;
  animation: progress 2s ease-in-out infinite;

  @keyframes progress {
    0% { 
      width: 0%;
      transform: translateX(0);
    }
    50% { 
      width: 100%;
      transform: translateX(0);
    }
    100% { 
      width: 100%;
      transform: translateX(100%);
    }
  }
`