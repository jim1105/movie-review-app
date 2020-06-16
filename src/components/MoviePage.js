import React, { Component, Fragment } from 'react';
import { Button, Container, Row, Col, Alert, Spinner } from 'reactstrap';
import { addToWatchlist } from "../redux/actions"
import {connect} from 'react-redux';
import Review from './Review';
import { getReviews } from '../redux/actions';
import "../styles/styles.css"

const mapStateToProps = state => {
    const reviews = state.reviewReducer.reviews;
    const userReducer = state.userReducer;
    return {reviews, userReducer};
}

class MoviePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invalid: false
        }
        this.addToUserWatchlist = this.addToUserWatchlist.bind(this)
    }

    addToUserWatchlist(){
        if(!this.props.userReducer.movies.includes(this.props.movie)) {
            console.log("the movie is not in the watchlist")
            this.props.addToWatchlist(this.props.userReducer.currentUser, this.props.movie)
        }
        else{
            this.setState({
                invalid:!this.state.invalid
            })
            console.log("the movie is already in the watchlist")
        }
        
    }

    render() {
        return (
            
            <div>
                {
                this.state.invalid ?
                <Alert color="danger">
                    <Row>
                    <Col><p>the movie is already in the watchlist</p></Col>
                    </Row>
                </Alert>
                :''
                }
                <Row className="align-items-center">
                <Col>
                <h1>{this.props.movie}</h1></Col>
                {this.props.userReducer.currentUser !== -1 ? 
                <Button color="info" id={this.props.movie} value={this.props.movie} onClick={this.addToUserWatchlist} block>Add to Watchlist</Button>:""}
                </Row>
                <Row><br/><br/><br/></Row>
                <Review movie={this.props.movie}/>
                
            </div>
        )
    }
}

export default connect(mapStateToProps, {addToWatchlist, getReviews})(MoviePage);

