import React, { useState, useEffect } from 'react'
import { Form, Button, Modal,Space,Input,InputNumber,Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTypes } from '../../Actions/userAction'

const {Option} = Select;
function AddUserComponent(props) {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: "",
        surname: "",
        phoneNumber: "",
        typeId: 2,
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [message, setMessage] = useState("")
    const userTypesReducer = useSelector((state) => state.userTypesReducer)

    useEffect(() => {
        dispatch(getUserTypes())
    }, [dispatch])

    const onBack = () => {
        props.onClose()
    }
    const onCancel = () => {
        props.onClose()
    }
    const onDataChange = (value, inputName) => {
        setUser(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = (e) => {
        e.preventDefault()

        if (user.password !== user.confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            const {confirmPassword,...postObj} = user;
            props.saveChanges(postObj)
        }
    }

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują naudotoją</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Vardas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite vardą" value={user.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="surname" name="surname" label="Pavardė">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite pavardę" value={user.surname} onChange={(e) => onDataChange(e.target.value, "surname")} />
                    </Form.Item>
                    <Form.Item key="phoneNumber" name="phoneNumber" label="Telefono numeris">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite numerį" value={user.phoneNumber} onChange={(e) => onDataChange(e.target.value, "phoneNumber")} />
                    </Form.Item>
                    <p>Naudotojo tipas</p>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Priskirkite naudotojui tipą"
                        optionFilterProp="children"
                        value={user.typeId}
                        onChange={(e) => onDataChange(e,"typeId")}
                    >
                        {userTypesReducer.userTypes.map((element, index) => {

                            return (<Option key={element.id} value={element.id}>{element.title}</Option>)
                        })}
                    </Select>
                    <Form.Item key="email" name="email" label="El. paštas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite el. paštą" value={user.email} onChange={(e) => onDataChange(e.target.value, "email")} />
                    </Form.Item>
                    <Form.Item key="password" name="password" label="Slaptažodis">
                        <Input type={'password'} required style={{ width: '100%' }} placeholder="Įrašykite slaptažodį" value={user.password} onChange={(e) => onDataChange(e.target.value, "password")} />
                    </Form.Item>
                    <Form.Item key="confirmPassword" name="confirmPassword" label="Pakartokite slaptažodį">
                        <Input type={'password'} required style={{ width: '100%' }} placeholder="Įrašykite slaptažodį" value={user.confirmPassword} onChange={(e) => onDataChange(e.target.value, "confirmPassword")} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )

}

export default AddUserComponent