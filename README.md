# Mixology

*Liam Hall Milestone Project 3 (Data-Centric Development)*

This is my third project studying with [The Code Institute](https://codeinstitute.net/)

This project focuses on data, how it is stored, used and read. The data for this project is stored in an external database and CRUD operation performed by this web application. 
Choosing mixology as my primary theme felt ideal as I have been a bartender for over 5 years and I felt I wanted to share all of the cocktails I have learned along the way.
I am also aware not everyone has the equipment or a stocked alcohol cupboard so I have provided links to websites where the users can get everything they need to get themselves started.
These could later be real affiliate links that generate money from the website. 

Many other recipe sites provide recipes for cocktails but are diluted by cooking recipes. Mixology is a recipe site dedicated to cocktails. 
Users can share their own creations to other users and view a wide range of cocktails from other users either on their profile page or from the home page. 

Mixology allows users to create an account where they can filter, edit and delete all of their own cocktails from their profile. The ability to edit cocktails they authored is also available on the cocktail recipe page.
If the user were to view a cocktail they didn’t own the option to edit would be unavailable.

I have decided to adopt a similar style to Netflix with the home page providing carousels of cocktails each with a different order (Newest, Top Rated, Most Popular). Allowing users to quickly find the latest and greatest cocktails.
From the home page users can quickly choose their preferred alcohol of choice from the site nav which renders the same home page but only shows the cocktails that use the selected alcohol as the main ingredient.

Mixology uses Mongodb as its database to store cocktail information.

[View Live Site](http://mixology-cocktails.herokuapp.com/home)

## Contents
 
-   [**UX**](#UX)
    -   [User Stories](#User-Stories)
-   [**Develoyment**](#Development)
    -   [Ideas](#Ideas)
    -   [CRUD Operations](#Create-Read-Update-Delete-CRUD)
    -   [Templating](#Templating)
    -   [Routing](#Routing)
    -   [Security](#Security)
    -   [Image Storage](#Image-Storage)
    -   [Form Input Labels](#Form-Input-Labels)
    -   [Form Validation URL Validation](#Form-Validation-URL-Validation)
    -   [Images](#Images)
    -   [Console Logs Prints Debugger](#Console-Logs-Prints-Debugger)
    -   [Block Element Modifier Class Naming System BEM](#Block-Element-Modifier-Class-Naming-System-BEM)
    -   [CSS Variables](#CSS-Variables)
    -   [Commit Messages](#Commit-Messages)
- [**Features**](#Features)
    -   [Live Features](#Live-Features)
    -   [Features Left to Implement](#Features-Left-to-Implement)
- [**Technologies Used**](#Technologies-Used)
- [**Testing**](#Testing)
    -   [Functionality](#Functionality-Testing)
    -   [Bug Report](#Bug-Report)
- [**Deployment**](#Deployment)
    -   [Remote Deployment](#GitHub-Pages-Remote-Development)
    -   [Local Deployment](#Cloning-Local-Development)
- [**Credits**](#Credits)

## UX
As the site gains users, more data will be input into the site resulting in more information on cocktails becoming available to all users. 
With this in mind have I decided to display the cocktails in carousels so not to overwhelm the user when they visit the site.

The user can then view the cocktails at their own pace scrolling through the carousels to display more cocktails. 
The amount of cocktails visible per slide/scroll is determined based on the screen of the device used. Increasing in amount as the screen size increases. There are never more than 6 cocktails per slide/scroll. 
The maximum amount of cocktails per carousel is also limited to reduce the chances of the user feeling overwhelmed by choice. 
We are all guilty of scrolling through Netflix for far too long before actually choosing something to watch.

The cocktails are then divided into clearly labeled orderings (Newest, Top Rated, Most Popular). Presenting the cocktails in this way makes it easier for users to choose what they want to make. 
They can decide what is more important to them, for example if they are looking to try something new they can simply scroll down to the “Newly Added” carousel and scroll through all the latest cocktails. 
A user may only want to make the best cocktails so they would scroll through the “Top Rated” carousel. Finally a user who is new to cocktails having the “Most Popular” cocktails presented to them is a great way for them to see what everyone else is drinking.

For users who have a preferred alcohol of choice, they can simply filter the homepage cocktails by clicking their alcohol in the main site nav. They will then be presented with the homepage that only shows cocktails that use the selected alcohol as their main ingredient eg.vodka, gin.
There is also a view all page which can be reached by pressing the “View All” button on any carousel. The view all page will display all cocktails in the database. The order is determined from which carousal the button is pressed. The order can then be changed on that page.

Users can create accounts which allow them to add and bookmark cocktails. If a user navigates to a page that requires you to be logged in they will be directed to the login page and will be unable to access the page unless they login. 
The login page also has a link to the register page if the user doesn’t have an account and vice versa. The user's own profile page is where the user can perform all CRUD operations. Edit and delete their own cocktails as well as view all of them. 
Creating a cocktail can be done on any page due to the “Add Cocktail” Button in the main site header (if logged in) or on the profile page in the “Your Cocktails” section. Users can easily bookmark cocktails wherever they can view them and then they will be displayed on the users profiles page.

### User Stories
At the start of this project I asked a group of potential users what they would like to be able to do as a user:

**As a potential user:**
-   If I make a mistake whilst I was creating the cocktail I need to be able to go back and edit it without having to completely re add it.
    
    **Homepage > Login > Create Cocktail > Submit > Profile > Cocktail Recipe Page > Edit Cocktail Page > Submit > Cocktail Recipe Page**

    Users can edit their cocktails from the Cocktail Recipe Page or from their profile page as long as they are logged in.

-   I would like to be able to delete old recipes and if I no longer want to use the website delete my profile.
    
    **Profile > Delete Cocktail > User Deletion Confirmation > Cocktail Deleted > Profile**
    
    **Profile > Edit Profile > Delete Profile > User Delete Confirmation > Profile Deleted > Logged Out > Homepage**

    Deleting cocktails and user profile can both be done on the profile page. A confirmation window will open for the user to confirm the deletion to stop accidental deletion. 
    For cocktail deletion a simple dropdown with a confirm button so it is quick and easy if a user wants to delete multiple. Cocktails can also be detele on their recipe page.
    Their is no confirmation for this deletetion.

-   I want to be able to bookmark my favourite cocktail so I can quickly find them again.
    
    **Homepage > Rum > Bookmark Mojito > Register > Homepage > Rum > Bookmark Mojito > Scroll Most Popular > Bookmark Mojito > Profile > Bookmarks > Mojito**
    
    The user tried to bookmark a cocktail without being logged in, a flash message was displayed to tell them they must be logged in. After registering the user went back and bookmarked all the cocktails she wanted. They all appeared in their profile under the “Your Bookmarks” section.

-   I always lose where I am in a recipe. It would be great if I could keep track of what step I'm on.
    
    **Homepage > Old Fashion > Check got Ingredients > “Open in new tab” Affiliate link > Check garnish > “Open in new tab” Affiliate Other link > Checked each instruction they made the cocktail**
    
    Users can easily check whether they have all the ingredients and tools as well as keep track of what step they are on by ticking the checkbox next to each item. Links to websites they can get the items they are missing are provided on the cocktail page

-   I have never made a cocktail in my life and not sure I have everything I need. I would like to be pointed in the right direction as to what I need and where I can get it.
    
    **Homepage > Most Popular Scroll > Gin > Most Popular Scroll > “Tom Collins” > Checked Ingredients > “Open in new tab” Affiliate Ingredient  link > Check garnish > Check tools > “Open in new tab” AffiliateTool link > Bought items from Affiliate Link.**
    
    Links to websites where the user can get all the stuff they need to make cocktails can be found on every cocktail recipe page and form the footer.
    Please find the user story


    Please find user story fulfillment screenshots [here](https://github.com/LiamDHall/Mixology/tree/master/static/images/readme-images/user-stories-fulfilment) 

## Development

### Planning

Please find the planning document [here](https://github.com/LiamDHall/Mixology/blob/master/supporting-docs/mixology-planning-doc.pdf). This document contains the following planning stages **Scope, Strategy, Structure, Data Model and Schema** for the website.

The wireframe for the websire can be found [here](https://github.com/LiamDHall/Mixology/tree/master/supporting-docs/wireframes). The wireframe for the cocktail page (and create / edit form) for desktop deffers from the live site. This is because it was diffacult to make the three column layout work on even the largest of screens, therefore I adpeted it to be more similar to the mobile verison.

Some elements have been changed or moved around from when the wireframes where created. I did this as some elements I designed werent pratically or easy to interacte with.

Additional pages have been add which don't appear in the wireframes as I hadn't decided what they were going to look like. These pages include Search and View All. 

### Ideas

When thinking about creating Mixology I want to make a recipe sharing website that had the potential to one day become a social media platform. The live site is a website where users can share their own cocktails or cocktail variants. More features will need to be added to be able to call it a social media platform.
I wanted users to have their own profile page which could be viewed by all other users. Owners of the profile page can edit their profile or even delete it from this page. The users profile page is also where they will be able to edit or delete cocktails.
Users have become accustomed and will expect to be able to save recipes to be viewed later due to their use of many other types of website offering this service. I will therefore include a bookmarking system into Mixology.
I have used many different recipe websites and none of them offer a way of keeping track of what step you are on when going through the recipe. I will have a system in place that is clear for the user to know the current step they currently are on. 

### Create Read Update Delete CRUD

The most important features of any data focused website are the CRUD operations. I have placed the buttons or forms for the CRUD operation on the website where I think they are most intuitive. 

#### **Create**

Adding a cocktail can be done from two places, the main site header as the main call to action or the users profile page in the “Your Cocktail Section” (Creating a cocktail requires the user to be login in)
Clicking one of these create buttons will open a form page in the same style as the end result cocktail recipe page giving the user a preview into how the page will look after submitting the cocktail.
The Create Cocktail Form is designed in a way to reduce users' mistakes. For example each ingredient is divided into 3 inputs: Amount (Number and . Only) , Unit (Select Drop Down) and Ingredient Name (Text). 
Another reason for this design is due to the way the database document is designed and the application stages the data. This design means there is almost zero chance an error will occur as the data is labeled in a way the staging function can easily format it into its final form to match that of the database.
A downside to this design is that users will not be able to copy and paste recipes easily from their notes and will have to enter them manually. Unfortunately I couldn’t work out a way to format incorrectly copy and pasted text into the format it needed to be to be pushed into the database correctly.
I think the current design of the create cocktail form means that when any cocktail is viewed on its recipes page the data is present uniformly across all of them. 
Users can create a profile via the register page which can be reached from the main site header call to action (when not logged in) or from the login page link at the bottom.

#### **Read**

The web application uses multiple **find** queries to produce filtered results of the overable collection.
In most cases the queries also sort the date into a meaningful order for the user.

The found documents are then presented to the user in the form of carousels.
A peak of a cocktail can be read straight from the homepage in the form of a recipe card (rec card in code) in carousels. For each recipe card the user can see the cocktail name, rating and number of ratings.

More info and how to make the cocktail can be read by pressing the “Make It” button on the recipe card taking the user to the Cocktail Recipe Page. A single cocktail is then queried by the web application using **find_one** searching for the cocktail’s object ID. 
On the profile page the users information is displayed in the header and the users cocktails are also presented to the user.

#### **Update**

If a user is the author of a cocktail they can edit it from the Cocktail Recipe Page next to the bookmark button (this button is hidden if not the author). Users can also edit cocktails from their own profile page.

Clicking an edit button opens an identical form to the Create Cocktail Form but with the values of the inputs prefilled with the cocktail info and the correct number of inputs preloaded in.

Some values of the cocktail will not and cannot be updated by submitting this form such as: date_added, author_id and author. Updating the a document without having to set a value for all keys in a document is achieved with the use of keyword **$set**.

#### **Delete**

All Delete operations can be done from the users profile page.

Deleting a cocktail can be done by clicking the recipe card button “Delete” a confirmation will appear to double check the user wants to delete the cocktail.

For the user to delete their profile they just need to click the “Delete” button in the profile header. A confirmation will appear and they will get a warning with a confirm button.

### Templating

Jinja templating language is used to create the web pages for this website. A base template is used to house the Doctype, head, header and footer. The main content of the page is then extended from templates.

The ability to use python in HTML files provides the ability to change what appears to the user based on whether they are login in or which link is pressed. It stops the need to make a recipe page for each cocktail and instead the data of the cocktail can be inserted into the template of the page. 

Using templates also allows the website to be updated automatically to display different elements if the user logs in and can remove elements that are redundant to users that already have a profile. Templates are also used in the website to hide CRUD operations from users that are available to the owner of the cocktail.

The use of templating means the overall amount of code is reduced as most elements only need to be coded once. It also means editing the code becomes a lot easier as again there is only one instant of each element to update. 

Originally I had combined the “Edit” and the “Create” Cocktail Forms (as they are basically the same) together into one template but the code became very complicated with the amount of if statements making it very hard to read so I separated them.

Whilst working in Gitpod the HTML checker would throw error / warning that closest tags didn’t match the opening tags. This is due to the if statements determining which version of the opening tag will be rendered in the template. When the template is actually rendered only one tag is entered into the DOM meaning no error is actually present.

### Routing

The correct function is run or template is extended to the base, based on the route function url and the variables passed by that url. Variables that decide what a route function does are passed by the links’ url.

A lot of route functions in this web application change what they do based on whether variables exist (/ are passed to the function). The use of “default” in “@route()” stops the urls without the necessary variables from throwing errors as I would set the defaults to “None”.

I found that if a variable was passed to a route function it had to be visible to the user in the url of the page. A few of the pages use the id of an object to query them from the database which I would not necessarily have wanted them to appear in the url. I couldn’t work out how to pass a variable to a route function without it being visible. 
This is something I will look into with more detail in future projects.

If a page requires the user to be login in, the function will redirect to the login page if the user is not already

### Security

All sensitive information such as API keys and database names are kept in an env.py file which is then named in the .gitignore file which stops it from being committed to the local or remote repository (Github).

This means the sensitive information is never presented to users, future developers or people interested in the project unless permission is granted by the owner and the file is sent to them.

The sensitive information is however shared with the hosting platform as it requires it access the database used for the website.

User passwords are inputted in a password input field meaning the characters are replaced by dots (or the browsers default icon) stopping people seeing the user's password as they type.

The password is then hashed using SHA-256 by [Werkzeug](https://werkzeug.palletsprojects.com/en/1.0.x/utils/) which it is my understanding produces a binary code presented as letters and numbers before being added to the database.

When a user is queried by the web application (for example to load the appropriate profile page) the password hash is also gathered but not present to the user.

SHA-256 is a very secure way of hiding sensitive information. Even if someone obtained the hash of a user's password it is practically impossible to reverse. If it was possible Bitcoin would not be secure as it is.

### Image Storage

I originally wanted users to be able to upload files from their computer to the website and store the images on a remote server. I tried three different cloud storage providers each with a different level of success which are as follows:

-	**AWS S3 (Amazon):** I manage to upload and delete files but the image files where not viewable and when opened in the S3 dashboard throw a XML error.
-	**Cloudinary:** Could not get the API to allow access to my web application and I kept getting 401 unauthorized response codes.
-	**Google Drive:** I had the most success with this one. I could upload and delete files as well as place links as source attributes to view them but due to the set up, I needed to refresh my access token every hour. This was the only problem and I tried multiple methods to try to automate the refresh with every upload but sadly without success.

### Form Input Labels

I only gave form inputs labels where appropriate. The reason for this is that I didn't want to cluter the UI. This is mainly the case on the cocktail form page. If a form input doesn't have a label it has a aria label instead. Hint text is present for all inputs on the cocktail form to prompt the user as to what goes into an input displayed as placeholder text.

### Form Validation URL Validation

Some forms use custom bootstrap form validation which give the user feedback as to what is wrong or missing. Forms that need to check the database gives feedback via flash messages. I couldn't work out a way to validate URLs for images as in if they actually pointed to an image.
I set up a image preview so the user can self validate if the URL works. The user can however add any URL even if it doesn't point an image. This is an issue still in the live site

### Images

#### Hero

The hero element on the homepage updates itself to match the alcohol filter the user has selected. I have limited it currently to only cocktails created by the **mixology** account because it means I can optimise the images for the hero in terms of size and quality.
The hero images are set as the background of the element using inline style (and jinja templating) as it was the easiest way I found to pass the image src to the css.
In the local stylesheet I have set the background to a default image as I found other css rules applied to the background weren't taking effect if there wasn’t a background rule set before them. This image is not displayed due to the inline style background property taking priority.

#### Cocktails

I found it quite hard to find a lot of free and consistently sized images of cocktails and have tried my best to style them so that no one is distorted too much. I can’t guarantee user uploaded images will not be slightly distorted when uploaded.

### Console Logs Prints Debugger

When testing the web application I set it up to be automatically built and hosted by Heroku. This was to test the live site against the local preview. In doing this the site was hosted by Heroku containing console logs and print functions and the debugger still set to “True”. 
With the site in this state it was presented only to test users as I didn't want to remove or change any of them just to have to add them or revert them back at a late date. 

**The current live deployment of the site doesn’t contain any console logs or print functions and the debugger is set to “False”**   

### Block Element Modifier Class Naming System BEM

When creating this website I used the BEM naming system for classes. 
It allowed me to style new pages very quickly with generic classes I had styled for previous pages.
Using this naming convention allows future developers to know an element's purpose, structure and if appropriate, what it does from the class name.
I tried to follow the naming system as closely as possible.The idea behind this naming system is to use class names to style elements and not style them by their id or tag. This means elements become independent from their tags and css rules are less likely to take unexpected effects on other elements.
In real world application this is not always possible or efficient to only use classes and is used more to reduce the amount of rules set to an id or tag.

### Commit Messages

During the project I tried to adhere the following rules as much as possible:
-   I aimed to keep the subject line to 50 characters but where appropriate I extended it to 72.
-   I wrapped each line of the message body at 72 characters as some repositories don't automatically wrap text to new lines.
-   If a single document was edited in the commit, I noted it in the commit in the format **document: Subject line** so when future developers look through the commits they know which document is affected.
-   I only capitalised the first letter of the subject line as some developers use filters that look for capitalisation.

### CSS Variables

I used CSS Variables (though they caused an error in the validator, see [Validation Testing](#Testing)) for accent colour throughout the site. Using CSS Variables allow future developers to quickly update multiple elements' colour by changing a single item.
I have kept the use for the variables low as I have read that maintaining a website that relies heavily on variables is hard to maintain especially when first looking at it. 
As there is also no naming conversion at the moment for CSS Variables meaning one name could mean something to one dev and something else to another which could result in mistakes.

## Features
 
### Live Features
-   **Easy Filtering:** Right from the landing page users are presented with the top results from three categories: **Newly Added**, **Top Rated** and **Most Popular**. These three categories can then be filtered even further by the user by simply clicking their preferred alcohol in the main site header. 
    This will re-render the template to only show cocktails that use the selected alcohol as the main ingredient. The three category queries sort the results by the following methods:

    -	**Newly Add:** by the date the cocktails were added.
    -	**Top Rated:** by rating then if the cocktails have equal rating by the number of ratings
    -	**Most Popular:** by the number of times the cocktail is bookmarked

-   **View All Page:** User can view all of the cocktail in one of three orders: **Newly Added**, **Top Rated** or **Most Popular**. These three categories are filtered even further dividing all the cocktail into their alcohol type. All the cocktails are present on this page regardless of what order is selected.

-	**Bookmarking:** users can bookmark cocktails anywhere they can see them via their recipe card or Cocktail Recipe Page by pressing the bookmark icon. These bookmarked cocktails will then appear on the users profile page under the “Your Bookmarks”. Bookmarked cocktails will be indicated by the bookmark icon being filled in.
    Even though the page is reloaded, the page is reloaded to the same scroll position as before the reload.
    Users must be logged in to use this feature as the users bookmarks are stored in the users document in the database. Non logged in users can still see the bookmark icon but it fades out and when clicked and informs the user they must be logged in it uses this feature to encourage people to register.
    With the use of a random number generator and a session cookie I have made it safe for the user to reload the page and not un do their bookmarking or re bookmark a cocktail. 

-   **Cocktail Creation Edit and Deletion:** if a user registers to the website they will be able to create cocktails for all other users to see. The user also has the ability to edit their cocktails if they have made a mistake or delete it if they no longer wish to share it anymore.
    Users can’t edit or delete cocktails they are not the author of. When a cocktail is deleted it is removed from all user bookmarks and rated cocktails so as not to clog up the database with useless entries which may slow it down.

-	**Cocktail Rating:** Cocktails can be rated by users who are logged in and not the author. Users can only rate a cocktail once and then they get feedback on the page if they return to try and rate it again saying they have already rated it. These ratings are then added up and divided to get a mean cocktail rating that is then rounded to the nearest integer to be displayed in the form of stars. If a cocktail has no ratings the user will be informed.

-	**Search:** From the main site header (and in the mobile menu** the user can search the website for what they are looking for. The search element queries the database looking to match the users input against the following key values: cocktail_name, ingredients, main alcohol of the cocktail, garnishes, glass the cocktail goes in and finaling usernames. 
    The results are then separated into the categories they were matched with.

-	**User Login and Profile:** users can register to the site giving them access to the other features of the site such as bookmarking and creating cocktails. The user then has a profile page created for them where they are presented with their cocktails and bookmarks.
    From this page Users can then set a profile picture and edit their username or even delete their account of cocktails.
    What the site presents to user is then changed if they are logged in such as the main site headers call to action is changed from **Register** to **Add Cocktail**  
    Other users regardless of if they have their own profile can view any other person's profile but they can edit the profile or see that user's bookmarks.

-	**Site Nav Indicator:** users can easily tell which homepage they are on by looking at the main site nav. The current page link will be underlined.

-	**Flash Messages:** user feedback is presented to them if the form of flash messages that appear just under the main site header. These messages then disappear after 15 seconds so as not to be annoying to users.

-	**Cocktail Carousel:** cocktails are presented to the user in the form of recipe cards that display an image, the rating and number or ratings of the cocktail. These are then placed into a carousel similar to the Netflix carousel using [Swiper JS API](https://swiperjs.com/swiper-api). 
    Originally I had the buttons over the top of the cocktails and the last cocktail would be faded out (again like Netflix) but due to practically it limited the number of slides I could have as if there was more than 3 sections the middle section would have both end faded out and one cocktail would 
    never be in focus so I changed the button to be underneath the carousel.

-	**Checkboxes:** checkboxes have been added on the Cocktail Recipe Page for users to check they have all the ingredients and tools they need to make the cocktail. (I removed the one for the glass element as all test users didn’t bother to tick it or didn’t care what glass the cocktail went in if they didn't have it immediately to hand). 
    Check boxes are also present on all instructions. When the checkbox is checked, the whole item turns green and the box is filled with a tick. This feedback allows the user to quickly know what ingredients they are missing or what step they are on.

-	**Affiliate Links (demonstration only):** following on from the checkboxes if the use is missing an ingredient or tool they are presented with links to websites where they can acquire everything they need.

-	**404 Error Page:** users who find themselves on a page that does not exist will be greeted by a 404 Error page that will direct them back to the home page

### Features Left to Implement
The following features are suggestions to improve the site for developers to include if they wish to continue developing this project or myself at a later date.

-	**Image Optimiser:** add a tool that crops the image to the size and quality best for the website.
-	**Messaging system:** allow the users to message other users via direct message. 
-	**Subscribing:** allow users to follow their favourite bartenders (users). When a user they have subscribed to adds a new cocktail it appears on their profile page under a new section “Subscriptions”.
-	**Save to draft:** allow users to save cocktails halfway through making them and save them to your profile to be continued late. This is a feature I planned to have in the original design but later scrapped due to time restraints. 
-   **Tip System:** I had wanted to add tips and throughout the build of the website I was planning to include them. The tip system would allow users to leave tips on recipes they had tried to make which they thought would help other users to improve the cocktail.
-	**Recommendations:**  at the bottom of every Cocktail Recipe Page have a carousel of other similar cocktails the user might like to try after their currently selected one. 

-	**Video Tutorials:** this feature would make it even easier for the users to follow step by step instructions with a visual guide.

## Technologies Used

-	[HTML 5](https://en.wikipedia.org/wiki/HTML5):language used to structure and provide content of pages of the website.

-	[CSS 3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets): visual language used to style and format the html.

-	[Javascript](https://en.wikipedia.org/wiki/JavaScript) & [JQuery](https://en.wikipedia.org/wiki/JQuery): JavaScript used for frontend functionality as well as dynamically adding, removing and updating elements. 

-	[Python](https://www.python.org/): Python is used to run the back end of the web application. It is also used to query the datedate and perform CRUD operations on the data.

-	[Flask](https://flask.palletsprojects.com/en/1.1.x/): is a python little framework which includes and packages Jinja templating language and Werkzeug security
	-	[Jinja](https://jinja.palletsprojects.com/en/2.11.x/) : used as the templating language to reduce the amount of duplicate code across pages. Also allows scripts and libraries to be extended into specific pages if not needed on all pages of the website. Jinja provides the ability to run python in a html document such as for loops and if statements.
    -	[Werkzeug Security](https://werkzeug.palletsprojects.com/en/1.0.x/utils/) : provides hashing for the user passwords stopping anyone being able to anyone trying to view them if they query or inspect elements.  

-   [Heroku](https://www.heroku.com/): platform used to host the web application.

-   [Mongodb](https://www.mongodb.com/): provides the database the web application uses to store and query data.

-	[Bootstrap Framework](https://getbootstrap.com/docs/4.1/layout/grid/): provides a grid system to insure a mobile-first design and responsive website which adapts to different screen sizes of devices.

-	[Swiper JS API](https://swiperjs.com/swiper-api): provides the recipe card Netflix style carousel.

-	[Gitpod](https://gitpod.io/): the Integrated Development Environment used to write the code for this project. Also provides a preview of the website in a browser which was then used for testing.
 
-	[Gitpod Chrome Extension](https://chrome.google.com/webstore/detail/gitpod-dev-environments-i/dodmmooeoklaejobgleioelladacbeki?hl=en): made it easier and faster to open the repository in my IDE directly from Github in a web browser.
 
-   [Git](https://git-scm.com/): used for version control and to push the control to a remote repository to be stored.
 
-   [Github](https://github.com/): used for as a repository to store the versions of the website. 
 
-	[Adobe Photoshop](https://www.adobe.com/uk/products/photoshop.html): to stitch together the background images.
 
-	[Adobe Illustrator](https://www.adobe.com/uk/products/illustrator.html): create favicon for the website.
 
-	[Google Font](https://fonts.google.com/): font for website.
 
-	[Font Awesome](https://fontawesome.com/): styles and provides icons.
 
-	[Google Chrome](https://www.google.com/intl/en_uk/chrome/), [Microsoft Edge](https://www.microsoft.com/en-us/edge), [Firefox](https://www.mozilla.org/en-GB/firefox/new/) and [Opera](https://www.opera.com): to test browser compatibility.
 
-	[Google Chrome Dev Tool](https://developers.google.com/web/tools/chrome-devtools): main tool for testing. Inspecting elements and troubleshooting.
 
## Testing
 
### **HTML**
I used [W3C Markup Validation Service](https://validator.w3.org/) to check my html was valid.

**Errors**

No errors produced.

**Warnings**

No warnings produced.

### **CSS**

I used [W3C Jigsaw Validation](https://jigsaw.w3.org/css-validator/) to check my CSS was valid.

#### **Errors**

The errors produced in the validator are due to [Bootstrap](https://getbootstrap.com/) and [Swiper JS API](https://swiperjs.com/swiper-api) and not code written by myself.

<img src="https://github.com/LiamDHall/Mixology/blob/master/static/images/readme-images/css-errors.png">
 
#### **Warning**

As I used [CSS Variables](https://www.w3schools.com/css/css3_variables.asp) in my project the following warning code is produced:

**This warning is also produced for all transformation browser compatibility rules present in the site**
-   **is an unknown vendor extension**:

This warning is also produced for the CSS Variables and transformation browser compatibility rules provided by [Bootstrap](https://getbootstrap.com/) and [Swiper JS API](https://swiperjs.com/swiper-api) and [Font Awesome](https://fontawesome.com/).
**The use of CSS Variables is not a warning. This is flagged as Jigsaw Validation does not support level 4 CSS.**

<img src="https://github.com/LiamDHall/Mixology/blob/master/static/images/readme-images/css-warnings.png">

#### **Console Log Warning**

The Console of the live sites displays a warning about the Swiper JS API’s css which is as follows
**Resource interpreted as Stylesheet but transferred with MIME type text/plain: "https://unpkg.com/swiper/swiper-bundle.min.css".** 
I have tried added a type attribute of **text/css** to the link for the stylesheet but the warning reminds
**This console warning is still present in the live site**   

### **JS**

I used [JS Hints](https://jshint.com/) to check my JavaScript was valid.

The only warnings I got from the validator were undefined variables.

These variables are difined using JQuery which the validator doesn't like.

The use of template literals also flagged up as they are not supported by Internet Explorer 6

Internet Explorer is out of date and it itself Recommendes updating to Microsoft Edge.

### **Python**
I used [pep8online](http://pep8online.com/) to check my Python was PEP8 compliant.

The validator said that my code was PEP8 compliant.

### **Functionality Testing**

#### **Links**

I have manually tested each link by clicking on all links on each page.
 
**All links work and all external links open in a new browser tab.**
 
#### **Browser Compatibility**

The website works the same across all browsers. 
 
#### **Device Compatibility**

I have tested the site on the following devices in the Google Dev Tool: **Moto G4, Galaxy S5, Pixel 2, Pixel 2 XL, iPhon: 5/SE/6/7/8/6+/7+/8+/X, Ipad & Pro, Surface Duo.**

I tested the the touch functionality on a Samsung Galaxy A40. Everything worked as intended.
 
#### **Dynamically added buttons wouldn’t trigger functions linked to them**

The buttons that add and remove input fields to the Cocktail Create Form, that were added dynamically were not working.
The remove buttons are added with every item after the defaults. The add button is re added after the use reaches the max amount of inputs in a particular section and then remove one.
Due to the **.click()** does not work on dynamically added buttons the listener for the click is added to the document before the button is in the DOM.

**Fix: updated to “.on(‘click’, function() {})”** 

#### **Cocktail queries not updating when a new cocktail was added**
Due to: I tried to have the query that finds all the cocktails pre set to a variable so I didn’t have to keep typing it out each time for each function.
This resulted in the cocktails only being queried when the web application was first started not when each page was loaded.

**Fix: In the end I had to write out the query each time.**

### **Bookmarking a cocktail in the second section of a carousel will put it back to the first section.**

If a cocktail is bookmarked and it is not in the first section the carousel then when the page reloads the swiper will be back at the first section
I tried to use ajax javascript function to run a python function without reloading the page but I keep getting python errors in the debugger for the return of the python function regardless of what I set it to.

**This issue is still present in the live site**

### **Bookmarking on an alcohol home page would take the user to the unfiltered homepage**

After the category template was combined with the home template the bookmarking form submission would render to the unfitted homepage even if alcohol was passed to the route function.

**Fix: Add an if statement to the rec cards that would determine the form action attribute that would decide if an alcohol variable would need to be passed to the route function to render the same filtered alcohol home template.** 

### **After bookmarking reloading page at top & Flash of the top of the page (BUG)**

When a cocktail is bookmarked the page is reloaded and it reloads the page to the top of it.

**Fix: Added a javascript function that returns the page to the same Y scroll position it was before the reload. It does this by saving the scroll Y position to a session cookie which then another function retrieves it after page reload and sets the page to that scroll position** 

This function was implanted so the bookmarking system was more seamless. However a few times the top of the page flashes on the reload before the page is scrolled to the save position.

Due to the function running after the document is ready and sometimes not working fast enough.

**This bug is still present in the live site**

### **Sometimes buttons on the site need to be clicked multiple time to work on initial load or reload**

I have not been able to pinpoint the cause of this error by I think it might be due to the time the page takes to load. As after a few seconds the buttons all function fine. The main buttons with this issue are as follows: the bookmark button on the recipe cards and the check item box on the cocktail recipe page.

**This bug is still present in the live site**

### **Cocktail bookmark icon wouldn’t update when bookmarked or unbookmarked**

Due to a type error comparing the cocktail._id. When an object id is stored to the database it is stored as string. This meant that the if statement controlling the state of the bookmark icon couldn’t compare the cocktails’ Object(‘id’) to just the string of the id in the user bookmarks.

**Fix: Converted the cocktail._id to a sting in the Jinja if statement before comparison.**

### **Deleting a cocktail through an error about user bookmarks or rated cocktails could not be iterated**

This was due to when only a single cocktail was in the bookmarks or rated cocktails list and it was removed the type in the database would be changed from array to null. Therefore meaning it could no longer be iterated.

Fix: When a cocktail is deleted it is removed from all user bookmarks and rated cocktails so as not to clog up the database with useless entries which may slow it down. So when a single cocktail is in left in an array and it is deleted it is not removed but the array is instead set to an empty array.

### **Recipe Card Carousel (Swiper JS) responsiveness when browser snapped to new size**

The carousel will change how many cocktails are presented to the user in each selection based on the users’ browser width. However if the user clicks the full screen button or snapps the window to say one half of their monitor, instead of dragging it to the new size, the carousel will have the same amount of cocktails as the previous browser size. 

The way breakpoints for the amount of cocktails is determined in the live site is by an event listener (listening for window resizes) that contains if statements for each breakpoint. These breakpoints are then passed to the Swiper JS function.

~I have tried changing how the breakpoints are set several times but unfortunately I couldn’t find a solution.~

Due to when the browser is snapped to a new size the actual resizing scrolls through all the sizes inbetween. The function I wrote to get the width of the browser ran to quickly retrieving one of these inbetween width value and set the number of slides / cocktails based off of it instead of the final size.

**Fix: add a short timeout to the function allows the resizing to complete before setting the width value**

### Image URL Validation

I couldn't work out a way to validate URLs for images or if the URLs actually pointed to an image.
I set up a image preview so the user can self validate if the URL works. The user can however add any URL even if it doesn't point an image.

**This issue is still present in the live site**

### Bad URLs cause errors

Sometimes when the user types values into the URL bar after the domain name it caused the debugger to throw errors for example if the user typed a bad cocktail ID for the cocktail recipe page.

Some are handled by the the 404 error catcher I add but some returned 500 errors which causes the site to break.

**This issue is still present in the live site**

### JGuery Error in Console Log on Search 

When a user searches for something containing a space JQuery throws an error as the search query is passed to the function via the URL.

The spaces in URL cause this error.

**This issue is still present in the live site**

### Form invalid messages being displayed even when inputs correct on cocktail form

Using brootstrap form validation for the ingredients inputs its seem if one is invalid in a row all of them display their invalid message.

**This issue is still present in the live site**

## Deployment

### Remote Development
This web application is hosted on Heroku. [View Live Site](http://mixology-cocktails.herokuapp.com/home)

Please follows the steps below to set up the hosting:

1.  Make sure you have Procfile and a requirements.txt created. You can create one by running the the following command in command line: **echo web: python app.py > Procfile** and **"pip3 freeze --local > requirements.txt**
2.  You will need to turn off the debugger by going into the *app.py** and then right at the bottom turn the line **debug=True** to **debug=False**
3.  Commit and push all files to Github if not already.
4.  Login to Heroku and follow the steps to set up a new app.
5.  Once you land on the dashboard for the new app click on the “Settings” Tab.
6.  Scroll down to the Config Vars  and click “Reveal Config Vars”
7.  Add the variables form you env.py making sure both name and value match perfectly.
8.  Click on the “Depoly” Tab and Scroll down to “Deployment method”
9.  Click Github.
10. Scroll to “Connect to GitHub” your github name should appear in the select box then in the text box type your repository for the apps name. Click “Search” and your repository should appear underneath.
11. Click Connect.
12. Scroll to “Automatic deploys”  and choose a branch to deploy (master is preferred) in the selection box.
13. Click “Enable Automatic Deploys”, this will automatically build the web application everytime you push a commit to your Github repository for the app.
14. Alternatively to the last two steps you can manually deploy the app by scrolling down to “Manually deploy” and with “master” in the selection box click “Deploy Branch”.  

### Cloning Local Development

1. Open the Github repository - <https://github.com/LiamDHall/Mixology>
2.  Click the green drop down that says **Code**, **Download** or **Clone**.
 
    <img src="https://github.com/LiamDHall/Mixology/blob/master/static/images/readme-images/clone.png">
 
3.  To clone with HTTPS copy the URL in the box. <https://github.com/liamdhall/Mixology.git>
4.  Open up your Integrated Development Environment (IDE).
5.  Open your Command Line or equivalent if not already.
6.  Type **git clone** and paste the copied URL from step 3. 
    (Should look like **git clone https://github.com/liamdhall/Mixology.git**)
7.  If you then wanted to copy it to a specific folder add the folder name to the end.
    (Should look like **git clone https://github.com/liamdhall/Mixology.git <folder-name>**)
8.  Press Enter and a local clone will be created.
    The following steps are then required to make the clone work as intended using Gitpod. The following steps may vary based on the IDE you use.
9.  Sign Up for a free Mongodb account here <https://www.mongodb.com/cloud/atlas/signup>
10. Recreate the collections shown in the [Planning Doc](https://github.com/LiamDHall/Mixology/blob/master/supporting-docs/mixology-planning-doc.pdf) under Date Model / Schema section.
11. Install the required dependencies by running **pip3 install -r requirements.txt**
12. Create an env.py and a .gitignore file. Add the env.py to the .gitignore file to stop it from being committed and pushed to route storage.
13. In your env.py set the following value replacing the <placeholders> with your correct values
    
	**import os
	os.environ.setdefault("IP", "0.0.0.0")
	os.environ.setdefault("PORT", "5000")
	os.environ.setdefault("SECRET_KEY", "youSerectKey")
	os.environ.setdefault("MONGO_URI", "yourMongodbUrl")
	os.environ.setdefault("MONGO_DBNAME", "yourMongodbDatebaseName")**
    
14. Lastly before running the application you will need to turn the debugger on by going into the *app.py** and then right at the bottom turn the line **debug=False** to **debug=True**
15. In command line run **python3 app.py**
16. A pop up will appear in the bottom right hand corner.
17. I clicked on **Open Browser** and the website opens in a new tab.

    <img src="https://github.com/LiamDHall/Mixology/blob/master/static/images/readme-images/preview.png">

## Credits
Code from third parties has been credited in the code of the website where appropriate.

-   [Sanoj Dushmantha](https://stackoverflow.com/questions/17642872/refresh-page-and-keep-scroll-position#:~:text=Usually%20reload()%20restores%20the,scrollY%20%3D%3D%3D%200.&text=This%20might%20be%20useful%20for,click%20on%20a%20same%20position): used to stop the page scrolling back up to the top on page refresh.

    -   **Adpated to my needs by:**
        -   using session cookie instead of local storage.
        -   make it so it only works when the same page as the previous is loaded 

-   [adeneo](https://stackoverflow.com/questions/20820705/render-preview-image-from-url-input): for the image preview on the cocktail form.

-   [Ask SNB](https://bbbootstrap.com/snippets/star-rating-pure-css-19646372): for the CSS to create the star rating.

    -   **Adpated to my needs by:**
        -   changing the content of the star rating to Font Awesome Icons.
        -   changed colour to match brand colour.
        -   fixed the position of the stars when clicked.

-   [skelly](https://www.codeply.com/go/J70zkpygvk): CSS to create a custom breakpoint for bootstrap.

    -   **Adpated to my needs by:**
        -   changing the screen width that the breakpoint is active.

-   [Code Institute](https://codeinstitute.net/) - Provided the .theia .gitpod.dockerfile .gitpod.yml files in the repository which have not been modified by myself in anyway.
#### Images

All images are from 
-   [unsplash.com](https://unsplash.com/)
-   [pexels.com](https://www.pexels.com/)
-   [pixabay.com](https://pixabay.com/)

These images are all royality and copyright free meaning I don't need a license to use them.
I also don't need to credit the authors. 

### Acknowledgements
I would like to thank the Code Institute Tutor and my mentor Allen Varghese who supported me throughout this project.
 
I would also like to thank the following people for being test users and for helping me spell check the site:
-   Sasha S
-   Alec W
-   Kieran H
-   Chris H
-   Liz H
-   James T
I used the following websites for my research [W3C School](https://www.w3schools.com/), [Stack Overflow](https://stackoverflow.com/), [CSS Tricks](https://css-tricks.com/), [Get BEM](http://getbem.com/), [MongoDB Documents](https://docs.mongodb.com/manual/crud/)  and [Flask Documents](https://flask.palletsprojects.com/en/1.1.x/)for this project.
