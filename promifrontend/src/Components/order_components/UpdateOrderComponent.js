import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from '../../Actions/currencyAction'
import { getCustomers } from '../../Actions/customersActions'
import { getCountries } from '../../Actions/countryAction'
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

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
    const [orders, setOrders] = useState({});
    const customersReducer = useSelector((state) => state.customersReducer);
    const currencyReducer = useSelector((state) => state.currencyReducer);
    const countryReducer = useSelector((state) => state.countryReducer);

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
            setOrders(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else {
            setOrders(prevState => ({
                ...prevState,
                [inputName]: value
            }))
        }
    }
    const saveChanges = () => {
        const dataOrder = JSON.parse(JSON.stringify(orders));
        const postObj = {
            "userId": props.record.userId,
            "orderType": dataOrder.orderType,
            "status": dataOrder.status,
            "orderNumber": dataOrder.orderNumber,
            "date": dataOrder.date,
            "platforma": dataOrder.platforma,
            "moreInfo": dataOrder.moreInfo,
            "quantity": dataOrder.quantity,
            "photo": dataOrder.photo,
            "productCode": dataOrder.productCode,
            "comment": dataOrder.comment,
            "shipmentTypeId": dataOrder.shipmentTypeId,
            "customerId": dataOrder.customerId,
            "device": dataOrder.device,
            "productionTime": dataOrder.productionTime,
            "address": dataOrder.address,
            "countryId": dataOrder.countryId,
            "price": dataOrder.price,
            "currencyId": dataOrder.currencyId,
            "vat": dataOrder.vat,
            "orderFinishDate": dataOrder.orderFinishDate,
        }
        const reducerObj = {
            "id": dataOrder.id,
            "userId": dataOrder.userId,
            "orderType": dataOrder.orderType,
            "status": dataOrder.status,
            "orderNumber": dataOrder.orderNumber,
            "date": dataOrder.date,
            "platforma": dataOrder.platforma,
            "moreInfo": dataOrder.moreInfo,
            "quantity": dataOrder.quantity,
            "photo": dataOrder.photo,
            "productCode": dataOrder.productCode,
            "comment": dataOrder.comment,
            "shipmentTypeId": dataOrder.shipmentTypeId,
            "customerId": dataOrder.customerId,
            "device": dataOrder.device,
            "productionTime": dataOrder.productionTime,
            "address": dataOrder.address,
            "countryId": dataOrder.countryId,
            "price": dataOrder.price,
            "currencyId": dataOrder.currencyId,
            "vat": dataOrder.vat,
            "orderFinishDate": dataOrder.orderFinishDate,
        }
        props.save(postObj, reducerObj);
        console.log(JSON.stringify(postObj));
        console.log(JSON.stringify(reducerObj));
    }
    useEffect(() => {
        dispatch(getCurrencies(() => {
            dispatch(getCountries(() => {
                dispatch(getCustomers(() => {
                    const obj = {
                        "id": props.record.id,
                        "userId": props.record.userId,
                        "orderType": props.record.orderType,
                        "status": props.record.status,
                        "orderNumber": props.record.orderNumber,
                        "date": moment(props.record.date).format('YYYY/MM/DD'),
                        "platforma": props.record.platforma,
                        "moreInfo": props.record.moreInfo,
                        "quantity": props.record.quantity,
                        "photo": props.record.photo,
                        "productCode": props.record.productCode,
                        "comment": props.record.comment,
                        "shipmentTypeId": props.record.shipmentTypeId,
                        "customerId": props.record.customerId,
                        "device": props.record.device,
                        "productionTime": props.record.productionTime,
                        "address": props.record.address,
                        "countryId": props.record.countryId,
                        "price": props.record.price,
                        "currencyId": props.record.currencyId,
                        "vat": props.record.vat,
                        "orderFinishDate": moment(props.record.orderFinishDate).format('YYYY/MM/DD'),
                    }
                    setOrders(obj);


                }))
            }))
        }));
        // eslint-disable-next-line
    }, [dispatch]);
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
                    <Input required style={{ width: '100%' }} placeholder="Paprastas arba nestandartinis" value={orders.orderType} onChange={(e) => onDataChange(e.target.value, "orderType")} />
                    <p style={{ ...textStyle }}>Užsakymo numeris</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={orders.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    <p style={{ ...textStyle }}>Data</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={orders.date} onChange={(e) => onDataChange(e.target.value, "date")} />
                    <p style={{ ...textStyle }}>Platforma</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite platformą" value={orders.platforma} onChange={(e) => onDataChange(e.target.value, "platforma")} />
                    <p style={{ ...textStyle }}>Daugiau informacijos</p>
                    <Input required style={{ width: '100%' }} placeholder="Pridėkite informacijos" value={orders.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    <p style={{ ...textStyle }}>Kiekis</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={orders.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    <p style={{ ...textStyle }}>Nuotrauka</p>
                    <Input required style={{ width: '100%' }} placeholder="Pridėkite nuotrauką" value={orders.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    <p style={{ ...textStyle }}>Prekės kodas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kodą" value={orders.productCode} onChange={(e) => onDataChange(e.target.value, "productCode")} />
                    <p style={{ ...textStyle }}>Gamybos laikas</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={orders.productionTime} onChange={(e) => onDataChange(e, "productionTime")} />
                    <p style={{ ...textStyle }}> Įrenginys</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite įrenginį" value={orders.device} onChange={(e) => onDataChange(e.target.value, "device")} />
                    <p style={{ ...textStyle }}>Adresas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={orders.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    <p style={{ ...textStyle }}>Komentaras</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={orders.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    <p style={{ ...textStyle }}>Kaina</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={orders.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    <p style={{ ...textStyle }}>Vat</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Vat" value={orders.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                    <p style={{ ...textStyle }}>Užsakymo pabaigos data</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={orders.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />

                    <p style={{ marginBottom: '5px' }}>Siuntos statusas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite statusą"
                        optionFilterProp="children"
                        defaultValue={orders.status}
                        value={orders.status}
                        onChange={(e) => onDataChange(e, "status")}
                    >
                        <Option key={1} value={true}>{'Atlikta'}</Option>
                        <Option key={2} value={false}>{'Neatlikta'}</Option>
                    </Select>

                    <p style={{ marginBottom: '5px' }}>Siuntos tipas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite tipo"
                        optionFilterProp="children"
                        defaultValue={orders.shipmentTypeId}
                        value={orders.shipmentTypeId}
                        onChange={(e) => onDataChange(e, "shipmentTypeId")}
                    >
                        <Option key={1} value={1}>{'Skubus'}</Option>
                        <Option key={2} value={2}>{'Paprasta'}</Option>
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Klientas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite klientą"
                        optionFilterProp="children"
                        defaultValue={orders.customerId}
                        value={orders.customerId}
                        onChange={(e) => onDataChange(e, "customerId")}
                    >
                        {customersReducer.customers.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.email}</Option>)
                        })}
                    </Select>

                    <p style={{ marginBottom: '5px' }}>Valiuta</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite valiutą"
                        optionFilterProp="children"
                        defaultValue={orders.currencyId}
                        value={orders.currencyId}
                        onChange={(e) => onDataChange(e, "currencyId")}
                    >
                        {currencyReducer.currency.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>

                    <p style={{ marginBottom: '5px' }}>Šalis</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite šalį"
                        optionFilterProp="children"
                        defaultValue={orders.countryId}
                        value={orders.countryId}
                        onChange={(e) => onDataChange(e, "countryId")}
                    >
                        {countryReducer.countries.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.name}/{element.shortName}</Option>)
                        })}
                    </Select>
                </Form>
            </Modal>
        </>
    )

}

export default UpdateOrderComponent;