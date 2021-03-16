class Kana {
  constructor(w, h) {
    this.currentIndex = Math.floor(Math.random() * romajiTable.length);
    this.w = w;
    this.h = h;

    this.textSize = this.h / 5;

    this.blue = color(66, 133, 244, 200);
    this.red = color(219, 68, 55, 200);
    this.yellow = color(244, 180, 0, 200);
    this.green = color(15, 157, 88, 200);
    this.purple = color(107, 48, 150, 200);
    this.pink = color(255, 105, 180);

    this.color = this.pink;
    this.setColor();
  }

  update() {
    this.currentIndex = Math.floor(Math.random() * romajiTable.length);
    this.setColor();
  }

  setColor() {
    let w = romajiTable[this.currentIndex][0]
    if (w.includes("a")) {
      this.color = this.blue;
    } else if (w.includes("i")) {
      this.color =  this.red;
    } else if (w.includes("u")) {
      this.color =  this.yellow;
    } else if (w.includes("e")) {
      this.color =  this.green;
    } else if (w.includes("o")) {
      this.color =  this.purple;
    } else {
      this.color =  this.pink;
    }

  }

  draw() {


    push();
    translate(this.w / 2, this.h / 2.2);

    textFont('georgia');
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    strokeWeight(0);

    this.color.setAlpha(40);
    fill(this.color);
    rect(0, -this.textSize / 10, this.textSize * 1.5, this.textSize * 1.5, 20);

    this.color.setAlpha(200);
    fill(this.color);
    text(romajiTable[this.currentIndex][1], 0, 0);
    pop();

    push();
    // romaji box
    translate(this.w / 2, this.h / 2.2 + this.textSize);

    textFont('georgia');
    textSize(this.textSize / 3);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    strokeWeight(0);

    this.color.setAlpha(40);
    fill(this.color);
    rect(0, -this.textSize / 10 / 6, this.textSize * 1.5 / 2.3, this.textSize * 1.5 / 3, 20);

    this.color.setAlpha(200);
    fill(this.color);
    text(romajiTable[this.currentIndex][0], 0, 0);
    pop();
  }
}
