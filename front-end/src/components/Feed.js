import React, {Component} from 'react';

class Feed extends Component {
    clickHaltResume(){
        this.props.setPlay()
    }

    clickClear(){
        this.props.clearTitles()
    }

    render(){
        let JSXTitles = this.props.titles.map((x) => {return <p>{x.data.headline}</p>})
        return(
            <div>
                <a className='play/pause btn btn-default' onClick={this.clickHaltResume.bind(this)}>
                    {this.props.play ? 'Halt' : 'Resume'}
                </a>
                <a className='clear btn btn-default' onClick={this.clickClear.bind(this)}>
                    Clear
                </a>

                <div className='headlineContainer'>
                    {JSXTitles}
                </div>
            </div>
        )
    }
}

export default Feed;