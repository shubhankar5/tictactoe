"use strict";

let board=[[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']],aicoin,plycoin,scores=[0,0],newGame=true,state="inactive";

function modifyScores(coin,parm){ //Updating the scores upon result
    if(parm!="draw"){
        if(coin=='X')
            scores[0]++;
        else
            scores[1]++;
    }
    animateResult(parm);
    parm=null;
}

function statusCheck(coin,f=false){ // Function for win/loss/draaw check
    let c=[0,0,0,0],cnt=0,parm;
    for(let i=0;i<3;i++){
        c[0]=c[1]=0;
        for(let j=0;j<3;j++){
            if(board[i][j]==coin)
                c[0]++;
            if(board[j][i]==coin)
                c[1]++;
            if(board[i][j]==' ')
                cnt++;
        }
        if(board[i][i]==coin)
            c[2]++;
        if(board[i][2-i]==coin)
            c[3]++;
        for(let m=0;m<4;m++){
            if(c[m]==3){
                if(f){
                    parm=coin;
                    modifyScores(coin,parm);
                }
                return 1;
            }
        }
    }
    if(!cnt){
        if(f){
            parm="draw";
            modifyScores(coin,parm);
        }
        return 0;
    }
    return -1;
}

function play(coin, d){ //minimax algorithm
    let score,maxscore=-100,minscore=100;
    if(statusCheck(aicoin)==1)
        return 10-d;
    else if(statusCheck(plycoin)==1)
        return -10+d;
    else if(!statusCheck(plycoin))
        return 0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==' '){
                board[i][j]=coin;
                if(coin==aicoin){
                    score=play(plycoin,d+1);
                    maxscore=Math.max(maxscore,score);
                }
                else{
                    score=play(aicoin,d+1);
                    minscore=Math.min(minscore,score);
                }
                board[i][j]=' ';
            }
        }
    }
    if(coin==aicoin)
        return maxscore;
    else
        return minscore;
}

function main(turn="ai"){
    let maxscore=-100,score,pos=[-1,-1];
    if(turn=="player" && statusCheck(plycoin,true)!=-1)
        return 0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==' '){
                board[i][j]=aicoin;
                score=play(plycoin,0);
                if(score>maxscore)
                    pos=[i,j];
                maxscore=Math.max(maxscore,score);
                board[i][j]=' ';
            }
        }
    }
    board[pos[0]][pos[1]]=aicoin;
    displayBoard();
    if(statusCheck(aicoin,true)!=-1)
        return 0;
}