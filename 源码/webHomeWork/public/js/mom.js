var momObj = function(){
    this.x;
    this.y;
    this.angle;
    this.bigEye = new Image();
    this.bigBody = new Image();
    this.bigTail = new Image();

    this.bigiTailTimer = 0;
    this.bigTailCnt = 0;
    
    this.bigEyeTimer = 0;
    this.bigEyeCnt = 0;
    this.bigEyeInterval = 1000;

    this.bigBodyCnt = 0;
    this.bigBodyType = "";
}
momObj.prototype.init = function(){
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    this.bigEye.src = "./src/bigEye0.png";
    this.bigBody.src = "./src/bigSwim0.png";
    this.bigTail.src = "./src/bigTail0.png";
}
momObj.prototype.draw = function(){
    //lerp x y
    this.x = lerpDistance(mouse_x, this.x, 0.02);
    this.y = lerpDistance(mouse_y, this.y, 0.02);
    
    //delta angle
    //Math.atan2(y,x)
    var deltaY = mouse_y - this.y;
    var deltaX = mouse_x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    //lerp angle
    this.angle = lerpAngle(beta, this.angle,0.91);

    this.bigiTailTimer += deltaTime;
    if(this.bigiTailTimer>50){
        this.bigTailCnt = (this.bigTailCnt + 1)%8;
        this.bigiTailTimer %=50;
    }

    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval){
        this.bigEyeCnt = (this.bigEyeCnt + 1)%2;
        this.bigEyeTimer %= this.bigEyeInterval;

        if(this.bigEyeCnt==0){
            this.bigEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.bigEyeInterval = 50;
        }
    }

    contextFront.save();
    contextFront.translate(this.x,this.y);
    contextFront.rotate(this.angle);
    contextFront.drawImage(momTail[this.bigTailCnt],-momTail[this.bigTailCnt].width*0.5 + 30,-momTail[this.bigTailCnt].height*0.5);
    if(data.Times==1){
        contextFront.drawImage(momBodyOrange[this.bigBodyCnt],-momBodyOrange[this.bigBodyCnt].width*0.5,-momBodyOrange[this.bigBodyCnt].height*0.5);
    }else{
        contextFront.drawImage(momBodyBlue[this.bigBodyCnt],-momBodyBlue[this.bigBodyCnt].width*0.5,-momBodyBlue[this.bigBodyCnt].height*0.5);
    }
    contextFront.drawImage(momEye[this.bigEyeCnt],-momEye[this.bigEyeCnt].width*0.5,-momEye[this.bigEyeCnt].height*0.5);
    contextFront.restore();
}
function lerpDistance(aim, cur, ratio){
    var delta = aim - cur;
    return cur + delta *ratio;
}
function lerpAngle(a, b, t){
    var d = b-a;
    if(d>Math.PI) d = d -2 * Math.PI;
    if(d<-Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
}