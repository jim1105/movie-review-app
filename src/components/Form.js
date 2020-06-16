import React, {Component, Fragment} from "react";
import {FormGroup, Input, Label, Button, Container, Alert} from "reactstrap";
import {connect} from "react-redux";
import {sendToServer, joinRoom, toggleRoom, updateCustomers, leaveRoom} from "../redux/actions";
import "../styles/styles.css"

const mapStateToProps = state => {
    const showRoom = state.chatRoom.showRoom
    const customers = state.chatRoom.customers
    const showSupport = state.chatRoom.showSupport
    const username = state.userReducer.username
    return {showRoom, showSupport, customers, username}
}


class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageTxt: "",
            name:"admin",
          }
      
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        this.props.sendToServer("!@#", this.props.username);
        this.props.joinRoom('waiting room', this.props.username);
        this.props.updateCustomers("dummy");
    }
    
    handleInput(event) {
        this.setState({[event.target.id]:event.target.value});
    }

    roomHandler = ()=> {
        this.props.joinRoom('live support',this.props.username);
    }
    resetMsg = () => {
        this.setState({
            messageTxt: ""
        })
    }
    sendMessage = () =>{
        this.props.sendToServer(this.state.messageTxt, this.props.username);
        this.setState({
            messageTxt: ""
        })

    }
    
    render() {
        return (
            <Fragment>
                {(this.props.username === 'admin' && this.props.customers.length === 0)&&
                    <Alert color="danger">
                        waiting for customer to join
                    </Alert>
                }
                {(!this.props.customers.includes(this.props.username) && this.props.customers.includes('admin') && this.props.customers.length === 1 && this.props.username !== 'admin')&&
                    <Alert color="danger">
                        room is available
                    </Alert>
                }   
                {(!this.props.customers.includes(this.props.username) && this.props.customers.length === 2 && this.props.username !== 'admin')&&
                    <Alert color="danger">
                        agent is busy with another customer
                    </Alert>
                }   
                {(this.props.customers.includes(this.props.username) && this.props.customers.includes('admin')) &&
                    <Fragment>
                        <FormGroup>
                            <Label for="messageTxt">Your message:</Label>
                            <Input id="messageTxt" type="textarea" 
                                // placeholder="Enter your message"
                                value = {this.state.messageTxt}
                                onChange={this.handleInput}></Input>
                        </FormGroup>

                        <Button
                                className="float-right" 
                                onClick={()=>this.props.leaveRoom('live support', this.props.username)}>
                            leave room
                        </Button>
                        <Button className="float-right" 
                                onClick={this.sendMessage}>

                            Send
                        </Button>
                    </Fragment>
                }
                {(!this.props.customers.includes('admin') && this.props.customers.length === 1 && this.props.customers.includes(this.props.username))&&
                    <Alert color="danger">
                        waiting for agent
                    </Alert>
                }
                {(this.props.username === 'admin' && this.props.customers.includes('admin') && this.props.customers.length === 1)&&
                    <Alert color="danger">
                        A customer left the chat
                    </Alert>
                }
                {((!this.props.showRoom) && (this.props.username !== "admin")) &&
                <Button
                        className="float-right" 
                        onClick={()=>this.roomHandler()}>
                    join room
                </Button>
                }
                {(this.props.showSupport && !this.props.customers.includes('admin') && this.props.username === 'admin')&&
                <Button
                        className="float-right" 
                        onClick={()=>this.roomHandler()}>
                        hit this button to help customer
                </Button>
                }
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, {sendToServer, joinRoom, toggleRoom, updateCustomers, leaveRoom})(Form);