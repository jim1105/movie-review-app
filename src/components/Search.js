import React from 'react'
import {Container, Row, Col} from "reactstrap";
import MovieList from "../components/MovieList";
import "../styles/styles.css"

const Search = () => {
    return (
        <div>
            <Row>
            {/* <Col>
                <MovieFilters/>
            </Col> */}
            <Col>
                <MovieList/>
            </Col>
            </Row>
        </div>
    )
}

export default Search; 