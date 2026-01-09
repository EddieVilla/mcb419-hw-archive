// HW04 template - kinesis 

var paused = false;
var itick; // simulation clock
var world; // the environment (provides temperature info)

var bots = []; // bots array
var NBOTS = 100;

function setup() {
  createCanvas(400, 300).parent("#canvas");
  world = new World();
  for (let i = 0; i < NBOTS; i++) bots.push(new Bot());
  reset();
}

function draw() {

  // update (with warp speed and termination check)
  let count = select("#warp").checked() ? 20 : 1;
  if (!paused) {
    for (let i = 0; i < count; i++) {
      update();
      if (itick >= 2000) {
        stop();
        break;
      }
    }
  }

  // drawing commands below this point
  world.display();
  for (let b of bots) b.draw();

  // text display
  noStroke();
  fill(220, 200);
  rect(0, 0, width, 18);
  textSize(15);
  fill(0);
  textAlign('left');
  text(itick, 5, 15);
  textAlign('center');
  let tdata = [];
  for (let b of bots) tdata.push(b.tsense);
  let stats = calcStats(tdata);
  text('mean Temp = ' + nfc(stats.mean, 2), width / 2, 15);
  textAlign('right');
  text(select("#controller").value(), width - 5, 15);
}

function reset() {
  stop();
  itick = 0;
  tdata = [];
  for (let b of bots) b.reset();
  draw();
}

function update() {
  itick++;
  for (let b of bots) b.update();
}

function run() {
  paused = false;
  loop();
}

function stop() {
  paused = true;
  noLoop();
}

function calcStats(adata) {
  // return the mean and standard deviation of data in an array (adata)
  // the return value should be a javascript object with properties mean and std
  // Example:
  //   if you call stats = calcStats([0, 1, 2])
  //   then stats.mean should be 1
  //   and stats.std should be 1
  // 
  var mean = 0;
  var std = 0;

  // your calculation here
  for (let i = 0; i < adata.length; i++) mean += adata[i];
  mean /= adata.length;

  for (let i = 0; i < adata.length; i++) std += sq(adata[i] - mean);
  std = sqrt(std / (adata.length - 1));

  return {
    mean,
    std
  }
}