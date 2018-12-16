import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import "./App.css";
import JournalEntryListContainer from "./home/JournalEntryListContainer.js";

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">See all journal entries</Link>
          </li>
          <li>
            <Link to="/journal-entry/create">Create new journal entry</Link>
          </li>
        </ul>
        <JournalEntryListContainer />
      </div>
    );
  }
}

export default hot(module)(App);
