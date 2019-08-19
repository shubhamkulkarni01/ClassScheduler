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
        cacheUrl:null,
        submitted: false
    };
    this.onClick = this.onClick.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(obj){
    this.setState({submitted: true, url: obj.url, cacheUrl: obj.cacheUrl});
  }

  onClick(event){
    this.setState({submitted: false});
  }

  render(){ 
    if(this.state.submitted)
      return ( 
        <div> 
          <Navigation onClick = {this.onClick} /> 
          <Data url={this.state.url} cacheUrl={this.state.cacheUrl} /> 
        </div>
      )
    
    return (
      <div>
        <Navigation onClick = {this.onClick} /> 
        <Home submit={this.submit}/>
      </div>
    )
  }
}


export default App;
