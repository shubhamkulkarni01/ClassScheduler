import React from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './Home.js';
import Data from './Data.js';

import classList from './classList.json';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
        url: null,
        submitted: false
    };
    this.onClick = this.onClick.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(obj){
    this.setState({submitted: true, url: obj.url});
  }

  onClick(event){
    this.setState({submitted: false});
  }

  render(){ 
    if(this.state.submitted)
      return <Data url={this.state.url}/>
    
    return <Home submit={this.submit}/>
  }
}


export default App;
