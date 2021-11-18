import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from '../../Actions/currencyAction'
import { getCustomers } from '../../Actions/customersActions'
import { getCountries } from '../../Actions/countryAction'
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

function AddOrderComponent(props) {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState({
        "orderNumber": 0,
        "date": moment().format('YYYY/MM/DD'),
        "platformas": "",
        "moreInfo": "",
        "quantity": 0,
        "photo": "",
        "productCode": "",
        "shipmentTypeId": 0,
        "customerId": 0,
        "address": "",
        "countryId": 0,
        "comment": "",
        "price": 0,
        "currencyId": 0,
        "vat": 0,
        "orderFinishDate": moment().format('YYYY/MM/DD')
    });
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
            console.log(value);
        }
    }
    const saveChanges = () => {
        const dataOrder = JSON.parse(JSON.stringify(orders));
        //const dataClone = orders;
        console.log(JSON.parse(JSON.stringify(orders)))
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
            "price": dataOrder.price,
            "currencyId": dataOrder.currencyId,
            "vat": dataOrder.vat,
            "orderFinishDate": dataOrder.orderFinishDate,
        }

        props.save(postObj);
    }
    useEffect(() => {

        dispatch(getCustomers(() => {
            dispatch(getCurrencies());
            dispatch(getCountries());
        }));
    }, [dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują įsakymas</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">

                    <Form.Item key="name" name="name" label="Užsakymo numeris">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={orders.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Data">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite datą" value={orders.date} onChange={(e) => onDataChange(e.target.value, "date")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="Užsakymo platformas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite platformas" value={orders.platformas} onChange={(e) => onDataChange(e.target.value, "platformas")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Daugiau informacijos">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite Daugiau informacijos" value={orders.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Užsakymo Kiekis">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite Kiekis" value={orders.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Suplanuotas Nuotrauka">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite Nuotrauka" value={orders.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Prekės kodas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite Prekės kodas" value={orders.productCode} onChange={(e) => onDataChange(e.target.value, "productCode")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Adresu">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite Adresu" value={orders.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    </Form.Item>
                    <Form.Item key="name9" name="name9" label="Komentaras">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={orders.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    </Form.Item>
                    <Form.Item key="name10" name="name10" label="Kaina">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite Kaina" value={orders.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="vat">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite vat" value={orders.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                    </Form.Item>
                    <Form.Item key="name12" name="name12" label="Užsakymo pabaigos data">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite Užsakymo pabaigos data" value={orders.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Siuntos tipo</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite tipo"
                        optionFilterProp="children"
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

export default AddOrderComponent;