import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input,InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getUsers } from '../../Actions/userListActions'

const { Option } = Select;

function AddSalesChannelComponent(props) {
    const dispatch = useDispatch();
    const [salesChannel, setSalesChannel] = useState({
        title: "",
        contactPerson: "",
        email: "",
        phoneNumber: "",
        deliveryAddress: "",
        discount: 0,
        brokerageFee: 0,
        userId: ""
    });

    const usersListReducer = useSelector((state) => state.usersListReducer);

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setSalesChannel(prevState => ({
            ...prevState,
            [inputName]: value
        }));    
    }
    const saveChanges = () => {
        const postObj = salesChannel;
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getUsers(() => {
            // console.log(JSON.stringify(productsReducer.products))
        }));
    }, [dispatch])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują pardavimo kanalą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Pavadinimas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite pavadinimą" value={salesChannel.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Kontaktinis asmuo">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kontaktinis asmenį" value={salesChannel.contactPerson} onChange={(e) => onDataChange(e.target.value, "contactPerson")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="El. paštas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite el. paštą" value={salesChannel.email} onChange={(e) => onDataChange(e.target.value, "email")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Telefono numeris">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite telefono numerį" value={salesChannel.phoneNumber} onChange={(e) => onDataChange(e.target.value, "phoneNumber")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Adresas siuntų pristatymui">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite adresą" value={salesChannel.deliveryAddress} onChange={(e) => onDataChange(e.target.value, "deliveryAddress")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Nuolaida">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite nuolaidą" value={salesChannel.discount} onChange={(e) => onDataChange(e, "discount")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Tarpininkavimo mokestis">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite tarpininkavimo mokestį" value={salesChannel.brokerageFee} onChange={(e) => onDataChange(e, "brokerageFee")} />
                    </Form.Item>
                    <p style={{ marginBottom: '5px' }}>Atsakingas asmuo</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite atsakingą asmenį"
                        optionFilterProp="children"
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

export default AddSalesChannelComponent;