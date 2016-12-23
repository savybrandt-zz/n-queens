// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rows = this.get(rowIndex);
      var length = rows.length;
      var count = 0;
      for (var i = 0; i < length; i++) {
        if (rows[i] === 1) {
          count++;
        } 
        if (count > 1) {
          return true;
        }
      }
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //use row function
      var rows = this.rows();
      //use length of the row
      var length = rows.length;
      //iterates through the row
      for (var i = 0; i < length; i++) {
        //check each row for conflicts using hasRowConflictAt func
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //get all rows
      var rows = this.rows();
      //to declare count variable
      var count = 0;
      //iterator through rows
      for (var i = 0; i < rows.length; i++) {
        //with each row going to check thie column index
        if (rows[i][colIndex] === 1) {
        //count increase
          count++;  
        } 
      //will check if count is grater then one if there are one more thing
        if (count > 1) {
        //if it is return true 
          return true;
        } 
      }
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //get all rows
      var rows = this.rows();
      //check the length of the first row to get board length
      var length = rows.length;
      //will iterator through the column on are board 
      for (var i = 0; i < length; i++) {
        //and will run call conflict add for each column
        //are result varialbe = result of hasCallConglictAt
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      //return result.  
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //get all rows
      var rows = this.rows();
      //check the length of the board
      var length = rows.length;
      //define a count variable
      var count = 0;
      //iterate through the rows
      for (var i = 0; i < length; i++) {
        //check the conflicts in the diagonal
        if (rows[i][i + majorDiagonalColumnIndexAtFirstRow]) {
          //inc the count
          count++;
        }
        //check if count is grater than 1
        if (count > 1) {
           //return true
          return true;
        }
      }
      return false; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //get rows
      var rows = this.rows();
      //check the langth of the row
      var columns = rows.length;
      //iterate through the rows
      for (var i = 1 - columns; i < columns; i++) {
        //check hasMajorDiagonalConflictAt
        if (this.hasMajorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
            //get all rows
      var rows = this.rows();
      //check the length of the board
      var length = rows.length;
      //define a count variable
      var count = 0;
      //iterate through the rows
      for (var i = 0; i < length; i++) {
        //check the conflicts in the diagonal
        if (rows[i][minorDiagonalColumnIndexAtFirstRow - i]) {
          //inc the count
          count++;
        }
        //check if count is grater than 1
        if (count > 1) {
           //return true
          return true;
        }
      }
      return false; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //get rows
      var rows = this.rows();
      //check the langth of the row
      var columns = rows.length;
      //iterate through the rows
      for (var i = columns * 2; i > 0; i--) {
        //check hasMinorDiagonalConflictAt
        if (this.hasMinorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
      return false; 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
