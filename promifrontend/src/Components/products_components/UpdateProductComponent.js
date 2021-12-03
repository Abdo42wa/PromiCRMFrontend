import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getOrders } from '../../Actions/orderAction'
import { getMaterialsWarehouseData } from '../../Actions/materialsWarehouseActions'

const { Option } = Select;
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


function UpdateProductComponent(props) {
    const dispatch = useDispatch();

    const orderReducer = useSelector((state) => state.orderReducer);
    const materialsWarehouseReducer = useSelector((state) => state.materialsWarehouseReducer);

    const [products, setProduct] = useState({});

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
            console.log(value);
        }
    }
    const saveChanges = () => {
        const dataProduct = JSON.parse(JSON.stringify(products));
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
        const reducerObj = {
            "id": dataProduct.id,
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
        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        dispatch(getOrders(() => {
            dispatch(getMaterialsWarehouseData())
            const obj = {
                "id": props.record.id,
                "photo": props.record.photo,
                "link": props.record.link,
                "code": props.record.code,
                "category": props.record.category,
                "name": props.record.name,
                "lengthWithoutPackaging": props.record.lengthWithoutPackaging,
                "widthWithoutPackaging": props.record.widthWithoutPackaging,
                "heightWithoutPackaging": props.record.heightWithoutPackaging,
                "weightGross": props.record.weightGross,
                "packagingBoxCode": props.record.packagingBoxCode,
                "packingTime": props.record.packingTime,
                "serviceId": props.record.serviceId,
                "orderId": props.record.orderId,
                "heightWithPackaging": props.record.heightWithPackaging,
                "widthWithPackaging": props.record.widthWithPackaging,
                "lengthWithPackaging": props.record.lengthWithPackaging,
                "weightNetto": props.record.weightNetto,
                "collectionTime": props.record.collectionTime,
                "bondingTime": props.record.bondingTime,
                "paintingTime": props.record.paintingTime,
                "laserTime": props.record.laserTime,
                "milingTime": props.record.milingTime,
                "productMaterials": props.record.productMaterials.map((x) => x.materialWarehouseId)
            }
            setProduct(obj);
            console.log(props.record.productMaterials.map((x) => x.materialWarehouseId))
        }));
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti produktas</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Produkto nuotrauka</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto nuotrauka" value={products.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    <p style={{ ...textStyle }}>Produkto nuoroda</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite nuoroda" value={products.link} onChange={(e) => onDataChange(e.target.value, "link")} />
                    <p style={{ ...textStyle }}>Prekės kodas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite prekės kodas" value={products.code} onChange={(e) => onDataChange(e.target.value, "code")} />
                    <p style={{ ...textStyle }}>Produkto kategorija</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto kategorija" value={products.category} onChange={(e) => onDataChange(e.target.value, "category")} />
                    <p style={{ ...textStyle }}>Produkto pavadinimas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto pavadinimas" value={products.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    <p style={{ ...textStyle }}>Ilgis Be pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgis Be pakuotės" value={products.lengthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Ilgis su pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgis su pakuotės" value={products.lengthWithPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithPackaging")} />
                    <p style={{ ...textStyle }}>Plotis Be pakuotė</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite plotis Be pakuotė" value={products.widthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Plotis su pakuotė</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite plotis su pakuotė" value={products.widthWithPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithPackaging")} />
                    <p style={{ ...textStyle }}>Aukštis Be pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštis Be pakuotės" value={products.heightWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Aukštis su pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštis su pakuotės" value={products.heightWithPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithPackaging")} />
                    <p style={{ ...textStyle }}>Svoris Bruto</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite svoris Bruto" value={products.weightGross} onChange={(e) => onDataChange(e.target.value, "weightGross")} />
                    <p style={{ ...textStyle }}>Svoris Netto</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite svoris Netto" value={products.weightNetto} onChange={(e) => onDataChange(e.target.value, "weightNetto")} />
                    <p style={{ ...textStyle }}>Dėžutės kodas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite dėžutės kodas" value={products.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />
                    <p style={{ ...textStyle }}>Pakavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite pakavimo laikas" value={products.packingTime} onChange={(e) => onDataChange(e.target.value, "packingTime")} />
                    <p style={{ ...textStyle }}>surinkimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite surinkimo laikas" value={products.collectionTime} onChange={(e) => onDataChange(e.target.value, "collectionTime")} />

                    <p style={{ ...textStyle }}>Suklijavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laikas" value={products.bondingTime} onChange={(e) => onDataChange(e.target.value, "bondingTime")} />
                    <p style={{ ...textStyle }}>Lazeriavimo laikas</p>

                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laikas" value={products.laserTime} onChange={(e) => onDataChange(e.target.value, "laserTime")} />
                    <p style={{ ...textStyle }}>Dažymo laikas</p>

                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laikas" value={products.paintingTime} onChange={(e) => onDataChange(e.target.value, "paintingTime")} />

                    <p style={{ ...textStyle }}>Frezavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laikas" value={products.milingTime} onChange={(e) => onDataChange(e.target.value, "milingTime")} />


                    <p style={{ marginBottom: '5px' }}>Mazegos </p>
                    <Select
                        showSearch
                        mode="multiple"
                        allowClear
                        style={{ width: '320px' }}
                        placeholder="Priskirkite paslaugos"
                        optionFilterProp="children"
                        defaultValue={products.productMaterials}
                        value={products.productMaterials}
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
                        defaultValue={products.orderId}
                        value={products.orderId}
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

export default UpdateProductComponent;