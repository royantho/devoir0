var COLORS = {
  FREE_SLOT:  { r: 255, g: 255, b: 255 }, // White
  WALL:       { r: 133, g: 113, b:  94 }, // Brown
  PRINCESS:   { r: 197, g:  83, b: 218 }, // Purple
  KNIGHT:     { r: 213, g:  12, b:  12 }, // Red
  BLUE_PATH:  { r: 118, g: 183, b: 246 }, // Blue
  GREEN_PATH: { r:  42, g: 255, b:  28 }, // Green
};
var a = 2;
var b = 2;
var creerMatrice = function (nbRangees, nbColonnes) {
var resultat = Array(nbRangees);
for (var i=0; i<nbRangees; i++) {
resultat[i] = Array(nbColonnes);
}
var y = 0;
while(y<nbColonnes){
    var x = 0;
while(x<nbRangees){
    
    resultat[x][y] = "-";
    x++;}
    y++;}
return resultat;
};
var grid = creerMatrice(a,b);

var drawGrid = function (grid){
setScreenMode (a,b);
var y=0;
    while (y<b){
        var x=0;
        while (x<a){
    setPixel(x,y,{ r: 255, g:255, b:255});
            x++;}
        y++;}
};

var addRandomWalls = function(grid, d){
    
    var y = 0;
    while (y < b){
        var x = 0;
        while (x < a){
    if (Math.random() < d){
    grid[x][y] = "m";
        setPixel(x,y,{ r: 133, g: 113, b:  94 });
   }
            x++;}
        y++;}
};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var xSlot = 0;
var ySlot = 0;
var findFreeSlot = function(){
    var tries = 0;
    var slot = 0;
    while(slot != "-" && tries < a*b){
    var x = randomIntFromInterval(0,a-1);
    var y = randomIntFromInterval(0,b-1);
        slot = grid[x][y];
    if(slot == "-"){
        xSlot = x;
        ySlot = y;
    }
        else{
        tries++;
            if(tries == a*b){
                return null;
            }
            continue;     
    }
    }
};

var posPrincesse=[];
var addCharacters = function(grid){
    
    findFreeSlot();
    grid[xSlot][ySlot] = "p";
    posPrincesse.push(xSlot,ySlot);
    setPixel(xSlot,ySlot,COLORS.PRINCESS);
    findFreeSlot();
    grid[xSlot][ySlot] = "c";
    setPixel(xSlot,ySlot,COLORS.KNIGHT);
};

function solution(){
    var xQueue = [xSlot];
    var yQueue = [ySlot];
    
    var pF=grid ;print(pF);
    
    var pathFound=false;
    
    var xLoc=xSlot;
    var yLoc=ySlot;
    pause()
    while (xQueue.length >0 && !pathFound) {
        xLoc = xQueue.shift();
    yLoc = yQueue.shift();
        
        
        print(pF);
        //princess pathfinding
        if (xLoc > 0) {              ///ou xSlot? ou posPrincesse[0]?  
            if (pF[xLoc-1][yLoc] == 'p') { 
                pathFound = true;
              break;
            }
        }
        
        if (xLoc < b-1) {
             
            if (pF[xLoc+1][yLoc] == 'p'){ 
                pathFound = true;
              break;
            }

        }
        
        if (yLoc > 0) {              ///ou xSlot? ou posPrincesse[0]?  
            if (pF[xLoc][yLoc-1] == 'p'){ 
                pathFound = true;
              break;
            }
        }
        //empty slots pathfinding
       if (yLoc < a-1) {
           
            if (pF[xLoc][yLoc+1] == 'p'){ 
                pathFound = true;
              break;
            }
        }
        
         if (xLoc > 0) {              ///ou xSlot? ou posPrincesse[0]?  
            if (pF[xLoc-1][yLoc] == '-') {
              xQueue.push(xLoc-1);
              yQueue.push(yLoc);
              pF[xLoc-1][yLoc]=pF[xLoc][yLoc]+ 'l';
                setPixel(xLoc-1,yLoc,COLORS.BLUE_PATH);
            }
        }
        
        if (xLoc < b-1) {              ///ou a?  
            if (grid[xLoc+1][yLoc] == '-'){
              xQueue.push(xLoc+1);
              yQueue.push(yLoc);
              pF[xLoc+1][yLoc]=pF[xLoc][yLoc]+ 'r';
                setPixel(xLoc+1,yLoc,COLORS.BLUE_PATH);
            }
        }
        if (yLoc > 0) {              ///ou xSlot? ou posPrincesse[0]?  
            if (grid[xLoc][yLoc-1] == '-') {
              xQueue.push(xLoc);
              yQueue.push(yLoc-1);
              pF[xLoc][yLoc-1]=pF[xLoc][yLoc] + 'u';
                setPixel(xLoc,yLoc-1,COLORS.BLUE_PATH);
            }
        
        }
        
       if (yLoc < a-1) {              ///ou b?  
            if (pF[xLoc][yLoc+1] == '-') {
              xQueue.push(xLoc);
              yQueue.push(yLoc+1);
              pF[xLoc][yLoc+1]=pF[xLoc][yLoc] + 'd';
                setPixel(xLoc,yLoc+1,COLORS.BLUE_PATH);
            }
        }
    }
    if (!pathFound) print('Pas de solution!');
  else {print('Solution trouvée');
          pause()
          var path = pF[xLoc][yLoc]; print(path); 
          var pathLength = path.length; print(pathLength);
          var currX = xSlot;
          var currY = ySlot;
          
          for (var i = 0 ; i < pathLength-1; i++) {
              if (path.charAt(i+1) == 'u') currY -=1;         
                if (path.charAt(i+1) == 'd') currY +=1;
                if (path.charAt(i+1) == 'l') currX -=1;
                if (path.charAt(i+1) == 'r') currX +=1;
              
                pF[currX][currY]= 'x';
                setPixel(currX,currY,COLORS.GREEN_PATH);
                
         }
          
              
    }
}    


  
drawGrid();

addRandomWalls(grid, 0.2);

findFreeSlot();

addCharacters(grid);

solution();








