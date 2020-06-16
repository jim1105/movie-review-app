import React, { Component, Fragment } from 'react'
import {FormGroup, Label, Input, Button, Row, Col, Alert, Container, Spinner} from "reactstrap";
import { validateLogin } from "../redux/actions"
import {connect} from "react-redux";
import {LOGIN_STATUS} from "../constants";
import "../styles/styles.css"

const mapStateToProps = (state) => {
    const status = state.loginReducer.status;
    const isFetching = state.fetchFlag.isFetching
    return {status, isFetching}
}
export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            invalid: false
        }

        this.usernameAndPassword = this.usernameAndPassword.bind(this);
        this.login = this.login.bind(this);
    }

    usernameAndPassword(e) {
        this.setState({
            [e.target.id]: e.target.value,
            invalid: false
        })
    }

    login() {
        this.props.validateLogin(this.state.username, this.state.password)
    }

    render() {
        return (
            <Fragment className="body">
                 {
                    this.props.isFetching ?
                    <Alert color="info">
                        <Row>
                        <Col xs="auto"><Spinner color="primary" /></Col>
                        <Col><p>Process Login</p></Col>
                        </Row>
                    </Alert>
                    :""
                }
                {
                    this.props.status === LOGIN_STATUS.INVALID || this.props.status === LOGIN_STATUS.ERROR ?
                        <Alert color="danger">
                            {this.props.status === LOGIN_STATUS.INVALID ? "Invalid username or password." : ""}
                            {this.props.status === LOGIN_STATUS.ERROR ? "Database error." : ""}
                        </Alert> : ""
                }
                <Container className="login">
                    <FormGroup>
                        <Col>
                        <br/><Label for="username"> Username: </Label><br/>
                        <Input type="text" id="username" value={this.state.username} onChange={this.usernameAndPassword} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                        <br/><Label for="password"> Password: </Label><br/>
                        <Input type="password" id="password" value={this.state.password} onChange={this.usernameAndPassword} />
                        </Col>
                    </FormGroup>
                    <Row>
                        <Col className="login-button">
                            <br/><Button color="primary" onClick={this.login}>Submit</Button>
                        </Col>
                    </Row>
                </Container>
            </Fragment>

        )
    }
}

export default connect(mapStateToProps, {validateLogin}) (Login);
