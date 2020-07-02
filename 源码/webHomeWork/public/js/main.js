var canvasFront;//绘制在前面的canvas
var canvasBack;//绘制在后面的canvas

var contextFront;
var contextBack;

var lastTime;//上一次绘制画面的时间
var deltaTime;//两次绘制的时间差

var backgroundPicture = new Image(); //背景图片
var canWidth; //canvas的宽
var canHeight;//canvas的高

document.body.onload = game; //加载时调用game函数

var mouse_x;
var mouse_y;//鼠标位置

var ane;//海葵对象
var fruit;//食物对象
var mom;//大鱼对象
var baby;//小鱼对象
var babyTail = [];//小鱼尾部图片数组
var babyEye = [];//小鱼眼睛图片数组
var babyBody = [];//小鱼身体图片数组
var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;
var wave;
var dust;
var dustPic = [];
function game(){
    //游戏开始
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init(){
    //获得canvas context
    canvasFront = document.getElementById("canvas1");//z-index为1，在画面之前
    contextFront = canvasFront.getContext("2d");
    canvasBack = document.getElementById("canvas2");//z-index为0，在画面之后，如背景 海葵等
    contextBack = canvasBack.getContext("2d");

    contextFront.font = "20px Verdana";
    contextFront.textAlign = "center";

    canvasFront.addEventListener("mousemove",onMouseMove,false);

    backgroundPicture.src = "./src/background.jpg";

    canWidth = canvasFront.width;
    canHeight = canvasFront.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();
    for(var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }
    for(var i=0; i<2;i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    for(var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for(var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }
    for(var i=0; i<2;i++){
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }
    for(var i = 0; i < 8; i++){
        momBodyOrange[i] = new Image();
        momBodyOrange[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i] = new Image();
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }
    data = new dataObj();
    wave = new waveObj();
    wave.init();

    for(var i =0;i<7;i++){
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();

    mouse_x = canWidth *0.5;
    mouse_y = canHeight*0.5;
}

function gameloop(){
    //游戏循环
    requestAnimationFrame(gameloop);
    var latestTime = Date.now();
    deltaTime = (latestTime - lastTime) > 40 ? 40 : (latestTime - lastTime);
    lastTime = latestTime;
    drawBackground();
    contextFront.clearRect(0,0,canWidth,canHeight);//解决果实上漂拖线的bug
    ane.draw();
    fruitMonitor();
    fruit.draw();
    mom.draw();
    baby.draw();
    momFruitCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    dust.draw();
}
var sendCnt = 0;
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offSetX || e.layerX){
            mouse_x = e.offSetX == undefined ? e.layerX : e.offSetX;
            mouse_y = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    } else{
        if(sendCnt<1){
            console.log("gameover");
            var socket = io();
            //alert("Game Over!");
            //游戏结束后将游戏分数发给服务器
            sendCnt++;
            socket.emit("gameover",data.score);
        }
    }
}