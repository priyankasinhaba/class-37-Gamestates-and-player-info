class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
  }

  setElementsPosition() {
    this.titleImg.position(120, 50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `
      Hello ${this.input.value()}
      </br>wait for another player to join...`;
      this.greeting.html(message);

      /*We need to modify handleMousePressed() in form.js. 
      An object of the player class shall call an 
      addPlayer() method to add information in the database and an updateCount() 
      to increase the ‘playerCount’ field in the database.

We will increase the ‘playerCount’; initially, the
‘playerCount’ is 0 as we kept it 0 in the database. When
the first player joins, it will be increased to 1, and when the
second player joins, it will increment to 2. We need to
update the count to the database simultaneously, hence
we are calling player.updateCount(playerCount).
this.input.value() method is used to read the user input in
the game name of the player.
The player’s name will be assigned to the property
player.name.
Then we assign the playerCount to player.index which is
used as a unique id for the players. So player.index will
be 1 for the first player and 2 for the second player. This
player.index property will be very useful once the race
starts.
Lastly, we call addPlayer(). This method will store all the data in the database.
*/

      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
    });
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
