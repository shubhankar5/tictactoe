"use strict";

let c = document.getElementById("mycanvas"); //Getting the canvas element
let ctx = c.getContext("2d");

function display(){ //Display the lnes on the board
    ctx.font = "bold 35px Comic Sans MS";
    $("#scorex").text("Score X :  "+scores[0]);
    $("#scoreo").text("Score O :  "+scores[1]);
    let w=c.width/3;
    let h=c.height;
    ctx.fillStyle = "#961EFF";
    ctx.clearRect(0, 0, 3*w, h);
    ctx.fillRect(w, 8, 8, h-16);
    ctx.fillRect(2*w, 8, 8, h-16);
    ctx.fillRect(10, h/3, 3*w-20, 4);
    ctx.fillRect(10, 2*h/3, 3*w-20, 4);
}

function chooseColor(c){ //Color for coins
    if(c=='X')
        ctx.strokeStyle=ctx.fillStyle = "black";
    else if(c=='O')
        ctx.strokeStyle=ctx.fillStyle = "white";
    else
        ctx.fillStyle = "#961EFF00";
}

function displayBoard(){ //Display the coins on the board
    let x=40,y=40;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            chooseColor(board[i][j]);
            ctx.fillText(board[i][j], x, y);
            x+=(c.width/3+1);
        }
        x=40;
        y+=c.height/3;
    }
}

function modify(){ //Activate the window based on active and inactive states
    if(state=="active"){
        $("#x").hide();
        $("#o").hide();
        $("#choice").hide();
        $("#mycanvas").css("cursor","pointer");
    }else if(state=="inactive"){
        $("#x").show();
        $("#o").show();
        $("#choice").show();
        $("#mycanvas").css("cursor","");
    }else
        $("#mycanvas").css("cursor","");
}

function animateResult(parm){ //Animate the final result of each round
    let el = $("#mycanvas");
    display();
    displayBoard();
    ctx.font = "bold 55px Times New Roman";
    newGame=true;
    state="dead";
    modify(state);
    if(parm=="draw"){
        el.delay(300).fadeTo(1000, 0.25,function(){
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.fillStyle ="#14AA14";
            ctx.fillText("DRAW",70,100);
        });
    }else{
        el.delay(300).fadeTo(1000, 0.25,function(){
            ctx.clearRect(0, 0, c.width, c.height);
            chooseColor(parm);
            if(parm==plycoin)
                ctx.fillText("YOU WIN",20,100);
            else
                ctx.fillText("YOU LOSE",10,100);
        });
    }
    el.fadeTo(1, 1,);
}

function getPos(v,event){ //Placing the coin on the clicked position
    if(state=="active" && !newGame){
        let w=c.width,h=c.height-10;
        w/=Math.floor(w/h); w-=10;
        let i=Math.floor((event.clientY-v.offset().top)/h),
        j=Math.floor((event.clientX-v.offset().left)/w);
        if(board[i][j]==' '){
            board[i][j]=plycoin;
            displayBoard();
            main("player");
        }
    }
}

$(document).ready(function(){
    $("#mycanvas").on("load",display());
    $("#x").click(function(){
        if(newGame){
            aicoin='O';
            plycoin='X';
            state="active";
            newGame=false;
            modify();
            $("#mycanvas").on("mousedown",function(){
                getPos($(this),event);
            });
        }
    });
    $("#o").click(function(){
        if(newGame){
            aicoin='X';
            plycoin='O';
            state="active";
            newGame=false;
            modify();
            setTimeout(main,100);
            $("#mycanvas").on("mousedown",function(){
                getPos($(this),event);
            });
        }
    });
    $("button").click(function(){
        $("#mycanvas").finish();
        display();
        newGame=true;
        board=[[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
        aicoin=plycoin=null;
        state="inactive";
        modify();
    });
});
