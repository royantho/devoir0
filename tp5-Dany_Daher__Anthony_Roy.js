// Équipier 1 : Anthony Roy
// Équipier 2 : Dany Daher

 
var monde = [];

function genererNom() {
    nom="";
	var listeSyllables = ["la","cou", "ca", "ra", "cha", "pi", "mu", 
                      "rho", "na", "ne", "ki", "ko", "kon", "miss", "sal"];
    
	var elementListe = Math.floor(Math.random()*listeSyllables.length);
    var nbSyllables = Math.floor(Math.random()*(5-2+1)+2);
    
    for (i=1 ; i<=nbSyllables; i++) {
        nom += listeSyllables[elementListe];
        elementListe=Math.floor(Math.random()*listeSyllables.length);
    }
	return nom;
}

function genererCreature() {
       
    niveau = Math.floor(Math.random()*(100-1+1)+1);
    
    genererNom();
    
    enregistrement=[nom,niveau];
    
    return enregistrement;
}


function remplirMonde(m,nb) {
    var verifier=[]						//verifier si le nom est deja utiliser
    
    for(var creature=0 ; creature<nb; creature++) {
        if (enregistrement != undefined) verifier.push(enregistrement[0])	//avant la creation de  la premiere creature
        genererCreature();
        while (verifier.indexOf(enregistrement[0])!= -1) genererCreature();	//regenerer creature tant qu'elle n'a pas un nom unique
        monde[creature] = enregistrement;
    }
    return monde;
}
    
function afficherMonde(m) {
    print('"')
    print("-- MONDE --")
    for (var creature=1 ; creature <= monde.length; creature++) {
        print("> Creature " + creature + " : " + monde[creature-1][0] + " - niveau " + monde[creature-1][1]);
    }
    print("-- FIN --")
   	print('"');
}
             
remplirMonde(monde,25); 
afficherMonde(monde);

 
        
        
                                  


