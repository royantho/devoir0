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

var grid = createGrid(4,8);

var drawGrid= function(grid) {
    var l=grid[0].length + 1;
    var	h=grid.length + 1;
    setScreenMode(l,h);
    for(var i = 0; i<h; i++) {
        for(var j=0; j<l; j++) {
        setPixel(j, i, COLORS.WALL);
        }
        
    }
};
var grid = createGrid(3,4);
drawGrid(grid);



