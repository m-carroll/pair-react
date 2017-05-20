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
    let JSXStats = this.props.titles.reduce( (prev, curr) => {
      return curr.tone.map((x, i) => {
        return prev[i] + x.score
      })
    }, [0,0,0,0,0]).map( (x, i) => {
      return {type:toneStats[i].type, score: x / this.props.titles.length}
    }).sort((a, b) => {
      return a.score < b.score
    }).map( x => {
      return <h3>{x.type}: {Math.floor(x.score*100000)/100000}</h3>
    })
    return (
      <div className="sidebar-parent col-sm-5 pull-right">
        <form className="">
        </form>
        {JSXStats}
      </div>
    )
  }
}
export default SideBar