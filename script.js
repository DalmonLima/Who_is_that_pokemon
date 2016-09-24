$(document).ready(function(){
  var life = 5;
  var points = 0;
  //Random pokemon function
  function getRandomPokemon() {
    return (Math.floor(Math.random() * 151) +1);
  }

  function makeQuestion(){
    var rdm = getRandomPokemon();

    $.ajax({
      url: 'json/pokemon.json',
      type: 'GET',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data){
        console.log(data.pokemon[rdm]);
        correctName = data.pokemon[rdm];
      },
      error: function(e) {
          console.log('Error!', e);
      }
    });
    console.log( rdm );
    $('#picture>img').remove();
    $('#picture').append('<img src="imagens/normal/'+rdm+'.png" />');
  }

  function confirm(){
    var answer = $('input#guess').val();

    if (answer.length === 0) {
      console.log("Please, insert a name!");
    }
    else {
      // console.log(answer);

      if ( answer === correctName) {
          points++;
          console.log("+1 Point, you have "+ points +" point(s)!");
          $("input#guess").val("");
          makeQuestion();
        }
      else {
        life--;
        console.log("-1 life, you have "+ life +" life(s)!");
        $("input#guess").val("");
        if (life>=0) {
          makeQuestion();
        }
        else {
          alert("Game Over!")
        }
      }
    }
  };

  makeQuestion();

  $('.button-primary').click(function(){
    confirm();
  });

  $(document).keypress(function(e) {
    if(e.which == 13) {
      confirm();
    }
  });


  // $('.button-primary').click(function(){
  //   var answer = $('input#guess').val();
  //
  //   if (answer.length === 0) {
  //     console.log("Please, insert a name!");
  //   }
  //   else {
  //     // console.log(answer);
  //
  //     if ( answer === correctName) {
  //         points++;
  //         console.log("+1 Point, you have "+ points +" point(s)!");
  //         makeQuestion();
  //       }
  //     else {
  //       life--;
  //       console.log("-1 life, you have "+ life +" life(s)!");
  //       if (life>=0) {
  //         makeQuestion();
  //       }
  //       else {
  //         alert("Game Over!")
  //       }
  //     }
  //   }
  // });

});
