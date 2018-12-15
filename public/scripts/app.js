/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //this will create and return a tweet html article
  function createTweetElement(tweetData){
    var header = createTweetHeader(tweetData);
    var body = createTweetBody(tweetData);
    var footer = createTweetFooter(tweetData);
    return $("<article class='oldTweets'></article>").append(header,body,footer);
  }
  // this creates the header from the compose tweet form
  //I used .text() to protect from xss and manually put in the class to make it less error prone
  function createTweetHeader(tweetData){
    var name = $("<p class='headerText'></p>").text(tweetData.user.name);
    var image = $("<img class = 'profileImage'/>")
    image.attr('src', tweetData.user.avatars.regular);
    var handle = $("<p class='tweeeterHandle'></p>").text(tweetData.user.handle);
    var header = $("<header class='tweetHeader'></header>")
    header.append(image,name,handle);
    return header;
  }
  //creates footer of the tweet
  //uses moment js to convert the timestamp into a readable time
  //uses font awesome for the icons
  function createTweetFooter(tweetData){
    var timeStamp = moment(tweetData.created_at).fromNow();
    var time = $("<p class='tweetFooterText'></p>").text(timeStamp);
    var iconOne = $('<i class="fas fa-flag" ></i>');
    var iconTwo = $('<i class="fas fa-retweet"></i>');
    var iconThree = $('<i class="fas fa-heart"></i>');
    var span = $('<span class="icons"></span>').append(iconOne, iconTwo, iconThree);
    var footer = $('<footer class = "tweetFooter"></footer>')
    footer.append(time, span);
    return footer;
  }
  //creates the body of the tweet
  function createTweetBody(tweetData){
    var text = $("<p class='textOfTweet'></p>").text(tweetData.content.text);
    var body = $('<div class="bodyOfTweet" ></div>');
    body.append(text);
    return body;
  }
  // this function can be used to call ajax when needed
  function loadTweets(){
    return $.ajax('/tweets', { method: 'GET' })
  }
  //this function loops through the tweets and prepends them the the .tweets section
  function renderTweets(tweets) {
    for(var tweet of tweets){
      $(".tweets").prepend(createTweetElement(tweet));
    }
  }
  //loads the existing tweets on startup
  loadTweets()
  .then(renderTweets)
  //when the compose button is clicked the comppose tweet is shown and auto selects the form
  $(".navButton").on("click", function (){
    $(".newTweet").slideToggle();
    $(".textBox").select();
  })
  //this function will check the text area and confirm that the value is a valid entry for posting
  function validate(data){
    var flag = false
    var IsDisplayed = $(".errorMessage").css("display")

    if(data.length > 140 && IsDisplayed === "none"){
      $(".errorMessage").text("Character length exceeded");
      $(".errorMessage").slideToggle("fast");
      flag = false;
    }
    else if(data.length > 140 && IsDisplayed === "block"){
      $(".errorMessage").text("Character length exceeded");
      flag = false;
    }
    else if(data.length === 0 && IsDisplayed === "none"){
      $(".errorMessage").text("No blank Tweets");
      $(".errorMessage").slideToggle("fast");
      flag = false;
    }
    else if(data.length === 0 && IsDisplayed === "block"){
      $(".errorMessage").text("No blank Tweets");
      flag = false;
    }
    if(data.length !== 0 && data.length <= 140 && IsDisplayed === "block"){
      $(".errorMessage").slideToggle("fast");
      flag =  true;
    }
    else if(data.length !== 0 && data.length <= 140){
      flag =  true;
    }

    return flag;
  }
  //on clicking of the tweet button it will check that the text area is valid and then submit the tweet
  $(".button").on("click", function( event ) {
    event.preventDefault();
    var text = $(".textBox").serialize()
    if(validate($(".textBox").val())){
      $.post("/tweets", text, function(){
        loadTweets()
        .then(renderTweets)
      });
    }
  });

});


