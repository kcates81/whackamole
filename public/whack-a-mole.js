$(document).ready(function() {
    "use strict";

    // this is a global variable that contains an array of the IDs where the mole will randomly appear
    var moles = ['#mole-1', '#mole-2', '#mole-3', '#mole-4', '#mole-5', '#mole-6', '#mole-7', '#mole-8', '#mole-9'];

    // these are global variables that I will use in my code 
    var moleIndex, mole, start;
    var count = 0;
    var moleTurn;
    var interval;
    var timerInterval;

    function checkClick(event){
        console.log('Check click is running!');
        // this checks the id of the square that was randomly generated against the id of the square the user clicks
        var id = event.target.id;                    
        
        if ('#' + id == mole) {
            count++;
            
            // This adds the score above the game board 
            $('#score').html('<h3>' + count + '</h3');  
            
            // stops reading clicks
            $('.square').off(); 
        }    
    };

    // this function randomly selects a square where the mole will appear 
    function moleSquare(){

        interval = 2000; // interval time in milliseconds (game starts to have issues if the interval is faster)
        var randomMole = 0;

        moleTurn = setInterval(function () {
            // This sets the mole to 0 and causes the background color to be white 
            mole = moles[randomMole];
            $(mole).css('background-color', 'white').fadeOut(interval/2);

            // This is the randomizer 
            randomMole = Math.floor((Math.random() * moles.length));
            
            // This reassigns the value of the mole variable to the randomMole value 
            mole = moles[randomMole];

            // This inserts the mole picture into the square the randomizer selected
            $(mole).css('background-size', 'cover');
            $(mole).css('background-image', 'url(/mole.jpg)').fadeIn(interval/2);

            // stops reading clicks
            $('.square').off();

            //This attaches my event listener that will listen for clicks again
            $('.square').click(checkClick);

        }, interval);
    };

     // This is the timer
    function timer() {
        start = 0
       
        timerInterval = setInterval(function() {
            if (start < 30) {
                start++;
                $('#timer').html('<h3>' + start + " Seconds" + '</h3>');
            } else {
                // turns off game
                clearInterval(moleTurn);

                // stops reading clicks
                $('.square').off();

                // This stores the high score at the end of the game
                $('#high-score').html('<h3>High Score: ' + count + '</h3');  

                // This clears the score above the game board 
                $('#score').html('<h3> </h3'); 

                // This tells the user that the game is over
                $('#game-messages').html('<h3>Game Over</h3>');

                // This clears the mole pictures once game is over
                $(mole).css('background-color', 'white').fadeOut(interval/2);

                // This clears the timer (fixes issue that had the timer speed up when start was clicked again)
                clearInterval(timerInterval);

            }
        }, 1000);
    };

    // This click event starts the game when the start button is pressed
    function clickStart() {
        $('#start').click(function (event) {
        // This starts the game when the start button is clicked
        moleSquare();

        // This starts the timer when the start button is clicked
        timer();
        });
    };

    // This calls the clickStart function
    clickStart();

});