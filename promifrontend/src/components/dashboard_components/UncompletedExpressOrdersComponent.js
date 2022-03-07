import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUncompletedExpressOrders } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
import { Table, Card, Col, Image,Row } from 'antd'
import moment from 'moment'
// Express neatlikti uzsakymai
function UncompletedExpressOrdersComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getUncompletedExpressOrders())
    }, [])
    const uncompleted_express_order_columns = [
        {
            title: 'Dealinas',
            dataIndex: 'orderFinishDate',
            width: '10%',
            render: (text, record, index) => (
                <p>{moment(text).format('YYYY/MM/DD')}</p>
            )
        },
        {
            title: 'Nr',
            dataIndex: 'orderNumber',
            width: '10%'
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '10%'
        },
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '10%'
        },
        {
            title: 'Foto',
            dataIndex: 'imagePath',
            width: '10%',
            render: (text, record, index) => {
                if (text === null || text === undefined)
                    return (<p></p>)
                else
                    return <Image src={text} height={25} alt='Foto' />
            }
        },
        {
            title: 'Platforma',
            dataIndex: 'platforma',
            width: '10%'
        }
    ]
  return (
      // Express neatlikti uzsakymai
      <Col span={24} style={{ marginTop: '20px' }}>
      <Row gutter={16}>
          <Col span={16}>
              <div style={{ marginRight: '40px', textAlign: 'start' }}>
                  <h3>Express neatlikti užsakymai</h3>
              </div>
          </Col>
      </Row>
      <Row gutter={16}>
          <Col span={24}>
              <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                  <Table
                      rowKey="id"
                      columns={uncompleted_express_order_columns}
                      dataSource={orderDetailsReducer.uncompleted_express_orders}
                      pagination={{ pageSize: 10 }}
                      bordered
                      scroll={{ x: 'calc(200px + 50%)' }}
                  />

              </Card>
          </Col>
      </Row>
  </Col>
  )
}

export default UncompletedExpressOrdersComponent