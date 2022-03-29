const gamePattern= [];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];

var description="The device creates a series of tones and lights and requires a user to repeat the sequence. If the user succeeds, the series becomes progressively longer and more complex. Once the user fails or the time limit runs out, the game is over."
var level=0;
var started = 0;

$("#start-btn").click(function() {
    
    if (started===0) {
        alert(description);
        $("#level-title").text("Level " + level);
        nextSequence();
        started = 1;
      }
      
  });
  

$('.btn').click(function(){
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
    
});


function nextSequence()
{
    userClickedPattern = [];
    level=level+1;

    $('h1').text("Level "+level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){

          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } 
      else {
  
        flashWrong();
        $("h1").text("Game Over! Click Button to Restart!");       
        startOver();
      }
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
    $('#'+currentColour).addClass("pressed");
    setTimeout(() => {
        $('#'+currentColour).removeClass("pressed");   
    }, 100);
}



function flashWrong()
{
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over"); 
    },100);

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

}

function startOver()
{
    started = 0;
    level=0;
    gamePattern=[];
}