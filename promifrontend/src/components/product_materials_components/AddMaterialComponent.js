import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getProducts } from '../../appStore/actions/productsActions';
import { getMaterialsWarehouseData } from '../../appStore/actions/materialsWarehouseActions'

const { Option } = Select;

function AddMaterialComponent(props) {
    const dispatch = useDispatch();
    const [material, setMaterial] = useState({
        "productId": 0,
        "materialWarehouseId": 0,
        "quantity": 1,
    });

    const productsReducer = useSelector((state) => state.productsReducer);
    const materialsWarehouseReducer = useSelector((state) => state.materialsWarehouseReducer);

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
        const postObj = {
            ...material
        }
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getProducts(() => {

        }))
        dispatch(getMaterialsWarehouseData());
    }, [dispatch])

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
                    <Form.Item key="name" name="name" label="Kiekis">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={material.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    </Form.Item>
                    <p style={{ marginBottom: '5px' }}>Medžiaga</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite medžiagą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "materialWarehouseId")}
                    >
                        {materialsWarehouseReducer.materialsWarehouseData.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.title}</Option>)
                        })}
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Produktas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite produktą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "productId")}
                    >
                        {productsReducer.products.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>

                </Form>
            </Modal>
        </>
    )
}

export default AddMaterialComponent;