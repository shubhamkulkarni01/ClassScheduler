import React from 'react';
import '../resources/App.css';
import '../resources/w3.css';

import axios from 'axios';

class Data extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      res: null
    };
  }

  componentDidMount(){
    axios.get(this.props.url)
      .then( result => 
          this.setState({
            res: result.data
          })
      );
  }

  render(){ 
    if(this.state.res === null)
      return <p> Loading </p> 

    var table = [];

    console.log(this.state.res);

    this.state.res[0].classes.forEach( row => {
      table.push(<div className="w3-card-4"> <p> {row.instructor} </p> </div>);
    });

    const fullTimes = [];

    //loop through all historical term (Fall Winter and Spring of all prev yrs)
    this.state.res.forEach( course => {
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

          fullTimes.push(<tr> {temp} </tr>);
        })
      })
    });

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
        </div>
    );


  }
}


export default Data;
