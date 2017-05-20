import React, {Component} from 'react';

class Feed extends Component {
    clickHaltResume() {
        this.props.setPlay()
    }

    clickClear() {
        this.props.clearTitles()
    }
    assignClass(tone) {
        return tone.reduce( (prev, curr) => {return prev.score > curr.score ? prev : curr}).tone_id
    }

    render(){
        let JSXTitles = this.props.titles.map((x, i) => {return <p className={`entry ${this.assignClass(x.tone)}`}>{i}  {x.article.title}</p>})
        return(
            <div className="feed-parent col-sm-6">
                <div className="feed-buttons">
                    <a className='play/pause btn btn-default' onClick={this.clickHaltResume.bind(this)}>
                        {this.props.play ? 'Halt' : 'Resume'}
                    </a>
                    <a className='clear btn btn-default' onClick={this.clickClear.bind(this)}>
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