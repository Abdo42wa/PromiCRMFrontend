import React from 'react'
import { connect } from 'react-redux';
import { Modal, Button, Form, Space, Select, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getProducts } from '../../Actions/productsActions';
import { withRouter } from 'react-router-dom'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles.js';

const aboutTitleTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    marginBottom: '16px',
}

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
        const materialClone = JSON.parse(JSON.stringify(this.state.material));
        if (inputName === "name") {
            materialClone.name = value;
        } else if (inputName === "materialUsed") {
            materialClone.materialUsed = value;
        } else if (inputName === "productId") {
            materialClone.productId = Number(value);
        }
        this.setState({
            material: materialClone
        }, console.log('Material changed:'+JSON.stringify(this.state.material)));
    }
    saveChanges = () => {
        const materialClone = JSON.parse(JSON.stringify(this.state.material));
        const postObj = {
            "name": materialClone.name,
            "materialUsed": materialClone.materialUsed,
            "productId": Number(materialClone.productId)
        }

        const reducerObj = {
            "id": materialClone.id,
            "name": materialClone.name,
            "materialUsed": materialClone.materialUsed,
            "productId": Number(materialClone.productId)
        }
        // console.log('Post obj:'+JSON.stringify(postObj))
        this.props.save(postObj, materialClone.id, reducerObj);
    }

    componentDidMount() {
        this.props.getProducts(() => {
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
                    title={<Space><ArrowLeftOutlined onClick={this.onBack} />Atnaujinti materialą</Space>}
                    visible={this.props.visible}
                    footer={
                        <div>
                            <Button key="customCancel" onClick={this.onCancel}>Atšaukti</Button>
                            <Button key="customSubmit" form="myForm" onClick={this.saveChanges} htmlType="submit" type={'primary'}>Atnaujinti</Button>
                        </div>
                    }
                >
                    <Form layout="vertical" id="myForm" name="myForm">
                    <p style={{...textStyle}}>Pavadinimas</p>
                        <Input style={{ width: '100%', fontSize:'18px' }} placeholder="Įrašykite pavadinimą" defaultValue={this.state.material.name} value={this.state.material.name} onChange={(e) => this.onDataChange(e.target.value, "name")} />
                        <p style={{...textStyle}}>Panaudotas materialas</p>
                        <Input style={{ width: '100%', fontSize:'18px' }} placeholder="Įrašykite panaudotą materialą" defaultValue={this.state.material.materialUsed} value={material.materialUsed} onChange={(e) => this.onDataChange(e.target.value, "materialUsed")} />
                        <p style={{...textStyle}}>Produktai</p>
                        <Select
                            showSearch
                            style={{ width: '320px', fontSize:'18px'}}
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
                    </Form>
                </Modal>
            </>
        )
    }
}

//get redux states. map them to props
const mapStateToProps = (state) => {
    return {
        productsReducer: state.productsReducer
    }
}

export default connect(mapStateToProps, { getProducts })(withRouter(UpdateMaterialComponent))