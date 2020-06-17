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