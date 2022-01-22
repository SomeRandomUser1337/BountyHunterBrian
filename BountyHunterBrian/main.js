

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;
let player = new Image();
player.src = "assets/sprite.png";
player.onload = function (){
  ctx.drawImage(
      player,
      0,
      0,
      100,
      100);

};
