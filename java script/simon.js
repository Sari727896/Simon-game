let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;
let equal=0;
var check1=0;
let nameInput;
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const onButton = document.querySelector("#on");
document.getElementById("start").addEventListener("click", startButton)
document.getElementById("strict").addEventListener("click", strictButton)
document.getElementById("score").innerText+=name;
window.addEventListener('load', function() {
  var loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.classList.add('hidden');
});

function strictButton() {
    if (strictButton.checked == true) {
        strict = true;
      } else {
        strict = false;
      }    
}

function startButton()
{
    var cupImage = document.getElementById("cup");
    if (cupImage) {
      cupImage.parentNode.removeChild(cupImage);
    }
    if(document.getElementById("cry"))
    {
      document.body.removeChild(document.getElementById("cry"));
    }
    if (on || win) {
      play();
    }
}

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
      on = true;
      turnCounter.innerHTML = "-";
    } else {
      on = false;
      turnCounter.innerHTML="";
      clearColor();
      clearInterval(intervalId);
    }
  });
function clearColor()
{
    
        topLeft.style.backgroundColor ="green";
        topRight.style.backgroundColor ="red";
        bottomLeft.style.backgroundColor ="rgb(218, 190, 32)";
         bottomRight.style.backgroundColor ="blue";
      
}

function flashColor() {
    topLeft.style.backgroundColor ="lightgreen";
    topRight.style.backgroundColor ="tomato";
    bottomLeft.style.backgroundColor ="yellow";
    bottomRight.style.backgroundColor ="lightskyblue";
  }
  function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
      order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
  }
  
function gameTurn() {
  on = false;
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}
function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}
function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}
topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
function check() {
  if(order[playerOrder.length-1]!=playerOrder[playerOrder.length-1])
     good=false;
     if(playerOrder.length==8&&good)
     {
       winGame();
      //  check1=1; 
     }
     if(!good)
    {   
        flashColor();
        let audio = document.getElementById("soundbuttonWrong");
        audio.play();
        turnCounter.innerHTML ="ERROR";
        var y = document.createElement("img");
        debugger
        y.setAttribute("src", "../image/yt.gif");
        y.setAttribute("width", "250");
        y.setAttribute("height", "240");
        // y.setAttribute("alt", "The Pulpit Rock");
        y.setAttribute("id","cry");
        document.body.appendChild(y);
        setTimeout(() => {
          turnCounter.innerHTML = turn;
          let sco =sessionStorage.setItem("score", turn);
           val= parseInt(sessionStorage.getItem("score"));
          if(val>equal)
          document.getElementById("score").innerText=nameInput+" "+"your score is" +" "+val;
           equal=val;
          clearColor();
            {
            compTurn = true;
            flash = 0;
            playerOrder = [];
            good = true;
          }
        }, 800);
        
    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame( ) {
  check1=1;
  let audio=document.getElementById("soundWin");
  audio.play();
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
  let sco =sessionStorage.setItem("score", turn);
  val= parseInt(sessionStorage.getItem("score"));
 if(val>equal)
 document.getElementById("score").innerText=nameInput+" "+"your score is" +" "+val;
  equal=val;
  var x = document.createElement("IMG");
  x.setAttribute("src", "../image/cup1.png");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  x.setAttribute("alt", "The Pulpit Rock");
  document.body.appendChild(x);
  x.setAttribute("id","cup");
}
function updateScore() {
  nameInput = prompt("Enter your name:");
  let nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test(nameInput)) {
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = nameInput+" "+"Your score is" ;
  } else {
    alert("Invalid name! Please enter only letters.");
  }
}



 
     













