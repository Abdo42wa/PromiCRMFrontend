import React, { useState } from 'react';
import { Modal, Button, Form, Space, InputNumber, DatePicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

function AddBonusComponent(props) {
    const [bonus, setBonus] = useState({
        "quantity": 0,
        "accumulated": 0,
        "reward": 0,
        "date": moment()

    });
    const monthFormat = 'YYYY/MM';
    const onBack = () => {
        props.onClose();
    }
    const onCancel = () => {
        props.onClose();
    }
    const onDataChange = (value, inputName) => {
        setBonus(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const saveChanges = () => {
        const postObj = {
            ...bonus
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
                title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują bonusą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">

                    <Form.Item key="quantity" name="quantity" label="Tikslas per menėsi pagaminti">
                        <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={bonus.quantity} onChange={(e) => onDataChange(e, "quantity")} />
                    </Form.Item>
                    <Form.Item key="reward" name="reward" label="Bonusas">
                        <InputNumber style={{ width: '100%' }} placeholder="Įrašykite bonusą" value={bonus.reward} onChange={(e) => onDataChange(e, "reward")} />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Mėnesis"
                        rules={[{ required: true, message: "Prašau pasirinkti datą!", type: 'object' }]}>
                        <DatePicker defaultValue={bonus.date} value={bonus.date} format={monthFormat} picker="month" onChange={(date, dateString) => onDataChange(dateString, "date")} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddBonusComponent;