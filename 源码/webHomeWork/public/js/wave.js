var waveObj = function(){
    this.x = [];
    this.y = [];
    this.alive = [];//bool
    this.r = [];
    this.color = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init =function(){
    for(var i=0;i<this.num;i++){
        this.alive[i] =false;
        this.r[i] = 0;
    }
}
waveObj.prototype.draw = function(){
    contextFront.save();
    contextFront.lineWidth = 2;
    contextFront.shadowBlur = 10;
    contextFront.shadowColor = "white";
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            //draw
            this.r[i] += deltaTime * 0.1;
            if(this.r[i]>=60){
                this.alive[i] = false;
            }
            var alpha = 1 - this.r[i] /60;

            contextFront.beginPath();
            contextFront.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
            contextFront.closePath();
            if(this.color[i]=="blue"){
                contextFront.strokeStyle = "rgba(0,0,255," + alpha + ")";
            }else{
                contextFront.strokeStyle = "rgba(255,95,11," + alpha + ")";
            }
            contextFront.stroke();
        }
    }
    contextFront.restore();
}
waveObj.prototype.born = function(x, y,color){
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]){
            //born
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 10;
            this.color[i] = color;
            return;
        }
    }
}