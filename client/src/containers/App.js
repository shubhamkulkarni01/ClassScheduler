import React from 'react';

import '../resources/App.css';

import {classUrl, cacheUrl, staticUrl} from '../resources/config.js';

import Home from '../components/Home.js';
import Data from '../components/Data.js';

import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
        url: null,
        cacheUrl:null,
        submitted: false,
        className: null,
        staticData: null, 
        res: null,
        fullTimes: null,
        currentData: null 
    };
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount(){
    this.axiosRetryStaticData(1000);
  }

  axiosRetryStaticData(milliseconds){
    axios.get(staticUrl).then( result => {
      this.setState({staticData: result.data});
    }).catch( e => {
      console.log(`retrying in ${milliseconds} milliseconds`);
      setTimeout(
          (() => this.axiosRetryStaticData(milliseconds+500)), milliseconds
      );
    });
  }

  axiosRetryClass(milliseconds){
    axios.get(this.state.url)
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
    axios.get(this.state.cacheUrl).then(cache => 
      this.setState({ currentData: cache.data })
    ).catch(e => { 
      if(milliseconds > 5000)
        this.axiosRetryClass(1000);
      console.log(`retrying in ${milliseconds} milliseconds`);
      setTimeout((() => this.axiosRetryCache(milliseconds+500)), milliseconds);
    });
  }

  onSubmit(obj){
    this.setState({
      submitted: true, 
      url: classUrl+obj.className, 
      cacheUrl: cacheUrl+obj.className,
      className: obj.className,
      res: null,
      currentData: null
    });
    this.axiosRetryClass(1000);
  }

  onClick(event){
    this.setState({submitted: false});
  }

  render(){ 
    return (
      <div className = "app-parent">
        <div className = {this.state.submitted ? "home-hide" : "home-show"}>
          <Home onSubmit={this.onSubmit} />
        </div>
        <div className = {this.state.submitted ? "data-show" : "data-hide"}>
          <Data res={this.state.res} currentData={this.state.currentData}
                clsName={this.state.className} backButton={this.onClick} 
                staticData={this.state.staticData} key={this.state.className}/>
        </div>
      </div>
    )
    
    return (
      <div className = "app-parent">
        <div className = {this.state.submitted ? "home-hide" : "home-show"}>
          <Home onSubmit={this.onSubmit} />
        </div>
        <div className = {this.state.submitted ? "data-show" : "data-hide"}>
          <Data url={this.state.url} cacheUrl={this.state.cacheUrl} 
                clsName={this.state.className} backButton={this.onClick} 
                staticData={this.state.staticData} key={this.state.className}/>
        </div>
      </div>
    )


    if(this.state.submitted === true)
      return ( 
        <div> 
          <Data url={this.state.url} cacheUrl={this.state.cacheUrl} 
                clsName={this.state.className} backButton={this.onClick} 
                staticData={this.state.staticData} /> 
        </div>
      )
    
    return (
      <div className = "home-show">
        <Home onSubmit={this.onSubmit}/>
      </div>
    )
  }
}


export default App;
