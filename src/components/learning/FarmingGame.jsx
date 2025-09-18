import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ALL_FRUITS = ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Watermelon'];
const GRID_SIZE = 16;

const FarmingGame = ({ onComplete }) => {
  const { t } = useTranslation();
  const [targetFruit, setTargetFruit] = useState(null);
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const generateGame = () => {
    const newTargetFruit = ALL_FRUITS[Math.floor(Math.random() * ALL_FRUITS.length)];
    setTargetFruit(newTargetFruit);

    const newGrid = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      const fruit = ALL_FRUITS[Math.floor(Math.random() * ALL_FRUITS.length)];
      newGrid.push({ id: i, fruit, clicked: false });
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    generateGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      if (onComplete) {
        const coins = Math.floor(score / 10);
        onComplete({ score, coins });
      }
    }
  }, [timeLeft, gameOver, onComplete, score]);

  const handleItemClick = (item) => {
    if (gameOver || item.clicked) return;

    const newGrid = grid.map(gridItem => gridItem.id === item.id ? { ...gridItem, clicked: true } : gridItem);
    setGrid(newGrid);

    if (item.fruit === targetFruit) {
      setScore(score + 20);
    } else {
      setScore(score - 5);
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    generateGame();
  };

  return (
    <div className="text-center p-8 bg-gray-100 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">{t('learning.fruitCollection.title')}</h3>
      
      {!gameOver ? (
        <div>
          <p className="text-lg mb-4">{t('learning.fruitCollection.collect')}: <span className="font-bold text-2xl">{targetFruit}</span></p>
          <div className="flex justify-between items-center mb-4 text-lg">
            <div>{t('learning.fruitCollection.score')}: <span className="font-bold">{score}</span></div>
            <div>{t('learning.fruitCollection.time')}: <span className="font-bold">{timeLeft}s</span></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {grid.map(item => (
              <button 
                key={item.id} 
                onClick={() => handleItemClick(item)}
                className={`h-24 w-24 rounded-lg flex items-center justify-center transition-transform transform ${item.clicked ? 'bg-gray-300 scale-90' : 'bg-white shadow-md hover:scale-105'}`}
                disabled={item.clicked}
              >
                <img src={`https://via.placeholder.com/100x100.png?text=${item.fruit}`} alt={item.fruit} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h4 className="text-xl font-bold mb-2">{t('learning.fruitCollection.gameOver')}</h4>
          <p className="text-lg mb-2">{t('learning.fruitCollection.finalScore')}: {score}</p>
          <p className="text-lg mb-4">{t('learning.fruitCollection.coinsEarned')}: {Math.floor(score / 10)}</p>
          <button onClick={restartGame} className="bg-leaf-green text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">{t('learning.fruitCollection.playAgain')}</button>
        </div>
      )}
    </div>
  );
};

export default FarmingGame;
