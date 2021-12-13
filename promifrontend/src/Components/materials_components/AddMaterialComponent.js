import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getProducts } from '../../Actions/productsActions';
import { getMaterialsWarehouseData } from '../../Actions/materialsWarehouseActions'

const { Option } = Select;

function AddMaterialComponent(props) {
    const dispatch = useDispatch();
    const [material, setMaterial] = useState({
        "productId": 0,
        "materialWarehouseId": 0,
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
        const materialClone = JSON.parse(JSON.stringify(material));
        const postObj = {
            "materialWarehouseId": materialClone.materialWarehouseId,
            "productId": materialClone.productId
        }
        console.log('Post obj:'+JSON.stringify(postObj))
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getProducts(() => {
            // console.log(JSON.stringify(productsReducer.products))
            dispatch(getMaterialsWarehouseData());
        }));
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