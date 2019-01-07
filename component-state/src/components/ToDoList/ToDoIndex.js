import React, { Component } from "react";
import List from "./List";

class ComponentState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Component state example",
      list: "",
      items: [],
      clicks: 0,
      show: true,
      showImage: true,
      showListItem: true,
      term: "",
      img: ""
    };
  }

  onChangeList = event => {
    this.setState({ list: event.target.value });
  };

  onChange = event => {
    console.log("event", event);
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      list: "",
      items: [...this.state.items, this.state.list]
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

  hideNumber = () => {
    this.setState({ show: !this.state.show });
  };

  hideListItem = () => {
    this.setState({ showListItem: !this.state.showListItem });
  };

  hideListImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };

  render() {
    return (
      <div>
        <h1> {this.state.name}!</h1>

        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.list} onChange={this.onChangeList} />
          <button>Submit</button>
          <button onClick={this.hideListItem}>
            {this.state.showListItem ? "Hide List" : "Show List "}
          </button>
          {this.state.showListItem ? <List items={this.state.items} /> : ""}
        </form>

        <form onSubmit={this.handleSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Search!</button>

          <button onClick={this.hideListImage}>
            {this.state.showImage ? "Hide Image" : "Show Image"}
          </button>
        </form>

        {this.state.showImage ? (
          <img src={this.state.img} height="200" alt={this.state.term} />
        ) : (
          ""
        )}

        <button onClick={this.IncrementItem}>Click to increment by 1</button>
        <button onClick={this.DecreaseItem}>Click to decrease by 1</button>
        <button onClick={this.hideNumber}>
          {this.state.show ? "Hide number" : "Show number"}
        </button>
        {this.state.show ? <h2>{this.state.clicks}</h2> : ""}
      </div>
    );
  }
}
export default ComponentState;
