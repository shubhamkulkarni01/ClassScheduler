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
      <button onClick={this.props.onClick} className="back"> Go Back </button>
    )
  }
}


export default Navigation;
