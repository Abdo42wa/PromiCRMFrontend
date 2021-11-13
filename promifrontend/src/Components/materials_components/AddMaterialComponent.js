import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getProducts } from '../../Actions/productsActions';

const { Option } = Select;

function AddMaterialComponent(props) {
    const dispatch = useDispatch();
    const [material, setMaterial] = useState({
        name: "",
        materialUsed: "",
        productId: 0
    });

    const productsReducer = useSelector((state) => state.productsReducer);

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        if (inputName === "name") {
            setMaterial(prevState => ({
                ...prevState,
                [inputName]: value
            }));
        } else if (inputName === "materialUsed") {
            setMaterial(prevState => ({
                ...prevState,
                [inputName]: value
            }));
        } else if (inputName === "productId") {
            setMaterial(prevState => ({
                ...prevState,
                [inputName]: value
            }));
        }
    }
    const saveChanges = () => {
        const materialClone = JSON.parse(JSON.stringify(material));
        const postObj = {
            "name": materialClone.name,
            "materialUsed": materialClone.materialUsed,
            "productId": Number(materialClone.productId)
        }
        // console.log('Post obj:'+JSON.stringify(postObj))
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getProducts(() => {
            // console.log(JSON.stringify(productsReducer.products))
        }));
    }, [])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują materialą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Cancel</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Add</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Pavadinimas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite pavadinimą" value={material.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Panaudotas materialas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite panaudotą materialą" value={material.materialUsed} onChange={(e) => onDataChange(e.target.value, "materialUsed")} />
                    </Form.Item>
                    <p style={{ marginBottom: '5px' }}>Kompanija</p>
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