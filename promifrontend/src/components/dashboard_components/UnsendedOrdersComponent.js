import React, { useEffect } from 'react'
import { Table, Card, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUnsendedOrders } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
import moment from 'moment'
//Neisiustu siuntiniu lentele
function UnsendedOrdersComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getUnsendedOrders())
    }, [])
    const unsended_orders = [
        {
            title: 'Uzsakymo numeris',
            dataIndex: 'orderNumber',
            width: '20%'
        },
        {
            title: 'Data',
            dataIndex: 'orderFinishDate',
            width: '20%',
            render: (text, record, index) => (
                <p>{moment(text).format('YYYY/MM/DD')}</p>
            )
        },
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '20%'
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '20%'
        }
    ]
    return (
        //Neisiustu siuntiniu lentele
        <Col span={24} style={{ marginTop: '20px' }}>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <h3>Neisiustu siuntiniu lentele</h3>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            rowKey="id"
                            columns={unsended_orders}
                            dataSource={orderDetailsReducer.unsended_orders}
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

export default UnsendedOrdersComponent