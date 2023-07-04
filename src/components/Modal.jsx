
export const Modal = ({ gameOver, setGameOver, moves, handleNewGame }) => {
	return (
		<div
			className={`${gameOver
				? 'flex'
				: 'hidden'} flex-col justify-center items-center gap-7 bg-gray-500 absolute w-[250px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 rounded-lg`}
		>
			
			<button
				className="text-white font-bold absolute right-0 top-0 mr-3 hover:text-yellow-500 text-2xl"
				onClick={() => setGameOver(false)}
			>
				&times;
			</button>

			<h1 className="text-white uppercase text-3xl font-bold tracking-wider">
				Ganastes!
			</h1>

			<div className="flex justify-between gap-2">
				<p className="text-white">Movimientos: </p>
				<p className="text-white font-bold">
					{moves}
				</p>
			</div>

			<button
				className="bg-blue-500 font-semiboild text-white rounded-md px-5 py-5 hover:bg-blue-300 transition-all mb-3"
				onClick={handleNewGame}
			>
				Jugar de nuevo
			</button>
		</div>
	);
};

