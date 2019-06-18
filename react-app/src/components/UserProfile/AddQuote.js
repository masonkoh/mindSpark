import React, { Component } from "react";
import $ from "jquery";

const quoteRegex = RegExp(/^[a-zA-Z0-9#,!?_. ]{10,500}$/);

class AddQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      quote: "",
      currentDate: new Date(),
      quoteValid: false,
      error: {
        quote: ""
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: "/db/addQuote",
      method: "POST",
      data: {
        quote: this.state.quote,
        author: this.state.author,
        currentDate:  this.state.currentDate.getFullYear() + '-' + ( this.state.currentDate.getMonth()+1) + '-' +  this.state.currentDate.getDate() +' '+  this.state.currentDate.getHours()+':'+  this.state.currentDate.getMinutes()+':'+  this.state.currentDate.getSeconds()
 
      }
    })
      .then(msg => {
        alert(msg);
      })
      .fail(err => {
        alert(err.responseText);
      });
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ quote: e.target.value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let errors = this.state.error;
    let quoteValid = this.state.quoteValid;

    switch (fieldName) {
      case "quote":
        quoteValid = quoteRegex.test(value);
        errors.quote = quoteValid
          ? ""
          : " Quote has a limit of 5 to 750 characters.";
        break;
      default:
        break;
    }
    this.setState(
      {
        error: errors,
        quoteValid: quoteValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.quoteValid
    });
  }

  componentDidMount(){
    console.log(this.props.username);
    this.setState({
        author: this.props.username
    })
  }

  render() {
    return (
      <div className="upload">
        <h2>AddQuote</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <textarea
            className={`form-control ${
              this.state.error.quote ? "invalid" : ""
            }`}
            onChange={this.handleUserInput.bind(this)}
            name="quote"
            placeholder="Enter Quote"
            value={this.state.quote}
          />
          <div className="invalid-name">{this.state.error.quote}</div>
            <h1>{this.props.username}</h1>
          <button
            disabled={!this.state.formValid}
            className="submit"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddQuote;