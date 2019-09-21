import React from 'react';

import '../resources/App.css';
import '../resources/w3.css';

import {ClassDisplay} from './Data.js'

class Detail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: 0,
      time: 0
    }
  }

  handleDate = (e) => {
    this.setState({date: e.target.value});
  }

  handleTime = (e) => {
    this.setState({time: e.target.value});
  }

  getScaledTime = () => {
    return 900000 * this.state.time;
  }

  getScaledDate = () => {
    return 86400000 * this.state.date;
  }

  render(){
    if(!this.props.render) 
      return <div className="blankDiv" />;

    /*
    const initialDate = this.props.staticData.termStartDict[this.props.term][0]
    */
    const initialDate = 1568235032356;
    const millis = initialDate + this.getScaledDate() + this.getScaledTime();

    console.log(millis);

    const time = new Date(millis).toString();
    console.log(time);

    if(this.props.res !== null)
      var classDisp = this.props.res.classes.map((element, index) => 
        <ClassDisplay data={element} time={millis} />);
   
    return (
      <div className="blankDiv"> 
        <div className="detail-slider-wrapper">
          <input type="range" min="0" max="14" className="slider" 
                 onChange = {this.handleDate} value = {this.state.date} />
          {time.substring(0, 11)}
        </div>

        <div className="detail-slider-wrapper">
          <input type="range" min="0" max="60" className="slider" 
                 onChange = {this.handleTime} value = {this.state.time}/>
          {time.substring(15, 20)}
         </div>

        {this.props.res !== null ? classDisp : null}
      </div>
    )
  }
}

export default Detail;
