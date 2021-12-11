import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input,Image } from 'antd';
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

    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [fileChanged, setFileChanged] = useState(0)

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
        const clone = JSON.parse(JSON.stringify(product));
        if (fileChanged === 0) {
            console.log('IT HAS same image');
            const postObj = {
                "photo": clone.photo,
                "link": clone.link,
                "code": clone.code,
                "category": clone.category,
                "name": clone.name,
                "lengthWithoutPackaging": clone.lengthWithoutPackaging,
                "widthWithoutPackaging": clone.widthWithoutPackaging,
                "heightWithoutPackaging": clone.heightWithoutPackaging,
                "weightGross": clone.weightGross,
                "packagingBoxCode": clone.packagingBoxCode,
                "packingTime": clone.packingTime,
                "serviceId": clone.serviceId,
                "orderId": clone.orderId,

            }
            const reducerObj = {
                "id": clone.id,
                "photo": clone.photo,
                "link": clone.link,
                "code": clone.code,
                "category": clone.category,
                "name": clone.name,
                "lengthWithoutPackaging": clone.lengthWithoutPackaging,
                "widthWithoutPackaging": clone.widthWithoutPackaging,
                "heightWithoutPackaging": clone.heightWithoutPackaging,
                "weightGross": clone.weightGross,
                "packagingBoxCode": clone.packagingBoxCode,
                "packingTime": clone.packingTime,
                "serviceId": clone.serviceId,
                "orderId": clone.orderId,
            }
            // props.save(postObj, reducerObj);
            console.log(JSON.stringify(postObj))
        } else {
            console.log(file)
            const formData = new FormData();
            formData.append("link", clone.link)
            formData.append("code", clone.code)
            formData.append("category", clone.category)
            formData.append("name", clone.name)
            formData.append("lengthWithoutPackaging", clone.lengthWithoutPackaging)
            formData.append("widthWithoutPackaging", clone.widthWithoutPackaging)
            formData.append("heightWithoutPackaging", clone.heightWithoutPackaging)
            formData.append("weightGross", clone.weightGross)
            formData.append("packagingBoxCode", clone.packagingBoxCode)
            formData.append("packingTime", clone.packingTime)
            formData.append("orderId", clone.orderId)
            formData.append("heightWithPackaging", clone.heightWithPackaging)
            formData.append("widthWithPackaging", clone.widthWithPackaging)
            formData.append("lengthWithPackaging", clone.lengthWithPackaging)
            formData.append("weightNetto", clone.weightNetto)
            formData.append("collectionTime", clone.collectionTime)
            formData.append("bondingTime", clone.bondingTime)
            formData.append("paintingTime", clone.paintingTime)
            formData.append("laserTime", clone.laserTime)
            formData.append("milingTime", clone.milingTime)
            formData.append("productMaterials", clone.productMaterials)
            formData.append("file", file)
            formData.append("imageName",clone.imageName)
            props.saveWithImg(formData, clone.id)
        }


    }

    const deleteImage = () => {
        const clone = JSON.parse(JSON.stringify(product))
        // materialClone.imageName = null;
        clone.imagePath = null;
        // dispatch(deleteMaterialImage(material.id, material.imageName))
        setProduct(clone)
    }
    const changeFile = (e) => {
        setFileChanged(1);
        setFile(e.target.files[0])
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
                "imagePath": props.record.imagePath,
                "imageName": props.record.imageName,
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
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto nuotrauka" value={product.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    <p style={{ ...textStyle }}>Produkto nuoroda</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite nuoroda" value={product.link} onChange={(e) => onDataChange(e.target.value, "link")} />
                    <p style={{ ...textStyle }}>Prekės kodas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite prekės kodas" value={product.code} onChange={(e) => onDataChange(e.target.value, "code")} />
                    <p style={{ ...textStyle }}>Produkto kategorija</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto kategorija" value={product.category} onChange={(e) => onDataChange(e.target.value, "category")} />
                    <p style={{ ...textStyle }}>Produkto pavadinimas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite produkto pavadinimas" value={product.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    <p style={{ ...textStyle }}>Ilgis Be pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgis Be pakuotės" value={product.lengthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Ilgis su pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgis su pakuotės" value={product.lengthWithPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithPackaging")} />
                    <p style={{ ...textStyle }}>Plotis Be pakuotė</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite plotis Be pakuotė" value={product.widthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Plotis su pakuotė</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite plotis su pakuotė" value={product.widthWithPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithPackaging")} />
                    <p style={{ ...textStyle }}>Aukštis Be pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštis Be pakuotės" value={product.heightWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Aukštis su pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštis su pakuotės" value={product.heightWithPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithPackaging")} />
                    <p style={{ ...textStyle }}>Svoris Bruto</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite svoris Bruto" value={product.weightGross} onChange={(e) => onDataChange(e.target.value, "weightGross")} />
                    <p style={{ ...textStyle }}>Svoris Netto</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite svoris Netto" value={product.weightNetto} onChange={(e) => onDataChange(e.target.value, "weightNetto")} />
                    <p style={{ ...textStyle }}>Dėžutės kodas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite dėžutės kodas" value={product.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />
                    <p style={{ ...textStyle }}>Pakavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite pakavimo laikas" value={product.packingTime} onChange={(e) => onDataChange(e.target.value, "packingTime")} />
                    <p style={{ ...textStyle }}>surinkimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite surinkimo laikas" value={product.collectionTime} onChange={(e) => onDataChange(e.target.value, "collectionTime")} />

                    <p style={{ ...textStyle }}>Suklijavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Suklijavimo laikas" value={product.bondingTime} onChange={(e) => onDataChange(e.target.value, "bondingTime")} />
                    <p style={{ ...textStyle }}>Lazeriavimo laikas</p>

                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Lazeriavimo laikas" value={product.laserTime} onChange={(e) => onDataChange(e.target.value, "laserTime")} />
                    <p style={{ ...textStyle }}>Dažymo laikas</p>

                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Dažymo laikas" value={product.paintingTime} onChange={(e) => onDataChange(e.target.value, "paintingTime")} />

                    <p style={{ ...textStyle }}>Frezavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite Frezavimo laikas" value={product.milingTime} onChange={(e) => onDataChange(e.target.value, "milingTime")} />
                    {/* FOR IMGAE */}
                    {product.imagePath !== null && product.imagePath !== undefined ?
                        <div>
                            <p style={{ ...textStyle }}>Nuotrauka</p>
                            <Image key={product.imageName} src={product.imagePath} width={100} />
                            <br></br>
                            <Button onClick={deleteImage}>Ištrinti nuotrauką</Button>
                        </div> :
                        <div>
                            <p style={{ ...textStyle }}>Nuotraukos ikėlimas</p>
                            <input required type='file' onChange={changeFile} />
                        </div>}

                    <p style={{ marginBottom: '5px' }}>Medžiagos </p>
                    <Select
                        showSearch
                        mode="multiple"
                        allowClear
                        style={{ width: '320px' }}
                        placeholder="Priskirkite paslaugos"
                        optionFilterProp="children"
                        defaultValue={product.productMaterials}
                        value={product.productMaterials}
                        onChange={(e) => onDataChange(e, "productMaterials")}
                    >
                        {materialsWarehouseReducer.materialsWarehouseData.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.title}</Option>)
                        })}
                    </Select>

                    <p style={{ marginBottom: '5px' }}>Užsakymas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite įsakymas"
                        optionFilterProp="children"
                        defaultValue={product.orderId}
                        value={product.orderId}
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