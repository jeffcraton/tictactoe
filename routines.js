//
// game functions
//
var gamegrid = new Array(3);
var $tictacgame = {
    "gamegrid": document.getElementById("myCanvas"),
    "playerchar": "",
    "aichar": "",
    "issquaredone": function(xpos, ypos) {
        // alert("x:"+xpos + " y:" + ypos);
        var cellval = gamegrid[xpos][ypos];
        if(cellval != " ")
            return true;
        return false;
    },
    "drawbox": function(xpos, ypos) {
        //
        // draw 92x92 box
        //
        var cellsz = 92;
        var xco = 92*xpos;
        var yco = 92*ypos;
        var gridcontext = $tictacgame["gamegrid"].getContext("2d");
        gridcontext.fillRect(xco, yco, cellsz, cellsz);
        //
        // clear a 90x90 box centered within that box.
        //
        gridcontext.clearRect(xco+1, yco+1, cellsz-2, cellsz-2);
    },
    "drawempty": function(xpos, ypos){
        //
        // draw empty cell
        //
        $tictacgame["drawbox"](xpos, ypos);
        return;
    },
    "drawxcell": function(xpos, ypos){
        //
        // draw X cell
        //
        $tictacgame["drawbox"](xpos, ypos);

        var ctx = $tictacgame["gamegrid"].getContext("2d");
        var startX = 92*xpos;
        var startY = 92*ypos;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX+92, startY+92);        
        ctx.stroke();  

        ctx.beginPath();
        ctx.moveTo(startX+92, startY);    
        ctx.lineTo(startX, startY+92);         
        ctx.stroke();  
    },
    "drawocell": function(xpos, ypos){
        //
        // draw O cell
        //
        $tictacgame["drawbox"](xpos, ypos);

        var ctx = $tictacgame["gamegrid"].getContext("2d");
        ctx.beginPath();
        ctx.arc( (92*xpos) +46, (92*ypos) + 46, 46, 0, 2 * Math.PI);
        ctx.stroke();
    },
    "victorycheck": function() {
        //
        // vertical check
        //

        //
        // horizontal check
        //

        //
        // diagonal check
        //
        return false;
    },
    "drawgameboard": function() {
        //
        // clear canvas
        //
        var gridcontext = $tictacgame["gamegrid"].getContext("2d");
        gridcontext.clearRect(0, 0, $tictacgame["gamegrid"].width, $tictacgame["gamegrid"].height);
        //
        // draw game grid
        //
        for(var x=0; x< gamegrid.length; x++)
        {
            for(var y=0; y<gamegrid[x].length; y++)
            {
                switch(gamegrid[x][y])
                {
                    case " ":
                        $tictacgame["drawempty"](x, y);
                        break;

                    case "X":
                        $tictacgame["drawxcell"](x, y);
                        break;

                    case "O":
                        $tictacgame["drawocell"](x, y);
                        break;
                }
            }
        }
    },
    "initgame": function(zgrid){
        //
        // initialize game grid - draw 2d array, draw board based on array
        //
        for(var x=0; x< gamegrid.length; x++)
        {
            gamegrid[x] = new Array(3).fill(" ");
        }
        //
        // draw game grid on the screen.
        //
        $tictacgame["drawgameboard"]();        
        //
        // player should select X or O
        //
        if(zgrid != "X" && zgrid != "O")
            return;

        $tictacgame["playerchar"] = zgrid;

        if(zgrid == "X")
            $tictacgame["aichar"] = "O";
        else 
            $tictacgame["aichar"] = "X";
    },    
    "aimove": function() {
        return;
    },
    "handleplayerclick": function(xlocation, ylocation) {
        //
        // check to see if square is done. if so, refuse,
        // otherwise fill
        //
        var xm = parseInt(xlocation / 92);
        var ym = parseInt(ylocation / 92);
        var squaredone = $tictacgame["issquaredone"](xm, ym);
        if(squaredone) {
            alert("Cell has already been filled. Choose another.");
        }
        //
        // set value
        //
        gamegrid[xm][ym] = $tictacgame["playerchar"];        
        //
        // check for victory condition
        //

        //
        // perform AI move
        //
        $tictacgame["aimove"]();
        //
        // redraw game board
        //
        $tictacgame["drawgameboard"]();
    }
}
//
// setup game grid 
//
$( document ).ready(function() {
    $tictacgame["initgame"]();
});

$("#selectx").click(function() {
    $tictacgame["initgame"]("X");
});

$("#selecto").click(function() {
    $tictacgame["initgame"]("O");
});
//
// canvas onclick handler.
//
$("#myCanvas").click(function(e){
    mouseX = e.pageX - $("#myCanvas").offset().left;
    mouseY = e.pageY - $("#myCanvas").offset().top;
    //
    // call the click handler.
    //
    $tictacgame["handleplayerclick"](mouseX, mouseY);
});