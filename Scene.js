function SceneOne(c, context, imageBackground){
	Images(c, context, screen.width, screen.height, imageBackground);

	// Button Logo
	var logoGame = new Button();
	logoGame.setCanvas(c);
	logoGame.setContextCanvas(context);
	logoGame.setImg(document.getElementById("logoGame"));
	logoGame.setImgWidht(609);
	logoGame.setImgHeight(190);
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

function SceneTwo(c, context, imageBackground)
{
	Images(c, context, screen.width, screen.height, imageBackground);
}