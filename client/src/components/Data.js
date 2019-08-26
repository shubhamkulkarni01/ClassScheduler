import React from 'react';
import Switch from 'react-switch';

import '../resources/App.css';
import '../resources/w3.css';

import help_icon from '../resources/help_icon.png';

import axios from 'axios';

class Data extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      res: null,
      fullTimes: [],
      currentData: null,
      checked: false, 
      animateOut: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.backButton = this.backButton.bind(this);
    this.animationEnd = this.animationEnd.bind(this);
  }

  handleChange(checked){
    this.setState({checked});
  }

  componentDidMount(){
    this.axiosRetryClass(1000);
  }

  axiosRetryClass(milliseconds){
    axios.get(this.props.url)
      .then( result => {
        const times = this.createFullTimesTable(result);

        this.setState({
          res: result.data,
          fullTimes: times
        });

        this.axiosRetryCache(1000);
      }).catch(e => { 
        console.log(`retrying in ${milliseconds} milliseconds`);
        setTimeout((() => this.axiosRetryClass(milliseconds+500)), milliseconds)
    });
  
  }

  createFullTimesTable(result){
    //loop through all historical term 
    //(Fall Winter and Spring of all prev yrs)
    const times = [];
    if(result.data.length > 0){
      result.data.forEach( course => {
        //loop through all lectures for each course-term.
        course.classes.forEach( cls => {
          //loop through all section for each lecture
          cls.discussions.forEach( row => {
            //use temp object to avoid unterminated JSX code issues
            const temp = [];
            temp.push(<td key="instructor"> {cls.instructor} </td>);
            temp.push(<td key="section"> {row.section} </td>);
            var msg = "";
            for(var i = row.enrollments.length - 1; i > -1; i--)
              if(row.enrollments[i].remaining >= 0)
                break;

            if(i === -1){
              i = 0;
              msg = " no enrollments > 0 ";
            }
            temp.push(<td key="time"> 
              {new Date(row.enrollments[i].time).toString('hh mm') + msg} 
            </td>);
            temp.push(<td key="remaining"> 
                {row.enrollments[i].remaining} </td>);

            times.push(<tr key={row.section}>{temp}</tr>);
          })
        })
      });
    }
    return times;
  }
  
  axiosRetryCache(milliseconds){
    axios.get(this.props.cacheUrl).then(cache => 
      this.setState({ currentData: cache.data })
    ).catch(e => { 
      if(milliseconds > 5000)
        this.axiosRetryClass(1000);
      console.log(`retrying in ${milliseconds} milliseconds`);
      setTimeout((() => this.axiosRetryCache(milliseconds+500)), milliseconds);
    });
  }

  backButton(e){
    this.props.backButton();
    console.log('back button clicked');
  }

  animationEnd(e){
  }

  render(){ 
    console.log(this.props.staticData);
    if(this.state.res === null )
      return (
        <div className="loadercontainer">
          <h1 align="center" className="loadertext"> Loading... </h1>
          <div className="loader"> </div>
        </div>
      );

    if(this.state.res.length !== 0)
      var fullTimes = (  
          <table>
            <thead>
              <tr key="head">
                <th> Instructor </th>
                <th> Section </th>
                <th> Time of Fill </th>
                <th> Remaining Seats at that time </th>
              </tr>
            </thead>
            <tbody>
              {this.state.fullTimes}
            </tbody>
          </table>
          );

    if(this.state.currentData !== null)
      var table2 = this.state.currentData.classes.map((cls, index) => 
        <ClassDisplay key={index} data={cls} />);

    const table3 = this.state.res.map((element, index) => 
      <PrevClassContainer key={index} courseTerm={element} 
                          currTerm={this.props.staticData.term} 
                          handleChange={this.handleChange} 
                          checked={this.state.checked}/>);

    return (
        <div className="dataClass">
          <div className="dataHeader">
            <div className="backButton" onClick={this.backButton}/>
            <h1 className="dataTitle"> {this.props.clsName} </h1>
          </div>
          <h2 className="heading-label">
            Current Class Data
            <div className="tooltip">
              <img className="tooltip-image" src={help_icon} alt="Help" />
              <span className="tooltiptext"> Displays current class data in 
              a graphical format to make it easy to see how many seats are 
              available. </span>
            </div>
          </h2>
            {this.state.currentData == null ? 
              (
              <div className="loadercontainer" 
                  style={{
                    margin: '20px', 
                    maxHeight: '400px', 
                    minWidth: '500px'}}>
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
}

function ClassDisplay(data){
  return (
    <div className="w3-card-4 w3-white" 
        style={{
          margin: '20px', 
          maxHeight: '400px', 
          minWidth: '500px', 
          overflowY: 'auto'}}>
      <header className="w3-container w3-blue">
        <h2> {data.data.lecture} </h2> 
        <h4> {data.data.instructor} </h4>
      </header>
      <div className="w3-container">
        {data.data.discussions.map((el,index) => 
                <ClassBar key = {index} data = {el} /> )}
      </div>
    </div>
  )
}

function ClassBar(data){
  const {remaining, total} = data.data.enrollments[0];
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
    <div className="w3-card-4 w3-white" 
        style={{
          margin: '20px', 
          maxHeight: '400px', 
          minWidth: '550px', 
          overflowY: 'auto'}}>
      <header className="w3-container w3-blue displayHeader">
        <h1> {props.courseTerm.term} </h1> 
	<div className="toggle-switch-container">
          <div className="tooltip top-tooltip toggle-switch-text">
            Exact Time
            <span className="tooltiptext"> Exact time will show when the class 
            filled up according to a clock (date and time). </span>
          </div>
          <Switch onChange={props.handleChange} checked={props.checked} 
                  className="toggle-switch" onColor={"#888"} 
                  uncheckedIcon={false} checkedIcon={false} />
          <div className="tooltip top-tooltip toggle-switch-text">
            Elapsed Time
            <span className="tooltiptext"> Elapsed time will show when the class 
            filled up relative to the start of first pass. </span>
          </div>
	</div>
      </header>
      <div className="w3-container" style={{margin:'10px'}}>
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
                    elapsedTime={props.checked} /> )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PrevClass(props){
  //console.log(props.cls);
  //console.log(props.currClass);
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

  var arbitraryDate = "2019/06/21 16:20:00";

  /* return (
    <div className="cls-graph-parent"> 
      <div className="cls-graph-section">
        { props.cls.lecture }
      </div>
      <div className="cls-graph-section">
        { props.cls.instructor }
      </div>
      <div className="cls-graph-text">
        {(lastFillTime === 0)? <div> No data found </div> :
        new Date(lastFillTime).toString().substring(4, 21)}
      </div>
    </div>
  ); */

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
                  /86400000*24).toFixed(0) + " hours": 
        new Date(lastFillTime).toString().substring(4, 21)}
      </td>
    </tr>
  );
}

export default Data;
