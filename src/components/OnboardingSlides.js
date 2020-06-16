import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import {connect} from "react-redux";
import Slide from "./Slide";
import SlideIndicator from "./SlideIndicator";
import {onboardingComplete, onboardingCompleteInDatabase} from "../redux/actions";
import {toggleBoarding} from "../redux/actions";
import "../styles/styles.css"

const TOTAL_SLIDES = 5;
const mapStateToProps = (state) => {
    const completed =  state.onboardingComplete;
    const currentUser = state.userReducer.currentUser
    return {completed, currentUser};
}

class OnboardingSlides extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSlide: 1
        }

        this.pickSlide = this.pickSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.exitOnboarding = this.exitOnboarding.bind(this);
    }

    setSlideState(id) {
        if (id === this.state.activeSlide) {
            return "active";
        } else {
            return "inactive";
        }
    }

    pickSlide(event, id) {
        this.setSlide(id);
    }

    nextSlide() {
        let id = this.state.activeSlide;
        id < TOTAL_SLIDES ? this.setSlide(id + 1) : this.exitOnboarding();
    }

    setSlide(id) {
        this.setState({activeSlide: id});
    }

    exitOnboarding() {
        this.props.onboardingCompleteInDatabase(this.props.currentUser);
        // this.props.onboardingComplete();
    }

    generateSlides() {
        let indicators = [];
        for (let i = 1; i <= TOTAL_SLIDES; i++) {
            indicators.push(<SlideIndicator slideStatus={this.setSlideState(i)} key={i} slideID={i} click={this.pickSlide} />)
        }
        return indicators;
    }

    render() {
        return (
            <div className="fullscreen slides-bg">
                <Slide slideStatus={this.setSlideState(1)} slideId={1}>
                    <Container>
                        <Row>
                            <Col>
                                <br/><br/><br/><br/>
                                <h1>Search Movies by Genre</h1>
                                <p>You can use the checkboxes to select the genres you are looking for. 
                                    You can select multiple genres at the same time. 
                                    Click on a movie title in the results for more information.</p>
                            </Col>
                        </Row>
                    </Container>
                </Slide>
                <Slide slideStatus={this.setSlideState(2)} slideId={2}>
                    <Container>
                        <Row>
                            <Col>
                            <br/><br/><br/><br/>
                                <h1>Save Movies to Your Watchlist</h1>
                                <p>Click on the "Add Movie to Watchlist" button on the movie page to add it to your personal watchlist.</p>
                            </Col>
                        </Row>
                    </Container>
                </Slide>
                <Slide slideStatus={this.setSlideState(3)} slideId={3}>
                    <Container>
                        <Row>
                            <Col>
                            <br/><br/><br/><br/>
                                <h1>Sort by Rating</h1>
                                <p>You can sort all the movies in the database based on their rating.</p>
                            </Col>
                        </Row>
                    </Container>
                </Slide>
                <Slide slideStatus={this.setSlideState(4)} slideId={4}>
                    <Container>
                        <Row>
                            <Col>
                            <br/><br/><br/><br/>
                                <h1>Add a Review</h1>
                                <p>If you are logged in, you may add a movie review on the movie page.</p>
                            </Col>
                        </Row>
                    </Container>
                </Slide>
                <Slide slideStatus={this.setSlideState(5)} slideId={5}>
                    <Container>
                        <Row>
                            <Col>
                            <br/><br/><br/><br/>
                                <h1>Speak to Customer Service</h1>
                                <p>You can chat with online tech support if you are logged in.
                                    If you join the live support room you may talk to tech support.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Slide>
                <div className="slides-controls">
                    <button className="align-left control-btn" onClick={this.exitOnboarding}>Skip</button>
                    <div className="align-center">
                        {this.generateSlides()}
                    </div>
                    <button className="align-right control-btn" onClick={this.nextSlide}>
                        {
                            this.state.activeSlide < TOTAL_SLIDES ? "Next" : "Done"
                        }
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, {onboardingComplete, onboardingCompleteInDatabase, toggleBoarding}) (OnboardingSlides);