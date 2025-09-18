import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../api/authService";
import Quiz from "./Quiz";
import FarmingGame from "./FarmingGame";

const GameCenter = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, addCoinsToUser } = useAuth();
  const [activeGame, setActiveGame] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const quizSequence = ["seasonQuiz"]; // Define the sequence of quizzes

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
    if (currentUser && results.coins > 0) {
      try {
        await addCoinsToUser(results.coins, results.source || "Game Reward");
      } catch (error) {
        console.error("Failed to add coins:", error);
      }
    }

    // Move to the next quiz in the sequence
    if (activeGame === quizSequence[currentQuizIndex]) {
      const nextIndex = currentQuizIndex + 1;
      if (nextIndex < quizSequence.length) {
        setCurrentQuizIndex(nextIndex);
        setActiveGame(quizSequence[nextIndex]);
      } else {
        // All quizzes completed, return to game selection
        setActiveGame(null);
        setCurrentQuizIndex(0); // Reset for next time
      }
    }
  };

  const handleCloseGame = () => {
    setActiveGame(null);
    setCurrentQuizIndex(0); // Reset when closing game
  };

  // Temporary quiz data for the season quiz
  const seasonQuizData = i18n.isInitialized ? [
    {
      question: t("1. Which of the following is a common method of crop rotation used in farming?"),
      options: [
        t("a) Planting the same crop every year"),
        t("b) Planting different crops in sequence to maintain soil health"),
        t("c) Using only chemical fertilizers"),
        t("D) Ignoring the natural growing season"),
      ],
      correctAnswer: 1,
    },
    {
      question: t("2. What is the primary purpose of using cover crops in farming?"),
      options: [
        t("a) To prevent soil erosion"),
        t("b) To increase the cost of farming"),
        t("c) To reduce the need for irrigation"),
        t("d) To attract pests away from main crops"),
      ],
      correctAnswer: 0,
    },
    {
      question: t("3. Which farming practice is used to conserve water and reduce soil erosion?"),
      options: [
        t("a) Tilling the soil deeply"),
        t("b) No-till farming"),
        t("c) Planting monocrops"),
        t("d) Overgrazing"),
      ],
      correctAnswer: 1,
    },
    {
      question: t("4. Which of the following is considered a sustainable farming practice?"),
      options: [
        t("a) Using synthetic pesticides on all crops"),
        t("b) Growing genetically modified crops exclusively"),
        t("c) Using organic farming methods to reduce environmental impact"),
        t("d) Burning large amounts of crop residue"),
      ],
      correctAnswer: 2,
    },
    {
      question: t("5. What is agroforestry?"),
      options: [
        t("a) The practice of planting only trees"),
        t("b) The integration of trees and shrubs into agricultural land to improve biodiversity"),
        t("c) A type of monoculture farming"),
        t("d) A method of deep water irrigation"),
      ],
      correctAnswer: 1,
    },
  ] : [];

  const renderGame = () => {
    if (!i18n.isInitialized) {
      return <div className="text-center p-8 text-gray-500">{t("learning.games.seasonQuiz.loading")}</div>;
    }

    switch (activeGame) {
      case "seasonQuiz":
        return seasonQuizData.length > 0 ? (
          <Quiz quizData={seasonQuizData} onComplete={handleGameComplete} />
        ) : (
          <div className="text-center p-8 text-gray-500">{t("learning.games.seasonQuiz.loading")}</div>
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
                  onClick={() => {
                    setActiveGame(game.id);
                    if (quizSequence.includes(game.id)) {
                      setCurrentQuizIndex(quizSequence.indexOf(game.id));
                    }
                  }}
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
