import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from '../../Actions/currencyAction'
import { getCustomers } from '../../Actions/customersActions'
import { getCountries } from '../../Actions/countryAction'
import { getUsers } from '../../Actions/userListActions'
import { createWarehouseData } from '../../Actions/warehouseActions'
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

function AddOrderComponent(props) {
    const dispatch = useDispatch();
    const [order, setOrder] = useState({
        "userId": "",
        "orderType": "",
        "status": false,
        "orderNumber": 0,
        "date": moment().format('YYYY/MM/DD'),
        "platforma": "",
        "moreInfo": "",
        "quantity": 0,
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
        "orderFinishDate": moment().format('YYYY/MM/DD'),
        "orderId": 0,
        "lastTimeChanging": moment().format("YYYY/MM/DD")
    });
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const customersReducer = useSelector((state) => state.customersReducer);
    const currencyReducer = useSelector((state) => state.currencyReducer);
    const countryReducer = useSelector((state) => state.countryReducer);
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const orderReducer = useSelector((state) => state.orderReducer)

    const changeFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name);
    }
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
            console.log(value);
        }
    }

    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(order));
        const formData = new FormData();



        formData.append("userId", clone.userId)
        formData.append("orderType", clone.orderType)
        formData.append("status", clone.status)
        formData.append("orderNumber", clone.orderNumber)
        formData.append("date", clone.date)
        formData.append("platforma", clone.platforma)
        formData.append("moreInfo", clone.moreInfo)
        formData.append("quantity", clone.quantity)
        formData.append("productCode", clone.productCode)
        formData.append("comment", clone.comment)
        formData.append("shipmentTypeId", clone.shipmentTypeId)
        formData.append("customerId", clone.customerId)
        formData.append("device", clone.device)
        formData.append("productionTime", clone.productionTime)
        formData.append("address", clone.address)
        formData.append("countryId", clone.countryId)
        formData.append("price", clone.price)
        formData.append("currencyId", clone.currencyId)
        formData.append("vat", clone.vat)
        formData.append("orderFinishDate", clone.orderFinishDate)
        //formData.append("file", file)


        console.log(clone)
        if (order.orderType === "Sandelis") {

            props.saveorderwarehouse(formData);

        } else {
            props.save(formData);
        }

    }
    useEffect(() => {

        dispatch(getCustomers(() => {
        }));
        dispatch(getCurrencies());
        dispatch(getCountries());
        dispatch(getUsers())

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
                    <p style={{ marginBottom: '5px' }}>Užsakymo tipas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Įrašykite tipą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "orderType")}
                    >
                        <Option key={1} value={'Standartinis'}>{'Standartinis'}</Option>
                        <Option key={2} value={'Ne-standartinis'}>{'Ne-standartinis'}</Option>
                        <Option key={3} value={'Sandelis'}>{'Sandelis'}</Option>
                    </Select>
                    {/* <Form.Item key="name" name="name" label="Užsakymo tipas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite tipą" value={order.orderType} onChange={(e) => onDataChange(e.target.value, "orderType")} />
                    </Form.Item> */}
                    <Form.Item key="name1" name="name1" label="Užsakymo numeris">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={order.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Data">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.date} onChange={(e) => onDataChange(e.target.value, "date")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="Užsakymo platforma">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite platformą" value={order.platformas} onChange={(e) => onDataChange(e.target.value, "platforma")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Daugiau informacijos">
                        <Input required style={{ width: '100%' }} placeholder="Pridėkite informacijos" value={order.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Kiekis">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={order.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Prekės kodas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite prekės kodą" value={order.productCode} onChange={(e) => onDataChange(e.target.value, "productCode")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Gamybos laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={order.productionTime} onChange={(e) => onDataChange(e, "productionTime")} />
                    </Form.Item>
                    <Form.Item key="name9" name="name9" label="Įrenginys">
                        <Input required style={{ width: '100%' }} placeholder="Pridėkite įrenginį" value={order.device} onChange={(e) => onDataChange(e.target.value, "device")} />
                    </Form.Item>
                    <Form.Item key="name10" name="name10" label="Adresas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={order.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="Komentaras">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={order.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    </Form.Item>
                    <Form.Item key="name12" name="name12" label="Kaina">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={order.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    </Form.Item>
                    <Form.Item key="name13" name="name13" label="Vat">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite Vat" value={order.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                    </Form.Item>
                    <Form.Item key="name14" name="name14" label="Užsakymo pabaigos data">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />
                    </Form.Item>
                    {/* for IMAGE */}
                    {/* <p>Nuotrauka</p>
                    <input type="file" onChange={changeFile} /> */}

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

                    <p style={{ marginBottom: '5px' }}>Priskirtas darbuotojas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite darbuotoją"
                        optionFilterProp="children"
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

export default AddOrderComponent;