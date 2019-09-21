import React from 'react';

import '../resources/App.css';

import {classUrl, cacheUrl, staticUrl} from '../resources/config.js';

import Home from '../components/Home.js';
import Data from '../components/Data.js';
import Detail from '../components/Detail.js';

import Navigation from '../components/Navigation';

import axios from 'axios';

export const [HOME, DATA, DETAIL] = [0, 1, 2]

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
        url: null,
        cacheUrl:null,
        className: null,
        staticData: null, 
        res: null,
        fullTimes: null,
        currentData: null, 
        initialLoad: true, 
        currentView: HOME, 
        title: 'Class Finder'
    };
  }
  
  componentDidMount(){
    this.axiosRetryStaticData(1000);
  }

  axiosRetryStaticData(milliseconds){
    axios.get(staticUrl)
      .then( result => {
        this.setState({staticData: result.data});
      }).catch( e => {
        console.log(`retrying in ${milliseconds} milliseconds`);
        setTimeout(
            (() => this.axiosRetryStaticData(milliseconds+500)), milliseconds
        );
    });
  }

  axiosRetryClass(milliseconds){
    console.log(this.state.url);
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
  
  axiosRetryCache(millis){
    axios.get(this.state.cacheUrl)
      .then(cache => 
        this.setState({ currentData: cache.data })
      ).catch(e => { 
        if(millis> 5000)
          this.axiosRetryClass(1000);
        console.log(`retrying in ${millis} milliseconds`);
        setTimeout((() => this.axiosRetryCache(millis+500)), millis);
    });
  }

  onClassSelect = (obj) => {
    const selectedCourses = obj.selectedCourses;

    console.log(selectedCourses);

    //until equipped to handle multiple courses
    const course = selectedCourses[0];

    const className = course.dept+' '+course.cls;

    this.setState({
      url: classUrl+className,
      cacheUrl: cacheUrl+className,
      className,
      res: null,
      currentData: null, 
      initialLoad: false,
      currentView: DATA,
      title: className, 
      detailData: null,
      detailTerm: null,
    });

    this.axiosRetryClass(1000);
  }

  onBackButton = (event) => {
    //reset the state
    var newState = {currentView: this.state.currentView - 1}
    if(this.state.currentView - 1 === HOME)
      newState = {title: 'Class Finder', 
                  currentView: this.state.currentView - 1,
                  res: null, currentData: null, 
                  className: null, url: null, cacheUrl: null};
    this.setState( newState );
  }

  testDetail = (term) => {
    console.log(term);
    this.setState({ currentView: DETAIL, detailTerm: term, 
                    detailData: this.state.res.find(e => e.term === term),
                    title: this.state.className + ' ' + term});
    console.log(this.state);
  }

  render(){ 

    console.log(process.env.NODE_ENV);
    console.log(classUrl, cacheUrl);
    return (
    <div>
      <Navigation title = {this.state.title} index = {this.state.currentView}
                  backButton = {this.onBackButton} />
      <div className = "app-parent">
        <div className = {this.state.initialLoad ? "home-init" : 
                          this.state.currentView === HOME ? 
                                     "home-show" : "home-hide"}>
          <Home render={this.state.currentView===HOME}
                onSubmit={this.onClassSelect} />
        </div>
        <div className = {this.state.initialLoad ? "data-init" : 
                          this.state.currentView === DATA ? 
                                     "data-show" : "data-hide"}>
          <Data render={this.state.currentView===DATA}
                res={this.state.res} currentData={this.state.currentData}
                fullTimes={this.state.fullTimes} testDetail={this.testDetail}
                clsName={this.state.className} backButton={this.onBackButton} 
                staticData={this.state.staticData} key={this.state.className}/>
        </div>
        <div className = {this.state.initialLoad ? "disp-init" : 
                          this.state.currentView === DETAIL ? 
                                     "disp-show" : "disp-hide"}>
          <Detail render={this.state.currentView===DETAIL}
                res={this.state.detailData} term={this.state.detailTerm} 
                clsname={this.state.className} 
                staticData={this.state.staticData} key={this.state.className}/>
        </div>
      </div>
    </div>
    )
  }
}


export default App;
