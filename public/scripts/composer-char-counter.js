$(document).ready(function() {


  $(".textBox").on("input", function() {

    if(140 - this.value.length > 0){
        $("textarea").removeClass("red");
      $(".counter").text(140 - this.value.length);
    } else{
      $(".counter").text("0")
       $("textarea").addClass("red");
    }
  });
});
