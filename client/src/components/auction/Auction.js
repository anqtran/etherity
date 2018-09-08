import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Countdown from './Countdown.js';
import Spinner from '../common/Spinner';
import { getAuction } from '../../actions/auctionActions';

import TextFieldGroup from '../common/TextFieldGroup';

import Img from 'react-image';

class Auction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auction: {},
      loading: '',
      seller: {},
      currentPrice: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAuction(this.props.match.params.id);
    const { auction, loading, error } = this.props.auction;
    const seller = this.props.auction.seller;
    this.setState({
      auction,
      loading,
      seller,
      errors: error
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auction.profile === null && this.props.auction.loading) {
      this.props.history.push('/not-found');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { auction, errors, loading } = this.state;

    const currentDate = new Date();
    const year =
      currentDate.getMonth() === 11 && currentDate.getDate() > 23
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();
    let auctionContent;
    // console.log(auction);
    if (auction === null || loading || auction === '') {
      auctionContent = <Spinner />;
    } else {
      // console.log(auction);

      auctionContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/auctions" className="btn btn-light mb-3 float-left">
                Back To Gallery
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <div className="row">
            <Img src={auction.images} />
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{auction.name}</h3>

              <p>{auction.description} </p>

              <p>Donated by {auction.seller}</p>
              <p>To {auction.organization}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <Countdown date={`${year}-12-24T00:00:00`} />
              {auction.bid ? (
                <div>Highest Donator: {auction.bid.buyer} </div>
              ) : null}
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <div className="row">
                <h4>Highest Bid</h4>
                {/* <h3>{auction.bid.highestPrice}</h3> */}
              </div>
              <div className="row">
                <label>
                  <h4>Go Bid!!!</h4>
                  <TextFieldGroup
                    placeholder="Bid Price"
                    name="currentPrice"
                    type="number"
                    value={this.state.currentPrice}
                    onChange={this.onChange}
                    error={errors.currentPrice}
                  />
                </label>
              </div>

              <Link
                to={`/bid/${auction.handle}/${this.state.currentPrice}`}
                className="btn btn-secondary"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="auction">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{auctionContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Auction.propTypes = {
  getAuction: PropTypes.func.isRequired,
  auction: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auction: state.auction,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAuction }
)(Auction);
