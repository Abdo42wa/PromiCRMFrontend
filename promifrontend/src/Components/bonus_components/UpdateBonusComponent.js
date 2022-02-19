import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Space, InputNumber, DatePicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

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


function UpdateBonusComponent(props) {
    const [bonus, setBonus] = useState({});
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
        const obj = JSON.parse(JSON.stringify(bonus));
        const { id, ...postObj } = obj;
        const reducerObj = obj;
        props.save(postObj, reducerObj);
    }
    useEffect(() => {
        const obj = {
            ...props.record
        }
        setBonus(obj);
        // eslint-disable-next-line
    }, [props.record.id]);
    return (
        <>
            <Modal
                onCancel={onCancel}
                saveChanges={saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={onBack} />Atnaujinti bonusą</Space>}
                visible={props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Tikslas per menėsi pagaminti</p>
                    <InputNumber
                        required
                        style={{ width: '100%' }}
                        placeholder="Įrašykite kiekį"
                        value={bonus.quantity}
                        onChange={(e) => onDataChange(e, "quantity")} />
                    <p style={{ ...textStyle }}>Bonusas (€)</p>
                    <InputNumber
                        required
                        style={{ width: '100%' }}
                        placeholder="Įrašykite bonusą (€)"
                        value={bonus.reward}
                        onChange={(e) => onDataChange(e, "bonusas")} />
                    <p style={{ ...textStyle }}>Sukaupta</p>
                    <InputNumber
                        required
                        style={{ width: '100%' }}
                        placeholder="Įrašykite kiek sukaupta šį mėnesį"
                        value={bonus.accumulated}
                        onChange={(e) => onDataChange(e, "accumulated")} />
                    <p style={{ ...textStyle }}>Individualiam bonusui reikiamas operacijų kiekis</p>
                    <InputNumber
                        required
                        style={{ width: '100%' }}
                        placeholder="Įrašykite operacijų kiekį"
                        value={bonus.individualBonusQuantity}
                        onChange={(e) => onDataChange(e, "individualBonusQuantity")} />
                    {bonus.date !== null &&
                        <div>
                            <p style={{ ...textStyle }}>Mėnuo</p>
                            <DatePicker
                                disabled
                                style={{ width: '100%' }}
                                defaultValue={moment(bonus.date)}
                                format={monthFormat}
                                picker="month" />
                        </div>
                    }
                </Form>
            </Modal>
        </>
    )

}

export default UpdateBonusComponent;