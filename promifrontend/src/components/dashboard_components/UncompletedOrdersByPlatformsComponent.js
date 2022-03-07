import React, { useEffect } from 'react'
import { Table, Card, Row, Col, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUncompletedOrdersByPlatforms } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
import moment from 'moment'

//Atvaizdavimas pagal platforma
function UncompletedOrdersByPlatformsComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getUncompletedOrdersByPlatforms())
    }, [])
    const uncompleted_orders_by_platforms_columns = [
        {
            title: 'Platforma',
            dataIndex: 'platforma',
            width: '20%',
            render: (text, record, index) => (
                <Typography.Text>{text !== null ? text : ""}</Typography.Text>
            )
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '20%'
        },
        {
            title: 'Kaina',
            dataIndex: 'price',
            width: '20%',
            render: (text, record, index) => (
                <Typography.Text>{text !== null ? text : ""}</Typography.Text>
            )
        },
        {
            title: 'Platforma',
            dataIndex: 'orderFinishDate',
            width: '20%',
            render: (text, record, index) => (
                <Typography.Text>{text !== null ? moment(text).format("YYYY/MM/DD") : ""}</Typography.Text>
            )
        },
    ]
  return (
      //Atvaizdavimas pagal platforma
      <Col span={24} style={{ marginTop: '20px' }}>
      <Row gutter={16}>
          <Col span={16}>
              <div style={{ marginRight: '40px', textAlign: 'start' }}>
                  <h3>Nepadaryti užsakymai pagal Platforma</h3>
              </div>
          </Col>
      </Row>
      <Row gutter={16}>
          <Col span={24}>
              <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                  <Table
                      rowKey="id"
                      columns={uncompleted_orders_by_platforms_columns}
                      dataSource={orderDetailsReducer.uncompleted_orders_by_platforms}
                      pagination={false}
                      bordered
                      scroll={{ x: 'calc(300px + 50%)' }}
                  />

              </Card>
          </Col>
      </Row>
  </Col>
  )
}

export default UncompletedOrdersByPlatformsComponent