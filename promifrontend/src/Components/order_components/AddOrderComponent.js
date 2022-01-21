import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from '../../Actions/currencyAction'
import { getCustomers } from '../../Actions/customersActions'
import { getCountries } from '../../Actions/countryAction'
import { getUsers } from '../../Actions/userListActions'
import { getProducts } from '../../Actions/productsActions'
import { getWarehouseProduct } from '../../Actions/warehouseActions'
import { getOrders } from '../../Actions/orderAction'
import { getSalesChannels } from '../../Actions/salesChannelsActions'
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
        "shipmentTypeId": null,
        "customerId": null,
        "device": "",
        "productionTime": 0,
        "address": "",
        "countryId": null,
        "comment": "",
        "price": 0,
        "currencyId": null,
        "vat": 0,
        "orderFinishDate": moment().format('YYYY/MM/DD'),
        "orderId": null,
        "lastTimeChanging": moment().format("YYYY/MM/DD"),
        "collectionTime": null,
        "bondingTime": null,
        "laserTime": null,
        "paintingTime": null,
        "milingTime": null,
        "packingTime": null
    });
    const [file, setFile] = useState();
    const [sandelis, setSandelis] = useState(false);
    const [nonStander, setNonStander] = useState(true);
    const [fileName, setFileName] = useState();

    const customersReducer = useSelector((state) => state.customersReducer);
    const currencyReducer = useSelector((state) => state.currencyReducer);
    const countryReducer = useSelector((state) => state.countryReducer);
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const salesChannelsReducer = useSelector((state) => state.salesChannelsReducer)
    const productsReducer = useSelector((state) => state.productsReducer)
    const orderReducer = useSelector((state) => state.orderReducer)
    const warehouseReducer = useSelector((state) => state.warehouseReducer.warehouseData)

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

    const getOrderNumber = () => {
        const lastOrder = orderReducer.orders.slice(-1)
        const orderNumber = lastOrder.map((x) => x.orderNumber)
        console.log(orderNumber[0])
        return orderNumber[0] + 1;
    }


    const onDataChange = (value, inputName) => {

        if (inputName === 'orderNumber' ||
            inputName === 'customerId' || inputName === 'currencyId' ||
            inputName === 'countryId' || inputName === 'shipmentTypeId' || inputName === 'productionTime') {
            console.log(value);
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

        if (inputName === "productCode") {
            dispatch(getWarehouseProduct(value))
        }

    }
    const onOrderTypeChange = (value, inputName) => {
        setOrder(prevState => ({
            ...prevState,
            [inputName]: value
        }))


        if (value === "Sandelis" && inputName === "orderType") {
            setSandelis(true);
        } else if (value === "Ne-standartinis" && inputName === "orderType") {
            setNonStander(false)
            setSandelis(false);
        } else {
            setNonStander(true)
            setSandelis(false);
        }
    }

    const getOrderId = (productCode) => {
        //var productCode = "555GG";
        const product = productsReducer.products.find(element => element.code === productCode)
        // console.log(product.id)
        // console.log(productsReducer.products.find(element => element.code === productCode))
        if (product !== undefined) {
            return product.id;
        }


    }

    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(order));
        const formData = new FormData();



        formData.append("userId", clone.userId)
        formData.append("orderType", clone.orderType)
        formData.append("status", clone.status)
        formData.append("orderNumber", getOrderNumber())
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
        formData.append("productId", getOrderId(clone.productCode))
        formData.append("orderFinishDate", clone.orderFinishDate)
        //formData.append("file", file)
        const postObj = {
            "userId": clone.userId,
            "orderType": clone.orderType,
            "status": clone.status,
            "orderNumber": getOrderNumber(),
            "date": clone.date,
            "platforma": clone.platforma,
            "moreInfo": clone.moreInfo,
            "quantity": clone.quantity,
            "photo": clone.photo,
            "productCode": clone.productCode,
            "productId": clone.productCode !== null ? getOrderId(clone.productCode) : null,
            "comment": clone.comment,
            "shipmentTypeId": clone.shipmentTypeId,
            "customerId": clone.customerId,
            "device": clone.device,
            "productionTime": clone.productionTime,
            "address": clone.address,
            "countryId": clone.countryId,
            "price": clone.price,
            "currencyId": clone.currencyId,
            "vat": clone.vat,
            "orderFinishDate": clone.orderFinishDate,
            "collectionTime": clone.collectionTime,
            "bondingTime": clone.bondingTime,
            "laserTime": clone.laserTime,
            "paintingTime": clone.paintingTime,
            "milingTime": clone.milingTime,
            "packingTime": clone.packingTime
        }

        console.log(clone)
        //if (order.orderType === "Sandelis") {

        // just for testing 


        //props.saveorderwarehouse(formData);
        props.save(postObj);
        console.log(JSON.stringify(clone))

        // } else {
        //     props.save(formData);
        // }

    }
    useEffect(() => {

        dispatch(getCustomers(() => {
        }));
        dispatch(getCurrencies());
        dispatch(getCountries());
        dispatch(getUsers());
        dispatch(getSalesChannels(() => {
        }));
        dispatch(getOrders())
        getOrderNumber();
        dispatch(getProducts());
        //getOrderId();
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
                        style={{ width: '100%' }}
                        placeholder="Įrašykite tipą"
                        optionFilterProp="children"
                        onChange={(e) => onOrderTypeChange(e, "orderType")}
                    >
                        <Option key={1} value={'Standartinis'}>{'Standartinis'}</Option>
                        <Option key={2} value={'Ne-standartinis'}>{'Ne-standartinis'}</Option>
                        <Option key={3} value={'Sandelis'}>{'Sandelis'}</Option>
                    </Select>
                    <Form.Item key="name1" name="name1" label="Užsakymo numeris">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={order.orderNumber} defaultValue={getOrderNumber()} onChange={(e) => onDataChange(e, "orderNumber")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Data">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.date} defaultValue={moment().format("YYYY/MM/DD")} onChange={(e) => onDataChange(e.target.value, "date")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Platforma</p>
                    <Select
                        disabled={sandelis}
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Priskirkite platforma"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "platforma")}
                    >
                        {salesChannelsReducer.salesChannels.map((element, index) => {
                            return (<Option key={element.id} value={element.title}>{element.title}</Option>)
                        })}
                    </Select>
                    {/* <Form.Item key="name3" name="name3" label="Užsakymo platforma">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite platformą" value={order.platformas} onChange={(e) => onDataChange(e.target.value, "platforma")} />
                    </Form.Item> */}
                    <Form.Item key="name4" name="name4" label="Daugiau informacijos">
                        <Input required style={{ width: '100%' }} placeholder="Pridėkite informacijos" value={order.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Kiekis">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={order.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    </Form.Item>
                    {/* <Form.Item key="name7" name="name7" label="Prekės kodas">
                        <Input required style={{ width: '100%', textTransform: 'uppercase' }} placeholder="Įrašykite prekės kodą" value={order.productCode} onChange={(e) => onDataChange(e.target.value.toUpperCase(), "productCode")} />
                    </Form.Item> */}

                    <p style={{ marginBottom: '5px' }}>Prekės kodas</p>
                    <Select
                        showSearch
                        disabled={!nonStander}
                        style={{ width: '100%' }}
                        placeholder="Priskirkite prekės kodą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "productCode")}
                    >
                        {productsReducer.products.map((element, index) => {
                            return (<Option key={element.id} value={element.code}>{element.code}</Option>)
                        })}
                    </Select>
                    {order.productCode !== '' && <p style={{ color: 'red' }}> sandėlyje turim {warehouseReducer.quantityProductWarehouse}</p>}
                    <Form.Item key="name15" name="name15" label="Lazeriavimo laikas">
                        <Input disabled={nonStander} required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laikas" value={order.price} onChange={(e) => onDataChange(e.target.value, "laserTime")} />
                    </Form.Item>
                    <Form.Item key="name16" name="name16" label="Frezavimo laikas">
                        <Input disabled={nonStander} required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laikas" value={order.price} onChange={(e) => onDataChange(e.target.value, "milingTime")} />
                    </Form.Item>
                    <Form.Item key="name17" name="name17" label="Surinkimo laikas">
                        <Input disabled={nonStander} required style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laika" value={order.price} onChange={(e) => onDataChange(e.target.value, "collectionTime")} />
                    </Form.Item>
                    <Form.Item key="name18" name="name18" label=" Pakavimo laikas">
                        <Input disabled={nonStander} required style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laikas" value={order.price} onChange={(e) => onDataChange(e.target.value, "packingTime")} />
                    </Form.Item>
                    <Form.Item key="name19" name="name19" label="Dažymo laikas">
                        <Input disabled={nonStander} required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laikas" value={order.price} onChange={(e) => onDataChange(e.target.value, "paintingTime")} />
                    </Form.Item>
                    <Form.Item key="name20" name="name20" label="Suklijavimo laikas">
                        <Input disabled={nonStander} required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laikas" value={order.price} onChange={(e) => onDataChange(e.target.value, "bondingTime")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Gamybos laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={order.productionTime} onChange={(e) => onDataChange(e, "productionTime")} />
                    </Form.Item>
                    {/* <Form.Item key="name9" name="name9" label="Įrenginys">
                        <Input required style={{ width: '100%' }} placeholder="Pridėkite įrenginį" value={order.device} onChange={(e) => onDataChange(e.target.value, "device")} />
                    </Form.Item> */}
                    <Form.Item key="name10" name="name10" label="Adresas">
                        <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={order.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="Komentaras">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={order.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    </Form.Item>
                    <Form.Item key="name12" name="name12" label="Kaina">
                        <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={order.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    </Form.Item>
                    <Form.Item key="name13" name="name13" label="Vat">
                        <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite Vat" value={order.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                    </Form.Item>
                    <Form.Item key="name14" name="name14" label="Užsakymo pabaigos data">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />
                    </Form.Item>
                    {/* for IMAGE */}
                    {/* <p>Nuotrauka</p>
                    <input type="file" onChange={changeFile} /> */}

                    <p style={{ marginBottom: '5px' }}>Siuntos tipas</p>
                    <Select
                        disabled={sandelis}
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Priskirkite tipą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "shipmentTypeId")}
                    >
                        <Option key={1} value={1}>{'Express'}</Option>
                        <Option key={2} value={2}>{'Paprastas'}</Option>
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Klientas</p>
                    <Select
                        disabled={sandelis}
                        showSearch
                        style={{ width: '100%' }}
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
                        disabled={sandelis}
                        showSearch
                        style={{ width: '100%' }}
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
                        disabled={sandelis}
                        showSearch
                        style={{ width: '100%' }}
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
                        style={{ width: '100%' }}
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