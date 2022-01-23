import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../Actions/userListActions'
import { Modal, Button, Form, Space, Select, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

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


function UpdateBonusComponent(props) {
    const [bonus, setBonus] = useState({});

    const dispatch = useDispatch();
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
        const obj = JSON.parse(JSON.stringify(bonus));
        const { id, ...postObj } = obj;
        const reducerObj = obj;
        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        dispatch(getUsers())
        const obj = {
            ...props.record
        }
        setBonus(obj);
        // eslint-disable-next-line
    }, [dispatch,props.record.id]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti bonusą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Kiekis</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite Kiekis" value={bonus.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    <p style={{ ...textStyle }}>Sukaupta</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite Sukaupta" value={bonus.accumulated} onChange={(e) => onDataChange(e, "accumulated")} />
                    <p style={{ ...textStyle }}>Bonusas</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite Bonusas" value={bonus.bonusas} onChange={(e) => onDataChange(e, "bonusas")} />
                    <p style={{ marginBottom: '5px' }}>Naudotojai</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite naudotojai"
                        optionFilterProp="children"
                        defaultValue={bonus.userId}
                        value={bonus.userId}
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

export default UpdateBonusComponent;