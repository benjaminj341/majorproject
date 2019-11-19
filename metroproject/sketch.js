let city;
let gameWidth = 1500;
let gameHeight = 800;
let names = ["Central City", "Fleetwood"];
let sectorColor = 255;
let sectors = [];

function preload(){
  city = loadImage('assets/city.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeGrid();
}

function draw() {
  background(225);
  image(city, 0, 0, gameWidth, gameHeight);  
  displayGrid();
}

class Sector {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = gameWidth/150;
    this.height = gameHeight/200;
    this.demand = random(100);
    this.name = names.pop();
    this.alpha = 100;
  }
  
  display() {
    stroke(2);
    fill(255, 255, 255, this.alpha);
    rect(this.x, this.y, this.size, this.height);
  }
 
}

function makeGrid(){
  for (let x = 0; x < 10; x++){
    sectors.push([]);
    for (let y = 0; y < 4; y++){    
      newSector = new Sector(x * 150, y * 200);  
      sectors[x].push(newSector);
    }
  }
}

function displayGrid(){
  for (let i = 0; i < sectors.length; i++){
    for (let j = 0; j < sectors[i].length; i++){
      sectors[i][j].display();
    }
  }
}