import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Actions/orderActions';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment'

const {Option} = Select;

function UpdateWarehouseDataComponent(props) {
    const dispatch = useDispatch();
    const [warehouseData, setWarehouseData] = useState({});

    const ordersReducer = useSelector((state) => state.ordersReducer);
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        // setWarehouseData to what was previously in state and change only that field value that needs to be changed
        if(inputName === 'orderId'){
            setWarehouseData(prevState => ({
                ...prevState,
                [inputName]:Number(value)
            }))
        }else if(inputName === 'quantityProductWarehouse'){
            setWarehouseData(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        }else if(inputName === 'photo'){
            setWarehouseData(prevState => ({
                ...prevState,
                [inputName]:value
            }))
        }
    }
    const saveChanges = () => {
        const dataClone = JSON.parse(JSON.stringify(warehouseData));
        const postObj = {
            "orderId": dataClone.orderId,
            "quantityProductWarehouse": dataClone.quantityProductWarehouse,
            "photo": dataClone.photo,
            "lastTimeChanging": moment().format('YYYY/MM/DD')
        }
        const reducerObj = {
            "id": dataClone.id,
            "orderId": dataClone.orderId,
            "quantityProductWarehouse": dataClone.quantityProductWarehouse,
            "photo": dataClone.photo,
            "lastTimeChanging": moment().format('YYYY/MM/DD')
        }
        props.save(postObj,reducerObj);
    }

    useEffect(() => {
        dispatch(getOrders(() => {
            setWarehouseData(props.record)
        }));
    }, []);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti prie sandėlio</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ marginBottom: '5px' }}>Produktų kiekis</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={warehouseData.quantityProductWarehouse} onChange={(e) => onDataChange(e.target.value, "quantityProductWarehouse")} />
                    <p style={{ marginBottom: '5px' }}>Fotografija</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite fotografiją" value={warehouseData.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                </Form>
                <p style={{ marginBottom: '5px' }}>Užsakymas</p>
                <Select
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite užsakymą"
                    optionFilterProp="children"
                    defaultValue={warehouseData.orderId}
                    value={warehouseData.orderId}
                    onChange={(e) => onDataChange(e, "orderId")}
                >
                    {ordersReducer.orders.map((element, index) => {
                        return (<Option key={element.id} value={element.id}>{element.orderNumber}</Option>)
                    })}
                </Select>
                {/* pasirinkimas pagal uzsakymo nr */}
            </Modal>
        </>
    )
}

export default UpdateWarehouseDataComponent;