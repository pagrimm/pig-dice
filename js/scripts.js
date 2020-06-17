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

function Game(turn, turnTotal, player1, player2, winner) {
  this.turn = turn;
  this.turnTotal = turnTotal;
  this.player1 = player1;
  this.player2 = player2;
  this.winner = winner;
}

Game.prototype.addToTurnTotal = function(roll) {
  this.turnTotal += roll;
}

Game.prototype.addTurnTotalToScore = function() {
  if(this.turn === 1) {
    this.player1.score += this.turnTotal;
  } else {
    this.player2.score += this.turnTotal;
  }
}

Game.prototype.switchTurn = function() {
  this.turnTotal = 0;
  if (this.turn === 1) {
    this.turn = 2;
  } else {
    this.turn = 1;
  }
}

Game.prototype.checkWinner = function () {
  if (game.player1.score >= 100){
    this.game.winner = 1;
  } else if (game.player2.score >= 100) {
    this.game.winner = 2;
  }
}

function rollDice() {
  let roll = Math.ceil(Math.random() * 6);
  if (roll === 0) {
    roll = 1;
  }
  return roll;
}

function enableRoll() {
  $(".roll-control").prop("disabled", false);
}

function displayScores(game) {
  $("#player1-score").text(game.player1.score)
  $("#player2-score").text(game.player2.score)
  $("#turn-total").text(game.turnTotal)
}

function displayTurn(turn) {
  if (turn === 1) {
    $("#player1-section").addClass("player1-active");
    $("#player2-section").removeClass("player2-active");
  } else {
    $("#player2-section").addClass("player2-active")
    $("#player1-section").removeClass("player1-active")
  }
}

function displayWinner(winner) {
  if (winner === 1) {
    $(".player1-score-title").text("Winner winner chicken dinner");
    $(".player1-score-title").addClass("bg-danger");
    $(".roll-control").prop("disabled", true);
  } else if (winner === 2) {
    $(".player2-score-title").text("Winner winner chicken dinner");
    $(".player2-score-title").addClass("bg-info");
    $(".roll-control").prop("disabled", true);
  }
}


$(document).ready(function(){
  $("#start-button").click(function() {
    let player1 = new Player(0);
    let player2 = new Player(0);
    let game = new Game(1, 0, player1, player2, 0);
    displayTurn(game.turn);
    enableRoll();
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
      game.switchTurn();
      displayTurn(game.turn);
      displayScores(game);
    });
  });
});