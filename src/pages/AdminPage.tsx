import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AdminContainer from '../containers/AdminContainer';

const AdminPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <AdminContainer />;
};

export default withRouter(AdminPage);
