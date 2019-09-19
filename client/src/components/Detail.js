import React from 'react';

import '../resources/App.css';
import '../resources/w3.css';

import {ClassDisplay} from './Data.js'

class Detail extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div> 
        {this.props.res !== null ? 
         this.props.res[0].classes.map((element, index) => 
          <ClassDisplay data={element} />):
          null
        }
      </div>
    )
  }
}

export default Detail;
