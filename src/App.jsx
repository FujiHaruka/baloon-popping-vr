import React, { Component } from 'react'
import './App.css'
import Game from './Game'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Game />
    )
  }

  componentDidMount () {
    // this.startSphereTimer()
  }
}

export default App
