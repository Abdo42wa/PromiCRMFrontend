import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from '../../appStore/actions/currenciesAction'
import { getCustomers } from '../../appStore/actions/customersActions'
import { getCountries } from '../../appStore/actions/countriesAction'
import { getUsers } from '../../appStore/actions/userListActions'
import { getLoggedUser } from '../../appStore/actions/userAction';
import { getProducts } from '../../appStore/actions/productsActions'
import { getWarehouseProduct } from '../../appStore/actions/warehouseActions'
import { getOrders } from '../../appStore/actions/ordersAction'
import { getShipments } from '../../appStore/actions/shipmentsActions';
import { getSalesChannels } from '../../appStore/actions/salesChannelsActions'
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import {currencies} from '../data/currenciesData.js'

const { Option } = Select;

function AddOrderComponent(props) {
    const dispatch = useDispatch();
    const [order, setOrder] = useState({
        "userId": "",
        "orderType": "",
        "countryName":"Lithuania",
        "currencyName": "EUR",
        "status": false,
        "orderNumber": null,
        "date": moment().format('YYYY/MM/DD,h:mm:ss a'),
        "platforma": null,
        "warehouseProductsNumber": 0,
        "warehouseProductsDate": moment().format('YYYY/MM/DD'),
        "warehouseProductsTaken": false,
        "moreInfo": "",
        "quantity": 0,
        "productCode": null,
        "shipmentTypeId": 2,
        "customerId": null,
        "device": "",
        "productionTime": 0,
        "address": "",
        "countryId": 1,
        "comment": "",
        "price": 0,
        // "currencyId": 1,
        "vat": 0,
        "orderFinishDate": moment().format('YYYY/MM/DD'),
        "orderId": null,
        "lastTimeChanging": moment().format("YYYY/MM/DD"),
        "laserTime": 0,
        "milingTime": 0,
        "paintingTime": 0,
        "grindingTime": 0,
        "bondingTime": 0,
        "collectionTime": 0,
        "packingTime": 0
    });
    const [file, setFile] = useState();
    const [sandelis, setSandelis] = useState(false);
    const [notStandart, setNotStandart] = useState(true);
    const [product, setProduct] = useState(null)
    const [fileName, setFileName] = useState();
    const [orderServices, setOrderServices] = useState([
        {
            "serviceId": 7,
            "timeConsumption": 0
        }
    ])

    const customersReducer = useSelector((state) => state.customersReducer);
    const currencyReducer = useSelector((state) => state.currencyReducer);
    const countryReducer = useSelector((state) => state.countryReducer);
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const salesChannelsReducer = useSelector((state) => state.salesChannelsReducer)
    const productsReducer = useSelector((state) => state.productsReducer)
    const orderReducer = useSelector((state) => state.orderReducer)
    const warehouseReducer = useSelector((state) => state.warehouseReducer)
    const usersReducer = useSelector((state) => state.usersReducer)
    const shipmentsReducer = useSelector((state) => state.shipmentsReducer)

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
        const orders_clone = JSON.parse(JSON.stringify(orderReducer.orders))
        //if there are orders then map through them and return max num  +1 
        if (orders_clone.length > 0) {
            let num = Number(
                Math.max.apply(
                    Math,
                    orders_clone?.map(o => o.orderNumber || 0),
                ) || 0,
            );
            return num + 1;
        } else {
            return 1;
        }
    }

    const serviceDataChange = (value, inputName, serviceId) => {
        const index = orderServices.findIndex(x => x.serviceId === serviceId)
        if (index === -1) {
            let obj = {
                "serviceId": serviceId,
                "timeConsumption": value
            }
            setOrderServices(prevState => [...prevState, obj])
        } else
            setOrderServices(orderServices.map(x => x.serviceId === serviceId ? { ...x, "timeConsumption": value } : x))
        setOrder(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }

    const onDataChange = (value, inputName) => {
        if (inputName === 'orderNumber' ||
            inputName === 'customerId' ||
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
    }

    const onProductDataChange = (value, inputName) => {
        setOrder(prevState => ({
            ...prevState,
            [inputName]: value

        }))
        const obj = productsReducer.products.find(x => x.code === value)
        setProduct(obj)
        dispatch(getWarehouseProduct(value))

    }
    const onOrderTypeChange = (value, inputName) => {
        setOrder(prevState => ({
            ...prevState,
            [inputName]: value
        }))
        if (inputName === "orderType" && value === "Sandelis") {
            // disable not standart
            setSandelis(true);
            setNotStandart(true)
            // setNotStandart(true)
        } else if (inputName === "orderType" && value === "Ne-standartinis") {
            setNotStandart(false)
            setSandelis(false);
        } else {
            setNotStandart(true)
            setSandelis(false);
        }
    }

    const getProductId = (productCode) => {
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
        // if ne-standartinis then person writes all "times" by himself.
        // but i need to save "times" for "Sandelis" and "Paprastas" orders too. i can get times from product
        if (clone.orderType === "Ne-standartinis") {

            const postObj = {
                ...clone,
                "orderNumber": clone.orderNumber === null ? getOrderNumber() : clone.orderNumber,
                "platforma": clone.platforma === null ? "Nera" : clone.platforma,
                "productCode": null,
                "orderServices":orderServices
            }
            console.log(JSON.stringify(postObj))
            props.save(postObj)
        } else {
            //get product that we selected. i need "times" from product
            const product_data = productsReducer.products.find(o => o.code === clone.productCode)
            const postObj = {
                ...clone,
                "orderNumber": clone.orderNumber === null ? getOrderNumber() : clone.orderNumber,
                "productId": clone.productCode !== null ? getProductId(product.code) : null
            }
            props.save(postObj)
        }
    }
    useEffect(() => {
        dispatch(getCustomers())
        // dispatch(getCurrencies());
        dispatch(getCountries());
        dispatch(getUsers());
        dispatch(getSalesChannels())
        dispatch(getProducts());
        dispatch(getLoggedUser())
        dispatch(getShipments())
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
                footer={null}
            >
                <Form
                    layout="vertical"
                    id="myForm"
                    name="myForm"
                    onFinish={saveChanges}
                >
                    <Form.Item
                        name="orderType"
                        key="orderType"
                        label="Užsakymo tipas"
                        rules={[{ required: true, message: 'Prašau pasirinkti tipą!' }]}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Įrašykite tipą"
                            optionFilterProp="children"
                            onChange={(e) => onOrderTypeChange(e, "orderType")}
                        >
                            <Option key="standartinis" value={'Standartinis'}>{'Standartinis'}</Option>
                            <Option key="Ne-standartinis" value={'Ne-standartinis'}>{'Ne-standartinis'}</Option>
                            <Option key="Sandelis" value={'Sandelis'}>{'Sandelis'}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        key="orderNumber"
                        name="orderNumber"
                        label="Užsakymo numeris"
                        initialValue={getOrderNumber()}
                        rules={[{ required: true, message: "Įveskite užsakymo numerį!" }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Įrašykite užsakymo numerį"
                            value={order.orderNumber}
                            onChange={(e) => onDataChange(e, "orderNumber")} />
                    </Form.Item>
                    {/* <Form.Item key="name2" name="name2" label="Data">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.date} defaultValue={moment().format("YYYY/MM/DD")} onChange={(e) => onDataChange(e.target.value, "date")} />
                    </Form.Item> */}


                    {order.orderType === "Ne-standartinis" ?
                        <div>
                            <p>Ne-standartinis</p>
                            <select
                                className="form-select" aria-label="Default select example"
                                name='platforma'
                                key='platforma'
                                id="platforma"
                                defaultValue={"Nera"}
                                onChange={(e) => onDataChange(e.target.value, "platforma")}
                            >
                                {salesChannelsReducer.salesChannels.map((element, index) => {
                                    return (<option key={element.id} value={element.title}>{element.title}</option>)
                                })}
                                <option key="none" value="Nera">Nera</option>
                            </select>
                        </div>
                        :
                        <Form.Item
                            key="platforma"
                            name="platforma"
                            label="Platforma"
                            initialValue={null}
                        >
                            <Select
                                disabled={sandelis}
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Priskirkite platforma"
                                optionFilterProp="children"
                                defaultValue={null}
                                onChange={(e) => onDataChange(e, "platforma")}
                            >
                                {salesChannelsReducer.salesChannels.map((element, index) => {
                                    return (<Option key={element.id} value={element.title}>{element.title}</Option>)
                                })}
                            </Select>
                        </Form.Item>}

                    <Form.Item key="name4" name="name4" label="Daugiau informacijos">
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Pridėkite informacijos"
                            value={order.moreInfo}
                            onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    </Form.Item>
                    <Form.Item
                        key="quantity"
                        name="quantity"
                        label="Kiekis"
                        rules={[{ required: true, message: 'Prašau įvesti kiekį!' }]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Įrašykite kiekį"
                            value={order.quantity}
                            onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    </Form.Item>
                    {/* if order is Standart or Sandeliui then productCode is required */}
                    {order.orderType === "Standartinis" || order.orderType === "Sandelis" ?
                        <Form.Item
                            key="productCode"
                            name="productCode"
                            label="Prekės kodas"
                            rules={[{ required: true, message: "Įveskite prekės kodą!" }]}
                        >
                            <Select
                                showSearch
                                disabled={!notStandart}
                                style={{ width: '100%' }}
                                placeholder="Priskirkite prekės kodą"
                                optionFilterProp="children"
                                onChange={(e) => onProductDataChange(e, "productCode")}
                            >
                                {productsReducer.products.map((element, index) => {
                                    return (<Option key={element.id} value={element.code}>{element.code}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                        :
                        <div>
                            <p>Prekės kodas</p>
                            <select
                                className="form-select" aria-label="Default select example"
                                disabled
                                name='productCode1'
                                key='productCode1'
                                onChange={(e) => onDataChange(e, "productCode")}
                            >
                                {/* {productsReducer.products.map((element, index) => {
                                    return (<option key={element.id} value={element.code}>{element.code}</option>)
                                })} */}
                            </select>
                        </div>
                    }

                    {order.orderType === "Standartinis" && order.productCode !== '' && warehouseReducer.warehouse_product.quantityProductWarehouse !== undefined &&
                        warehouseReducer.warehouse_product.quantityProductWarehouse !== null && warehouseReducer.warehouse_product.quantityProductWarehouse !== 0 ?
                        <p>Sandėlyje yra: <i style={{ fontSize: '20px', color: 'green', fontWeight: 'bold' }}>{warehouseReducer.warehouse_product.quantityProductWarehouse}</i></p>
                        : <p>Sandėlyje neturime</p>}

                    {/* {order.productCode !== '' && order.orderType === "Standartinis" ?
                        <Form.Item key='warehouseProductsNumber' name='warehouseProductsNumber' label="Panaudosime sandėlio produktus?">
                            <Input style={{ width: '35px', height: '35px' }} type={'checkbox'} value={order.warehouseProductsNumber === 0 ? false : true} onChange={(e) => onTakeFromWarehouseCheck(e.target.checked, "warehouseProductsNumber")} />
                        </Form.Item> : null} */}
                    {order.orderType === "Ne-standartinis" ?
                        <div>
                            <Form.Item key="laserTime" name="laserTime" label="Lazeriavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laiką" defaultValue={order.laserTime} value={order.laserTime} onChange={(e) => serviceDataChange(e, "laserTime",1)} />
                            </Form.Item>
                            <Form.Item key="milingTime" name="milingTime" label="Frezavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laiką" defaultValue={order.milingTime} value={order.milingTime} onChange={(e) => serviceDataChange(e, "milingTime",2)} />
                            </Form.Item>
                            <Form.Item key="paintingTime" name="paintingTime" label="Dažymo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Dažymo laiką" defaultValue={order.paintingTime} value={order.paintingTime} onChange={(e) => serviceDataChange(e, "paintingTime",3)} />
                            </Form.Item>
                            <Form.Item key="grindingTime" name="grindingTime" label="Šlifavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Šlifavimo laiką" defaultValue={order.grindingTime} value={order.grindingTime} onChange={(e) => serviceDataChange(e, "grindingTime",4)} />
                            </Form.Item>
                            <Form.Item key="bondingTime" name="bondingTime" label="Suklijavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laiką" defaultValue={order.bondingTime} value={order.bondingTime} onChange={(e) => serviceDataChange(e, "bondingTime",5)} />
                            </Form.Item>
                            <Form.Item key="collectionTime" name="collectionTime" label="Surinkimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laiką" defaultValue={order.collectionTime} value={order.collectionTime} onChange={(e) => serviceDataChange(e, "collectionTime",6)} />
                            </Form.Item>
                            <Form.Item key="packingTime" name="packingTime" label=" Pakavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laiką" defaultValue={order.packingTime} value={order.packingTime} onChange={(e) => serviceDataChange(e, "packingTime",7)} />
                            </Form.Item>
                        </div> : null
                    }
                    {order.orderType !== "Ne-standartinis" && order.productCode !== '' && product !== null && product.orderServices !== null && product.orderServices !== undefined?
                        <div>
                            {product.orderServices.map((element, index) => {
                                return (
                                    <div key={index}>
                                        <p>{element.service.name}</p>
                                        <Input disabled key={index} style={{ width: '100%' }} placeholder="Įrašykite lazeriavimo laiką" value={element.timeConsumption} />
                                    </div>
                                )
                            })}
                        </div> : null

                    }
                    <Form.Item key="productionTime" name="productionTime" label="Gamybos laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={order.productionTime} />
                    </Form.Item>

                    {/* <Form.Item key="name9" name="name9" label="Įrenginys">
                        <Input style={{ width: '100%' }} placeholder="Pridėkite įrenginį" value={order.device} onChange={(e) => onDataChange(e.target.value, "device")} />
                    </Form.Item> */}
                    <Form.Item key="address" name="address" label="Adresas">
                        <Input disabled={sandelis} style={{ width: '100%' }} placeholder="Įrašykite adresą" value={order.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    </Form.Item>
                    <Form.Item key="comment" name="comment" label="Komentaras">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={order.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    </Form.Item>
                    <Form.Item key="price" name="price" label="Kaina">
                        <InputNumber disabled={sandelis} style={{ width: '100%' }} placeholder="Įrašykite kainą" value={order.price} onChange={(e) => onDataChange(e, "price")} />
                    </Form.Item>
                    <Form.Item key="vat" name="vat" label="Vat">
                        <InputNumber disabled={sandelis} style={{ width: '100%' }} placeholder="Įrašykite Vat" value={order.vat} onChange={(e) => onDataChange(e, "vat")} />
                    </Form.Item>
                    <Form.Item
                        key="orderFinishDate"
                        name="orderFinishDate"
                        label="Užsakymo pabaigos data"
                        initialValue={order.orderFinishDate}
                        rules={[{ required: true, message: "Įveskite pabaigos datą!" }]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Įrašykite datą"
                            value={order.orderFinishDate}
                            onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />
                    </Form.Item>
                    {/* for IMAGE */}
                    {/* <p>Nuotrauka</p>
                    <input type="file" onChange={changeFile} /> */}

                    <Form.Item
                        key="shipmentId"
                        name="shipmentId"
                        label="Siuntos tipas"
                    >
                        <Select
                            disabled={sandelis}
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Priskirkite tipą"
                            optionFilterProp="children"
                            defaultValue={order.shipmentTypeId}
                            onChange={(e) => onDataChange(e, "shipmentTypeId")}
                        >
                            {shipmentsReducer.shipments.map((element, index) => (
                                <Option key={element.id} value={element.id}>{element.type}</Option>
                            ))}
                            {/* <Option key="Express" value={1}>{'Express'}</Option>
                            <Option key="Paprastas" value={2}>{'Paprastas'}</Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        key="customerId"
                        name="customerId"
                        label="Klientas"
                    >
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
                    </Form.Item>
                    <Form.Item
                        key="currencyName"
                        name="currencyName"
                        label="Valiuta"
                    >
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
                    </Form.Item>
                    <Form.Item
                        key="countryId"
                        name="countryId"
                        label="Šalis"
                    >
                        <Select
                            disabled={sandelis}
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Priskirkite šalį"
                            optionFilterProp="children"
                            defaultValue={order.countryId}
                            onChange={(e) => onDataChange(e, "countryId")}
                        >
                            {countryReducer.countries.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name}/{element.shortName}</Option>)
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        key="userId"
                        name="userId"
                        label="Atsakingas darbuotojas"
                    >
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
                    </Form.Item>
                    <div style={{ marginTop: '5px' }}></div>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit">
                            Pridėti
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddOrderComponent;