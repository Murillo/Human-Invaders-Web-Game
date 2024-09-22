import { Game } from './Game';

// Start the game
var startButton = document.querySelector('.container li a');
startButton.addEventListener('click', function() {
	var parentElement = startButton.parentNode;
	parentElement.classList.add('active');
    const htmlContainer = document.getElementById('game');
    const menuPageContainer = document.getElementById('menuContainer');
    const gamePageContainer = document.getElementById('gameContainer');
	const game = new Game(htmlContainer);
	game.load()
		.then(() => {
			menuPageContainer.classList.add('hidden');
			gamePageContainer.removeAttribute('class');
			closeModal();
			game.start();
			htmlContainer.removeAttribute('class');
		})
		.catch(() => console.log('Failed to start the game!'))
});

// Open the about modal
var aboutButton = document.querySelector('.container li a.open-modal');
aboutButton.addEventListener('click', function() {
	var modal = document.getElementById('modal');
	modal.style.display = 'block';
});

// Close the about modal
var closeModalButton = document.querySelector('#modal .modal-close');
closeModalButton.addEventListener('click', function() {
	closeModal();
});

function closeModal() {
	var modal = document.getElementById('modal');
	modal.style.display = 'none';
}