window.onload = function () {

	var scenes = ["intro","game"]
	var now = scenes[0];

    //Create context of the canvas
    var c = document.getElementById("game");
    c.width = screen.width;
    c.height = screen.height;
    var context = c.getContext("2d");
	
	/* Create images */
	var imageBackground = new Image();
	imageBackground.src = "img/background_002.jpg";

	var imageGame = new Image();
	imageGame.src = "http://br.bing.com/az/hprichbg/rb/ThreeSistersOre_ROW9616382495_1366x768.jpg";

    var pga = new StartLogo(c, context);
    pga.Logo();

    setInterval(function() {
		
		if(now == "intro"){
			var btns = SceneOne(c, context, imageBackground);
		}else if(now == "game"){
			Images(c, context, screen.width, screen.height, imageGame);
		}
		
	
		c.addEventListener('click', function(e) {
			var mousePos = getMousePos(c, e);
			console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
			if(btns.start.Contains(mousePos.x, mousePos.y)){
				now = scenes[1];
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

function SceneOne(c, context, imageBackground){
	Images(c, context, screen.width, screen.height, imageBackground);

	// Button Logo
	var logoGame = new Button();
	logoGame.setCanvas(c);
	logoGame.setContextCanvas(context);
	logoGame.setImg(document.getElementById("logoGame"));
	logoGame.setImgWidht(400);
	logoGame.setImgHeight(96);
	logoGame.setPosX(screen.width / 2);
	logoGame.setPosY((screen.height / 2) - 100);
	logoGame.Logo();

	// Button Start
	var start = new Button();
	start.setCanvas(c);
	start.setContextCanvas(context);
	start.setImg(document.getElementById("imgStart"));
	start.setImgWidht(125);
	start.setImgHeight(22);
	start.setPosX(screen.width / 2);
	start.setPosY((screen.height / 2) + 50);
	start.Logo();

	// Button Options
	var options = new Button();
	options.setCanvas(c);
	options.setContextCanvas(context);
	options.setImg(document.getElementById("imgOptions"));
	options.setImgWidht(175);
	options.setImgHeight(22);
	options.setPosX(screen.width / 2);
	options.setPosY((screen.height / 2) + 100);
	options.Logo();

	// Button Redord
	var record = new Button();
	record.setCanvas(c);
	record.setContextCanvas(context);
	record.setImg(document.getElementById("imgRecord"));
	record.setImgWidht(140);
	record.setImgHeight(22);
	record.setPosX(screen.width / 2);
	record.setPosY((screen.height / 2) + 150);
	record.Logo();

	// Button About
	var about = new Button();
	about.setCanvas(c);
	about.setContextCanvas(context);
	about.setImg(document.getElementById("imgAbout"));
	about.setImgWidht(125);
	about.setImgHeight(22);
	about.setPosX(screen.width / 2);
	about.setPosY((screen.height / 2) + 200);
	about.Logo();
	
	return {
	  start: start,
	  options: options,
	  record: record,
	  about: about
	};
}