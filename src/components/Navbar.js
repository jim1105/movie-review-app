import React, { Component } from 'react'
import NavLinks from "./NavLinks"
import {connect} from "react-redux";
import { logout, resetCheckbox, resetClick, fetchStarted, toggleFetch, leaveRoom } from "../redux/actions";
import {Container, Row, Spinner} from "reactstrap";
import PopularityMovieSearch from "../components/PopularityMovieSearch";
import { toggleBoarding } from '../redux/actions';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Watchlist from '../components/Watchlist';
import Display from './Display';
import Search from './Search';
import OnboardingSlides from './OnboardingHelp';
import "../styles/styles.css"

const mapStateToProps = state => {
  const currentUser = state.userReducer.currentUser;
  const username = state.userReducer.username
  return { currentUser, username}
}

class Navbar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            currentPage: 1
        }
    
        this.selectPage = this.selectPage.bind(this)
        this.getCurrentPage = this.getCurrentPage.bind(this)
    
      } 

      selectPage(page){
        if(Number(page) === 7){
            this.props.fetchStarted()
            setTimeout(()=>{
                this.props.logout()
                this.props.resetCheckbox()
                this.props.resetClick()
                this.props.toggleFetch()
                this.props.leaveRoom('live support', this.props.username)
            }, 1000)
            
            
        }
        if(Number(page) === 8){
            this.props.toggleBoarding()
        }
        this.setState({
            currentPage: Number(page)
        })
    
      }
    
      getCurrentPage(){
        switch (this.state.currentPage){
            case 2:
                return <Search/>
            case 3:
                return <PopularityMovieSearch/>
            case 4:
                return < SignUp/>
            case 5:
                return <Login/>
            case 6:
                return <Watchlist/>
            case 8:
                return <OnboardingSlides/>
            default:
                return <Search/>
        }
      }
    
    render() {
        return (
            <div>
                <NavLinks currentPage={this.state.currentPage} selectPage={this.selectPage}/>
                <Display>{this.getCurrentPage()}</Display>
                <Row><br/><br/><br/></Row>
            </div>
        )
    }
}

export default connect(mapStateToProps, {logout, toggleBoarding, fetchStarted, toggleFetch, resetCheckbox, resetClick, leaveRoom})(Navbar);