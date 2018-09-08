import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Countdown from './Countdown.js';
import Spinner from '../common/Spinner';
import { getAuction } from '../../actions/auctionActions';

import ImageGallery from 'react-image-gallery';

class Auction extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.seller = this.props.auction.seller;
  }

  componentDidMount() {
    console.log('did mount');
    console.log(this.props.match.params.id);
    this.props.getAuction(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auction.profile === null && this.props.auction.loading) {
      this.props.history.push('/not-found');
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { auction, loading } = this.props.auction;
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

    let auctionContent;
    console.log(auction);
    if (auction === null || loading || auction === '') {
      auctionContent = <Spinner />;
    } else {
      // const seller = this.state.auction.seller;
      auctionContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Gallery
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <div className="row">
            <ImageGallery items={auction.images} />
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{auction.name}</h3>

              <p>{auction.description} </p>

              {/* <p>Donated by {}</p> */}
              <p>To {auction.organization}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <div>Here is the count down clock!!!!!!!!!!!!!!</div>
              <Countdown date={`${year}-12-24T00:00:00`} />
              {auction.bid ? (
                <div>Highest Donator: {auction.bid.buyer} </div>
              ) : null}
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <label>
                {/* <h6 />
                <TextFieldGroup
                  placeholder="* Initial Price"
                  name="basePrice"
                  type="number"
                  value={this.state.basePrice}
                  onChange={this.onChange}
                  error={errors.basePrice}
                /> */}
              </label>

              {/* <Link
                to={`/bid/${auction.handle}/${this.state.value}`}
                className="btn btn-secondary"
              >
                Donate
              </Link> */}
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
  auction: PropTypes.object.isRequired
  // seller: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auction: state.auction
  // seller: state.auction.seller
});

export default connect(
  mapStateToProps,
  { getAuction }
)(Auction);
