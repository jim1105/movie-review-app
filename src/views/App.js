import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import { populateMovies, logout, resetCheckbox, resetClick} from "../redux/actions";
import {Container, Row, Col, UncontrolledCollapse, Button} from "reactstrap";
import Messages from "../components/Messages";
import Customers from "../components/Customers";
import MovieList from "../components/MovieList";
import MovieFilters from "../components/MovieFilters";
import PopularityMovieSearch from "../components/PopularityMovieSearch";
import {getAllMovies} from "../data/queries";
import { getReviews } from '../redux/actions';
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Watchlist from '../components/Watchlist';
import MoviePage from '../components/MoviePage';
import OnboardingSlides from "../components/OnboardingSlides";
import OnboardingHelp from "../components/OnboardingHelp";
import { LOGIN_STATUS} from '../constants'
import "../styles/styles.css"

const mapStateToProps = state => {
  const currentUser = state.userReducer.currentUser;
  const onboardingComplete = state.userReducer.onboardingComplete;
  const username = state.userReducer.username;
  const loginStatus = state.loginReducer.status;
  return { currentUser ,onboardingComplete, loginStatus, username}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.props.populateMovies(getAllMovies());
    this.props.getReviews();
  } 

  render() {
    console.log(this.props.onboardingComplete)
    return (
            <Container>
              <Row><br/><br/></Row>
                {this.props.username !== 'none'?
                  <h3>Welcome {this.props.username}</h3>
                  :''
                }
                <h1 className="header">Quarantine Movies</h1>
              {this.props.currentUser === -1 ?
              <Fragment> 
                <Navbar/>
                {this.props.loginStatus === LOGIN_STATUS.SUCCESSFUL &&
                  <Fragment>
                    <Customers/>
                    <Messages/>
                    <Form />
                  </Fragment>
                }
              </Fragment>
              :
                <Container>
                  {this.props.onboardingComplete?
                    <Fragment>
                        <Row>
                        </Row>
                        <Navbar/>
                        {this.props.loginStatus === LOGIN_STATUS.SUCCESSFUL &&
                          <Fragment>
                              <Customers/>
                              <Messages/>
                              <Form />
                          </Fragment>
                        }
                    </Fragment>
                  :
                    <OnboardingSlides/>
                  }
                </Container>
              }
             <Row><br/><br/></Row>
          </Container>
    )
  }
}

export default connect(mapStateToProps, 
  {populateMovies, logout, getReviews, resetCheckbox, resetClick})(App);
