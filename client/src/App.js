import React from 'react';
import logo from './logo.svg';
import './App.css';
import {parqueo} from './Parqueo/parqueo'
import {parser} from './Components/parser'

class App extends React.Component{

  parqueo = new parqueo();

  constructor(props){
    super(props);
    this.state = {
      data: [],
      libres:"",
      ocupados:"",
      //apiResponse:""
    };
  }

  async loadData(){
    const newData = await this.parqueo.getParqueo();
    this.setState({
      data: newData
    });
  }

  callAPI(url, number){
    //fetch("http://localhost:3001/spaces/2?infospace=cambie")
    //.then(res => res.text())
    //.then(res => this.setState({apiResponse: res}));


    if (number === 1){
      fetch(url)
      .then(res => res.text())
      .then(res => this.setState({libres: res}));

    } else if (number === 2){
      fetch(url)
      .then(res => res.text())
      .then(res => this.setState({ocupados: res}));
    }

  }


  componentDidMount(){
    setInterval(() => {
      this.loadData();
      this.callAPI("http://localhost:3001/spaces?state=free", 1);
      this.callAPI("http://localhost:3001/spaces?state=in-use", 2);     
    });

  }




  render(){
    return (
      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Campos libres
          </p>
          <p>
            {this.state.libres}
          </p>
          <p>
            Campos ocupados
          </p>
          <p>
            {this.state.ocupados}
          </p>
        </header>
        <parser datos = {this.state.data}></parser>
      </div>
    );
  }
}
export default App;
