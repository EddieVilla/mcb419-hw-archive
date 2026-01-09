class Bot {
  constructor() {
    this.reset();
  }

  reset() {
    // uncomment and replace with appropriate initial values 
    this.x = width - 50;
    this.y = height / 2;
    this.r = 20;
    this.heading = PI / 2;
    this.speed = 3;
    this.energy = 0; // NEW
  }

  update() {
    // add code so bot moves in a circle of diameter 300 pixels
    // do not use the 'itick' variable in your code
    this.heading += 0.02;
    this.x += this.speed * cos(this.heading);
    this.y += this.speed * sin(this.heading);
    this.consume(); // NEW
  }

  consume() { // NEW method
    for (let p of pellets) {
      if (dist(p.x, p.y, this.x, this.y) < this.r) {
        this.energy += 1.0;
        p.reset(); // reposition to new random location
      }
    }
  }

  draw() {
    // add code to draw the bot
    fill('yellow');
    stroke(0);
    ellipse(this.x, this.y, 2 * this.r);
    stroke(0);
    line(this.x, this.y,
      this.x + this.r * cos(this.heading),
      this.y + this.r * sin(this.heading));
  }
}