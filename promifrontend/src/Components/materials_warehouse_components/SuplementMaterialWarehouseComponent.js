import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMaterialsWarehouseData, updateMaterialWarehouseData } from '../../appStore/actions/materialsWarehouseActions'
import { Modal, Button, Form, Space, Input, InputNumber, Select } from 'antd';
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

class SuplementMaterialWarehouseComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            material: {
                "id": 0,
                "title": "",
                "measuringUnit": "",
                "quantity": 0,
                "info": "",
                "deliveryTime": 0,
                "useDays": 0,
                "lastAdittion": moment().format('YYYY/MM/DD')
            },
            originalMaterial: {},
            selectedMaterial: 0
        }
    }
    onBack = () => {
        this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose();
    }
    onSelectedMaterialChange = (value) => {
        // const clone = JSON.parse(JSON.stringify(this.state.material))
        const dataClone = JSON.parse(JSON.stringify(this.props.materialsWarehouseReducer.materialsWarehouseData));
        dataClone.map((element, index) => {
            if (element.id === value) {
                const materialObj = {
                    "id": element.id,
                    "title": element.title,
                    "measuringUnit": element.measuringUnit,
                    "quantity": 0,
                    "info": element.info,
                    "deliveryTime": element.deliveryTime,
                    "useDays": element.useDays,
                    "lastAdittion": moment(element.lastAdittion).format('YYYY/MM/DD')
                }
                const originalObj = {
                    "id": element.id,
                    "title": element.title,
                    "measuringUnit": element.measuringUnit,
                    "quantity": element.quantity,
                    "info": element.info,
                    "deliveryTime": element.deliveryTime,
                    "useDays": element.useDays,
                    "lastAdittion": moment(element.lastAdittion).format('YYYY/MM/DD')
                }
                this.setState({
                    material: materialObj,
                    originalMaterial: originalObj
                })
            }
        })
    }

    onDataChange = (value, inputName) => {
        //setMaterial to what was in previous state of material and change provided field value
        this.setState(prevState => ({
            material: {
                ...prevState.material,
                [inputName]: value
            }
        }))
    }

    saveChanges = () => {
        const clone = JSON.parse(JSON.stringify(this.state.material));
        let totalQuantity = clone.quantity + this.state.originalMaterial.quantity;
        const postObj = {
            "title": clone.title,
            "measuringUnit": clone.measuringUnit,
            "quantity": totalQuantity,
            "info": clone.info,
            "deliveryTime": clone.deliveryTime,
            "useDays": clone.useDays,
            "lastAdittion": clone.lastAdittion
        }
        const reducerObj = {
            "id": clone.id,
            "title": clone.title,
            "measuringUnit": clone.measuringUnit,
            "quantity": totalQuantity,
            "info": clone.info,
            "deliveryTime": clone.deliveryTime,
            "useDays": clone.useDays,
            "lastAdittion": clone.lastAdittion
        }
        this.props.save(postObj,reducerObj);
    }
    componentDidMount() {
        this.props.getMaterialsWarehouseData();
    }
    render() {
        return (
            <Modal
                onCancel={this.onCancel}
                saveChanges={this.saveChanges}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                title={<Space><ArrowLeftOutlined onClick={this.onBack} />Atnaujinti medžiagą medžiagą</Space>}
                visible={this.props.visible}
                footer={
                    <div>
                        <Button key="customCancel" onClick={this.onCancel}>Atšaukti</Button>
                        <Button key="customSubmit" form="myForm" onClick={this.saveChanges} htmlType="submit" type={'primary'}>Pridėti</Button>
                    </div>
                }
            >
                <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{ ...textStyle }}>Pirmiausia turite pasirinkti medžiagą</p>
                    <Select
                        showSearch
                        style={{ width: '320px', fontSize: '18px' }}
                        placeholder="Pasirinkite medžiagą"
                        optionFilterProp="children"
                        defaultValue={this.state.material.id}
                        value={this.state.material.id}
                        onChange={(e) => this.onSelectedMaterialChange(e)}
                    >
                        {this.props.materialsWarehouseReducer.materialsWarehouseData.map((element, index) => {
                            return (<Option key={element.id} value={element.id}>{element.title}</Option>)
                        })}
                    </Select>
                    {this.state.material.id !== 0 && this.state.material.id !== null && this.state.material.id !== undefined ?
                        <div>
                            <p style={{ ...textStyle }}>Medžiaga</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite medžiagą" disabled={true} value={this.state.material.title} onChange={(e) => this.onDataChange(e.target.value, "title")} />
                            <p style={{ ...textStyle }}>Matavimo vnt.</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite matavimo vienetą" disabled={true} value={this.state.material.measuringUnit} onChange={(e) => this.onDataChange(e.target.value, "measuringUnit")} />
                            <p style={{ ...textStyle }}>Pridėti prie esamo kiekio</p>
                            <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite kiekį" value={this.state.material.quantity} onChange={(e) => this.onDataChange(e, "quantity")} />
                            <p style={{ ...textStyle }}>Papildoma informacija</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite informaciją" disabled={true} value={this.state.material.info} onChange={(e) => this.onDataChange(e.target.value, "info")} />
                            <p style={{ ...textStyle }}>Pristatymo terminas d.d.</p>
                            <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite terminą d.d." disabled={true} value={this.state.material.deliveryTime} onChange={(e) => this.onDataChange(e, "deliveryTime")} />
                            <p style={{ ...textStyle }}>Medžiagos vidutiniškai užteks</p>
                            <InputNumber required style={{ width: '100%' }} placeholder="Įrašykite dienų kiekį" disabled={true} value={this.state.material.useDays} onChange={(e) => this.onDataChange(e, "useDays")} />
                            <p style={{ ...textStyle }}>Paskutinis papildymas</p>
                            <Input required style={{ width: '100%' }} placeholder="Įrašykite papildymo datą" value={this.state.material.lastAdittion} onChange={(e) => this.onDataChange(e.target.value, "lastAdittion")} />
                        </div> : null}
                </Form>
            </Modal>
        )
    }

}

//get redux states
const mapStateToProps = (state) => {
    return {
        materialsWarehouseReducer: state.materialsWarehouseReducer
    }
}

export default connect(mapStateToProps, { getMaterialsWarehouseData })(withRouter(SuplementMaterialWarehouseComponent))