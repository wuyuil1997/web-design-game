//判断大鱼与果实距离
function momFruitCollision(){
    if(!data.gameOver){
        for(var i = 0; i < fruit.num; i++){
            if(fruit.alive[i]){
                if(calLength(fruit.x[i],fruit.y[i],mom.x,mom.y)<900){
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.bigBodyCnt = mom.bigBodyCnt>6 ? 7:mom.bigBodyCnt + 1;
                    if(fruit.fruitType[i]=="blue"){
                        data.Times = 2;
                    }
                    wave.born(fruit.x[i],fruit.y[i],fruit.fruitType[i]);
                }
            }
        }
    }  
}

function calLength(x1, y1, x2, y2){
    return Math.pow(x1-x2,2) + Math.pow(y1-y2,2);
}

//mom baby collision
function momBabyCollision(){
    if(!data.gameOver){
        if(calLength(mom.x,mom.y,baby.x,baby.y)<900){
            //baby recover
            if(data.fruitNum>=1){
                var color = "";
                if(data.Times==2){
                    color = "blue";
                }else{
                    color = "orange";
                }
                wave.born(baby.x,baby.y,color);
                baby.babyBodyCnt = 0;
            }
            data.addScore();
            mom.bigBodyCnt = 0;
        }
    } 
}