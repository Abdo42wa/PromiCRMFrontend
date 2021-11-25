import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../Actions/userListActions'
import { Modal, Button, Form, Space, Select, Input } from 'antd';
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


function UpdateWeeklyWorkScheduleComponent(props) {
    const dispatch = useDispatch();
    const [works, setWorks] = useState({});
    const usersListReducer = useSelector((state) => state.usersListReducer);


    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {


        if (inputName === 'orderNumber') {
            setWorks(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else {
            setWorks(prevState => ({
                ...prevState,
                [inputName]: value
            }))
        }
    }
    const saveChanges = () => {
        const dataWork = JSON.parse(JSON.stringify(works));
        const postObj = {
            "userId": dataWork.userId,
            "darbasApibūdinimas": dataWork.darbasApibūdinimas,
            "atlikta": dataWork.atlikta,
        }
        const reducerObj = {
            "id": props.record.id,
            "userId": props.record.userId,
            "darbasApibūdinimas": props.record.darbasApibūdinimas,
            "atlikta": props.record.atlikta,
        }
        props.save(postObj, reducerObj);
        console.log(reducerObj);
        console.log(postObj);

    }
    useEffect(() => {
        dispatch(getUsers(() => {
            const obj = {
                "id": props.record.id,
                "userId": props.record.userId,
                "darbasApibūdinimas": props.record.darbasApibūdinimas,
                "atlikta": props.record.atlikta
            }
            setWorks(obj);

        }))
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti Darbo</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Darbo apibūdinimas</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite darbo apibūdinimas" value={works.darbasApibūdinimas} onChange={(e) => onDataChange(e.target.value, "darbasApibūdinimas")} />


                    <p style={{ marginBottom: '5px' }}>Naudotojai</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite naudotojai"
                        optionFilterProp="children"
                        defaultValue={works.userId}
                        value={works.userId}
                        onChange={(e) => onDataChange(e, "userId")}
                    >
                        {usersListReducer.users.map((element, index) => {

                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>

                    <p style={{ marginBottom: '5px' }}>Status</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite viena"
                        optionFilterProp="children"
                        defaultValue={works.atlikta}
                        value={works.atlikta}
                        onChange={(e) => onDataChange(e, "atlikta")}
                    >
                        <Option key={1} value={true}>{'Atlikta'}</Option>
                        <Option key={2} value={false}>{'Neatlikta'}</Option>
                    </Select>
                </Form>
            </Modal>
        </>
    )

}

export default UpdateWeeklyWorkScheduleComponent;