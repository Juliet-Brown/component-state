import React, { Component } from "react";
import List from "./List";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Juliet",
      term: "",
      items: [],
      clicks: 0,
      show: true,
      term: "",
      img: ""
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      term: "",
      items: [...this.state.items, this.state.term]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const api_key = "dc6zaTOxFJmzC";
    const url = `http://api.giphy.com/v1/gifs/search?q=${
      this.state.term
    }&api_key=${api_key}`;
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({ term: "", img: data.data[0].images.fixed_height.url })
      )
      .catch(e => console.log("error", e));
  };

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };

  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };

  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Submit</button>
        </form>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Search!</button>
        </form>
        <img src={this.state.img} height="200" alt={this.state.term} />
        <List items={this.state.items} />
        <button onClick={this.IncrementItem}>Click to increment by 1</button>
        <button onClick={this.DecreaseItem}>Click to decrease by 1</button>
        <button onClick={this.ToggleClick}>
          {this.state.show ? "Hide number" : "Show number"}
        </button>
        {this.state.show ? <h2>{this.state.clicks}</h2> : ""}
      </div>
    );
  }
}
export default TodoList;
