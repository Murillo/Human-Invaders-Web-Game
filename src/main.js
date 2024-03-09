import { Game } from './Game';

var startButton = document.querySelector('.nav.navbar-nav li a');
startButton.addEventListener('click', function() {
	var parentElement = startButton.parentNode;
	parentElement.classList.add('active');
    const htmlContainer = document.getElementById('container');
	const game = new Game(htmlContainer);
	game.load()
		.then(() => {
			game.start();
			htmlContainer.removeAttribute('class');
		})
		.catch(() => console.log('Failed to start the game!'))
});