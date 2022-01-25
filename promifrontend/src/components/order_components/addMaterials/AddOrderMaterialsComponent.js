import React from 'react'
import { connect } from 'react-redux'
import { updateManyMaterials } from '../../../appStore/actions/productsActions'
import { getMaterialsWarehouseData } from '../../../appStore/actions/materialsWarehouseActions'
import { getMaterialsByOrder, addOrderMaterial, updateOrderMaterial, deleteOrderMaterial } from '../../../appStore/actions/productMaterials'
import { withRouter } from 'react-router-dom'
import { Button, Form, Modal, Space, Input, InputNumber, Typography, Popconfirm } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import AddNewOrderMaterial from './AddNewOrderMaterial'

class AddOrderMaterialsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // productMaterials: this.props.record.productMaterials,
            // productMaterials: [],
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
        this.props.addOrderMaterial(postObj)
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
        this.props.updateOrderMaterial(obj)
    }
    saveChanges = () => {
        const array = [...this.props.productMaterialsReducer.modified_order_materials]
        this.props.save(array)
    }
    deleteOrder = (id) => {
        this.props.deleteOrderMaterial(id)
    }
    componentDidMount() {
        this.props.getMaterialsWarehouseData()
        this.props.getMaterialsByOrder(this.props.record.id)
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
                        {this.props.productMaterialsReducer.order_materials.map((element, index) => (
                            <div key={element.id} style={{ display: 'flex', justifyContent: 'keft', alignItems: 'center' }}>
                                {element.id !== null && element.id !== undefined?
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Text>Ištrinti</Typography.Text>
                                    <Popconfirm title="Tikrai ištrinti?" onConfirm={() => this.deleteOrder(element.id)}>
                                        <Button type="primary" danger>Ištrinti</Button>
                                    </Popconfirm>
                                </div>:null}

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
                    <AddNewOrderMaterial visible={this.state.addMaterialVisibility} onClose={this.unshowAddMaterialsComponent}
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
        productMaterialsReducer: state.productMaterialsReducer
    }
}
//connect to redux states, define actions
export default connect(mapStateToProps, { updateManyMaterials, getMaterialsWarehouseData, getMaterialsByOrder, addOrderMaterial, updateOrderMaterial,deleteOrderMaterial })(withRouter(AddOrderMaterialsComponent))

