$(document).ready(function(){
  var life = 3;
  var points = 0;
  var correctName;

  //Select random pokemon
  function getRandomPokemon() {
    return (Math.floor(Math.random() * 151) +1);
  }

  //Define position of the right answer
  function getRandomAnswerPosition() {
    return (Math.floor(Math.random() * 4) +1);
  }

  //Clear all option state
  function clearOptions() {
    var i = 1
    while (i<=4) {
      $('input#option' + i).val("").removeClass("right wrong");
      $('input.selected').removeClass("selected");
      i++;
    }
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
        // makeQuestion();
      }

      choose();
    }));
  }

  //Make a question
  function makeQuestion(){
    $('#picture>img').remove();

    var numberPokeAnswer = getRandomPokemon();
    var rdmPosition = getRandomAnswerPosition();
    var options = generateOptions();
    console.log(options);

    $.ajax({
      url: 'json/pokemon.json',
      type: 'GET',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data){
        correctName = data.pokemon[numberPokeAnswer];
        // TO CHECK THE RIGHT INFO ABOUT THE POKEMON
        console.log("The Pokemon name is: " + correctName);
        // console.log("The Pokemon number is: " + numberPokeAnswer);
        $('input#option' + rdmPosition).val(correctName);
        for (var i = 0; i < 3; i++) {
          var temp = options[i];
          var wrongName = data.pokemon[temp];
          console.log(wrongName);
          var check = $('input#option'+ (i+1)).val();
            if (check != correctName){
              $('input#option' + (i+1)).val(wrongName);
            }
            else{
              $('input#option4').val(wrongName);
            }
        }
      },
      error: function(e) {
          console.log('Error!', e);
      }
    });

    $('#picture').append('<img src="imagens/normal/'+numberPokeAnswer+'.png" />');
    mark();
  }

  function choose(){
    var answer = $('.selected').val();

    if ( answer === correctName) {
        points++;
        $('input.selected').val("CORRECT").addClass("right");
      }
    else {
      life--;
      console.log("-1 life, you have "+ life +" life(s)!");
      $('input.selected').val("INCORRECT").addClass("wrong");
      if (life<0) {
        alert("Game Over!");
      }
    }
  }


  //Beggin the game!
  clearOptions();
  makeQuestion();


  $('.next button').click(function(){
    clearOptions();
    makeQuestion();
  });

});
