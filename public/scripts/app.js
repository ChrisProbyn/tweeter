/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  function createTweetElement(tweetData){
    var header = createTweetHeader(tweetData);
    var body = createTweetBody(tweetData);
    var footer = createTweetFooter(tweetData);

    return $("<article class='old-tweets'></article>").append(header,body,footer);
  }

  function createTweetHeader(tweetData){
    var name = $("<p class='headerText'></p>").text(tweetData.user.name);
    var image = $("<img class = 'profileImage'/>")
    image.attr('src', tweetData.user.avatars.regular);
    var handle = $("<p class='tweeeterHandle'></p>").text(tweetData.user.handle);
    var header = $("<header class='tweet-header'></header>")
    header.append(image,name,handle);
    return header;
  }

  function createTweetFooter(tweetData){

    var timeStamp = moment(tweetData.created_at).fromNow();

    var time = $("<p class='tweet-footer-text'></p>").text(timeStamp);
    var iconOne = $('<i class="fas fa-flag" ></i>');
    var iconTwo = $('<i class="fas fa-retweet"></i>');
    var iconThree = $('<i class="fas fa-heart" ></i>');
    var span = $('<span class="icons"></span>').append(iconOne, iconTwo, iconThree);
    var footer = $('<footer class = "tweet-footer"></footer>')
    footer.append(time, span);
    return footer;
  }

  function createTweetBody(tweetData){
    var text = $("<p class='textOfTweet'></p>").text(tweetData.content.text);
    var body = $('<div class="bodyOfTweet" ></div>');
    body.append(text);
    return body;
  }

  function loadTweets(){

    return $.ajax('/tweets', { method: 'GET' })

  }

  function renderTweets(tweets) {

    for(var tweet of tweets){

      $(".tweets").prepend(createTweetElement(tweet));
    }
  }

   loadTweets()
     .then(renderTweets)

  $(".navButton").on("click", function (){
    $(".new-tweet").slideToggle();

    $(".textBox").select();
  })


  $(".new-tweet").submit(function( event ) {
    event.preventDefault();

    var serializedText = $(".textBox").serialize();
    console.log(serializedText.slice(5))
    if(serializedText.slice(5).length > 140){
      alert("Character length exceeded")
    } else if(serializedText.slice(5).length === 0){
      alert("No blank Tweets")
    }
    $.post("/tweets",serializedText, function(){

       loadTweets()
          .then(renderTweets)
    });
  });



});


