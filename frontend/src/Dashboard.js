import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      Welcome {user}!<br /><br />
        <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
