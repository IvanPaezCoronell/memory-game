import { useEffect, useState } from 'react';
import { imgs } from '../data';
import Card from './Card';
import { Modal } from './Modal';
import { MdOutlineMoveDown } from 'react-icons/md';

// * Funcion para desorganizar el arreglo que contiene las imagenes (aleatoriamente)
const shuffleArr = arr => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
};

const Dashboard = () => {
	const [cards, setCards] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [moves, setMoves] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [isDisabled, setisDisabled] = useState(false);

	// * Funcion para crear el dashboard con las tarjetas
	const createDashboard = () => {
		const duplicateCard = imgs.flatMap((img, index) => {
			// * duplicar imagen con el id
			const duplicate = {
				...img,
				id: img.id + imgs.length,
			};

			return [img, duplicate];
		});

		const newCards = shuffleArr(duplicateCard); // --> Duplicar cartas

		// * Agregar una nueva carta
		const cards = newCards.map(card => {
			return {
				...card,
				flipped: false,
				matched: false,
			};
		});

		setCards(cards);
	};

	useEffect(() => {
		createDashboard();
	}, []);

	// * Funcion para la accion de voltear carta
	const handleCardClick = id => {
		if (isDisabled) return;

		// * Filtrar carta (Obtiene el id de la carta actual)
		const [currentCard] = cards.filter(card => card.id === id);

		if (!currentCard.flipped && !currentCard.matched) {
			currentCard.flipped = true;
			const newFlippedCard = [...flippedCards, currentCard];

			// * Se agrega al estado la carta volteada
			setFlippedCards(newFlippedCard);

			if (newFlippedCard.length === 2) {
				setisDisabled(true);
				const [firstCard, secondCard] = newFlippedCard;

				if (firstCard.img === secondCard.img) {
					firstCard.matched = true;
					secondCard.matched = true;
					setisDisabled(false);
				} else {
					setTimeout(() => {
						firstCard.flipped = false;
						secondCard.flipped = false;
						setCards(cards);
						setisDisabled(false);
					}, 100);
				}

				setFlippedCards([]);
				setMoves(moves + 1);
			}

			setCards(cards);
		}

		// * Comprobar si todas las cartas tienen un matched
		if (cards.every(card => card.matched)) {
			setGameOver(true);
			setisDisabled(true);
		}
	};

	const handleNewGame = () => {
		setCards([]);
		createDashboard();
		setMoves(0);
		setGameOver(false);
		setisDisabled(false);
	};

	return (
		<div>
			{gameOver
				? <div className="fixed inset-0 bg-black opacity-50 z-10" />
				: ''}

			<div className="realitve h-screen flex items-center">
				<div className="mx-auto flex flex-col justify-center items-center">
					<div className="flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-900 text-gray-100 divide-gray-700">
						<div className="flex flex-1 flex-col p-4 border-l-8 border-blue-400">
							<span className="text-6xl tracki font-bold ">Memory Game </span>
						</div>
						<span className="p-8 flex items-center uppercase tracki text-white text-xl font-bold border-gray-700">
							<button
								className="bg-blue-500 font-semiboild text-white rounded-md px-2 py-2 hover:bg-blue-300 transition-all mb-3"
								onClick={handleNewGame}
							>
								Nuevo Juego 🎮
							</button>{' '}
						</span>
					</div>

					<div className="flex items-center justify-between  max-w-sm p-3 mt-5 space-x-4 rounded-md bg-gray-900 text-gray-100">
						<span className="font-bold">
							{moves}
						</span>
						<div className="flex flex-col flex-1 px-2 ">
							<span className="text-sm font-semibold">Movimientos</span>
						</div>
					</div>

					<div className="text-red-500 grid grid-cols-4 gap-3 justify-center items-center px-3 py-5 my-3">
						{cards.map(card =>
							<Card
								card={card}
								key={card.id}
								handleCardClick={handleCardClick}
							/>,
						)}
					</div>
				</div>

				<Modal
					gameOver={gameOver}
					setGameOver={setGameOver}
					moves={moves}
					handleNewGame={handleNewGame}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
