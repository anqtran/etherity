import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
// import ProfileItem from './ProfileItem';

import { getOrganizations } from '../../actions/organizationActions';

import OrganizationItem from './OrganizationItem';

class Organizations extends Component {
  componentDidMount() {
    this.props.getOrganizations();
  }

  render() {
    const { organizations, loading } = this.props.organization;
    let organizationItems;

    if (organizations === null || loading) {
      organizationItems = <Spinner />;
    } else {
      if (organizations.length > 0) {
        organizationItems = organizations.map(organization => (
          <OrganizationItem key={organization._id} organization={organization} />
        ));
      } else {
        organizationItems = <h4>No organization available...</h4>;
      }
    }

    return (
      <div className="organizations">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Charity Organizations</h1>
              <p className="lead text-center">Money will be donated to these organizations</p>
              {organizationItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Organizations.propTypes = {
  getOrganizations: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  organization: state.organization
});

export default connect(
  mapStateToProps,
  { getOrganizations }
)(Organizations);
