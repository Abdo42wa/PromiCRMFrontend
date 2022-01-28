import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from '../../appStore/actions/currenciesAction'
import { getCustomers } from '../../appStore/actions/customersActions'
import { getCountries } from '../../appStore/actions/countriesAction'
import { getUsers } from '../../appStore/actions/userListActions'
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
        "date": moment().format('YYYY/MM/DD'),
        "platforma": "",
        "warehouseProductsNumber": 0,
        "WarehouseProductsDate": moment().format('YYYY/MM/DD'),
        "warehouseProductsTaken": false,
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
        let num = Number(
            Math.max.apply(
                Math,
                orders_clone?.map(o => o.orderNumber || 0),
            ) || 0,
        );
        return num + 1;
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

    const onProductDataChange = (value,inputName)=>{
        setOrder(prevState => ({
            ...prevState,
            [inputName]: Number(value)

        }))
        const obj = productsReducer.products.find(x => x.code === value)
        setProduct(obj)
        console.log(obj)

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
                "productId": clone.productCode !== null ? getOrderId(clone.productCode) : null,
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
                    {order.productCode !== '' && <p style={{ color: 'red' }}> sandėlyje turim {warehouseReducer.warehouse_product.quantityProductWarehouse}</p>}

                    {order.productCode !== '' && order.orderType === "Standartinis" ?
                        <Form.Item key='warehouseProductsNumber' name='warehouseProductsNumber' label="Panaudosime sandėlio produktus?">
                            <Input style={{ width: '35px', height: '35px' }} type={'checkbox'} value={order.warehouseProductsNumber === 0 ? false : true} onChange={(e) => onTakeFromWarehouseCheck(e.target.checked, "warehouseProductsNumber")} />
                        </Form.Item> : null}
                    {order.orderType === "Ne-standartinis" ?
                        <div>
                            <Form.Item key="name15" name="name15" label="Lazeriavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laiką" value={order.laserTime} onChange={(e) => onDataChange(e.target.value, "laserTime")} />
                            </Form.Item>
                            <Form.Item key="name16" name="name16" label="Frezavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laiką" value={order.milingTime} onChange={(e) => onDataChange(e.target.value, "milingTime")} />
                            </Form.Item>
                            <Form.Item key="name19" name="name19" label="Dažymo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laiką" value={order.paintingTime} onChange={(e) => onDataChange(e.target.value, "paintingTime")} />
                            </Form.Item>
                            <Form.Item key="name20" name="name20" label="Suklijavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laiką" value={order.bondingTime} onChange={(e) => onDataChange(e.target.value, "bondingTime")} />
                            </Form.Item>
                            <Form.Item key="name17" name="name17" label="Surinkimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laiką" value={order.collectionTime} onChange={(e) => onDataChange(e.target.value, "collectionTime")} />
                            </Form.Item>
                            <Form.Item key="name18" name="name18" label=" Pakavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laiką" value={order.packingTime} onChange={(e) => onDataChange(e.target.value, "packingTime")} />
                            </Form.Item>
                        </div> : null
                    }
                    {order.productCode !== '' && product !== null?
                        <div>
                            <Form.Item key="name15" name="name15" label="Lazeriavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laiką" defaultValue={product.laserTime} />
                            </Form.Item>
                            <Form.Item key="name16" name="name16" label="Frezavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laiką" defaultValue={product.milingTime} />
                            </Form.Item>
                            <Form.Item key="name19" name="name19" label="Dažymo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laiką" defaultValue={product.paintingTime} />
                            </Form.Item>
                            <Form.Item key="name20" name="name20" label="Suklijavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laiką" defaultValue={product.bondingTime} />
                            </Form.Item>
                            <Form.Item key="name17" name="name17" label="Surinkimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laiką" defaultValue={product.collectionTime} />
                            </Form.Item>
                            <Form.Item key="name18" name="name18" label=" Pakavimo laikas">
                                <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laiką" defaultValue={product.packingTime} />
                            </Form.Item>
                        </div> : null

                    }
                    <Form.Item key="name8" name="name8" label="Gamybos laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={order.productionTime} />
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
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.orderFinishDate} defaultValue={order.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />
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