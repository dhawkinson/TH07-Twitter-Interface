# TH07-Twitter-Interface
Full Stack Java Script Project 07 - Treehouse TechDegree

Create a new Twitter application.

This will generate the keys and access tokens you need to authenticate your application so it can communicate with the Twitter API.
    <ul><li>consumer_key</li>
    <li>consumer_secret</li>
    <li>access_token</li>
    <li>access_token_secret</li></ul>

Use a Pug/Jade template for the main page. The template should have spaces for:
    <ul><li>your 5 most recent tweets</li>
    <li>your 5 most recent friends</li>
    <li>your 5 most recent private messages</li></ul>

Include your personal Twitter name and profile image at the top of the screen.

Using Node and Express, request the data you need from Twitter’s API

Each rendered result must include all of the information seen in the sample layout:

    <ul><li>tweets -message content -# of retweets -# of likes -date tweeted<li>
    <li>friends -profile image -real name -screenname</li>
    <li>messages -message body -date the message was sent -time the message was sen</li></ul>

NOTE: You don’t have to display direct messages as a back and forth conversation. You only need to display the last 5 messages that were received, or the last 5 messages that were sent.

## Extra Credit

To get an "exceeds" rating, you can expand on the project in the following ways:
    <ul><li>Add a section to the bottom of your page that allows a user to post a new tweet.</li>
    <li>Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.</li>
    <li>Include your personal background image from Twitter as a background for the page header.</li></ul>
