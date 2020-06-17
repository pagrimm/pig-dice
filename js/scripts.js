function displayDiceRoll(roll) {
  let dice = [
    "<i class=\"fas fa-dice-one\"></i>",
    "<i class=\"fas fa-dice-two\"></i>",
    "<i class=\"fas fa-dice-three\"></i>",
    "<i class=\"fas fa-dice-four\"></i>",
    "<i class=\"fas fa-dice-five\"></i>",
    "<i class=\"fas fa-dice-six\"></i>",
  ];
  $("#dice-container").html(dice[roll - 1]).effect("shake", {times:2,distance:10});
}

function Player(score){
  this.score = score;
}

function Game(turn, turnTotal, player1, player2) {
  this.turn = turn;
  this.turnTotal = turnTotal;
  this.player1 = player1;
  this.player2 = player2;
}

Game.prototype.addToTurnTotal = function(roll) {
  this.turnTotal += roll;
}

Game.prototype.addTurnTotalToScore = function() {
  if(this.turn === 1) {
    player1.score += this.turnTotal;
  } else {
    player2.score += this.turnTotal;
  }
}

Game.prototype.switchTurn = function() {
  if (this.turn === 1) {
    this.turn = 2;
  } else {
    this.turn = 1;
  }
}

function rollDice() {
  let roll = Math.ceil(Math.random() * 6);
  if (roll === 0) {
    roll = 1;
  }
  return roll;
}


$(document).ready(function(){
  $("#start-button").click(function() {
    let player1 = new Player(0);
    let player2 = new Player(0);
    let game = new Game(1, 0, player1, player2);
    $("#roll-button").click(function() {
      let roll = rollDice();
      if (roll === 1) {
        game.switchTurn();
        game.turnTotal = 0;
      } else {
        game.addToTurnTotal(roll);
      }
    });
    $("#hold-button").click(function() {
    
    });
  });
});