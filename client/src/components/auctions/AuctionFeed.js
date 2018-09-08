import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import PostItem from './PostItem';
import AuctionItem from './AuctionItem';

class AuctionFeed extends Component {
  render() {
    const { auctions } = this.props;

    return auctions.map(post => (
      <AuctionItem key={auction._id} auction={auction} />
    ));
  }
}

AuctionFeed.propTypes = {
  auctions: PropTypes.array.isRequired
};

export default AuctionFeed;
