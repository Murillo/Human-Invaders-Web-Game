import { Game } from './Game';

const htmlContainer = document.getElementById('container')
const game = new Game(htmlContainer);
game.load()
	.then(() => game.start())
	.catch(() => console.log('Failed to start the game!'))

