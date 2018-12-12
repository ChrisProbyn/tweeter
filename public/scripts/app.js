/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  function createTweetElement(tweetData){
   // name => header text
   // image => profile image
   // handle => tweeterHandel
   // text => text of tweeet
   // created_at => tweet-footer-text

   // <article class="old-tweets">
   //        <header class = "tweet-header">
   //          <img class = "profileImage" src="/images/bird.png">
   //          <p class="headerText">
   //            header will go here
   //          </p>
   //          <p class="tweeeterHandle">
   //            @exampleTwitterName
   //          </p>
   //        </header>
   //        <body class="bodyOfTweet" >
   //          <p class ="textOfTweet">
   //          sample tweet
   //        </p>
   //        </body>
   //        <footer class = "tweet-footer">
   //          <p class = "tweet-footer-text">
   //            10 days ago
   //          </p>

   //          <span class="icons">
   //            <i class="fas fa-flag" ></i>
   //            <i class="fas fa-retweet"></i>
   //            <i class="fas fa-heart"></i>
   //          </span>

   //        </footer>
   //     </article>
   var name = $("<p class='headerText'></p>").text(tweetData.user.name);
   var image = $("<img class = 'profileImage'/>")
   image.attr('src', tweetData.user.avatars.regular);
   var text = $("<p class='textOfTweet'></p>").text(tweetData.content.text);
   var time = $("<p class='tweet-footer-text'></p>").text(tweetData.created_at);
   var handle = $("<p class='tweeeterHandle'></p>").text(tweetData.user.handle);

   var header = $("<header class='tweet-header'></header>")
   header.append(image,name,handle);
   var body = $('<div class="bodyOfTweet" ></div>');
   body.append(text);
   var article = $("<article class='old-tweets'></article>");
   var iconOne = $('<i class="fas fa-flag" ></i>');
   var iconTwo = $('<i class="fas fa-retweet"></i>');
   var iconThree = $('<i class="fas fa-heart" ></i>');
   var span = $('<span class="icons"></span>').append(iconOne, iconTwo, iconThree);
   var footer = $('<footer class = "tweet-footer"></footer>')
   footer.append(time, span)

   article.append(header,body,footer)

   return article;
  }

  function renderTweets(tweets) {
    // var returnArray = tweets.map( function (){

    // })
    for(var tweet of tweets){
      $(".tweets").append(createTweetElement(tweet));
    }
  }

  renderTweets(data);
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
