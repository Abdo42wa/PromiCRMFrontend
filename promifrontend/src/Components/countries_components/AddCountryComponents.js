import React, { useState } from 'react';
import { Modal, Button, Form, Space, Input, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';


const countries = [
    { value: 'Lithuania', continent: 'Europe'},
    { value: 'Austria', continent: 'Europe'},
    { value: 'Belgium', continent: 'Europe'},
    { value: 'Bosnia and Herzegovina', continent: 'Europe'},
    { value: 'Bulgaria', continent: 'Europe'},
    { value: 'Croatia', continent: 'Europe'},
    { value: 'Cyprus', continent: 'Europe'},
    { value: 'Czechia', continent: 'Europe'},
    { value: 'Denmark', continent: 'Europe'},
    { value: 'Estonia', continent: 'Europe'},
    { value: 'Finland', continent: 'Europe'},
    { value: 'France', continent: 'Europe'},
    { value: 'Germany', continent: 'Europe'},
    { value: 'Greece', continent: 'Europe'},
    { value: 'Hungary', continent: 'Europe'},
    { value: 'Iceland', continent: 'Europe'},
    { value: 'Ireland', continent: 'Europe'},
    { value: 'Italy', continent: 'Europe'},
    { value: 'Latvia', continent: 'Europe'},
    { value: 'Liechtenstein', continent: 'Europe'},
    { value: 'Luxembourg', continent: 'Europe'},
    { value: 'Malta', continent: 'Europe'},
    { value: 'Netherlands', continent: 'Europe'},
    { value: 'North Macedonia', continent: 'Europe'},
    { value: 'Norway', continent: 'Europe'},
    { value: 'Poland', continent: 'Europe'},
    { value: 'Portugal', continent: 'Europe'},
    { value: 'Romania', continent: 'Europe'},
    { value: 'Serbia', continent: 'Europe'},
    { value: 'Slovakia', continent: 'Europe'},
    { value: 'Slovenia', continent: 'Europe'},
    { value: 'Spain', continent: 'Europe'},
    { value: 'Sweden', continent: 'Europe'},
    { value: 'Switzerland', continent: 'Europe'},
    { value: 'Turkey', continent: 'Europe'},
    { value: 'United Kingdom', continent: 'Europe'},
]
const { Option } = Select;
function AddCountryComponents(props) {
    const [country, setCountry] = useState({
        name: "Lithuania",
        shortName: "",
        continent: "Europa"
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
                    <p>Pavadinimas</p>
                    <Select style={{ width: '100%' }} onChange={(e) => onDataChange(e, "name")} value={country.name}>
                        {countries.map((element, index) => (
                            <Option key={index} value={element.value}>{element.value}</Option>
                        ))}
                    </Select>
                    <Form.Item key="name2" name="name2" label="Trumpas pavadinimas	">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite trumpinį (LT)" value={country.shortName} onChange={(e) => onDataChange(e.target.value, "shortName")} />
                    </Form.Item>
                    {/* <Form.Item key="name3" name="name3" label="Kontinentas">
                        <Input required style={{ width: '100%' }} placeholder="Įrašykite kontinentas" value={country.continent} onChange={(e) => onDataChange(e.target.value, "continent")} />
                    </Form.Item> */}
                    <p>Kontinentas</p>
                    <Select style={{ width: '100%' }} onChange={(e) => onDataChange(e, "continent")} value={country.continent}>
                        <Option key={'Europa'} value="Europa">Europa</Option>
                        <Option key={'Azija'} value="Azija">Azija</Option>
                        <Option key={'Afrika'} value="Afrika">Afrika</Option>
                        <Option key={'Australija'} value="Australija">Australija</Option>
                        <Option key={'Šiaurės amerika'} value="Šiaurės amerika">Šiaurės amerika</Option>
                        <Option key={'Pietų amerika'} value="Pietų amerika">Pietų amerika</Option>
                    </Select>
                </Form>
            </Modal>
        </>
    )
}

export default AddCountryComponents;