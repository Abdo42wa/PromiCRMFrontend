import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Space, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

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
function UpdateCustomerComponent(props) {
    const [customer, setCustomer] = useState({});

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    // setCustomer to what was already in state, change only that value that needs to be changed
    // all values are strings so i dont need to convert any of them to Numbers
    const onDataChange = (value, inputName) => {
        setCustomer(prevState => ({
            ...prevState,
            [inputName]: value
        }));
    }
    const saveChanges = () => {
        //clone customer state. i dont like to access it directly
        const customerClone = JSON.parse(JSON.stringify(customer));
        const {id,...postObj} = customerClone;
        const reducerObj = customerClone;
        props.save(postObj, reducerObj);
    }
    //onComponent load set customer
    useEffect(() => {
        setCustomer(props.record)
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti klientą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Vardas</p>
                    <Input key={'name'} required style={{ width: '100%' }} placeholder="Įrašykite vardą" value={customer.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    <p style={{ ...textStyle }}>Pavardė</p>
                    <Input key={'surname'} required style={{ width: '100%' }} placeholder="Įrašykite pavardę" value={customer.lastName} onChange={(e) => onDataChange(e.target.value, "lastName")} />
                    <p style={{ ...textStyle }}>El. paštas</p>
                    <Input key={'email'} required style={{ width: '100%' }} placeholder="Įrašykite el. paštą" value={customer.email} onChange={(e) => onDataChange(e.target.value, "email")} />
                    <p style={{ ...textStyle }}>Telefono numeris</p>
                    <Input key={'telephone'} required style={{ width: '100%' }} placeholder="Įrašykite telefono numerį" value={customer.phoneNumber} onChange={(e) => onDataChange(e.target.value, "phoneNumber")} />
                    <p style={{ ...textStyle }}>Firmos pavadinimas</p>
                    <Input key={'company'} required style={{ width: '100%' }} placeholder="Įrašykite firmos pavadinimą" value={customer.companyName} onChange={(e) => onDataChange(e.target.value, "companyName")} />
                </Form>
            </Modal>
        </>
    )
}

export default UpdateCustomerComponent;