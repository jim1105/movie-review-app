import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import Movie from "./Movie";
import {getMoviesByCheckbox} from "../redux/selectors";
import {Jumbotron, Button, Container, Row, Col, Alert, Spinner} from "reactstrap";
import MoviePage from './MoviePage';
import MovieFilters from './MovieFilters';
import "../styles/styles.css"

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      movie: ""
    }
    this.movieView = this.movieView.bind(this);
    this.movieList = this.movieList.bind(this);
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
render() {
  console.log(this.props.movies)
  return (
    <div>
      {
          this.props.isFetching ?
          <Alert color="info">
            <Row>
              <Col xs="auto"><Spinner color="primary" /></Col>
              <Col><p>Fetching Movies</p></Col>
            </Row>
          </Alert>
          :""
        }
      <Fragment>
        {this.state.expand === false ? 
        <Container>
            <h1>Search Movies</h1>
            <MovieFilters/>
            <Jumbotron className="jumbo">
            {this.props.movies && this.props.movies.length
              ? this.props.movies.map((movie, index) => {
                  return <Row><br/><Button color="link" id={movie.title} value={movie.title} onClick={() => this.movieView(movie.title)}><Movie key={`todo-${index}`} id={`todo-${index}`} movie={movie} showOnboarding={this.props.completed === 0 && index === 0} /></Button><Row><br/></Row></Row>
                })
              : "Search result empty"}
            </Jumbotron>
        </Container> : 
          
        <Container>
            <Row>
              <Col>
              <h1>Search Movies</h1>
              <MovieFilters/>
              <Jumbotron className="jumbo">
              {this.props.movies && this.props.movies.length
                ? this.props.movies.map((movie, index) => {
                    return <Row><br/><Button color="link" id={movie.title} value={movie.title} onClick={() => this.movieView(movie.title)}><Movie key={`todo-${index}`} id={`todo-${index}`} movie={movie} showOnboarding={this.props.completed === 0 && index === 0} /></Button><Row><br/></Row></Row>
                  })
                : "Search result empty"}
              </Jumbotron>
              </Col>
              <Col>
                <MoviePage movie={this.state.movie}/>
              </Col>
              </Row> 
          </Container>}
      </Fragment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {checkBoxes} = state
  const movies = getMoviesByCheckbox(state, checkBoxes.GENRES)
  const isFetching = state.fetchFlag.isFetching
  console.log(movies)
  return {movies, isFetching};
}

export default connect(mapStateToProps)(MovieList);