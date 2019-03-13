var COLORS = {
  FREE_SLOT:  { r: 255, g: 255, b: 255 }, // White
  WALL:       { r: 133, g: 113, b:  94 }, // Brown
  PRINCESS:   { r: 197, g:  83, b: 218 }, // Purple
  KNIGHT:     { r: 213, g:  12, b:  12 }, // Red
  BLUE_PATH:  { r: 118, g: 183, b: 246 }, // Blue
  GREEN_PATH: { r:  42, g: 255, b:  28 }, // Green
};

var createGrid=function(l,h) {
	var t = new Array(h);
    for (var i = 0; i<t.length; i++) {
      var row = new Array(l);
      for (var j = 0; j<row.length; j++) {
      	row[j] = "-";
	  }
    t[i] = row;
	}
    
    return t;
    
};

var drawGrid= function(grid) {
    var l=grid[0].length;
    var h=grid.length ;
    setScreenMode(l,h);
    for(var i = 0; i<l; i++) {
        for(var j=0; j<h; j++) {
          setPixel(i, j, COLORS.FREE_SLOT);
        }
        
    }
};

var addRandomWalls = function(grid,d) {
    l=grid[0].length;
    h=grid.length;
    for(var i = 0; i<l; i++) {
        for(var j=0; j<h; j++) {
            if (Math.random()<d) {
            grid[j][i]="m";
            setPixel(i, j, COLORS.WALL);
          }
        }
    }
};

var posPrincesse=[0,0];


var ySlot = 0;
var xSlot = 0;
    
var findFreeSlot = function(grid){
    
    var tries = 0;
    var slot = 0;
    while(slot != "-" && tries < l*h && posPrincesse[0]==xSlot && posPrincesse[1] == ySlot){
    var x = Math.floor(Math.random()*l);
    var y = Math.floor(Math.random()*h);
        
        slot = grid[y][x];
    if(slot == "-"){
        ySlot = y;
        xSlot = x;
    }
        else{
        tries++;
            if(tries == l*h){
                return null;
            }
                 
    	}
    }
};

var addCharacters = function(grid){
    
    findFreeSlot(grid);
    grid[ySlot][xSlot] = "p";
    posPrincesse[0]= xSlot; posPrincesse[1]= ySlot;
    setPixel(xSlot,ySlot,COLORS.PRINCESS);
    findFreeSlot(grid);
    grid[ySlot][xSlot] = "c";
    setPixel(xSlot,ySlot,COLORS.KNIGHT);
};

var findSolution =function(grid) {
    var hShifter = [ySlot]; 
    var lShifter = [xSlot]; 
    var setOfPaths=grid; 
    var pathFound=false;
    var hPos=ySlot; 
    var lPos=xSlot; 
    
    while (lShifter.length >0 && !pathFound) {
        pause(0.02);							//Pour l'animation des chemins possibles
        hPos = hShifter.shift();
        lPos = lShifter.shift();
               
        //Est-ce qu'on a trouvé la princesse encore?
        if (hPos > 0) {    
            if (setOfPaths[hPos-1][lPos] == 'p') { 
                pathFound = true;
                break;
            }
        }
        
        if (hPos < h-1) {
             
        	if (setOfPaths[hPos+1][lPos] == 'p'){ 
                pathFound = true;
                break;
            }

        }
        
        if (lPos > 0) {              ///ou ySlot? ou posPrincesse[0]?  
            if (setOfPaths[hPos][lPos-1] == 'p'){ 
                pathFound = true;
                break;
            }
        }
        //empty slots pathfinding
		if (lPos <l-1) {               //Note: pour ne pas depasser la limite du tableau
            if (setOfPaths[hPos][lPos+1] == 'p'){ 
                pathFound = true;
                break;
            }
        }
        
        //Ajout de trace de chemin possible dans le tableau setOfPaths
        //Ajout de coordonnees x et y dans le tableau d'evaluation
        //Note: elle continue a evaluer jusqua ce que c'est necessaire
        //Note(suite): c'est a dire jusqu'a ce qu'elle trouve la princesse
         if (hPos > 0) {
            
            if (setOfPaths[hPos-1][lPos] == '-') {
                hShifter.push(hPos-1);
                lShifter.push(lPos);
                setOfPaths[hPos-1][lPos]=setOfPaths[hPos][lPos]+ 'u';
                setPixel(lPos,hPos-1,COLORS.BLUE_PATH);
            }
        }
        
        if (hPos < h-1) {               
            if (setOfPaths[hPos+1][lPos] == '-'){
              hShifter.push(hPos+1);
              lShifter.push(lPos);
              setOfPaths[hPos+1][lPos]=setOfPaths[hPos][lPos]+ 'd';
              
              setPixel(lPos,hPos+1,COLORS.BLUE_PATH);
            }
        }
        
        
        if (lPos > 0) {  
            
            if (setOfPaths[hPos][lPos-1] == '-') {
              hShifter.push(hPos);
              lShifter.push(lPos-1);
              setOfPaths[hPos][lPos-1]=setOfPaths[hPos][lPos] + 'l';
                setPixel(lPos-1,hPos,COLORS.BLUE_PATH);
                
            }
        }
        
       if (lPos < l-1) {                
            if (setOfPaths[hPos][lPos+1] == '-') {
              hShifter.push(hPos);
              lShifter.push(lPos+1);
              setOfPaths[hPos][lPos+1]=setOfPaths[hPos][lPos] + 'r';
              setPixel(lPos+1,hPos,COLORS.BLUE_PATH);
            }
        }
    }                           
    
    //La boucle while sera terminée lorsque le premier chemin de setOfPaths sera trouvé (pathFound=true)
    //(suite...) Ce chemin sera utilisé pour le le bloc if prochain
    
    if (!pathFound) print('Pas de solution!');
	else {print('Solution trouvée');
          var path = setOfPaths[hPos][lPos];  
          var posYcourrante = ySlot;
          var posXcourrante = xSlot;
          for (var i = 0 ; i < path.length-1; i++) {  
          	if (path.charAt(i+1) == 'u') posYcourrante -=1;   //i+1 pour ne pas compter la position de 'c'      
          	if (path.charAt(i+1) == 'd') posYcourrante +=1;
          	if (path.charAt(i+1) == 'l') posXcourrante -=1;
          	if (path.charAt(i+1) == 'r') posXcourrante +=1;
            setOfPaths[posYcourrante][posXcourrante]= 'x';
            setPixel(posXcourrante,posYcourrante,COLORS.GREEN_PATH);
            pause(0.1);										  //Pour l'animation du chemin le plus court du Chevalier
         }  
    }
};    
 


var program = function(l,h,d){

var grid = createGrid(l,h);

drawGrid(grid);
addRandomWalls(grid, d);
addCharacters(grid);
findSolution(grid);

};

program(7,11,0.5);
