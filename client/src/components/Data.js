import React from 'react';
import '../resources/App.css';
import '../resources/w3.css';

import axios from 'axios';

class Data extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      res: null,
      fullTimes: [],
      currentData: null
    };
  }

  componentDidMount(){
    axios.get(this.props.url)
      .then( result => {
          //loop through all historical term 
          //(Fall Winter and Spring of all prev yrs)
          const times = this.state.fullTimes;
          if(result.data.length > 0){
            result.data.forEach( course => {
              //loop through all lectures for each course-term.
              course.classes.forEach( cls => {
                //loop through all section for each lecture
                cls.discussions.forEach( row => {
                  //use temp object to avoid unterminated JSX code issues
                  const temp = [];
                  temp.push(<td> {cls.instructor} </td>);
                  temp.push(<td> {row.section} </td>);
                  var msg = "";
                  for(var i = row.enrollments.length - 1; i > -1; i--)
                    if(row.enrollments[i].remaining >= 0)
                      break;

                  if(i === -1){
                    i = 0;
                    msg = " no enrollments > 0 ";
                  }
                  temp.push(<td> 
                    {new Date(row.enrollments[i].time).toString('hh mm') + msg} 
                  </td>);
                  temp.push(<td> {row.enrollments[i].remaining} </td>);

                  times.push(<tr> {temp} </tr>);
                })
              })
            });
          }

          this.setState({
            res: result.data,
            fullTimes: times
          });

          this.axiosRetry();
      });
  }
  
  axiosRetry(){
    axios.get(this.props.cacheUrl).then(cache => 
      this.setState({ currentData: cache.data })
    ).catch(e => this.axiosRetry());
  }

  render(){ 
    if(this.state.res === null || this.state.currentData === null)
      return <p> Loading </p> 

    if(this.state.res.length !== 0)
      var fullTimes = (  
          <table>
            <tr>
              <th> Instructor </th>
              <th> Section </th>
              <th> Time of Fill </th>
              <th> Remaining Seats at that time </th>
            </tr>
            {this.state.fullTimes}
          </table>
          );

    const table2 = this.state.currentData.classes.map((cls, index) => 
      <ClassDisplay data={cls}/>);

    return (
        <div>
          <br/>
          <br/>
          <h1>
            Current Class Data
          </h1>
          <table className="row">
            {table2}
          </table>
          <br/>
          <br/>
          <h1>
            Historical Data
            <div className="tooltip">     help
              <span className="tooltiptext"> insert help message </span>
            </div>
          </h1>
          {fullTimes}

        </div>
    );
  }
}

function ClassDisplay(data){
  return (
    <div className="w3-card-4" 
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
        {data.data.discussions.map(el => <ClassBar data= {el} /> )}
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

  return (
    <div className="cls-graph-parent">
      <div className="cls-graph-section">
        {data.data.section}
      </div>
      <div className="cls-graph-outline" >
        <div className="cls-graph-bar" style={style}>
          {style.width} 
        </div>
      </div>
      <div className="cls-graph-text">
        { seatinfo }
      </div>
    </div>
  );
}

function PrevClassContainer(data){
  return (
    <div className="w3-card-4" 
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
        {data.data.discussions.map(el => <PrevClass data= {el} /> )}
      </div>
    </div>
  )
}

function PrevClass(data){
  return (<div/>);
}

export default Data;
