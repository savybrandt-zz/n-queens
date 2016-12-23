/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var boardObject = new Board({n: n});
  var board = boardObject.rows();

  // //go through each row
  var findSolution = function(row) {
    if (row === n) {
      //if we go through every row, stop
      return;
    }
  //   //go through each column in row
    for (var i = 0; i < n; i++) {
  //     //place our rook
      boardObject.togglePiece(row, i);
  //     //check for any  conflicts  
      if (!boardObject.hasAnyRooksConflicts()) {
        //if no conflicts keep going
        findSolution(row + 1);  
  //     //if there are conflicts take the rook off that spot
      } 
      boardObject.togglePiece(row, i);
    }
  };
  findSolution(0);
  var solution = board;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};
  
  // for (var row = 0; row < board.length; row++) {
  //   var currentRow = board[row];
  //   for (var column = 0; column < currentRow.length; column++) {
  //     boardObject.togglePiece(row, column);
  //     if (boardObject.hasAnyRooksConflicts()) {
  //       boardObject.togglePiece(row, column);
  //     } else {
  //       //if there arent any conflicts, keep our rook where it is and stop inner loop
  //       break;
  //     }
  //   }
  // } 

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  // //go through each row
  var findSolution = function(row) {
    if (row === n) {
      solutionCount++;
      //if we go through every row, stop
      return;
    }
  //   //go through each column in row
    for (var i = 0; i < n; i++) {
  //     //place our rook
      board.togglePiece(row, i);
  //     //check for any  conflicts  
      if (!board.hasAnyRooksConflicts()) {
        //if no conflicts keep going
        findSolution(row + 1);  
  //     //if there are conflicts take the rook off that spot
      } 
      board.togglePiece(row, i);
    }
  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var boardObject = new Board({n: n});
  var board = boardObject.rows();

  // //go through each row
  var findSolution = function(row) {
    if (row === n) {
      //if we go through every row, stop
      return;
    }
  //   //go through each column in row
    for (var i = 0; i < n; i++) {
  //     //place our rook
      boardObject.togglePiece(row, i);
  //     //check for any  conflicts  
      if (!boardObject.hasAnyQueensConflicts()) {
        //if no conflicts keep going
        findSolution(row + 1);  
  //     //if there are conflicts take the rook off that spot
      } 
      boardObject.togglePiece(row, i);
    }
  };
  findSolution(0);
  var solution = board;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  // //go through each row
  var findSolution = function(row) {
    if (row === n) {
      solutionCount++;
      //if we go through every row, stop
      return;
    }
  //   //go through each column in row
    for (var i = 0; i < n; i++) {
  //     //place our rook
      board.togglePiece(row, i);
  //     //check for any  conflicts  
      if (!board.hasAnyQueensConflicts()) {
        //if no conflicts keep going
        findSolution(row + 1);  
  //     //if there are conflicts take the rook off that spot
      } 
      board.togglePiece(row, i);
    }
  };
  findSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
