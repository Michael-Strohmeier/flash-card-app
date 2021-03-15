const ActiveTab = {
  LEARN: 0,
  SETTINGS: 1
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  app = new App(windowWidth, windowHeight);
}

function mousePressed() {
  app.checkNavbarClicked(mouseX, mouseY);
}

function draw() {
  background(255);
  app.draw();
}





class NavBarTab {
  constructor(n, x, y, w, h) {
    this.num = n;
    this.isActive = false;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  setActive() {
    this.isActive = true;
  }
  
  checkActive() {
    if (this.isActive) {
      return this.num;
    } else {
      return -1;
    }
  }
  
  clicked(x) {
    if (this.x < x && x < this.x + this.w) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }
  
  draw() {
    push();
    //noStroke();
    let c = 255;
    
    if (this.isActive == true) {
      c = 0;
    }
    
    fill(c , 0, 0);
    
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

class NavBar {
  constructor(w, h) {
    this.activeTab = ActiveTab.LEARNING;
    
    this.numTabs = 2;
    this.navBarWidth = w;
    this.tabHeight = h / 10;
    this.tabWidth = w / this.numTabs;
    this.tabY = h - this.tabHeight;
    this.tabs = [];
    
    this.setup();
  }
  
  getActiveTab() {
    return this.activeTab;
  }
  
  update(x) {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].clicked(x);
    }
    
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].checkActive() != -1) {
        this.activeTab = this.tabs[i].checkActive();
      }
    }
  }
  
  setup() {
    this.tabs.push(new NavBarTab(ActiveTab.LEARNING, this.tabWidth * 0, this.tabY, this.tabWidth, this.tabHeight));
    this.tabs.push(new NavBarTab(ActiveTab.SETTINGS, this.tabWidth * 1, this.tabY, this.tabWidth, this.tabHeight));
    
    // not working
    this.tabs[0].setActive();
  }
  
  draw() {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].draw();
    }
  }
}

class App {
  constructor(w, h) {
    this.navBar = new NavBar(w, h);
    
    
  }
  
  checkNavbarClicked(x, y) {
    // make a getter for navbar.tabY
    if (this.navBar.tabY < y) {
      // navbar was clicked
      this.navBar.update(x);
    }
  }
  
  draw() {
    background(220);
    
    if (this.navBar.getActiveTab() == ActiveTab.LEARNING) {
      background(0, 0, 255);
    } else {
      background(0, 255, 255);
    }
    
    this.navBar.draw();

  }
} 
