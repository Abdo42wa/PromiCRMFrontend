import React from 'react'
import { connect } from 'react-redux'
import {  addProductMaterial, updateProductMaterial, deleteProductMaterial, getProductMaterials} from '../../../appStore/actions/productsActions'
import { getMaterialsWarehouseData } from '../../../appStore/actions/materialsWarehouseActions'
import { withRouter } from 'react-router-dom'
import { Button, Form, Modal, Space, Input, InputNumber, Typography,Popconfirm } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import AddNewMaterial from './AddNewMaterial'

class AddProductMaterialsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        this.props.addProductMaterial(postObj)
        this.unshowAddMaterialsComponent()
    }

    onBack = () => {
        this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose();
    }
    onDataChange = (value, inputName, record) => {
        const obj = {
            ...record,
            [inputName]: value
        }
        this.props.updateProductMaterial(obj)
    }
    saveChanges = () => {
        const array = [...this.props.productsReducer.modified_product_materials]
        this.props.save(array)
    }
    deleteProduct = (id) => {
        this.props.deleteProductMaterial(id)
    }
    componentDidMount(){
        this.props.getProductMaterials(this.props.record.productMaterials)
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
                        {this.props.productsReducer.product_materials.map((element, index) => (
                            <div key={element.id} style={{ display: 'flex', justifyContent: 'keft', alignItems: 'center' }}>
                                {element.id !== null && element.id !== undefined ?
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography.Text>Ištrinti</Typography.Text>
                                        <Popconfirm title="Tikrai ištrinti?" onConfirm={() => this.deleteProduct(element.id)}>
                                            <Button type="primary" danger>Ištrinti</Button>
                                        </Popconfirm>
                                    </div> : null}

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Text>Pavadinimas</Typography.Text>
                                    <Input disabled value={element.materialWarehouse.title} />
                                </div>
                                {element.id !== null && element.id !== undefined ?
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography.Text>Kiekis</Typography.Text>
                                        <InputNumber value={element.quantity} onChange={(e) => this.onDataChange(e, "quantity", element)} />
                                    </div> :
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography.Text>Kiekis</Typography.Text>
                                        <InputNumber disabled value={element.quantity} />
                                    </div>
                                }
                                

                            </div>
                        ))}
                        <Button onClick={this.showAddMaterialsComponent}>Pridėti</Button>
                    </Form>
                </Modal>
                {this.state.addMaterialVisibility !== false ?
                    <AddNewMaterial visible={this.state.addMaterialVisibility} onClose={this.unshowAddMaterialsComponent}
                        save={this.saveAddMaterialComponent} productId={this.props.record.id} />
                    : null}
            </>
        )
    }
}
//get redux states
const mapStateToProps = (state) => {
    return {
        materialsWarehouseReducer: state.materialsWarehouseReducer,
        productsReducer: state.productsReducer
    }
}
//connect to redux states, define actions
export default connect(mapStateToProps, { getProductMaterials,getMaterialsWarehouseData, addProductMaterial, updateProductMaterial, deleteProductMaterial })(withRouter(AddProductMaterialsComponent))

