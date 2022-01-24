import React from 'react'
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getProducts } from '../../appStore/actions/productsActions';
import { getMaterialsWarehouseData } from '../../appStore/actions/materialsWarehouseActions'
import { withRouter } from 'react-router-dom'


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

const { Option } = Select;

class UpdateMaterialComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalMaterial: {},
            material: {},
            products: {}
        }
    }

    onBack = () => {
        this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose();
    }
    onDataChange = (value, inputName) => {
        this.setState(prevState => ({
            material: {
                ...prevState.material,
                [inputName]: value
            }

        }))
    }
    saveChanges = () => {
        // const {id,...postObj} = this.state.material;
        const postObj = {
            "productId": this.state.material.productId,
            "materialWarehouseId": this.state.material.materialWarehouseId,
            "quantity": this.state.material.quantity
        }
        const reducerObj = this.state.material;
        // console.log('Post obj:'+JSON.stringify(postObj))
        // this.props.save(postObj, reducerObj);
        console.log('itessssm post:' + JSON.stringify(postObj))
        console.log('item:' + JSON.stringify(reducerObj))

    }

    componentDidMount() {
        this.props.getProducts(() => {
            this.props.getMaterialsWarehouseData();
            const recordClone = JSON.parse(JSON.stringify(this.props.data));
            this.setState({
                material: recordClone,
                originalMaterial: recordClone
            });
        });
    }

    render() {
        const material = this.state.material;
        return (
            <>
                <Modal
                    onCancel={this.onCancel}
                    saveChanges={this.saveChanges}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Atnaujinti medžiagą</Space>}
                    visible={this.props.visible}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel}>Atšaukti</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm">
                        <p style={{ ...textStyle }}>Kiekis</p>
                        <InputNumber required style={{ width: '100%', fontSize: '18px' }} placeholder="Įrašykite kiekį" value={material.quantity} onChange={(e) => this.onDataChange(e, "quantity")} />
                        <p style={{ ...textStyle }}>Produktas</p>
                        <Select
                            showSearch
                            style={{ width: '320px', fontSize: '18px' }}
                            placeholder="Priskirkite produktą"
                            optionFilterProp="children"
                            defaultValue={this.state.material.productId}
                            value={this.state.material.productId}
                            onChange={(e) => this.onDataChange(e, "productId")}
                        >
                            {this.props.productsReducer.products.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name}</Option>)
                            })}
                        </Select>
                        <p style={{ ...textStyle }}>Medžiaga</p>
                        <Select
                            showSearch
                            style={{ width: '320px', fontSize: '18px' }}
                            placeholder="Priskirkite medžiagą"
                            optionFilterProp="children"
                            defaultValue={this.state.material.materialWarehouseId}
                            value={this.state.material.materialWarehouseId}
                            onChange={(e) => this.onDataChange(e, "materialWarehouseId")}
                        >
                            {this.props.materialsWarehouseReducer.materialsWarehouseData.map((element, index) => {
                                return (<Option key={element.id} value={element.title}>{element.name}</Option>)
                            })}
                        </Select>
                    </Form>
                </Modal>
            </>
        )
    }
}

//get redux states. map them to props
const mapStateToProps = (state) => {
    return {
        productsReducer: state.productsReducer,
        materialsWarehouseReducer: state.materialsWarehouseReducer
    }
}

export default connect(mapStateToProps, { getProducts, getMaterialsWarehouseData })(withRouter(UpdateMaterialComponent))