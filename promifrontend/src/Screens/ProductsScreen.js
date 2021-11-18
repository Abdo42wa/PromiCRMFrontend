import React from 'react';
import { connect } from 'react-redux';

import { getProducts, addProduct, updateProduct } from '../Actions/productsActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import AddProductComponent from '../Components/products_components/AddProductComponent';
import UpdateProductComponent from '../Components/products_components/UpdateProductComponent';


class ProductsScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            addProductVisibility: false,
            updateProduct: {
                visibility: false,
                record: null
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

            const dataClone = JSON.parse(JSON.stringify(this.props.productsReducer.products));
            this.setState({
                products: dataClone,
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

            const dataClone = JSON.parse(JSON.stringify(this.props.productsReducer.products));
            this.setState({
                products: dataClone
            });
            this.unshowProductModal();
        });
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getProducts(() => {
                const dataClone = JSON.parse(JSON.stringify(this.props.productsReducer.products))
                this.setState({
                    products: dataClone
                });
            })
        } else {
            this.props.history.push('/');
        }
    }
    render() {
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
                dataIndex: 'photo',
                width: '10%'
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
                title: 'Plotis Be Pakuotės',
                dataIndex: 'widthWithoutPackaging',
                width: '10%'
            },
            {
                title: 'Aukštis Be pakuotės',
                dataIndex: 'heightWithoutPackaging',
                width: '10%'
            },
            {
                title: 'svoris Bruto',
                dataIndex: 'weightGross',
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
                                    <Typography.Title>Produktai</Typography.Title>
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
                                        dataSource={this.state.products}
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
                        onClose={this.unshowAddProductModal} />
                    : null}
                {this.state.updateProduct.visibility !== false ?
                    <UpdateProductComponent visible={this.state.updateProduct.visibility} record={this.state.updateProduct.record}
                        save={this.saveProduct} onClose={this.unshowProductModal} /> :
                    null}

            </>
        )
    }
}

// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        productsReducer: state.productsReducer
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getProducts, addProduct, updateProduct })(withRouter(ProductsScrenn))


