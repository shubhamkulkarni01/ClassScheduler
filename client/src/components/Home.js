import React from 'react';
import '../resources/App.css';

import classList from '../resources/classList.json';

import delete_icon from '../resources/delete_icon.png';

class Home extends React.Component{

  constructor(props){
    super(props);
    console.log(this.props);
    this.state = { 
        dept_classlist: ['Select a department first!'],
        deptlist: [ ...['Select a department'],
                    ...Object.keys(classList)],
        dept: 'Select a department', 
        cls: 'Select a class',
        courseNumber: 1, 
        selectedCourses: [
          {
            _id: Math.floor(Math.random()*1000),
            dept_classlist: ['Select a department first!'],
            deptlist: [ ...['Select a department'],
                        ...Object.keys(classList)],
            dept: 'Select a department', 
            cls: 'Select a class',
          }
        ]
    };

    if(props.initialData){
      this.state.selectedCourses = props.initialData;
      this.state.selectedCourses.forEach(element => {
        element.deptlist = [...['Select a department'],
                            ...Object.keys(classList)];
        element.dept_classlist = [...['Select a class'], 
                                  ...classList[element.dept]];
      });
    }
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
      this.props.cookies.set('courses', this.cookify(selectedCourses));
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
      this.props.cookies.set('courses', this.cookify(selectedCourses));
    }
  }

  addClass = (e) => {
    const selectedCourses = [ ...this.state.selectedCourses, 
                              {
                                _id: Math.floor(Math.random()*1000),
                                dept_classlist: ['Select a department first!'],
                                deptlist: [ ...['Select a department'],
                                            ...Object.keys(classList)],
                                dept: 'Select a department', 
                                cls: 'Select a class',
                              }]
                              
    this.setState({selectedCourses});
    this.props.cookies.set('courses', this.cookify(selectedCourses));
  }

  deleteClass = (index, e) => {
    const selectedCourses = [ ...this.state.selectedCourses ];
    console.log(index);
    selectedCourses.splice(index, 1);
    console.log(selectedCourses);
    this.setState({selectedCourses});
    this.props.cookies.set('courses', this.cookify(selectedCourses)); 
  }

  cookify = (array) => {
    const newArray = [];
    array.forEach(element => {
      if(element.dept !== 'Select a department' && 
          element.cls !== 'Select a class')
        newArray.push({
          dept: element.dept,
          cls: element.cls
        })
    });
    return newArray; 
  }

  render(){
    console.log(this.state.selectedCourses);

    const selectedCourses = this.state.selectedCourses.map((element, index) => 
      <Course
          courseNumber = {index+1}
          dept = {element.dept}
          cls = {element.cls}
          deptlist = {element.deptlist}
          dept_classlist = {element.dept_classlist} 
          handleChange = {this.handleChange} 
          deleteClass = {this.deleteClass}
          key = {index} />
        );
    return (
      <div className="App">
        <h1 className="heading-label"> Enrollment Tracker </h1>
        <p className="heading-label-small">
          Figure out if you're gonna get the classes you need ahead of time!
        </p>
        <form className="input-list-form" method="get" 
              onSubmit={this.handleSubmit}>
          <div className = "input-list-courses">
            { selectedCourses }
          </div>

          <div className="input-list-wrapper"> 
            <button className="input-list-button w3-green" type="submit"> 
              Find my classes
            </button>
            <button className="input-list-button w3-blue" type="button"
                    onClick={this.addClass}> 
               Add a course 
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
      <div className="course-name">
        Class {props.courseNumber} 
        <img className="course-delete-icon" src={delete_icon} 
             onClick={(e) => props.deleteClass(props.courseNumber - 1, e)}/>
      </div>
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
