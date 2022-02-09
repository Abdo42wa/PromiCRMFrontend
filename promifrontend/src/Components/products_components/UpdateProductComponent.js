import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getOrders } from '../../appStore/actions/ordersAction'
import { getMaterialsWarehouseData } from '../../appStore/actions/materialsWarehouseActions'
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

    const [product, setProduct] = useState({});
    const [productServices, setProductServices] = useState([])
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
        }
    }

    const onServiceDataChange = (id, value, record) => {
        const index = productServices.find(x => x.id === id)
        if (index === null) {
            //if there isnt service add it
            console.log(record)
            const obj = {
                ...record,
                "service": null,
                "timeConsumption": value
            }
            setProductServices(prevState => [...prevState, {...obj}])
        } else {
            setProductServices(productServices.map(x => x.id === id ? { ...x, "timeConsumption": value } : x))
        }
        setProduct(prevState => ({
            ...prevState,
            orderServices: prevState.orderServices.map(x => x.id === id ? { ...x, "timeConsumption": value } : x)
        }))
    }

    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(product));
        const materialsArray = [];
        if (fileChanged === 0) {
            const postObj = {
                "orderId": clone.orderId,
                "imageName": clone.imageName,
                "imagePath": clone.imagePath,
                "link": clone.link,
                "code": clone.code,
                "category": clone.category,
                "name": clone.name,
                "lengthWithoutPackaging": clone.lengthWithoutPackaging,
                "widthWithoutPackaging": clone.widthWithoutPackaging,
                "heightWithoutPackaging": clone.heightWithoutPackaging,
                "lengthWithPackaging": clone.lengthWithPackaging,
                "widthWithPackaging": clone.widthWithPackaging,
                "heightWithPackaging": clone.heightWithPackaging,
                "weightGross": clone.weightGross,
                "weightNetto": clone.weightNetto,
                "packagingBoxCode": clone.packagingBoxCode,
                "orderServices": productServices
            }
            const reducerObj = {
                "id": clone.id,
                "imageName": clone.imageName,
                "imagePath": clone.imagePath,
                "link": clone.link,
                "code": clone.code,
                "category": clone.category,
                "name": clone.name,
                "lengthWithoutPackaging": clone.lengthWithoutPackaging,
                "widthWithoutPackaging": clone.widthWithoutPackaging,
                "heightWithoutPackaging": clone.heightWithoutPackaging,
                "lengthWithPackaging": clone.lengthWithPackaging,
                "widthWithPackaging": clone.widthWithPackaging,
                "heightWithPackaging": clone.heightWithPackaging,
                "weightGross": clone.weightGross,
                "weightNetto": clone.weightNetto,
                "packagingBoxCode": clone.packagingBoxCode,
                "orderServices": clone.orderServices
            }
            props.save(postObj,reducerObj)

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
            formData.append("heightWithPackaging", clone.heightWithPackaging)
            formData.append("widthWithPackaging", clone.widthWithPackaging)
            formData.append("lengthWithPackaging", clone.lengthWithPackaging)
            formData.append("weightNetto", clone.weightNetto)
            for(let i=0;i<productServices.length; i++){
                formData.append(
                    `orderServices[${i}].id`,
                    productServices[i].id
                )
                formData.append(
                    `orderServices[${i}].productId`,
                    productServices[i].productId
                )
                formData.append(
                    `orderServices[${i}].serviceId`,
                    productServices[i].serviceId
                )
                formData.append(
                    `orderServices[${i}].timeConsumption`,
                    productServices[i].timeConsumption
                )
            }
            // formData.append("file", file)
            // formData.append("imageName", clone.imageName)
            props.saveWithImg(formData, clone.id, materialsArray)
        }


    }

    const deleteImage = () => {
        const clone = JSON.parse(JSON.stringify(product))
        clone.imagePath = null;
        setProduct(clone)
    }
    const changeFile = (e) => {
        setFileChanged(1);
        setFile(e.target.files[0])
    }
    useEffect(() => {
        dispatch(getOrders())
        dispatch(getMaterialsWarehouseData())
        const obj = {
            ...props.record
        }
        console.log(props.record.orderServices)
        setProduct(obj);
    }, [dispatch, props.record.id]);
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
                    <p style={{ ...textStyle }}>Produkto nuoroda</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite nuorodą" value={product.link} onChange={(e) => onDataChange(e.target.value, "link")} />
                    <p style={{ ...textStyle }}>Prekės kodas</p>
                    <Input required style={{ width: '100%', textTransform: 'uppercase' }} placeholder="Įrašykite prekės kodą" value={product.code} onChange={(e) => onDataChange(e.target.value.toUpperCase(), "code")} />
                    <p style={{ ...textStyle }}>Produkto kategorija</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kategoriją" value={product.category} onChange={(e) => onDataChange(e.target.value, "category")} />
                    <p style={{ ...textStyle }}>Produkto pavadinimas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite pavadinimą" value={product.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    <p style={{ ...textStyle }}>Ilgis Be pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgį" value={product.lengthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Ilgis su pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite ilgį" value={product.lengthWithPackaging} onChange={(e) => onDataChange(e.target.value, "lengthWithPackaging")} />
                    <p style={{ ...textStyle }}>Plotis Be pakuotė</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite plotį" value={product.widthWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Plotis su pakuotė</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite plotį" value={product.widthWithPackaging} onChange={(e) => onDataChange(e.target.value, "widthWithPackaging")} />
                    <p style={{ ...textStyle }}>Aukštis Be pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštiį" value={product.heightWithoutPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithoutPackaging")} />
                    <p style={{ ...textStyle }}>Aukštis su pakuotės</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite aukštį" value={product.heightWithPackaging} onChange={(e) => onDataChange(e.target.value, "heightWithPackaging")} />
                    <p style={{ ...textStyle }}>Svoris Bruto</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite svorį" value={product.weightGross} onChange={(e) => onDataChange(e.target.value, "weightGross")} />
                    <p style={{ ...textStyle }}>Svoris Netto</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite svorį" value={product.weightNetto} onChange={(e) => onDataChange(e.target.value, "weightNetto")} />
                    <p style={{ ...textStyle }}>Dėžutės kodas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kodą" value={product.packagingBoxCode} onChange={(e) => onDataChange(e.target.value, "packagingBoxCode")} />

                    {product.orderServices !== null && product.orderServices !== undefined ?
                        <div>
                            {product.orderServices.map((element, index) => {
                                return (
                                    <div key={index}>
                                        <p>{element.service.name}</p>
                                        <Input key={index} style={{ width: '100%' }} placeholder="Įrašykite lazeriavimo laiką" value={element.timeConsumption} onChange={(e) => onServiceDataChange(element.id, e.target.value, element)} />
                                    </div>
                                )
                            })}
                        </div> : null
                    }
                    
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
                </Form>
            </Modal>
        </>
    )

}

export default UpdateProductComponent;