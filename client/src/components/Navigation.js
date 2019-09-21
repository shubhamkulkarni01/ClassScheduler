import React from 'react';
import '../resources/App.css';

class Navigation extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
        url: null,
        submitted: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event){
    this.setState({submitted: false});
  }

  render(){ 
    return ( 
      <div className="dataHeader">
        {this.props.index !== 0 
            && <div className="backButton" onClick={this.props.backButton}/>}
        <h1 className="dataTitle"> {this.props.title} </h1>
      </div>
    )
  }
}


export default Navigation;
