import React from 'react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Table, Space, Card, Col, Button, DatePicker, Form, message } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles.js';
import { getCompletedPlatformsOrdersByTime, refreshCompletedPlatformsOrdersByTime } from '../../appStore/actions/reportsActions'

function UncompletedOrdersByPlatforms() {
  return (
    <div>UncompletedOrdersByPlatforms</div>
  )
}

export default UncompletedOrdersByPlatforms