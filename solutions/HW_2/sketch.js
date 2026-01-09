// HW02 solution 

var paused = false;
var itick; // simulation clock
var bot; // bot object
var pellets; // NEW

function setup() {
  createCanvas(400, 400).parent("#canvas");
  bot = new Bot();
  pellets = []; // NEW
  for (let i=0; i<100; i++) pellets[i] = new Pellet(); // NEW
  reset();
}

function draw() {
  if (!paused) update();
  
  // only drawing commands below this point
  background('lightBlue');  
  for (let p of pellets) p.draw(); // NEW
  bot.draw();
  fill(220);
  noStroke();
  rect(0, 0, 100, 40);
  fill(0);
  text('tick = ' + itick, 15, 15);
  text('energy = ' + bot.energy, 15, 30) // NEW
}

function reset() {
  stop();
  itick = 0;
  bot.reset();
  for (let p of pellets) p.reset(); // NEW
  draw();
}

function update() {
  itick++;
  bot.update();
}

function run() {
  paused = false;
  loop();
}

function stop() {
  paused = true;
  noLoop();
}