class NavBarTab {
  constructor(n, x, y, w, h) {
    this.num = n;
    this.isActive = false;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.iconSize = h / 1.5;
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
    let c = 0;

    if (this.isActive == true) {
      c = 255;
      //　CHANGE THE ICON INSTEAD OF THE FILL COLOR
    }

    fill(255);

    rect(this.x, this.y, this.w, this.h);
    pop();

    push();
    fill(c, 0, 0);
    rectMode(CENTER);
    translate(this.x + this.w / 2, this.y + (this.h / 2));
    rect(0, 0, this.iconSize, this.iconSize);

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
