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
            <p>
              {auction.status}{' '}
              {isEmpty(auction.company) ? null : (
                <span>at {auction.company}</span>
              )}
            </p>
            <p>
              {isEmpty(auction.location) ? null : (
                <span>{auction.location}</span>
              )}
            </p>
            <Link
              to={`/auction/${auction.handle}`}
              className="btn btn-secondary"
            >
              View auction
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {auction.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
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
