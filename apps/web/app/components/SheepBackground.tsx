'use client';

import { useEffect, useState } from 'react';

type Sheep = {
	id: number;
	x: number;
	y: number;
	rotation: number;
	hueRotate: number;
	saturation: number;
	size: number;
	color: string;
};

export default function SheepBackground() {
	const [sheep, setSheep] = useState<Sheep[]>([]);

	useEffect(() => {
		// Generate random sheep positions, rotations, colors, and sizes
		const generateSheep = () => {
			const newSheep: Sheep[] = [];
			const sheepCount = 400; // Number of sheep to display

			for (let i = 0; i < sheepCount; i++) {
				newSheep.push({
					color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
					id: i,
					x: Math.random() * 100, // Random x position (percentage)
					y: Math.random() * 100, // Random y position (percentage)
					rotation: Math.random() * 360, // Random rotation (0-360 degrees)
					hueRotate: Math.random() * 360, // Random hue rotation for colors
					saturation: 0.6 + Math.random() * 0.8, // Random saturation (0.6-1.4)
					size: 30 + Math.random() * 40, // Random size between 30-70px
				});
			}

			setSheep(newSheep);
		};

		generateSheep();
	}, []);

	return (
		<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
			{sheep.map((sheepItem) => (
				<div
					key={sheepItem.id}
					className="absolute opacity-25"
					style={{
						left: `${sheepItem.x}%`,
						top: `${sheepItem.y}%`,
						transform: `rotate(${sheepItem.rotation}deg)`,
						filter: `hue-rotate(${sheepItem.hueRotate}deg) saturate(${sheepItem.saturation})`,
						width: `${sheepItem.size}px`,
						height: `${sheepItem.size}px`,
						backgroundImage: 'url(/sheep-icons.png)',
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				/>
			))}
		</div>
	);
}

