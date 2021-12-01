import react, { useState, useEffect } from 'react';
import { Modal, Button, Form, Space, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

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

function UpdateMaterialWarehouseComponent(props) {
    const [material, setMaterial] = useState({});
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose()
    }
    const onDataChange = (value, inputName) => {
        // setMaterial to what was already in state
        setMaterial(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(material))
        const postObj = {
            "title": clone.title,
            "measuringUnit": clone.measuringUnit,
            "quantity": clone.quantity,
            "info": clone.info,
            "deliveryTime": clone.deliveryTime,
            "useDays": clone.useDays,
            "lastAdittion": clone.lastAdittion
        }
        const reducerObj = {
            "id": clone.id,
            "title": clone.title,
            "measuringUnit": clone.measuringUnit,
            "quantity": clone.quantity,
            "info": clone.info,
            "deliveryTime": clone.deliveryTime,
            "useDays": clone.useDays,
            "lastAdittion": clone.lastAdittion
        }
        props.save(postObj, reducerObj)
    }
    useEffect(()=>{
        const obj = {
            "id": props.record.id,
            "title": props.record.title,
            "measuringUnit": props.record.measuringUnit,
            "quantity": props.record.quantity,
            "info": props.record.info,
            "deliveryTime": props.record.deliveryTime,
            "useDays": props.record.useDays,
            "lastAdittion": moment(props.record.lastAdittion).format('YYYY/MM/DD')
        }
        setMaterial(obj)
    },[])
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti medžiagą medžiagą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Medžiaga</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite medžiagą" value={material.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    <p style={{ ...textStyle }}>Matavimo vnt.</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite matavimo vienetą" value={material.measuringUnit} onChange={(e) => onDataChange(e.target.value, "measuringUnit")} />
                    <p style={{ ...textStyle }}>Esamas kiekis</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite esamą kiekį" value={material.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    <p style={{ ...textStyle }}>Papildoma informacija</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite informaciją" value={material.info} onChange={(e) => onDataChange(e.target.value, "info")} />
                    <p style={{ ...textStyle }}>Pristatymo terminas d.d.</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite terminą d.d." value={material.deliveryTime} onChange={(e) => onDataChange(e, "deliveryTime")} />
                    <p style={{ ...textStyle }}>Medžiagos vidutiniškai užteks</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite dienų kiekį" value={material.useDays} onChange={(e) => onDataChange(e, "useDays")} />
                    <p style={{ ...textStyle }}>Paskutinis papildymas</p>
                    <Input required defaultValue={material.lastAdittion} style={{ width: '100%' }} placeholder="Įrašykite papildymo datą" value={material.lastAdittion} onChange={(e) => onDataChange(e.target.value, "lastAdittion")} />
                </Form>
            </Modal>
        </>
    )
}

export default UpdateMaterialWarehouseComponent;