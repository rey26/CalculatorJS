$(document).ready(function() {
  var pressed=0; //Pressed DIGITS in one row(w/o operators1)
  var pressedOverall=0;
  var inputs=[""];
  var totalString="";
  var operators1=["+", "-", "*", "/"];
  var operators2=["."];
  var nums=[1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  var ce=false;

  function getValue(input) {
    if (operators2.includes(inputs[inputs.length-1]===true && input===".")) {
      console.log("Duplicate '.' use");
    }else if (inputs.length===1 && operators1.includes(input)===false) {
      inputs.push(input);
      update();
    }else if(operators1.includes(inputs[inputs.length-1])===false){
      inputs.push(input);
      update();
    }else if (nums.includes(Number(input))) {
      inputs.push(input);
      update();
    }

  }

  function update(ce=false, cein) {
    if(pressedOverall===1){$("#output").html("");}

    if(ce==false){

      if(operators1.includes(inputs[inputs.length-1])){
        $("#output").html(inputs[inputs.length-1]);
        $("#history").html(totalString);

      }else{
        totalString=inputs.join("");
        $("#output").append(inputs[inputs.length-1]);
        $("#history").html(totalString);
        }
    }else if (ce==true) {
        $("#output").html(cein);
        ce=false;
        $("#history").html(totalString);
      }
  }

  function getTotal() {
    totalString=inputs.join("");
    $("#output").html(eval(totalString));
    $("#history").html(eval(totalString));
  }

  function deleteAll(){
    pressed=0;
    pressedOverall=0;
    inputs=[""];
    update();
    $("#history").html("0");
    $("#output").html("0");
  }

  function digitLimit(){
    $("#output").html("0");
    $("#history").html("TOO MANY DIGITS");
    setTimeout(function(){ deleteAll()}, 5000);
  }

  $("button").click(function(){
    if(this.id==="deleteAll"){
      deleteAll();
    }
    else if (this.id==="stepBack") {
      inputs.pop();
      var val=$("#output").html();
      val=val.slice(0, -1);
          update(true, val);
    }
    else if (this.id==="equals") {
      getTotal();
    }else{
      pressedOverall++;
      if(pressedOverall==24){
        digitLimit();
      }else{
      if (inputs[inputs.length-1]===0)inputs[0]="";
      var value=$(this).html();
      if (inputs[inputs.length-1].indexOf("+", "-", "*", "/")===-1) {
        getValue(value);
        pressed++;
        if(pressed>9){
          digitLimit();
      }
        }else {
          pressed=0;
          getValue(value);
        }
      }
    }
  })
})
