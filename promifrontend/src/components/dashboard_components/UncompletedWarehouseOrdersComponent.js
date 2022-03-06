import React, { useEffect } from 'react'
import { Table, Card, Typography, Col, Row, Image } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUncompletedWarehouseOrders } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
import moment from 'moment'
//Gaminimo i sandeli lentele
function UncompletedWarehouseOrdersComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getUncompletedWarehouseOrders())
    }, [])
    const uncompleted_warehouse_orders = [
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '20%'
        },
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '20%'
        },
        {
            title: 'Foto',
            dataIndex: 'imagePath',
            width: '20%',
            render: (text, record, index) => (
                <div>
                    {text === null || text === undefined ?
                        <p></p> : <Image src={text} height={30} />}
                </div>
            )
        },
        // {
        //     title: 'Deadline(didžiausia)',
        //     dataIndex: 'orderFinishDate',
        //     width: '20%',
        //     render: (text, record, index) => (
        //         <Typography.Text>{moment(text).format("YYYY/MM/DD")}</Typography.Text>
        //     )
        // },
        {
            title: 'Data(seniausia)',
            dataIndex: 'minOrderFinishDate',
            width: '20%',
            render: (text, record, index) => (
                <Typography.Text>{moment(text).format("YYYY/MM/DD")}</Typography.Text>
            )
        }
    ]
    return (
        //Gaminimo i sandeli lentele
        <Col span={24} style={{ marginTop: '20px' }}>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <h3>Gaminimo į sandėlį lentelė</h3>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            rowKey="id"
                            columns={uncompleted_warehouse_orders}
                            dataSource={orderDetailsReducer.uncompleted_warehouse_orders}
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

export default UncompletedWarehouseOrdersComponent