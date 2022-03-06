import React, { useEffect } from 'react'
import { Table, Card, Typography, Col, Row, Tag, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUncompletedOrdersTimes } from '../../appStore/actions/ordersDetailsActions'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';

//Get work times. Suplanuotas darbo laikas
function PlannedWorkTimeComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getUncompletedOrdersTimes())
    }, [])
    const workTimesColumns = [
        {
            title: 'Lazeriavimo laikas',
            dataIndex: 'laserTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Frezavimo laikas',
            dataIndex: 'milingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Dažymo laikas',
            dataIndex: 'paintingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Šlifavimo laikas',
            dataIndex: 'grindingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Suklijavimo laikas',
            dataIndex: 'bondingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Surinkimo laikas',
            dataIndex: 'collectionTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Pakavimo laikas',
            dataIndex: 'packingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        //DONE TIMES
        {
            title: 'Lazeriavimo laikas(padarytas)',
            dataIndex: 'doneLaserTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Frezavimo laikas(padarytas)',
            dataIndex: 'doneMilingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Dažymo laikas(padarytas)',
            dataIndex: 'donePaintingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Šlifavimo laikas(padarytas)',
            dataIndex: 'doneGrindingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Suklijavimo laikas(padarytas)',
            dataIndex: 'doneBondingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Surinkimo laikas(padarytas)',
            dataIndex: 'doneCollectionTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },
        {
            title: 'Pakavimo laikas(padarytas)',
            dataIndex: 'donePackingTime',
            width: '10%',
            render: (text, record, index) => {
                if (Math.floor(text / 60) === 0) {
                    return (
                        <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                } else {
                    return (
                        <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                    )
                }
            }
        },

    ]
    return (
        //Get work times. Suplanuotas darbo laikas
        <Col lg={24} style={{ marginTop: '20px' }}>
                        {/* <Row gutter={16}>
                                <Col span={16}> */}
                        <div style={{ marginRight: '40px', textAlign: 'start' }}>
                            <h3>Suplanuotas darbo laikas</h3>
                        </div>
                        {/* </Col>
                            </Row> */}
                        {/* <Row gutter={16}> */}
                        {/* <Col span={24}> */}
                        <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                                rowKey="id"
                                columns={workTimesColumns}
                                dataSource={orderDetailsReducer.uncompleted_orders_times}
                                pagination={{ pageSize: 15 }}
                                bWorked
                                scroll={{ x: 'calc(200px + 50%)' }}

                            />

                        </Card>
                    </Col>
    )
}

export default PlannedWorkTimeComponent