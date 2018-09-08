import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

import ImageGallery from 'react-image-gallery';

class AuctionItem extends Component {
  render() {
    const { auction } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            {/* <img src={auction.user.avatar} alt="" className="rounded-circle" /> */}
            <ImageGallery items={auction.images} />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{auction.name}</h3>

            <p>{auction.shortDescription} </p>

            <p>Donated by {auction.user.name}</p>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Special For {auction.organization} </h4>
            <Link
              to={`/auction/${auction.handle}`}
              className="btn btn-secondary"
            >
              More Detail
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

AuctionItem.propTypes = {
  auction: PropTypes.object.isRequired
};

export default AuctionItem;
