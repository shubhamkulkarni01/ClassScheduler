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
          axios.get(this.props.cacheUrl).then( cache => { 
            this.setState({ currentData: cache.data });
          });

          //loop through all historical term (Fall Winter and Spring of all prev yrs)
          const times = this.state.fullTimes;
          result.data.forEach( course => {
            //loop through all lectures for each course-term.
            course.classes.forEach( cls => {
              //loop through all section for each lecture
              cls.discussions.forEach( row => {

                //use temp object to avoid unterminated JSX code issues
                const temp = [];
                temp.push(<td> {cls.instructor} </td>);
                temp.push(<td> {row.section} </td>);
                for(var i = row.enrollments.length - 1; i > -1; i--)
                  if(row.enrollments[i].remaining > 0)
                    break;

                if(i === -1){
                  i = 0;
                }
                temp.push(<td> 
                  { new Date(row.enrollments[i].time).toString('hh mm') } 
                </td>);
                temp.push(<td> {row.enrollments[i].remaining} </td>);

                times.push(<tr> {temp} </tr>);
              })
            })
          });

          this.setState({
            res: result.data,
            fullTimes: times
          })
      });
  }

  render(){ 
    if(this.state.res === null || this.state.currentData === null)
      return <p> Loading </p> 

    var table = [];

    this.state.res[0].classes.forEach( row => {
      table.push(<div className="w3-card-4"> <p> {row.instructor} </p> </div>);
    });

    const fullTimes = this.state.fullTimes; 

    return (
        <div>
          <p> The class filled up at time t last quarter </p>
          <p> At time q, the class was as follows: </p>
            {table}
          <br/>
          <br/>
          <table>
            <th> Instructor </th>
            <th> Section </th>
            <th> Time of Fill </th>
            <th> Remaining Seats at that time </th>
            {fullTimes}
          </table>
          <br/>
          <br/>
          {this.state.currentData.classes.map(cls => 
            <ClassDisplay data={cls}/>
          )}
        </div>
    );
  }
}

function ClassDisplay(data){
  return (
    <div className="w3-card-4" style={{margin: '20px'}}>
      {data.data.discussions.map(el => <ClassBar data= {el} /> )}
    </div>
  )
}

function ClassBar(data){
  const {remaining, total} = data.data.enrollments[0];
  var percentage = (total-remaining)/total*100;
  if(percentage > 100) percentage = 100;
  var style = {width: `${percentage}%`};
  if(percentage > 90 )
    style.background = 'red';
  var seatinfo = '';
  if(remaining > 0) 
    seatinfo = `${remaining} Remaining out of ${total} seats`;
  else 
    seatinfo = `0 Remaining out of ${total} seats, 
                      Waitlist at ${remaining*-1}`;

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

export default Data;
