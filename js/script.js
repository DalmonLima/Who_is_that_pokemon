$(document).ready(function(){
  // var $ = global.jQuery = require('jquery');

  //Select random pokemon
  function getRandomPokemon() {
    return (Math.floor(Math.random() * 151) +1);
  }

  //Define position of the right answer
  function getRandomAnswerPosition() {
    let rightPosition = Math.floor(Math.random() * 4) +1;
    console.log('a opção correta é a :' + rightPosition);
    return rightPosition;
  }

  //Clear all options state
  function clearOptions() {
    var i = 1
    while (i<=4) {
      $('input#option' + i).val("").removeClass("right wrong");
      $('input.selected').removeClass("selected");
      i++;
    }
    $('#next').hide();
  }

  //Generate wrong answers
  function generateOptions(){
    var arrayOpt = [];
    for (var i = 0; i < 3; i++) {
      opt = getRandomPokemon();
      arrayOpt.push(opt);
    }
    return arrayOpt;
  }

  //Select one answer
  function mark(){
    $('.answer-option input').on("click",(function(){
      $(".selected").removeClass("selected");
      $(this).addClass("selected");

      if($('.selected')){
        $('input').off("click");
      }
      choose();
      $('#next').show();
      $('#skip').hide();
    }));
  }

  //Make a question
  function makeQuestion(){
    $('#skip').show();
    $('#picture>img').remove();

    var numberPokeAnswer = getRandomPokemon();
    var rdmPosition = getRandomAnswerPosition();
    var options = generateOptions();
    console.log(options);

    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      correctName = data.results[numberPokeAnswer - 1].name;
      console.log(correctName);
        // TO CHECK THE RIGHT INFO ABOUT THE POKEMON
        console.log("The Pokemon name is: " + correctName);
        // console.log("The Pokemon number is: " + numberPokeAnswer);
        $('input#option' + rdmPosition).val(correctName);
        for (var i = 0; i < 3; i++) {
          var temp = options[i];
          var wrongName = data.results[temp].name;
          console.log(wrongName);
          var check = $('input#option'+ (i+1)).val();
            if (check != correctName){
              $('input#option' + (i+1)).val(wrongName);
            }
            else{
              $('input#option4').val(wrongName);
            }
        };
      console.log(data);
    })
    .catch(err => console.error(err));

    $('#picture').append('<img src="imagens/normal/'+numberPokeAnswer+'.png" />');
    mark();
  }

  function choose(){
    answer = $('.selected').val();
    
    if ( answer === correctName) {
        points++;
        $('#points').html(points);
        $('input.selected').addClass("right");
      }
    else {
      life--;
      $('#life').html(life);
      console.log("-1 life, you have "+ life +" life(s)!");
      $('input.selected').addClass("wrong");
      if (life<1) {
        alert("Game Over!");
      }
    }
  };
  
  function skipping(){
    skips--;
    $('#skips').html(skips);
    if (skips<1) {
      $('#skip').hide();
    }
  };

  //Beggin the game!
  let life = 5;
  let skips = 3;
  let points = 0;
  let correctName;
  let answer = null;

  $('#points').html(points);
  $('#skips').html(skips);
  $('#life').html(life);
  clearOptions();
  makeQuestion();
  
  $('#skip').click(function(){
    clearOptions();
    makeQuestion();
    skipping()
  });

  $('#next').click(function(){
    clearOptions();
    makeQuestion();
  });

});
