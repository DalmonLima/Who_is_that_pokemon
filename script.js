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
    for (var i = 1; i < 5; i++)
    {
      $('input#option' + i).empty();
    }
  }

  function makeQuestion(){
    var rdmPokemonNumber = getRandomPokemon();
    var rdmPosition = getRandomAnswerPosition();

    $.ajax({
      url: 'json/pokemon.json',
      type: 'GET',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data){
        correctName = data.pokemon[rdmPokemonNumber];
        console.log("The Pokemon name is: " + correctName);
        console.log("The Pokemon number is: " + rdmPokemonNumber);
        $('input#option' + rdmPosition).val(correctName);

      },
      error: function(e) {
          console.log('Error!', e);
      }
    });

    $('#picture>img').remove();
    $('#picture').append('<img src="imagens/normal/'+rdmPokemonNumber+'.png" />');
  }

  function confirm(){
    var answer = $('.selected').val();

    if ( answer === correctName) {
        points++;
        console.log(answer +" is the right answer");
        console.log("+1 Point, you have "+ points +" point(s)!");
        $('.selected').removeClass("selected");
        // $('input.selected').val("CORRECT");
        clearOptions();
        makeQuestion();
      }
    else {
      life--;
      console.log(answer +" is not the answer.");
      console.log("-1 life, you have "+ life +" life(s)!");
      // $("input#guess").val("");
      if (life>=0) {
        clearOptions();
        makeQuestion();
      }
      else {
        alert("Game Over!")
      }
    }
  }

  makeQuestion();

  $('input').click(function(){
    $(this).addClass("selected");
    confirm();
  });

});
