const Card = ({ card }) => {
	return (
		<div
			className={`${card.flipped
				? '[transform:rotateY(10deg)]'
				: 'bg-white'} drop-shadow-md flex items-center justify-center cursor-pointer h-16 hover:scale-90 rounded-xl transition-all duration-100 p-12`}
		>
			<div>
				<img
					src={card.img}
					alt={card.alt}
					className={`${!card.flipped
						? '[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000'
						: ''}  h-16 scale-110`}
				/>
			</div>
		</div>
	);
};

export default Card;
