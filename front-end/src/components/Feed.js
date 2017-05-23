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
    maxScore(tone) {
        return tone.reduce( (prev, curr) => {return prev.score > curr.score ? prev : curr}).score
    }

    render(){
        let JSXTitles = this.props.titles.map( (x, i) => {
            return <a key={i}
                      href={x.article.url}
                      style={{opacity: this.maxScore(x.tone) < 0.5 ? 0.5 : 1}}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`entry ${this.assignClass(x.tone)}`} 
                      onClick={this.clickHaltResume}>
                      {x.article.title} | {x.source.split('-').map(x => {return x[0].toUpperCase()+x.slice(1, x.length)}).join(' ')}
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