var canvas;
var backgroundImage, bgImg, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;

/*two car sprites for both the cars at the start() of Game.js and add respective images to it. And then
create an array of cars.*/

var allPlayers, car1, car2;
var cars = [];

/*We will use image() to show the terrain. The images of track and cars are preloaded.*/

function preload() {
  backgroundImage = loadImage("assets/background.png");
  car1_img = loadImage("assets/car1.png");
  car2_img = loadImage("assets/car2.png");
  track = loadImage("assets/track.jpg");
}
/* we are calling function  getState() to read the game state even before showing
the form to the users.
We are first calling getState(), and then start() which in
turn creates an object for the Form and Player class.*/

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);

  /*if conditions are given to update State to 1 when ‘playerCount’ = 2 and call the play() method when
‘gameState’ is 1.*/

  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
