import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getOrders } from '../../Actions/orderActions';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment'

const {Option} = Select;

function AddWarehouseDataComponent(props) {
    const dispatch = useDispatch();
    const [warehouseData, setWarehouseData] = useState({
        "quantityProductWarehouse": 0,
        "photo": "",
        "lastTimeChanging": moment().format("YYYY/MM/DD"),
        "orderId": 0
    });
    const ordersReducer = useSelector((state) => state.ordersReducer)
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        //setWarehouseData to what was already in state and change only needed value
        setWarehouseData(prevState => ({
            ...prevState,
            [inputName]: value
        }));
    }
    const saveChanges = () => {
        const dataClone = JSON.parse(JSON.stringify(warehouseData));
        const postObj = {
            "orderId": dataClone.orderId,
            "quantityProductWarehouse": dataClone.quantityProductWarehouse,
            "photo": dataClone.photo,
            "lastTimeChanging": dataClone.lastTimeChanging
        }
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getOrders(() => {
            console.log('Orders:'+ordersReducer.orders)
        }))
    },[]);
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
                    <Form.Item key="name1" name="name1" label="Kiekis sandėlyje">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={warehouseData.quantityProductWarehouse} onChange={(e) => onDataChange(e.target.value, "quantityProductWarehouse")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Fotografija">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite fotografiją" value={warehouseData.photo} onChange={(e) => onDataChange(e.target.value, "photo")} />
                    </Form.Item>
                </Form>
                <p style={{ marginBottom: '5px' }}>Užsakymas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite užsakymą"
                        optionFilterProp="children"
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

export default AddWarehouseDataComponent