function validateUsername(value) {
	//Si au moin un des conditions est false, la fct retourne false
	if (value.length<5) return false;
	if (value.indexOf("@")==-1) {
		for (i=0 ; i<value.length; i++) {
			var char=value.charAt(i)
			if (i<5){
				if (char < "A" || char > "z" || 
					(char > "Z" && char <"a")) return false
			} else {
				if (!(char >= "0" && char <= "9") &&
					!(char >= "A" && char <= "Z") &&
					!(char >= "a" && char <= "z")) return false
			}
		} 
	} else {
		for (i=0 ; i<value.indexOf("@")+1; i++) {
			var char=value.charAt(i)
			var slice=value.slice(i)
			if (i<value.indexOf("@")) {
				if (!(char >= "0" && char <= "9") &&
					!(char >= "a" && char <= "z") && 
					char != ".") return false
			} else {
				if (!(slice == "@homeflix.ca" ||
					  slice == "@homeflix.com" ||
					  slice == "@homeflix.org")) return false
			}

		} 
 	}
	return true
}


function validatePassword(value) {
	if (value.length<8 || value.length>16) return false
    var conMaj=false;
	var conSpec=false;
	var conChif=false;
	for (i=0 ; i<value.length; i++) {
		var char=value.charAt(i);
		if (char >= "0" && char <= "9") conChif=true;
		if (!(char >= "0" && char <= "9") &&
			!(char >= "a" && char <= "z") && 
			!(char >= "A" && char <= "Z")) conSpec=true;
		if (char >= "A" && char <= "Z") conMaj=true;
    }
	return conChif&&conSpec&&conMaj;
}

function updateHeader(username) {
	document.getElementById('username').innerHTML=username
}

var searchMovies= function(movies, searchValue) {
	var movieList=[];

	for (var i=0; i<movies.length; i++) {
		for (var j=0; j<movies[i].title.length; j++) {
			if (movies[i].title.slice(j, j+(searchValue.length)).toUpperCase()==searchValue.toUpperCase()) {
				movieList.push(movies[i]);
				j=100;
			}
		}
	}
	movies=movieList
	

	return movies
}

function sortMovies(movies,isAscending) {
	if (isAscending==true){
		do {
		var change = false;
			for (var i=0; i<movies.length-1; i++) {
				if (movies[i+1].title.toUpperCase() < movies[i].title.toUpperCase()) {
					var swap = movies[i];
					movies[i] = movies[i+1];
					movies[i+1] = swap;
					change = true;
				}
			}	
		} while (change);
	} else {
		do {
		var change = false;
			for (var i=0; i<movies.length-1; i++) {
				if (movies[i+1].title.toUpperCase() > movies[i].title.toUpperCase()) {
					var swap = movies[i];
					movies[i] = movies[i+1];
					movies[i+1] = swap;
					change = true;
				}
			}	
		} while (change);

	}
	console.log(movies)
	return movies;	
}

function populateSelect(movies) {
	var genreList = [];
	for (var i=0; i<movies.length; i++) {
		for (var j=0; j<movies[i].genres.length; j++) {
			if (genreList.indexOf(movies[i].genres[j])==-1) {
				genreList.push(movies[i].genres[j]);
			}
		}
	} 
	console.log(movies)
	return genreList
}

function filterMovies(movies, genreFilter) {
	var movieList = [];
	//console.log(movies) ?????? check quesque ca ecrit dans chrome
	//console.log(genreFilter);
	for (var i = 0; i<movies.length; i++) {
		console.log(movies[i].genres.indexOf(genreFilter))
		if (movies[i].genres.indexOf(genreFilter)!=-1) {
			movieList.push(movies[i])
		}
	}
	//console.log(movieList); 
	return movieList;
}

var SHOW_SAMPLE = true



//document.getElementsByClassName('c-main_list.o-layout.o-wrapper.-gutter-small').innerHTML="aksldfa";
/* 
ASDFB/sdf
*/