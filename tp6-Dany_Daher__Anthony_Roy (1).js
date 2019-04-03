// Équipier 1 : Dany Daher
// Équipier 2 : Anthony Roy

var creerHistoire= function(n) {
    var histoireFinale=""
    var histoireCourante=[];
    for (var numJ=1; numJ<=n; numJ++){
    	if(numJ==1) phrase=prompt("Entrez une phrase");
        else phrase=prompt(apercu);
        histoireCourante.push(phrase);
        mot=histoireCourante[numJ-1].split(" ").slice(-3); //numJ-1 pour la position
        apercu=mot[0]+ " "  + mot[1]+ " " + mot[2];		   //0:premier  mot 1: deuxieme 2: troisieme
        histoireFinale += " " + histoireCourante[numJ-1]   //   
        if (numJ!=n) confirm("Passez le contrôle à l'autre joueur!");
    }
    return histoireFinale;
}    

//Bug: si le joueur ecrit moins que trois mots, mais nous croyons que le jeu suppose 3 mot et plus
//Nous supposons que deux mots avec un apostrophe("J'aime", par exemple) comptent comme un mot
var histoire= creerHistoire(3);
print(histoire);
    
    
    
    