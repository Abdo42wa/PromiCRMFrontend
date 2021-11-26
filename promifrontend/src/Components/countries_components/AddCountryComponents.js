import React, { useState } from 'react';
import { Modal, Button, Form, Space, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function AddCountryComponents(props) {
    const [country, setCountry] = useState({
        name: "",
        shortName: "",
        continent: ""
    });
    const onCancel = () => {
        props.onClose();
    }
    const onBack = () => {
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
        props.save(postObj);
    }

    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują šaly</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <Form.Item key="name" name="name" label="Pavadinimas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite pavadinimas" value={country.name} onChange={(e) => onDataChange(e.target.value, "name")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Trumpas pavadinimas	">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite trumpas pavadinimas" value={country.shortName} onChange={(e) => onDataChange(e.target.value, "shortName")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="kontinentas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kontinentas" value={country.continent} onChange={(e) => onDataChange(e.target.value, "continent")} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddCountryComponents;