import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input, InputNumber, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

function AddNewMaterial(props) {

    const [material, setMaterial] = useState({
        "productId": props.productId,
        "materialWarehouseId": 0,
        "quantity": 1,
        "registerDate": moment().format('YYYY/MM/DD')
    });
    const materialsWarehouseReducer = useSelector((state) => state.materialsWarehouseReducer)

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setMaterial(prevState => ({
            ...prevState,
            [inputName]: Number(value)
        }));
    }
    const saveChanges = () => {
        const obj = materialsWarehouseReducer.materialsWarehouseData.find(x => x.id === material.materialWarehouseId)
        const postObj = {
            "materialWarehouseId": material.materialWarehouseId,
            "productId": material.productId,
            "quantity": material.quantity,
            "registerDate": moment(material.registerDate).format('YYYY/MM/DD'),
            "materialWarehouse": {
                "title": obj.title
            }
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Priskirti naują medžiagą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Typography.Text>Produktas</Typography.Text>
                    <Input style={{ fontSize: '18px' }} disabled value={material.productId} />
                    <Typography.Text>Medžiaga</Typography.Text>
                    <br></br>
                    <Select
                        showSearch
                        style={{ width: '100%', fontSize: '18px', padding: '0px', margin: '0px' }}
                        placeholder="Priskirkite medžiagą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "materialWarehouseId")}
                    >
                        {materialsWarehouseReducer.materialsWarehouseData.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.title}</Option>)
                        })}
                    </Select>
                    <Form.Item key="name" name="name" label="Kiekis">
                        <InputNumber required style={{ width: '100%', fontSize: '18px' }} placeholder="Įrašykite kiekį" value={material.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    </Form.Item>


                </Form>
            </Modal>
        </>
    )
}

export default AddNewMaterial;