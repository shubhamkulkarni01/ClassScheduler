import React from 'react';
import Switch from 'react-switch';

import '../resources/w3.css';
import '../resources/App.css';

import help_icon from '../resources/help_icon.png';

class Data extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      checked: false, 
      animateOut: false
    };
  }

  handleChange = (checked) => {
    this.setState({checked});
  }


  backButton = (e) => {
    this.props.backButton();
    console.log('back button clicked');
  }

  render(){ 
    if(!this.props.render)
      return <div className="blankDiv" />

    if(this.props.res === null )
      return (
        <div className="loadercontainer">
          <h1 align="center" className="loadertext"> Loading... </h1>
          <div className="loader"> </div>
        </div>
      );

    if(this.props.res.length !== 0)
      var fullTimes = (  
          <table className="full-times-table">
            <thead>
              <tr key="head">
                <th> Instructor </th>
                <th> Section </th>
                <th> Time of Fill </th>
                <th> Remaining Seats at that time </th>
              </tr>
            </thead>
            <tbody>
              {this.props.fullTimes}
            </tbody>
          </table>
          );

    if(this.props.currentData !== null)
      var table2 = this.props.currentData.classes.map((cls, index) => 
        <ClassDisplay key={index} data={cls} />);

    const table3 = this.props.res.map((element, index) => 
      <PrevClassContainer key={index} courseTerm={element} 
                          currTerm={this.props.staticData.term} 
                          termStartDict={this.props.staticData.termStartDict}
                          handleChange={this.handleChange} 
                          checked={this.state.checked}
                          onClick={this.props.testDetail}/>);

    return (
        <div className="dataClass">
          <h2 className="heading-label">
            Current Class Data
            <div className="tooltip">
              <img className="tooltip-image" src={help_icon} alt="Help" />
              <span className="tooltiptext"> Displays current class data in 
              a graphical format to make it easy to see how many seats are 
              available. </span>
            </div>
          </h2>
            {this.props.currentData == null ? 
              (
              <div className="loadercontainer" >
               <h1 align="center" className="loadertext"> Loading... </h1>
                <div className="loader"> </div>
              </div>
              ):
              (
              <div className="row">
                {table2}
              </div>
              )
            }
          <h2 className="heading-label">
            Historical Data
            <div className="tooltip">
              <img className="tooltip-image" src={help_icon} alt="Help" />
              <span className="tooltiptext"> Historical class data helps you 
              plan classes based on when they usually fill up. </span>
            </div>
          </h2>
          <div className="row">
            {table3}
          </div>
          {fullTimes}

        </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    Object.entries(this.state).forEach(([key, val]) =>
      prevState[key] !== val && console.log(`State '${key}' changed`)
    );
  }
}

export function ClassDisplay(data){
  return (
    <div className="w3-card-4 w3-white row-item" > 
      <header className="w3-container w3-blue row-header">
        <h2> {data.data.lecture} </h2> 
        <h4> {data.data.instructor} </h4>
      </header>
      <div className="w3-container row-body">
        {data.data.discussions.map((el,index) => 
                <ClassBar key = {index} data = {el} 
                          time = {data.time !== null ? data.time : null} /> 
        )}
      </div>
    </div>
  )
}

export function ClassBar(data){
  var remaining, total;
  if(data.time !== undefined){
    var tempVar = data.data.enrollments.find(e => e.time >= data.time);
    if(tempVar === undefined || tempVar === null)
      tempVar = data.data.enrollments[data.data.enrollments.length-1];
    remaining = tempVar.remaining;
    total = tempVar.total;
  }
  else{
    remaining = data.data.enrollments[0].remaining;
    total = data.data.enrollments[0].total;
  }
  var percentage = ((total-remaining)/total*100).toFixed(0);
  if(percentage > 100) 
    percentage = 100;
  var style = {width: `${percentage}%`};
  if(percentage > 90 )
    style.background = `repeating-linear-gradient( 
        -45deg,
        #d11717, 
        #d11717 10%, 
        #ba1414 10%, 
        #ba1414 20%
    )`;
  var seatinfo = '';
  if(remaining > 0) 
    seatinfo = `${remaining} remaining out of ${total} seats`;
  else 
    seatinfo = `${total} total seats, waitlist at ${remaining*-1}`;
        
  if(percentage > 20)  
      var bar = (
      <div className="cls-graph-bar" style={style}>
        {style.width} 
      </div>);
  else
      bar = 
      (<>
          <div className="cls-graph-bar" style={style} />
          <div> {style.width} </div>
      </>);

  return (
    <div className="cls-graph-parent">
      <div className="cls-graph-section">
        {data.data.section}
      </div>
      <div className="cls-graph-outline" >
        {bar}
      </div>
      <div className="cls-graph-text">
        { seatinfo }
      </div>
    </div>
  );
}

function PrevClassContainer(props){
  /*
  return (
    <div className="w3-card-4" 
        style={{
          margin: '20px', 
          maxHeight: '400px', 
          minWidth: '500px', 
          overflowY: 'auto'}}>
      <header className="w3-container w3-blue">
        <h1> {props.courseTerm.term} </h1> 
      </header>
      <div className="w3-container">
        {props.courseTerm.classes.map((el, index) => 
              <PrevClass key = {index} cls = {el} /> )}
      </div>
    </div>
  );*/

    //replaces line 269 (one line inside tbody) in production
    /* {props.courseTerm.classes.filter(cls => cls.term !== props.currTerm)
       .map((el, index) => <PrevClass key = {index} cls = {el} /> )} */
  return (
    <div className="w3-card-4 w3-white row-item-2" >
      <header className="w3-container w3-blue displayHeader">
        <h1 onClick={() => props.onClick(props.courseTerm.term)}> 
          {props.courseTerm.term} 
        </h1> 
	<div className="toggle-switch-container">
          <div className="tooltip top-tooltip toggle-switch-text">
            Exact Time
            <span className="tooltiptext-exact"> Exact time will show when 
            the class filled up according to a clock (date and time). </span>
          </div>
          <Switch onChange={props.handleChange} checked={props.checked} 
                  className="toggle-switch" onColor={"#888"} 
                  uncheckedIcon={false} checkedIcon={false} />
          <div className="tooltip top-tooltip toggle-switch-text">
            Elapsed Time
            <span className="tooltiptext-elapsed"> Elapsed time will show when 
              the class filled up relative to the start of first pass. </span>
          </div>
	</div>
      </header>
      <div className="w3-container">
        <table className="prev-class-table">
          <thead>
            <tr key="head" className="prev-class-table">
              <th className="prev-class-table"> Instructor </th>
              <th className="prev-class-table"> Section </th>
              <th className="prev-class-table"> Time of Fill </th>
            </tr>
          </thead>
          <tbody>
            {props.courseTerm.classes.map((el, index) => 
                  <PrevClass key = {index} cls = {el} 
                    currTerm = {props.currTerm === props.courseTerm.term} 
                    term = {props.courseTerm.term}
                    termStart = {props.termStartDict[props.courseTerm.term]}
                    elapsedTime={props.checked} /> )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PrevClass(props){
  //console.log(props.cls);
  var lastFillTime = 0;
  props.cls.discussions.forEach( (disc, index) => {
    //check if discussion not filled yet

    if((disc.enrollments[disc.enrollments.length - 1].remaining > 0 && 
       props.currTerm === true) || (lastFillTime === -1)){
      lastFillTime = -1;
      return;
    }

    //store index of fill time for this discussion into i
    for(var i = disc.enrollments.length - 1; i > -1; i--)
      if(disc.enrollments[i].remaining > 0)
        break;

    //no positive remaining seat recorded
    if(i === -1){
      return;
    }
    
    //lastFillTime gets updated if we find a later time of fill.
    lastFillTime = disc.enrollments[i].time > lastFillTime ? 
                   disc.enrollments[i].time : lastFillTime;
  });

  //default to second pass for reference pt.
  var arbitraryDate = props.termStart[1];
  var flag = 1;

  //if the filltime is before second pass, use firstpass as the reference pt.
  if(lastFillTime < arbitraryDate){
    arbitraryDate = props.termStart[0];
    flag = 0;
  }

  return (
    <tr className="prev-class-table"> 
      <td className="prev-class-table"> {props.cls.instructor} </td>
      <td className="prev-class-table"> {props.cls.lecture} </td>
      <td className="prev-class-table">
        {(lastFillTime === 0) ? <div> No data found </div> :
        (lastFillTime === -1) ? <div> Class still has open seats </div> : 
        (props.elapsedTime) ? ((new Date(lastFillTime) - 
                  new Date(arbitraryDate))/86400000).toFixed(0) + " days and " + 
                  ((new Date(lastFillTime) - new Date(arbitraryDate))%86400000
                  /86400000*24).toFixed(0) + " hours since " + 
                  (flag === 0) ? "first pass" : "second pass": 
        new Date(lastFillTime).toString().substring(4, 21)}
      </td>
    </tr>
  );
}

export default Data;
