import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getOrders } from '../../Actions/orderAction'
import { getMaterialsWarehouseData } from '../../Actions/materialsWarehouseActions'
import { getMaterialsByProduct, createMaterial, getMaterials } from '../../Actions/materialsActions'
import AddMaterialComponent from '../materials_components/AddMaterialComponent';
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
    const materialsReducer = useSelector((state) => state.materialsReducer)

    const [product, setProduct] = useState({});
    // const [productMaterials, setProductMaterials] = useState([])
    const [file, setFile] = useState();
    const [fileChanged, setFileChanged] = useState(0)
    const [addMaterialVisibility, setAddMaterialVisibility] = useState(false)

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

    // const onMaterialChange = (value, id) => {
    //     const array = JSON.parse(JSON.stringify(productMaterials))
    //     array.forEach(element => {
    //         if (element.id === id) {
    //             element.materialWarehouseId = value;
    //         }
    //     });
    //     setProductMaterials(array)
    // }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(product));
        // const clone1 = JSON.parse(JSON.stringify(productMaterials))
        const materialsArray = [];
        // just materialsArray without all unnecessary things

        // clone1.forEach(element => {
        //     const obj = {
        //         "id": element.id,
        //         "productId": element.productId,
        //         "materialWarehouseId": element.materialWarehouseId
        //     }
        //     materialsArray.push(obj);
        // })
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
                "collectionTime": clone.collectionTime,
                "bondingTime": clone.bondingTime,
                "paintingTime": clone.paintingTime,
                "laserTime": clone.laserTime,
                "milingTime": clone.milingTime,
                "packagingBoxCode": clone.packagingBoxCode,
                "packingTime": clone.packingTime
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
                "collectionTime": clone.collectionTime,
                "bondingTime": clone.bondingTime,
                "paintingTime": clone.paintingTime,
                "laserTime": clone.laserTime,
                "milingTime": clone.milingTime,
                "packagingBoxCode": clone.packagingBoxCode,
                "packingTime": clone.packingTime
            }

            props.save(postObj, reducerObj, materialsArray);
            // console.log(JSON.stringify(postObj))
            // console.log(JSON.stringify(materialsArray))
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
            formData.append("heightWithPackaging", clone.heightWithPackaging)
            formData.append("widthWithPackaging", clone.widthWithPackaging)
            formData.append("lengthWithPackaging", clone.lengthWithPackaging)
            formData.append("weightNetto", clone.weightNetto)
            formData.append("collectionTime", clone.collectionTime)
            formData.append("bondingTime", clone.bondingTime)
            formData.append("paintingTime", clone.paintingTime)
            formData.append("laserTime", clone.laserTime)
            formData.append("milingTime", clone.milingTime)
            // formData.append("productMaterials", materialsArray)
            formData.append("file", file)
            formData.append("imageName", clone.imageName)
            props.saveWithImg(formData, clone.id, materialsArray)
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

    const showAddMaterial = () => {
        setAddMaterialVisibility(true)
        console.log('show')
    }

    const unshowAddMaterial = () => {
        setAddMaterialVisibility(false)
    }

    const saveAddMaterial = (postObject) => {
        dispatch(createMaterial(postObject, () => {
            // const array = JSON.parse(JSON.stringify(productMaterials))
            // array.push(postObject);
            // setProductMaterials(oldArray => [...oldArray, postObject])
            // setAddMaterialVisibility(false)
        }));
    }

    useEffect(() => {
        dispatch(getOrders(() => {
            dispatch(getMaterialsWarehouseData())
            const obj = {
               ...props.record
                // "productMaterials": props.record.productMaterials.map((x) => x.materialWarehouseId)
            }
            // dispatch(getMaterialsByProduct(props.record.id, () =>{
            //     setProductMaterials(props.record.productMaterials)
            // }))
            setProduct(obj);
            // setProductMaterials(props.record.productMaterials)
            // setProductMaterials(props.record.productMaterials);
        }));
    }, [dispatch, props.record.id, props.record]);
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
                    <p style={{ ...textStyle }}>Pakavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite pakavimo laiką" value={product.packingTime} onChange={(e) => onDataChange(e.target.value, "packingTime")} />
                    <p style={{ ...textStyle }}>surinkimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite surinkimo laiką" value={product.collectionTime} onChange={(e) => onDataChange(e.target.value, "collectionTime")} />

                    <p style={{ ...textStyle }}>Suklijavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite suklijavimo laiką" value={product.bondingTime} onChange={(e) => onDataChange(e.target.value, "bondingTime")} />
                    <p style={{ ...textStyle }}>Lazeriavimo laikas</p>

                    <Input required style={{ width: '100%' }} placeholder="Įrašykite lazeriavimo laiką" value={product.laserTime} onChange={(e) => onDataChange(e.target.value, "laserTime")} />
                    <p style={{ ...textStyle }}>Dažymo laikas</p>

                    <Input required style={{ width: '100%' }} placeholder="Įrašykite dažymo laiką" value={product.paintingTime} onChange={(e) => onDataChange(e.target.value, "paintingTime")} />

                    <p style={{ ...textStyle }}>Frezavimo laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite frezavimo laiką" value={product.milingTime} onChange={(e) => onDataChange(e.target.value, "milingTime")} />
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

                    {/* <p style={{ marginBottom: '5px' }}>Medžiagos </p>
                    {productMaterials.length > 0 ?
                        <div>
                            {productMaterials.map((element, index) => (
                                <Select
                                    showSearch
                                    // mode="multiple"
                                    allowClear
                                    style={{ width: '320px' }}
                                    placeholder="Priskirkite medžiagą"
                                    optionFilterProp="children"
                                    // defaultValue={element.id}
                                    value={element.materialWarehouseId}
                                    onChange={(e) => onMaterialChange(e, element.id)}
                                >
                                    {materialsWarehouseReducer.materialsWarehouseData.map((element, index) => {
                                        return (<Option key={element.id} value={element.id}>{element.title}</Option>)
                                    })}
                                </Select>
                            ))}
                        </div>
                        : null}
                    {productMaterials.length <= 5 ?
                        <Button onClick={showAddMaterial}>
                            Pridėti medžiagą
                        </Button> : null} */}


                </Form>

            </Modal>
            {/* {addMaterialVisibility !== false ?
                <AddMaterialComponent save={saveAddMaterial} onClose={unshowAddMaterial}
                    visible={addMaterialVisibility}
                /> : null} */}
        </>
    )

}

export default UpdateProductComponent;