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
	movieList=[];

	for (var i=0; i<movies.length; i++) {
		for (var j=0; j<movies[i].title.length; j++) {
			if (movies[i].title.slice(j, j+(searchValue.length)).toUpperCase()==searchValue.toUpperCase()) {
				movieList.push(movies[i]);
				j=100;
			}
		}
	}
	movies=movieList
	console.log(movieList)

	return movies
}

function sortMovies(movies,isAscending) {
	do {
		change = false;
		for (var i=0; i<movies.length-1; i++) {
			if (movies[i+1].title.toUpperCase() < movies[i].title.toUpperCase()) {
				var swap = movies[i];
				movies[i] = movies[i+1];
				movies[i+1] = swap;
				change = true;
			}
		}
	} while (change);
	return movies;	
}
var SHOW_SAMPLE = true



//document.getElementsByClassName('c-main_list.o-layout.o-wrapper.-gutter-small').innerHTML="aksldfa";
//ASDFB1!sdf
