$(document).ready(function() {


  $(".textBox").on("input", function() {
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
