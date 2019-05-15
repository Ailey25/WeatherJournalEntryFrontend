# Weather Journal Frontend

Weather journal allows the creation, management, and viewing of diary entries.
Weather information is queried from Weather API by the backend
City ID can be obtained by downloading the `city.list.json.gz` file from [OpenWeatherMap](http://bulk.openweathermap.org/sample/)


This is the frontend portion of Weather Journal.

`Node.js` `React.js` `react-router` `react-redux` `styled-components` `html` `CSS`

###### Architecture
- `react-router` is used to navigate through different pages of the app
- User and weather information is stored and queried from the backend

### To run the repository
- Clone and download the repository
- Type `npm install` to install the dependencies
- For development mode, type `npm start` to run the project
- For production mode, type `npm run build` followed by `npm run-script server` to run the project
- For test mode, type `npm test` to run the tests
