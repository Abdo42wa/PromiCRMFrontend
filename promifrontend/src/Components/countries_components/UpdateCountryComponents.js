import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Space, Input, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { countries } from './countriesData'

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
const { Option } = Select;
function UpdateCountryComponent(props) {
    const [country, setCountry] = useState({});

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }

    const onDataChange = (value, inputName) => {
        // setCountry(prevState => ({
        //     ...prevState,
        //     [inputName]: value
        // }));

        if (inputName === "name") {
            let obj = countries.find(x => x.name === value)
            // console.log(obj.code)
            console.log(country.shortName)
            setCountry(prevState => ({
                ...prevState,
                [inputName]: value,
                "shortName": obj.code

            }));
        }
    }
    const saveChanges = () => {
        const { id, ...postObj } = country;
        const reducerObj = country;
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti šalį</Space>}
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
                    {/* <Input required style={{ width: '100%' }} placeholder="Įrašykite pavadinimas" value={country.name} onChange={(e) => onDataChange(e.target.value, "name")} /> */}

                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        id="country"
                        value={country.name}
                        onChange={(e) => onDataChange(e, "name")}
                    >
                        {countries.map((element, index) => {
                            return (<Option key={index} value={element.name}>{element.name}</Option>)
                        })}
                    </Select>
                    <p style={{ ...textStyle }}>Trumpas pavadinimas</p>
                    <Input required style={{ width: '100%' }} placeholder="Įrašykite trumpas pavadinimas" value={country.shortName} onChange={(e) => onDataChange(e.target.value, "shortName")} />
                </Form>
            </Modal>
        </>
    )
}

export default UpdateCountryComponent;