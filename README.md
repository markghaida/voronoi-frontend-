<img src="Comb.png" alt="Honeycomb" width="1200"/>

`Honeycomb🐝` provides a way to search for all your bookmarks instead of sifting through folder after folder. The app's mission is to change the way we locate a saved bookmark.

Requires [Honeycomb🐝 front end](https://github.com/markghaida/voronoi-frontend-) and [Honeycomb🐝 back end](https://github.com/markghaida/voronoi-back).

## Live Link & Demo

Visit the [Live Link](https://honeycomb-app.netlify.app/) 

Watch the [Demo](https://www.loom.com/share/c99014653d9b42ef8ad25c5ed7229a85)

## Technologies Used

`Honeycomb🐝` is built with a `React` front end, a `Ruby on Rails` and `PostgreSQL` back end, `Paper.js` for the honeycomb-like design, and `Kumarai Gem` to srape all websites for necessary metadata. All styling was done with custom CSS. The live link for `Honeycomb🐝` is deployed on [Netlify](https://honeycomb-app.netlify.app/) with [Heroku](https://honeycomb-app.herokuapp.com/bookmarks) for the back end.

## Features

The name ***Honeycomb*** comes from the design of how the bookmarks are displayed.  The design is actually a voronoi diagram which creates a honeycomb effect.  Users are both able to create bookmarks and search for a saved bookmark. Once a user comes across a website they would like to save, they simply have to copy the url and paste it into the search bar.  It is now saved.  Simply search for the site by typing the title of the bookmarked site.

### Create a Bookmark

Users are able to save a bookmark.  Once you navigate to a website that you are interested in saving for later; copy the url address, paste it in the search bar, and then wait a couple seconds.  That's it! It's bookmarked.

<img src="How to Save a Bookmark.gif" alt="login" width="800"/>

### Search For a Bookmark

Once a bookmark is saved, simply begin searching for the website's name.  Honeycomb scrapes the bookmark's h1 title, body text, and main image.

<img src="How to Search For a Bookmark.gif" alt="create request 3" width="800"/>

## License

The [MIT](https://choosealicense.com/licenses/mit/) License

Copyright (C) 2021 - [Mark Ghaida](https://github.com/markghaida) 
