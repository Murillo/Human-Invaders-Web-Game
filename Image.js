function Images(canvas, contextCanvas, width, height, img) {
    //Prepertis of the image	
    var imgWidht = width;
    var imgHeight = height;

    contextCanvas.drawImage(img, 0, 0, imgWidht, imgHeight);
}