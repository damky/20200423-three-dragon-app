import React from "react";

class DropSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('selected', this.state.value);
    event.preventDefault();    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.title}
          <select value={this.state.value} onChange={this.handleChange}>
            {this.props.children}
          </select>
        </label>
        <input type="submit" value={this.props.submit} />
      </form>
    ) 
  }
}

export default DropSelect;
