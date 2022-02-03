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
import { getSalesChannels } from '../../appStore/actions/salesChannelsActions'
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
        "orderNumber": null,
        "date": moment().format('YYYY/MM/DD,h:mm:ss a'),
        "platforma": "",
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
        "currencyId": 1,
        "vat": 0,
        "orderFinishDate": moment().format('YYYY/MM/DD'),
        "orderId": null,
        "lastTimeChanging": moment().format("YYYY/MM/DD"),
        "collectionTime": 0,
        "bondingTime": 0,
        "laserTime": 0,
        "paintingTime": 0,
        "milingTime": 0,
        "packingTime": 0
    });
    const [file, setFile] = useState();
    const [sandelis, setSandelis] = useState(false);
    const [notStandart, setNotStandart] = useState(true);
    const [product, setProduct] = useState(null)
    const [fileName, setFileName] = useState();

    const customersReducer = useSelector((state) => state.customersReducer);
    const currencyReducer = useSelector((state) => state.currencyReducer);
    const countryReducer = useSelector((state) => state.countryReducer);
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const salesChannelsReducer = useSelector((state) => state.salesChannelsReducer)
    const productsReducer = useSelector((state) => state.productsReducer)
    const orderReducer = useSelector((state) => state.orderReducer)
    const warehouseReducer = useSelector((state) => state.warehouseReducer)
    const usersReducer = useSelector((state) => state.usersReducer)

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
                "orderNumber": clone.orderNumber === null ? getOrderNumber() : clone.orderNumber
            }
            props.save(postObj)
        } else {
            //get product that we selected. i need "times" from product
            const product_data = productsReducer.products.find(o => o.code === clone.productCode)
            const postObj = {
                ...clone,
                "orderNumber": clone.orderNumber === null ? getOrderNumber() : clone.orderNumber,
                "productId": clone.productCode !== null ? getProductId(product.code) : null,
                "collectionTime": product.collectionTime,
                "bondingTime": product.bondingTime,
                "laserTime": product.laserTime,
                "paintingTime": product.paintingTime,
                "milingTime": product.milingTime,
                "packingTime": product.packingTime
            }
            props.save(postObj)
        }
    }
    const onTakeFromWarehouseCheck = (value, inputName) => {
        let num = 0;
        if (value === false)
            num = 0;
        else {
            if (order.quantity <= warehouseReducer.warehouse_product.quantityProductWarehouse)
                num = order.quantity;
            else
                num = 0;
        }
        setOrder(prevState => ({
            ...prevState,
            [inputName]: Number(num)
        }))
    }
    useEffect(() => {
        dispatch(getCustomers())
        dispatch(getCurrencies());
        dispatch(getCountries());
        dispatch(getUsers());
        dispatch(getSalesChannels())
        dispatch(getProducts());
        dispatch(getLoggedUser())
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

                    <div>
                        <Form.Item
                            key="platforma"
                            name="platforma"
                            label="Platforma"
                        >
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
                        </Form.Item>
                    </div>
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

                    <Form.Item
                        key="productCode"
                        name="productCode"
                        label="Prekės kodas">
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
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laiką" defaultValue={order.laserTime} value={order.laserTime} onChange={(e) => onDataChange(e, "laserTime")} />
                            </Form.Item>
                            <Form.Item key="milingTime" name="milingTime" label="Frezavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laiką" defaultValue={order.milingTime} value={order.milingTime} onChange={(e) => onDataChange(e, "milingTime")} />
                            </Form.Item>
                            <Form.Item key="paintingTime" name="paintingTime" label="Dažymo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Dažymo laiką" defaultValue={order.paintingTime} value={order.paintingTime} onChange={(e) => onDataChange(e, "paintingTime")} />
                            </Form.Item>
                            <Form.Item key="bondingTime" name="bondingTime" label="Suklijavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laiką" defaultValue={order.bondingTime} value={order.bondingTime} onChange={(e) => onDataChange(e, "bondingTime")} />
                            </Form.Item>
                            <Form.Item key="collectionTime" name="collectionTime" label="Surinkimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laiką" defaultValue={order.collectionTime} value={order.collectionTime} onChange={(e) => onDataChange(e, "collectionTime")} />
                            </Form.Item>
                            <Form.Item key="packingTime" name="packingTime" label=" Pakavimo laikas">
                                <InputNumber disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laiką" defaultValue={order.packingTime} value={order.packingTime} onChange={(e) => onDataChange(e, "packingTime")} />
                            </Form.Item>
                        </div> : null
                    }
                    {order.productCode !== '' && product !== null ?
                        <div>
                            <Form.Item key="laserTime1" name="laserTime1" label="Lazeriavimo laikas">
                                <Input disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laiką" defaultValue={product.laserTime} />
                            </Form.Item>
                            <Form.Item key="milingTime1" name="milingTime1" label="Frezavimo laikas">
                                <Input disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laiką" defaultValue={product.milingTime} />
                            </Form.Item>
                            <Form.Item key="paintingTime1" name="paintingTime1" label="Dažymo laikas">
                                <Input disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Dažymo laiką" defaultValue={product.paintingTime} />
                            </Form.Item>
                            <Form.Item key="bondingTime1" name="bondingTime1" label="Suklijavimo laikas">
                                <Input disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laiką" defaultValue={product.bondingTime} />
                            </Form.Item>
                            <Form.Item key="collectionTime1" name="collectionTime1" label="Surinkimo laikas">
                                <Input disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laiką" defaultValue={product.collectionTime} />
                            </Form.Item>
                            <Form.Item key="packingTime1" name="packingTime1" label=" Pakavimo laikas">
                                <Input disabled={notStandart} style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laiką" defaultValue={product.packingTime} />
                            </Form.Item>
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
                            <Option key="Express" value={1}>{'Express'}</Option>
                            <Option key="Paprastas" value={2}>{'Paprastas'}</Option>
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
                        key="currencyId"
                        name="currencyId"
                        label="Valiuta"
                    >
                        <Select
                            disabled={sandelis}
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Pasirinkite valiutą"
                            optionFilterProp="children"
                            defaultValue={order.currencyId}
                            onChange={(e) => onDataChange(e, "currencyId")}
                        >
                            {currencyReducer.currency.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name}</Option>)
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
                    <div style={{marginTop: '5px'}}></div>
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