// ==UserScript==
// @name     TIFFR planner page scheduling improvements
// @description Add some helpful features to the planner for tiffr, including 1. a count of films in your shortlist, 2. a count of films in your schedule, 3. numbering screenings of films so you can find premieres easily
// @version  1
// @grant    none
// @include  https://*.tiffr.com/planner
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require  https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// ==/UserScript==

"use strict";

console.log("TIFFR Planner loading");


$(function() {
  
  function addCss(rule) {
    var css = document.createElement('style'); // Creates <style></style>
    css.type = 'text/css'; // Specifies the type
    if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
    else css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
  }


  function addShortlistCount() {
    let $heading = $(".planner-sidebar__heading:nth-of-type(2)");
    let $list = $(".planner-shortlist");
    let $items = $(".planner-shortlist li");
    let count = $items.length;
    
    let $span = $heading.find("span.tweak-count");
    if ($span.length == 0) {
	    $heading.append(`<span class="tweak-count"></span>`);
      $span = $heading.find("span.tweak-count");
    }
    $span.html(`: ${count}`);
  }
  
  function updateAttending() {
    let $filmsAttending = $(".planner-shortlist li.planner-shortlist--is-attending a");
    let $calendarDivs = $(".event-title__link");
    $calendarDivs.removeClass('tweak-attending');
    $filmsAttending.each( function() {
      console.log($(this));
      let title = $(this).text();
      console.log(title);
      $calendarDivs.filter(`:contains(${title})`).addClass("tweak-attending");
    });
  }
  
  function numberScreenings() {
    let $films = $(".planner-shortlist li a");
    let $calendarDivs = $(".event-title__link");
    $films.each(function() {
    	let title = $(this).text();
      let $screenings = $calendarDivs.filter(`:contains(${title})`);
      $screenings.each( function(i) {
        let $span = $(this).find("span.tweak-number");
        if ($span.length === 0) {
          $(this).append("<span class='tweak-number'></span>");
          $span = $(this).find("span.tweak-number");
        }
        $span.text(` (${i+1})`);
      });
    });
  }
  
  addCss(`
         a.tweak-attending {     text-decoration: line-through;  }
         `);
  
  function trigger() {  
    setTimeout (addShortlistCount, 2000);
    setTimeout (updateAttending, 2000);
    setTimeout (numberScreenings, 2000);
  }
  
  trigger();
  
  $(document).click(updateAttending);
  //$(".workflow-filter__link").click(trigger);
  $(".planner-sidebar__heading").click(trigger);

});


console.log("TIFFR Planner loaded");
