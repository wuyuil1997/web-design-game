var dataObj = function(){
    this.fruitNum = 0;
    this.Times = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
}
dataObj.prototype.reset = function(){
    this.fruitNum = 0;
    this.Times = 1;
}
dataObj.prototype.draw = function(){
    var w = canvasFront.width;
    var h = canvasFront.height;

    contextFront.save();
    contextFront.shadowBlur = 10;
    contextFront.shadowColor = "white";
    contextFront.fillStyle = "white";
    contextFront.fillText("SCORE: " + this.score,w*0.5,h-50);
    if(this.gameOver){
        this.alpha += deltaTime * 0.0005;
        if(this.alpha>1)this.alpha = 1;
        contextFront.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        contextFront.fillText("GAME OVER",w*0.5, h*0.5);
    }
    contextFront.restore();
}
dataObj.prototype.addScore = function(){
    this.score += this.fruitNum * 100 * this.Times;
    this.fruitNum = 0;
    this.Times = 1;
}