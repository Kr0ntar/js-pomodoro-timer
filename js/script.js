var time = document.querySelector('.time');
var session = document.querySelector('#session');
var rest = document.querySelector('#rest');
var round = document.querySelector('#round');
var startBtn = document.querySelector('#start-btn');
var sound = document.querySelector('#play');
// var sessionLength = session.value;
// var breakLength = rest.value;
// var roundCount = round.value;

startBtn.addEventListener('click', timer, false);

function timer() {
  // var sessionLength = session.value;
  // var breakLength = rest.value;
  var roundCount = round.value;

  sessionTime();

  function sessionTime() {
    var sessionLength = session.value;
    var timer = setInterval(function() {
          time.innerHTML = ":" + "0" + sessionLength;
          console.log(sessionLength);
          sessionLength--;
          if(sessionLength < 0) {
            clearInterval(timer);
            breakTime();
          } 
        }, 1000);
  }

  function breakTime() {
    var breakLength = rest.value;  
    var timer = setInterval(function() {
          time.innerHTML = ":" + "0" + breakLength;
          console.log(breakLength);
          breakLength--;
          if(breakLength < 0) {
            clearInterval(timer);
            rounds();
          }
        }, 1000);
  }

  function rounds() {
    // console.log(roundCount);
    if(roundCount > 1) {
      roundCount--;
      sessionTime();
      // roundCount--;
    } else {
      time.innerHTML = "End";
      sound.play();
      console.log("Finished!");
      return;
    }
  }
}