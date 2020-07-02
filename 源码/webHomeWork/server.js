var express = require('express');
var app = express();
var http = require('http').Server(app);//将express注册到HTTP中
var path = require('path'); //系统路径模块

var io = require('socket.io')(http);
var mysql = require('mysql');

app.use(express.static(path.join(__dirname, 'public')));
//--访问根目录时跳转----
app.get('/',function(req, res){
    console.log("user visit game page");
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("a user connected");
    //监听用户注册事件
    socket.on("gameover", function(score){
        var connection  =mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'wuyuil1314',
            database : 'webdb'
        });
        
        
        //---插入数据----
        var addSql = 'insert into userScore(score) values(?)';
        var addSqlParams = [score];
        
        console.log("a user gameover:");
        console.log("userscore: " + score);

        connection.query(addSql, addSqlParams, function(err, result){
            if(err){
                console.error('[insert error] -', err.message);
                return;
            }
            console.log('--------------------------INSERT----------------------------');       
            console.log('INSERT ID:',result);        
            console.log('-----------------------------------------------------------------\n'); 

            //-----查询数据----
            var sqlQuery = 'select * from userScore';
            connection.query(sqlQuery, function(err, result){
            if(err){
                console.error('[select error] - ', err.message);
            }
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n');

            //将用户分数记录成功消息发送给客户
            //io.emit("logsuccess",username);
        });

        });
        
    });
});

//------监听3000号端口
http.listen(3000, function(){
    console.log('listening on *:3000');
});