import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMaterials } from '../../Actions/materialsActions'
import { getCustomers } from '../../Actions/customersActions'
import { Modal, Button, Form, Space, Select, Input,InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

function AddNonStandartWorkComponent(props) {
    const dispatch = useDispatch();
    const [nonStandartWork, setNonStandartWork] = useState({
        "orderNumber": 0,
        "date": moment().format('YYYY/MM/DD'),
        "orderDeadline": moment().format('YYYY/MM/DD'),
        "daysUntilDeadline": 0,
        "customerId": 0,
        "device": "",
        "plannedProductionTime": 0,
        "comment": "",
        "materialId": 0,
        "status": false
    });
    const materialsReducer = useSelector((state) => state.materialsReducer);
    const customersReducer = useSelector((state) => state.customersReducer);

    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        //setNonStandartWOrk to what was in previous state and change only that fields value thats needed
        if (inputName === 'orderNumber' || inputName === 'daysUntilDeadline' ||
            inputName === 'customerId' || inputName === 'plannedProductionTime' ||
            inputName === 'materialId') {
            setNonStandartWork(prevState => ({
                ...prevState,
                [inputName]: Number(value)
            }))
        } else if (inputName === 'status') {
            let boolValue = false;
            if(value === 'true'){
                boolValue = true;
            }else{
                boolValue = false;
            }
            setNonStandartWork(prevState => ({
                ...prevState,
                [inputName]: boolValue
            }))
        } else {
            setNonStandartWork(prevState => ({
                ...prevState,
                [inputName]: value
            }))
        }
    }
    const saveChanges = () => {
        const dataClone = JSON.parse(JSON.stringify(nonStandartWork));
        const postObj = {
            "orderNumber": dataClone.orderNumber,
            "date": dataClone.date,
            "orderDeadline": dataClone.orderDeadline,
            "daysUntilDeadline": dataClone.daysUntilDeadline,
            "customerId": dataClone.customerId,
            "device": dataClone.device,
            "plannedProductionTime": dataClone.plannedProductionTime,
            "comment": dataClone.comment,
            "materialId": dataClone.materialId,
            "status": dataClone.status
        }
        props.save(postObj);
    }
    useEffect(() => {
        dispatch(getMaterials(() => {
            dispatch(getCustomers(() => {
            }))
        }));
    }, []);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują nestandartinį darbą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    
                    <Form.Item key="name" name="name" label="Užsakymo numeris">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={nonStandartWork.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    </Form.Item>
                    <Form.Item key="name2" name="name2" label="Data">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite datą" value={nonStandartWork.date} onChange={(e) => onDataChange(e.target.value, "date")} />
                    </Form.Item>
                    <Form.Item key="name3" name="name3" label="Užsakymo deadline">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite deadline" value={nonStandartWork.orderDeadline} onChange={(e) => onDataChange(e.target.value, "orderDeadline")} />
                    </Form.Item>
                    <Form.Item key="name4" name="name4" label="Dienos iki deadline">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite dienas iki deadline" value={nonStandartWork.daysUntilDeadline} onChange={(e) => onDataChange(e, "daysUntilDeadline")} />
                    </Form.Item>
                    <Form.Item key="name5" name="name5" label="Užsakymo prietaisas">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite prietaisą" value={nonStandartWork.device} onChange={(e) => onDataChange(e.target.value, "device")} />
                    </Form.Item>
                    <Form.Item key="name6" name="name6" label="Suplanuotas gamybos laikas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite suplanuotą laiką" value={nonStandartWork.plannedProductionTime} onChange={(e) => onDataChange(e, "plannedProductionTime")} />
                    </Form.Item>
                    <Form.Item key="name7" name="name7" label="Komentaras">
                        <Input style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={nonStandartWork.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    </Form.Item>

                    <p style={{ marginBottom: '5px' }}>Status</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite statusą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "status")}
                    >
                        <Option key={1} value={'true'}>{'Padarytas'}</Option>
                        <Option key={2} value={'false'}>{'Nepadarytas'}</Option>
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Klientas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite klientą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "customerId")}
                    >
                        {customersReducer.customers.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.email}</Option>)
                        })}
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Materialas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite materialą"
                        optionFilterProp="children"
                        onChange={(e) => onDataChange(e, "materialId")}
                    >
                        {materialsReducer.materials.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                        })}
                    </Select>

                </Form>
            </Modal>
        </>
    )
}

export default AddNonStandartWorkComponent;