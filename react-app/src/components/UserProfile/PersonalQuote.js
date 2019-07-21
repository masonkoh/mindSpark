import React, { Component } from "react";
import $ from "jquery";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import PersonalQuoteBox from "./PersonalQuoteBox";

class PersonalQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      didLoad: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.needToReload == true) {
      this.fetchPersonalQuotes(this.props.username);
      this.props.toggleRefresh();
    }
  }

  fetchPersonalQuotes(author) {
    $.ajax({
      url: "db/quoteList/" + author,
      method: "GET"
    })
      .then(data => {
        console.log(data);
        this.setState(
          {
            quote: data,
            didLoad: true
          });
        this.props.toggleRefresh();
      })
      .fail(err => {
        alert("Failed to load the list of personal quotes!", err);
        this.setState({
          quote: [],
          didLoad: false
        });
      });
  }

  componentDidMount() {
    //debugger;
    this.fetchPersonalQuotes(this.props.username);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.didLoad &&
          <div className="personalquoteBody">
            <div className="quotelistBody">
              {this.state.quote.map((quoteObj, index) => {
                return (
                  <PersonalQuoteBox
                    quote={quoteObj.text}
                    author={quoteObj.author}
                    rating={quoteObj.rating}
                    quoteId={quoteObj._id}
                  />
                );
              })}
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default PersonalQuote;