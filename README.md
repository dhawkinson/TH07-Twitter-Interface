#fsjsProject07 -- Build a Twitter Interface

To complete this project, follow the instructions below. If you get stuck, ask a question in the community. There are seven required elements.

##Set up a new Express project in the provided app.js file.

You will need to create the following files:
<ul>
    <li>A package.json file that includes your project’s dependencies.</li>
    <li>A Jade/Pug template file to display tweets and messages</li>
    <li>A config.js file that will contain your application’s authentication code</li>
    <li>A .gitignore file to add your config. js and node_modules/ folder to. This will prevent these files from being committed and pushed to github</li>
</ul>
The following files are provided:
<ul>
    <li>An app.js file where you will set up your Express app and write your API calls</li>
    <li>An index.html file that provides an example of what the finished project should look like, and some CSS and image files to use with your Jade/Pug template</li>
</ul>

##Create a new Twitter application.

<p>This will generate the keys and access tokens you need to authenticate your application so it can communicate with the Twitter API. You can find a link to a tutorial on how to do this in the project resources. Please note that while the tutorial says to create a Twitter dev account at dev.twitter.com, the url to create a Twitter dev account is now https://apps.twitter.com/</p>

##To use and interact with the Twitter API, you’ll need to set up a way to give the Twitter API the set of keys and access tokens that were generated when you create your Twitter app

<p>It’s a good idea to use an npm module to help you with this part. For this project, you’ll use an npm module called Twit. You can find a link in the project resources. Be sure to look through the documentation and familiarize yourself with how it works.</p>
<ul>
    <li>Create a file called config.js. In this file, you’ll assign an object literal to the module.exports object, as shown in the Twit documentation. The object literal should have the following properties with their corresponding values from your Twitter application account:</li>
        <ul>
            <li>consumer_key</li>
            <li>consumer_secret</li>
            <li>access_token</li>
            <li>access_token_secret</li>
        </ul>
    <li>Import this code into your app.js file to authenticate your application so you can request data from the Twitter API. The config.js file must be listed in the .gitignore file so it won’t be committed to your github repository. This will prevent your keys and tokens from getting posted publicly to GitHub. It is very important that you do NOT upload any of your personal API keys / secrets / passwords to Github or other publicly accessible place.</li>
</ul>
<p>When your project is reviewed, the project reviewer will use their own config file.</p>

##Make a Pug/Jade template for the main page. The template should have spaces for:

<ul>
    <li>your 5 most recent tweets</li>
    <li>your 5 most recent friends</li>
    <li>your 5 most recent private messages</li>
</ul>
<p>It should also include your personal Twitter name and profile image at the top of the screen.</p>
<p>Styling is not the important part of this project. Craft your template markup to take advantage of the CSS we’ve provided you. Knowing how to work with someone else’s styles is a very important skill as a full-stack developer. Pay attention to class names, inheritance, and so on. Try to avoid element types that are not used in the provided HTML and CSS files.</p>

##Using Node and Express, request the data you need from Twitter’s API

<p>Render it in your template, and send it to the client at the “/” route. Please avoid using Express generator to set up this project. It will be good practice to set up a simple Express app yourself!</p>

##Each rendered result must include all of the information seen in the sample layout:

<p>*tweets -message content -# of retweets -# of likes -date tweeted</p>
<p>*friends -profile image -real name -screenname</p>
<p>*messages -message body -date the message was sent -time the message was sent</p>

<p>Note that you don’t have to display direct messages as a back and forth conversation. You only need to display the last 5 messages that were received, or the last 5 messages that were sent.</p>

##Make sure the application actually renders your correct Twitter information by running it on your local machine and comparing it to your recent Twitter activity.

#Extra Credit

<p>To get an "exceeds" rating, you can expand on the project in the following ways:</p>

##Add a section to the bottom of your page that allows a user to post a new tweet.

##Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.

##Include your personal background image from Twitter as a background for the page header.

##NOTE:

<ul>
    <li>To get an "Exceeds Expectations" grade for this project, you'll need to complete each of the items in this section. See the rubric in the "How You'll Be Graded" tab above for details on how you'll be graded.</li>
    <li>If you’re shooting for the "Exceeds Expectations" grade, it is recommended that you mention so in your submission notes.</li>
    <li>Passing grades are final. If you try for the "Exceeds Expectations" grade, but miss an item and receive a “Meets Expectations” grade, you won’t get a second chance. Exceptions can be made for items that have been misgraded in review.</li>
</ul>



   
   
   
   
   
   
   