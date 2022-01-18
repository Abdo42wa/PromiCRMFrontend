import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { getProductsByOrder, addProduct, updateProduct, updateProductWithImage} from '../Actions/productsActions'
import { Table, Space, Card, Typography, Col, Row, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddProductComponent from '../Components/products_components/AddProductComponent';
import UpdateProductComponent from '../Components/products_components/UpdateProductComponent';


class OrderProducts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            addProductVisibility: false,
            updateProduct: {
                record: null,
                visibility: false
            }
        }
    }

    showAddProductModal = () => {
        this.setState({
            addProductVisibility: true
        })
    }
    unshowAddProductModal = () => {
        this.setState({
            addProductVisibility: false
        })
    }
    saveAddProduct = (postObj) => {
        this.props.addProduct(postObj, () => {
            this.setState({
                addProductVisibility: false
            })
        })
    }


    showProductModal = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateProduct: obj
        })
    }
    unshowProductModal = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateProduct: obj
        });
    }
    saveProduct = (postObj, reducerObj) => {
        this.props.updateProduct(postObj, reducerObj, () => {
            this.unshowProductModal();
        });
    }
    saveProductWithImg = (postObj, id) => {
        this.props.updateProductWithImage(postObj,id);
        this.unshowProductModal();
    }
    componentDidMount(){
        console.log('match params'+this.props.match.params.id)
        if(this.props.usersReducer.currentUser !== null){
            if(this.props.match.params.id){
                this.props.getProductsByOrder(this.props.match.params.id);
            }else{
                this.props.history.push('/')
            }
        }else{
            this.props.history.push('/login')
        }
    }

    render(){
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showProductModal(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Produkto id',
                dataIndex: 'id',
                width: '10%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '10%',
                render: (text, record, index) => (
                    <div>
                        {text === null || text === undefined ?
                            <p></p> : <Image src={text} />}
                    </div>
                )
            },
            {
                title: 'Nuoroda',
                dataIndex: 'link',
                width: '10%'
            },
            {
                title: 'Prekės kodas',
                dataIndex: 'code',
                width: '10%'
            },
            {
                title: 'Kategorija',
                dataIndex: 'category',
                width: '10%'
            },
            {
                title: 'Medžiagos',
                dataIndex: 'productMaterials',
                width: '10%',
                render: (text, record, index) => (
                    <div>
                        {record.productMaterials.map((obj, index) => (
                            <Typography.Text>{obj.materialWarehouse.title},</Typography.Text>
                        ))}
                    </div>

                )
            },

            {
                title: 'Produkto pavadinimas',
                dataIndex: 'name',
                width: '10%'
            },
            {
                title: 'Ilgis Be Pakuotės',
                dataIndex: 'lengthWithoutPackaging',
                width: '10%'
            },
            {
                title: 'Ilgis su Pakuotės',
                dataIndex: 'lengthWithPackaging',
                width: '10%'
            },
            {
                title: 'Plotis Be Pakuotės',
                dataIndex: 'widthWithoutPackaging',
                width: '10%'
            },
            {
                title: 'Plotis su Pakuotės',
                dataIndex: 'widthWithPackaging',
                width: '10%'
            },
            {
                title: 'Aukštis Be pakuotės',
                dataIndex: 'heightWithoutPackaging',
                width: '10%'
            },
            {
                title: 'Aukštis su pakuotės',
                dataIndex: 'heightWithPackaging',
                width: '10%'
            },
            {
                title: 'svoris Bruto',
                dataIndex: 'weightGross',
                width: '10%'
            },
            {
                title: 'svoris Netto',
                dataIndex: 'weightNetto',
                width: '10%'
            },
            {
                title: 'surinkimo laikas',
                dataIndex: 'collectionTime',
                width: '10%'
            },
            {
                title: 'Suklijavimo laikas',
                dataIndex: 'bondingTime',
                width: '10%'
            },
            {
                title: 'Lazeriavimo  laikas',
                dataIndex: 'laserTime',
                width: '10%'
            },
            {
                title: 'Dažymo laikas',
                dataIndex: 'paintingTime',
                width: '10%'
            },
            {
                title: 'Frezavimo laikas',
                dataIndex: 'milingTime',
                width: '10%'
            },
            {
                title: 'Pakavimo dėžutės kodas',
                dataIndex: 'packagingBoxCode',
                width: '10%'
            },
            {
                title: 'Pakavimo laikas',
                dataIndex: 'packingTime',
                width: '10%'
            }
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Užsakymo produktai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite produktai</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.productsReducer.products}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(700px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddProductModal}>Pridėti Produktas</Button></Space>)}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addProductVisibility !== false ?
                    <AddProductComponent visible={this.state.addProductVisibility} save={this.saveAddProduct}
                        onClose={this.unshowAddProductModal} orderId={this.props.match.params.id}/>
                    : null}
                {this.state.updateProduct.visibility !== false ?
                    <UpdateProductComponent  visible={this.state.updateProduct.visibility} record={this.state.updateProduct.record}
                        save={this.saveProduct} saveWithImg={this.saveProductWithImg} onClose={this.unshowProductModal} /> :
                    null}

            </>
        )
    }

}

//get redux states
const mapStateToProps = (state) => {
    return {
        productsReducer: state.productsReducer,
        usersReducer: state.usersReducer
    }
}

//conect to redux states, and all actions that will use
export default connect(mapStateToProps,{getProductsByOrder,addProduct,updateProduct,updateProductWithImage})(withRouter(OrderProducts))