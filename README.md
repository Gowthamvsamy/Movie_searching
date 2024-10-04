# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Show Time - Movie Search App

Show Time is a React-based movie searching application that allows users to search for movies, series, and episodes using the [OMDb API](http://www.omdbapi.com/). Users can filter search results by movie types and view detailed information about individual movies.

## Features

- **Search movies**: Users can search for movies by entering a search term.
- **Filter by type**: Filter search results by `Movie`, `Series`, or `Episode` using a dropdown menu.
- **Movie Details**: Click on a movie to view detailed information, such as plot, rating, runtime, and more.
- **Dark Mode**: Toggle between light and dark themes using the built-in dark mode context.
- **Loader**: A loading indicator (`Commet` from `react-loading-indicators`) is displayed while data is being fetched.
- **Responsive UI**: The app adjusts to different screen sizes, making it usable on mobile devices.

## Tech Stack

- **React**: The frontend is built using React.js.
- **Axios**: For making HTTP requests to the OMDb API.
- **OMDb API**: A free API used to fetch movie information.
- **Tailwind CSS**: For styling the UI components.
- **React Context API**: For managing global state (search term and dark mode).
- **react-loading-indicators**: For displaying loading indicators when fetching data.

## Usage

- **Search**: Enter the movie title in the search bar.
- **Filter by Type**: Use the Movies Type button to filter by Movie, Series, or Episode.
- **View Details**: Click on the Details button of any movie to view detailed information about that movie.
- **Dark Mode**: The app automatically switches between dark and light modes based on your system settings.

- **Search Functionality**: Fetches data from OMDb API based on the search term and selected type (Movie, Series, Episode).
- **Dropdown Menu**: A toggleable dropdown for selecting the type of content.
- **Movie Cards**: Displays the list of movies fetched from the API.
- **Modal**: Opens a modal to display detailed information about the selected movie.

## Dependencies

- **React**: Frontend framework used for building the app.
- **axios**: For making HTTP requests to the OMDb API.
- **react-loading-indicators**: For showing loading spinners.
- **TailwindCSS**: Used for styling the app.
- **react-icons**: For icons used in the app (like star ratings).