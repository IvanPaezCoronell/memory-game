import { useEffect, useState } from 'react';
import { imgs } from '../data';
import Card from './Card';

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

	return (
		<div className="realitve h-screen flex items-center">
			<h1 className="font-bold text-4xl">Memory Game</h1>

			<div className="text-red-500 grid grid-cols-4 gap-3 justify-center items-center px-3 py-5 my-3">
				{cards.map(card => <Card card={card} key={card.id} />)}
			</div>
		</div>
	);
};

export default Dashboard;
