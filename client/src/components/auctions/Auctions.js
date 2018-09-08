import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
// import ProfileItem from './ProfileItem';

import { getAuctions } from '../../actions/auctionActions';

import AuctionItem from './AuctionItem';

class Auctions extends Component {
  componentDidMount() {
    this.props.getAuctions();
  }

  render() {
    const { auctions, loading } = this.props.auction;
    let auctionItems;

    if (auctions === null || loading) {
      auctionItems = <Spinner />;
    } else {
      if (auctions.length > 0) {
        auctionItems = auctions.map(auction => (
          <AuctionItem key={auction._id} auction={auction} />
        ));
      } else {
        auctionItems = <h4>No auctions available...</h4>;
      }
    }

    return (
      <div className="auctions">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Auction Gallery</h1>
              <p className="lead text-center">GIVING is RECEIVING</p>
              {auctionItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Auctions.propTypes = {
  getAuctions: PropTypes.func.isRequired,
  auction: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auction: state.auction
});

export default connect(
  mapStateToProps,
  { getAuctions }
)(Auctions);
