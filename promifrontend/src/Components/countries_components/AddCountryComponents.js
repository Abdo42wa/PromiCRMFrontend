import React, { useState } from 'react';
import { Modal, Button, Form, Space, Input, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { countries } from './countriesData'

const { Option } = Select;
function AddCountryComponents(props) {
    const [country, setCountry] = useState({
        name: "Lithuania",
        shortName: "LT",
        continent: "Europe"
    });
    const onCancel = () => {
        props.onClose();
    }
    const onBack = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        if (inputName === "name") {
            let obj = countries.find(x => x.name === value)
            // console.log(obj.code)
            console.log(country.shortName)
            setCountry(prevState => ({
                ...prevState,
                [inputName]: value,
                "shortName": obj.code,
                "continent": obj.continent

            }));
        }
    }
    const saveChanges = () => {
        const countryClone = JSON.parse(JSON.stringify(country));
        const postObj = {
            ...countryClone
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują šalį</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    {/* <Select style={{ width: '100%' }} onChange={(e) => onDataChange(e, "name")} value={country.name}>
                        {countries.map((element, index) => (
                            <Option key={index} name={element.continent} value={element.value}>{element.value}</Option>
                        ))}
                    </Select> */}
                    <Form.Item
                        key="country"
                        name="country"
                        label="Pavadinimas"
                        initialValue={country.name}
                        rules={[{ required: true, message: "Pasirinkite šalį!" }]}
                    >
                        <Select
                            showSearch
                            id="country"
                            value={country.name}
                            onChange={(e) => onDataChange(e, "name")}
                        >
                            {countries.map((element, index) => {
                                return (<Option key={index} value={element.name}>{element.name}</Option>)
                            })}
                        </Select>
                    </Form.Item>
                    {/* <Form.Item 
                    key="short"
                     name="short"
                      label="Trumpas pavadinimas"
                      initialValue={country.shortName}
                      >
                        <Input style={{ width: '100%' }} placeholder="Įrašykite trumpinį (LT)" value={country.shortName} onChange={(e) => onDataChange(e.target.value, "shortName")} />
                    </Form.Item> */}
                    <p>Trumpas pavadinimas</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite trumpinį (LT)" value={country.shortName} />

                    <p>kontinentas</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite kontinenta" value={country.continent} />
                </Form>
            </Modal>
        </>
    )
}

export default AddCountryComponents;