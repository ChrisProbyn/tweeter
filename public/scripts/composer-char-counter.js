$(document).ready(function() {

  //this checks that the length of the text area is less than 140 characters and length
  //if the text is longer than 140 the text will turn red and a error warning will show up

  $(".textBox").on("keyup", function() {
    var IsDisplayed = $(".errorMessage").css("display")
    if(140 - this.value.length >= 0 && IsDisplayed === "none"){
        $("textarea").removeClass("red");
      $(".counter").text(140 - this.value.length);
    } else if(140 - this.value.length >= 0 && IsDisplayed === "block"){
        $(".errorMessage").slideToggle("fast");
        $("textarea").removeClass("red");
      $(".counter").text(140 - this.value.length);
    } else if (IsDisplayed === "none"){
       $(".counter").text(140 - this.value.length)
       $("textarea").addClass("red");
       $(".errorMessage").text("Character length exceeded");
      $(".errorMessage").slideToggle("fast");
    }
    else{
      $(".counter").text(140 - this.value.length)
       $("textarea").addClass("red");
       $(".errorMessage").text("Character length exceeded");
    }
  });
});
