import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Space, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment'

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

function AddMaterialWarehouseComponent(props) {
    const [material, setMaterial] = useState({
        "title": "",
        "measuringUnit": "",
        "quantity": 0,
        "info": "",
        "deliveryTime": 0,
        "useDays": 0,
        "lastAdittion": moment().format('YYYY/MM/DD'),
    });
    const [file, setFile] = useState();

    const changeFile = (e) => {
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name);
    }
    const onBack = () => {
        props.onClose()
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        //set material to what was in previous state and change value thats provided
        setMaterial(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const formData = new FormData();
        formData.append("title",material.title);
        formData.append("measuringUnit",material.measuringUnit);
        formData.append("quantity",material.quantity);
        formData.append("info",material.info);
        formData.append("deliveryTime",material.deliveryTime);
        formData.append("useDays",material.useDays);
        formData.append("lastAdittion",material.lastAdittion);
        formData.append("file",file);
        props.save(formData);
    }

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują medžiagą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Medžiaga">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite medžiagą" value={material.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Matavimo vnt.">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite matavimo vienetą" value={material.measuringUnit} onChange={(e) => onDataChange(e.target.value, "measuringUnit")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="Esamas kiekis">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite esamą kiekį" value={material.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Papildoma informacija">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite informaciją" value={material.info} onChange={(e) => onDataChange(e.target.value, "info")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Pristatymo terminas d.d.">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite terminą d.d." value={material.deliveryTime} onChange={(e) => onDataChange(e, "deliveryTime")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Medžiagos vidutiniškai užteks">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite dienų kiekį" value={material.useDays} onChange={(e) => onDataChange(e, "useDays")} />
                    </Form.Item>
                    <p>Nuotrauka</p>
                    <input type="file" onChange={changeFile} />
                    <p>Paskutinis papildymas</p>
                    <Input required defaultValue={material.filePath} style={{ width: '100%' }} placeholder="Įrašykite papildymo datą" value={material.lastAdittion} onChange={(e) => onDataChange(e.target.value, "lastAdittion")} />
                </Form>
            </Modal>
        </>
    )

}

export default AddMaterialWarehouseComponent;

