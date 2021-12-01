import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Actions/userListActions';
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const {Option} = Select;
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

function UpdateSalesChannelComponent(props) {
    const dispatch = useDispatch();
    const [salesChannel, setSalesChannel] = useState({});
    const usersListReducer = useSelector((state) => state.usersListReducer);
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        // update salesChannel to what was in previous state and change only that value that needed
        setSalesChannel(previousState => ({
            ...previousState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(salesChannel));
        const postObj = {
            title: clone.title,
            contactPerson: clone.contactPerson,
            email: clone.email,
            phoneNumber: clone.phoneNumber,
            deliveryAddress: clone.deliveryAddress,
            discount: clone.discount,
            brokerageFee: clone.brokerageFee,
            userId: clone.userId
        }
        const reducerObj = {
            id: clone.id,
            title: clone.title,
            contactPerson: clone.contactPerson,
            email: clone.email,
            phoneNumber: clone.phoneNumber,
            deliveryAddress: clone.deliveryAddress,
            discount: clone.discount,
            brokerageFee: clone.brokerageFee,
            userId: clone.userId
        }

        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        dispatch(getUsers(() => {
            setSalesChannel(props.record)
            // console.log(JSON.stringify(productsReducer.products))
        }));
    }, [dispatch, props.record])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti pardavimo kanalą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                <p style={{...textStyle}}>Pavadinimas</p>
                <Input required style={{ width: '100%' }} placeholder="Įrašykite pavadinimą" value={salesChannel.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                <p style={{...textStyle}}>Kontaktinis asmuo</p>
                <Input required style={{ width: '100%' }} placeholder="Įrašykite kontaktinis asmenį" value={salesChannel.contactPerson} onChange={(e) => onDataChange(e.target.value, "contactPerson")} />
                   <p style={{...textStyle}}>El. paštas</p>
                   <Input required style={{ width: '100%' }} placeholder="Įrašykite el. paštą" value={salesChannel.email} onChange={(e) => onDataChange(e.target.value, "email")} />
                   <p style={{...textStyle}}>Telefono numeris</p>
                   <Input required style={{ width: '100%' }} placeholder="Įrašykite telefono numerį" value={salesChannel.phoneNumber} onChange={(e) => onDataChange(e.target.value, "phoneNumber")} />
                   <p style={{...textStyle}}>Adresas siuntų pristatymui</p>
                   <Input required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={salesChannel.deliveryAddress} onChange={(e) => onDataChange(e.target.value, "deliveryAddress")} />
                    <p style={{...textStyle}}>Nuolaida</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite nuolaidą" value={salesChannel.discount} onChange={(e) => onDataChange(e, "discount")} />
                    <p style={{...textStyle}}>Tarpininkavimo mokestis</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite tarpininkavimo mokestį" value={salesChannel.brokerageFee} onChange={(e) => onDataChange(e, "brokerageFee")} />                    
                    <p style={{ marginBottom: '5px' }}>Atsakingas asmuo</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite atsakingą asmenį"
                        optionFilterProp="children"
                        defaultValue={salesChannel.userId}
                        value={salesChannel.userId}
                        onChange={(e) => onDataChange(e, "userId")}
                    >
                        {usersListReducer.users.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>

                </Form>
            </Modal>
        </>
    )
}

export default UpdateSalesChannelComponent;