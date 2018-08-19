import React, { Component } from 'react'
import Baloon from './stateless/Baloon'
import './App.css'
import {BaloonTypes, BaloonStatuses} from './Consts'
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
