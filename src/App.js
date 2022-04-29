import './App.css';
import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

let cards = [1,2,3,4,1,2,3,4];   
const shuffledCards = cards.sort(() => Math.random() - 0.5);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      squares: Array(8),            
      count: 1,
      clickable: true,     
    };
  }
  
  handleClick(i) {    
   
    this.setState(state => ({
       count: state.count + 1
      }));   
              
    var squares = this.state.squares.slice();    
    var result = this.state.result.slice();  
   var clickabol = this.state.clickabol;     
      
    if (calculateScore(this.state.result)) {
      return;
    }              
        
    clickabol = (this.state.count > 2) ? false : true;    
         
  if(clickabol) {    
   squares[i] = shuffledCards[i]; 
  }                   
  
    if(this.state.count >= 2 ) {           

        result = squares.filter((a, i, aa) => aa.indexOf(a) === i && aa.lastIndexOf(a) !== i);
        result = result.filter(Boolean);   
      
      //console.log(result.length);
                    
         //Tratamento das duplas em squares
        if ( result !== 0 )  {                       
            
           setTimeout(()  => {  
              var k = 0;          
          for(var i = 0; i < squares.length; i++ )
          {                            
                if(result[k] !== squares[i] && result[k+1] !== squares[i]  && result[k+2] !== squares[i] &&  result[k+3] !== squares[i]  ) 
                { 
            squares[i] = null;  
                }
          }                           
             this.setState({
                  squares: squares,     
                  clickabol: true,
                  count: 1,
                  result: result,                    
          }); 
             
            }, 1000);                                            
                              
                    
        } else {          
           //Apaga tudo com delay;                          
          setTimeout(()  => {
            
              squares = []; 
             this.setState({
                  squares: squares,     
                  clickabol: true,
                  count: 1,                               
          });               
             }, 1000);              
        }             
      
   this.setState(state => ({
       count: state.count + 1
      }));                        
              
      
    } //laço if count >= 2     
    
        this.setState({
            squares: squares,     
            result: result,             
          });                     
  }    
  
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  } 

  render() {
    const finish = calculateScore(this.state.result);
    let status;
    let message;
    if (finish) {
    //  status = 'Score: ' + winner;
    status = ' Congratulations!!'
    message = 'Press F5 to play again.'
    } else {
      status = ' Test your memory' ;
    }
    

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">      
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>       
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>   
        <p></p>
        <div className="message">{message}</div>            
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">            
          <Board />            
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function calculateScore(result) { 
    
    if ( result.length >= 4 ) {   
      return true;  
    } else {       
    return null;
    }
  }

export default App;
