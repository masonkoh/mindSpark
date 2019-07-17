import React, { Component } from "react";
import "./QuoteBox.css";
import { Container, Row } from "react-bootstrap";
import ReportQuote from "./ReportQuote";

class QuoteBox extends Component {
  render() {
    return (
      <Container className="quoteboxContainer">
        <div className="quoteBoxBg">
          <div className="quoteBox">
            <Row>
              <h3 className="quoteBoxQuoteH3">{this.props.quote}</h3>
            </Row>
            <Row className="quoteBoxAuthorStar justify-content-end">
              <ReportQuote username={this.props.author} />
              <span>{this.props.author}</span>
              <span>&nbsp;</span>
              <span>{this.props.rating} </span>
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}

export default QuoteBox;
