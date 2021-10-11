/*
COMP125-007: Assignment 5

Kyle O'Keeffe
301156790
Apr. 1, 2021
*/
var timerVar;
var btnResetSpeed=document.getElementById("resetSpeed");
var btnResetGame=document.getElementById("resetGame");

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var centreDiv=document.getElementById("centreDiv");

var monstersCaught=0;
var jumpInterval=1500;
var level=1;
var gameBeingPlayed=true;

var bgReady=false;
var monsterReady=false;
var bgImage=new Image();
var monsterImage = new Image();
bgImage.src = "images/bgImage.png";
monsterImage.src="images/monsterImageMedium.png";
bgImage.onload = function(){bgReady=true;};
monsterImage.onload = function(){monsterReady=true;};

var monster ={
    x:0,
    y:0,
};     

var bg={
    x:0,
    y:0,
    width:canvas.width,
    height:canvas.height,
    image:bgImage
}

centreDiv.appendChild(canvas);
canvas.width=window.innerWidth*0.9;
canvas.height=window.innerHeight*0.85;

timerFunction();

function CheckClick(event){
    var canvasStats =canvas.getBoundingClientRect();
    var xClick= event.clientX - canvasStats.left;
    var yClick=event.clientY - canvasStats.top;

    if (gameBeingPlayed==true && xClick>=monster.x && xClick <=monster.x+monsterImage.width && yClick>=monster.y && yClick<=monster.y+monsterImage.height){
        gameBeingPlayed=false;
        monstersCaught++;
        jumpInterval-=100; 
        level++;
        
        clearTimeout(timerVar);  
        ctx.fillText("Got Him!", canvas.width/2, canvas.height/2);
        ctx.fillText("Starting Level "+level +"!", (canvas.width/2)-40, (canvas.height/2)+20);
        setTimeout(function(){timerFunction();gameBeingPlayed=true;},2500);
    }
}

function JumpMonster(){
    monster.x=Math.floor(Math.random()*(canvas.width-monsterImage.width));
    monster.y=Math.floor(Math.random()*(canvas.height-monsterImage.height));
    Render();
}

function ResetGame(){
    if(gameBeingPlayed==true){
        gameBeingPlayed=false;
        level=1;
        monstersCaught=0;
        jumpInterval=1500;

        clearTimeout(timerVar);
        ctx.fillText("Game Reset!", (canvas.width/2), canvas.height/2);
        ctx.fillText("New Game Starting at Level "+level +"!", (canvas.width/2)-80, (canvas.height/2)+20);
        setTimeout(function(){timerFunction();gameBeingPlayed=true;},3200);
    }
}

function ResetSpeed(){
    if(gameBeingPlayed==true){
        gameBeingPlayed=false;
        jumpInterval=1500;
        level=1;

        clearTimeout(timerVar); 
        ctx.fillText("Speed Reset Activated!", (canvas.width/2)-40, canvas.height/2);
        ctx.fillText("Back to Level "+level +" Speed!", (canvas.width/2)-40, (canvas.height/2)+20);
        setTimeout(function(){timerFunction();gameBeingPlayed=true;},3200);
    }
}

function Render(){
    var bgHeight;
    var bgWidth;

    if(canvas.height>canvas.width*(824/1055)){
        bgHeight=canvas.height;
        bgWidth=canvas.height*(1055/824);
    }
    else if(canvas.width>(canvas.height*(1055/824))){
        bgWidth=canvas.width;
        bgHeight=canvas.width*(824/1055);  
    }
    else{
        bgWidth=canvas.width;
        bgHeight=canvas.height;
    }

    if(bgReady)
    ctx.drawImage(bg.image,0,0, bgWidth, bgHeight);
    
    if(monsterReady)
        ctx.drawImage(monsterImage, monster.x, monster.y);
    
    ctx.fillStyle="#000000";
    ctx.font="20px Verdana";
    ctx.fillText("Score:",50,50);
    ctx.fillText(monstersCaught,130,50);
    ctx.fillText("Level:",50, 80);
    ctx.fillText(level,130, 80);
}

function ResizeWindow(){
    canvas.width=window.innerWidth*0.9;
    canvas.height=window.innerHeight*0.85;
    Render();
}

function timerFunction(){
    JumpMonster();
    timerVar=setTimeout(timerFunction, jumpInterval);
}

function CreateEventListeners(){
    if(window.addEventListener){
        window.addEventListener("mousedown", function(){CheckClick(event)}, false);
        window.addEventListener("resize", ResizeWindow, false);
    }
    else if (window.attachEvent){
        window.attachEvent("onmousedown", function(){CheckClick(event)});
        window.attachEvent("onresize", ResizeWindow);
    }

    if(resetSpeed.addEventListener)
        resetSpeed.addEventListener("click", ResetSpeed, false);
    else if (resetSpeed.attachEvent)
        resetSpeed.attachEvent("onclick", ResetSpeed);

    if(resetGame.addEventListener)
        resetGame.addEventListener("click", ResetGame, false);
    else if (resetGame.attachEvent)
        resetGame.attachEvent("onclick", ResetGame);   
} 

if(window.addEventListener)
    window.addEventListener("load", CreateEventListeners, false);
else if (window.attachEvent)
    window.attachEvent("onload", CreateEventListeners);
