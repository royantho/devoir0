var monde = [];

var randomBetween = function(max,min){
    var num = Math.floor(Math.random()*(max-min+1)+min);
    return num;
}
    
var genererNom = function(){
    var sylList = ["la","cou", "ca", "ra", "cha", "pi", "mu", 
                      "rho", "na", "ne", "ki", "ko", "kon", "miss", "sal"];
    var sylNb = randomBetween(5,2);
    var syl = randomBetween(sylList.length-1,0);
    nom = '';
    for(i=1; i<sylNb; i++){
        
        nom += sylList[syl];
        syl = randomBetween(sylList.length-1,0);
        
    }
    return nom;
}

var genererCreature = function(){
    
    var nom = genererNom();
    var niveau = randomBetween(100,1);
    enregistrement = [nom, niveau];
    return enregistrement;
}

var remplirMonde = function(m,nb){
    var verifier=[]                     
    
    for(var creature=0 ; creature<nb; creature++) {
        if (enregistrement != undefined) verifier.push(enregistrement[0])
        
        genererCreature();
        while (verifier.indexOf(enregistrement[0])!= -1) genererCreature(); 
        monde[creature] = enregistrement;
    }
    return monde;
}

var afficherMonde = function(m){
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