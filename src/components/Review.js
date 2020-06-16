import React, { Component, Fragment } from 'react';
import { Card, Container, Row, CardTitle, Col, Spinner, Alert} from 'reactstrap'
import {connect} from 'react-redux';
import ReviewForm from './ReviewForm';
import { getReviews } from '../redux/actions';
import "../styles/styles.css"

const mapStateToProps = state => {
    const reviews = state.reviewReducer.reviews;
    const userReducer = state.userReducer;
    const isFetching = state.fetchFlag.isFetching;
    return {reviews, userReducer, isFetching};
}

export class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.movie
        }
    }


    render() {
        const ids = Object.keys(this.props.reviews);
        return (
            <div>
                {/* {
                    this.props.isFetching ?
                    <Alert color="info">
                        <Row>
                        <Col xs="auto"><Spinner color="primary" /></Col>
                        <Col><p>Process review </p></Col>
                        </Row>
                    </Alert>
                    :""
                } */}
                <h3>REVIEWS</h3>
                {ids.map(id => (
                    <Container>
                        {this.props.reviews[id].movie === this.props.movie ? <Fragment>
                            <Card body inverse color="info" key={id}>
                            <CardTitle>
                            <h3>{this.props.reviews[id].title.toUpperCase()}</h3>
                            <div className="review-content">
                            <p>Author: {this.props.reviews[id].author}</p>      
                            <p>{this.props.reviews[id].review}</p> 
                            </div>
                            </CardTitle>
                            </Card>
                            <Row><br/></Row>
                        </Fragment> :""}
                    </Container>), this.props.reviews)}
                    <div>  
                        {this.props.userReducer.currentUser !== -1 ? 
                            <Fragment>
                            <Row><br/></Row>
                                <ReviewForm movie={this.props.movie}/>
                            </Fragment>:""}
                    </div>
            </div>);}}
                    
                
export default connect(mapStateToProps, {getReviews})(Review);