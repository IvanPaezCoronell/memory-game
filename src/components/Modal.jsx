import { PiShootingStarFill } from 'react-icons/pi';

export const Modal = ({ gameOver, setGameOver, moves, handleNewGame }) => {
	return (
		<div
			className={`${gameOver
				? 'flex'
				: 'hidden'} flex-col justify-center items-center gap-4 bg-gray-800 absolute w-[250px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 rounded-lg`}
		>
			<button
				className="text-white  font-bold absolute right-0 top-0 mr-3 hover:text-red-500 text-2xl"
				onClick={() => setGameOver(false)}
			>
				&times;
			</button>

			<h1 className="text-white uppercase text-3xl mt-5 font-bold tracking-wider">
				Ganastes!
			</h1>

			<div className="text-yellow-500 text-7xl">
				<PiShootingStarFill />
			</div>

			<div className="flex items-start justify-between  max-w-sm p-3 space-x-4 rounded-md bg-gray-900 text-gray-100">
						<span className='font-bold'>
						{moves}

						</span>
						<div className="flex flex-col flex-1 px-2 space-y-1">
							<span className="text-sm font-semibold">Movimientos</span>
							
						</div>
					
					</div>

			<button
				className="bg-blue-500 font-semiboild text-white rounded-md px-2 py-2 hover:bg-blue-300 transition-all mb-3"
				onClick={handleNewGame}
			>
				Jugar de nuevo 🎛️
			</button>
		</div>
	);
};
