// HW01 solution
// you need to modify this code to create the bot and to call
// bot.reset(), bot.update(), and bot.draw() at appropriate places

var paused = false;
var itick; // simulation clock
var bot; // bot object

function setup() {
  createCanvas(400, 400).parent("#canvas");
  bot = new Bot(); // NEW
  reset();
}

function draw() {
  if (!paused) update();
  background('lightBlue');
  bot.draw();
  fill(0);
  text(itick, 15, 15);
}

function reset() {
  stop();
  itick = 0;
  bot.reset(); // NEW
  draw();
}

function update() {
  itick++;
  bot.update(); // NEW
}

function run() {
  paused = false;
  loop();
}

function stop() {
  paused = true;
  noLoop();
}