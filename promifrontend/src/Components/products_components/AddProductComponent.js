import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Space, Input, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Actions/orderAction'
import { getMaterialsWarehouseData } from '../../Actions/materialsWarehouseActions'
const { Option } = Select;

function AddProductComponent(props) {
    const dispatch = useDispatch();

    const orderReducer = useSelector((state) => state.orderReducer);
    const materialsWarehouseReducer = useSelector((state) => state.materialsWarehouseReducer);

    const [products, setProduct] = useState({
        "photo": "",
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
        "packingTime": 0,
        "orderId": 0,

    });


    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {

        if (inputName === 'lengthWithoutPackaging' || inputName === 'lengthWithPackaging' || inputName === "orderId" ||
            inputName === 'widthWithoutPackaging' || inputName === 'widthWithPackaging' || inputName === 'heightWithoutPackaging' || inputName === 'heightWithPackaging' ||
            inputName === 'weightGross' || inputName === 'weightNetto' || inputName === 'packingTime'
            || inputName === 'collectionTime' || inputName === 'bondingTime' || inputName === 'laserTime'
            || inputName === 'paintingTime' || inputName === 'milingTime') {
            setProduct(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else {
            setProduct(prevState => ({
                ...prevState,
                [inputName]: value
            }))

        }
    }
    const saveChanges = () => {
        const dataProduct = JSON.parse(JSON.stringify(products));
        const array = [];
        // console.log("heheheheheheh" + JSON.stringify(productMaterials))
        dataProduct.productMaterials.map((element, index) => {
            const obj = {
                "materialWarehouseId": element
            }
            array.push(obj)
        })
        console.log(JSON.parse(JSON.stringify(products)))
        const postObj = {
            "photo": dataProduct.photo,
            "link": dataProduct.link,
            "code": dataProduct.code,
            "category": dataProduct.category,
            "name": dataProduct.name,
            "lengthWithoutPackaging": dataProduct.lengthWithoutPackaging,
            "widthWithoutPackaging": dataProduct.widthWithoutPackaging,
            "heightWithoutPackaging": dataProduct.heightWithoutPackaging,
            "weightGross": dataProduct.weightGross,
            "packagingBoxCode": dataProduct.packagingBoxCode,
            "packingTime": dataProduct.packingTime,
            "orderId": dataProduct.orderId,
            "heightWithPackaging": dataProduct.heightWithPackaging,
            "widthWithPackaging": dataProduct.widthWithPackaging,
            "lengthWithPackaging": dataProduct.lengthWithPackaging,
            "weightNetto": dataProduct.weightNetto,
            "collectionTime": dataProduct.collectionTime,
            "bondingTime": dataProduct.bondingTime,
            "paintingTime": dataProduct.paintingTime,
            "laserTime": dataProduct.laserTime,
            "milingTime": dataProduct.milingTime,
            "productMaterials": array

        }
        props.save(postObj);
        console.log(JSON.stringify(postObj));
    }
    useEffect(() => {

        dispatch(getOrders(() => {
            dispatch(getMaterialsWarehouseData())
        }));
    }, [dispatch]);

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują Produktas</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">

                    <Form.Item key="name" name="name" label="Produkto nuotrauka">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto nuotrauka" value={products.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Nuoroda">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite nuoroda" value={products.link} onChange={(e) => onDataChange(e.target.value, "link")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label=" Prekės kodas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite prekės kodas" value={products.code} onChange={(e) => onDataChange(e.target.value, "code")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Produkto kategorija">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto kategorija" value={products.category} onChange={(e) => onDataChange(e.target.value, "category")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Produkto pavadinimas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto pavadinimas" value={products.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Produkto ilgis Be pakuotės">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgis Be pakuotės" value={products.lengthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Produkto ilgis su pakuotės">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgis su pakuotės" value={products.lengthWithPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Produkto plotis Be pakuotės">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite plotis Be pakuotė" value={products.widthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name9" name="name9" label="Produkto plotis su pakuotės">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite plotis su pakuotė" value={products.widthWithPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name10" name="name10" label="Produkto aukštis Be pakuotės">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštis Be pakuotės" value={products.heightWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="Produkto aukštis su pakuotės">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštis su pakuotės" value={products.heightWithPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithPackaging")} />
                    </Form.Item>
                    <Form.Item key="name12" name="name12" label="Produkto svoris Bruto">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite svoris Bruto" value={products.weightGross} onChange={(e) => onDataChange(e.target.value, "weightGross")} />
                    </Form.Item>
                    <Form.Item key="name13" name="name13" label="Produkto svoris Netto">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite svoris Netto" value={products.weightNetto} onChange={(e) => onDataChange(e.target.value, "weightNetto")} />
                    </Form.Item>
                    <Form.Item key="name14" name="name14" label="Pakuotės dėžutės kodas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite dėžutės kodas" value={products.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />
                    </Form.Item>
                    <Form.Item key="name15" name="name15" label="Pakavimo laikas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite pakavimo laikas" value={products.packingTime} onChange={(e) => onDataChange(e.target.value, "packingTime")} />
                    </Form.Item>
                    <Form.Item key="name16" name="name16" label="surinkimo laikas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite surinkimo laikas" value={products.collectionTime} onChange={(e) => onDataChange(e.target.value, "collectionTime")} />
                    </Form.Item>
                    <Form.Item key="name17" name="name17" label="Suklijavimo laikas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laikas" value={products.bondingTime} onChange={(e) => onDataChange(e.target.value, "bondingTime")} />
                    </Form.Item>
                    <Form.Item key="name18" name="name18" label="Lazeriavimo laikas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laikas" value={products.laserTime} onChange={(e) => onDataChange(e.target.value, "laserTime")} />
                    </Form.Item>
                    <Form.Item key="name19" name="name19" label="Dažymo laikas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laikas" value={products.paintingTime} onChange={(e) => onDataChange(e.target.value, "paintingTime")} />
                    </Form.Item>
                    <Form.Item key="name20" name="name20" label="Frezavimo laikas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laikas" value={products.milingTime} onChange={(e) => onDataChange(e.target.value, "milingTime")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Mazegos </p>
                    <Select
                        showSearch
                        mode="multiple"
                        allowClear
                        style={{ width: '320px' }}
                        placeholder="Priskirkite paslaugos"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "productMaterials")}
                    >
                        {materialsWarehouseReducer.materialsWarehouseData.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.title}</Option>)
                        })}
                    </Select>

                    <p style={{ marginBottom: '5px' }}>įsakymas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite įsakymas"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "orderId")}
                    >
                        {orderReducer.orders.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.orderNumber}</Option>)
                        })}
                    </Select>

                </Form>
            </Modal>
        </>
    )
}

export default AddProductComponent;