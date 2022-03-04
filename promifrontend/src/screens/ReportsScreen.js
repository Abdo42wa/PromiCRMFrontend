import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Table, Space, Card, Typography, Col, Row, Button,Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { getLastMonthSoldProducts, getCompletedPlatformsOrdersByTime } from '../appStore/actions/reportsActions'
import { useHistory } from 'react-router-dom'
function ReportsScreen(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const usersReducer = useSelector((state) => state.usersReducer)
  const reportsReducer = useSelector((state) => state.reportsReducer)
  useEffect(() => {
    if (usersReducer.currentUser !== null) {
      dispatch(getLastMonthSoldProducts())
    } else
      history.push('/login')
  }, [usersReducer.currentUser])
  const lastMonthSoldProductsColumns = [
    {
      title: 'Kodas',
      dataIndex: 'productCode',
      width: '5%',
      render: (text, record, index) => (
        <p>{text === null ? "" : text}</p>
      )
    },
    {
      title: 'Nuotrauka',
      dataIndex: 'imagePath',
      width: '5%',
      render: (text, record, index) => (
        <Image src={text === null ? "" : text} width={30}/>
      )
    },
    {
      title: 'Kaina',
      dataIndex: 'price',
      width: '5%',
      render: (text, record, index) => (
        <p>{text === null ? "" : text}</p>
      )
    },
    {
      title: 'Kiekis',
      dataIndex: 'quantity',
      width: '5%',
      render: (text, record, index) => (
        <p>{text === null ? "" : text}</p>
      )
    },
    {
      title: 'Klientas(nestandartinis)',
      width: '5%',
      render: (text, record, index) => (
        <p>{record.customerName === null && record.customerLastName === null ? "" : `${record.customerName} ${record.record.customerLastName}`}</p>
      )
    }
  ]
  return (
    <div style={{ marginTop: 45, marginBottom: 45 }}>
      <Col lg={24} style={{ marginTop: '20px' }}>
        <div style={{ marginRight: '40px', textAlign: 'start' }}>
          <h3>Parduota per praėjusį mėnesį</h3>
        </div>
        <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
          <Table
            rowKey="id"
            columns={lastMonthSoldProductsColumns}
            dataSource={reportsReducer.last_month_sold_products}
            pagination={{ pageSize: 15 }}
            bWorked
            scroll={{ x: 'calc(200px + 50%)' }}

          />

        </Card>
      </Col>
    </div>
  )
}

export default ReportsScreen