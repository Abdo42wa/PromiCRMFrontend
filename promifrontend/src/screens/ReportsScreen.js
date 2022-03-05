import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import CompletedPlatformsOrdersByTime from '../components/reports_components/CompletedPlatformsOrdersByTime.js';
import LastMonthSoldProducts from '../components/reports_components/LastMonthSoldProducts.js';

function ReportsScreen(props) {
  const history = useHistory();
  const usersReducer = useSelector((state) => state.usersReducer)

  useEffect(() => {
    if (usersReducer.currentUser === null) {
      history.push('/login')
    }      
  }, [usersReducer.currentUser])
  return (
    <div style={{ marginTop: 45, marginBottom: 45 }}>
      <LastMonthSoldProducts/>
      <CompletedPlatformsOrdersByTime/>
    </div>
  )
}

export default ReportsScreen