import React from 'react'
import "./App.css"
class Column extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Column">
        <div className="header">
          {this.props.title}{" "}
          <button onClick={() => this.props.create()}>+</button>
        </div>
        <div className="dragZone" onDrop={this.props.drop} onDragOver={this.props.ondragover}>
        {this.props.items.map((item, key) => {
          return <div id={key} key={key} className="card"  draggable="true" onDragStart={this.props.drag}>{item}</div>
        })}
      </div>
        </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'columns': 
        {
          "todo": {
          title: "Todo",
          items: ["create wireframes","design database", "create documentation"]
        },
         "inprogress" : {
          title: "In progress",
          items: []
        },
          "done" : {
          title: "Completed",
          items: []
        }
       }
    };
  }
  allowDrop = (ev) => {
  ev.preventDefault();
}
  drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };
  drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    ev.target.appendChild(document.getElementById(data));
  };
  onClick = (id, ev) => {
    const newItem = prompt('add a new card');
    console.log(this.state.columns)
    this.setState({
      ...
      this.state.columns[id].items.push(newItem)
    })
  };
  render() {
    return (
      <div className="td">
        {Object.keys(this.state.columns).map((item, key) => (
          <Column
            key={key}
            title={this.state.columns[item].title}
            drag={this.drag}
            drop={this.drop}
            ondragover={this.allowDrop}
            create={() => this.onClick(item)}
            items={this.state.columns[item].items}
          ></Column>
        ))}
      </div>
    );
  }
}

export default App;

