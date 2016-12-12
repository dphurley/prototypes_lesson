var omdbHttpRequest = new XMLHttpRequest();

var OmdbService = function () {}

OmdbService.searchForMovieByName = function searchForMovieByName() {

	var searchTerm = document.getElementById('searchTerm').value
	var url = 'http://www.omdbapi.com/?s=' + encodeURIComponent(searchTerm);

	omdbHttpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var searchResponse = JSON.parse(this.responseText);

	        var resultHTML = buildSearchResultHTML(searchResponse)
    		document.getElementById('searchResults').innerHTML = resultHTML;
	    }
	}
	omdbHttpRequest.open("GET", url, true);
	omdbHttpRequest.send();	
}

OmdbService.displayAdditionalInfoForMovieByImdbId = function displayAdditionalInfoForMovieByImdbId(imdbID) {

	var url = 'http://www.omdbapi.com/?i=' + encodeURIComponent(imdbID);

	omdbHttpRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var lookupResponse = JSON.parse(this.responseText);

	        var additionalInfoHTML = buildAdditionalInfoHTML(lookupResponse);
    		document.getElementById(imdbID + '_info').innerHTML += additionalInfoHTML;
    		document.getElementById(imdbID + '_more_info').style.visibility = 'hidden';
	        
	    }
	}
	omdbHttpRequest.open("GET", url, true);
	omdbHttpRequest.send();
}

function closeAdditionalInfoForMovie(imdbID) {
	document.getElementById(imdbID + '_info').innerHTML = null;
	document.getElementById(imdbID + '_more_info').style.visibility = 'visible';
}


function buildSearchResultHTML(searchResponse) {
	
	var resultHTML = [];
    searchResponse.Search.forEach(function (movieResult) {
    	resultHTML.push(
    		'<div id="' + movieResult.imdbID + '_display" style="display: inline-block; margin: 20px; width: 400px; box-shadow: 1px 1px 1px #D3D3D3; border: 1px solid #D3D3D3;">',
	    		'<h4 style="text-align: center; font-family: Impact, Charcoal, sans-serif;">'+ movieResult.Title.toUpperCase() + '</h2>',
	    		'<img src="' + movieResult.Poster + '" alt="' + movieResult.Title + '" style="height: 250px; display: block; margin: auto; box-shadow: 5px 5px 3px #D3D3D3;"/>',
	    		'<div id="' + movieResult.imdbID + '_more_info">',
	    			'<button onclick="OmdbService.displayAdditionalInfoForMovieByImdbI(d\'' + movieResult.imdbID + '\')" style="display: block; margin: auto; margin-top: 20px; margin-bottom: 20px;">More Info</button>',
				'</div>',   	
				'<div id="' + movieResult.imdbID + '_favorite">',
	    			'<button onclick="FavoriteService.addFavorite(\'' + movieResult.Title + '\', \'' + movieResult.imdbID + '\')" style="display: block; margin: auto; margin-top: 20px; margin-bottom: 20px;">Add to Favorites</button>',
				'</div>',		
	    		'<div id="' + movieResult.imdbID + '_info"></div>',
	    	'</div>'
		)    	
    });

    return resultHTML.join("");
}

function buildAdditionalInfoHTML(lookupResponse) {
	
	var resultHTML = [];
	resultHTML.push(
		'<div>Rating: ' + lookupResponse.Rated + '</div>',
		'<div>Release Date: ' + lookupResponse.Released + '</div>',
		'<div>Runtime: ' + lookupResponse.Runtime + '</div>',
		'<div>Genre: ' + lookupResponse.Genre + '</div>',
		'<div>Director: ' + lookupResponse.Director + '</div>',
		'<div>Writer: ' + lookupResponse.Writer + '</div>',
		'<div>Actors: ' + lookupResponse.Actors + '</div>',
		'<div>Plot Summary: ' + lookupResponse.Plot + '</div>',
		'<div>Language: ' + lookupResponse.Language + '</div>',
		'<div>Country: ' + lookupResponse.Country + '</div>',
		'<div>Awards: ' + lookupResponse.Awards + '</div>',
		'<div>Metascore: ' + lookupResponse.Metascore + '</div>',
		'<div>IMDB Rating: ' + lookupResponse.imdbRating + '</div>',
		'<div>IMDB Votes: ' + lookupResponse.imdbVotes + '</div>',
		'<div>Type: ' + lookupResponse.Type + '</div>',
		'<button onclick="closeAdditionalInfoForMovie(\'' + lookupResponse.imdbID + '\')">Close</button>'
	)    	

    return resultHTML.join("");
}