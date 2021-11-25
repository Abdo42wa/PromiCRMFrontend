import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../Actions/userListActions'
import { Modal, Button, Form, Space, Select, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;

function AddBonusComponent(props) {
    const dispatch = useDispatch();
    const [bonus, setBonus] = useState({
        "userId": "",
        "quantity": 0,
        "accumulated": 0,
        "bonusas": 0,
        "leftUntil": 0

    });
    const usersListReducer = useSelector((state) => state.usersListReducer);


    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {

        if (inputName === 'quantity' || inputName === 'accumulated'
            || inputName === 'bonusas' || inputName === 'leftUntil') {
            setBonus(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else {
            setBonus(prevState => ({
                ...prevState,
                [inputName]: value
            }))
            console.log(value);
        }
    }
    const saveChanges = () => {
        const dataWork = JSON.parse(JSON.stringify(bonus));
        //const dataClone = orders;
        console.log(JSON.parse(JSON.stringify(bonus)))
        const postObj = {
            "userId": dataWork.userId,
            "quantity": dataWork.quantity,
            "accumulated": dataWork.accumulated,
            "bonusas": dataWork.bonusas,
            "leftUntil": dataWork.leftUntil,
        }
        props.save(postObj);
        console.log(postObj)
    }
    useEffect(() => {

        dispatch(getUsers(() => {

        }));
    }, [dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują bonusas</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">

                    <Form.Item key="name" name="name" label="Kiekis">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite Kiekis" value={bonus.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    </Form.Item>
                    <Form.Item key="name1" name="name1" label="Sukaupta">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite Sukaupta" value={bonus.accumulated} onChange={(e) => onDataChange(e, "accumulated")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Bonusas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite Bonusas" value={bonus.bonusas} onChange={(e) => onDataChange(e, "bonusas")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="Liko iki">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite Liko iki" value={bonus.leftUntil} onChange={(e) => onDataChange(e, "leftUntil")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Naudotojai</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite naudotojai"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "userId")}
                    >
                        {usersListReducer.users.map((element, index) => {

                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>


                </Form>
            </Modal>
        </>
    )
}

export default AddBonusComponent;