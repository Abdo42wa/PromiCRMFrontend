import React from 'react'
import { connect } from 'react-redux'
import { updateManyMaterials } from '../../../appStore/actions/productsActions'
import { getMaterialsWarehouseData } from '../../../appStore/actions/materialsWarehouseActions'
import { withRouter } from 'react-router-dom'
import { Button, Form, Modal, Space, Input, InputNumber, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import AddNewMaterial from './AddNewMaterial'

class AddOrderMaterialsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productMaterials: this.props.record.productMaterials,
            addMaterialVisibility: false
        }
    }
    // For AddMaterialsComponent
    showAddMaterialsComponent = () => {
        this.setState({
            addMaterialVisibility: true
        })
    }
    unshowAddMaterialsComponent = () => {
        this.setState({
            addMaterialVisibility: false
        })
    }
    saveAddMaterialComponent = (postObj) => {
        // add new obj to productMaterials array. keep whats already there
        this.setState(prevState => ({
            productMaterials: [...prevState.productMaterials, postObj],
            addMaterialVisibility: false
        }))
    }

    onBack = () => {
        this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose();
    }
    onDataChange = (value, index) => {
        // //spread operator
        // let productMaterials = [...this.state.productMaterials]
        // //leave whats already in particular obj, change only what need
        // productMaterials[index] = {...productMaterials[index], quantity: value}
        // this.setState({productMaterials})
    }
    saveChanges = () => {
        // this.props.save(this.state.productMaterials)
        const clone = JSON.parse(JSON.stringify(this.state.productMaterials));
        const array = []
        clone.forEach(element => {
            if (element.id === null || element.id === undefined) {
                const obj = {
                    "materialWarehouseId": element.materialWarehouseId,
                    "orderId": element.orderId,
                    "quantity": element.quantity,
                }
                array.push(obj)
            }
        })
        this.props.save(array)
    }
    componentDidMount(){
        this.props.getMaterialsWarehouseData()
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
                                    <Input disabled value={element.materialWarehouse.title} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Text>Kiekis</Typography.Text>
                                    <InputNumber disabled value={element.quantity} onChange={(e) => this.onDataChange(e, index)} />
                                </div>
                            </div>
                        ))}
                        <Button onClick={this.showAddMaterialsComponent}>Pridėti</Button>

                    </Form>
                </Modal>
                {this.state.addMaterialVisibility !== false ?
                    <AddNewMaterial visible={this.state.addMaterialVisibility} onClose={this.unshowAddMaterialsComponent}
                        save={this.saveAddMaterialComponent} orderId={this.props.record.id} />
                    : null}
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
export default connect(mapStateToProps, { updateManyMaterials,getMaterialsWarehouseData })(withRouter(AddOrderMaterialsComponent))

