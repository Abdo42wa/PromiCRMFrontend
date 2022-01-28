import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies } from '../../appStore/actions/currenciesAction'
import { getCustomers } from '../../appStore/actions/customersActions'
import { getCountries } from '../../appStore/actions/countriesAction'
import { getUsers } from '../../appStore/actions/userListActions'
import { getSalesChannels } from '../../appStore/actions/salesChannelsActions'
import { Modal, Button, Form, Space, Select, Input, InputNumber, Image } from 'antd';
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
    const [order, setOrder] = useState({});
    const [sandelis, setSandelis] = useState(false);
    const [notStandart, setNotStandart] = useState(true);
    const [file, setFile] = useState();
    const [fileChanged, setFileChanged] = useState(0)
    const customersReducer = useSelector((state) => state.customersReducer);
    const currencyReducer = useSelector((state) => state.currencyReducer);
    const countryReducer = useSelector((state) => state.countryReducer);
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const salesChannelsReducer = useSelector((state) => state.salesChannelsReducer)

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
        }


    }
    const saveChanges = () => {
        // const clone = JSON.parse(JSON.stringify(order));
        const { id, ...postObj } = order;
        const reducerObj = {
            ...order
        }
        // const postObj = {
        //     "userId": clone.userId,
        //     "orderType": clone.orderType,
        //     "status": clone.status,
        //     "orderNumber": clone.orderNumber,
        //     "date": clone.date,
        //     "platforma": clone.platforma,
        //     "moreInfo": clone.moreInfo,
        //     "quantity": clone.quantity,
        //     "photo": clone.photo,
        //     "productCode": clone.productCode,
        //     "comment": clone.comment,
        //     "shipmentTypeId": clone.shipmentTypeId,
        //     "customerId": clone.customerId,
        //     "device": clone.device,
        //     "productionTime": clone.productionTime,
        //     "address": clone.address,
        //     "countryId": clone.countryId,
        //     "price": clone.price,
        //     "currencyId": clone.currencyId,
        //     "vat": clone.vat,
        //     "orderFinishDate": clone.orderFinishDate,
        // }
       
        props.save(postObj, reducerObj);
        console.log('postobj:' + JSON.stringify(postObj))
        console.log('reducerObj:' + JSON.stringify(reducerObj))

        // if (fileChanged === 0) {
        //     const { id, ...postObj } = clone;
        //     const reducerObj = clone;
        //     props.save(postObj, reducerObj);
        // } else {
        //     const formData = new FormData();
        //     formData.append("userId", clone.userId)
        //     formData.append("orderType", clone.orderType)
        //     formData.append("status", clone.status)
        //     formData.append("orderNumber", clone.orderNumber)
        //     formData.append("date", clone.date)
        //     formData.append("platforma", clone.platforma)
        //     formData.append("moreInfo", clone.moreInfo)
        //     formData.append("quantity", clone.quantity)
        //     formData.append("productCode", clone.productCode)
        //     formData.append("comment", clone.comment)
        //     formData.append("shipmentTypeId", clone.shipmentTypeId)
        //     formData.append("customerId", clone.customerId)
        //     formData.append("device", clone.device)
        //     formData.append("productionTime", clone.productionTime)
        //     formData.append("address", clone.address)
        //     formData.append("countryId", clone.countryId)
        //     formData.append("price", clone.price)
        //     formData.append("currencyId", clone.currencyId)
        //     formData.append("vat", clone.vat)
        //     formData.append("orderFinishDate", clone.orderFinishDate)
        //     formData.append("file", file)
        //     formData.append("imageName", clone.imageName)
        //     props.saveWithImg(formData, clone.id)
        //     console.log(clone.imageName)
        //     console.log(file)
        // }
    }

    const deleteImage = () => {
        const clone = JSON.parse(JSON.stringify(order))
        // materialClone.imageName = null;
        clone.imagePath = null;
        // dispatch(deleteMaterialImage(material.id, material.imageName))
        setOrder(clone)
    }
    const changeFile = (e) => {
        setFileChanged(1);
        setFile(e.target.files[0])
    }

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getCurrencies())
        dispatch(getCountries())
        dispatch(getCustomers())
        const obj = {
            ...props.record,
            "date":moment(props.record.date).format('YYYY/MM/DD,h:mm:ss a'),
            "orderFinishDate": moment(props.record.orderFinishDate).format('YYYY/MM/DD')
        }
        setOrder(obj);
        if (props.record.orderType === "Sandelis") {
            setSandelis(true);
            setNotStandart(true)
        } else if (props.record.orderType === "Ne-standartinis") {
            setNotStandart(false)
            setSandelis(false);
        } else {
            setNotStandart(true)
            setSandelis(false);
        }

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
                    <Input disabled style={{ width: '100%' }} placeholder="Paprastas arba nestandartinis" value={order.orderType} onChange={(e) => onDataChange(e.target.value, "orderType")} />
                    <p style={{ ...textStyle }}>Užsakymo numeris</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={order.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    {/* <p style={{ ...textStyle }}>Data</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.date} onChange={(e) => onDataChange(e.target.value, "date")} /> */}

                    
                    <p style={{ marginBottom: '5px' }}>Platforma</p>
                    <Select
                        disabled={sandelis}
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite platforma"
                        optionFilterProp="children"
                        value={order.platforma}
                        onChange={(e) => onDataChange(e, "platforma")}
                    >
                        {salesChannelsReducer.salesChannels.map((element, index) => {
                            return (<Option key={element.id} value={element.title}>{element.title}</Option>)
                        })}
                    </Select>
                    <p style={{ ...textStyle }}>Daugiau informacijos</p>
                    <Input required style={{ width: '100%' }} placeholder="Pridėkite informacijos" value={order.moreInfo} onChange={(e) => onDataChange(e.target.value, "moreInfo")} />
                    <p style={{ ...textStyle }}>Kiekis</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={order.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />
                    {/* <p style={{ ...textStyle }}>Nuotrauka</p>
                    <Input required style={{ width: '100%' }} placeholder="Pridėkite nuotrauką" value={order.photo} onChange={(e) => onDataChange(e.target.value, "photo")} /> */}
                    <p style={{ ...textStyle }}>Prekės kodas</p>
                    <Input disabled={!notStandart} required style={{ width: '100%', textTransform: 'uppercase' }} placeholder="Įrašykite kodą" value={order.productCode} onChange={(e) => onDataChange(e.target.value.toUpperCase(), "productCode")} />

                    {/* all work times */}
                    {order.orderType === "Ne-standartinis" ? <div>
                        <p style={{ ...textStyle }}>Lazeriavimo laikas</p>
                        <InputNumber disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laiką" value={order.laserTime} onChange={(e) => onDataChange(e, "laserTime")} />
                        <p style={{ ...textStyle }}>Frezavimo laikas</p>
                        <InputNumber disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laiką" value={order.milingTime} onChange={(e) => onDataChange(e, "milingTime")} />
                        <p style={{ ...textStyle }}>Dažymo laikas</p>
                        <InputNumber disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laiką" value={order.paintingTime} onChange={(e) => onDataChange(e, "paintingTime")} />
                        <p style={{ ...textStyle }}>Suklijavimo laikas</p>
                        <InputNumber disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laiką" value={order.bondingTime} onChange={(e) => onDataChange(e, "bondingTime")} />
                        <p style={{ ...textStyle }}>Surinkimo laikas</p>
                        <InputNumber disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laiką" value={order.collectionTime} onChange={(e) => onDataChange(e, "collectionTime")} />
                        <p style={{ ...textStyle }}>Pakavimo laikas</p>
                        <InputNumber disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laiką" value={order.packingTime} onChange={(e) => onDataChange(e, "packingTime")} />
                    </div>:
                    <div>
                    <p style={{ ...textStyle }}>Lazeriavimo laikas</p>
                        <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laiką" value={order.laserTime} />
                        <p style={{ ...textStyle }}>Frezavimo laikas</p>
                        <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laiką" value={order.milingTime} />
                        <p style={{ ...textStyle }}>Dažymo laikas</p>
                        <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laiką" value={order.paintingTime} />
                        <p style={{ ...textStyle }}>Suklijavimo laikas</p>
                        <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laiką" value={order.bondingTime} />
                        <p style={{ ...textStyle }}>Surinkimo laikas</p>
                        <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Surinkimo laiką" value={order.collectionTime} />
                        <p style={{ ...textStyle }}>Pakavimo laikas</p>
                        <Input disabled={notStandart} required style={{ width: '100%' }} placeholder="Įrašykite Pakavimo laiką" value={order.packingTime} />
                    </div>}

                    <p style={{ ...textStyle }}>Gamybos laikas</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite gamybos laiką" value={order.productionTime} onChange={(e) => onDataChange(e, "productionTime")} />
                    {/* <p style={{ ...textStyle }}> Įrenginys</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite įrenginį" value={order.device} onChange={(e) => onDataChange(e.target.value, "device")} /> */}
                    <p style={{ ...textStyle }}>Adresas</p>
                    <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={order.address} onChange={(e) => onDataChange(e.target.value, "address")} />
                    <p style={{ ...textStyle }}>Komentaras</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={order.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    <p style={{ ...textStyle }}>Kaina</p>
                    <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={order.price} onChange={(e) => onDataChange(e.target.value, "price")} />
                    <p style={{ ...textStyle }}>Vat</p>
                    <Input disabled={sandelis} required style={{ width: '100%' }} placeholder="Įrašykite Vat" value={order.vat} onChange={(e) => onDataChange(e.target.value, "vat")} />
                    <p style={{ ...textStyle }}>Užsakymo pabaigos data</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={order.orderFinishDate} onChange={(e) => onDataChange(e.target.value, "orderFinishDate")} />

                    {/* for IMAGE */}
                    {/* {order.imagePath !== null && order.imagePath !== undefined ?
                        <div>
                            <p style={{ ...textStyle }}>Nuotrauka</p>
                            <Image key={order.imageName} src={order.imagePath} width={100} />
                            <br></br>
                            <Button onClick={deleteImage}>Ištrinti nuotrauką</Button>
                        </div> :
                        <div>
                            <p style={{ ...textStyle }}>Nuotraukos ikėlimas</p>
                            <input required type='file' onChange={changeFile} />
                        </div>} */}
                    <p style={{ marginBottom: '5px' }}>Siuntos statusas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite statusą"
                        optionFilterProp="children"
                        defaultValue={order.status}
                        value={order.status}
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
                        defaultValue={order.shipmentTypeId}
                        value={order.shipmentTypeId}
                        onChange={(e) => onDataChange(e, "shipmentTypeId")}
                    >
                        <Option key={1} value={1}>{'Skubus'}</Option>
                        <Option key={2} value={2}>{'Paprasta'}</Option>
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Klientas</p>
                    <Select
                        disabled={sandelis}
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite klientą"
                        optionFilterProp="children"
                        defaultValue={order.customerId}
                        value={order.customerId}
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
                        style={{ width: '320px' }}
                        placeholder="Priskirkite valiutą"
                        optionFilterProp="children"
                        defaultValue={order.currencyId}
                        value={order.currencyId}
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
                        style={{ width: '320px' }}
                        placeholder="Priskirkite šalį"
                        optionFilterProp="children"
                        defaultValue={order.countryId}
                        value={order.countryId}
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
                        defaultValue={order.userId}
                        value={order.userId}
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

export default UpdateOrderComponent;