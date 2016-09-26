$(document).ready(function(){
  var life = 100;
  var points = 0;
  //Random pokemon function
  function getRandomPokemon() {
    return (Math.floor(Math.random() * 151) +1);
  }

  function getRandomAnswerPosition() {
    return (Math.floor(Math.random() * 4) +1);
  }

  function clearOptions() {
    var i = 1
    while (i<=4) {
      $('input#option' + i).val("").removeClass("selected right wrong");
      $('input.selected').removeClass("selected");
      $('input.selected').removeClass("selected");
      i++;
    }
  }

  function generateOptions(){
    var vetOpt = [];
    for (var i = 0; i < 3; i++) {
      opt = getRandomPokemon();
      vetOpt.push(opt);
    }
    return vetOpt;
  }

  function select(){
    $('input').on("click",(function(){
      $(this).addClass("selected");
      choose();
      if($('.selected')){
        $('input').off("click");
      }
    }));
  }


  function makeQuestion(){
    var NumberPokeAnswer = getRandomPokemon();
    var rdmPosition = getRandomAnswerPosition();
    console.log(rdmPosition);
    var options = generateOptions();
    console.log(options);

    $.ajax({
      url: 'json/pokemon.json',
      type: 'GET',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data){
        correctName = data.pokemon[NumberPokeAnswer];
        // TO CHECK THE RIGHT INFO ABOUT THE POKEMON
        // console.log("The Pokemon name is: " + correctName);
        // console.log("The Pokemon number is: " + NumberPokeAnswer);
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
          // for (var i = 1; i < 5; i++) {
          //   var check = $('input#option'+ i ).val();
          //   if (check != wrongName){
          //     $('input#option' + i).val(wrongName);
          //   }
          // }
        }
      },
      error: function(e) {
          console.log('Error!', e);
      }
    });

    $('#picture>img').remove();
    $('#picture').append('<img src="imagens/normal/'+NumberPokeAnswer+'.png" />');
  }

  function choose(){
    var answer = $('.selected').val();

    if ( answer === correctName) {
        points++;
        console.log(answer +" is the right answer");
        console.log("+1 Point, you have "+ points +" point(s)!");
        $('input.selected').val("CORRECT").addClass("right");
        // $('input.selected').removeClass("selected");
        // clearOptions();
      }
    else {
      life--;
      console.log(answer +" is not the answer.");
      console.log("-1 life, you have "+ life +" life(s)!");
      $('input.selected').val("INCORRECT").addClass("wrong");

      if (life<0) {
        alert("Game Over!");
      }
    }
  }


  //Beggin the game!
  makeQuestion();
  select();


  $('button').click(function(){
    clearOptions();
    makeQuestion();
  });

});
