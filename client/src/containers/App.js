import React from 'react';
import '../resources/App.css';

import Home from '../components/Home.js';
import Data from '../components/Data.js';

import Navigation from '../components/Navigation.js';


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
      return ( 
        <> 
          <Navigation onClick = {this.onClick} /> 
          <Data url={this.state.url}/> 
        </>
      )
    
    return <Home submit={this.submit}/>
  }
}


export default App;
