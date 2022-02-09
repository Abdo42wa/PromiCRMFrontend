import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomers } from '../../appStore/actions/customersActions'
import { getCountries } from '../../appStore/actions/countriesAction'
import { getUsers } from '../../appStore/actions/userListActions'
import { getSalesChannels } from '../../appStore/actions/salesChannelsActions'
import { getWarehouseProduct } from '../../appStore/actions/warehouseActions';
import { updateOrderTakeProductsFromWarehouse, updateNonStandart, updateOrder } from '../../appStore/actions/ordersAction';
import { getShipments } from '../../appStore/actions/shipmentsActions';
import { Modal, Button, Form, Space, Select, Input, InputNumber, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { currencies } from '../data/currenciesData';

const { Option } = Select;
const textStyle = {
    fontSize: '18px',
    color: '#8C8C8C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '22px',
    marginRight: '40px',
    marginBottom: '4px',
    marginTop: '10px'
}


function UpdateOrderComponent(props) {
    const dispatch = useDispatch();
    const [order, setOrder] = useState({});
    const [sandelis, setSandelis] = useState(false);
    const [notStandart, setNotStandart] = useState(true);
    const [orderServices, setOrderServices] = useState([])

    const customersReducer = useSelector((state) => state.customersReducer);
    const countryReducer = useSelector((state) => state.countryReducer);
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const salesChannelsReducer = useSelector((state) => state.salesChannelsReducer)
    const warehouseReducer = useSelector((state) => state.warehouseReducer)
    const shipmentsReducer = useSelector((state) => state.shipmentsReducer)
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        if (inputName === 'orderNumber' ||
            inputName === 'customerId' || inputName === 'currencyId' ||
            inputName === 'countryId' || inputName === 'shipmentTypeId' || inputName === 'productionTime') {
            setOrder(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else {
            setOrder(prevState => ({
                ...prevState,
                [inputName]: value
            }))
        }
        if (inputName === "productCode") {
            dispatch(getWarehouseProduct(value))
        }
    }
    //for non standart orders. to update order and orderServices
    const onServiceDataChange = (id, value, record) => {
        const index = orderServices.findIndex(x => x.id === id)
        if (index === -1) {
            //if there isnt service add it
            const obj = {
                ...record,
                "service": null,
                "timeConsumption": value
            }
            setOrderServices(prevState => [...prevState, { ...obj }])
        } else {
            //update
            setOrderServices(orderServices.map(x => x.id === id ? { ...x, "timeConsumption": value } : x))
        }
        //update Order obj
        setOrder(prevState => ({
            ...prevState,
            orderServices: prevState.orderServices.map(x => x.id === id ? { ...x, "timeConsumption": value } : x)
        }))
    }
    const saveChanges = () => {
        // const clone = JSON.parse(JSON.stringify(order));

        if (order.orderType !== null && order.orderType === "Ne-standartinis") {
            const { id, ...obj } = order;
            const postObj = {
                ...obj,
                "orderServices": orderServices
            }
            const reducerObj = {
                ...order
            }
            dispatch(updateNonStandart(postObj, reducerObj))
            props.onClose()
            console.log(JSON.stringify(postObj))
        }
        else {
            const { id, ...obj } = order;
            const postObj = {
                ...obj,
                "orderServices": []
            }
            const reducerObj = {
                ...order
            }
            dispatch(updateOrder(postObj, reducerObj))
            props.onClose()
            console.log(JSON.stringify(postObj))
         }
    

}

const onTakeFromWarehouseCheck = (value, inputName) => {
    let num = 0;
    if (value === false)
        num = 0;
    else {
        if (order.quantity < warehouseReducer.warehouse_product.quantityProductWarehouse)
            num = order.quantity;
        else
            num = 0;
    }
    // setOrder(prevState => ({
    //     ...prevState,
    //     [inputName]: Number(num)
    // }))

    const obj = {
        ...order,
        "warehouseProductsNumber": Number(num),
        "warehouseProductsTaken": true,
        "warehouseProductsDate": moment().format('YYYY/MM/DD,h:mm:ss a'),
        "status": true,
        "completionDate": moment().format('YYYY/MM/DD,h:mm:ss a'),

    }
    const { id, ...postObj } = obj;
    const reducerObj = obj;

    dispatch(updateOrderTakeProductsFromWarehouse(postObj, reducerObj))
    props.onClose();
}

useEffect(() => {
    dispatch(getUsers());
    dispatch(getCountries())
    dispatch(getCustomers())
    dispatch(getWarehouseProduct(props.record.productCode))
    const obj = {
        ...props.record,
        "date": moment(props.record.date).format('YYYY/MM/DD,h:mm:ss a'),
        "orderFinishDate": moment(props.record.orderFinishDate).format('YYYY/MM/DD')
    }
    setOrder(obj);
    if (props.record.orderType === "Sandelis") {
        setSandelis(true);
        setNotStandart(true)
    } else if (props.record.orderType === "Ne-standartinis") {
        setNotStandart(false)
        setSandelis(false);
    } else {
        setNotStandart(true)
        setSandelis(false);
    }

    // eslint-disable-next-line
}, [dispatch, props.record.id]);
return (
    <>
        <Modal
            onCancel={onCancel}
            saveChanges={saveChanges}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: false }}
            title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti užsakymą</Space>}
            visible={props.visible}
            footer={
                <div>
                    <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                    <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                </div>
            }
        >
            <Form layout="vertical" id="myForm" name="myForm">
                <p style={{ ...textStyle }}>Užsakymo tipas</p>
                <Input disabled style={{ width: '100%' }} placeholder="Paprastas arba nestandartinis" value={order.orderType} onChange={(e) => onDataChange(e.target.value, "orderType")} />
                <p style={{ ...textStyle }}>Užsakymo numeris</p>
                <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={order.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                {/* <p style={{ ...textStyle }}>Data</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.date} onChange={(e) => onDataChange(e.target.value, "date")} /> */}


                <p style={{ marginBottom: '5px' }}>Platforma</p>
                <Select
                    disabled={sandelis}
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite platforma"
                    optionFilterProp="children"
                    value={order.platforma}
                    onChange={(e) => onDataChange(e, "platforma")}
                >
                    {salesChannelsReducer.salesChannels.map((element, index) => {
                        return (<Option key={element.id} value={element.title}>{element.title}</Option>)
                    })}
                </Select>
                <p style={{ ...textStyle }}>Daugiau informacijos</p>
                <Input style={{ width: '100%' }} placeholder="Pridėkite informacijos" value={order.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                <p style={{ ...textStyle }}>Kiekis</p>
                <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={order.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                {/* <p style={{ ...textStyle }}>Nuotrauka</p>
                    <Input required style={{ width: '100%' }} placeholder="Pridėkite nuotrauką" value={order.photo} onChange={(e) => onDataChange(e.target.value, "photo")} /> */}
                <p style={{ ...textStyle }}>Prekės kodas</p>
                <Input disabled={!notStandart} style={{ width: '100%', textTransform: 'uppercase' }} placeholder="Įrašykite kodą" value={order.productCode} onChange={(e) => onDataChange(e.target.value.toUpperCase(), "productCode")} />

                {order.orderType === "Standartinis" && order.productCode !== "" ?
                    <div>
                        <p style={{ ...textStyle }}>Panaudosime sandėlio produktus?</p>
                        <Input disabled={
                            order.quantity < warehouseReducer.warehouse_product.quantityProductWarehouse &&
                                order.warehouseProductsTaken === false ? false : true} style={{ width: '35px', height: '35px' }} type={'checkbox'} value={order.warehouseProductsNumber === 0 ? false : true} onChange={(e) => onTakeFromWarehouseCheck(e.target.checked, "warehouseProductsNumber")} />
                    </div>
                    : null
                }
                {/* {order.orderType === "Standartinis" && order.productCode !== '' && warehouseReducer.warehouse_product.quantityProductWarehouse !== undefined &&
                    warehouseReducer.warehouse_product.quantityProductWarehouse !== 0 && order.status === false?
                    <p>Sandėlyje yra: <i style={{fontSize: '20px', color: 'green', fontWeight: 'bold'}}>{warehouseReducer.warehouse_product.quantityProductWarehouse}</i></p>
                    :<p>Sandėlyje neturime</p>} */}
                {order.orderType === "Standartinis" && order.status == false &&
                    warehouseReducer.warehouse_product.quantityProductWarehouse !== undefined ?
                    <div>
                        {warehouseReducer.warehouse_product.quantityProductWarehouse < order.quantity ?
                            <p>Sandėlyje <i style={{ fontSize: '20px', color: 'orange', fontWeight: 'bold' }}>turime nepakankamai, {warehouseReducer.warehouse_product.quantityProductWarehouse}</i></p>
                            : <p>Sandėlyje yra:<i style={{ fontSize: '20px', color: 'green', fontWeight: 'bold' }}> {warehouseReducer.warehouse_product.quantityProductWarehouse}</i></p>}
                    </div>
                    : order.orderType === "Standartinis" && order.status == false &&
                        warehouseReducer.warehouse_product.quantityProductWarehouse === undefined ?
                        <p>Sandėlyje yra: <i style={{ fontSize: '20px', color: 'orange', fontWeight: 'bold' }}>nėra produktų</i></p>
                        : null
                }

                {/* all work times */}
                {order.orderType !== "Ne-standartinis" && order.product !== null &&
                    order.product !== undefined && order.product.orderServices !== undefined &&
                    order.product.orderServices !== null ?
                    <div>
                        {order.product.orderServices.map((element, index) => (
                            <div key={index}>
                                <p>{element.service.name}</p>
                                <Input disabled key={index} style={{ width: '100%' }} placeholder="Įrašykite lazeriavimo laiką" value={element.timeConsumption} />
                            </div>
                        ))}
                    </div>
                    : null
                }

                {order.orderType === "Ne-standartinis" && order.orderServices !== null &&
                    order.orderServices !== undefined ?
                    <div>
                        {order.orderServices.map((element, index) => (
                            <div key={index}>
                                <p>{element.service.name}</p>
                                <Input key={index}
                                    style={{ width: '100%' }}
                                    placeholder="Įrašykite lazeriavimo laiką"
                                    value={element.timeConsumption}
                                    onChange={(e) => onServiceDataChange(element.id, e.target.value, element)} />
                            </div>
                        ))}
                    </div>
                    : null
                }

                <p style={{ ...textStyle }}>Gamybos laikas</p>
                <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={order.productionTime} onChange={(e) => onDataChange(e, "productionTime")} />
                {/* <p style={{ ...textStyle }}> Įrenginys</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite įrenginį" value={order.device} onChange={(e) => onDataChange(e.target.value, "device")} /> */}
                <p style={{ ...textStyle }}>Adresas</p>
                <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={order.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                <p style={{ ...textStyle }}>Komentaras</p>
                <Input required style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={order.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                <p style={{ ...textStyle }}>Kaina</p>
                <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={order.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                <p style={{ ...textStyle }}>Vat</p>
                <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite Vat" value={order.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                <p style={{ ...textStyle }}>Užsakymo pabaigos data</p>
                <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />
                <p style={{ marginBottom: '5px' }}>Siuntos statusas</p>
                <Select
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite statusą"
                    optionFilterProp="children"
                    defaultValue={order.status}
                    value={order.status}
                    onChange={(e) => onDataChange(e, "status")}
                >
                    <Option key={1} value={true}>{'Atlikta'}</Option>
                    <Option key={2} value={false}>{'Neatlikta'}</Option>
                </Select>

                <p style={{ marginBottom: '5px' }}>Siuntos tipas</p>
                <Select
                    disabled={sandelis}
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite tipą"
                    optionFilterProp="children"
                    defaultValue={order.shipmentTypeId}
                    value={order.shipmentTypeId}
                    onChange={(e) => onDataChange(e, "shipmentTypeId")}
                >
                    {shipmentsReducer.shipments.map((element, index) => (
                        <Option key={element.id} value={element.id}>{element.type}</Option>
                    ))}
                </Select>
                <p style={{ marginBottom: '5px' }}>Klientas</p>
                <Select
                    disabled={sandelis}
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite klientą"
                    optionFilterProp="children"
                    defaultValue={order.customerId}
                    value={order.customerId}
                    onChange={(e) => onDataChange(e, "customerId")}
                >
                    {customersReducer.customers.map((element, index) => {
                        return (<Option key={element.id} value={element.id}>{element.email}</Option>)
                    })}
                </Select>

                <p style={{ marginBottom: '5px' }}>Valiuta</p>
                <Select
                    disabled={sandelis}
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Pasirinkite valiutą"
                    optionFilterProp="children"
                    defaultValue={order.currencyName}
                    onChange={(e) => onDataChange(e, "currencyName")}
                >
                    {currencies.map((element, index) => {
                        return (<Option key={element.cc} value={element.cc}>{element.cc}  {element.name}</Option>)
                    })}
                </Select>

                <p style={{ marginBottom: '5px' }}>Šalis</p>
                <Select
                    disabled={sandelis}
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite šalį"
                    optionFilterProp="children"
                    defaultValue={order.countryId}
                    value={order.countryId}
                    onChange={(e) => onDataChange(e, "countryId")}
                >
                    {countryReducer.countries.map((element, index) => {
                        return (<Option key={element.id} value={element.id}>{element.name}/{element.shortName}</Option>)
                    })}
                </Select>
                <p style={{ marginBottom: '5px' }}>Priskirtas darbuotojas</p>
                <Select
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite darbuotoją"
                    optionFilterProp="children"
                    defaultValue={order.userId}
                    value={order.userId}
                    onChange={(e) => onDataChange(e, "userId")}
                >
                    {usersListReducer.users.map((element, index) => {
                        return (<Option key={element.id} value={element.id}>{element.name}  {element.surname}</Option>)
                    })}
                </Select>
            </Form>
        </Modal>
    </>
)

}

export default UpdateOrderComponent;