// ==UserScript==
// @name     2025 TIFFR planner page scheduling improvements
// @description Add some helpful features to the planner for tiffr, including 1. a count of films in your shortlist, 2. a count of films in your schedule, 3. numbering screenings of films so you can find premieres easily
// @version  2
// @grant    none
// @include  https://*.tiffr.com/planner
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require  https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @require  https://raw.githubusercontent.com/lodash/lodash/4.17.15-npm/lodash.js
// ==/UserScript==

"use strict";

console.log("TIFFR Planner 2025 loading");


$(function() {
  function log (msg) {
    console.log(`TIFFR Planner 2025: ${msg}`); 
  }
  
  function addCss(rule) {
    console.debug(`Adding rule ${rule}`)
    var css = document.createElement('style'); // Creates <style></style>
    css.type = 'text/css'; // Specifies the type
    if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
    else css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
  }


  /* Count the number of films that are selected, and add it to the header rows */
  function updateAttendingCount() {
    let $filmsAttending = $(".bg-\\[\\#2ecc71\\]");
    const count = $filmsAttending.length;
//     log(`Attending ${count} films`);
    
    
    let $calendarDivs = $("div.sticky");
    $calendarDivs.find("span.tweak-total-attending").remove();
//     log(`Found ${$calendarDivs.length} headings`);
    
    let html = $(`
    <span class="tweak-total-attending">Total selected: ${count}</span>
    `);
    $calendarDivs.append(html);
  }
  
  /* For each screening, add the number it is (e.g. premiere is #1) */
  function numberScreeningsPerFilm() {
    const titleSelector = ".flex-row h1";
    const $allTitlesIncludingDupes = $(titleSelector);
    
//     console.log($allTitlesIncludingDupes);
//     log($allTitlesIncludingDupes.length);
    const allTitles = $allTitlesIncludingDupes.map(function(){return $(this).text()});
//     console.log(allTitles);
//     log(allTitles.length);
    const titlesNoDupes = _.chain(allTitles)
    	.sort()
    	.uniq()
    	.value();
//     log(`Found ${titlesNoDupes.length} films`);

    let counts = new Map();
    for (const title of titlesNoDupes) {
      counts.set(title, 1); //start at 1=premiere
    }
    
    $allTitlesIncludingDupes.each(function() {
    	let title = $(this).text();
      let count = counts.get(title);
      counts.set(title, count+1);
      const text = `${count==1?"\u{2B50}":""} #${count} ${count==1?"\u{2B50}":""}`;
//       log(`title: ${title} #${count}`);
      
      // get span if it already exists, otherwise create it
      let $next = $(this).next();
      if($next.find(".tweak-film-count").length > 0) {
        $next.find(".tweak-film-count").text(` ${text}`);
      }
      else {
        const $html = $(`<span class="tweak-film-count"> ${text}</span>`);
        $next.append($html);
      }
    });
  }
  
  /* If a screening of a film is selected, strike it out in the calendar (TODO: sidebar)*/
  function strikeOutSelected() {
    const selectedSelector = ".bg-\\[\\#2ecc71\\]";
    let $rowsAttending = $(".flex-row").has(".bg-\\[\\#2ecc71\\]"); // find all the rows with a coloured in button (rows for screenings we're attending)
    let $titlesAttending = $rowsAttending.find("h1");	//find the associated title for the row that is selected
    
    const attendingTitles = $titlesAttending.map(function(){return $(this).text()});
    const titlesNoDupes = _.chain(attendingTitles)
    	.sort()
    	.uniq()
    	.value();	//titlesNoDupes is an array of text titles
    
    
    $("h1.tweak-film-selected").removeClass("tweak-film-selected"); //clear selected films so we can re-add

    // iterate over the titles we're attending in the schedule, find all their screenings, and strike them out so it's clear we've already selected a screening
    for (const title of attendingTitles) {
      let $screeningsOfTitle = $(`.flex-row h1:contains("${title}")`);
      $screeningsOfTitle.addClass("tweak-film-selected");
    }

// 		log(`Attending: ${titlesNoDupes.join(",")}`);
  }

  // This class is used to indicate filmes that are selected, and cross them out
  addCss(`.tweak-film-selected {     text-decoration: line-through;  }`);
  
  function trigger() {  
    const timeout = 500;
    setTimeout (updateAttendingCount, timeout);
		setTimeout (numberScreeningsPerFilm, timeout);
    setTimeout (strikeOutSelected, timeout);
  }
  
  trigger();
  $(document).click(trigger);
});


console.log("TIFFR Planner 2025 loaded");
