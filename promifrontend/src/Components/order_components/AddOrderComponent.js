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
        "orderType": "",
        "status": false,
        "orderNumber": 0,
        "date": moment().format('YYYY/MM/DD'),
        "platforma": "",
        "moreInfo": "",
        "quantity": 0,
        "photo": "",
        "productCode": "",
        "shipmentTypeId": 0,
        "customerId": 0,
        "device": "",
        "productionTime": 0,
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
            console.log(value);
        }
    }
    const saveChanges = () => {
        const dataOrder = JSON.parse(JSON.stringify(orders));
        //const dataClone = orders;
        //console.log(JSON.parse(JSON.stringify(orders)))
        const postObj = {
            "userId": "C9490C27-1B89-4E39-8F2E-99B48DCC709E",
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
        props.save(postObj);
        console.log(postObj)
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują užsakymą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Užsakymo tipas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite tipą" value={orders.orderType} onChange={(e) => onDataChange(e.target.value, "orderType")} />
                    </Form.Item>
                    <Form.Item key="name1" name="name1" label="Užsakymo numeris">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={orders.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Data">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={orders.date} onChange={(e) => onDataChange(e.target.value, "date")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="Užsakymo platforma">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite platformą" value={orders.platformas} onChange={(e) => onDataChange(e.target.value, "platforma")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Daugiau informacijos">
                        <Input required style={{ width: '100%' }} placeholder="Pridėkite informacijos" value={orders.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Kiekis">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={orders.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Nuotrauka">
                        <Input required style={{ width: '100%' }} placeholder="Pridėkite nuotrauką" value={orders.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Prekės kodas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite prekės kodą" value={orders.productCode} onChange={(e) => onDataChange(e.target.value, "productCode")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Gamybos laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={orders.productionTime} onChange={(e) => onDataChange(e, "productionTime")} />
                    </Form.Item>
                    <Form.Item key="name9" name="name9" label="Įrenginys">
                        <Input required style={{ width: '100%' }} placeholder="Pridėkite įrenginį" value={orders.device} onChange={(e) => onDataChange(e.target.value, "device")} />
                    </Form.Item>
                    <Form.Item key="name10" name="name10" label="Adresas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={orders.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="Komentaras">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={orders.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    </Form.Item>
                    <Form.Item key="name12" name="name12" label="Kaina">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={orders.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    </Form.Item>
                    <Form.Item key="name13" name="name13" label="Vat">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite Vat" value={orders.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                    </Form.Item>
                    <Form.Item key="name14" name="name14" label="Užsakymo pabaigos data">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={orders.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Siuntos tipas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite tipą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "shipmentTypeId")}
                    >
                        <Option key={1} value={1}>{'Express'}</Option>
                        <Option key={2} value={2}>{'Paprastas'}</Option>
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
                        placeholder="Pasirinkite valiutą"
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