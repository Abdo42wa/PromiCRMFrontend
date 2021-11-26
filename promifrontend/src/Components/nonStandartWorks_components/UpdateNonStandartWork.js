import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMaterials } from '../../Actions/materialsActions'
import { getCustomers } from '../../Actions/customersActions'
import { Modal, Button, Form, Space, Select, Input, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

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


function UpdateNonStandartWorkComponent(props) {
    const dispatch = useDispatch();
    const [nonStandartWork, setNonStandartWork] = useState({});
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
            // let boolValue = false;
            // if (value === 'true') {
            //     boolValue = true;
            // } else {
            //     boolValue = false;
            // }
            setNonStandartWork(prevState => ({
                ...prevState,
                [inputName]: value
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
        const reducerObj = {
            "id": props.record.id,
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
        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        dispatch(getMaterials(() => {
            dispatch(getCustomers(() => {
                const obj = {
                    "id": props.record.id,
                    "orderNumber": props.record.orderNumber,
                    "date": moment(props.record.date).format('YYYY/MM/DD'),
                    "orderDeadline": moment(props.record.orderDeadline).format('YYYY/MM/DD'),
                    "daysUntilDeadline": props.record.daysUntilDeadline,
                    "customerId": props.record.customerId,
                    "device": props.record.device,
                    "plannedProductionTime": props.record.plannedProductionTime,
                    "comment": props.record.comment,
                    "materialId": props.record.materialId,
                    "status": props.record.status
                }
                setNonStandartWork(obj);
            }))
        }));
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti nestandartinį darbą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Užsakymo numeris</p>
                    <InputNumber style={{ width: '100%' }} placeholder="Įrašykite užsakymo numerį" value={nonStandartWork.orderNumber} onChange={(e) => onDataChange(e, "orderNumber")} />
                    <p style={{ ...textStyle }}>Data</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite datą" value={nonStandartWork.date} onChange={(e) => onDataChange(e.target.value, "date")} />
                    <p style={{ ...textStyle }}>Deadline</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite deadline" value={nonStandartWork.orderDeadline} onChange={(e) => onDataChange(e.target.value, "orderDeadline")} />
                    <p style={{ ...textStyle }}>Dienos iki deadline</p>
                    <InputNumber style={{ width: '100%' }} placeholder="Įrašykite dienas iki deadline" value={nonStandartWork.daysUntilDeadline} onChange={(e) => onDataChange(e, "daysUntilDeadline")} />
                    <p style={{ ...textStyle }}>Prietaisas</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite prietaisą" value={nonStandartWork.device} onChange={(e) => onDataChange(e.target.value, "device")} />
                    <p style={{ ...textStyle }}>Suplanuotas laikas</p>
                    <InputNumber style={{ width: '100%' }} placeholder="Įrašykite suplanuotą laiką" value={nonStandartWork.plannedProductionTime} onChange={(e) => onDataChange(e, "plannedProductionTime")} />
                    <p style={{ ...textStyle }}>Komentaras</p>
                    <Input style={{ width: '100%' }} placeholder="Įrašykite komentarą" value={nonStandartWork.comment} onChange={(e) => onDataChange(e.target.value, "comment")} />
                    <p style={{ marginBottom: '5px' }}>Status</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite statusą"
                        optionFilterProp="children"
                        defaultValue={nonStandartWork.status}
                        value={nonStandartWork.status}
                        onChange={(e) => onDataChange(e, "status")}
                    >
                        <Option key={1} value={true}>{'Padarytas'}</Option>
                        <Option key={2} value={false}>{'Nepadarytas'}</Option>
                    </Select>
                    <p style={{ marginBottom: '5px' }}>Klientas</p>
                    <Select
                        showSearch
                        style={{ width: '320px' }}
                        placeholder="Priskirkite klientą"
                        optionFilterProp="children"
                        defaultValue={nonStandartWork.customerId}
                        value={nonStandartWork.customerId}
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
                        defaultValue={nonStandartWork.materialId}
                        value={nonStandartWork.materialId}
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

export default UpdateNonStandartWorkComponent;