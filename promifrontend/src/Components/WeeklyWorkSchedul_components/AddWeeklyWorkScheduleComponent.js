import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../Actions/userListActions'
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Option } = Select;

function AddWeeklyWorkScheduleComponent(props) {
    const dispatch = useDispatch();
    const [works, setWorks] = useState({
        "userId": "",
        "description": "",
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

        if (inputName === '') {
            setWorks(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else {
            setWorks(prevState => ({
                ...prevState,
                [inputName]: value
            }))
            console.log(value);
        }
    }
    const saveChanges = () => {
        const dataWork = JSON.parse(JSON.stringify(works));
        //const dataClone = orders;
        console.log(JSON.parse(JSON.stringify(works)))
        const postObj = {
            "userId": dataWork.userId,
            "description": dataWork.description,
            "done": dataWork.done
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

export default AddWeeklyWorkScheduleComponent;