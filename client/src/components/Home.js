import React from 'react';
import logo from '../resources/logo.svg';
import '../resources/App.css';

import classList from '../resources/classList.json';

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = { 
        dept_classlist: ['Select a department first!'],
        deptlist: [ ...['Select a department'],
                    ...Object.keys(classList)],
        dept: 'Select a department', 
        cls: 'Select a class',
        courseNumber: 1, 
        selectedCourses: [
          {
            dept_classlist: ['Select a department first!'],
            deptlist: [ ...['Select a department'],
                        ...Object.keys(classList)],
            dept: 'Select a department', 
            cls: 'Select a class',
          }
        ]
    };
  }

  handleSubmit = (e) => {
    const selectedCourses = [];
    this.state.selectedCourses.forEach(element => {
      if(element.dept !== 'Select a department' && 
          element.cls !== 'Select a class')
        selectedCourses.push({
          dept: element.dept,
          cls: element.cls
        })
    });

    if(selectedCourses.length > 0){
      this.props.onSubmit({
        selectedCourses
      });
    }
    e.preventDefault();
  }

  handleChange = (courseNumber, event) => {
    //department selected
    if(event.target.name === 'department'){
      const selectedCourses = this.state.selectedCourses;
      const selectedCourseUpdate = {
        ...selectedCourses[courseNumber-1],
        dept: event.target.value, 
        dept_classlist: [ ...['Select a class'], 
                          ...classList[event.target.value]], 
        cls: 'Select a class'
      };
      selectedCourses[courseNumber-1] = selectedCourseUpdate;
      this.setState({selectedCourses});
      
      /*
       * this.setState({
          dept: event.target.value, 
          dept_classlist: [ ...['Select a class'], 
                            ...classList[event.target.value]], 
          cls: 'Select a class'
      });
       */
    }
    //class selected
    else {
      const selectedCourses = this.state.selectedCourses;
      const selectedCourseUpdate = {
        ...selectedCourses[courseNumber-1],
        cls: event.target.value
      };
      selectedCourses[courseNumber-1] = selectedCourseUpdate;
      this.setState({selectedCourses});
    }
  }

  render(){
    const selectedCourses = this.state.selectedCourses.map((element, index) => 
      <Course
          courseNumber = {index+1}
          deptlist = {element.deptlist}
          dept_classlist = {element.dept_classlist} 
          handleChange = {this.handleChange} 
          value = {element.cls} />
        );
    return (
      <div className="App">
        <h1 className="heading-label"> Enrollment Tracker </h1>
        <p className="heading-label-small">
          Figure out if you're gonna get the classes you need ahead of time!
        </p>
        <form className="input-list-form" method="get" 
              onSubmit={this.handleSubmit}>
          { selectedCourses }

          <div className="input-list-wrapper"> 
            <button className="input-list-button w3-blue" type="submit"> 
                Fetch Data 
            </button>
          </div>
        </form>

      </div>
    );
  }
}

function Course(props){

  return (
    <div className="course-wrapper">
      Class {props.courseNumber} 
      <InputList 
          list = {props.deptlist} 
          listName = "department" 
          handleChange = {(e) => props.handleChange(props.courseNumber, e)} 
          value = {props.dept} />
      <InputList 
          list= {props.dept_classlist} 
          listName = "class"
          handleChange = {(e) => props.handleChange(props.courseNumber, e)} 
          value = {props.cls} />
    </div>
  );
}

function InputList(props){
  return (
    <div className = "input-list-wrapper">
      <select 
          value = {props.value} 
          className="input-list-selector" 
          name={props.listName} 
          onChange = {props.handleChange} >
        { props.list.map( (value, index) => 
              <option key={index} value={value}> {value} </option> ) }
      </select>
      <label className = "input-list-label"> 
        {"Select "+props.listName+": "} 
      </label>
  </div>
  );
}

export default Home;
