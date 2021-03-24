/**
Code Taker
Quinn Zwarich

Da Vinci?! Lesss goooo.
*/

"use strict";

let radius = 3;

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know": function() {
      $(this).dialog(`close`);
    }
  }
});

$(`.secret`).one(`mouseover`, wave(event, 1, 0));

$(`#answer`).droppable({
  drop: function(event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    // check if they got it
    if ($(this).text() === `Theremin`) {
      $(`#solved-dialog`).dialog(`open`);
    }
  }
});

function wave(event, radius, numPoints) {
  $(this).addClass(`found`, 500);
  let position = $(this).offset();

  radius++;
  if (Number.isInteger(radius / 2)) {
    numPoints = radius / 2;
  }
  let angle = (Math.PI * 2) / numPoints;
  for (let i = 0; i < (Math.PI * 2); i += angle) {
    let sx = position.top + Math.cos(i) * radius;
    let sy = position.left + Math.sin(i) * radius;
    $(this).append(`${string}`).offset({
      top: sx,
      left: sy
    });
  }
  if (radius < 250) {
    requestAnimationFrame(function() {
      wave(event, radius, numPoints);
    });
  }
}
