import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const plantData = [
  { id: 'tomato', name: 'Tomato', image: '/images/plants/tomato.png', matchId: 'tomato_match' },
  { id: 'carrot', name: 'Carrot', image: '/images/plants/carrot.png', matchId: 'carrot_match' },
  { id: 'potato', name: 'Potato', image: '/images/plants/potato.png', matchId: 'potato_match' },
  { id: 'tomato_match', name: 'Tomato Plant', description: 'Grows red, juicy fruits.', matchId: 'tomato' },
  { id: 'carrot_match', name: 'Carrot Root', description: 'Orange root vegetable.', matchId: 'carrot' },
  { id: 'potato_match', name: 'Potato Tuber', description: 'Starchy underground tuber.', matchId: 'potato' },
];

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const PlantMatchingGame = ({ onComplete }) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.matchId === secondCard.id) {
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        setScore((prev) => prev + 10);
      }
      setTimeout(() => setFlippedCards([]), 1000);
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === plantData.length) {
      // Game over
      setTimeout(() => {
        alert(t('plantMatchingGame.gameOver', { score }));
        onComplete({ coins: score, source: t('plantMatchingGame.title') });
        setGameStarted(false); // Reset game
      }, 500);
    }
  }, [matchedCards, score, onComplete, t]);

  const initializeGame = () => {
    const gameCards = plantData.flatMap(plant => [
      { ...plant, id: plant.id + '_card', type: 'image' }, // Card for image/name
      { ...plant, id: plant.matchId + '_card', type: 'description' } // Card for description/match
    ]);
    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
  };

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2 || matchedCards.includes(clickedCard.id)) {
      return;
    }
    setFlippedCards((prev) => [...prev, clickedCard]);
  };

  if (!gameStarted) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('plantMatchingGame.welcome')}</h3>
        <p className="text-gray-600 mb-6">{t('plantMatchingGame.instructions')}</p>
        <button
          onClick={() => setGameStarted(true)}
          className="py-2 px-4 bg-leaf-green text-white rounded-md hover:bg-green-700 transition-colors"
        >
          {t('plantMatchingGame.startButton')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('plantMatchingGame.title')}</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">{t('plantMatchingGame.score')}: {score}</p>
        <p className="text-lg">{t('plantMatchingGame.moves')}: {moves}</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300
              ${flippedCards.includes(card) || matchedCards.includes(card.id) ? 'transform rotate-y-180' : ''}
              ${matchedCards.includes(card.id) ? 'bg-green-100' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="absolute backface-hidden">
              {/* Card Back */}
              <img src="/images/card_back.png" alt="Card Back" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="absolute backface-hidden transform rotate-y-180">
              {/* Card Front */}
              {card.type === 'image' ? (
                <img src={card.image} alt={card.name} className="w-full h-full object-contain p-2" />
              ) : (
                <div className="text-center p-2">
                  <p className="font-semibold text-gray-800">{card.name}</p>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setGameStarted(false)} // Go back to welcome screen
        className="mt-6 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        {t('plantMatchingGame.resetButton')}
      </button>
    </div>
  );
};

export default PlantMatchingGame;