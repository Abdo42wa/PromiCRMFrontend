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
            inputName === 'countryId' || inputName === 'shipmentTypeId') {
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
            "orderNumber": dataOrder.orderNumber,
            "date": dataOrder.date,
            "platformas": dataOrder.platformas,
            "moreInfo": dataOrder.moreInfo,
            "quantity": dataOrder.quantity,
            "photo": dataOrder.photo,
            "productCode": dataOrder.productCode,
            "comment": dataOrder.comment,
            "shipmentTypeId": dataOrder.shipmentTypeId,
            "customerId": dataOrder.customerId,
            "address": dataOrder.address,
            "countryId": dataOrder.countryId,
            "price": dataOrder.price,
            "currencyId": dataOrder.currencyId,
            "vat": dataOrder.vat,
            "orderFinishDate": dataOrder.orderFinishDate,
        }
        const reducerObj = {
            "id": props.record.id,
            "orderNumber": props.record.orderNumber,
            "date": props.record.date,
            "platformas": props.record.platformas,
            "moreInfo": props.record.moreInfo,
            "quantity": props.record.quantity,
            "photo": props.record.photo,
            "productCode": props.record.productCode,
            "comment": props.record.comment,
            "shipmentTypeId": props.record.shipmentTypeId,
            "customerId": props.record.customerId,
            "address": props.record.address,
            "countryId": props.record.countryId,
            "price": props.record.price,
            "currencyId": props.record.currencyId,
            "vat": props.record.vat,
            "orderFinishDate": props.record.orderFinishDate,
        }
        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        dispatch(getCurrencies(() => {
            dispatch(getCountries(() => {
                dispatch(getCustomers(() => {
                    const obj = {
                        "id": props.record.id,
                        "orderNumber": props.record.orderNumber,
                        "date": moment(props.record.date).format('YYYY/MM/DD'),
                        "platformas": props.record.platformas,
                        "moreInfo": props.record.moreInfo,
                        "quantity": props.record.quantity,
                        "photo": props.record.photo,
                        "productCode": props.record.productCode,
                        "comment": props.record.comment,
                        "shipmentTypeId": props.record.shipmentTypeId,
                        "customerId": props.record.customerId,
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti įsakymas</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Užsakymo numeris</p>
                    <InputNumber style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={orders.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    <p style={{ ...textStyle }}>Data</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite datą" value={orders.date} onChange={(e) => onDataChange(e.target.value, "date")} />
                    <p style={{ ...textStyle }}>platformas</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite platformas" value={orders.platformas} onChange={(e) => onDataChange(e.target.value, "platformas")} />
                    <p style={{ ...textStyle }}>Daugiau informacijos</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite Daugiau informacijos" value={orders.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    <p style={{ ...textStyle }}>Kiekis</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite Kiekis" value={orders.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    <p style={{ ...textStyle }}>Nuotrauka</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite Nuotrauka" value={orders.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    <p style={{ ...textStyle }}>Prekės kodas</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite Prekės kodas" value={orders.productCode} onChange={(e) => onDataChange(e.target.value, "productCode")} />
                    <p style={{ ...textStyle }}>Adresu</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite Adresu" value={orders.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    <p style={{ ...textStyle }}>Komentaras</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={orders.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    <p style={{ ...textStyle }}>Kaina</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite Kaina" value={orders.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    <p style={{ ...textStyle }}>vat</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite vat" value={orders.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                    <p style={{ ...textStyle }}>Užsakymo pabaigos data</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite Užsakymo pabaigos data" value={orders.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />

                    <p style={{ marginBottom: '5px' }}>Siuntos tipo</p>
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
                        placeholder="Priskirkite Valiuta"
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