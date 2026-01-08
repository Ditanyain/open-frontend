import { createBrowserRouter } from "react-router-dom";
import EmbedLayout from "./EmbedLayout";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";
import QuizPreparedPage from "./pages/QuizPreparedPage";
import AttemptResultPage from "./pages/AttemptResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/LandingPage";

const Router = createBrowserRouter([
  {
    path: "/embed",
    element: <EmbedLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "quiz/:attemptId",
        element: <QuizPage />,
      },
      {
        path: "quiz/:attemptId/result",
        element: <QuizResultPage />,
      },
      {
        path: "quiz/prepared",
        element: <QuizPreparedPage />,
      },
      {
        path: "quiz/:attemptId/review",
        element: <AttemptResultPage />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Router;
