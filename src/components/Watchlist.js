import React, { Component } from 'react'
import { Container, Row, Button, Jumbotron, Col } from 'reactstrap';
import { rentWatchlist } from "../redux/actions"
import {connect} from "react-redux";
import MoviePage from './MoviePage';
import "../styles/styles.css"

const mapStateToProps = state => {
    const userReducer = state.userReducer;
    return {userReducer};
}

class Watchlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rentedMovies: this.props.userReducer.movies,
            checkout: false,
            expand: false,
            movie: ""
        }
        this.movieView = this.movieView.bind(this);
        this.movieList = this.movieList.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.displayRentals = this.displayRentals(this)
    }

    movieView(e) {
        this.setState({
            expand: true,
            movie: e
        })
      }
      
      movieList() {
        this.setState({
            expand: false
        })
      }

    onSubmit(){
        this.props.rentWatchlist(this.props.userReducer.currentUser)
        if(this.props.userReducer.movies.length === 0){}
        this.setState({
            checkout: true
        })
    }

    displayRentals(){
        this.setState({
            checkout: false
        })
    }

    render() {
        return (
            <div className="post">
            {this.state.expand === false ? 
                
                <Container>
                <h3>User Watchlist:</h3>
                <Jumbotron>
                {this.props.userReducer.movies.length > 0 ? 
                    <Container>
                        {this.props.userReducer.movies.map(movie => 
                            <Container key={movie}>
                                <Row><br/></Row>
                                <Button color="link" id={movie} value={movie} onClick={() => this.movieView(movie)}>{movie}</Button>
                            </Container>
                        )}
                        
                    </Container>
                :"Watchlist is empty."}
                </Jumbotron>
                </Container> 
                : 
                <Container>
                <Row>
                <Col>
                <h3>User Watchlist:</h3>
                <Jumbotron>
                {this.props.userReducer.movies.length > 0 ? 
                    <Container>
                        {this.props.userReducer.movies.map(movie => 
                            <Container key={movie}>
                                <Row><br/></Row>
                                <Button color="link" id={movie} value={movie} onClick={() => this.movieView(movie)}>{movie}</Button>
                            </Container>
                        )}
                        
                    </Container>
                :"Watchlist is empty."}
                </Jumbotron>
                </Col>
                <Col>
                <MoviePage movie={this.state.movie}/>
                </Col>
                </Row>
                </Container>}
            </div>
        );
    }
}
export default connect(mapStateToProps, {rentWatchlist})(Watchlist);




