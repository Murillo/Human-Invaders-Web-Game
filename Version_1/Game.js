window.onload = function () {

	var scenes = {
		None : 0,
		Intro : 1,
		Game : 2,
	}

	var now = scenes.Intro;

    //Create context of the canvas
    var c = document.getElementById("game");
    c.width = screen.width;
    c.height = screen.height;
    var context = c.getContext("2d");
	
	/* Create images */
	var imageBackground = new Image();
	imageBackground.src = "img/background_002.jpg";

	var imageGame = new Image();
	imageGame.src = "img/background_002.jpg";

    var pga = new StartLogo(c, context);
    pga.Logo();

    setInterval(function() {
		
		var btns;
		if(now == scenes.Intro){
			btns = SceneOne(c, context, imageBackground);
		}else if(now == scenes.Game){
			//Images(c, context, screen.width, screen.height, imageGame);
			SceneTwo(c, context, imageGame);
		}
		
	
		c.addEventListener('click', function(e) {
			var mousePos = getMousePos(c, e);
			console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
			if(btns.start.Contains(mousePos.x, mousePos.y)){
				now = scenes.Game;
				Images(c, context, screen.width, screen.height, imageGame);
			}
			
		}, false);
        

    }, 5000);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

function StartLogo(canvas, contextCanvas) {
    //Prepertis of the image
    var img = document.getElementById("logo");
    var imgWidht = 345;
    var imgHeight = 87;

    this.Logo = function () {
        contextCanvas.drawImage(img, (canvas.width / 2) - (imgWidht / 2), (canvas.height / 2) - (imgHeight / 2), imgWidht, imgHeight);
    }
}

