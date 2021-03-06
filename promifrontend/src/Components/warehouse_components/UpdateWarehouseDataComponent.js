import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../appStore/actions/ordersAction';
import { Modal, Button, Form, Space, Select, Input, Image, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment'

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
function UpdateWarehouseDataComponent(props) {
    const dispatch = useDispatch();
    const [warehouseData, setWarehouseData] = useState({});
    // const [file, setFile] = useState();
    // const [fileChanged, setFileChanged] = useState(0)
    const orderReducer = useSelector((state) => state.orderReducer);

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        // setWarehouseData to what was previously in state and change only that field value that needs to be changed
        setWarehouseData(prevState => ({
            ...prevState,
            [inputName]: Number(value)
        }))
    }
    const saveChanges = () => {
        const { id, ...obj } = warehouseData;
        const postObj = {
            ...obj,
            "lastTimeChanging": moment().format('YYYY/MM/DD'),
        }
        const reducerObj = {
            ...postObj,
            "id": warehouseData.id
        }
        props.save(postObj, reducerObj);
        // const formData = new FormData();
        // formData.append("orderId", clone.orderId);
        // formData.append("quantityProductWarehouse", clone.quantityProductWarehouse);
        // formData.append("lastTimeChanging", moment().format('YYYY/MM/DD'));
        // formData.append("file", file);
        // formData.append("imageName", clone.imageName);
        // props.saveWithImg(formData, clone.id)

    }
    // const deleteImage = () => {
    //     const clone = JSON.parse(JSON.stringify(warehouseData))
    //     // materialClone.imageName = null;
    //     clone.imagePath = null;
    //     // dispatch(deleteMaterialImage(material.id, material.imageName))
    //     setWarehouseData(clone)
    // }
    // const changeFile = (e) => {
    //     setFileChanged(1);
    //     setFile(e.target.files[0])
    // }
    useEffect(() => {
        dispatch(getOrders(() => {
            setWarehouseData(props.record)
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti sand??lio produkt??</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>At??aukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ marginBottom: '5px' }}>Produkt?? kiekis</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="??ra??ykite kiek??" value={warehouseData.quantityProductWarehouse} onChange={(e) => onDataChange(e, "quantityProductWarehouse")} />
                </Form>
                {/* for IMAGE */}
                {/* {warehouseData.imagePath !== null && warehouseData.imagePath !== undefined ?
                        <div>
                            <p style={{ ...textStyle }}>Nuotrauka</p>
                            <Image key={warehouseData.imageName} src={warehouseData.imagePath} width={100} />
                            <br></br>
                            <Button onClick={deleteImage}>I??trinti nuotrauk??</Button>
                        </div> :
                        <div>
                            <p style={{ ...textStyle }}>Nuotraukos ik??limas</p>
                            <input required type='file' onChange={changeFile} />
                        </div>} */}
                <p style={{ marginBottom: '5px' }}>U??sakymas</p>
                <Select
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite u??sakym??"
                    optionFilterProp="children"
                    defaultValue={warehouseData.orderId}
                    value={warehouseData.orderId}
                    onChange={(e) => onDataChange(e, "orderId")}
                >
                    {orderReducer.orders.map((element, index) => {
                        return (<Option key={element.id} value={element.id}>{element.orderNumber}</Option>)
                    })}
                </Select>
                {/* pasirinkimas pagal uzsakymo nr */}
            </Modal>
        </>
    )
}

export default UpdateWarehouseDataComponent;