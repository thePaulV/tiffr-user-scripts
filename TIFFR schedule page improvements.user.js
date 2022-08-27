// ==UserScript==
// @name     TIFFR schedule page improvements
// @description Improves the schedule page by: 1. Adding a button to hide descriptions on the schedule page, 2. Adding a count to the bottom right
// @version  1
// @grant    none
// @include  https://*.tiffr.com/schedules/*
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require  https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// ==/UserScript==

"use strict";

console.log("TIFFR schedules loading");


$(function() {
  $('.schedule__owner').append('<button class="tweak-clean">Hide decriptions</button>');
  $('.tweak-clean').click(function() {
    console.log("clicked. hiding");
//    $('.schedule-event-summary').add('.schedule-event-meta__location').hide();
    $('.schedule-event-summary').hide();
  });

  // insert a count of showings at bottom right
  console.log("TIFFR final improvements: Inserting count");
  let count = $('.schedule__event-details').length;
  let counter = (`<div id="attendance-counter-container" data-turbolinks="false"><div class="attendance-counter">${count}</div></div>`);
  let target = $('.schedule');
  target.append(counter);
});

console.log("TIFFR final loaded");
