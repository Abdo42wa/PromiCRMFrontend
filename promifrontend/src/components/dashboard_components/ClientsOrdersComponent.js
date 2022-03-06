import React, { useEffect } from 'react'
import { Table, Card, Typography, Col, Row, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getClientsOrders } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';

//Klientu darbu lentele. Not-standart works.
function ClientsOrdersComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getClientsOrders())
    }, [])
    const clients_orders_columns = [
        {
            title: 'Data',
            dataIndex: 'date',
            width: '25%'
        },
        {
            title: 'NR',
            dataIndex: 'orderNumber',
            width: '25%',
        },
        {
            title: 'Klientas',
            dataIndex: 'customer',
            width: '25%',
            render: (text, record, index) => {
                if (text === null)
                    return (<p></p>)
                else
                    return (<Typography.Text>{text.name}  {text.companyName}</Typography.Text>)

            }
        },
        {
            title: 'Būklė',
            dataIndex: 'status',
            width: '25%',
            render: (text, record, index) => (
                <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
            )
        },
    ]
    return (
        //Klientu darbu lentele. Not-standart works.
        <Col span={24} style={{ marginTop: '20px' }}>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <h3>Klientų darbų lentelė</h3>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            rowKey="id"
                            columns={clients_orders_columns}
                            dataSource={orderDetailsReducer.clients_orders}
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

export default ClientsOrdersComponent