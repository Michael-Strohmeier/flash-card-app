function setup() {
	createCanvas(windowWidth, windowHeight);
	canvas = new Canvas();
}

function mousePressed() {
	canvas.drawStart(mouseX, mouseY);
}

function mouseReleased() {
	canvas.drawEnd();
}

function draw() {
	canvas.drawUpdate(mouseX, mouseY);
	canvas.draw();
}

class Canvas {
	constructor() {
		this.isDrawing = false;
		this.currentPath = [];
		this.paths = [];

		this.x = 0;
		this.y = 0;
	}

	drawStart(x, y) {
		this.isDrawing = true;
		this.currentPath = [];
		this.x = x;
		this.y = y;
		this.paths.push(this.currentPath);
	}

	drawUpdate(x, y) {
		if (this.isDrawing) {
	    let point = {
	      x1: this.x,
	      y1: this.y,
	      x2: x,
	      y2: y
	    }
	    this.currentPath.push(point);
	    this.x = mouseX;
	    this.y = mouseY;
	  }
	}

	drawEnd() {
		this.isDrawing = false;
  	this.paths.push(this.currentPath);
	}

	draw() {
		for (let i = 0; i < this.paths.length; i++) {
	    let path = this.paths[i];
	    if (this.paths[i].length != 0) {
	      for (let j = 0; j < path.length; j++) {
	        strokeWeight(12);
	        stroke(0);
	        strokeCap(ROUND);
	        strokeJoin(ROUND);
	        line(path[j].x1, path[j].y1, path[j].x2, path[j].y2);
	      }
	    }
  	}


	}
}
