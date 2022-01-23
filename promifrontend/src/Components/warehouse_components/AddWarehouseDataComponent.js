import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Actions/orderAction';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment'

const { Option } = Select;

function AddWarehouseDataComponent(props) {
    const dispatch = useDispatch();
    const [warehouseData, setWarehouseData] = useState({
        "quantityProductWarehouse": 0,
        "lastTimeChanging": moment().format("YYYY/MM/DD"),
        "orderId": 0
    });
    const orderReducer = useSelector((state) => state.orderReducer)
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
        const postObj = {
            ...warehouseData
        }
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getOrders(() => {
            //console.log('Orders:' + ordersReducer.orders)
        }))
    }, [dispatch]);
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
                <p style={{ marginBottom: '5px' }}>Užsakymas</p>
                <Select
                    showSearch
                    style={{ width: '320px' }}
                    placeholder="Priskirkite užsakymą"
                    optionFilterProp="children"
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

export default AddWarehouseDataComponent