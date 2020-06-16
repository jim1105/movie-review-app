import React, { Component, Fragment } from 'react'
import {FormGroup, Label, Input, Button, Row, Col, Container, Spinner, Alert} from "reactstrap";
import { addReview } from "../redux/actions"
import {connect} from "react-redux";
import "../styles/styles.css"

const mapStateToProps = state => {
    const reviews = state.reviewReducer.reviews;
    const userReducer = state.userReducer;
    return {reviews, userReducer};
}

export class ReviewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: this.props.movie,
            title: "",
            author: this.props.userReducer.username,
            review: "",
            year: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit(){
        let d = new Date();
        var postDate = d.toDateString();
        this.props.addReview(
            this.props.movie,
            this.state.title,
            this.props.userReducer.username,
            "",
            this.state.review,)
        this.setState({
            title: "",
            review: "",
            year: ""
        })
    }

    render() {
        return (
            
            <Fragment >
                <Container >
                    <FormGroup>
                        <Col>
                        <br/><Label for="title"> Title: </Label><br/>
                        <Input type="text" id="title" value={this.state.title} onChange={this.handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                        <br/><Label for="review"> Review: </Label><br/>
                        <Input type="textarea" id="review" value={this.state.review} onChange={this.handleChange} />
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col className="login-button">
                            <br/><Button color="info" onClick={this.onSubmit}>Post Review</Button>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, {addReview}) (ReviewForm);
