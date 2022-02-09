import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders, addOrder, updateOrder, updateOrderWithImage, addOrderWarehouse, updateOrderTakeProductsFromWarehouse, updateNonStandartOrder } from '../../appStore/actions/ordersAction'
import { checkWarehouseProduct, createOrUpdateWarehouseData } from '../../appStore/actions/warehouseActions'
import { Table, Space, Card, Typography, Col, Row, Button, Tag, Image, Select, Input, Checkbox, Tabs } from 'antd'
import { buttonStyle } from '../../styles/customStyles.js';
import AddOrderComponent from './AddOrderComponent';
import UpdateOrderComponent from './UpdateOrderComponent';
import { getProducts } from '../../appStore/actions/productsActions'
import { getUsers } from '../../appStore/actions/userListActions'
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import AddOrderMaterialsComponent from './addMaterials/AddOrderMaterialsComponent';
import '../../styles/orders.css'

const { Option } = Select;
const selectOptionStyle = {
    width: '90px'
}
function StandartOrdersComponent(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [addOrderVisiblity, setAddOrderVisibility] = useState(false)
    const [updateOrderModal, setUpdateOrderModal] = useState({
        visibility: false,
        record: null
    })
    const usersReducer = useSelector((state) => state.usersReducer)
    const productsReducer = useSelector((state) => state.productsReducer)
    const orderReducer = useSelector((state) => state.orderReducer)
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const warehouseReducer = useSelector((state) => state.warehouseReducer)
    const productMaterialsReducer = useSelector((state) => state.productMaterialsReducer)


    const showAddOrderModal = () => {
        setAddOrderVisibility(true)
    }
    const unshowAddOrderModal = () => {
        setAddOrderVisibility(false)
    }
    const saveAddOrder = (postObj) => {
        dispatch(addOrder(postObj))
        unshowAddOrderModal();
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
    const updateOrderSave = (postObj, reducerObj) => {
        dispatch(updateOrder(postObj, reducerObj))
        unshowUpdateOrderModal()
    }

    const updateOrderWithImg = (postObj, id) => {
        dispatch(updateOrderWithImage(postObj, id))
        unshowUpdateOrderModal()
    }

    const getProductsFromWarehouse = (value, inputName, record) => {
        const obj = {
            ...record,
            [inputName]: value,
            "warehouseProductsDate": moment().format('YYYY/MM/DD,h:mm:ss a'),
            "status": true,
            "completionDate": moment().format('YYYY/MM/DD,h:mm:ss a')
        }
        const { id, ...postObj } = obj;
        const reducerObj = obj;
        dispatch(updateOrderTakeProductsFromWarehouse(postObj, reducerObj))
        // update order and take from warehouse that products
    }

    useEffect(() => {
        if (usersReducer.currentUser !== null) {
            dispatch(getUsers())
            dispatch(getOrders())
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
                    {/* {record.orderType === "Ne-standartinis" ?
                        <Button onClick={(e) => showAddMaterialsModal(record)}>Pridėti medžiagas</Button> : null} */}
                </div>

            )
        },
        // {
        //     title: 'Pridėti produktus',
        //     width: '5%',
        //     render: (text, record, index) => (
        //         <Button onClick={(e) => this.addProductsForOrder(record.id)}>Pridėti</Button>
        //     )
        // },
        {
            title: 'Pasiėmėte iš sandėlio?',
            dataIndex: 'warehouseProductsTaken',
            width: '10%',
            render: (text, record, index) => {
                if (record.status === false && record.warehouseProductsNumber !== 0) {
                    //onChange={(e) => this.getProductsFromWarehouse(e.target.checked, "warehouseProductsTaken", record)}
                    return (<div style={{ display: 'flex' }}>
                        <Input type={'checkbox'} style={{ width: '35px', height: '35px' }} disabled={text === true ? true : false} value={text} />
                        <Typography.Text style={{ paddingLeft: '15px', fontSize: '20px' }}> ({record.warehouseProductsNumber})</Typography.Text>
                    </div>)
                } else if (record.status === true && record.warehouseProductsNumber !== 0) {
                    return (<div style={{ display: 'flex' }}>
                        <Input type={'checkbox'} style={{ width: '35px', height: '35px' }} disabled={text === true ? true : false} value={text} />
                        <Typography.Text style={{ paddingLeft: '15px', fontSize: '20px' }}> ({record.warehouseProductsNumber})</Typography.Text>
                    </div>)
                }
            }
        },
        {
            title: 'Atsakingas asmuo',
            dataIndex: 'user',
            width: '10%',
            render: (text, record, index) => (
                <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
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
                <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
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
                <Typography.Text>{text === null ? '' : text.type}</Typography.Text>
            )
        },
        {
            title: 'Klientas',
            dataIndex: 'customer',
            width: '10%',
            render: (text, record, index) => (
                <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
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
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null  && text.orderServices !== undefined && text.orderServices !== null) {
                    let lService = text.orderServices.find(x => x.productId === text.id && x.serviceId === 1)
                    if (lService !== null && lService !== undefined)
                        return (
                            <div style={{ display: 'flex' }}>
                                <Select
                                    disabled={record.warehouseProductsNumber !== 0 ? true : record.milingTime === 0 ? true : false}
                                    style={{ ...selectOptionStyle }}
                                    optionFilterProp="children"
                                // onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                                // defaultValue={text}
                                >
                                    {usersListReducer.users.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                    })}
                                </Select>
                                {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                                <div>
                                    <div className='order-times' ><p>{lService.timeConsumption} min</p></div>
                                </div>
                            </div>
                        )
                    else
                        return (<div>
                            <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                        </div>)
                }
            }
        },
        {
            title: 'Frezavimas',
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null  && text.orderServices !== undefined && text.orderServices !== null) {
                    let lService = text.orderServices.find(x => x.productId === text.id && x.serviceId === 2)
                    if (lService !== null && lService !== undefined)
                        return (
                            <div style={{ display: 'flex' }}>
                                <Select
                                    disabled={record.warehouseProductsNumber !== 0 ? true : record.milingTime === 0 ? true : false}
                                    style={{ ...selectOptionStyle }}
                                    optionFilterProp="children"
                                // onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                                // defaultValue={text}
                                >
                                    {usersListReducer.users.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                    })}
                                </Select>
                                {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                                <div>
                                    <div className='order-times' ><p>{lService.timeConsumption} min</p></div>
                                </div>
                            </div>
                        )
                    else
                        return (<div>
                            <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                        </div>)
                }
            }
        },
        {
            title: 'Dažymas',
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null  && text.orderServices !== undefined && text.orderServices !== null) {
                    let lService = text.orderServices.find(x => x.productId === text.id && x.serviceId === 3)
                    if (lService !== null && lService !== undefined)
                        return (
                            <div style={{ display: 'flex' }}>
                                <Select
                                    disabled={record.warehouseProductsNumber !== 0 ? true : record.milingTime === 0 ? true : false}
                                    style={{ ...selectOptionStyle }}
                                    optionFilterProp="children"
                                // onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                                // defaultValue={text}
                                >
                                    {usersListReducer.users.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                    })}
                                </Select>
                                {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                                <div>
                                    <div className='order-times' ><p>{lService.timeConsumption} min</p></div>
                                </div>
                            </div>
                        )
                    else
                        return (<div>
                            <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                        </div>)
                }
            }
        },
        {
            title: 'Šlifavimas',
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null  && text.orderServices !== undefined && text.orderServices !== null) {
                    let lService = text.orderServices.find(x => x.productId === text.id && x.serviceId === 4)
                    if (lService !== null && lService !== undefined)
                        return (
                            <div style={{ display: 'flex' }}>
                                <Select
                                    disabled={record.warehouseProductsNumber !== 0 ? true : record.milingTime === 0 ? true : false}
                                    style={{ ...selectOptionStyle }}
                                    optionFilterProp="children"
                                // onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                                // defaultValue={text}
                                >
                                    {usersListReducer.users.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                    })}
                                </Select>
                                {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                                <div>
                                    <div className='order-times' ><p>{lService.timeConsumption} min</p></div>
                                </div>
                            </div>
                        )
                    else
                        return (<div>
                            <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                        </div>)
                }
            }
        },
        {
            title: 'Suklijavimas',
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null  && text.orderServices !== undefined && text.orderServices !== null) {
                    let lService = text.orderServices.find(x => x.productId === text.id && x.serviceId === 5)
                    if (lService !== null && lService !== undefined)
                        return (
                            <div style={{ display: 'flex' }}>
                                <Select
                                    disabled={record.warehouseProductsNumber !== 0 ? true : record.milingTime === 0 ? true : false}
                                    style={{ ...selectOptionStyle }}
                                    optionFilterProp="children"
                                // onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                                // defaultValue={text}
                                >
                                    {usersListReducer.users.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                    })}
                                </Select>
                                {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                                <div>
                                    <div className='order-times' ><p>{lService.timeConsumption} min</p></div>
                                </div>
                            </div>
                        )
                    else
                        return (<div>
                            <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                        </div>)
                }
            }
        },
        {
            title: 'Surinkimas',
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null  && text.orderServices !== undefined && text.orderServices !== null) {
                    let lService = text.orderServices.find(x => x.productId === text.id && x.serviceId === 6)
                    if (lService !== null && lService !== undefined)
                        return (
                            <div style={{ display: 'flex' }}>
                                <Select
                                    disabled={record.warehouseProductsNumber !== 0 ? true : record.milingTime === 0 ? true : false}
                                    style={{ ...selectOptionStyle }}
                                    optionFilterProp="children"
                                // onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                                // defaultValue={text}
                                >
                                    {usersListReducer.users.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                    })}
                                </Select>
                                {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                                <div>
                                    <div className='order-times' ><p>{lService.timeConsumption} min</p></div>
                                </div>
                            </div>
                        )
                    else
                        return (<div>
                            <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                        </div>)
                }
            }
        },
        {
            title: 'Pakavimas',
            dataIndex: 'product',
            width: '10%',
            render: (text, record, index) => {
                if (text !== undefined && text !== null  && text.orderServices !== undefined && text.orderServices !== null) {
                    let lService = text.orderServices.find(x => x.productId === text.id && x.serviceId === 7)
                    if (lService !== null && lService !== undefined)
                        return (
                            <div style={{ display: 'flex' }}>
                                <Select
                                    disabled={record.warehouseProductsNumber !== 0 ? true : record.milingTime === 0 ? true : false}
                                    style={{ ...selectOptionStyle }}
                                    optionFilterProp="children"
                                // onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                                // defaultValue={text}
                                >
                                    {usersListReducer.users.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                                    })}
                                </Select>
                                {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                                <div>
                                    <div className='order-times' ><p>{lService.timeConsumption} min</p></div>
                                </div>
                            </div>
                        )
                    else
                        return (<div>
                            <div className='order-times'><Typography.Text>0 min</Typography.Text></div>
                        </div>)
                }
            }
        },
        {
            title: 'Šalis',
            dataIndex: 'country',
            width: '10%',
            render: (text, record, index) => (
                <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
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
            width: '10%',
            render: (text, record, index) => (
                <Typography.Text>{text}</Typography.Text>
            )
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
                        <Typography.Title>Užsakymai</Typography.Title>
                        <Typography.Text>Pridėkite ir atnaujinkite užsakymus</Typography.Text>
                    </div>
                </Col>
            </Row>
            <div style={{ padding: '15px' }}></div>
            <Row gutter={16}>
                <Col span={24}>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={orderReducer.orders}
                        pagination={{ pageSize: 15 }}
                        bordered
                        scroll={{ x: 'calc(1200px + 50%)' }}
                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={(e) => showAddOrderModal()}>Pridėti užsakymą</Button></Space>)}
                    />
                </Col>
            </Row>
        </div>
        {addOrderVisiblity !== false ?
            <AddOrderComponent visible={addOrderVisiblity} save={saveAddOrder}
                onClose={unshowAddOrderModal}
            />
            : null}
        {updateOrderModal.visibility !== false ?
            <UpdateOrderComponent visible={updateOrderModal.visibility}
                record={updateOrderModal.record}
                save={updateOrderSave} onClose={unshowUpdateOrderModal}
                saveWithImg={updateOrderWithImg} /> :
            null}

        {/* {this.state.addOrderMaterials.visibility !== false ?
            <AddOrderMaterialsComponent visible={this.state.addOrderMaterials.visibility}
                onClose={this.unshowAddMaterialsModal} record={this.state.addOrderMaterials.record}
                save={this.saveAddOrderMaterials} /> : null} */}

    </>;
}

export default StandartOrdersComponent;
