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

function UpdateShipmentComponent(props) {
    const [shipment, setShipment] = useState({});

    const onCancel = () => {
        props.onClose();
    }

    const onBack = () => {
        props.onClose();
    }

    const onDataChange = (value, inputName) => {
        if (inputName === "type") {
            //setShipment all that was in previous just change "type" value
            setShipment(prevState => ({
                ...prevState,
                [inputName]: value
            }));
        } else if (inputName === "period") {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else if (inputName === "shipmentCost") {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else if (inputName === "shippingNumber") {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else if (inputName === "shipmentInfo") {
            setShipment(prevState => ({
                ...prevState,
                [inputName]: value
            }))
        }
    }

    const saveChanges = () => {
        const shipmentClone = JSON.parse(JSON.stringify(shipment));
        const postObj = {
            "type": shipmentClone.type,
            "period": shipmentClone.period,
            "shipmentCost": shipmentClone.shipmentCost,
            "shippingNumber": shipmentClone.shippingNumber,
            "shipmentInfo": shipmentClone.shipmentInfo
        }
        const reducerObj = {
            "id": shipmentClone.id,
            "type": shipmentClone.type,
            "period": shipmentClone.period,
            "shipmentCost": shipmentClone.shipmentCost,
            "shippingNumber": shipmentClone.shippingNumber,
            "shipmentInfo": shipmentClone.shipmentInfo
        }

        props.save(postObj, reducerObj);
    }

    useEffect(() => {
        setShipment(props.record)
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti pristatymą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Pristatymo Tipas</p>
                    < Input required style={{ width: '100%' }} placeholder="Įrašykite tipą" value={shipment.type} onChange={(e) => onDataChange(e.target.value, "type")} />
                    <p style={{ ...textStyle }}>Pristatymo Periodas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite periodą" value={shipment.period} onChange={(e) => onDataChange(e.target.value, "period")} />
                    <p style={{ ...textStyle }}>Pristatymo kaina</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kainą" value={shipment.shippingCost} onChange={(e) => onDataChange(e.target.value, "shippingCost")} />
                    <p style={{ ...textStyle }}>Pristatymo numeris</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite numerį" value={shipment.shippingNumber} onChange={(e) => onDataChange(e.target.value, "shippingNumber")} />
                    <p style={{ ...textStyle }}>Pristatymo informacija</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite informaciją" value={shipment.shipmentInfo} onChange={(e) => onDataChange(e.target.value, "shipmentInfo")} />

                </Form>
            </Modal>
        </>
    )
}

export default UpdateShipmentComponent;