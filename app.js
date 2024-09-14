////Navbar
const pomodoroNav = document.getElementById("pomodoroNav");
const shortBreakNav = document.getElementById("shortBreakNav");
const longBreakNav = document.getElementById("longBreakNav");

/////////////const for open and close settings
const settingsButton = document.getElementById("settings");
const shadow = document.getElementById("shadow");
const closeSettings = document.getElementById("closeSettings");
const settingsCard = document.getElementById("settingsCard");
///////////////// const for the form
const submitSettings = document.getElementById("saveSettings");
const form = document.getElementById("settingsCard");
///clock
const time = document.getElementById("time");
const state = document.getElementById("state");

///timers
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
///fonts
const font = document.getElementsByName("font");
const josefin = document.getElementById("josefin");
const barlow = document.getElementById("barlow");
const roboto = document.getElementById("roboto");

///colors
const color = document.getElementsByName("color");
const FirstColor = document.getElementById("FirstColor");
const SecondColor = document.getElementById("SecondColor");
const ThirdColor = document.getElementById("ThirdColor");

//////// atributes for the settings
let colorSelect = null;
let fontSelect = null;

let pomodoroTime = 25;
let shortBreakTime = 5;
let longBreakTime = 15;

let timer = [
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  shortBreakTime,
  pomodoroTime,
  longBreakTime,
];
let timerState = 0;

////////Set the clock
let minute = timer[timerState] - 1;
let second = 60;
let stop = true;
/////////// set time on the begin
setTimer(minute, second);
/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
/////Chage the text and state
state.addEventListener("click", () => {
  pause();
});

function pause() {
  if (stop) {
    state.textContent = "PAUSE";
    stop = false;
  } else {
    state.textContent = "START";
    stop = true;
  }
}

///////////////////////////////////////////////
//////////////////////////////////////////////
////////////Code the form in settings card ///
//////////////////////////////////////////////
//////////////////////////////////////////////

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ///close the settings
  shadow.style.display = "none";
  settingsCard.style.display = "none";
  ////////////// change the settings
  //////select the timer
  pomodoroTime = pomodoro.value;
  shortBreakTime = shortBreak.value;
  longBreakTime = longBreak.value;

  let timer = [
    pomodoroTime,
    shortBreakTime,
    pomodoroTime,
    shortBreakTime,
    pomodoroTime,
    shortBreakTime,
    pomodoroTime,
    longBreakTime,
  ];

  timerState = 0;

  ////chage the clock time
  minute = timer[timerState];
  second = 60;
  stop = true;
  setTimer(minute, second);

  //////select the color
  for (let i = 0; i < color.length; i++) {
    if (color[i].checked) {
      colorSelect = color[i].value;
      break;
    }
  }
  ////////select the font
  for (let i = 0; i < font.length; i++) {
    if (font[i].checked) {
      fontSelect = font[i].value;
      break;
    }
  }
  //////Aplly the changes
  document.documentElement.style.setProperty("--main-color", colorSelect);
  document.documentElement.style.setProperty("--text", fontSelect);
});

/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////////open the settings
settingsButton.addEventListener("click", () => {
  shadow.style.display = "block";
  settingsCard.style.display = "grid";
});

///////// close the settings
closeSettings.addEventListener("click", () => {
  shadow.style.display = "none";
  settingsCard.style.display = "none";
});


//////////////////////////////////////
///////////Nav State

function navChange(navProgres) {

  let navState = [
    "pomodoroNav",
    "shortBreakNav",
    "pomodoroNav",
    "shortBreakNav",
    "pomodoroNav",
    "shortBreakNav",
    "pomodoroNav",
    "longBreakNav",
  ];

  if (navState[navProgres] == "pomodoroNav") {
    pomodoroNav.classList.add("navbar__list--active");
    shortBreakNav.classList.remove("navbar__list--active");
    longBreakNav.classList.remove("navbar__list--active");
  } else if (navState[navProgres] == "shortBreakNav") {
    pomodoroNav.classList.remove("navbar__list--active");
    shortBreakNav.classList.add("navbar__list--active");
    longBreakNav.classList.remove("navbar__list--active");
  } else if (navState[navProgres] == "longBreakNav") {
    pomodoroNav.classList.remove("navbar__list--active");
    shortBreakNav.classList.remove("navbar__list--active");
    longBreakNav.classList.add("navbar__list--active");
  }
}





////////////////////////////////////////////////////////
/////lo que hace es reiniciar los segundos cuando se termina el minuto
//// y bajarle un minuto y cuando lleguen a cero acaba con el contador
let clock = setInterval(() => {
  if (!stop) {
    second--;
    setTimer(minute, second);
    if (second == 0) {
      minute--;
      second = 5;

      if (minute < 0) {
        pause();
        timerState++;
        navChange(timerState);
        minute = timer[timerState];
        second = 1;
        setTimer(minute, second);

        if (timerState == 8) {
          timerState = 0;
        }
      }
    }
  }
}, 1000);

function setTimer(minute, second) {
  let timer = `${minute}:${second}`;

  time.textContent = timer;
}
