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
    this.playFeed = this.playFeed.bind(this)
    this.pauseFeed = this.pauseFeed.bind(this)
    this.clearTitles = this.clearTitles.bind(this)
  }
  componentWillMount(requestFunction) {
    setInterval(this.requestFunction, 500)
  }
  requestFunction() {
    if (this.state.play) {
      axios.get('http://localhost:8080/title').then( response => {
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
  playFeed() {
    this.setState({play: true})
  }
  pauseFeed() {
    this.setState({play:false})
  }
  clearTitles(){
    this.setState({titles: []})
  }
  render() {
    return (
      <div className="App container">
        <h1> Today's Mood </h1>
        <Feed playFeed={this.playFeed}
              pauseFeed={this.pauseFeed} 
              clearTitles={this.clearTitles} 
              play={this.state.play}
              titles={this.state.titles} />
        <SideBar titles={this.state.titles} />
      </div>
    )
  }
}

export default App
