let city;
let gameWidth = 1500;
let gameHeight = 600;
let names = ["Barkingside", "Fleetwood", "Milton Park",1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
let sectors = [];
let cellWidth = 150;
let cellHeight = 200;
let mouseMode = "normal";
let screenMode = "normal";
let money = 1000;
let stations = [];
let lines = [];
let linepoints = [];

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
  displayStations();
  displayLines();

  if (screenMode === "menu"){
    fill(20, 60, 200, 100);
    rect(0, gameHeight, width, height - gameHeight);

    rectMode(CENTER);
    rect(360, 660, 40, 40);
    textSize(20);
    text("New Station(200 money)", 300, 720);
    fill("black");
    rect(360, 660, 20, 20);

    rect(700, 660, 40, 40);
    textSize(20);
    text("New Line(50 money)", 640, 720);
    rectMode(CORNER);

    textSize(40);
    fill('black');
    text("Money: " + money , 850, 710);
  }
  sectorUpdate();
}

function sectorUpdate(){
  for (let i = 0; i < sectors.length; i++){
    for (let j = 0; j < sectors[i].length; j++){
      sectors[i][j].update();
    }
  }
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
    this.stationCount = 0;
    this.satisfaction = this.stationCount * 10;
  }
  
  display() {
    stroke(2);
    fill(255, 255, 255, this.alpha);
    rect(this.x, this.y, this.size, this.height);

    if(mouseX < this.x + this.size && mouseX > this.x){
      if (mouseY < this.y + this.height && mouseY > this.y){
        if (mouseMode === "normal"){
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
  
  update(){
    this.satisfaction = this.stationCount * 10;
    accessUpdate();
  }
}

function accessUpdate(){
  for (let i = 0; i < lines.length; i++){
    for (let j = 0; j < sectors.length; j++){
      for (let c = 0; c < sectors[j].length; c++){
        if (lines[i].startX < sectors[j][c].x + sectors[j][c].size && lines[i].startX > sectors[j][c].x){
          if (lines[i].startY < secctors[j][c].y + sectors[j][c].height && lines[i].startY > sectors[j][c].y){
            sectors[j][c] = lines[i]
          }
        }
      }
    }
  }
}

class Station {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.length = 10;
    this.height = 10;
  }

  display(){
    fill(0);
    rect(this.x, this.y, this.length, this.height);
  }
}

class Line {
  constructor(station1, station2){
    this.startX = station1.x + station1.length/2;
    this.startY = station1.y + station1.height/2;

    this.destX = station2.x + station2.length/2;
    this.destY = station2.y + station2.height/2;

    this.startSector;
    this.destSector;
  }
  display(){
    stroke('red');
    strokeWeight(4);
    line(this.startX, this.startY, this.destX, this.destY);
    stroke('black');
    strokeWeight(1);
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

function keyPressed(){
  if (key === 'm'){
    if (screenMode === "normal"){
      screenMode = "menu";
    }
    else if (screenMode === "menu"){
      screenMode = "normal";
      mouseMode = "normal";
    }
  }
}

function mouseClicked(){
  if (screenMode === "menu"){
    if (mouseX <= 380 && mouseX >= 340){
      if (mouseY <= 680 && mouseY >= 640){ 
        mouseMode = "station";
      }
    }

    if (mouseX <= 720 && mouseX >= 680){
      if (mouseY <= 680 && mouseY >= 640){
        mouseMode = "line";
      }
    }
  }

  if (mouseMode === "station"){
    if (mouseX > 0 && mouseX < gameWidth){
      if (mouseY > 0 && mouseY < gameHeight){
        if (money - 200 >= 0){
          newStation = new Station(mouseX, mouseY);
          stations.push(newStation);
          money -= 200;
          
          let aNewStation = stations.pop();
          for (let i = 0; i < sectors.length; i++){
            
            for (let j = 0; j < sectors[i].length; j++){   
              
              if (aNewStation.x > sectors[i][j].x && aNewStation.x < sectors[i][j].x + sectors[i][j].size){
                
                if (aNewStation.y > sectors[i][j].y && aNewStation.y < sectors[i][j].y + sectors[i][j].height){
                  sectors[i][j].stationCount += 1;
                  append(stations, aNewStation);
                  
                }
              }             
            }
          }
        }
      }
    }
  }
  else if (mouseMode === "line"){
    if (mouseX > 0 && mouseX < gameWidth){
      if (mouseY > 0 && mouseY < gameHeight){
        if (money - 50 >= 0){          
            for (let i = 0; i < stations.length; i++){
              if (mouseX < stations[i].x + stations[i].length){
                if (mouseX > stations[i].x){
                  if (mouseY < stations[i].y + stations[i].length){
                    if (mouseY > stations[i].y){
                      linepoints.push(stations[i]);
                    } 
                  }
                }
              }
            }
          }
        }
      }
    }
  }

function displayStations() {
  for (let i = 0; i < stations.length; i++){
    stations[i].display();
  }
}


function displayLines(){
  if (linepoints.length === 2){
    newLine = new Line(linepoints[0], linepoints[1]);
    lines.push(newLine);
    linepoints = [];
    money -= 50;
  }

  for (let i = 0; i < lines.length; i++){
    lines[i].display();
  }
}