// ==UserScript==
// @name     TIFFR schedule page improvements
// @description Improves the schedule page by: 1. Adding a button to hide descriptions on the schedule page, 2. Adding a count to the bottom right, and new in 2026 adding a way to show all days at once.
// @version  2026
// @grant    none
// @include  https://*.tiffr.com/u/*/schedule*
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require  https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// ==/UserScript==

"use strict";

const ver = GM.info.script.version;

console.log("TIFFR schedules loading. Version ", ver);


$(function() {
  // insert button to show all days (new 2026)
  $('share-actions').after('<a class="underline text-base tweak-show-all" data-turbo="false" href="#">Show all days</a><span> | </span>');
  $('.tweak-show-all').click(function() {
    console.log("clicked. showing all dates");
    $('[data-schedule-tabs-target=panel]').removeClass('hidden');
  });

	// insert button to hide descriptions
  $('share-actions~a~span:first').after('<a href="#" data-turbo="false" class="tweak-clean text-base underline">Hide decriptions</a><span> | </span>');
  $('.tweak-clean').click(function() {
    console.log("clicked. hiding");
    $('article div>h2~p').hide();
  });

  // insert a count of showings at bottom right
  const shows = $('.md\\:contents')
  const showCount = shows.length;
  console.log(`Seeing ${showCount}`);
  $('share-actions').before(`<span>Total films: ${showCount}</span>`);
  
  // insert a button to download the schedule
  $('share-actions~a~span:first').after('<a href="https://2026.tiffr.com/api/2026/schedule.json" download="tiffr-schedule.json" data-turbo="false" class="tweak-clean text-base underline">Download schedule.json</a><span> | </span>');
  
  
});

console.log("TIFFR final loaded. Version ", ver);
