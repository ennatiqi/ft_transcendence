

// changing the highligth of buttons
var buttons = document.querySelectorAll(".btn-option");
buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
        buttons.forEach(function(btn_rem){
            btn_rem.classList.remove("btn-highlight");
            btn_rem.classList.add('btn-simple');
        });
        this.classList.remove('btn-simple')
        this.classList.add("btn-highlight");
    });
});

var todash = document.querySelectorAll('.nav-options .todash');
var togame = document.querySelectorAll('.nav-options .togame');
var tochat = document.querySelectorAll('.nav-options .tochat');
var dash = document.querySelectorAll('.center-console .dash');
var chat = document.querySelectorAll('.center-console .chat');
var game = document.querySelectorAll('.center-console .game');

todash.forEach(function(button) {
  button.addEventListener('click', function() {
    var centerConsoleObjects = document.querySelectorAll('.center-console *');
    centerConsoleObjects.forEach(function(element) {
      element.style.display = 'none';
    });
    dash.forEach(function(element) {
      element.style.display = 'block';
    });
  });
});

togame.forEach(function(button) {
  button.addEventListener('click', function() {
    var centerConsoleObjects = document.querySelectorAll('.center-console *');
    centerConsoleObjects.forEach(function(element) {
      element.style.display = 'none';
    });
    game.forEach(function(element) {
      element.style.display = 'block';
    });
  });
});

tochat.forEach(function(button) {
  button.addEventListener('click', function() {
    var centerConsoleObjects = document.querySelectorAll('.center-console *');
    centerConsoleObjects.forEach(function(element) {
      element.style.display = 'none';
    });
    chat.forEach(function(element) {
      element.style.display = 'block';
    });
  });
});
