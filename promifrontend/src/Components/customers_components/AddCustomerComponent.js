import React, { useState } from 'react';
import { Modal, Button, Form, Space, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function AddCustomerComponent(props) {
    const [customer, setCustomer] = useState({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: ""
    });
    const onCancel = () => {
        props.onClose();
    }
    const onBack = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        // setCustomer to what was already in state, change only that value that needs to be changed
        setCustomer(prevState => ({
            ...prevState,
            [inputName]: value
        }));
    }
    const saveChanges = () => {
        // clone customer state
        const postObj = {
            ...customer
        }
        props.save(postObj);
    }

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują klientą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Vardas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite vardą" value={customer.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Pavardė">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite pavardę" value={customer.lastName} onChange={(e) => onDataChange(e.target.value, "lastName")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="El. paštas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite el. paštą" value={customer.email} onChange={(e) => onDataChange(e.target.value, "email")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Telefono numeris">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite telefono numerį" value={customer.phoneNumber} onChange={(e) => onDataChange(e.target.value, "phoneNumber")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Firmos pavadinimas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite firmos pavadinimą" value={customer.companyName} onChange={(e) => onDataChange(e.target.value, "companyName")} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddCustomerComponent;