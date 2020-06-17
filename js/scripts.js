//Business logic
function displayDiceRoll(roll) {  // this shows the image of the dice
  let dice = [
    "<i class=\"fas fa-dice-one\"></i>", // this is face 1
    "<i class=\"fas fa-dice-two\"></i>", // this is face 2
    "<i class=\"fas fa-dice-three\"></i>", // this is face 3
    "<i class=\"fas fa-dice-four\"></i>", // etc.
    "<i class=\"fas fa-dice-five\"></i>",
    "<i class=\"fas fa-dice-six\"></i>",
  ];
  $("#dice-container").html(dice[roll - 1]).effect("shake", {times:2,distance:10}); // this has a shake effect on the dice
}

function Player(score){ //Constructor: property is the score
  this.score = score
}

function Game(turn, turnTotal, player1, player2, winner) { //Cnstructor for the game, holds value for who's (player1 = 1, player2 = 2)turn it is, 
  this.turn = turn,                                       // the total amount scored in that turn, if it is player1 or player2
  this.turnTotal = turnTotal,                            // and the value of the winner
  this.player1 = player1,
  this.player2 = player2,
  this.winner = winner
}

Game.prototype.addToTurnTotal = function(roll) { // this prototype adds each value from the rolled dice to the turnTotal
  this.turnTotal += roll;
}

Game.prototype.addTurnTotalToScore = function() { // this prototype adds the amount in the turnTotal to the players score who was rolling
  if(this.turn === 1) { // if it is this player's turn (1 refers to player1) then add the turnTotal to player1's score
    this.player1.score += this.turnTotal;
  } else { // otherwise...
    this.player2.score += this.turnTotal; // add the turnTotal to player2's score
  }
}

Game.prototype.switchTurn = function() { // this prototype switches from player1 back to player2
  this.turnTotal = 0; // sets turnTotal back to zero for next player
  if (this.turn === 1) { // if it is player1's turn...
    this.turn = 2; // then switch from player1 to player 2
    computerPlayer(this); // ignore
  } else { // otherwise...
    this.turn = 1; // switch to player1 from player2
  }
}

Game.prototype.checkWinner = function () { // this prototype checks to see if either player has won
  if (this.player1.score >= 100){ // if player1 score is greater than or equal to 100...
    this.winner = 1; // then player1 is the winner
  } else if (this.player2.score >= 100) { // otherwise if player2 score is greater than or equal to 100...
    this.winner = 2; // then player2 is the winner
  }
}

function rollDice() { // this is a function that returns the value of the dice roll
  return 1 + Math.floor(Math.random() * 6); // math.random gives number of range from/including zero to/not including 1
}                                     // multiply that by 6 for each value of dice, math.floor rounds that value down, then we add 1 to account for possible zero

//UI Logic
function enableRoll() { // this allows the player to hit the roll button
  $(".roll-control").prop("disabled", false); // the rollcontrol class is not disabled
}

function displayScores(game) { // this controls the display for the score boxes as well as the turnTotal
  $("#player1-score").text(game.player1.score) //score display for player1
  $("#player2-score").text(game.player2.score) //score display for player2
  $("#turn-total").text(game.turnTotal) //turnTotal display 
}

function displayTurn(turn) { // this function adds a bold border to whichever player's turn it is
  if (turn === 1) { // if it is player1's turn... 
    $("#player1-section").addClass("player1-active"); // create color border around player1
    $("#player2-section").removeClass("player2-active"); // remove color border around player2
  } else { //otherwise, if it is player2's turn...
    $("#player2-section").addClass("player2-active") // add color border around player2
    $("#player1-section").removeClass("player1-active") // remove color border around player1
  }
}

function displayWinner(winner) { // displays the winner of the game who reached 100 first
  if (winner === 1) { // if the winner is player1... then append the below <h4> tag that says winner winner chicken dinner
    $(".player1-score-title").append("<h4 class=\"card-title text-danger delete\">Winner winner chicken dinner</h4>");
    $(".roll-control").prop("disabled", true); // this disables the roll button so players cannot keep rolling
  } else if (winner === 2) { // if the winner is player2... then append the below <h4> tag that says winner winner chicken dinner
    $(".player2-score-title").append("<h4 class=\"card-title text-info delete\">Winner winner chicken dinner</h4>");
    $(".roll-control").prop("disabled", true); // this disables the roll button so players cannot keep rolling
  }
}

function resetPage() { // function that gets rid of the winner winner chicken dinner in displayWinner function
  $(".delete").remove();// removes the delete class added in lines 87 and 90
}

function resetScores(game) { // this resets the score for every new game
  game.player1.score = 0; // this sets player1 score back to zero
  game.player2.score = 0; // this sets player2 score back to zero
  game.turn = 1; // this sets turn back to player1 (player1 always starts)
  game.turnTotal = 0; // this sets the turnTotal back to zer
  game.winner = 0; // this resets the winner so winner is not declared player1 or player2
}

function computerPlayer(game) { // This is all to do with AI
  let roboClick = setInterval(function () { // set interval causes function to repeat at a given interval
    if (100 - game.player2.score >= 20) { // beginning of logic of whether to roll or hold
      if (game.turnTotal < 20) { // logic for if turnTotal for compplayer is less than 20...
        $("#roll-button").click(); // then the computer continues to roll
      } else if (game.turnTotal >= 20) { // otherwise, if turnTotal is 20 or more...
        $("#hold-button").click();// then computer clicks hold
      }
    } else {
      if (game.turnTotal < 100 - game.player2.score){ // if difference between 100 and current score is less than 20...
        $("#roll-button").click();// then click roll
      } else if (game.turnTotal >= 100 - game.player2.score){// if turntotal is less than the difference then roll ...
        $("#hold-button").click(); // otherwise hold
      }
    }
    if (game.turn === 1 || game.turn === 0) { // if it is player1's turn or the end of the game...
      clearInterval(roboClick);// then stop clicking
    }
  }, 500);// the amount of time the interval is set to (half a second)
}

$(document).ready(function(){
  let player1 = new Player(0); // this sets player1 score to zero
  let player2 = new Player(0); // this sets player2 score to zero
  let game = new Game(1, 0, player1, player2, 0); // this creates an object called game with all the properties declared from our Game constructor
  $("#start-button").click(function() { // when start button is clicked
    resetPage();
    resetScores(game);
    displayScores(game);
    displayTurn(game.turn);
    enableRoll();
  });
  $("#roll-button").click(function() {
    let roll = rollDice();
    displayDiceRoll(roll);
    if (roll === 1) {
      game.switchTurn();
      displayTurn(game.turn);
      displayScores(game);
    } else {
      game.addToTurnTotal(roll);
      displayScores(game);
    }
  });
  $("#hold-button").click(function() {
    game.addTurnTotalToScore();
    game.checkWinner();
    displayScores(game);
    if (game.winner === 0) {
      game.switchTurn();
      displayTurn(game.turn);
      displayScores(game);
    } else {
      displayWinner(game.winner);
      game.turn = 0;
    }
  });
});