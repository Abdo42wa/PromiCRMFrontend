import React from 'react'
import { connect } from 'react-redux'
import { updateManyMaterials } from '../../appStore/actions/productsActions'
import { withRouter } from 'react-router-dom'
import { Button, Form, Modal, Space, Input, InputNumber, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

class ProductMaterialsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productMaterials: this.props.record.productMaterials,
            addMaterialsVisibility: false,
            originalProductMaterials: this.props.record.productMaterials
        }
    }
    // For AddMaterialsComponent
    showAddMaterialsComponent = () =>{ 
        this.setState({
            addMaterialsVisibility:true
        })
    }
    unshowAddMaterialsComponent = () =>{ 
        this.setState({
            addMaterialsVisibility:false
        })
    }
    saveAddMaterialComponent = (postObj) => {
        this.setState(prevState => ({
            productMaterials: [...prevState.productMaterials, postObj]
        }))
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
        let originalMaterials = [...this.state.originalProductMaterials]
        //leave whats already in particular obj, change only what need
        productMaterials[index] = {...productMaterials[index], quantity: value}
        let newQuantity = value - originalMaterials[index].quantity;
        productMaterials[index] = {...productMaterials[index], subtractQuantity: newQuantity}
        this.setState({productMaterials})
    }
    saveChanges = () => {
        this.props.save(this.state.productMaterials)
        // console.log(JSON.stringify(this.state.productMaterials))
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
                            <div key={element.id} style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Text>Pavadinimas</Typography.Text>
                                    <Input key={'title'} disabled value={element.materialWarehouse.title} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Text>Kiekis</Typography.Text>
                                    <InputNumber key={'quantity'} value={element.quantity} onChange={(e) => this.onDataChange(e, index)} />
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
export default connect(mapStateToProps, { updateManyMaterials })(withRouter(ProductMaterialsComponent))

