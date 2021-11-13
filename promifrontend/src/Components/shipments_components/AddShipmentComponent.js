import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function AddShipmentComponent(props) {
    const dispatch = useDispatch();
    const [shipment, setShipment] = useState({
        type: "",
        period: 0,
        shippingCost: 0,
        shippingNumber: 0,
        shipmentInfo: ""
    });

    const onCancel = () => {
        props.onClose();
    }
    const onBack = () => {
        props.onClose();
    }

    const saveChanges = () => {
        const shipmentClone = JSON.parse(JSON.stringify(shipment))
        const postObj = {
            type: shipmentClone.type,
            period: shipmentClone.period,
            shippingCost: shipmentClone.shippingCost,
            shippingNumber: shipmentClone.shippingNumber,
            shipmentInfo: shipmentClone.shipmentInfo
        }
        props.save(postObj);
    }

    const onDataChange = (value, inputName) => {
        // const shipmentClone
        if (inputName === 'type') {
            // everyting that was in previous state, and just change 'type'
            setShipment(prevState => ({
                ...prevState,
                [inputName]: value
            }));
        } else if (inputName === 'period') {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }));
        } else if (inputName === 'shippingCost') {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }));
        } else if (inputName === 'shippingNumber') {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }));
        } else if (inputName === 'shipmentInfo') {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: value
            }))
        }

    }
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują pristatymą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Tipas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite tipą" value={shipment.type} onChange={(e) => onDataChange(e.target.value, "type")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Periodas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite periodą" value={shipment.period} onChange={(e) => onDataChange(e.target.value, "period")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="Pristatymo kaina">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite kainą" value={shipment.shippingCost} onChange={(e) => onDataChange(e.target.value, "shippingCost")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Pristatymo numeris">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite numerį" value={shipment.shippingNumber} onChange={(e) => onDataChange(e.target.value, "shippingNumber")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Pristatymo informacija">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite informaciją" value={shipment.shipmentInfo} onChange={(e) => onDataChange(e.target.value, "shipmentInfo")} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddShipmentComponent