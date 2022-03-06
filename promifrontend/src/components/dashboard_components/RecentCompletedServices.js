import React, { useEffect } from 'react'
import { Table, Card, Typography, Col, Row, Image} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentOrders } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
import moment from 'moment'

//Get most recents orders/works. Newest 10 works. Naujausi atlikti darbai
function RecentCompletedServices() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getRecentOrders())
    }, [])
    const recent_works_columns = [
        {
            title: "Laikas",
            dataIndex: "completionDate",
            width: '15%',
            render: (text, record, index) => (
                <Typography.Text>{moment(text).format("HH:mm")}  {moment(text).format("YYYY/MM/DD")}</Typography.Text>
            )
        },
        {
            title: 'Nr',
            dataIndex: 'orderNumber',
            width: '15%',
            render: (text, record, index) => (
                <Typography.Text>{text.orderNumber}</Typography.Text>
            )
        },
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '15%',
            render: (text, record, index) => (
                <Typography.Text>{text}</Typography.Text>
            )
        },
        {
            title: 'Foto',
            dataIndex: 'product',
            width: '15%',
            render: (text, record, index) => {
                if (text === null || text === undefined) {
                    if (record.imagePath === undefined || record.imagePath === null) {
                        return (<p></p>)
                    } else {
                        return (<Image src={record.imagePath} height={30} alt='Foto' />)
                    }
                } else {
                    if (text.imagePath === null)
                        return (<p></p>)
                    else
                        return (<Image src={text.imagePath} height={30} alt='Foto' />)
                }
            }
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '15%'
        },
        {
            title: "Vardas",
            width: '15%',
            render: (text, record, index) => (
                <Typography.Text>{record.user.name}  {record.packingComplete !== null ? <p>Supakavo</p> : <p></p>}</Typography.Text>
            )
        },
    ]
  return (
      //Get most recents orders/works. Newest 10 works. Naujausi atlikti darbai
      <Col span={24} style={{ marginTop: '20px' }}>
      <Row gutter={16}>
          <Col span={16}>
              <div style={{ marginRight: '40px', textAlign: 'start' }}>
                  <h3>Naujausi atlikti darbai</h3>
              </div>
          </Col>
      </Row>
      <Row gutter={16}>
          <Col span={24}>
              <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                  <Table
                      rowKey="id"
                      columns={recent_works_columns}
                      dataSource={orderDetailsReducer.recent_orders}
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

export default RecentCompletedServices