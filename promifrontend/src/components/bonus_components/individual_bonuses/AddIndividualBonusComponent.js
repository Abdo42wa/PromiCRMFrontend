import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../../appStore/actions/userListActions'
import {createUserBonus} from '../../../appStore/actions/bonusesActions'
import { Modal, Button, Form, Space, InputNumber, DatePicker, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
function AddIndividualBonusComponent(props) {
    const dispatch = useDispatch()
    const [bonus, setBonus] = useState({
        "userId": null,
        "date": moment(),
        "reward": 0
    })
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
    const saveChanges = () => {
        const postObj = {
            ...bonus
        }
        dispatch(createUserBonus(postObj))
        props.onClose()
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <Modal
            onCancel={onCancel}
            saveChanges={saveChanges}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: false }}
            title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują individualų bonusą</Space>}
            visible={props.visible}
            footer={
                <div>
                    <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                    <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                </div>
            }
        >
            <Form layout="vertical" id="myForm" name="myForm">
                <Form.Item key="userId" name="userId" label="Darbuotojas">
                    <Select
                        defaultValue={bonus.userId}
                        value={bonus.userId}
                        style={{ width: '100%' }}
                        placeholder="Pasirinkite darbuotoją"
                        onChange={(e) => onDataChange(e, "userId")}>
                        {usersListReducer.users.map((element, index) => (
                            <Option value={element.id}>{element.name} {element.surname}</Option>
                        ))}

                    </Select>
                </Form.Item>
                <Form.Item key="reward" name="reward" label="Bonusas">
                    <InputNumber style={{ width: '100%' }} placeholder="Įrašykite bonusą" value={bonus.reward} onChange={(e) => onDataChange(e, "reward")} />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Mėnesis"
                    rules={[{ required: true, message: "Prašau pasirinkti datą!", type: 'object' }]}>
                    <DatePicker defaultValue={bonus.date} value={bonus.date} format={monthFormat} picker="month" onChange={(date, dateString) => onDataChange(dateString, "date")} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddIndividualBonusComponent