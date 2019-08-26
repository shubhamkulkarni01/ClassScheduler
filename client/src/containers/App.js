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
        staticData: null
    };
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  
  componentDidMount(){
    //this.axiosRetryStaticData(1000);
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

  onSubmit(obj){
    this.setState({
      submitted: true, 
      url: classUrl+obj.className, 
      cacheUrl: cacheUrl+obj.className,
      className: obj.className,
    });
  }

  onClick(event){
    this.setState({submitted: false});
  }

  render(){ 
    console.log(this.state.submitted);
    if(this.state.submitted === true)
      return ( 
        <div> 
          <Data url={this.state.url} cacheUrl={this.state.cacheUrl} 
                clsName={this.state.className} backButton={this.onClick} 
                staticData={this.state.staticData} /> 
        </div>
      )
    
    return (
      <div>
        <Home onSubmit={this.onSubmit}/>
      </div>
    )
  }
}


export default App;
