// =========================
// P Test Ver.0.2
// =========================

let balls = 250;
let loan = 1;

// 打ち出し
let firing = false;
let fireTimer = null;

// 保留
let reserve = 0;
const MAX_RESERVE = 4;

// 釘
const needleTable = [
    {name:"🥕", rate:0.035},
    {name:"🐇", rate:0.045},
    {name:"🌙", rate:0.055},
    {name:"🌕", rate:0.063},
    {name:"🌏", rate:0.070}
];

const needle =
    needleTable[
        Math.floor(Math.random()*needleTable.length)
    ];

document.getElementById("needleMessage").innerText =
needle.name;

// ------------------------

updateScreen();

// ------------------------

document
.getElementById("startButton")
.addEventListener("click", start);

document
.getElementById("stopButton")
.addEventListener("click", stop);

// ------------------------

function start(){

    if(firing) return;

    firing = true;

    document.getElementById("message").innerText =
    "打ち出し中";

    fireTimer = setInterval(fireBall,600);

}

// ------------------------

function stop(){

    firing = false;

    clearInterval(fireTimer);

    document.getElementById("message").innerText =
    "停止";

}

// ------------------------

function fireBall(){

    if(balls<=0){

        balls += 250;
        loan++;

    }

    balls--;

    animateBall();

    updateScreen();

}

// ------------------------

function animateBall(){

    const ball =
    document.getElementById("ball");

    ball.style.transition = "none";
    ball.style.top = "10px";

    setTimeout(()=>{

        ball.style.transition =
        "top .35s linear";

        ball.style.top = "120px";

    },20);

    setTimeout(()=>{

        if(Math.random()<needle.rate){

            enterHeso();

        }

    },360);

}

// ------------------------

function enterHeso(){

    if(reserve>=MAX_RESERVE){

        document.getElementById("message").innerText =
        "満タン";

        return;

    }

    reserve++;

    updateReserve();

    document.getElementById("message").innerText =
    "✨入賞！";

}

// ------------------------

function updateReserve(){

    const slots =
    document.querySelectorAll(".reserveSlot");

    slots.forEach((slot,index)=>{

        if(index<reserve){

            slot.style.background = "white";

        }else{

            slot.style.background = "#444";

        }

    });

}

// ------------------------

function updateScreen(){

    document.getElementById("balls").innerText =
    balls;

    document.getElementById("loan").innerText =
    loan;

}