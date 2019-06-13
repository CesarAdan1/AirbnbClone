import React, { Component } from "react";
import { connect } from "react-redux";
import { checkAvailability } from "../../store/actions/availabilityAction";
import { bookProperty } from "../../store/actions/bookingAction";
import { Link } from "react-router-dom";
import StartCalendar from "./search/StartCalendar.js";
import EndCalendar from "./search/EndCalendar.js";
import moment from "moment";
import Loading from "./Loading";
import Slider from "./slider/Slider";

class ApartmentDetails extends Component {
  state = {
    property: this.props.match.params.id,
    user: null,
    num_guests: 2, // will pick by form after
    payedwith: "MasterCard",
    date: {
      start: new Date(),
      end: new Date()
    }
  };
  handleEndDate = e => {
    var formatEnd = moment(e).format("DD-MM-YYYY");
    let date = Object.assign({}, this.state.date);
    date.start = formatEnd;
    this.setState({ date });
  };
  handleStartDate = e => {
    var formatStart = moment(e).format("DD-MM-YYYY");
    let date = Object.assign({}, this.state.date);
    date.start = formatStart;
    this.setState({ date });
  };
  reserve = e => {
    e.preventDefault();
    this.props.bookProperty(this.state);
  };
  render() {
    const { post } = this.props.location.state;
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            {post ? (
              <React.Fragment>
                <span className="card-title">
                  <div> {post.title}</div>
                </span>
                <Slider images={post.img} />
                <div> {post.body}</div>
              </React.Fragment>
            ) : (
              <Loading />
            )}
            <div
              className="row col s12 center-align"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <StartCalendar
                placeholder={"Start Date"}
                handleDate={this.handleStartDate}
              />
              <EndCalendar
                placeholder={"End Date"}
                handleDate={this.handleEndDate}
              />
              <div className="row col s4">
                <Link
                  to="/apartmentlistings"
                  className="btn-large waves-effect waves-light red "
                >
                  <i className="material-icons left">card_travel</i>BOOK NOW
                </Link>
              </div>
              <a
                className="waves-effect waves-light btn-large "
                onClick={this.props.checkAvailability}
              >
                Show me available dates
              </a>

              <a
                className="waves-effect waves-light btn-large "
                onClick={this.reserve}
              >
                Send my booking dates
              </a>
              {/* {mesaj ? <div> {mesaj}</div> : null} */}
            </div>
          </div>
          <div className="card-action grey lighten-4 grey-text right-align">
            {post ? (
              <span>
                <div>
                  <h6>Property Owner: </h6>
                  <div> {post.addedby}</div>
                </div>
                <div>date</div>
              </span>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    booking: state.booking.msg
  };
};

const mapDispatchToProps = dispatch => ({
  checkAvailability: select => dispatch(checkAvailability(select)),
  bookProperty: params => dispatch(bookProperty(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApartmentDetails);
