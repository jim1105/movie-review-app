import React, {Component, Fragment} from "react";
import cx from "classnames";
import "../styles/styles.css"

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false
    }
  }

  componentDidMount() {
    this.setState({tooltipOpen: true})
  }

  render() {
    return (
      <Fragment>
        <p className="movie-item">
          <span id={this.props.id}
            className={cx(
              "movie-item__text",
              this.props.movie && this.props.movie.completed && "movie-item__text--completed"
            )}
          >
            {this.props.movie.title + ', ' +'Year: ' + this.props.movie.year + ', ' + 'Rating: ' + this.props.movie.rating}
          </span>
        </p>
      </Fragment>
    )
  }
}

export default Movie;