import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Space, Input, Select, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../appStore/actions/ordersAction'
import { getMaterialsWarehouseData } from '../../appStore/actions/materialsWarehouseActions'
const { Option } = Select;

function AddProductComponent(props) {
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        "link": "",
        "code": "",
        "category": "",
        "productMaterials": [],
        "name": "",
        "lengthWithoutPackaging": 0,
        "lengthWithPackaging": 0,
        "widthWithoutPackaging": 0,
        "widthWithPackaging": 0,
        "heightWithoutPackaging": 0,
        "heightWithPackaging": 0,
        "weightGross": 0,
        "weightNetto": 0,
        "collectionTime": 0,
        "bondingTime": 0,
        "laserTime": 0,
        "paintingTime": 0,
        "milingTime": 0,
        "packagingBoxCode": "",
        "packingTime": 0
    });

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const changeFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name);
    }
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setProduct(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }


    const saveChanges = () => {
        const dataProduct = JSON.parse(JSON.stringify(product));
        const formData = new FormData();
        formData.append("link", dataProduct.link)
        formData.append("code", dataProduct.code)
        formData.append("category", dataProduct.category)
        formData.append("name", dataProduct.name)
        formData.append("lengthWithoutPackaging", dataProduct.lengthWithoutPackaging)
        formData.append("widthWithoutPackaging", dataProduct.widthWithoutPackaging)
        formData.append("heightWithoutPackaging", dataProduct.heightWithoutPackaging)
        formData.append("weightGross", dataProduct.weightGross)
        formData.append("packagingBoxCode", dataProduct.packagingBoxCode)
        formData.append("packingTime", dataProduct.packingTime)
        formData.append("heightWithPackaging", dataProduct.heightWithPackaging)
        formData.append("widthWithPackaging", dataProduct.widthWithPackaging)
        formData.append("lengthWithPackaging", dataProduct.lengthWithPackaging)
        formData.append("weightNetto", dataProduct.weightNetto)
        formData.append("collectionTime", dataProduct.collectionTime)
        formData.append("bondingTime", dataProduct.bondingTime)
        formData.append("paintingTime", dataProduct.paintingTime)
        formData.append("laserTime", dataProduct.laserTime)
        formData.append("milingTime", dataProduct.milingTime)
        formData.append("file", file)
        props.save(formData);
        console.log(dataProduct);
        console.log(file)
    }
    useEffect(() => {
        dispatch(getOrders(() => {
            dispatch(getMaterialsWarehouseData());

        }));
    }, [dispatch, props.visible]);

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują produktą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name2" name="name2" label="Nuoroda">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite nuorodą" value={product.link} onChange={(e) => onDataChange(e.target.value, "link")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label=" Prekės kodas">
                        <Input required style={{ width: '100%', textTransform: 'uppercase' }} placeholder="Įrašykite prekės kodą" value={product.code} onChange={(e) => onDataChange(e.target.value.toUpperCase(), "code")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Produkto kategorija">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kategoriją" value={product.category} onChange={(e) => onDataChange(e.target.value, "category")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Produkto pavadinimas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite pavadinimą" value={product.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Produkto ilgis Be pakuotės">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite ilgį" value={product.lengthWithoutPackaging} onChange={(e) => onDataChange(e, "lengthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Produkto ilgis su pakuote">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite ilgį" value={product.lengthWithPackaging} onChange={(e) => onDataChange(e, "lengthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Produkto plotis Be pakuotės">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite plotį" value={product.widthWithoutPackaging} onChange={(e) => onDataChange(e, "widthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name9" name="name9" label="Produkto plotis su pakuote">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite plotį" value={product.widthWithPackaging} onChange={(e) => onDataChange(e, "widthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name10" name="name10" label="Produkto aukštis Be pakuotės">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite aukštį" value={product.heightWithoutPackaging} onChange={(e) => onDataChange(e, "heightWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="Produkto aukštis su pakuote">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite aukštį" value={product.heightWithPackaging} onChange={(e) => onDataChange(e, "heightWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name12" name="name12" label="Produkto svoris Bruto">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite svorį" value={product.weightGross} onChange={(e) => onDataChange(e, "weightGross")} />
                    </Form.Item>
                    <Form.Item key="name13" name="name13" label="Produkto svoris Netto">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite svorį" value={product.weightNetto} onChange={(e) => onDataChange(e, "weightNetto")} />
                    </Form.Item>
                    <Form.Item key="name14" name="name14" label="Pakuotės dėžutės kodas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kodą" value={product.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />
                    </Form.Item>
                    <Form.Item key="name15" name="name15" label="Pakavimo laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite pakavimo laiką" value={product.packingTime} onChange={(e) => onDataChange(e, "packingTime")} />
                    </Form.Item>
                    <Form.Item key="name16" name="name16" label="Surinkimo laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite surinkimo laiką" value={product.collectionTime} onChange={(e) => onDataChange(e, "collectionTime")} />
                    </Form.Item>
                    <Form.Item key="name17" name="name17" label="Suklijavimo laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite suklijavimo laiką" value={product.bondingTime} onChange={(e) => onDataChange(e, "bondingTime")} />
                    </Form.Item>
                    <Form.Item key="name18" name="name18" label="Lazeriavimo laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite lazeriavimo laiką" value={product.laserTime} onChange={(e) => onDataChange(e, "laserTime")} />
                    </Form.Item>
                    <Form.Item key="name19" name="name19" label="Dažymo laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite dažymo laiką" value={product.paintingTime} onChange={(e) => onDataChange(e, "paintingTime")} />
                    </Form.Item>
                    <Form.Item key="name20" name="name20" label="Frezavimo laikas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite frezavimo laiką" value={product.milingTime} onChange={(e) => onDataChange(e, "milingTime")} />
                    </Form.Item>
                    <p>Nuotrauka</p>
                    <input type="file" onChange={changeFile} />
                </Form>
            </Modal>
        </>
    )
}

export default AddProductComponent;