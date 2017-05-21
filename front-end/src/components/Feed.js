import React, {Component} from 'react';

class Feed extends Component {
    constructor() {
        super()
        this.clickHaltResume = this.clickHaltResume.bind(this)
        this.clickClear = this.clickClear.bind(this)
    }
    clickHaltResume(play) {
        play ? this.props.pauseFeed() : this.props.playFeed()
    }

    clickClear() {
        this.props.clearTitles()
    }
    assignClass(tone) {
        return tone.reduce( (prev, curr) => {return prev.score > curr.score ? prev : curr}).tone_id
    }
    assignOpacity(tone) {
        return tone.reduce( (prev, curr) => {return prev.score > curr.score ? prev : curr}).score
    }

    render(){
        let JSXTitles = this.props.titles.map( x => {
            return <a href={x.article.url}
                      style={{opacity: this.assignOpacity(x.tone)}}
                      target="_blank" 
                      className={`entry ${this.assignClass(x.tone)}`} 
                      onClick={this.clickHaltResume}>
                      {x.article.title}
                   </a>
        })
        return(
            <div className="feed-parent col-sm-6">
                <div className="feed-buttons">
                    <a className='play/pause btn btn-default' onClick={() => this.clickHaltResume(this.props.play)}>
                        {this.props.play ? 'Halt' : 'Resume'}
                    </a>
                    <a className='clear btn btn-default' onClick={this.clickClear}>
                        Clear
                    </a>
                </div>
                <div className='feed'>
                    {JSXTitles}
                </div>
            </div>
        )
    }
}
export default Feed;