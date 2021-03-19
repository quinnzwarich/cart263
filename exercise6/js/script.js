/**
MY Immortal
Quinn Zwarich

Help Ebony Dark’ness Dementia Raven Way edit their horrendous fanfiction.
*/

"use strict";

// insert a span encompassing selection
// solution found here:
// https://stackoverflow.com/questions/24690357/add-tags-around-selected-text-in-an-element
$("#main-text").mouseup(function() {
    let selection = document.getSelection();
    let selectionText = selection.toString();

    let span = document.createElement("span");
    span.textContent = selectionText;

    let range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
});

// if the user submits their revision,
// they will be thanked for their contribution
$("#submit-revision").on("click", function() {
  $("#about-me").remove();
  $("#main-text").remove();
  $("body").append('<p id="thank-you">thanks for da help ^_^</p>');
})
