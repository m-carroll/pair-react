import React, {Component} from 'react';

class SideBar extends Component {
  render() {
    let toneStats = [
                    {type:'ANGER', score:0}, 
                    {type:'DISGUST', score:0}, 
                    {type:'FEAR', score:0}, 
                    {type:'JOY', score:0}, 
                    {type:'SADNESS', score:0}
                   ]
    let JSXStats 
    if (this.props.titles.length) {
      JSXStats = this.props.titles.reduce( (prev, curr) => {
        return curr.tone.map((x, i) => {
          return prev[i] + x.score
        })
      }, [0,0,0,0,0]).map( (x, i) => {
        return {type:toneStats[i].type, score: x / this.props.titles.length}
      }).sort((a, b) => {
        return a.score < b.score
      }).map( (x, i) => {
        return <div key={i} className="sidebar-emotion">
                {x.type} 
                <div className={`${x.type.toLowerCase()}`} style={{'width':`${Math.floor(x.score*200)}%`, 'height': '25px'}}>
                </div>
              </div>
      })
    } else JSXStats = toneStats.map( (x, i) => { return <div key={i} className="sidebar-emotion">{x.type}:</div> })
    return (
      <div className="sidebar-parent col-sm-6 pull-right">
        <form className="">
        </form>
        {JSXStats}
      </div>
    )
  }
}
export default SideBar