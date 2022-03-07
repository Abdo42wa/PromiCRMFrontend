import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomers } from '../../appStore/actions/customersActions'
import { getCountries } from '../../appStore/actions/countriesAction'
import { getUsers } from '../../appStore/actions/userListActions'
import { getSalesChannels } from '../../appStore/actions/salesChannelsActions'
import { getWarehouseProduct } from '../../appStore/actions/warehouseActions';
import { updateOrderTakeProductsFromWarehouse, updateNonStandart, updateOrder, getOrder, getNonStandartOrder, updateOrderObj, updateNonStandartObjServices, updateDefectiveOrderAndInsertNew } from '../../appStore/actions/ordersAction';
import { getShipments } from '../../appStore/actions/shipmentsActions';
import { Modal, Button, Form, Space, Select, Input, InputNumber, Image, message } from 'antd';
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
    const [sandelis, setSandelis] = useState(false);
    const [notStandart, setNotStandart] = useState(true);
    const [serviceFakeArray, setServiceFakeArray] = useState([
        {
            num: 1,
            title: 'Lazeriavimo',
        },
        {
            num: 2,
            title: 'Frezavimo',
        },
        {
            num: 3,
            title: 'Dažymo',
        },
        {
            num: 4,
            title: 'Šlifavimo',
        },
        {
            num: 5,
            title: 'Suklijavimo',
        },
        {
            num: 6,
            title: 'Surinkimo'
        },
        {
            num: 7,
            title: 'Pakavimo'
        },

    ])

    const customersReducer = useSelector((state) => state.customersReducer);
    const countryReducer = useSelector((state) => state.countryReducer);
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const salesChannelsReducer = useSelector((state) => state.salesChannelsReducer)
    const warehouseReducer = useSelector((state) => state.warehouseReducer)
    const shipmentsReducer = useSelector((state) => state.shipmentsReducer)
    const orderReducer = useSelector((state) => state.orderReducer)
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        if (orderReducer.order !== null && orderReducer.order.orderType === "Standartinis" || orderReducer.order.orderType === "Sandelis")
            dispatch(updateOrderObj(inputName, value, "Standartinis"))
        else if (orderReducer.order !== null && orderReducer.order.orderType === "Ne-standartinis")
            dispatch(updateOrderObj(inputName, value, "Ne-standartinis"))
        if (inputName === "productCode") {
            dispatch(getWarehouseProduct(value))
        }
    }
    //for non standart orders. to update order and orderServices
    const onServiceDataChange = (id, value, record, serviceId) => {
        dispatch(updateNonStandartObjServices(id, value, record, serviceId))
    }
    const saveChanges = () => {
        // const clone = JSON.parse(JSON.stringify(order));

        if (orderReducer.non_standart_order !== null) {
            dispatch(updateNonStandart())
            props.onClose()
        }
        else {
            dispatch(updateOrder())
            props.onClose()
        }


    }
    const onDefectiveCheck = () => {
        if (orderReducer.order.defective === false && orderReducer.order.defectiveNumber !== null &&
            orderReducer.order.defectiveNumber > 0 && orderReducer.order.defectiveNumber < orderReducer.order.quantity) {
            if (orderReducer.order !== null && orderReducer.order.orderType === "Standartinis" || orderReducer.order.orderType === "Sandelis"){
                dispatch(updateOrderObj("defective", true, "Standartinis"))
            }else if (orderReducer.order !== null && orderReducer.order.orderType === "Ne-standartinis"){
                dispatch(updateOrderObj("defective", true, "Ne-standartinis"))
            }
            dispatch(updateDefectiveOrderAndInsertNew())
            message.success("Sukurtas naujas užsakymas su tokiu kiekiu kiek brokuota")
            props.onClose()
        } else {
            message.error("Brokuotas skaičius negali būti didesnis už užsakymo kiekį ir turi būti didesnis už 0")
        }
    }
    const onTakeFromWarehouseCheck = (value, inputName) => {
        let num = 0;
        if (value === false)
            num = 0;
        else {
            if (orderReducer.order.orderType !== "Ne-standartinis" && orderReducer.order.quantity <= warehouseReducer.warehouse_product.quantityProductWarehouse)
                num = orderReducer.order.quantity;
            else
                num = 0;
        }
        // setOrder(prevState => ({
        //     ...prevState,
        //     [inputName]: Number(num)
        // }))
        const obj = {
            ...orderReducer.order,
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
        // const obj = {
        //     ...props.record,
        //     "date": moment(props.record.date).format('YYYY/MM/DD,h:mm:ss a'),
        //     "orderFinishDate": moment(props.record.orderFinishDate).format('YYYY/MM/DD')
        // }
        dispatch(getUsers());
        dispatch(getCountries())
        dispatch(getCustomers())
        dispatch(getWarehouseProduct(props.record.productCode))
        // setOrder(obj);
        if (props.record.orderType === "Sandelis") {
            dispatch(getOrder(props.record.id))
            setSandelis(true);
            setNotStandart(true)
        } else if (props.record.orderType === "Ne-standartinis") {
            dispatch(getNonStandartOrder(props.record.id))
            dispatch(getSalesChannels())
            dispatch(getShipments())
            setNotStandart(false)
            setSandelis(false);
        } else {
            dispatch(getOrder(props.record.id))
            dispatch(getSalesChannels())
            dispatch(getShipments())
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
                    {orderReducer.order !== null && orderReducer.order !== undefined ?
                        <div>
                            <p style={{ ...textStyle }}>Užsakymo tipas</p>
                            <Input disabled style={{ width: '100%' }} placeholder="Paprastas arba nestandartinis" value={orderReducer.order.orderType} onChange={(e) => onDataChange(e.target.value, "orderType")} />
                            <p style={{ ...textStyle }}>Užsakymo numeris</p>
                            <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={orderReducer.order.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                            {/* <p style={{ ...textStyle }}>Data</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={orderReducer.order.date} onChange={(e) => onDataChange(e.target.value, "date")} /> */}


                            <p style={{ marginBottom: '5px' }}>Platforma</p>
                            <Select
                                disabled={sandelis}
                                showSearch
                                style={{ width: '320px' }}
                                placeholder="Priskirkite platforma"
                                optionFilterProp="children"
                                value={orderReducer.order.platforma}
                                onChange={(e) => onDataChange(e, "platforma")}
                            >
                                {salesChannelsReducer.salesChannels.map((element, index) => {
                                    return (<Option key={element.id} value={element.title}>{element.title}</Option>)
                                })}
                            </Select>
                            <p style={{ ...textStyle }}>Daugiau informacijos</p>
                            <Input style={{ width: '100%' }} placeholder="Pridėkite informacijos" value={orderReducer.order.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                            <p style={{ ...textStyle }}>Kiekis</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={orderReducer.order.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                            {/* <p style={{ ...textStyle }}>Nuotrauka</p>
                    <Input required style={{ width: '100%' }} placeholder="Pridėkite nuotrauką" value={orderReducer.order.photo} onChange={(e) => onDataChange(e.target.value, "photo")} /> */}
                            <p style={{ ...textStyle }}>Prekės kodas</p>
                            <Input disabled={!notStandart} style={{ width: '100%', textTransform: 'uppercase' }} placeholder="Įrašykite kodą" value={orderReducer.order.productCode} onChange={(e) => onDataChange(e.target.value.toUpperCase(), "productCode")} />

                            {orderReducer.order.orderType === "Standartinis" && orderReducer.order.productCode !== "" ?
                                <div>
                                    <p style={{ ...textStyle }}>Panaudosime sandėlio produktus?</p>
                                    <Input disabled={
                                        orderReducer.order.quantity <= warehouseReducer.warehouse_product.quantityProductWarehouse &&
                                            orderReducer.order.warehouseProductsTaken === false && orderReducer.order.status === false ? false : true}
                                        style={{ width: '35px', height: '35px' }}
                                        type={'checkbox'}
                                        value={orderReducer.order.warehouseProductsNumber === 0 ? false : true}
                                        onChange={(e) => onTakeFromWarehouseCheck(e.target.checked, "warehouseProductsNumber")}
                                    />
                                </div>
                                : null
                            }
                            {/* {orderReducer.order.orderType === "Standartinis" && orderReducer.order.productCode !== '' && warehouseReducer.warehouse_product.quantityProductWarehouse !== undefined &&
                    warehouseReducer.warehouse_product.quantityProductWarehouse !== 0 && orderReducer.order.status === false?
                    <p>Sandėlyje yra: <i style={{fontSize: '20px', color: 'green', fontWeight: 'bold'}}>{warehouseReducer.warehouse_product.quantityProductWarehouse}</i></p>
                    :<p>Sandėlyje neturime</p>} */}
                            {orderReducer.order.orderType === "Standartinis" && orderReducer.order.status == false &&
                                warehouseReducer.warehouse_product.quantityProductWarehouse !== undefined ?
                                <div>
                                    {warehouseReducer.warehouse_product.quantityProductWarehouse < orderReducer.order.quantity ?
                                        <p>Sandėlyje <i style={{ fontSize: '20px', color: 'orange', fontWeight: 'bold' }}>turime nepakankamai, {warehouseReducer.warehouse_product.quantityProductWarehouse}</i></p>
                                        : warehouseReducer.warehouse_product.quantityProductWarehouse >= orderReducer.order.quantity ?
                                            <p>Sandėlyje yra:<i style={{ fontSize: '20px', color: 'green', fontWeight: 'bold' }}>
                                                {warehouseReducer.warehouse_product.quantityProductWarehouse}</i></p>
                                            : null}
                                </div>
                                : orderReducer.order.orderType === "Standartinis" && orderReducer.order.status == false &&
                                    warehouseReducer.warehouse_product.quantityProductWarehouse === undefined ?
                                    <p>Sandėlyje yra: <i style={{ fontSize: '20px', color: 'orange', fontWeight: 'bold' }}>nėra produktų</i></p>
                                    : null
                            }

                            {/* all work times */}
                            {orderReducer.order.orderType !== "Ne-standartinis" && orderReducer.order.product !== null &&
                                orderReducer.order.product !== undefined && orderReducer.order.product.orderServices !== undefined &&
                                orderReducer.order.product.orderServices !== null ?
                                <div style={{ width: '100%' }}>
                                    {/* {orderReducer.order.product.orderServices.map((element, index) => (
                                        <div key={index}>
                                            <p>{element.service.name}</p>
                                            <Input disabled key={index} style={{ width: '100%' }} placeholder="Įrašykite lazeriavimo laiką" value={element.timeConsumption} />
                                        </div>
                                    ))} */}
                                    <p style={{ ...textStyle }}>Lazeriavimo laikas</p>
                                    <Input disabled key="lazerTime" style={{ width: '100%' }} value={orderReducer.order.product.orderServices.find(x => x.serviceId === 1) !== undefined ?
                                        orderReducer.order.product.orderServices.find(x => x.serviceId === 1).timeConsumption : 0} />

                                    <p style={{ ...textStyle }}>Frezavimo laikas</p>
                                    <Input disabled key="milingTime" style={{ width: '100%' }} value={orderReducer.order.product.orderServices.find(x => x.serviceId === 2) !== undefined ?
                                        orderReducer.order.product.orderServices.find(x => x.serviceId === 2).timeConsumption : 0} />

                                    <p style={{ ...textStyle }}>Dažymo laikas</p>
                                    <Input disabled key="paintingTime" style={{ width: '100%' }} value={orderReducer.order.product.orderServices.find(x => x.serviceId === 3) !== undefined ?
                                        orderReducer.order.product.orderServices.find(x => x.serviceId === 3).timeConsumption : 0} />

                                    <p style={{ ...textStyle }}>Šlifavimo laikas</p>
                                    <Input disabled key="grindingTime" style={{ width: '100%' }} value={orderReducer.order.product.orderServices.find(x => x.serviceId === 4) !== undefined ?
                                        orderReducer.order.product.orderServices.find(x => x.serviceId === 4).timeConsumption : 0} />

                                    <p style={{ ...textStyle }}>Suklijavimo laikas</p>
                                    <Input disabled key="bondingTime" style={{ width: '100%' }} value={orderReducer.order.product.orderServices.find(x => x.serviceId === 5) !== undefined ?
                                        orderReducer.order.product.orderServices.find(x => x.serviceId === 5).timeConsumption : 0} />

                                    <p style={{ ...textStyle }}>Surinkimo laikas</p>
                                    <Input disabled key="collectionTime" style={{ width: '100%' }} value={orderReducer.order.product.orderServices.find(x => x.serviceId === 6) !== undefined ?
                                        orderReducer.order.product.orderServices.find(x => x.serviceId === 6).timeConsumption : 0} />

                                    <p style={{ ...textStyle }}>Pakavimo laikas</p>
                                    <Input disabled key="packingTime" style={{ width: '100%' }} value={orderReducer.order.product.orderServices.find(x => x.serviceId === 7) !== undefined ?
                                        orderReducer.order.product.orderServices.find(x => x.serviceId === 7).timeConsumption : 0} />
                                </div>
                                : null
                            }

                            {orderReducer.order.orderType === "Ne-standartinis" && orderReducer.order.orderServices !== null &&
                                orderReducer.order.orderServices !== undefined ?

                                <div>
                                    {serviceFakeArray.map((element, index) => {
                                        const orderService = orderReducer.order.orderServices.find(x => x.serviceId === element.num) !== undefined ?
                                            orderReducer.order.orderServices.find(x => x.serviceId === element.num) : null
                                        return (
                                            <div key={element.title}>
                                                <p>{element.title} laikas</p>
                                                <InputNumber key={index + "ye"}
                                                    style={{ width: '100%' }}
                                                    placeholder={`Įrašykite ${element.title} laiką`}
                                                    value={orderService !== null ? orderService.timeConsumption : 0}
                                                    onChange={(e) => onServiceDataChange(orderService !== null ? orderService.id : null, e, orderService !== null ? orderService : null, element.num)} />
                                            </div>)
                                    })}
                                </div>
                                : null
                            }
                            <p style={{ ...textStyle }}>Gamybos laikas</p>
                            <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={orderReducer.order.productionTime} onChange={(e) => onDataChange(e, "productionTime")} />

                            <p style={{ ...textStyle }}>Brokuota</p>
                            <InputNumber disabled={orderReducer.order.defective !== false ? true : false} value={orderReducer.order.defectiveNumber} onChange={(e) => onDataChange(e, "defectiveNumber")} />
                            <Button disabled={orderReducer.order.defective === true ? true : false} onClick={(e) => onDefectiveCheck()}>Brokuota</Button>


                            {/* <p style={{ ...textStyle }}> Įrenginys</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite įrenginį" value={orderReducer.order.device} onChange={(e) => onDataChange(e.target.value, "device")} /> */}
                            <p style={{ ...textStyle }}>Adresas</p>
                            <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={orderReducer.order.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                            <p style={{ ...textStyle }}>Komentaras</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={orderReducer.order.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                            <p style={{ ...textStyle }}>Kaina</p>
                            <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={orderReducer.order.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                            <p style={{ ...textStyle }}>Vat</p>
                            <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite Vat" value={orderReducer.order.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                            <p style={{ ...textStyle }}>Užsakymo pabaigos data</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={orderReducer.order.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />

                            <p style={{ ...textStyle }}>Uzsakovo vardas</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite Uzsakovo varda" value={orderReducer.order.customerName} onChange={(e) => onDataChange(e.target.value, "customerName")} />


                            <p style={{ ...textStyle }}>Siuntimo kaina</p>
                            <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite Siuntimo kaina" value={orderReducer.order.shippingCost} onChange={(e) => onDataChange(e.target.value, "shippingCost")} />


                            <p style={{ ...textStyle }}>Siuntos numeris</p>
                            <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite Siuntos numeris" value={orderReducer.order.shippingNumber} onChange={(e) => onDataChange(e.target.value, "shippingNumber")} />



                            <p style={{ marginBottom: '5px' }}>Siuntos statusas</p>
                            <Select
                                showSearch
                                style={{ width: '320px' }}
                                placeholder="Priskirkite statusą"
                                optionFilterProp="children"
                                defaultValue={orderReducer.order.status}
                                value={orderReducer.order.status}
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
                                defaultValue={orderReducer.order.shipmentTypeId}
                                value={orderReducer.order.shipmentTypeId}
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
                                defaultValue={orderReducer.order.customerId}
                                value={orderReducer.order.customerId}
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
                                defaultValue={orderReducer.order.currencyName}
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
                                defaultValue={orderReducer.order.countryId}
                                value={orderReducer.order.countryId}
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
                                defaultValue={orderReducer.order.userId}
                                value={orderReducer.order.userId}
                                onChange={(e) => onDataChange(e, "userId")}
                            >
                                {usersListReducer.users.map((element, index) => {
                                    return (<Option key={element.id} value={element.id}>{element.name}  {element.surname}</Option>)
                                })}
                            </Select>
                        </div>
                        : null
                    }
                </Form>
            </Modal>
        </>
    )

}

export default UpdateOrderComponent;