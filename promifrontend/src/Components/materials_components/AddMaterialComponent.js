import React, {useState, useEffect} from 'react';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function AddMaterialComponent(props){
    const [material, setMaterial] = useState({
        name: "",
        materialUsed: "",
        productId: 0
    });

    const onBack = () =>{
        props.onClose();
    }
    const onCancel = () =>{
        props.onClose();
    }
    const onDataChange = (value, inputName) =>{

    }
    const saveChanges = () =>{
       props.save();
    }

    return (
        <>
        <Modal
                    onCancel={onCancel}
                    saveChanges={saveChanges}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                    title={<Space><ArrowLeftOutlined onClick={onBack} />Pridėti naują materialą</Space>}
                    visible={props.visible}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={onCancel}>Cancel</Button>
                            <Button key="customSubmit" form="myForm" onClick={saveChanges} htmlType="submit" type={'primary'}>Add</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm">
                        <Form.Item key="name" name="name" label="Kompanijos pavadinimas">
                            <Input style={{ width: '100%' }} placeholder="Įrašykite pavadinimą" value={material.name} onChange={(e) => onDataChange(e.target.value)} />
                        </Form.Item>


                    </Form>
                </Modal>
        </>
    )
}

export default AddMaterialComponent;