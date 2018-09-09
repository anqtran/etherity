import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Countdown from './Countdown.js';
import Spinner from '../common/Spinner';
import { getAuction, updateAuction } from '../../actions/auctionActions';
import web3 from '../../web3';
import auction from '../../auction';


import TextFieldGroup from '../common/TextFieldGroup';

import Img from 'react-image';

import socketIOClient from 'socket.io-client';


class Auction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_auction: {},
      loading: '',
      currentPrice: '',
      errors: {},
      response: false,
      endpoint: 'http://192.168.1.67:3000/'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on('FromAPI', data => this.setState({ response: data }));

    this.props.getAuction(this.props.match.params.id);
    // const { auction, loading, error } = this.props.auction;

    // console.log('did mount props => ', this.props);
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
    const { auction } = this.props.auction;
    const bidData = {
      id: auction._id,
      highestbid: this.state.currentPrice,
      buyer: auction.buyer
    };
    console.log('bidData =>', bidData);

    this.props.updateAuction(bidData, this.props.history);
  }

  render() {
    const { auction, errors, loading } = this.props.auction;

    // console.log('auction => ', auction);

    let auctionContent;
    // console.log(auction);
    if (auction === null || loading || auction === '') {
      auctionContent = <Spinner />;
    } else {
      console.log(auction);
      // <p> {response} </p>;
      const currentDate = new Date(auction.date);
      // console.log('auction.date => ', auction.date);
      // console.log('currentData => ', currentDate);
      const year =
        currentDate.getMonth() === 11 && currentDate.getDate() > 23
          ? currentDate.getFullYear() + 1
          : currentDate.getFullYear();
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
              {auction.buyer ? (
                <div>Highest Donator: {auction.buyer} </div>
              ) : null}
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <div className="row">
                <h4>Highest Bid : </h4>
                {<h4> {auction.highestbid ? auction.highestbid : 0}</h4>}
              </div>
              <div className="row">
                <form onSubmit={this.onSubmit}>
                  <label>
                    <TextFieldGroup
                      placeholder="Bid Price"
                      name="currentPrice"
                      type="number"
                      value={this.state.currentPrice}
                      onChange={this.onChange}
                      // error={errors.currentPrice}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Donate"
                    className="btn btn-secondary btn-block mt-4"
                  />
                </form>
              </div>
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
  updateAuction: PropTypes.func.isRequired,
  auction: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auction: state.auction,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAuction, updateAuction }
)(Auction);
