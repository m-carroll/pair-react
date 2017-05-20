import React, { Component } from 'react'
import Feed from './components/Feed'
import SideBar from './components/SideBar'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state={
      titles: [],
      play: true,
      agreggate: null,
    }
    this.requestFunction = this.requestFunction.bind(this)
  }
  componentWillMount() {
    setInterval(this.requestFunction, 500)
  }
  requestFunction() {
    if (this.state.play) {
      axios.get('http://localhost:8080/titles').then( response => {
        if (response.data) {
          this.setState({
            titles: [response.data].concat(this.state.titles)
          })
        }
      }).catch( err => {
        console.log(err)
      })
    }
  }
  setPlay(){
    this.setState({play: !this.state.play})
  }

  clearTitles(){
    this.setState({titles: []})
  }

  render() {
    return (
      <div className="App container">
        <h1> Today's Mood </h1>
        <Feed setPlay={this.setPlay.bind(this)} 
              clearTitles={this.clearTitles.bind(this)} 
              play={this.state.play}
              titles={this.state.titles} />
        <SideBar titles={this.state.titles} />
      </div>
    )
  }
}

export default App
