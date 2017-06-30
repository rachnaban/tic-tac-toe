$(function() {
    var EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        wins = [7, 56, 448, 73, 146, 292, 273, 84],
        cell= $('.cell'),
        timeouts=[],

        placeSymbolOnBoard = function() {
            var tile = $(this);
            if (tile.html() !== EMPTY) {
                return;
            }
            if(turn=="X")
            {

            	tile.css('color','#ccc');
            }
            else{
            	tile.css('color','#000');
            }
            tile.html(turn);
            moves += 1;

            score[turn] += tile.data("val");
            if (winningMove(score[turn])) {
            	timeouts.push(setTimeout(function(){
           			alert(turn + " wins!");
	                startGame();
        		}, 1000));               
                
            } else if (moves == 9) {
                timeouts.push(setTimeout(function(){
           			alert("It is a draw!");
	                startGame();
        		}, 1000));
            } else {
                turn = turn === "X" ? "O" : "X";
            }
        };
    winningMove = function(score) {
            for (var i = 0; i < wins.length; i += 1) {
                if ((wins[i] & score) === wins[i]) {
                    return true;
                }
            }
            return false;
        },
        startGame = function() {
            turn = "X";
            score = {
                "X": 0,
                "O": 0
            };
            moves = 0;
            $('.cell').each(function() {
                $(this).html(EMPTY);
            });
            timeouts.forEach(function(timeout){clearTimeout(timeout)});
        };

    init = function() {
        cell.click(placeSymbolOnBoard);        
        startGame();
    };

    init();
});