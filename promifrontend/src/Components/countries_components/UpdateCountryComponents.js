import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Space, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

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
function UpdateCountryComponent(props) {
    const [country, setCountry] = useState({});

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }

    const onDataChange = (value, inputName) => {
        setCountry(prevState => ({
            ...prevState,
            [inputName]: value
        }));
    }
    const saveChanges = () => {

        const countryClone = JSON.parse(JSON.stringify(country));
        const postObj = {
            "name": countryClone.name,
            "shortName": countryClone.shortName,
            "continent": countryClone.continent,

        }
        const reducerObj = {
            "id": countryClone.id,
            "name": countryClone.name,
            "shortName": countryClone.shortName,
            "continent": countryClone.continent,
        }
        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        setCountry(props.record)
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti šaly</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Pavadinimas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite pavadinimas" value={country.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    <p style={{ ...textStyle }}>Trumpas pavadinimas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite trumpas pavadinimas" value={country.shortName} onChange={(e) => onDataChange(e.target.value, "shortName")} />
                    <p style={{ ...textStyle }}>kontinentas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite kontinentas" value={country.continent} onChange={(e) => onDataChange(e.target.value, "continent")} />
                </Form>
            </Modal>
        </>
    )
}

export default UpdateCountryComponent;