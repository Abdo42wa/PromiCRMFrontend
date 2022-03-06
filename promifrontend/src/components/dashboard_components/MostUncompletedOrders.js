import React, { useEffect } from 'react'
import { Table, Card, Image, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersUncompleted } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';

//Daugiausia nepagamintų produktų
function MostUncompletedOrders() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        // getting only standart uncompleted orders
        dispatch(getOrdersUncompleted())
    }, [])
    //daugiausia nepagamintu produktu
    const uncompleted_orders = [
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '20%'
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '20%'
        },
        {
            title: 'Nuotrauka',
            dataIndex: 'imagePath',
            width: '20%',
            render: (text, record, index) => (
                <div>
                    {text === null || text === undefined ?
                        <p></p> : <Image src={text} height={30} />}
                </div>
            )
        }
    ]
    return (
        //Daugiausia nepagamintų produktų
        <Col span={24} style={{ marginTop: '20px' }}>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <h3>Daugiausia nepagamintų produktų</h3>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            rowKey="id"
                            columns={uncompleted_orders}
                            dataSource={orderDetailsReducer.uncompleted_orders}
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

export default MostUncompletedOrders