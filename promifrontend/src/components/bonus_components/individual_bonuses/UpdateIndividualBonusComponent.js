import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../appStore/actions/userListActions'
import {updateUserBonus} from '../../../appStore/actions/bonusesActions'
import { Modal, Button, Form, Space, InputNumber, DatePicker, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const {Option} = Select
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
function UpdateIndividualBonusComponent(props) {
    const dispatch = useDispatch()
    const [bonus, setBonus] = useState({});
    const usersListReducer = useSelector((state) => state.usersListReducer)
    const monthFormat = 'YYYY/MM';

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

    const onUserChange = (value, inputName) => {
        let userObj = usersListReducer.users.find(x => x.id === value)
        setBonus(prevState => ({
            ...prevState,
            [inputName]: value,
            user: userObj
        }))
    }
    const saveChanges = () => {
        const obj = JSON.parse(JSON.stringify(bonus));
        const { id, ...postObj } = obj;
        const reducerObj = obj;
        dispatch(updateUserBonus(postObj,reducerObj))
        props.onClose()
    }
    useEffect(() => {
        const obj = {
            ...props.record
        }
        setBonus(obj);
        dispatch(getUsers())
        // eslint-disable-next-line
    }, [props.record.id,dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti individualų bonusą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Darbuotojas</p>
                    <Select
                        defaultValue={bonus.userId}
                        value={bonus.userId}
                        style={{ width: '100%' }}
                        placeholder="Pasirinkite darbuotoją"
                        onChange={(e) => onUserChange(e, "userId")}>
                        {usersListReducer.users.map((element, index) => (
                            <Option value={element.id}>{element.name} {element.surname}</Option>
                        ))}

                    </Select>
                    <p style={{ ...textStyle }}>Bonusas (€)</p>
                    <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite bonusą (€)" value={bonus.reward} onChange={(e) => onDataChange(e, "bonusas")} />
                    {bonus.date !== null &&
                        <div>
                            <p style={{ ...textStyle }}>Mėnuo</p>
                            <DatePicker
                                disabled
                                style={{width: '100%'}}
                                defaultValue={moment(bonus.date)}
                                format={monthFormat}
                                picker="month" />
                        </div>
                    }
                </Form>
            </Modal>
        </>
    )
}

export default UpdateIndividualBonusComponent