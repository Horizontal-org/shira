import { FunctionComponent } from "react";
import { CompletedScene } from "../../../scenes/Completed";
import { Feedback } from "../../../scenes/Feedback";
import { Quiz } from "../../../scenes/Quiz";
import { QuizSetupAppsScene } from "../../../scenes/QuizSetupApps";
import { QuizSetupNameScene } from "../../../scenes/QuizSetupName";
import { QuizSetupWorkScene } from "../../../scenes/QuizSetupWork";
import { WelcomeScene } from "../../../scenes/Welcome";
import { useStore } from "../../../store";

interface Props {}


export const MainLayout: FunctionComponent<Props> = () => {
  const scene = useStore((state) => state.scene)

  return (
    <div>
      { scene === 'welcome' && (
        <WelcomeScene />
      )}

      { scene === 'quiz-setup-name' && (
        <QuizSetupNameScene />
      )}

      { scene === 'quiz-setup-apps' && (
        <QuizSetupAppsScene />
      )}

      { scene === 'quiz-setup-work' && (
        <QuizSetupWorkScene />
      )}

      { scene === 'quiz' && (
        <Quiz />
      )}

      { scene === 'feedback' && (
        <Feedback />
      )}

      { scene === 'completed' && (
        <CompletedScene />
      )}
    </div>
  )
}