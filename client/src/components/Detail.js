import React from 'react';

import '../resources/App.css';
import '../resources/w3.css';

import {ClassDisplay} from './Data.js'

class Detail extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
   if(this.props.res !== null)
     var classDisp = this.props.res[0].classes.map((element, index) => 
        <ClassDisplay data={element} time="1568319229538" />);
   
    return (
      <div> 
        {this.props.res !== null ? classDisp : null}
      </div>
    )
  }
}

export default Detail;
