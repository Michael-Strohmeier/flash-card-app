class App {
  constructor(w, h) {
    this.navbar = new NavBar(w, h);
    this.kana = new Kana(w, h);

  }

  checkNavbarClicked(x, y) {
    // make a getter for navbar.tabY
    if (this.navbar.tabY < y) {
      // navbar was clicked
      this.navbar.update(x);
    } else if (this.navbar.getActiveTab() == ActiveTab.LEARNING) {
      this.kana.update();
    }
  }

  draw() {
    background(255);

    if (this.navbar.getActiveTab() == ActiveTab.LEARNING) {
      background(255);
      this.kana.draw();
    } else {
      background(255, 255, 255);

      // bring up setting interface and change state/activeTab
      push();
      translate(windowWidth / 2, windowHeight / 2);
      textAlign(CENTER, CENTER);
      textSize(100);
      text("settings", 0, 0);
      pop();
    }

    // drawing the navbar
    // this.navbar.draw();

  }
}
