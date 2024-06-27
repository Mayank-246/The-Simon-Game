let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[];
var started=false;

$(".btn").click(
    function(){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
);

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(
        function(){
            $("#"+currentColour).removeClass("pressed");
        }, 100
    );
}
var level=0;
function nextSequence()
{   level+=1;
    $("h1").text("Level "+level);
    userClickedPattern=[];
    var randomNumber=Math.floor(4*Math.random());
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    
}
function checkAnswer(currentlevel)
{
    if(userClickedPattern[currentlevel]===gamePattern[currentlevel])
       { console.log("true");
        if(currentlevel+1===level)
            setTimeout(
        function(){nextSequence();},
        1000);
       }
    else
    {
        var aud=new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");
        setTimeout(
            function()
            {
                $("body").removeClass("game-over");
            }, 200
        );
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver()
{
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    started=false;
}
$(Document).keypress(function()
{   if(!started)
    {$("h1").text("Level "+ level);
    nextSequence();
    started=true;}
    
});


