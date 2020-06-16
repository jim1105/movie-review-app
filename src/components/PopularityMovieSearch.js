import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import Movie from './Movie'
import MoviePage from './MoviePage'
import {getMoviesByRating} from "../redux/selectors";
import {Jumbotron, Button, Tooltip, Container, Row, Col, Alert, Spinner} from "reactstrap";
import {toggleClick} from "../redux/actions";
import "../styles/styles.css"

class PopularityJobSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
          tooltipOpen: false,
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

onClickHandler =() => {
    this.setState(state => ({
        tooltipOpen: !state.tooltipOpen
      }));
}
componentDidMount() {
  this.setState({
    tooltipOpen: true
  })
}

 render(){

   return (
    <Fragment>
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
      <h1>Sorted Movies</h1>
        {this.state.expand === false ? 
        <Container>
        <Button color="primary" id="hit" className="mx-auto" onClick={()=>{this.props.toggleClick(); this.onClickHandler()}}>Sort by Rating</Button>
        <Jumbotron>
        {this.props.click
            ? this.props.movies.map((movie, index) => {
            return <Row><br/><Button color="link" id={movie.title} value={movie.title} onClick={() => this.movieView(movie.title)}><Movie key={`todo-${index}`} id={`todo-${index}`} movie={movie} showOnboarding={this.props.completed === 0 && index === 0} /></Button><Row><br/></Row></Row>
            })
            : "Search result empty"}
        </Jumbotron></Container>
        : 
        <Container>
              <Row>
                <Col>
                <Jumbotron>
                {this.props.click
                ? this.props.movies.map((movie, index) => {
                return <Row><br/><Button color="link" id={movie.title} value={movie.title} onClick={() => this.movieView(movie.title)}><Movie key={`todo-${index}`} id={`todo-${index}`} movie={movie} showOnboarding={this.props.completed === 0 && index === 0} /></Button><Row><br/></Row></Row>
                })
                : "Search result empty"}
                </Jumbotron>
                </Col>
                <Col><MoviePage movie={this.state.movie}/></Col>
              </Row> 
          </Container>}
            
     </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {click} = state
  const movies = getMoviesByRating(state)
  const isFetching = state.fetchFlag.isFetching
  return {movies, click, isFetching};
}

export default connect(mapStateToProps, {toggleClick} )(PopularityJobSearch);