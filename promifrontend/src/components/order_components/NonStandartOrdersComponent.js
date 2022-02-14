import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNonStandartOrders, addNonStandartOrderService, updateNonStandartOrderService, updateNonStandartOrderComplete } from '../../appStore/actions/ordersAction'
import { updateManyMaterials } from '../../appStore/actions/productMaterials'
import { Table, Space, Typography, Col, Row, Button, Tag, Image, Select } from 'antd'
import { buttonStyle } from '../../styles/customStyles.js';
import AddOrderComponent from './AddOrderComponent';
import UpdateOrderComponent from './UpdateOrderComponent';
import { getUsers } from '../../appStore/actions/userListActions'
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import AddOrderMaterialsComponent from './addMaterials/AddOrderMaterialsComponent';
import '../../styles/orders.css'

const { Option } = Select;
const selectOptionStyle = {
    width: '90px'
}
function NonStandartOrdersComponent(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [addOrderVisibility, setAddOrderVisibility] = useState(false)
    const [updateOrderModal, setUpdateOrderModal] = useState({
        visibility: false,
        record: null
    })
    const [addOrderMaterialsModal, setAddOrderMaterialsModal] = useState({
        visibility: false,
        record: null
    })
    const usersReducer = useSelector((state) => state.usersReducer)
    const productsReducer = useSelector((state) => state.productsReducer)
    const orderReducer = useSelector((state) => state.orderReducer)
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const warehouseReducer = useSelector((state) => state.warehouseReducer)
    const productMaterialsReducer = useSelector((state) => state.productMaterialsReducer)

    //For AddMaterialsComponent
    const showAddMaterialsModal = (record) => {
        setAddOrderMaterialsModal(prevState => ({
            ...prevState,
            visibility: true,
            record: record
        }))
    }
    const unshowAddMaterialsModal = () => {
        setAddOrderMaterialsModal(prevState => ({
            ...prevState,
            visibility: false,
            record: null
        }))
    }
    const saveAddOrderMaterials = (postObj) => {
        dispatch(updateManyMaterials(postObj))
        unshowAddMaterialsModal()
    }

    //For AddOrderComponent
    const showAddOrderModal = () => {
        setAddOrderVisibility(true)
    }
    const unshowAddOrderModal = () => {
        setAddOrderVisibility(false)
    }
    const showUpdateOrderModal = (record) => {
        setUpdateOrderModal(prevState => ({
            ...prevState,
            visibility: true,
            record: record
        }))
    }
    const unshowUpdateOrderModal = () => {
        setUpdateOrderModal(prevState => ({
            ...prevState,
            visibility: false,
            record: null
        }))
    }

    const onPackingComplete = (userId, orderServiceId, orderId, order) => {
        const u_services = [
            {
                "userId": userId,
                "orderServiceId": orderServiceId,
                "orderId": orderId,
                "completionDate": moment().format('YYYY/MM/DD,h:mm:ss a')
            }
        ]
        // const u_services = [...userServices,{...u_service}]
        const { id, ...obj } = order;
        const postObj = {
            ...obj,
            "status": true,
            "completionDate": moment().format('YYYY/MM/DD,h:mm:ss a'),
            "userServices": u_services
        }
        //but in reducer it is better to pass all userServices with new Packing service too
        const reducerObj = {
            ...order,
            "status": true,
            "completionDate": moment().format('YYYY/MM/DD,h:mm:ss a')
        };
        // console.log(JSON.stringify(postObj))
        // console.log(JSON.stringify(reducerObj))
        dispatch(updateNonStandartOrderComplete(postObj, reducerObj))
        console.log("postobj" + JSON.stringify(postObj))
        console.log("reducerObj" + JSON.stringify(reducerObj))

    }

    const onDataChange = (userService, userId, orderServiceId, orderId) => {
        if (userService === undefined || userService === null) {
            const postObj = {
                "userId": userId,
                "orderServiceId": orderServiceId,
                "orderId": orderId,
                "completionDate": moment().format('YYYY/MM/DD,h:mm:ss a')
            }
            dispatch(addNonStandartOrderService(postObj))
        } else {
            const { id, ...obj } = userService;
            const postObj = {
                ...obj,
                "userId": userId,
                "completionDate": moment().format('YYYY/MM/DD,h:mm:ss a'),
            }
            const reducerObj = {
                ...postObj,
                "id": userService.id
            }
            dispatch(updateNonStandartOrderService(postObj, reducerObj))
        }

    }
    useEffect(() => {
        if (usersReducer.currentUser !== null) {
            dispatch(getUsers())
            dispatch(getNonStandartOrders())
        } else {
            history.push('/login')
        }
    }, [usersReducer.currentUser])
    const columns = [
        {
            title: 'Atnaujinti',
            width: '10%',
            render: (text, record, index) => (
                <div style={{ display: 'flex' }}>
                    <Button onClick={(e) => showUpdateOrderModal(record)}>Atnaujinti</Button>
                    {record.orderType === "Ne-standartinis" ?
                        <Button
                            disabled={record.status === true? true:false}
                            onClick={(e) => showAddMaterialsModal(record)}>
                            Pridėti medžiagas
                        </Button> : null}
                </div>

            )
        },
        {
            title: 'Atsakingas asmuo',
            dataIndex: 'user',
            width: '10%',
            render: (text, record, index) => (
                <p>{text === null ? '' : text.name}</p>
            )
        },
        {
            title: 'Užsakymo tipas',
            dataIndex: 'orderType',
            width: '10%'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render: (text, record, index) => (
                //<Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                <p>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</p>
            )
        },
        {
            title: 'Foto',
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text === null || text === undefined) {
                    if (record.imagePath === undefined || record.imagePath === null) {
                        return (<p></p>)
                    } else {
                        return (<Image src={record.imagePath} alt='Foto' />)
                    }
                } else {
                    if (text.imagePath === null)
                        return (<p></p>)
                    else
                        return (<Image src={text.imagePath} alt='Foto' />)
                }

            }
        },
        {
            title: 'Užsakymo numeris',
            dataIndex: 'orderNumber',
            width: '10%'
        },
        {
            title: 'Data',
            dataIndex: 'date',
            width: '10%',
            render: (text, record, index) => (
                <p>{moment(text).format('YYYY/MM/DD')}</p>
            )
        },
        {
            title: 'Platforma',
            dataIndex: 'platforma',
            width: '10%'
        },
        {
            title: 'Daugiau informacijos',
            dataIndex: 'moreInfo',
            width: '10%'
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '10%'
        },
        {
            title: 'Prekės kodas',
            dataIndex: 'productCode',
            width: '10%'
        },
        {
            title: 'Siuntos tipas',
            dataIndex: 'shipment',
            width: '10%',
            render: (text, record, index) => (
                <p>{text === null ? '' : text.type}</p>
            )
        },
        {
            title: 'Klientas',
            dataIndex: 'customer',
            width: '10%',
            render: (text, record, index) => (
                <p>{text === null ? '' : text.name}</p>
            )
        }

        , {
            title: 'Gamybos laikas',
            dataIndex: 'productionTime',
            width: '10%'
        },
        {
            title: 'Adresas',
            dataIndex: 'address',
            width: '10%'
        },
        {
            title: 'Lazeriavimas',
            dataIndex: 'orderServices',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null) {
                    let lService = text.find(x => x.serviceId === 1)
                    // let userService = lService !== undefined ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    let userService = lService !== undefined && lService !== null ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    // if (lService !== null && lService !== undefined)
                    return (
                        <div>
                            {lService !== null && lService !== undefined ?
                                <div style={{ display: 'flex' }}>
                                    <Select
                                        disabled={lService.timeConsumption === 0 ? true : false}
                                        style={{ ...selectOptionStyle }}
                                        optionFilterProp="children"
                                        onChange={(e) => onDataChange(userService, e, lService.id, record.id)}
                                        defaultValue={userService !== null && userService !== undefined ? userService.userId : null}
                                        value={userService !== null && userService !== undefined ? userService.userId : null}
                                    >
                                        {usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                        })}
                                    </Select>
                                    <div>
                                        <div className='order-times' ><p>{lService !== null && lService !== undefined ? lService.timeConsumption : ""} min</p></div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                                </div>
                            }

                        </div>
                    )
                }
            }
        },
        {
            title: 'Frezavimas',
            dataIndex: 'orderServices',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null) {
                    let lService = text.find(x => x.serviceId === 2)
                    let userService = lService !== undefined && lService !== null ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    // if (lService !== null && lService !== undefined)
                    return (
                        <div>
                            {lService !== null && lService !== undefined ?
                                <div style={{ display: 'flex' }}>
                                    <Select
                                        disabled={lService.timeConsumption === 0 ? true : false}
                                        style={{ ...selectOptionStyle }}
                                        optionFilterProp="children"
                                        onChange={(e) => onDataChange(userService, e, lService.id, record.id)}
                                        defaultValue={userService !== null && userService !== undefined ? userService.userId : null}
                                        value={userService !== null && userService !== undefined ? userService.userId : null}
                                    >
                                        {usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                        })}
                                    </Select>
                                    <div>
                                        <div className='order-times' ><p>{lService !== null && lService !== undefined ? lService.timeConsumption : ""} min</p></div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                                </div>
                            }

                        </div>
                    )
                }
            }
        },
        {
            title: 'Dažymas',
            dataIndex: 'orderServices',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null) {
                    let lService = text.find(x => x.serviceId === 3)
                    let userService = lService !== undefined && lService !== null ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    // if (lService !== null && lService !== undefined)
                    return (
                        <div>
                            {lService !== null && lService !== undefined ?
                                <div style={{ display: 'flex' }}>
                                    <Select
                                        disabled={lService.timeConsumption === 0 ? true : false}
                                        style={{ ...selectOptionStyle }}
                                        optionFilterProp="children"
                                        onChange={(e) => onDataChange(userService, e, lService.id, record.id)}
                                        defaultValue={userService !== null && userService !== undefined ? userService.userId : null}
                                        value={userService !== null && userService !== undefined ? userService.userId : null}
                                    >
                                        {usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                        })}
                                    </Select>
                                    <div>
                                        <div className='order-times' ><p>{lService !== null && lService !== undefined ? lService.timeConsumption : ""} min</p></div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                                </div>
                            }

                        </div>
                    )
                }
            }
        },
        {
            title: 'Šlifavimas',
            dataIndex: 'orderServices',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null) {
                    let lService = text.find(x => x.serviceId === 4)
                    let userService = lService !== undefined && lService !== null ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    // if (lService !== null && lService !== undefined)
                    return (
                        <div>
                            {lService !== null && lService !== undefined ?
                                <div style={{ display: 'flex' }}>
                                    <Select
                                        disabled={lService.timeConsumption === 0 ? true : false}
                                        style={{ ...selectOptionStyle }}
                                        optionFilterProp="children"
                                        onChange={(e) => onDataChange(userService, e, lService.id, record.id)}
                                        defaultValue={userService !== null && userService !== undefined ? userService.userId : null}
                                        value={userService !== null && userService !== undefined ? userService.userId : null}
                                    >
                                        {usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                        })}
                                    </Select>
                                    <div>
                                        <div className='order-times' ><p>{lService !== null && lService !== undefined ? lService.timeConsumption : ""} min</p></div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                                </div>
                            }

                        </div>
                    )
                }
            }
        },
        {
            title: 'Suklijavimas',
            dataIndex: 'orderServices',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null) {
                    let lService = text.find(x => x.serviceId === 5)
                    let userService = lService !== undefined && lService !== null ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    // if (lService !== null && lService !== undefined)
                    return (
                        <div>
                            {lService !== null && lService !== undefined ?
                                <div style={{ display: 'flex' }}>
                                    <Select
                                        disabled={lService.timeConsumption === 0 ? true : false}
                                        style={{ ...selectOptionStyle }}
                                        optionFilterProp="children"
                                        onChange={(e) => onDataChange(userService, e, lService.id, record.id)}
                                        defaultValue={userService !== null && userService !== undefined ? userService.userId : null}
                                        value={userService !== null && userService !== undefined ? userService.userId : null}
                                    >
                                        {usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                        })}
                                    </Select>
                                    <div>
                                        <div className='order-times' ><p>{lService !== null && lService !== undefined ? lService.timeConsumption : ""} min</p></div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                                </div>
                            }

                        </div>
                    )
                }
            }
        },
        {
            title: 'Surinkimas',
            dataIndex: 'orderServices',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null) {
                    let lService = text.find(x => x.serviceId === 6)
                    let userService = lService !== undefined && lService !== null ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    // if (lService !== null && lService !== undefined)
                    return (
                        <div>
                            {lService !== null && lService !== undefined ?
                                <div style={{ display: 'flex' }}>
                                    <Select
                                        disabled={lService.timeConsumption === 0 ? true : false}
                                        style={{ ...selectOptionStyle }}
                                        optionFilterProp="children"
                                        onChange={(e) => onDataChange(userService, e, lService.id, record.id)}
                                        defaultValue={userService !== null && userService !== undefined ? userService.userId : null}
                                        value={userService !== null && userService !== undefined ? userService.userId : null}
                                    >
                                        {usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                        })}
                                    </Select>
                                    <div>
                                        <div className='order-times' ><p>{lService !== null && lService !== undefined ? lService.timeConsumption : ""} min</p></div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                                </div>
                            }

                        </div>
                    )
                }
            }
        },
        {
            title: 'Pakavimas',
            dataIndex: 'orderServices',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null) {
                    let lService = text.find(x => x.serviceId === 7)
                    let userService = lService !== undefined && lService !== null ? record.userServices.find(x => x.orderServiceId === lService.id) : null
                    // if (lService !== null && lService !== undefined)
                    return (
                        <div>
                            {lService !== null && lService !== undefined ?
                                <div style={{ display: 'flex' }}>
                                    <Select
                                        disabled={userService !== undefined && userService !== null && userService.userId !== null ? true : false}
                                        style={{ ...selectOptionStyle }}
                                        optionFilterProp="children"
                                        // userId, orderServiceId, orderId, order,userServices
                                        onChange={(e) => onPackingComplete(e, lService.id, record.id, record, record.userServices)}
                                        defaultValue={userService !== null && userService !== undefined ? userService.userId : null}
                                        value={userService !== null && userService !== undefined ? userService.userId : null}
                                    >
                                        {usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                        })}
                                    </Select>
                                    <div>
                                        <div className='order-times' ><p>{lService !== null && lService !== undefined ? lService.timeConsumption : ""} min</p></div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                                </div>
                            }

                        </div>
                    )
                }
            }
        },
        {
            title: 'Šalis',
            dataIndex: 'country',
            width: '10%',
            render: (text, record, index) => (
                <p>{text === null ? '' : text.name}</p>
            )
        },
        {
            title: 'Komentaras',
            dataIndex: 'comment',
            width: '10%'
        },
        {
            title: 'Kaina',
            dataIndex: 'price',
            width: '10%'
        },
        {
            title: 'Valiuta',
            dataIndex: 'currencyName',
            width: '10%'
        },
        {
            title: 'VAT',
            dataIndex: 'vat',
            width: '10%'
        },
        {
            title: 'Užsakymo pabaigos data',
            dataIndex: 'orderFinishDate',
            width: '10%',
            render: (text, record, index) => (
                <p>{moment(text).format('YYYY/MM/DD')}</p>
            )
        },
    ]
    return <>
        <div>
            <Row gutter={16}>
                <Col span={16}>
                    <div style={{ marginRight: '40px', textAlign: 'start' }}>
                        <Typography.Title>Ne-standartiniai Užsakymai</Typography.Title>
                        <Typography.Text>Pridėkite ir atnaujinkite ne-standartinius užsakymus</Typography.Text>
                    </div>
                </Col>
            </Row>
            <div style={{ padding: '15px' }}></div>
            <Row gutter={16}>
                <Col span={24}>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={orderReducer.non_standart_orders}
                        pagination={{ pageSize: 15 }}
                        bordered
                        scroll={{ x: 'calc(1200px + 50%)' }}
                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={(e) => showAddOrderModal()}>Pridėti užsakymą</Button></Space>)}
                    />
                </Col>
            </Row>
        </div>
        {addOrderVisibility !== false ?
            <AddOrderComponent visible={addOrderVisibility}
                onClose={unshowAddOrderModal}
            />
            : null}
        {updateOrderModal.visibility !== false ?
            <UpdateOrderComponent visible={updateOrderModal.visibility}
                record={updateOrderModal.record}
                onClose={unshowUpdateOrderModal} /> :
            null}

        {addOrderMaterialsModal.visibility !== false ?
            <AddOrderMaterialsComponent visible={addOrderMaterialsModal.visibility}
                onClose={unshowAddMaterialsModal} record={addOrderMaterialsModal.record}
                save={saveAddOrderMaterials} /> : null}

    </>;
}

export default NonStandartOrdersComponent;
