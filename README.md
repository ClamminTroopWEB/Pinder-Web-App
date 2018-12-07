

Gavin Martin, Justin Baskaran, and Ian Christenson
November 25, 2018
CS336
Prof. Vander-Linden


DESIGN: Pinder for the Web


Stakeholders, 
we are pleased to announce the design of Pinder has been completed. Here's how it will work:

The application will have 3 main features: listing a pet for adoption, the abillity to find and match with pets that tailor to your needs, and the ability to view the pets you've matched with. 

The Database will have 2 collections: dogs and people. 
Each person object will have an id, usernames password, address, and a profile picture. Dogs will have an ownerID to connect them to their owner's profile. They will also have an id, breed, and a name.

Upon logging in, a cookie will be created to track your data for consistency. As you match dogs in the adopt tab, they will be stored in an array in the MongoDB database. 

React: When you click on the matches button, it will display all the dogs you've matched with using React.js. 

We hope that our web-app will speed up the proccess in which dogs get adopted and rescued from shelters. 

Thank you for your investment.

  - The Pinder Team



