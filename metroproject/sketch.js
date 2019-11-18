let gameWidth = 1500;
let gameHeight = 800;

function preload(){
  city = loadImage('assets/city.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(225);
  image(city, 0, 0, gameWidth, gameHeight);
  //makeGrid();
}

function makeGrid(){
  for (let x = 0; x < gameWidth/150; x + 150){
    for (let y = 0; y < gameHeight/200; y + 200){
      strokeWeight(3);
      stroke(0);
      line(x, y, x + 150, y);
      line(x + 150, y, x + 150, y + 200);
      line(x + 150, y + 200, x, y + 200);
      line(x, y + 200, x, y);
    }
  }
}