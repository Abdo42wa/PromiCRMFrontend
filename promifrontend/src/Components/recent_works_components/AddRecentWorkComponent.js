import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getUsers } from '../../Actions/userListActions'
import { getProductsByOrder } from '../../Actions/productsActions'
import { getOrders } from '../../Actions/orderAction'
import moment from 'moment'

const { Option } = Select;

function AddRecentWorkComponent(props) {
    const dispatch = useDispatch();
    const [recentWork, setRecentWork] = useState({
        userId: "",
        quantity: 1,
        workTitle: "Supakavimas",
        orderId: 0,
        productId: 0,
        time: moment().format("YYYY/MM/DD, h:mm:ss a"),
    });

    const usersListReducer = useSelector((state) => state.usersListReducer);
    const productsReducer = useSelector((state) => state.productsReducer)
    const orderReducer = useSelector((state) => state.orderReducer)

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setRecentWork(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const onOrderChange = (value, inputName) => {
        setRecentWork(prevState => ({
            ...prevState,
            [inputName]: value
        }))
        dispatch(getProductsByOrder(value))
    }
    const saveChanges = () => {
        const postObj = {
            userId: recentWork.userId,
            quantity: recentWork.quantity,
            workTitle: recentWork.workTitle,
            productId: recentWork.productId,
            time: recentWork.time,
        }
        props.save(postObj);
        // console.log(JSON.stringify(postObj))
    }
    useEffect(() => {
        dispatch(getUsers(() => {
            // console.log(JSON.stringify(productsReducer.products))
            dispatch(getOrders(() => {
            }))
        }));

    }, [dispatch])

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują atliktą darbą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ marginBottom: '5px' }}>Laikas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite datą" value={recentWork.time} onChange={(e) => onDataChange(e.target.value, "time")} />
                    <p style={{ marginBottom: '5px' }}>Kiekis</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={recentWork.quantity} onChange={(e) => onDataChange(e.target.value, "quantity")} />

                    <p style={{ marginBottom: '5px' }}>Darbo pavadinimas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Pasirinkite darbą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "workTitle")}
                        value={recentWork.workTitle}
                    >
                        <Option key={1} value="Supakavimas">Supakavimas</Option>
                        <Option key={2} value="Surinkimas">Surinkimas</Option>
                        <Option key={3} value="Suklijavimas">Suklijavimas</Option>
                        <Option key={4} value="Dažymas">Dažymas</Option>
                        <Option key={5} value="Šlifavimas">Šlifavimas</Option>
                        <Option key={6} value="Frezavimas">Frezavimas</Option>
                        <Option key={7} value="Lazeriavimas">Lazeriavimas</Option>
                    </Select>

                    <p style={{ marginBottom: '5px' }}>Atsakingas asmuo</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite atsakingą asmenį"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "userId")}
                        value={recentWork.userId}
                    >
                        {usersListReducer.users.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Užsakymas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Pasirinkite užsakymą"
                        optionFilterProp="children"
                        onChange={(e) => onOrderChange(e, "orderId")}
                        value={recentWork.orderId}
                    >
                        {orderReducer.orders.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.orderNumber}</Option>)
                        })}
                    </Select>

                    {recentWork.orderId !== 0 ?
                        <div>
                            <p style={{ marginBottom: '5px' }}>Produktas</p>
                            <Select
                                showSearch
                                style={{ width: '320px' }}
                                placeholder="Pasirinkite produktą"
                                optionFilterProp="children"
                                onChange={(e) => onDataChange(e, "productId")}
                                value={recentWork.productId}
                            >
                                {productsReducer.products.map((element, index) => {
                                    return (<Option key={element.id} value={element.id}>{element.code}</Option>)
                                })}
                            </Select>
                        </div>
                        : null}


                </Form>
            </Modal>
        </>
    )
}

export default AddRecentWorkComponent;