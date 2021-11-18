import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Space, Input, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Actions/orderAction'
import { getServices } from '../../Actions/servicesAction'
const { Option } = Select;

function AddProductComponent(props) {
    const dispatch = useDispatch();

    const orderReducer = useSelector((state) => state.orderReducer);
    const servicesReducer = useSelector((state) => state.servicesReducer);

    const [products, setProduct] = useState({
        "photo": "",
        "link": "",
        "code": "",
        "category": "",
        "name": "",
        "lengthWithoutPackaging": 0,
        "widthWithoutPackaging": 0,
        "heightWithoutPackaging": 0,
        "weightGross": 0,
        "packagingBoxCode": "",
        "packingTime": 0,
        "serviceId": 0,
        "orderId": 0
    });


    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {

        if (inputName === 'lengthWithoutPackaging' || inputName === 'serviceId' || inputName === "orderId" ||
            inputName === 'widthWithoutPackaging' || inputName === 'heightWithoutPackaging' ||
            inputName === 'weightGross' || inputName === 'packingTime') {
            setProduct(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else {
            setProduct(prevState => ({
                ...prevState,
                [inputName]: value
            }))
            console.log(value);
        }
    }
    const saveChanges = () => {
        const dataProduct = JSON.parse(JSON.stringify(products));

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
            "serviceId": dataProduct.serviceId,
            "orderId": dataProduct.orderId,

        }
        props.save(postObj);
        console.log(postObj);
    }
    useEffect(() => {

        dispatch(getOrders(() => {
            dispatch(getServices())
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
                        <Input style={{ width: '100%' }} placeholder="Įrašykite produkto nuotrauka" value={products.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Nuoroda">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite nuoroda" value={products.link} onChange={(e) => onDataChange(e.target.value, "link")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label=" Prekės kodas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite prekės kodas" value={products.code} onChange={(e) => onDataChange(e.target.value, "code")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Produkto kategorija">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite produkto kategorija" value={products.category} onChange={(e) => onDataChange(e.target.value, "category")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Produkto pavadinimas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite produkto pavadinimas" value={products.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Produkto ilgis Be pakuotės">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite ilgis Be pakuotės" value={products.lengthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Produkto plotis Be pakuotės">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite plotis Be pakuotė" value={products.widthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name8" name="name8" label="Produkto aukštis Be pakuotės">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite aukštis Be pakuotės" value={products.heightWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithoutPackaging")} />
                    </Form.Item>
                    <Form.Item key="name9" name="name9" label="Produkto svoris Bruto">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite svoris Bruto" value={products.weightGross} onChange={(e) => onDataChange(e.target.value, "weightGross")} />
                    </Form.Item>
                    <Form.Item key="name10" name="name10" label="Pakuotės dėžutės kodas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite dėžutės kodas" value={products.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />
                    </Form.Item>
                    <Form.Item key="name11" name="name11" label="Pakavimo laikas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite pakavimo laikas" value={products.packingTime} onChange={(e) => onDataChange(e.target.value, "packingTime")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Paslaugos </p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite paslaugos"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "serviceId")}
                    >
                        {servicesReducer.services.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
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