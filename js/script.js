var time = document.querySelector('#time');
var timerDisplay = document.querySelector('#timer');
var roundDisplay = document.querySelector('#round-display');
var currentRound = document.querySelector('#current-round');
var totalRounds = document.querySelector('#total-rounds');
var inputs = document.querySelector('#inputs');
var controlBtns = document.querySelector('#btn-controls');
var msgBlank = document.querySelector('#msg-blank');
var msgInvalid = document.querySelector('#msg-invalid');
var backBtnDiv = document.querySelector('#back-btn-div');
var sessionZero = document.querySelector('#session-zero');
var roundZero = document.querySelector('#round-zero');
var session = document.querySelector('#session');
var rest = document.querySelector('#rest');
var round = document.querySelector('#round');
var sessionMinus = document.querySelector('#session-minus');
var sessionPlus = document.querySelector('#session-plus');
var breakMinus = document.querySelector('#break-minus');
var breakPlus = document.querySelector('#break-plus');
var roundMinus = document.querySelector('#round-minus');
var roundPlus = document.querySelector('#round-plus');
var startBtn = document.querySelector('#start-btn');
var stopBtn = document.querySelector('#stop-btn');
var pauseBtn = document.querySelector('#pause-btn');
var backBtn = document.querySelector('#back-btn');
var clockTick = document.querySelector('#clock-tick');
var intervalBeep = document.querySelector('#interval-beep');
var endBeep = document.querySelector('#end-beep');
var currentRoundCount = 0;
var roundCounter = 1;

startBtn.addEventListener('click', function() {
  if(isNaN(session.value) || (isNaN(rest.value)) || (isNaN(round.value))) {
      timerDisplay.style.display = "none";
      controlBtns.style.display = "none";
      msgInvalid.style.display = "block";
      backBtnDiv.style.display = "block";
      inputs.style.display = "none";
      return false;
  }  else if(session.value == "" || rest.value == "" || round.value == "") {
      timerDisplay.style.display = "none";
      controlBtns.style.display = "none";
      msgBlank.style.display = "block";
      backBtnDiv.style.display = "block";
      inputs.style.display = "none";
      return false;
  } else if(session.value == "0") {
      timerDisplay.style.display = "none";
      controlBtns.style.display = "none";
      sessionZero.style.display = "block";
      backBtnDiv.style.display = "block";
      inputs.style.display = "none";
      return false;
  } else if(round.value == "0") {
      timerDisplay.style.display = "none";
      controlBtns.style.display = "none";
      roundZero.style.display = "block";
      backBtnDiv.style.display = "block";
      inputs.style.display = "none";
      return false;
  } else {
      roundDisplay.style.display = "block";
      this.disabled = true;
      session.disabled = true;
      rest.disabled = true;
      round.disabled = true;
      sessionMinus.disabled = true;
      sessionPlus.disabled = true;
      breakMinus.disabled = true;
      breakPlus.disabled = true;
      roundMinus.disabled = true;
      roundPlus.disabled = true;
      currentRound.textContent = round.value - (round.value - 1);
      totalRounds.textContent = round.value;
      intervalBeep.play();
      timerFunc();
  }
}, false);

stopBtn.addEventListener('click', function() {
  clearFields();
});

backBtn.addEventListener('click', function() {
  timerDisplay.style.display = "block";
  controlBtns.style.display = "block";
  inputs.style.display = "block";
  msgInvalid.style.display = "none";
  msgBlank.style.display = "none";
  sessionZero.style.display = "none";
  roundZero.style.display = "none";
  backBtnDiv.style.display = "none";
});


sessionMinus.addEventListener('click', function() {
  if(session.value == "1") {
    return false;
  }
  session.value = minusTime(session.value);
});

sessionPlus.addEventListener('click', function() {
  session.value = addTime(session.value);
});

breakMinus.addEventListener('click', function() {
  rest.value = minusTime(rest.value);
});

breakPlus.addEventListener('click', function() {
  if(rest.value == "") {
    rest.value = "0";  
  } else {
    rest.value = addTime(rest.value);
  }
});

roundMinus.addEventListener('click', function() {
  if(round.value == "1") {
    return false;
  }
  round.value = minusTime(round.value);
});

roundPlus.addEventListener('click', function() {
    round.value = addTime(round.value);
});


function timerFunc() {
  var roundCount = round.value;

  sessionTime();

  function sessionTime() {
    var sessionLength = session.value;
    
    var timer = setInterval(function() {
      time.innerHTML = formattedTime(sessionLength);
      sessionLength--;
      stopBtn.addEventListener('click', function() {
        clearFields();
        clearInterval(timer);
      });
      if(sessionLength < 0 && roundCount <= 1) {
        clearInterval(timer);
        rounds();
      }
      if(sessionLength < 0 && roundCount > 1) {
        intervalBeep.play();
        clearInterval(timer);
        breakTime();
      }
    }, 1000);
  }

  function breakTime() {
    var breakLength = rest.value;  
    var timer = setInterval(function() {
      time.innerHTML = formattedTime(breakLength);
      breakLength--;
      stopBtn.addEventListener('click', function() {
        clearFields();
        clearInterval(timer);
      });
      if(breakLength < 0) {
        intervalBeep.play();
        clearInterval(timer);
        rounds();
      }
    }, 1000);
  }

  function rounds() {
    console.log(roundCount);
    if(roundCount > 1) {
      roundCount--;
      roundCounter++;
      currentRoundCount = round.value - (round.value - roundCounter);
      currentRound.textContent = currentRoundCount;
      sessionTime();
    } else {
      clearFields();
      endBeep.play();
    }
  }

  function formattedTime(time) {
    var seconds = Math.round(time);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(seconds / 3600);

    if(minutes > 0) {
      seconds -= minutes * 60; 
    }
    if(hours > 0) {
      minutes -= hours * 60;
    }
    if(seconds.toString().length === 1) {
      seconds = '0' + seconds;
    }
    if(minutes.toString().length === 1) {
      minutes = '0' + minutes;
    }
    if(hours.toString().length === 1) {
      hours = '0' + hours;
    }
    return hours + ':' + minutes + ':' + seconds;
 }
}

function minusTime(fieldValue) {
  if(fieldValue == "") {
    return fieldValue = "";
  } else if(fieldValue == 0) {
    return fieldValue = "0";
  } else {
    return fieldValue = parseInt(fieldValue) - 1;
  }
}

function addTime(fieldValue) {
  if(fieldValue == "") {
    return fieldValue = "1";
  } else {
    return fieldValue = parseInt(fieldValue) + 1;
  }
}

function clearFields() {
  session.value = "";
  rest.value = "";
  round.value = "";
  time.textContent = "00:00:00";
  roundDisplay.style.display = "none";
  startBtn.disabled = false;
  session.disabled = false;
  rest.disabled = false;
  round.disabled = false;
  sessionMinus.disabled = false;
  sessionPlus.disabled = false;
  breakMinus.disabled = false;
  breakPlus.disabled = false;
  roundMinus.disabled = false;
  roundPlus.disabled = false;
}