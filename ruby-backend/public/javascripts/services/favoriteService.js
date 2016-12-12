var favoriteHttpRequest = new XMLHttpRequest();

var FavoriteService = function () {}

FavoriteService.addFavorite = function addFavorite(movieTitle, imdbID) {
	
	var url = 
		'/addFavorite?movie_title=' + movieTitle + 
		'&imdb_id=' + imdbID;
	
	favoriteHttpRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
	        var searchResponse = JSON.parse(this.responseText);

	        //switch out icon with good one
    		// document.getElementById('searchResults').innerHTML = resultHTML;
	    }
	}
	favoriteHttpRequest.open("POST", url, true);
	favoriteHttpRequest.send();

}

FavoriteService.showFavorites = function showFavorites() {

	var url = '/favorites';

	favoriteHttpRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
	        var favoritesResponse = JSON.parse(this.responseText);

	        var favoritesHTML = [];
	        favoritesResponse.favorites.forEach(function (favorite) {
		        favoritesHTML.push(
		        	'<div>',
		        	favorite.movie_title,
		        	'</div>'
	        	)
	        })
    		document.getElementById('favorites').innerHTML = favoritesHTML.join("");
	    }
	}
	favoriteHttpRequest.open("GET", url, true);
	favoriteHttpRequest.send();

}