import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/**
 * Square是一个react组件类,或者说是一个react组件类型;
 * 通过render方法返回需要展示在屏幕上的视图的层次结构,render方法的返回值描述了在屏幕上看到的内容;render返回了一个react元素,这是一种对渲染内容的轻量级描述。
 * react使用JSX语言,一种JavaScript的语法扩展;Javascript、注释均写在花括号中;允许在模板中插入数组,数组会自动展开所有成员
 * 三个React组件 Square Board Game
*/
//Square按钮
  /**通过在react组件的构造函数中设置this.state来初始化state;this.state应该被视为一个组件的私有属性;
   * 在this.state中存储当前每个方格(Square)的值，并且在每次方格被点击的时候改变这个值(子组件内部构造函数);
   * 若遇到需要同时获取多个子组件数据，或者两个组件之间需要互相通信的情况时，需要把子组件的state数据提升至共同的父组件中保存。之后父组件可以通过props将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了;
   * 在JavaScript class中，每次定义其子类的构造函数时,都需要调用super方法;在所有含有构造函数的React组件中，构造函数必须以super(props)开头
   * 每次在组件中调用setState时，React都会自动更新其子组件
   * 函数组件 如果组件只包含一个render方法，并且不包含state，那么使用函数组件就会更简单;不需要定义一个继承于React.Component的类，我们可以定义一个函数，这个函数接收props作为参数，然后返回需要渲染的元素，如Square类重写为函数组件;
  */

//Square组件
// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={()=>this.props.onClick()}>
//         {/* TODO */}
//         {this.props.value}
//       </button>
//     );
//   }
// }

//函数组件
function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//Board方块
class Board extends React.Component {
  //把所有 Square 的 state 保存在 Board 组件中可以让我们在将来判断出游戏的胜者
  //'X'默认为先手棋 棋子每移动一步，xIsNext都会反转，该值决定下一步是哪个玩家
  constructor(props){
    super(props);
    this.state={
      squares:Array(9).fill(null),
      xIsNext:true
    }
  }
  handleClick(i){
    const squares=this.state.squares.slice(); //创建squares数组副本 不可变性在react中非常重要——时间旅行
    if(calculateWinner(squares)||squares[i]){
      return;        //当有玩家胜出或者当前Square已被填充时,函数不做任何处理
    }
    squares[i]=this.state.xIsNext?'X':'O';
    this.setState({
      squares:squares,
      xIsNext:!this.state.xIsNext
    });
  }
  //父组件向子组件传值 通过props传递数据 this.props.value接收
  renderSquare(i) {
    return <Square 
             value={this.state.squares[i]}
             onClick={()=>this.handleClick(i)}
            />;
  }

  render() {
    const winner=calculateWinner(this.state.squares);
    let status;
    if(winner){
      //提示获胜者
      status='Winner:'+winner;
    }else{
      //提示下一步轮到哪个玩家
      status= 'Next player:' + (this.state.xIsNext?'X':'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
//Game棋盘
class Game extends React.Component {
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
//判断出获胜者 返回'X','O','null'
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
