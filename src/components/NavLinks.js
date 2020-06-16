import React from 'react'
import {Row, Container, Col} from "reactstrap";
import {connect} from "react-redux";
import Link from './Link';
import "../styles/styles.css"

const mapStateToProps = state => {
    const currentUser = state.userReducer.currentUser;
    return { currentUser}
  }

const NavLinks = (props) => {
    return (
        <div>
            <Row><br/></Row>
            {props.currentUser === -1 ? 
            <Container>
            <Row>
            <Col><Link name="Search" id={2} selectPage={props.selectPage} currentPage={props.currentPage}>Search</Link><Row><br/></Row></Col>
            <Col><Link name="Sort All" id={3} selectPage={props.selectPage} currentPage={props.currentPage}>All Movies by Rating</Link><Row><br/></Row></Col>
            <Col><Link name="Signup" id={4} selectPage={props.selectPage} currentPage={props.currentPage}>Signup</Link><Row><br/></Row></Col>
            <Col><Link name="Login" id={5} selectPage={props.selectPage} currentPage={props.currentPage}>Login</Link><Row><br/></Row></Col>
            </Row></Container>
            :
            <Container>
            <Row>
            <Col><Link name="Search" id={2} selectPage={props.selectPage} currentPage={props.currentPage}>Search</Link><Row><br/></Row></Col>
            <Col><Link name="Sort All" id={3} selectPage={props.selectPage} currentPage={props.currentPage}>All Movies by Rating</Link><Row><br/></Row></Col>
            <Col><Link name="Watchlist" id={6} selectPage={props.selectPage} currentPage={props.currentPage}>Watchlist</Link><Row><br/></Row></Col>
            <Col><Link name="Logout" id={7} selectPage={props.selectPage} currentPage={props.currentPage}>Logout</Link><Row><br/></Row></Col>
            <Col><Link name="Onboarding" id={8} selectPage={props.selectPage} currentPage={props.currentPage}>Help</Link><Row><br/></Row></Col>
            </Row></Container>}
            <Row><br/></Row>
        </div>
    )
}

export default connect(mapStateToProps)(NavLinks);
