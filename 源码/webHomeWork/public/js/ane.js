var aneObj = function(){
    this.x = [];
    this.headx = [];
    this.heady = [];
    this.alpha = 0;
    this.amp = [];
    this.modify = [];
    this.fruitBorn = [];//bool 判断该海葵是否有果实生长,避免同一时间多个果实生长在同一海葵
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
    for(var i =0; i < this.num; i++){
        this.x[i] = i * 17 + Math.random() * 20;//[0,1)
        this.headx[i] = this.x[i];
        this.heady[i] = canHeight + Math.random() * 50 - 200;
        this.amp[i] = Math.random() * 50;
        this.modify[i] = 0;
        this.fruitBorn[i] = false;
    }
}
aneObj.prototype.draw = function(){

    this.alpha += deltaTime * 0.001;
    contextBack.save();
    contextBack.globalAlpha = 0.6;
    contextBack.lineWidth = 17;
    contextBack.lineCap = "round";
    contextBack.strokeStyle = "#3B154E";
    for(var i = 0; i<this.num; i++){
        this.modify[i] = Math.sin(this.alpha) * this.amp[i];
        //beginPath moveTo lineTo stroke strokeStyle lineWidth lineCap globalAlpha
        contextBack.beginPath();
        contextBack.moveTo(this.x[i],canHeight);
        contextBack.quadraticCurveTo(this.x[i], canHeight - 100,this.headx[i] + this.modify[i],this.heady[i]);
        contextBack.stroke();
    }
    contextBack.restore();
}