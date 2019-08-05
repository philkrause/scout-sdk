import React, { Component } from 'react'
import Stats from './Stats'
import Data from './scout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
require('dotenv').config({ path: '../.env' })

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={Data} />
            <Route path="/stats" exact component={Stats} />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
