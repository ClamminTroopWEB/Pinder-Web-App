Gavin Martin, Justin Baskaran, and Ian Christenson November 25, 2018 CS336 Prof. Vander-Linden

DESIGN: Pinder for the Web

Stakeholders, we are pleased to announce the design of Pinder has been completed. Here's how it will work. We will have a main screen with 4 options. The option to list a pet, adopt/match with a pet, view your matches, and view your profile. This app will let you find pets to adopt and list your own for adoption. It will have three main collections for the MongoDB database. A collection for people and dogs. People will have ids, username (email), password, address, and a profile picture stored as a base64 string. Dogs will have owner IDs to connect them to their owner's profile, ids, breed and name. Logging in will get the info from the database and create a cookie for login information. Every time you load the web-page URL, it will take you to the main screen, but if you have cookies already set, it will automatically mark you as logged in, if not it will take you to the login page. As you like dogs in the adopt tab, they will be put in your profile's array of match ids. When you load my matches, it will load up all of your match IDs using React. This way they won't slow down your browser and it will update live if you were to like dogs from a separate tab.

We hope our web page will allow more dogs to be adopted from shelters, keep strays off the streets, and allow happy owners to find dogs and adopt dogs that they find to their liking.
