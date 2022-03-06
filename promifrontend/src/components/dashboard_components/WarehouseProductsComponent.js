import React, { useEffect } from 'react'
import { Table, Card, Col, Row, Image } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getWarehouseProducts } from '../../appStore/actions/warehouseActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';

// Gaminių kiekis sandėlyje
function WarehouseProductsComponent() {
    const dispatch = useDispatch()
    const warehouseReducer = useSelector((state) => state.warehouseReducer)
    useEffect(() => {
        dispatch(getWarehouseProducts())
    }, [])
    const completed_warehouse_orders = [
        {
            title: 'Kiekis',
            dataIndex: 'quantityProductWarehouse',
            width: '30%'
        },
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '30%'
        },
        {
            title: 'Nuotrauka',
            dataIndex: 'imagePath',
            width: '30%',
            render: (text, record, index) => (
                <div>
                    {text === null || text === undefined ?
                        <p></p> : <Image src={text} height={30} />}
                </div>
            )
        },
    ]
    return (
        //   Gaminių kiekis sandėlyje
        <Col span={24} style={{ marginTop: '20px' }}>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <h3>Gaminių kiekis sandėlyje</h3>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            rowKey="id"
                            columns={completed_warehouse_orders}
                            dataSource={warehouseReducer.warehouse_products}
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

export default WarehouseProductsComponent