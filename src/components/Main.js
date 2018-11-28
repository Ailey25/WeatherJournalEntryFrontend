import React, { Component } from "react";
import { Route } from "react-router-dom";
import JournalEntry from "./JournalEntry.js";
import JournalEntryList from "./JournalEntryList.js";

import WeatherStamp from "./WeatherStamp.js";

// HARDCODED OBJECTS
const weatherObject1 = {
  main: {
    temp: 3.0,
    temp_min: 0.0,
    temp_max: 6.0,
  },
  weather: {
    description: 'Not as chilly',
  },
  name: 'Toronto',
  weatherObjectId: '1'
};

const journalEntryList1 = [
  {
    id: '1',
    title: "journal 1 title",
    entry: "some journal entry",
    weatherObject: weatherObject1,
  },
  {
    id: '2',
    title: "journal 2 title",
    entry: "another journal entry",
    weatherObject: weatherObject1,
  }
];
//------------

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => {
          return (
            <JournalEntryList
              journalEntryList={journalEntryList1} />
          );
        }} />
        <Route path="/journal-entry/:mode" render={(props) => {
          return (
            <JournalEntry key={props.match.params.mode} {...props} />
          );
        }} />
      </div>
    );
  }
}

export default Main;
