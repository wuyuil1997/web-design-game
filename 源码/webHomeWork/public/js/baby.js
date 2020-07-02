var babyObj = function(){
    this.x;
    this.y;
    this.angle;
    this.babyEye = new Image();
    this.babyBody = new Image();
    this.babyTail = new Image();

    this.babyTailTimer = 0;
    this.babyTailCnt =  0;

    this.babyEyeTimer = 0;
    this.babyEyeCnt = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCnt =  0;

}
babyObj.prototype.init = function(){
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    this.babyEye.src = "./src/babyEye0.png";
    this.babyBody.src = "./src/babyFade0.png";
    this.babyTail.src = "./src/babyTail0.png";
}
babyObj.prototype.draw = function(){
    //lerp x y
    this.x = lerpDistance(mom.x, this.x, 0.01);
    this.y = lerpDistance(mom.y, this.y, 0.01);
    
    //delta angle
    //Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    //lerp angle
    this.angle = lerpAngle(beta, this.angle,0.91);

    this.babyTailTimer +=deltaTime;
    if(this.babyTailTimer>50){
        this.babyTailCnt = (this.babyTailCnt+1)%8;
        this.babyTailTimer%=50;
    }

    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCnt = (this.babyEyeCnt + 1)%2;
        this.babyEyeTimer %= this.babyEyeInterval;

        if(this.babyEyeCnt==0){
            this.babyEyeInterval = Math.random()*1500 + 2000;
        }else{
            this.babyEyeInterval = 200;
        }
    }

    this.babyBodyTimer +=deltaTime;
    if(this.babyBodyTimer>300){
        this.babyBodyCnt = this.babyBodyCnt+1;
        this.babyBodyTimer %= 300;

        if(this.babyBodyCnt>19){
            this.babyBodyCnt = 19;
            //提示game over
            data.gameOver = true;
        }
    }

    contextFront.save();
    contextFront.translate(this.x,this.y);
    contextFront.rotate(this.angle);
    contextFront.drawImage(babyTail[this.babyTailCnt],-babyTail[this.babyTailCnt].width*0.5 + 25,-babyTail[this.babyTailCnt].height*0.5);
    contextFront.drawImage(babyBody[this.babyBodyCnt],-babyBody[this.babyBodyCnt].width*0.5,-babyBody[this.babyBodyCnt].height*0.5);
    contextFront.drawImage(babyEye[this.babyEyeCnt],-babyEye[this.babyEyeCnt].width*0.5,-babyEye[this.babyEyeCnt].height*0.5);
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