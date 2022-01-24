import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../appStore/actions/userListActions'
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
        setWorks(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const {id,...postObj} = works;
        const reducerObj = works;
        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        dispatch(getUsers())
        setWorks(props.record);
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti darbo grafiką</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Darbas</p>
                    <Input required style={{ width: '100%' }} placeholder="Parašykite darbą" value={works.description} onChange={(e) => onDataChange(e.target.value, "description")} />


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

                            return (<Option id={element.id} key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>

                    <p style={{ marginBottom: '5px' }}>Atlikta</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Pasirinkite vieną iš variantų"
                        optionFilterProp="children"
                        defaultValue={works.done}
                        value={works.done}
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