# voronoi-frontend-
<img src="Comb.png" alt="Honeycomb" width="1200"/>

`Honeycomb🐝` provides a way to search for all your bookmarks instead of sifting through folder after folder. The app's mission is to change the way we locate a saved bookmark.

Requires [Honeycomb🐝 front end](https://github.com/markghaida/voronoi-frontend-) and [Honeycomb🐝 back end](https://github.com/markghaida/voronoi-back).

## Live Link & Demo

Visit the [Live Link](https://honeycomb-app.netlify.app/) 

Watch the [Demo](https://www.loom.com/share/c99014653d9b42ef8ad25c5ed7229a85)

## Technologies Used

`Honeycomb🐝` is built with a `React` front end, a `Ruby on Rails` and `PostgreSQL` back end, `Paper.js` for the honeycomb-like design, and `Kumarai Rails Gem` to srape all websites for metadata. All styling was done with custom CSS. The live link for `Honeycomb🐝` is deployed on [Netlify](https://honeycomb-app.netlify.app/) with [Heroku](https://honeycomb-app.herokuapp.com/bookmarks) for the back end.

## Features

The name ***Honeycomb*** comes from the design of how the bookmarks are displayed.  The design is actually a voronoi diagram which creates a honeycomb effect.  Users are both able to create bookmarks and search for a saved bookmark. Once a user comes across a website they would like to save, they simply have to copy the url and paste it into the search bar.  It is now saved.  Simply search for the site by typing the title of the bookmarked site.

### User Authentication

Users are able to sign up or login. There are validations when creating an account. Users may also register using their Google account. Upon a successful account creatation/login attempt, a `JWT Token` is issued to store the user's session.

Once logged in, the user is brought to their profile page where they'll see all their past requests and donations. 

<img src="./assets/login.gif" alt="login" width="800"/>

### Creating Requests

When creating requests, users may select from a set list of items. The items are separated by category and users may filter items by name. Certain food and clothing items allow the user to specify a quantity and/or preference. All other items default to a quantity of one.

<img src="./assets/create-request.gif" alt="create request" width="800"/>

There is a limit of 10 items per request. Once exceeded, an alert appears. Users may also remove items from their request by clicking remove.

<img src="./assets/request-limit.gif" alt="create request 2" width="800"/>

Once a request is complete, the user is brought back to their profile page where they'll see the newly created request with a pending status.

<img src="./assets/complete-request.gif" alt="create request 3" width="800"/>

### Fulfilling Requests

Users are able to view all the current pending requests and filter them by distance away. If they have all the items requested, they may accept the request. Once accepted a chat will be assigned to the recipient and the donor.

<img src="./assets/accept-request.gif" alt="accept request" width="800"/>

Once accepted, the status for the request will now show as accepted for both the recipient and donor.

<img src="./assets/accepted-request.gif" alt="accepted request" width="800"/>

Within each chat, users are able to see the items requested, as well as a map showing the distance between the two users. The map uses [GoogleMap](https://developers.google.com/maps)'s API and pinpoints both users' geolocations.

<img src="./assets/chat-features.gif" alt="chat features" width="800"/>

The recipient and donor are able to chat in real-time due to WebSocket integration. They may also send emojis. 

<img src="./assets/chat.gif" alt="chat" width="800"/>

Once the exchange has been made, either user can mark the request as fulfilled. Doing so will be reflected for both the recipient and donor. The status of the request on their profile pages will be updated to fulfilled.

<img src="./assets/fulfilled-request.gif" alt="fulfilled request" width="800"/>

### Logging Out

When a user is complete with their session, they're able to log out. Once logged out, the stored `JWT Token` is deleted and they're brought back to the home page.

<img src="./assets/logout.gif" alt="log out" width="800"/>

### Accessibility

Honeycomb🐝 was created with all custom CSS and the use of media queries, making the app is mobile friendly. The sizing of all elements adjust depending on the window size.

<img src="./assets/mobile.gif" alt="mobile friendly" width="800"/>

## License

The [MIT](https://choosealicense.com/licenses/mit/) License

Copyright (C) 2021 - [Mark Ghaida](https://github.com/markghaida) 
