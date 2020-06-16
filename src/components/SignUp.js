import React, { Component, Fragment } from 'react'
import {FormGroup, Label, Input, Button, Row, Col, Container, Alert, Spinner} from "reactstrap";
import { addUser, attemptSignup } from "../redux/actions"
import {connect} from "react-redux";
import "../styles/styles.css"
import { LOGIN_STATUS } from '../constants';
import OnboardingSlides from './OnboardingSlides';


const mapStateToProps = (state) => {
    const status = state.loginReducer.status;
    const isFetching = state.fetchFlag.isFetching
    const signupSuccess = state.signupFlag
    return {status, isFetching, signupSuccess}
}

export class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            username: "",
            password: "",
            invalid: false,
        }
        this.createUser = this.createUser.bind(this);
        this.signup = this.signup.bind(this);
    }

    createUser(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    signup(){
        if(this.state.name !== "" && this.state.username !== "" && this.state.password !== ""){
            this.props.attemptSignup(this.state.name, this.state.username, this.state.password)
        }
    }

    render() {
        console.log(this.state)
        return (
            <Fragment>
                 {
                    this.props.isFetching ?
                    <Alert color="info">
                        <Row>
                        <Col xs="auto"><Spinner color="primary" /></Col>
                        <Col><p>Process Signup</p></Col>
                        </Row>
                    </Alert>
                    :''
                }
                {/* {
                    this.props.signupSuccess ?
                    <Alert color="info">
                        <Row>
                        <Col><p>sign up successful</p></Col>
                        </Row>
                    </Alert>
                    :''
                } */}
                {this.props.status === LOGIN_STATUS.SUCCESSFUL ? 
                <OnboardingSlides/>
                :
                <Container>
                    {this.props.status === LOGIN_STATUS.INVALID_SIGNUP ?
                    <Alert color="danger">
                        <p>Username is already taken.</p>
                    </Alert> : ""}
                    <FormGroup>
                        <Col>
                        <br/><Label for="name"> Name: </Label><br/>
                        <Input type="text" id="name" value={this.state.name} onChange={this.createUser}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                        <br/><Label for="username"> Username: </Label><br/>
                        <Input type="text" id="username" value={this.state.username} onChange={this.createUser}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                        <br/><Label for="password"> Password: </Label><br/>
                        <Input type="password" id="password" value={this.state.password} onChange={this.createUser}/>
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col className="login-button">
                            <br/><Button color="primary" onClick={this.signup}>Create Account</Button>
                        </Col>
                    </Row>
                </Container>}

            </Fragment>

        )
    }
}
export default connect(mapStateToProps, {addUser, attemptSignup}) (SignUp);
