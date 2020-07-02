var fruitObj = function(){
    this.alive = []; //bool
    this.x = [];
    this.y = [];
    this.l = [];//长度
    this.speed = [];
    this.fruitType = [];
    this.bornAne = [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 15;
fruitObj.prototype.init = function(){
    for(var i =0 ; i < this.num; i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.bornAne[i] = -1;
        this.speed[i] = Math.random() * 0.01 + 0.004; //[0.005,0.15)
        this.fruitType[i] = "";
        this.born(i);
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}
fruitObj.prototype.draw = function(){
    for(var i = 0; i < this.num; i++){
        //find an ane, grow, fly up
        if(this.alive[i]){
            if(this.l[i]<=12) {
                this.x[i] = ane.headx[this.bornAne[i]] + ane.modify[this.bornAne[i]];
                this.y[i] = ane.heady[this.bornAne[i]];
                this.l[i] += this.speed[i]  * deltaTime;
            }else{
                this.y[i] -=this.speed[i] * 5 *deltaTime;
            }
            contextFront.drawImage(this.fruitType[i]=="blue"?this.blue:this.orange,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
        }
        if(this.y[i] < 10){
            this.alive[i] = false;
            ane.fruitBorn[this.bornAne[i]] = false; //将该果实对应的海葵标记为无果实生长
            this.bornAne[i] = -1; //解除该果实到出生海葵的绑定
        }
    }
}
fruitObj.prototype.born = function(i){
    var aneId = Math.floor(Math.random() * ane.num);
    //当海葵已有果实生长表示为true时，循环至没有果实生长的海葵id为止
    while(ane.fruitBorn[aneId]){
        aneId = Math.floor(Math.random() * ane.num);
    }
    this.x[i] = ane.headx[aneId]  + ane.modify[aneId] ;
    this.y[i] =ane.heady[aneId];
    this.l[i] = 0;
    this.alive[i] = true;
    this.fruitType[i] = (Math.random()*10>8)?"blue":"orange";
    ane.fruitBorn[aneId] = true; //将相应的海葵标记为有果实生长
    this.bornAne[i] = aneId;//将该果实绑定到出生的海葵
    console.log("生长果实海葵id：" + aneId + " 颜色：" + this.fruitType[i]);
}
fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
    ane.fruitBorn[this.bornAne[i]] = false; //将该果实对应的海葵标记为无果实生长
    this.bornAne[i] = -1; //解除该果实到出生海葵的绑定
}
function fruitMonitor(){
    var cnt = 0;
    for(var i = 0; i < this.num; i++){
        if(fruit.alive[i]){
            cnt++;
        }
    }
    if(cnt < 10){
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i = 0; i < fruit.num; i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
