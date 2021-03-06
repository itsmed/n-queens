// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        //console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        //console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        //console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
      function cases(array){
        var indices = [];
        var element = 1;
        var idx = array.indexOf(element);
        while (idx != -1) {
          indices.push(idx);
          idx = array.indexOf(element, idx + 1);
          }
          return indices;
        }
        
        var gameBoard = this.rows();
        if(cases(gameBoard[rowIndex]).length > 1){
          return true;
        }
        return false;
    
    },


    hasAnyRowConflicts: function() {
      for(var i = 0 ; i < this.rows().length ; i++){
       if(this.hasRowConflictAt(i)){
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
      function cases(array){
        var indices = [];
        var element = 1;
        var idx = array.indexOf(element);
        while (idx != -1) {
          indices.push(idx);
          idx = array.indexOf(element, idx + 1);
          }
          return indices;
        }
        colIndex = colIndex || 0;
        // var gameBoard = this.rows();
        // var indicesOfThePieces = [];
        // var testThis = []
        // var conflictCol =[]
        // for(var i = 0 ; i < gameBoard.length ; i++){
        //   indicesOfThePieces.push(cases(gameBoard[i]))
        // }
        //indicesOfThePieces === [[0], [], [0], []];
        // for(var j = 0 ; j < indicesOfThePieces.length ; j++){
        //   for(var h = 0 ; h < indicesOfThePieces[j].length ; h++){
        //     testThis.push(indicesOfThePieces[j][h]);
        //   }
        // }
        // //testThis === [0, 0]
        // for(var k = 0 ; k < testThis.length ; k++){
        //   testThis = testThis.sort();
        //   if(testThis[k] === testThis[k + 1]){
        //     conflictCol.push(testThis[k]);

        //   }
        // }
        // //conflictCol === [0]

        // for(var L = 0 ; L < conflictCol.length ; L++){
        //   if(colIndex === conflictCol[L]){
        //     return true;
        //   }
        // }
        var gameBoard = this.rows();
        var indicesOfThePieces = [];
        var testThis = [];
        //gameBoard === [[1, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]
        for(var i = 0 ; i < gameBoard.length ; i++){
          indicesOfThePieces.push(cases(gameBoard[i]));
          //indicesOfThePieces === [[0], [], [0], []]
          for(var j = 0 ; j < indicesOfThePieces[i].length ; j++ ){
            testThis.push(indicesOfThePieces[i][j])
            //testThis === [0, 0]
            }

        }
          testThis = testThis.sort()
          for(var k = 0 ; k < testThis.length ; k++){
            //check to see if the input column has items in it
            if(testThis[k] === colIndex){
              //if the detected value is repeated, return a boolean.
              if(testThis[k] === this[k + 1] || testThis[k] === testThis[k - 1]){

              return true;
              }
            }
          }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
     
        if(this.hasColConflictAt()){
          return true;
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
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
