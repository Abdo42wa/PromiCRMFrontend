import React, { useEffect } from 'react'
import { Table, Card, Typography, Col, Row, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUrgentOrders } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
import moment from 'moment'

//Gaminiu tvarkarascio darbai.
function UrgentOrdersComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    const datediff = (first) => {
        var future = moment(first);
        var today = new Date();
        var start = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        return future.diff(start, 'days');
    }
    useEffect(() => {
        dispatch(getUrgentOrders())
    }, [])
    const urgentOrders = [
        {
            title: 'Deadline',
            dataIndex: 'orderFinishDate',
            width: '10%',
            render: (text, record, index) => (
                <p>{moment(text).format('YYYY/MM/DD')}</p>
            )
        },
        {
            title: 'NR',
            dataIndex: 'orderNumber',
            width: '10%'
        },
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '10%'
        },
        // {
        //     title: 'Foto',
        //     dataIndex: 'product',
        //     width: '10%',
        //     render: (text, record, index) => (
        //         <div>
        //             {text.imagePath === null || text.imagePath === undefined ?
        //                 <p></p> : <Image src={text.imagePath} />}
        //         </div>
        //     )
        // },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '10%'
        },
        {
            title: 'Užsakymo tipas',
            dataIndex: 'orderType',
            width: '10%'
        },
        {
            title: 'Platforma',
            dataIndex: 'platforma',
            width: '10%'
        },
        {
            title: 'Vėluojama dienų',
            width: '10%',
            render: (text, record, index) => (
                <Typography.Text>{record.status ? <Tag className='atlikta'>Atlikta</Tag> : datediff(record.orderFinishDate) < 0 ? <Tag className='Neatlikta'>{Math.abs(datediff(record.orderFinishDate))}</Tag> : <Tag className='atlikta'>{Math.abs(datediff(record.orderFinishDate))}</Tag>} </Typography.Text>

            )
        }
    ]
    return (
        //Gaminiu tvarkarascio darbai.
        <Col span={24} style={{ marginTop: '20px' }}>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <h3>Gaminių tvarkaraškis(Užsakymai)</h3>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                        <Table
                            rowKey="id"
                            columns={urgentOrders}
                            dataSource={orderDetailsReducer.urgent_orders}
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

export default UrgentOrdersComponent