var Game = (function () {
		
    function Game(name) {
        this.name = name;
        this.loadContent();
        this.update();
        this.draw();
    }
	
    Game.prototype.loadContent = function () {
        return "Load, " + this.name;
    };
	
	Game.prototype.update = function () {
        return "Update, " + this.name;
    };
	
	Game.prototype.draw = function () {
        return "Draw, " + this.name;
    };
	
    return Game;
})();

var game = new Game("Human Invaders");