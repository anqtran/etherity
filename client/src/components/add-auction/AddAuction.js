import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

import SelectListGroup from '../common/SelectListGroup';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAuction } from '../../actions/auctionActions';

import { getOrganizations } from '../../actions/organizationActions';

class AddAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      organization: '',
      shortDescription: '',
      description: '',
      basePrice: '',

      // seller: '',
      images: [],
      // bid: {},
      // time: Date,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    // console.log('Here is props ' + this.props);
    this.props.getOrganizations();
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log(this.props.history);

    const auctData = {
      name: this.state.name,
      shortDescription: this.state.shortDescription,
      basePrice: this.state.basePrice,
      description: this.state.description,
      organization: this.state.organization,
      // seller: this.state.user,
      images: this.state.images
      // bid: this.state.bid,
      // time: this.state.time
    };
    // console.log('Here is sending)');
    // console.log(auctData);
    this.props.addAuction(auctData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { organizations } = this.props.organization;

    // Select options for status
    let options = [{ label: '* Select Organization', value: 0 }];

    if (organizations.length > 1) {
      organizations.forEach(function(org) {
        let option = { label: org.name, value: org._id };
        options.push(option);
        return;
      });
    }
    // console.log(options);

    return (
      <div className="add-auction">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Auction</h1>
              <p className="lead text-center">
                Give anything for honor purposes
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <h6>Name</h6>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <h6>For Organization</h6>
                {/* <TextFieldGroup
                  placeholder="* For Organization"
                  name="organization"
                  value={this.state.organization}
                  onChange={this.onChange}
                  error={errors.organization}
                /> */}
                <SelectListGroup
                  placeholder="For Organization"
                  name="organization"
                  value={this.state.organization}
                  onChange={this.onChange}
                  options={options}
                  error={errors.organization}
                  info="Organization you want to donate to"
                />
                <h6>Base Price</h6>
                <TextFieldGroup
                  placeholder="* Initial Price"
                  name="basePrice"
                  type="number"
                  value={this.state.basePrice}
                  onChange={this.onChange}
                  error={errors.basePrice}
                />
                <h6>Short Description</h6>
                <TextFieldGroup
                  placeholder="* Short Description"
                  name="shortDescription"
                  value={this.state.shortDescription}
                  onChange={this.onChange}
                  error={errors.shortDescription}
                />
                <h6>Detail Description</h6>
                <TextFieldGroup
                  placeholder="* Detail Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-secondary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddAuction.propTypes = {
  addAuction: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  auction: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  organization: state.organization,
  auction: state.auction,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addAuction, getOrganizations }
)(withRouter(AddAuction));
