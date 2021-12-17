class Game {
  constructor() {}

 /* Here we are using .ref() to pass the location of the
‘gameState’ field of the database and using .on() we are
reading the value of the ‘gameState’ field and saving it to
the global variable gameState
Here instead of writing a separate function to read the
value, we continued writing in .on() itself. This allows us to
bind the function to read ‘gameState’ with getState() only*/


  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  /*update() method in Game.js to update gameState.*/
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }
  /*create the start() method, where we will create the car's sprites in game.js.
  We will create 2 cars using the createSprite() function from the p5.play library.
  We want the sprite to be close to the center of the screen
  in horizontal (x direction) so we are keeping the x position
  value as width/2 -50.
  In the y direction we will keep the car very close to the
  bottom of the screen hence we write height-100.
  We will not specify the width and height of the sprite in this
  function because we want to add the image to the sprite
  using the addImage() function.
  The sprite will take the size of the image, which is very large so we will scale the sprite down 
  using car1.scale() function.
  The same process we will follow to create the car2. In the
  end, we will create an array named cars and put car1*/
  
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  /*handleElements() function helps us to hide form once the game is in play mode.
So now create a method play() in Game.js.

We want to display terrain only once player’s information is received hence we will use if condition here.

We created play() method and inside this method, the first
thing we want to do is position the title image on the
canvas, which we will do using handleElements() function
after that we will get the players info from the database
and that we will do using Player.getPlayersInfo() function.
This function is defined in the Player.js file and it gets the
information of all the players from the database.
We write a condition if (allPlayers !==undefined)

When we defined the variable allPlayers we have not
assigned any value to it. This means at the start of the
code it will be undefined; it will only have the values received from the database.
If this condition is true then we will display the track image
on the canvas using the image() method.
While displaying the image we will keep the x position as 0
and y as (-height*5); this will create the track outside the
canvas, because we don't want to show the complete track
at once we will show the track as the player will move the car.
For the width of the track, set as width and for the height
keep it as height*6.
*/

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      drawSprites();
    }
  }
}
