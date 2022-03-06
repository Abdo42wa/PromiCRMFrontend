import React, { useEffect } from 'react'
import { Table, Card, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendedForProductionOrders } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
// Rekomenduojama gaminti(Užsakymai)
function RecomendedOrdersComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getRecommendedForProductionOrders())
    }, [])
    const recomended_orders_columns = [
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '10%'
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '10%'
        }
    ]
    return (
        //   Rekomenduojama gaminti(Užsakymai)
        <Col span={24} style={{ marginTop: '20px' }}>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <h3>Rekomenduojama gaminti(Užsakymai)</h3>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            rowKey="id"
                            columns={recomended_orders_columns}
                            dataSource={orderDetailsReducer.production_orders}
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

export default RecomendedOrdersComponent