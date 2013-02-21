function Button() {
    var Img;
    var ImgWidht;
    var ImgHeight;
    var Canvas;
    var ContextCanvas;
    var PosX;
    var PosY;
    

    this.getImg = getImg;
    this.getImgWidht = getImgWidht;
    this.getImgHeight = getImgHeight;
    this.getCanvas = getCanvas;
    this.getContextCanvas = getContextCanvas;
    this.getPosX = getPosX;
    this.getPosY = getPosY;
    this.setImg = setImg;
    this.setImgWidht = setImgWidht;
    this.setImgHeight = setImgHeight;
    this.setCanvas = setCanvas;
    this.setContextCanvas = setContextCanvas;
    this.setPosX = setPosX;
    this.setPosY = setPosY;

    function getImg() {
        return Img;
    }

    function getImgWidht() {
        return ImgWidht;
    }

    function getImgHeight() {
        return ImgHeight;
    }

    function getCanvas() {
        return Canvas;
    }

    function getContextCanvas() {
        return ContextCanvas;
    }

    function getPosX() {
        return PosX;
    }

    function getPosY() {
        return PosY;
    }

    function setImg(_img) {
        Img = _img;
    }

    function setImgWidht(_imgwidht) {
        ImgWidht = _imgwidht;
    }

    function setImgHeight(_imgheight) {
        ImgHeight = _imgheight;
    }

    function setCanvas(_canvas) {
        Canvas = _canvas;
    }

    function setContextCanvas(_contextcanvas) {
        ContextCanvas = _contextcanvas;
    }

    function setPosX(_posX) {
        PosX = _posX;
    }

    function setPosY(_posY) {
        PosY = _posY;
    }

    this.Logo = function () {
        ContextCanvas.drawImage(Img, PosX - (ImgWidht / 2), PosY - (ImgHeight / 2), ImgWidht, ImgHeight);
    }
	
	this.Contains = function(x,y){
		var pos_x = PosX - (ImgWidht / 2);
		var pos_y = PosY - (ImgHeight / 2);
		var img_x = (PosX - (ImgWidht / 2)) + ImgWidht;
		var img_y = (PosY - (ImgHeight / 2)) + ImgHeight;
	
		if(pos_x <= x &&  img_x >= x && pos_y <= y && img_y >= y){
			return true;
		}else{
			return false;
		}
		
	}

}