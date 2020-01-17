//Cs30 major project
//Railway Builder
//Ben Jorgenson
//January 17th, 2020
//Mr Schellenberg
//
//Beta test results:
//I beta tested this with my brother. He said that the secotr system was impressive but the game itself was too hard
//because you only gained several money after every update
//
//Reflection:
//-






let city;
let gameWidth = 1500;
let gameHeight = 600;
let names = ["Barkingside", "Fleetwood", "Milton Park","The Gulch", "Morego", "North East", "Smithford", "Moffat City", "Airport", "South Pinskill", "Pinskill Loop", "Engelstown", "Ballantyne", "Old Market", "Calles leones", "Manning District", "Central City", "Avonhurst", "Arnhem Plaza", "West Downtown", "Entertainment District", "Pontosa Street", "Stadium", "East Industrial", "Denham River", "Hogsmeade", "West Industrial", "Tigpan Park", "Melrose Hills", "Metrocity"];
let sectors = [];
let cellWidth = 150;
let cellHeight = 200;
let mouseMode = "normal";
let screenMode = "normal";
let money = 500;
let stations = [];
let lines = [];
let linepoints = [];
let newLine = false;
let t;
let t2;
let sectorChange = [-1, 0, 1, 2];
let totalSatisfaction = 0;
let mode;
let backR = 0;
let backRchange = 1;
let backG = 100;
let backGchange = 1;
let backB = 255;
let backBchange = -1;
let bronzeBadge = false;
let silverBadge = false;
let goldBadge = false;

function preload(){
  city = loadImage('assets/city.jpg');
  train = loadImage('assets/train.png');
  rail = loadImage('assets/rail.jpg');
  bronze = loadImage('assets/bronze.png');
  silver = loadImage('assets/silver.png');
  gold = loadImage('assets/gold.png');
  Myfont = loadFont('assets/font.ttf');
  traingif1 = createImg('assets/train1.gif');
  traingif2 = createImg('assets/train2.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  makeGrid();
  mode = 'start';
}

function draw() {
  if (mode === 'play'){
    background(255);
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
      image(rail, 680, 640, 40, 40);
      textSize(20);
      text("New Line(50 money)", 640, 720);
      rectMode(CORNER);

      textSize(40);
      fill('black');
      text("Money: " + money , 850, 710);

      text("Satisfaction: " + Math.round(totalSatisfaction), 1200, 710);
    }
    else if (screenMode === 'badges'){
      fill(20, 60, 200, 100);
      rect(0, gameHeight, width, height - gameHeight);

      if (bronzeBadge === true){
        fill('grey');
        image(bronze, width/2 - 200, gameHeight, 50, 80);
      }

      if (silverBadge === true){
        fill('grey');
        image(silver, width/2, gameHeight, 50, 80);
      }

      if (goldBadge === true){
        fill('grey');
        image(gold, width/2 + 200, gameHeight, 50, 80);
      }
    }

    else{
      fill('green');
      textSize(50);
      textFont('Helvetica');
      text("Railway Builder", 700, 660);
      textSize(20);
      text("Press M for menu", 1100, 660);
      image(train, 150, 600, 500, 150);
    }
    sectorUpdate();
    lineUpdate();
  }

  else if (mode === 'start'){
    background(backR, backG, backB);
    backR += backRchange;
    backG += backGchange;
    backB += backBchange;

    if (backR <= 0 || backR >= 255){
      backRchange = backRchange * -1;
    }
    if (backG <= 0 || backG >= 255){
      backGchange = backGchange * -1;
    }
    if (backB <= 0 || backB >= 255){
      backBchange = backBchange * -1;
    }

    fill("red");
    textSize(150);
    textFont(Myfont);
    text("Railway Builder", width/2 - 400, height/2 - 200);

    fill('grey');
    rect(width/2 - 150, height/2 - 100, 300, 100);
    fill("black");
    textFont("Arial");
    textSize(80);
    text("Play", width/2 - 100, height/2 - 25);

    fill('grey');
    rect(width/2 - 150, height/2 + 100, 300, 100);
    fill('black');
    text("Rules", width/2 - 100, height/2 + 175);

    traingif1.position(200, 200);
    traingif2.position(1000, 200);
  }

  else if (mode === 'rules'){
    background('red');

    textSize(20);
    fill('black')
    text("The goal of this game is to build your railway in the most efficeint way possible, to generate the most satisfaction. Bring up the menu to place stations and lines between them." , 0, 200);
    text("Click the station icon and then click in a spot where you want to place one to build it. To place a line, click the icon and then click the 2 stations that you would like to build it between", 0, 250);
    text("Keep in mind the different areas have different levels of demand, and your level of income depends on how many people(and areas) are satisfied.", 0, 300);
    text("Lines deteriorate over time, and you will notice them getting yellow and eventually red. Eventually they will cease to operate", 0, 350);
    text("To repair a line, click the two stations it connects as you would when placing down the line the first time", 0, 400);
    text("Pay attention to the general satisfaction statistic beside the money in the menu. If it continues to increase this means you are probably doing a good job", 0, 450);

    fill('grey');
    rect(600, 550, 300, 100);
    textSize(50);
    fill("black");
    text("Begin!", 675, 615);
  }

  if (mode !== "start"){
    removeElements();
  }

  if (totalSatisfaction >= 5 && bronzeBadge === false){
    bronzeBadge = true;
  }

  if (totalSatisfaction >= 10 && silverBadge === false){
    silverBadge = true;
  }

  if (totalSatisfaction >= 20 && goldBadge === false){
    goldBadge = true;
  }
}

function lineUpdate(){
  if (millis() - t2 >= 10000){
    console.log("godo");
    for (let i = 0; i < lines.length; i++){
      lines[i].update();
      if (lines[i].health <= 0){
        for (let c = 0; c < sectors.length; c++){
          for (let j = 0; j < sectors[c].length; j++){
            if (lines[i].startX < sectors[c][j].x + sectors[c][j].size && lines[i].startX > sectors[c][j].x){
              if (lines[i].startY < sectors[c][j].y + sectors[c][j].height && lines[i].startY > sectors[c][j].y){            
                sectors[c][j].lineCount--;
              }
            }
          } 
        }

        for (let c = 0; c < sectors.length; c++){
          for (let j = 0; j < sectors[c].length; j++){
            if (lines[i].destX < sectors[c][j].x + sectors[c][j].size && lines[i].destX > sectors[c][j].x){
              if (lines[i].destY < sectors[c][j].y + sectors[c][j].height && lines[i].destY > sectors[c][j].y){            
                sectors[c][j].lineCount--;
              }
            }
          } 
        }
        lines.splice(lines[i]);
      }
    }
    t2 = millis();
  }
}


function sectorUpdate(){
  if (millis() - t >= 10000){
    let satArray = [];
    for (let i = 0; i < sectors.length; i++){
      for (let j = 0; j < sectors[i].length; j++){
        sectors[i][j].update();
        satArray.push(sectors[i][j].totalSat);
      }
    }
    for (let i = 0; i < satArray.length; i++){
      totalSatisfaction += satArray[i];
    }
    totalSatisfaction = totalSatisfaction/(satArray.length/2);
    t = millis();
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
    this.lines = [];
    this.lineCount = 0;
    this.stationCount = 0;
    this.satisfaction = this.stationCount * 10;
    this.profit;
    this.totalSat = 0;
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
          text(this.name, mouseX + 10, mouseY + 20);
          textSize(20);
          text("Demand: " + Math.round(this.demand), mouseX + 10, mouseY + 50);
          text("Satsifaction: " + this.satisfaction, mouseX + 10, mouseY + 70);
        }
      }
    }
  }
  update(){
    this.satisfaction = this.stationCount * 10 + this.lineCount * 5;
    this.demand += random(sectorChange);

    if (this.demand - this.satisfaction >= 20){
      if (this. demand < 10){
        this.profit = 1;
      }
      else if (this.demand < 30 && this.demand >= 10){
        this.profit = 1;
      }
      else if (this.demand < 50 && this.demand >= 30){
        this.profit = 1;
      }
      else if (this.demand < 70 && this.demand >= 50){
        this.profit = 1;
      }
      else if (this.demand < 90 && this.demand >= 70){
        this.profit = 1;
      }
      else {
        this.profit = 0;
      }
    }
    else if (this.demand - this.satisfaction < 20 && this.demand - this.satisfaction >= 10){
      if (this. demand < 10){
        this.profit = 0;
      }
      else if (this.demand < 30 && this.demand >= 10){
        this.profit = 1;
      }
      else if (this.demand < 50 && this.demand >= 30){
        this.profit = 2;
      }
      else if (this.demand < 70 && this.demand >= 50){
        this.profit = 3;
      }
      else if (this.demand < 90 && this.demand >= 70){
        this.profit = 4;
      }
      else {
        this.profit = 5;
      }
    }
    else if (this.demand - this.satisfaction < 10 && this.demand - this.satisfaction >= 0){
      if (this. demand < 10){
        this.profit = 0;
      }
      else if (this.demand < 30 && this.demand >= 10){
        this.profit = 2;
      }
      else if (this.demand < 50 && this.demand >= 30){
        this.profit = 3;
      }
      else if (this.demand < 70 && this.demand >= 50){
        this.profit = 4;
      }
      else if (this.demand < 90 && this.demand >= 70){
        this.profit = 5;
      }
      else {
        this.profit = 6;
      }
    }
    else {
      this.profit = this.demand;
    }

    this.totalSat = this.satisfaction - this.demand;
    if (this.totalSat < 0){
      this.totalSat = 0;
    }

    money += Math.round(this.profit);
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

    this.health = 100;
    this.colour = "green";
  }

  display(){
    stroke(this.colour);
    strokeWeight(4);
    line(this.startX, this.startY, this.destX, this.destY);
    stroke('black');
    strokeWeight(1);
  }

  update(){
    this.health -= 1;
    if (this.health > 60 && this.health <= 100){
      this.colour = "green";
    }
    else if (this.health > 40 && this.health <= 60){
      this.colour = "yellow";
    }
    else {
      this.colour = "red";
    }
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

  else if (key === 'b'){
    if (screenMode !== 'badges'){
      screenMode = 'badges';
      mouseMode = 'normal';
    }
    else {
      screenMode = 'normal';
    }
  }
}

function mouseClicked(){
  console.log(mouseX, mouseY);
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
  
  if (mode === "start"){
    if (mouseX >= width/2 - 150 && mouseX <= width/2 - 150 + 300){
      if (mouseY <= height/2 && mouseY >= height/2 - 100){
        mode = 'play';
        t = millis();
        t2 = millis();
      }
    }

    if (mouseX >= width/2 - 150 && mouseX <= width/2 - 150 + 300){
      console.log('a')
      if (mouseY <= height/2 + 200 && mouseY >= height/2 + 100){
        mode = 'rules';
      }
    }
  }

  else if (mode === "rules"){
    if (mouseX >= 600 && mouseX <= 900){
      if (mouseY >= 550 && mouseY <= 650){
        mode = 'play';
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
  if (linepoints.length >= 2){
    if (linepoints[0].x !== linepoints[1].x && linepoints[0].y !== linepoints[1].y){
      anewLine = new Line(linepoints[0], linepoints[1]);
      lines.push(anewLine);
      newLine = true;
      linepoints = [];
      money -= 50;

      for (let c = 0; c < sectors.length; c++){
        for (let j = 0; j < sectors[c].length; j++){
          if (anewLine.startX < sectors[c][j].x + sectors[c][j].size && anewLine.startX > sectors[c][j].x){
            console.log(1);
            if (anewLine.startY < sectors[c][j].y + sectors[c][j].height && anewLine.startY > sectors[c][j].y){   
              console.log(2);         
              sectors[c][j].lineCount++;
            }
          }
          if (anewLine.destX < sectors[c][j].x + sectors[c][j].size && anewLine.destX > sectors[c][j].x){
            if (anewLine.destY < sectors[c][j].y + sectors[c][j].height && anewLine.destY > sectors[c][j].y){
              sectors[c][j].lineCount++;
            }
          }                     
        }
      }
    }
  }

  for (let i = 0; i < lines.length; i++){
    lines[i].display();
  }
}