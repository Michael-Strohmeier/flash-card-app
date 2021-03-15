let romajiTable = [['a', 'あ', 'ア'], ['i', 'い', 'イ'], ['u', 'う', 'ウ'], ['e', 'え', 'エ'], ['o', 'お', 'オ'], ['ka', 'か', 'カ'], ['ki', 'き', 'キ'], ['ku', 'く', 'ク'], ['ke', 'け', 'ケ'], ['ko', 'こ', 'コ'], ['sa', 'さ', 'サ'], ['shi', 'し', 'シ'], ['su', 'す', 'ス'], ['se', 'せ', 'セ'], ['so', 'そ', 'ソ'], ['ta', 'た', 'タ'], ['chi', 'ち', 'チ'], ['tsu', 'つ', 'ツ'], ['te', 'て', 'テ'], ['to', 'と', 'ト'], ['na', 'な', 'ナ'], ['ni', 'に', 'ニ'], ['nu', 'ぬ', 'ヌ'], ['ne', 'ね', 'ネ'], ['no', 'の', 'ノ'], ['ha', 'は', 'ハ'], ['hi', 'ひ', 'ヒ'], ['fu', 'ふ', 'フ'], ['he', 'へ', 'ヘ'], ['ho', 'ほ', 'ホ'], ['ma', 'ま', 'マ'], ['mi', 'み', 'ミ'], ['mu', 'む', 'ム'], ['me', 'め', 'メ'], ['mo', 'も', 'モ'], ['ya', 'や', 'ヤ'], ['yu', 'ゆ', 'ユ'], ['yo', 'よ', 'ヨ'], ['ra', 'ら', 'ラ'], ['ri', 'り', 'リ'], ['ru', 'る', 'ル'], ['re', 'れ', 'レ'], ['ro', 'ろ', 'ロ'], ['wa', 'わ', 'ワ'], ['wo', 'を', 'ヲ'], ['n', 'ん', 'ン'], ['ga', 'が', 'ガ'], ['gi', 'ぎ', 'ギ'], ['gu', 'ぐ', 'グ'], ['ge', 'げ', 'ゲ'], ['go', 'ご', 'ゴ'], ['za', 'ざ', 'ザ'], ['ji', 'じ', 'ジ'], ['zu', 'ず', 'ズ'], ['ze', 'ぜ', 'ゼ'], ['zo', 'ぞ', 'ゾ'], ['da', 'だ', 'ダ'], ['di', 'ぢ', 'ヂ'], ['du', 'づ', 'ヅ'], ['de', 'で', 'デ'], ['do', 'ど', 'ド'], ['ba', 'ば', 'バ'], ['bi', 'び', 'ビ'], ['bu', 'ぶ', 'ブ'], ['be', 'べ', 'ベ'], ['bo', 'ぼ', 'ボ'], ['pa', 'ぱ', 'パ'], ['pi', 'ぴ', 'ピ'], ['pu', 'ぷ', 'プ'], ['pe', 'ぺ', 'ペ'], ['po', 'ぽ', 'ポ']]


const ActiveTab = {
  LEARN: 0,
  SETTINGS: 1
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  app = new App(windowWidth, windowHeight);
}

function mousePressed() {
  if (!app.checkNavbarClicked(mouseX, mouseY)) {
    
  }
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

class App {
  constructor(w, h) {
    this.navBar = new NavBar(w, h);
    this.kana = new Kana(w, h);
    
  }
  
  checkNavbarClicked(x, y) {
    // make a getter for navbar.tabY
    if (this.navBar.tabY < y) {
      // navbar was clicked
      this.navBar.update(x);
    } else if (this.navBar.getActiveTab() == ActiveTab.LEARNING) {
      this.kana.update();
    }
  }
  
  draw() {
    background(255);
    
    if (this.navBar.getActiveTab() == ActiveTab.LEARNING) {
      background(this.kana.getColor());
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
    
    this.navBar.draw();

  }
} 


class Kana {
  constructor(w, h) {
    this.currentIndex = Math.floor(Math.random() * romajiTable.length);
    this.w = w;
    this.h = h;
    
    this.textSize = this.w / 10;
    
    this.blue = color(66, 133, 244, 200);
    this.red = color(219, 68, 55, 200);
    this.yellow = color(244, 180, 0, 200);
    this.green = color(15, 157, 88, 200);
    this.purple = color(107, 48, 150, 200);
    this.pink = color(255,105,180);
  }
  
  update() {
    this.currentIndex = Math.floor(Math.random() * romajiTable.length);
  }
  
  getColor() {
    let w = romajiTable[this.currentIndex][0]
    if (w.includes("a")) {
      return this.blue;
    } else if (w.includes("i")) {
      return this.red;
    } else if (w.includes("u")) {
      return this.yellow;
    } else if (w.includes("e")) {
      return this.green;
    } else if (w.includes("o")) {
      return this.purple;
    } else {
      return this.pink;
    }
    
  }
  
  draw() {
    textFont('georgia');

    push();
    translate(this.w / 2, this.h / 2.2);

    textAlign(CENTER, CENTER);
    fill(255);
    textSize(this.textSize * 2.5);
    text(romajiTable[this.currentIndex][1], 0, 0);
    pop();
    
    push();

    translate(this.w / 2, this.h / 1.7);
    rectMode(CENTER);
    fill(255);

    //rect(0, 0, this.textSize * 2, this.textSize * 1.3, 10);
    
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    text(romajiTable[this.currentIndex][0], 0, 0);
    
    pop();
  }
}
