// =========================
// P Test Ver.0.2
// =========================

let balls = 250;
let loan = 1;
let spin = 0;

// 打ち出し
let firing = false;
let fireTimer = null;
let rush = false;
let drawing = false;

// 保留
// 保留
let reserve = [];
const MAX_RESERVE = 4;

// 釘
const needleTable = [
    {name:"🥕", rate:0.050},
    {name:"🐇", rate:0.055},
    {name:"🌙", rate:0.060},
    {name:"🌕", rate:0.065},
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

        const enterRate =
rush ? 0.95 : needle.rate;

if(Math.random() < enterRate){
    enterHeso();
}

    },360);

}

// ------------------------

function enterHeso(){

// ヘソ賞球
balls++;

balls++;

if(reserve.length >= MAX_RESERVE){

    updateScreen();
    return;

}

reserve.push(lottery());

updateReserve();
updateScreen();

if(!drawing){
    consumeReserve();
}

}
        
// ------------------------

function createMissNumber(){

    while(true){

const a = Math.floor(Math.random()*9)+1;
const b = Math.floor(Math.random()*9)+1;
const c = Math.floor(Math.random()*9)+1;

const number = a*100 + b*10 + c;

        // 111、222…999は禁止
        if(a===b && b===c){
            continue;
        }

        return number;

    }

}

function lottery(){

    const hit = Math.random() < (1/99);

    if(!hit){
        return {
            hit:false,
            symbol:0,
            color:"white"
        };
    }

const symbols = [
111,222,333,444,
555,666,777,888,999
];

const symbol =
symbols[Math.floor(Math.random()*symbols.length)];

    let color = "white";

    if(symbol === 777){
        color = "rainbow";
    }else if(symbol % 2 === 1){
        color = "red";
    }

    return {
        hit:true,
        symbol:symbol,
        color:color
    };

}

// ------------------------

function updateReserve(){

    const slots =
    document.querySelectorAll(".reserveSlot");

    slots.forEach((slot,index)=>{

if(index < reserve.length){

    switch(reserve[index].color){

        case "white":
        
 slot.style.background =
reserve[index].color;

            break;

        case "red":
            slot.style.background = "red";
            break;

        case "rainbow":
            slot.style.background =
            "linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,purple)";
            break;

    }

}else{

    slot.style.background = "#444";

}

});

}
    
// ------------------------

function consumeReserve(){

    if(drawing){
        return;
    }

    if(reserve.length === 0){
        return;
    }

    drawing = true;

const result = reserve.shift();

spin++;
if(spin > maxSpin){
    maxSpin = spin;
}

updateReserve();

document.getElementById("message").innerText =
"抽選中...";

setTimeout(()=>{

if(result.hit){

spin = 0;
updateScreen();
    document.getElementById("message").innerText =
    "✨リーチ！✨";

    setTimeout(()=>{

        switch(result.symbol){

case 777:

    rush = true;
    document.body.classList.add("rush");

    balls += 2000;
    document.body.classList.add("flash");

setTimeout(()=>{

    document.body.classList.remove("flash");

},1200);
                document.getElementById("message").innerText =
                "🌈777 BONUS! +2000";
                break;

case 111:
case 333:
case 555:
case 999:

    rush = true;
    document.body.classList.add("rush");

    balls += 500;
    document.body.classList.add("flash");

setTimeout(()=>{

    document.body.classList.remove("flash");

},600);
                document.getElementById("message").innerText =
                result.symbol + " RUSH! +500";
                break;

case 222:
case 666:
case 888:

    balls += 500;
    
    document.body.classList.add("flash");

setTimeout(()=>{

    document.body.classList.remove("flash");

},600);

    document.getElementById("message").innerText =
    result.symbol + " BONUS! +500";

    break;

case 444:

    rush = false;
    document.body.classList.remove("rush");

    balls += 500;
    document.body.classList.add("flash");

setTimeout(()=>{

    document.body.classList.remove("flash");

},600);

    document.getElementById("message").innerText =
    "💀444 RUSH終了 +500";

    break;
                document.getElementById("message").innerText =
                result.symbol + " BONUS! +500";
                break;

        }

    }else{

const miss = createMissNumber();
        document.getElementById("message").innerText =
        miss;

    }

    updateScreen();

    // ←ここでは解除しない

setTimeout(()=>{

    drawing = false;

    if(reserve.length > 0){
        consumeReserve();
    }

},1000);

},10000);

}

// ------------------------

function updateScreen(){

    document.getElementById("balls").innerText =
    balls;
    document.getElementById("loan").innerText =
    loan;

document.getElementById("spin").innerText =
spin;

}

alert("script読み込み成功");