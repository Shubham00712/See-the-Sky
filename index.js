var duration = 50,
  c = 0,
  s,tt,
  score = 0,
  chances = 5;
  devicePc=true;
window.onload = function () {
  var ply = document.getElementById("player");
  ply.style.left = "50%";
};
function newElement() {
  var div = document.createElement("div");
  document.getElementById("start").style.display = "none";
  div.setAttribute("id", "falling");
  div.style.background = "darkviolet";
  div.style.width = "5%";
  div.style.height = "10%";
  var left = Math.floor(Math.random() * 96);
  div.style.position = "absolute";
  div.style.top = "0%";
  div.style.left = left + "%";
  var scene = document.getElementById("upper");
  scene.appendChild(div);
  s = setInterval(movement, duration);
  if(devicePc)
  document.body.addEventListener("keydown", playerMovement);
  c++;
  if (c % 10 === 0 && c <= 60) duration -= 5;
}
function movement() {
  var div = document.getElementById("falling");
  div.style.top = parseInt(div.style.top) + 2 + "%";
  if(devicePc)
  document.body.removeEventListener("keydown", playerMovement);
  if (parseInt(div.style.top) === 72) {
    clearInterval(s);
    div.remove();
    newElement();
  }
  var left = parseInt(div.style.left);
  checkCollision(left);
  if(devicePc)
  document.body.addEventListener("keydown", playerMovement);
}

function checkCollision(eleleft) {
  var ply = document.getElementById("player");
  var div = document.getElementById("falling");
  if (
    parseInt(div.style.top) >= 55 &&
    parseInt(ply.style.left) + 8 >= eleleft &&
    eleleft + 5 >= parseInt(ply.style.left)
  ) {
    console.log("Collided");
    clearInterval(s);
    div.remove();
    score += 10;
    document.getElementById("score").innerHTML = "SCORE:" + score;
    newElement();
    return;
  }
  if (parseInt(div.style.top) === 70) {
    chances--;
    document.getElementById("chances").innerHTML = "CHANCES LEFT:" + chances;
  }

  if (chances === 0) {
    clearInterval(s);
    document.getElementById("chances").innerHTML = "CHANCES LEFT:" + chances;
    document.getElementById("result").style.display = "flex";
    document.getElementById("result").innerHTML =
      "GAME OVER <br> Score:" +
      score +
      "<br><button onclick='back()'>Home</button>";
    div.remove();
    clearInterval(tt)
    chances = 5;
    score = 0;
    duration = 50;
  }
}

function playerMovement(e) {
  var ply = document.getElementById("player");
  if (e.which === 37 && parseInt(ply.style.left) >= 5)
    ply.style.left = parseInt(ply.style.left) - 5 + "%";
  if (e.which === 39 && parseInt(ply.style.left) <= 90)
    ply.style.left = parseInt(ply.style.left) + 5 + "%";
}

leftMove=()=>{
  tt=setInterval(left,100)
}

function left(){
  var ply = document.getElementById("player");
  if(parseInt(ply.style.left) >= 5)
  ply.style.left = parseInt(ply.style.left) - 5 + "%";
}

stop=()=>{
  clearInterval(tt)
}

rightMove=()=>{
  tt=setInterval(right,100)
}

function right(){
  var ply = document.getElementById("player");
  if(parseInt(ply.style.left) <=90)
  ply.style.left = parseInt(ply.style.left) + 5 + "%";
}

function howToPlay() {
  document.getElementById("description").style.display = "flex";
  document.getElementById("start").style.display = "none";
}

back = () => {
  document.getElementById("description").style.display = "none";
  document.getElementById("start").style.display = "flex";
  document.getElementById("result").style.display = "none";
  document.getElementById("score").innerHTML = "SCORE: " + score;
  document.getElementById("chances").innerHTML = "CHANCES LEFT: " + chances;
};

switchDevice=()=>{
  if(devicePc){
    document.getElementById('mob').disabled=true
    document.getElementById('pc').disabled=false
    devicePc=false
    document.getElementById('mobButton').style.display='flex'
  }
  else{
    devicePc=true
    document.getElementById('mob').disabled=false
    document.getElementById('pc').disabled=true
    document.getElementById('mobButton').style.display='none'
  }
}