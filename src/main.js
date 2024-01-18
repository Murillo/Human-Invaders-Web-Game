import SpaceCraftModel from './library/game/SpaceCraft.glb';
import { Game } from './components/Game';

const objects = [
	{ 
		"name": "SpaceCraft",
		"path" : SpaceCraftModel 
	}
];
const htmlContainer = document.getElementById('container')
const game = new Game(htmlContainer);
game.load(objects)
	.then(() => game.start())
	.catch(() => console.log('Failed to start the game!'))

