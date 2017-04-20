var Path = function(startArray, endArray, board){
  //this.star = star;
  //this.end = end;
  //this.graph = "";
  this.result = [];
  this.times = 0;

  var grid = [];
  for (var y = 0; y < board.rows; y++ ) {
    grid[y] = [];
    for (var x = 0; x < board.cols; x++ ) {
      if (board.map[y][x] == "*") {
        grid[y][x] = 1;
      } else {
        grid[y][x] = 0;
      }
    }
  }

  //var grid = [[1,1,1,1],[0,0,0,1],[1,1,1,1],[0,1,1,1]];
  var graph = new Graph(grid, false),
  start = graph.grid[startArray[0]][startArray[1]],
  end = graph.grid[endArray[0]][endArray[1]],
  results = [],
  times = 0;

  var nodes = astar.search(graph, start, end);
  nodes.forEach(function(gridNode) {
    results.push([gridNode.x, gridNode.y]);
  });

  return results;
};

/*
var graph = new Graph(grid),
  start = graph.grid[0][0],
  end = graph.grid[3][1],
  results = [],
  times = 0;

var grid = [[1,1,1,1],
            [0,0,0,1],
            [1,1,1,1],
            [0,1,1,1]];

  console.log("RESULT:" + astar.search(graph, start, end));
*/
