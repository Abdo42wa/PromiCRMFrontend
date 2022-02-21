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
        "packagingBoxCode": "",
        "laserTime": 0,
        "milingTime": 0,
        "paintingTime": 0,
        "grindingTime": 0,
        "bondingTime": 0,
        "collectionTime": 0,
        "packingTime": 0
    });
    const [productServices, setProductServices] = useState([
        {
            "serviceId": 7,
            "timeConsumption": 0
        }
    ])

    const [file, setFile] = useState();

    const changeFile = (e) => {
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
    const onServicesDataChange = (value, inputName, serviceId) => {
        const index = productServices.findIndex(x => x.serviceId == serviceId)
        if (index === -1) {
            let obj = {
                "serviceId": serviceId,
                "timeConsumption": value
            }
            setProductServices(prevState => [...prevState, obj])
        } else {
            setProductServices(productServices.map(x => x.serviceId === serviceId ? { ...x, "timeConsumption": value } : x))
        }
        setProduct(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }

    const saveChanges = () => {
        const dataProduct = JSON.parse(JSON.stringify(product));
        const servicesClone = JSON.parse(JSON.stringify(productServices))
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
        formData.append("heightWithPackaging", dataProduct.heightWithPackaging)
        formData.append("widthWithPackaging", dataProduct.widthWithPackaging)
        formData.append("lengthWithPackaging", dataProduct.lengthWithPackaging)
        formData.append("weightNetto", dataProduct.weightNetto)
        formData.append("file", file)

        for(let i=0;i<servicesClone.length; i++){
            formData.append(
                `orderServices[${i}].serviceId`,
                servicesClone[i].serviceId
            )
            formData.append(
                `orderServices[${i}].timeConsumption`,
                servicesClone[i].timeConsumption
            )
        }
        props.save(formData);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
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
                footer={null}
            >
                <Form
                    layout="vertical"
                    id="myForm"
                    name="myForm"
                    onFinish={saveChanges}>
                    <Form.Item key="name2" name="name2" label="Nuoroda">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite nuorodą" value={product.link} onChange={(e) => onDataChange(e.target.value, "link")} />
                    </Form.Item>
                    <Form.Item
                        key="name3"
                        name="name3"
                        label=" Prekės kodas"
                        rules={[{ required: true, message: "Įrašykite prekės kodą!" }]}
                    >
                        <Input style={{ width: '100%', textTransform: 'uppercase' }} placeholder="Įrašykite prekės kodą" value={product.code} onChange={(e) => onDataChange(e.target.value.toUpperCase(), "code")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Produkto kategorija">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite kategoriją" value={product.category} onChange={(e) => onDataChange(e.target.value, "category")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Produkto pavadinimas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite pavadinimą" value={product.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Produkto ilgis Be pakuotės">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite ilgį" value={product.lengthWithoutPackaging} onChange={(e) => onDataChange(e, "lengthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Produkto ilgis su pakuote">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite ilgį" value={product.lengthWithPackaging} onChange={(e) => onDataChange(e, "lengthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Produkto plotis Be pakuotės">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite plotį" value={product.widthWithoutPackaging} onChange={(e) => onDataChange(e, "widthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name9" name="name9" label="Produkto plotis su pakuote">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite plotį" value={product.widthWithPackaging} onChange={(e) => onDataChange(e, "widthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name10" name="name10" label="Produkto aukštis Be pakuotės">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite aukštį" value={product.heightWithoutPackaging} onChange={(e) => onDataChange(e, "heightWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="Produkto aukštis su pakuote">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite aukštį" value={product.heightWithPackaging} onChange={(e) => onDataChange(e, "heightWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name12" name="name12" label="Produkto svoris Bruto">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite svorį" value={product.weightGross} onChange={(e) => onDataChange(e, "weightGross")} />
                    </Form.Item>
                    <Form.Item key="name13" name="name13" label="Produkto svoris Netto">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite svorį" value={product.weightNetto} onChange={(e) => onDataChange(e, "weightNetto")} />
                    </Form.Item>
                    <Form.Item key="name14" name="name14" label="Pakuotės dėžutės kodas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite kodą" value={product.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />
                    </Form.Item>
                    <Form.Item key="laserTime" name="laserTime" label="Lazeriavimo laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite lazeriavimo laiką" value={product.laserTime} onChange={(e) => onServicesDataChange(e, "laserTime", 1)} />
                    </Form.Item>
                    <Form.Item key="milingTime" name="milingTime" label="Frezavimo laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite frezavimo laiką" value={product.milingTime} onChange={(e) => onServicesDataChange(e, "milingTime", 2)} />
                    </Form.Item>
                    <Form.Item key="paintingTime" name="paintingTime" label="Dažymo laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite dažymo laiką" value={product.paintingTime} onChange={(e) => onServicesDataChange(e, "paintingTime", 3)} />
                    </Form.Item>
                    <Form.Item key="grindingTime" name="grindingTime" label="Šlifavimo laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite šlifavimo laiką" value={product.grindingTime} onChange={(e) => onServicesDataChange(e, "grindingTime", 4)} />
                    </Form.Item>
                    <Form.Item key="bondingTime" name="bondingTime" label="Suklijavimo laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite suklijavimo laiką" value={product.bondingTime} onChange={(e) => onServicesDataChange(e, "bondingTime", 5)} />
                    </Form.Item>
                    <Form.Item key="collectionTime" name="collectionTime" label="Surinkimo laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite surinkimo laiką" value={product.collectionTime} onChange={(e) => onServicesDataChange(e, "collectionTime", 6)} />
                    </Form.Item>
                    <Form.Item
                        key="packingTime"
                        name="packingTime"
                        label="Pakavimo laikas"
                        initialValue={product.packingTime}>
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite pakavimo laiką" value={product.packingTime} onChange={(e) => onServicesDataChange(e, "packingTime", 7)} />
                    </Form.Item>
                    <p>Nuotrauka</p>
                    <input type="file" onChange={changeFile} />
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit">
                            Pridėti
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddProductComponent;