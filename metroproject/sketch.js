let city;
let gameWidth = 1500;
let gameHeight = 600;
let names = ["Barkingside", "Fleetwood", "Milton Park"];
let sectors = [];
let cellWidth = 150;
let cellHeight = 200;
let mouseMode = "normal";

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
    this.size = cellWidth;
    this.height = cellHeight;
    this.demand = random(100);
    this.name = names.pop();
    this.alpha = 0;
    this.stations = [];
    this.satisfaction = this.stations.length * 10;
  }
  
  display() {
    stroke(2);
    fill(255, 255, 255, this.alpha);
    rect(this.x, this.y, this.size, this.height);

    if(mouseX < this.x + this.size && mouseX > this.x){
      if (mouseY < this.y + this.height && mouseY > this.y){
        fill(255);
        rect(mouseX, mouseY, 200, 100);

        textSize(20);
        fill(0);
        text(this.name, mouseX + 75, mouseY + 20);
        textSize(20);
        text("Demand: " + Math.round(this.demand), mouseX + 10, mouseY + 50);
        text("Satsifaction: " + this.satisfaction, mouseX + 10, mouseY + 70);
      }
    }
  } 
}

class Station {
  contructor(x, y){
    this.x = x;
    this.y = y;
  }

  display(){
    fill(0);
    rect(this.x, this.y, 10, 10);
  }
}

function makeGrid(){
  for (let x = 0; x < Math.round(gameWidth/cellWidth); x++){
    sectors.push([]);
    for (let y = 0; y < Math.round(gameHeight/cellHeight); y++){    
      newSector = new Sector(x * cellWidth, y * cellHeight);  
      sectors[x].push(newSector);
    }
  }
}

function displayGrid(){
  for (let i = 0; i < sectors.length; i++){
    for (let j = 0; j < sectors[i].length; j++){
      sectors[i][j].display();
    }
  }
}