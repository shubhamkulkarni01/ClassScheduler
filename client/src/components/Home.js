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
        submitted: false,
        redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    if(this.state.dept !== 'Select a department' && 
       this.state.cls !== 'Select a class'){
      this.props.onSubmit({
        className: this.state.dept+' '+this.state.cls 
      });
      this.setState({redirect: true});
    }
    e.preventDefault();
  }

  handleChange(event){
    //department selected
    if(event.target.name === 'department')
      this.setState({
          dept: event.target.value, 
          dept_classlist: [ ...['Select a class'], 
                            ...classList[event.target.value]], 
          cls: 'Select a class'
      });
    //class selected
    else 
      this.setState({cls: event.target.value});
  }

  render(){
    return (
      <div className="App">
        <h1 className="heading-label"> Course Finder </h1>
        <p className="heading-label-small">
          Figure out if you're gonna get the classes you need ahead of time!
        </p>
        <form className="input-list-form" method="get" 
              onSubmit={this.handleSubmit}>
          <InputList 
              list = {this.state.deptlist} 
              listName = "department" 
              handleChange = {this.handleChange} 
              value = {this.state.dept} />
          <InputList 
              list= {this.state.dept_classlist} 
              listName = "class"
              handleChange = {this.handleChange} 
              value = {this.state.cls} />

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
