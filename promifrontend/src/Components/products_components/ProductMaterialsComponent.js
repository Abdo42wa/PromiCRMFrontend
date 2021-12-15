import React from 'react'
import { connect } from 'react-redux'
import { getMaterialsWarehouseData, updateMaterialWarehouseData } from '../../Actions/materialsWarehouseActions'
import { getMaterialsByProduct, updateManyMaterials } from '../../Actions/materialsActions';
import { withRouter } from 'react-router-dom'
import { Button, Form, Modal, Space, Input, InputNumber, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

class ProductMaterialsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productMaterials: this.props.record.productMaterials
        }
    }
    onBack = () => {
        this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose();
    }
    onDataChange = (value, index) => {
        //spread operator
        let productMaterials = [...this.state.productMaterials]
        //leave whats already in particular obj, change only what need
        productMaterials[index] = {...productMaterials[index], quantity: value}
        this.setState({productMaterials})
    }
    saveChanges = () => {
        const postObj = JSON.parse(JSON.stringify(this.state.productMaterials))
        this.props.save(postObj)
    }
    componentDidMount() {
        // const clone = JSON.parse(JSON.stringify(this.props.materialsReducer.materials))
    }
    render() {
        return (
            <>
                <Modal
                    onCancel={this.onCancel}
                    saveChanges={this.saveChanges}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Medžiagos</Space>}
                    visible={this.props.visible}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel}>Atšaukti</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.saveChanges} htmlType="submit" type={'primary'}>Išsaugoti</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm">
                        {this.state.productMaterials.map((element, index) => (
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Text>Pavadinimas</Typography.Text>
                                    <Input disabled value={element.materialWarehouse.title} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Text>Kiekis</Typography.Text>
                                    <InputNumber value={element.quantity} onChange={(e) => this.onDataChange(e, index)} />
                                </div>
                            </div>
                        ))}
                        

                    </Form>
                </Modal>
            </>
        )
    }
}
//get redux states
const mapStateToProps = (state) => {
    return {
        materialsWarehouseReducer: state.materialsWarehouseReducer,
        materialsReducer: state.materialsReducer
    }
}
//connect to redux states, define actions
export default connect(mapStateToProps, { getMaterialsByProduct, getMaterialsWarehouseData, updateManyMaterials, updateMaterialWarehouseData })(withRouter(ProductMaterialsComponent))

