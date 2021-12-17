/*add player’s information to the database.
Properties are created to save:
this.name - to save the name of the player
this.index - to give a unique id to each player,
this.positionX & this.positionY - to store the x & y position of each player.*/


class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
  }

 /* We have two players in the game; we want the first player
to stay on the left side of the screen and the 2nd to be
placed on the right side of the screen before the race
starts so let's give them the x & y position accordingly.
Now we will add all properties of players in the database.
We will also create a player’s field on a real-time basis.
We can do this using string concatenation.
If the ‘playerCount’ is 1, we create a database entry for
player1 and we set the name for it, and so on.
→ First we use .ref() to give a location in the database.
--> databaseReference.set() will create and save the
database reference.*/

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

 /* We can also see two more methods in player.js.
getCount() & updateCount().

We have created these methods to update the field
‘playerCount’ in the database, which we created in the
last class, and also read the number of the ‘playerCount’
from the database and save it in the Global variable to use
in the code.
In order to read or write in the database, we use
.ref() - to give the location of the field in the database.
Then we use:
.on() - to keep listening to the changes that happen in the
‘playerCount’ field of the database.
.val() - to copy the value from the database to the global
variable of the code.
.update - to store value from global variable to the
database field ‘playerCount’.
“/” is used on updateCount to refer to the root directory.
*/


  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

 /* We need to fetch player’s details from the database.
Let's write a function to get all the players' info. This
function will not be attached to any particular player. We
can declare it as a static function. Static functions are not
attached to each object of the class.
We are trying to get all the players’ info here - the work doesn’t involve any particular object.*/

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
}
