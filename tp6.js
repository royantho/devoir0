var lettre = function(car){
        return ( car >= 'a' && car <= 'z'||
                car >= 'A' && car <= 'Z')||;
    };
    var decouperEnMots = function(phrase){
        var resultat = [];
        var debut = 0;
        while (debut < phrase.length){
            if (lettre(phrase.charAt(debut))){
                var i = debut+1;
                while (i < phrase.length && lettre(phrase.charAt(i))){
                    i++;
                }
                resultat.push(phrase.slice(debut, i));
                debut = i + 1;
            } else{
                debut++;
            }
        }
        return resultat;
    };

var creerHistoire = function(n){
    var nombreDePhrase = 1;
    var phrase = prompt('Entrez une phrase!');
    var phraseIndex = [];
    phraseIndex.push(phrase);
    var dernierMots = decouperEnMots(phrase);
    while (nombreDePhrase < n){
        alert('Passez le contrôle à l\u0027autre joueur!');
        
        var phrase = prompt('...'+dernierMots[dernierMots.length-3]+' '+dernierMots[dernierMots.length-2]+' '+dernierMots[dernierMots.length-1]);
        phraseIndex.push(phrase);
        dernierMots = decouperEnMots(phrase);
        nombreDePhrase++;
    }
    pause();
    var concatenerPhrases = function(){
        for(i=0; i<n; i++){
            if (i==n){
                histoire = histoire + phraseIndex[i];}
            else if(i==0){
                histoire = phraseIndex[i] + ' ';}
            else{
            histoire = histoire + phraseIndex[i]+' ';}
        }
       return histoire
    }
  var histoire = concatenerPhrases();
        return histoire  
}

var histoire = creerHistoire(5);
print(histoire);
