// ==UserScript==
// @name     TIFFR show selection improvements
// @description Improves the film list. Scrolls the list to the current film and adds keyboard shortcuts to the films list. left = previous film, right = next film, enter;s = toggle favourite, ctr/cmd+enter;t = watch trailer, shift-enter;l = go to official tiff page.
// @version  3
// @grant    none
// @include  https://*.tiffr.com/films/*
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require  https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// ==/UserScript==

"use strict";

console.log("TIFFR+: show selection improvements loading");


$(function() {

  // Go to the next film by pressing the "right" arrow key
  Mousetrap.bind("right", function() {
    console.log("TIFFR+: Next film");
    go("article nav>div:last-child a");
  });
   
  // Go to the previous film by pressing the "left" arrow key
  Mousetrap.bind("left", function() {
    console.log("TIFFR+: Previous film");
    go("article nav>div:first-child a");
  });
  
  // Watch the trailer
  Mousetrap.bind(["mod+enter", "mod+return", "t"], function() {
    console.log("TIFFR+: watch trailer");
    go("div.relative a[rel=noopener]"); // used to watch the trailer       
  });

  // Follow the link to the tiff site
  Mousetrap.bind(["shift+enter", "shift+return", "l"], function() {
      console.log("TIFFR+: follow link to tiff site");
      go("div.grid:nth-child(5) > div:nth-child(16) > a:nth-child(1)")
  });

  
  // Favourite a film by pressing enter
  Mousetrap.bind(["enter", "return", "s"], function() {
    console.log("TIFFR+: Favouriting film");
    let el = $("form.w-full button");
    el.click();
  });
  
  // Google a film pressing G
  Mousetrap.bind("g", function() {
    console.log("TIFFR+: Googling film");
    let title = $("article h1").text()
    let google = "https://www.google.com/search?q="
    let target = `${google}${title} tiff`;
    location.assign(target)
  });
  
  // Google reviews of film pressing R
  Mousetrap.bind("r", function() {
    console.log("TIFFR+: Googling reviews");
    let title = $("article h1").text()
    let google = "https://www.google.com/search?q="
    let target = `${google}${title} 2026 review`;
    location.assign(target)
  });

  
  function isBrokenLink(url) {
    let re = /^http:\/\/tiff\.net[^/]+/;
    return re.test(url);
  }
  
  function fixBrokenLink(url) {
    console.log("TIFFR+: Fixing URL");
    return url.replace(/(http:\/\/tiff\.net)(.*)/, "$1/events/$2")
  }
  
  // Given a selector, follow the link
  function go(where) {
    let url = $(where).prop("href");
    console.log(`TIFFR+: URL: ${url}`);
    
    if (url) {
      console.log(`TIFFR+: Going to: ${url}`);
	    location.assign(url);
    }
  }

  // When a new page is loaded, make sure the list of films is scrolled to show the current film
  console.log("TIFFR+: Scrolling Film List");
  let slug = document.location.pathname;
  $(`li[data-url='${slug}'`)[0].scrollIntoView({block: 'center'});
  

  // When page is loaded, fix official link
	let officialLink = $("div.film-metadata dl.film-metadata__datum:last a");
  let officialLinkUrl = officialLink.prop("href");
  if (isBrokenLink(officialLinkUrl)) {
    console.log(`TIFFR+: Broken URL detected: ${officialLinkUrl}`);
    let fixedUrl = fixBrokenLink(officialLinkUrl); // tiffr 2021 has a missing / in links to tiff site
    officialLink.prop("href", fixedUrl);
  }
  
});


console.log("TIFFR+: loaded");
