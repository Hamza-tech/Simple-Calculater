import React, { Component } from 'react'
import Button from "./components/Button";
import "./css/style.css"

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: '',
      previous: [],
      nextIsReset: false
    }
  }

  reset = () => {
    this.setState({current:'0', previous: [], nextIsReset: false});
  }
  addToCurrrent = (symbol) => {
    if(["/", "-", "+", "*"].indexOf(symbol)> -1){
      let {previous} = this.state;
      previous.push(this.state.current+symbol);
      this.setState({previous, nextIsReset: true});
    }
    else{
      if((this.state.current === "0" && symbol !== ".")  || this.state.nextIsReset ){
    this.setState({current: symbol, nextIsReset:false});
      }
      else{
        this.setState({current: this.state.current +symbol});
      }
    }
  }
  calculate = (symbol) =>{
    let {current, previous, nextIsReset} = this.state;
    if(previous.length> 0){
      current = eval(String(previous[previous.length-1] + current));
      this.setState({current,previous: [],nextIsReset:true});
    }
  }

  render() {
    const buttons = [
      {symbol: 'C', cols: 3, action: this.reset},
      {symbol: '/', cols: 1, action: this.addToCurrrent},
      {symbol: '7', cols: 1, action: this.addToCurrrent},
      {symbol: '8', cols: 1, action: this.addToCurrrent},
      {symbol: '9', cols: 1, action: this.addToCurrrent},
      {symbol: '*', cols: 1, action: this.addToCurrrent},
      {symbol: '4', cols: 1, action: this.addToCurrrent},
      {symbol: '5', cols: 1, action: this.addToCurrrent},
      {symbol: '6', cols: 1, action: this.addToCurrrent},
      {symbol: '-', cols: 1, action: this.addToCurrrent},
      {symbol: '1', cols: 1, action: this.addToCurrrent},
      {symbol: '2', cols: 1, action: this.addToCurrrent},
      {symbol: '3', cols: 1, action: this.addToCurrrent},
      {symbol: '+', cols: 1, action: this.addToCurrrent},
      {symbol: '0', cols: 1, action: this.addToCurrrent},
      {symbol: '.', cols: 1, action: this.addToCurrrent},
      {symbol: '=', cols: 1, action: this.calculate},
    ];

    return (
      <div className="App">
        {this.state.previous.length > 0 ?
       <div className="floaty-last">{this.state.previous[this.state.previous.length -1]}</div>
       :null  
      }
        <input className="result" type="text" value={this.state.current} />
        {buttons.map((btn, i) => {
          return <Button key={i} symbol={btn.symbol} cols = {btn.cols} action = {(symbol)=> btn.action(symbol)} />
        })}
      </div>
    )
  }
}
