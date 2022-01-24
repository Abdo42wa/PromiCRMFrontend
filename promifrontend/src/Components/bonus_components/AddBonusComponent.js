import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../appStore/actions/userListActions'
import { Modal, Button, Form, Space, Select, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;

function AddBonusComponent(props) {
    const dispatch = useDispatch();
    const [bonus, setBonus] = useState({
        "userId": "",
        "quantity": 0,
        "accumulated": 0,
        "bonusas": 0

    });
    const usersListReducer = useSelector((state) => state.usersListReducer);


    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setBonus(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const postObj = {
            ...bonus
        }
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują bonusą</Space>}
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
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite Kiekis" value={bonus.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    </Form.Item>
                    <Form.Item key="name1" name="name1" label="Sukaupta">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite Sukaupta" value={bonus.accumulated} onChange={(e) => onDataChange(e, "accumulated")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Bonusas">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite Bonusas" value={bonus.bonusas} onChange={(e) => onDataChange(e, "bonusas")} />
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