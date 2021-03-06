import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Space, Input, InputNumber, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { deleteMaterialImage } from '../../appStore/actions/materialsWarehouseActions'

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

function UpdateMaterialWarehouseComponent(props) {
    const dispatch = useDispatch();
    const [material, setMaterial] = useState({});
    const [file, setFile] = useState();
    const [fileChanged, setFileChanged] = useState(0)
    const materialsWarehouseReducer = useSelector((state) => state.materialsWarehouseReducer);
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose()
    }
    const onDataChange = (value, inputName) => {
        // setMaterial to what was already in state
        setMaterial(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(material))
        if (fileChanged === 0) {
            console.log('IT HAS same image')
            const postObj = {
                "title": clone.title,
                "measuringUnit": clone.measuringUnit,
                "quantity": clone.quantity,
                "info": clone.info,
                "deliveryTime": clone.deliveryTime,
                "useDays": clone.useDays,
                "lastAdittion": clone.lastAdittion,
                "imagePath": clone.imagePath,
                "imageName": clone.imageName
            }
            const reducerObj = {
                "id": clone.id,
                "title": clone.title,
                "measuringUnit": clone.measuringUnit,
                "quantity": clone.quantity,
                "info": clone.info,
                "deliveryTime": clone.deliveryTime,
                "useDays": clone.useDays,
                "lastAdittion": clone.lastAdittion,
                "imagePath": clone.imagePath,
                "imageName": clone.imageName
            }
            props.save(postObj, reducerObj)
            console.log(postObj)
        } else {
            console.log(file)
            const formData = new FormData();
            formData.append("title", material.title);
            formData.append("measuringUnit", material.measuringUnit);
            formData.append("quantity", material.quantity);
            formData.append("info", material.info);
            formData.append("deliveryTime", material.deliveryTime);
            formData.append("useDays", material.useDays);
            formData.append("lastAdittion", material.lastAdittion);
            formData.append("file", file);
            formData.append("imageName",material.imageName)
            props.saveWithImg(formData,clone.id)
        }

    }
    const deleteImage = () => {
        const materialClone = JSON.parse(JSON.stringify(material))
        // materialClone.imageName = null;
        materialClone.imagePath = null;
        // dispatch(deleteMaterialImage(material.id, material.imageName))
        setMaterial(materialClone)
    }
    const changeFile = (e) => {
        setFileChanged(1);
        setFile(e.target.files[0])
    }

    useEffect(() => {
        const obj = {
            "id": props.record.id,
            "title": props.record.title,
            "measuringUnit": props.record.measuringUnit,
            "quantity": props.record.quantity,
            "info": props.record.info,
            "deliveryTime": props.record.deliveryTime,
            "useDays": props.record.useDays,
            "lastAdittion": moment(props.record.lastAdittion).format('YYYY/MM/DD'),
            "imagePath": props.record.imagePath,
            "imageName": props.record.imageName
        }
        setMaterial(obj)
    }, [])
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti med??iag?? med??iag??</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>At??aukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Med??iaga</p>
                    <Input required style={{ width: '100%' }} placeholder="??ra??ykite med??iag??" value={material.title} onChange={(e) => onDataChange(e.target.value, "title")} />
                    <p style={{ ...textStyle }}>Matavimo vnt.</p>
                    <Input required style={{ width: '100%' }} placeholder="??ra??ykite matavimo vienet??" value={material.measuringUnit} onChange={(e) => onDataChange(e.target.value, "measuringUnit")} />
                    <p style={{ ...textStyle }}>Esamas kiekis</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="??ra??ykite esam?? kiek??" value={material.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    <p style={{ ...textStyle }}>Papildoma informacija</p>
                    <Input required style={{ width: '100%' }} placeholder="??ra??ykite informacij??" value={material.info} onChange={(e) => onDataChange(e.target.value, "info")} />
                    <p style={{ ...textStyle }}>Pristatymo terminas d.d.</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="??ra??ykite termin?? d.d." value={material.deliveryTime} onChange={(e) => onDataChange(e, "deliveryTime")} />
                    <p style={{ ...textStyle }}>Med??iagos vidutini??kai u??teks</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="??ra??ykite dien?? kiek??" value={material.useDays} onChange={(e) => onDataChange(e, "useDays")} />
                    <p style={{ ...textStyle }}>Paskutinis papildymas</p>
                    <Input required defaultValue={material.lastAdittion} style={{ width: '100%' }} placeholder="??ra??ykite papildymo dat??" value={material.lastAdittion} onChange={(e) => onDataChange(e.target.value, "lastAdittion")} />
                    {material.imagePath !== null && material.imagePath !== undefined ?
                        <div>
                            <p style={{ ...textStyle }}>Nuotrauka</p>
                            <Image key={material.imageName} src={material.imagePath} width={100} />
                            <br></br>
                            <Button onClick={deleteImage}>I??trinti nuotrauk??</Button>
                        </div> :
                        <div>
                            <p style={{ ...textStyle }}>Nuotraukos ik??limas</p>
                            <input required type='file' onChange={changeFile} />
                        </div>}


                    {/* {material.imagePath === "" || material.imagePath === null?
                    <Button onClick={deleteImage}>Prideti nuotrauk??</Button>: null} */}
                </Form>
            </Modal>
        </>
    )
}

export default UpdateMaterialWarehouseComponent;