let gameWidth = 1500;
let gameHeight = 800;
let names = ["Central City", "Fleetwood"];
let sectorColor = 255;

function preload(){
  city = loadImage('assets/city.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(225);
  image(city, 0, 0, gameWidth, gameHeight);
  makeGrid();
}

class Sector {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = gameWidth/150;
    this.demand = random(100);
    this.name = names.pop();
    this.alpha = 0;
    //this.stations = 0;
    //this.lines = [];
    //this.access = 
  }
  
  display(){
    stroke(2);
    fill(255, 255, 255, this.alpha);
    rect(this.x, this.y, this.size, this.height);
  }
  update(){
    //will make later
  }

  box(){
    //will make later
  }
}

function makeGrid(){
  for (let x = 0; x < gameWidth; x + 150){
    for (let y = 0; y < gameHeight; y + 200){
      newSector = new Sector(x, y);
      newSector.display();
    }
  }
}