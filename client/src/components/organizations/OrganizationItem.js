import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import isEmpty from '../../validation/is-empty';

import Img from 'react-image';

class OrganizationItem extends Component {
  render() {
    const { organization } = this.props;
    var phoneNumber = organization.phone;
    phoneNumber =
      '(' +
      phoneNumber.toString().substr(0, 3) +
      ')' +
      ' ' +
      phoneNumber.toString().substr(3);
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            {
              <img
                src={organization.avatar}
                alt=""
                className="rounded-circle"
              />
            }
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{organization.name}</h3>

            <p>{organization.description} </p>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h5>Website : {organization.website}</h5>
            <p> Phone Number : {phoneNumber} </p>
            <p> Email : {organization.email} </p>
            <p> Etherum Wallet: {organization.wallet} </p>
          </div>
        </div>
      </div>
    );
  }
}

OrganizationItem.propTypes = {
  organization: PropTypes.object.isRequired
};

export default OrganizationItem;
