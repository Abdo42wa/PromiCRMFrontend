import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../appStore/actions/userListActions'
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

function AddWeeklyWorkScheduleComponent(props) {
    const dispatch = useDispatch();
    const [works, setWorks] = useState({
        "userId": "",
        "description": "",
        "date": moment().format('YYYY/MM/DD'),
        "done": false,

    });
    const usersListReducer = useSelector((state) => state.usersListReducer);
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setWorks(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const postObj = {
            ...works
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują darbo grafiką</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">

                    <Form.Item key="name" name="name" label="Darbas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite darbo apibūdinimas" value={works.description} onChange={(e) => onDataChange(e.target.value, "description")} />
                    </Form.Item>

                    <Form.Item
                        key="date"
                        name="date"
                        label=" Data"
                        initialValue={works.date}
                        rules={[{ required: true, message: "Įveskite datą!" }]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Įrašykite datą"
                            value={works.date}
                            onChange={(e) => onDataChange(e.target.value, "date")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Naudotojai</p>
                    <Select
                        required
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

export default AddWeeklyWorkScheduleComponent;