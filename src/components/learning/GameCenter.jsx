import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../api/authService";
import Quiz from "./Quiz";
import FarmingGame from "./FarmingGame";

const GameCenter = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [activeGame, setActiveGame] = useState(null);
  const [gameResults, setGameResults] = useState(null);

  const games = [
    {
      id: "plantMatchingGame",
      title: t("learning.games.plantMatching.title"),
      description: t("learning.games.plantMatching.description"),
      image: "/images/games/plant-matching.jpg",
      difficulty: "easy",
    },
    {
      id: "seasonQuiz",
      title: t("learning.games.seasonQuiz.title"),
      description: t("learning.games.seasonQuiz.description"),
      image: "/images/games/season-quiz.jpg",
      difficulty: "medium",
    },
    {
      id: "fruitCollection",
      title: t("learning.games.fruitCollection.title"),
      description: t("learning.games.fruitCollection.description"),
      image: "https://via.placeholder.com/400x225?text=Fruit+Collection",
      difficulty: "easy",
    },
  ];

  const handleGameComplete = async (results) => {
    setGameResults(results);
    if (currentUser && results.coins > 0) {
      try {
        await authService.addCoins(results.coins);
      } catch (error) {
        console.error("Failed to add coins:", error);
      }
    }
  };

  const handleCloseGame = () => {
    setActiveGame(null);
    setGameResults(null);
  };

  // Temporary quiz data for the season quiz
  const seasonQuizData = [
    {
      question: t("learning.games.seasonQuiz.questions.q1.question"),
      options: [
        t("learning.games.seasonQuiz.questions.q1.options.a"),
        t("learning.games.seasonQuiz.questions.q1.options.b"),
        t("learning.games.seasonQuiz.questions.q1.options.c"),
        t("learning.games.seasonQuiz.questions.q1.options.d"),
      ],
      correctAnswer: 2,
    },
    {
      question: t("learning.games.seasonQuiz.questions.q2.question"),
      options: [
        t("learning.games.seasonQuiz.questions.q2.options.a"),
        t("learning.games.seasonQuiz.questions.q2.options.b"),
        t("learning.games.seasonQuiz.questions.q2.options.c"),
        t("learning.games.seasonQuiz.questions.q2.options.d"),
      ],
      correctAnswer: 1,
    },
    {
      question: t("learning.games.seasonQuiz.questions.q3.question"),
      options: [
        t("learning.games.seasonQuiz.questions.q3.options.a"),
        t("learning.games.seasonQuiz.questions.q3.options.b"),
        t("learning.games.seasonQuiz.questions.q3.options.c"),
        t("learning.games.seasonQuiz.questions.q3.options.d"),
      ],
      correctAnswer: 0,
    },
    {
      question: t("learning.games.seasonQuiz.questions.q4.question"),
      options: [
        t("learning.games.seasonQuiz.questions.q4.options.a"),
        t("learning.games.seasonQuiz.questions.q4.options.b"),
        t("learning.games.seasonQuiz.questions.q4.options.c"),
        t("learning.games.seasonQuiz.questions.q4.options.d"),
      ],
      correctAnswer: 3,
    },
    {
      question: t("learning.games.seasonQuiz.questions.q5.question"),
      options: [
        t("learning.games.seasonQuiz.questions.q5.options.a"),
        t("learning.games.seasonQuiz.questions.q5.options.b"),
        t("learning.games.seasonQuiz.questions.q5.options.c"),
        t("learning.games.seasonQuiz.questions.q5.options.d"),
      ],
      correctAnswer: 1,
    },
  ];

  const renderGame = () => {
    switch (activeGame) {
      case "seasonQuiz":
        return (
          <Quiz quizData={seasonQuizData} onComplete={handleGameComplete} />
        );
      case "plantMatchingGame":
        return (
          <div className="text-center p-8">
            <p className="text-gray-500 mb-4">
              {t("learning.games.comingSoon")}
            </p>
            <button
              onClick={handleCloseGame}
              className="py-2 px-4 bg-leaf-green text-white rounded-md hover:bg-green-700"
            >
              {t("learning.games.backToGames")}
            </button>
          </div>
        );
      case "fruitCollection":
        return <FarmingGame onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t("learning.gamesTitle")}
      </h2>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200">
                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {game.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      game.difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : game.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {t(`learning.games.difficulty.${game.difficulty}`)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{game.description}</p>

                <button
                  onClick={() => setActiveGame(game.id)}
                  className="w-full py-2 bg-leaf-green text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  {t("learning.games.play")}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={handleCloseGame}
            className="inline-flex items-center text-leaf-green hover:underline mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {t("learning.games.backToGames")}
          </button>

          <div>{renderGame()}</div>
        </div>
      )}
    </div>
  );
};

export default GameCenter;
