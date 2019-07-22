import React from 'react';
import logo from './logo.svg';
import './App.css';

import classList from './classList.json';

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = { 
        dept_classlist: [],
        deptlist: ['Select a department'].concat(Object.keys(classList)), 
        dept: 'Select a department', 
        cls: 'Select a class',
        submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    this.props.submit({url: 'http://localhost:5000/api/class/'+this.state.dept+' '+this.state.cls});
    event.preventDefault();  
  }

  handleChange(event){
    //department selected
    if(event.target.name === 'department')
      this.setState({
          dept: event.target.value, 
          dept_classlist: ['Select a class']
                          .concat(classList[event.target.value]),
          cls: 'Select a class'
      });
    //class selected
    else 
      this.setState({cls: event.target.value});
  }

  render(){
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <form action="/api/class" method="get" onSubmit={this.handleSubmit}>
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

          <button className="homeSelector" type="submit"> Fetch Data </button>
        </form>

      </div>
    );
  }
}

function InputList(props) {
  return (
      <select 
          value = {props.value} 
          className="homeSelector" 
          name={props.listName} 
          onChange = {props.handleChange} >
        { props.list.map( value => <option value={value}> {value} </option> ) }
      </select>
  );
};

export default Home;
