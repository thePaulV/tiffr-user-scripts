// ==UserScript==
// @name     TIFFR shortlist improvements
// @description Adds a count of films in your shortlist to the shortlist page
// @version  1
// @grant    none
// @include  https://*.tiffr.com/u/*/shortlist
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

"use strict";

console.log("TIFFR shortlist: loading");


$(function() {
  // add download link
  $('div.close-all-button').after('<div class="text-base"><a class="underline" download="tiffr-shortlist.json" href="https://2026.tiffr.com/api/2026/shortlist.json">Download shortlist.json</a>')
});

console.log("TIFFR shortlist: loaded");
