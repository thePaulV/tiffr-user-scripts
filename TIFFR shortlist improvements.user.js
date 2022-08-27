// ==UserScript==
// @name     TIFFR shortlist improvements
// @description Adds a count of films in your shortlist to the shortlist page
// @version  1
// @grant    none
// @include  https://*.tiffr.com/shortlists/*
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

"use strict";

console.log("TIFFR shortlist: loading");


$(function() {
  // insert a count of showings at bottom right
  console.log("TIFFR shortlist: Inserting count");
  let count = $('.shortlist-list li').length;
  console.log("TIFFR shortlist: Count is " + count);
  let counter = (`<div id="attendance-counter-container" data-turbolinks="false"><div class="attendance-counter">${count}</div></div>`);
  let target = $('.shortlist');
  target.append(counter);
});

console.log("TIFFR shortlist: loaded");
