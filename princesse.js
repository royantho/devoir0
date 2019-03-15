// Équipier 1 : Anthony Roy
// Équipier 2 : Dany Daher
var COLORS = {
  FREE_SLOT:  { r: 255, g: 255, b: 255 }, // White
  WALL:       { r: 133, g: 113, b:  94 }, // Brown
  PRINCESS:   { r: 197, g:  83, b: 218 }, // Purple
  KNIGHT:     { r: 213, g:  12, b:  12 }, // Red
  BLUE_PATH:  { r: 118, g: 183, b: 246 }, // Blue
  GREEN_PATH: { r:  42, g: 255, b:  28 }, // Green
};
//pour creer la matrice grid
var createGrid=function(l,h) {        //l:largeur, h:hauteur
  
    var tableau = new Array(h);       //array(en hauteur) qui va contenir les array en largeur
    
    for (var i = 0; i<tableau.length; i++) {
    
        var row = new Array(l);       //array en largeur qui va contenir les données ('-' par exemple)
      
    for (var j = 0; j<row.length; j++) {
          row[j] = '-';         //ajouter '-' à toutes les cases(l*h cases)
      }
      tableau[i] = row;
  }
    return tableau;             //variable differente que grid, pour poser(var) grid=t   
};

var drawGrid= function(grid) {
    l=grid[0].length;           //pour modifier la couleur et l'aire de l'ecran     
    h=grid.length ;
    setScreenMode(l,h);
    for(var i = 0; i<l; i++) {        //plus petit que l, car le dernier pixel est h-1
        for(var j=0; j<h; j++) {      //plus petit que h, car le dernier pixel est l-1
          setPixel(i, j, COLORS.FREE_SLOT); //changer la couleur de toutes les cases en blanc
        }
        
    }
};

var addRandomWalls = function(grid,d) {
    
    for(var i = 0; i<l; i++) {
        for(var j=0; j<h; j++) {
            if (Math.random()<d) {      //Si la densité est 0.3, il y a 30% de chance
              grid[j][i]='m';       //(suite...) de changer '-' pour 'm' (pour chaque case)
              setPixel(i, j, COLORS.WALL);//couleur de chaque case à condition evaluée vrai de grid[j][i] en brun 
            }
        }
    }
};

var posPrincesse=[0,0];
var ySlot = 0;   //pour que la premiere evaluation de while soit
var xSlot = 0;   //(suite...) 0==0(vrai) pour x et y

function testSlots(arr) { 
    var matchingSlot = false;             //fonction qui va verifier si la coordonnee testee est deja testée
  
    for(var i = 0; i < arr.length; i++){        //(suite...) si elle est deja testee, alors au moin une des coordonnee
      if(arr[i][0] == xSlot && arr[i][1] == ySlot){ //de ce array(slotTested)
          matchingSlot = true;
          i=arr.length;     //pour terminer la boucle plus rapidement, car mathchingSlot est deja true
      }
  } return matchingSlot;      //si ce n'est jamais true, elle reste false. Si au moins true une fois, matchingSlot = true
};

var findFreeSlot = function(grid){
    
    var tries = 0;
    var slot = [];  
    var slotTested=[];
    
    while(slot != '-' && posPrincesse[0]==xSlot && posPrincesse[1] == ySlot){ 
    
        var x = Math.floor(Math.random()*l);  //PROBLEME: mettre var, sinon ces variables globales seront 
      var y = Math.floor(Math.random()*h);  //PROBLEME(suite...): une valeure possible pour le chevalier
        slotTested.push([x,y]);         //push: pour s'assurer qu'on n'applique pas tries++ si la coordonnée est deja testé
        slot = grid[y][x];            //slot: pour verifier les conditions de la valeur de cette case

      if(slot == '-'){            //Pour donner cette coordonnee a la princesse ou le chevalier
          ySlot = y;              //y est la case en hauteur, x en largeur
          xSlot = x;
          return 'quelque chose';       // PROBLEME: il faut retourner quelquechose, car undefined == null selon Codeboot
    }
        
      if (testSlots(slotTested)==false || slot == 'm') tries++;
      if(tries == l*h+1) return null;      
      
    } 
};

var addCharacters = function(grid){
    
    var firstSlot=findFreeSlot(grid);
        
    if (firstSlot != null) {
        grid[ySlot][xSlot] = 'p';       //changer la valeur '-' pour la valeur '-' dans cette coordonnée
        posPrincesse[0]=xSlot;          //PROBLEME 2: necessaire pour s'assurer que les coordonnées
        posPrincesse[1]=ySlot;          //PROBLEME 2(suite...) : de 'p' diffèrent de 'c'
        setPixel(xSlot,ySlot,COLORS.PRINCESS);  //Pour voir la couleur rose dans la grille 
    }
    else return texte='Not enough slots';
    
    var secondSlot=findFreeSlot(grid);
    
    if (secondSlot != null) {
        grid[ySlot][xSlot] = "c";
      setPixel(xSlot,ySlot,COLORS.KNIGHT);
  }
    else return texte='Not enough slots';  
};

var findSolution =function(grid) {
    
    var hShifter = [ySlot]; 
    var lShifter = [xSlot]; 
    var setOfPaths=grid; 
    var pathFound=false;
    var hPos=ySlot; 
    var lPos=xSlot; 
    
    while (lShifter.length > 0 && !pathFound) {
        
        pause(0.09);              //Pour l'animation des chemins possibles
        hPos = hShifter.shift();        //Elle sert pour l'evaluation de la prochain coordonne enregistrée
        lPos = lShifter.shift();        //(suite...) comme un chemin possible
               
        //Les quatres blocs if prochains: Est-ce qu'on a trouvé la princesse encore?
        //condition stricte (> et <: on ne veut pas verifier au dela des limites (de 0 à l-1 et de 0 à h-1)
        if (hPos > 0) {    
            if (setOfPaths[hPos-1][lPos] == 'p') { 
                pathFound = true;
                break;
            }
        }
        
        if (hPos < h-1) {  
          if (setOfPaths[hPos+1][lPos] == 'p'){ 
                pathFound = true;         //si on a trouvé le chemin, pathFound=true
                break;                //suite(...)et on sort de la boucle while
            }                   //suite(...)donc, on passe a la boucle if(!pathFound==true)
        }
        
        if (lPos > 0) {               
            if (setOfPaths[hPos][lPos-1] == 'p'){ 
                pathFound = true;
                break;
            }
        }
        
    if (lPos <l-1) {                      //Note: pour ne pas depasser la limite du tableau
            if (setOfPaths[hPos][lPos+1] == 'p'){ 
                pathFound = true;
                break;
            }
        }
    //Les quatres blocs if: 1) verifient les positions a proximite de la coordonnee (x,y)=(lPos,hPos)        
      //Les proximités etant en haut(u), en bas(d), a gauche(l), a droite(h)     
        //2) Ajout de trace de chemin possible dans le tableau setOfPaths (voir les conditions if)
        //3) Ajout de coordonnees x(lPos) et y(hPos) dans les coordonnees d'evaluation (lShifter et hShifter)
        //Note: elle continue a evaluer jusqua ce que c'est necessaire
        //Note(suite): c'est-a-dire jusqu'a ce qu'elle trouve la princesse
         if (hPos > 0) {
            
            if (setOfPaths[hPos-1][lPos] == '-') {  //up of (lPos,hPos)
                hShifter.push(hPos-1);        //h-1 veut dire en haut
                lShifter.push(lPos);        //coordonnee x ne change pas
                setOfPaths[hPos-1][lPos]=setOfPaths[hPos][lPos]+ 'u';
                setPixel(lPos,hPos-1,COLORS.BLUE_PATH);
            }
         }
        
        if (hPos < h-1) {               
            if (setOfPaths[hPos+1][lPos] == '-'){ //down of (lPos,hPos)
              hShifter.push(hPos+1);                //ajoute la prochaine coordonne a l'evaluation
              lShifter.push(lPos);                  //(suite...) de ses proximitées(u,d,l,r)
              setOfPaths[hPos+1][lPos]=setOfPaths[hPos][lPos]+ 'd'; //ajoute 'l' dans la case
              setPixel(lPos,hPos+1,COLORS.BLUE_PATH);       //change la case en la couleur bleu
            }
        }
        
        if (lPos > 0) {  
            if (setOfPaths[hPos][lPos-1] == '-') {  //left of (lPos,hPos)
              hShifter.push(hPos);          //cette fois c'est y qui ne change pas
              lShifter.push(lPos-1);        //lPos-1 veut dire a droite
              setOfPaths[hPos][lPos-1]=setOfPaths[hPos][lPos] + 'l';  //ajoute 'l' dans la case
              setPixel(lPos-1,hPos,COLORS.BLUE_PATH);         //change la case en la couleur bleu
                
            }
        }
        
        if (lPos < l-1) {                
            if (setOfPaths[hPos][lPos+1] == '-') {  //right of (lPos,hPos)
              hShifter.push(hPos);          
              lShifter.push(lPos+1);
              setOfPaths[hPos][lPos+1]=setOfPaths[hPos][lPos] + 'r';  //ajoute 'r' dans la case
              setPixel(lPos+1,hPos,COLORS.BLUE_PATH);         //change la case en la couleur bleu
            }
        }
    }                           
    
    //La boucle while sera terminée lorsque le premier chemin de setOfPaths sera trouvé (pathFound=true)
    //(suite...) Ce chemin sera utilisé pour le le bloc if prochain
    
    if (!pathFound) print('Oh non! Quel tragédie!!');         //C'est le case si les mur et les limites de la grille bloquent
  else {print('La princesse est sauvée!');              //(suite...) le chemin
          var path = setOfPaths[hPos][lPos];            //path contient le chemin de cette position(ex: 'culdud'
          var posYcourrante = ySlot;              //(suite...) la derniere lettre 'd' etant proche de 'p'
          var posXcourrante = xSlot;
          for (var i = 0 ; i < path.length-1; i++) {          //PROBLEME: Si on retrace a partir de la princesse,  
            if (path.charAt(i+1) == 'u') posYcourrante -=1;   //PROBLEME(suite):mauvaise case pour celle qui est proche du chevalier
            if (path.charAt(i+1) == 'd') posYcourrante +=1;
            if (path.charAt(i+1) == 'l') posXcourrante -=1;   //i+1 pour ne pas compter la position de 'c'
            if (path.charAt(i+1) == 'r') posXcourrante +=1;
            setPixel(posXcourrante,posYcourrante,COLORS.GREEN_PATH); //voire les couleurs verte, c'est le chemin le plus court
            pause(0.1);                     //Pour l'animation du chemin le plus court du Chevalier
         }                            //Note:Le premier chemin trouver est le chemin le plus court
    }                             //Note:Bien sur, il y aura plus qu'un chemin le plus court possible,
                                //Note(suite): Mais elle n'en prends qu'une, d'apres les conditions if
};                                  //Note:La priorité est u,d,l puis r.
 

var program = function(l,h,d){    //contient toutes les fonctions de facon sequentielle

  var grid = createGrid(l,h);   //var grid=t (voir explication ecrite à la ligne 13(apres 'return t')
  drawGrid(grid);           //faire marcher la fonction drawGrid(voir en haut a droite dans Codeboot)
  pause(0.1)
    addRandomWalls(grid, d);    //faire marcher la fonction addRandomWalls(voire les couleurs brun)
    pause(0.1)        
  var savedCharacterSpots = addCharacters(grid);       //faire marcher la fonction addCharacters(voir les couleurs rouge et rose
    if (savedCharacterSpots=='Not enough slots') print(texte);  //c'est le case s'il y a moins que deux cases blanche
  else findSolution(grid);                    //elle fait marcher findSolution s'il y a deux cases ou plus
};

program(3,3,0.5); //fait marcher le program (la sequence de toutes les fonctions)
