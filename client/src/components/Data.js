import React from 'react';
import '../resources/App.css';
import '../resources/w3.css';

import axios from 'axios';

class Data extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      res: null
    };
  }

  componentDidMount(){
    axios.get(this.props.url)
      .then( result => 
          this.setState({
            res: result.data.Item
          })
      );
  }

  render(){ 
    if(this.state.res === null)
      return <p> Loading </p> 

    var table = [];
    this.state.res.classes.forEach( row => {
      table.push(<div className="w3-card-4"> <p> {row.instructor} </p> </div>);
    });

    return (
        <div>
          <p> The class filled up at time t last quarter </p>
          <p> At time q, the class was as follows: </p>
            {table}
        </div>
    );


  }
}


export default Data;
