import React from 'react';
import { connect } from 'react-redux';
import { getProducts, addProduct, updateProduct, updateProductWithImage, updateManyMaterials } from '../appStore/actions/productsActions'
import { Table, Space, Card, Typography, Col, Row, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import { getMaterialsWarehouseData, updateManyWarehouseMaterials } from '../appStore/actions/materialsWarehouseActions';
import AddProductComponent from '../components/products_components/AddProductComponent';
import UpdateProductComponent from '../components/products_components/UpdateProductComponent';
import AddProductMaterialsComponent from '../components/products_components/addMaterials/AddProductMaterialsComponent';

class ProductsScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addProductVisibility: false,
            addProductMaterials: {
                visibility: false,
                record: null,
                index: null
            },
            updateProduct: {
                visibility: false,
                record: null
            },

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
        this.setState(prevState => ({
            updateProduct: {
                ...prevState.updateProduct,
                visibility: true,
                record: record
            }
        }), () => console.log(this.state.updateProduct))
        // console.log(record)
    }
    unshowProductModal = () => {
        this.setState(prevState => ({
            updateProduct: {
                ...prevState.updateProduct,
                visibility: false,
                record: null
            }
        }))
    }

    //for AddProductMaterialsComponent
    showAddProductMaterials = (record, index) => {
        this.setState(prevState => ({
            addProductMaterials: {
                ...prevState.addProductMaterials,
                visibility: true,
                record: record,
                index: index
            }
        }))
    }
    unshowAddProductMaterials = (record) => {
        this.setState(prevState => ({
            addProductMaterials: {
                ...prevState.addProductMaterials,
                visibility: false,
                record: null
            }
        }))
    }
    saveAddProductMaterials = (postObj) => {
        console.log(JSON.stringify(postObj))
        this.props.updateManyMaterials(postObj)
        this.unshowAddProductMaterials();
    }



    //for AddProduct component
    saveProduct = (postObj, reducerObj) => {
        // this.props.updateManyMaterials(productMaterials, productMaterials)
        this.props.updateProduct(postObj, reducerObj, () => {
            this.unshowProductModal();
        });
    }
    saveProductWithImg = (postObj, id) => {
        // this.props.updateManyMaterials(productMaterials, productMaterials)
        this.props.updateProductWithImage(postObj, id, () => {
            this.unshowProductModal();
        });

    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getProducts(() => {
                this.props.getMaterialsWarehouseData();
            })
        } else {
            this.props.history.push('/login');
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
            // {
            //     title: 'Medžiagų atnaujinimas',
            //     width: '5%',
            //     render: (text, record, index) => (
            //         <Button onClick={(e) => this.showProductMaterialsComponent(record)}>Atnaujinimas</Button>
            //     )
            // },
            {
                title: 'Medžiagų pridėjimas',
                width: '5%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showAddProductMaterials(record, index)}>Pridėjimas</Button>
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
                            <p></p> : <Image height={30} src={text} />}
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
                        {record.productMaterials != null && record.productMaterials.map((obj, index) => (
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
                title: 'Svoris Bruto',
                dataIndex: 'weightGross',
                width: '10%'
            },
            {
                title: 'Svoris Netto',
                dataIndex: 'weightNetto',
                width: '10%'
            },
            {
                title: 'Lazeriavimo  laikas',
                dataIndex: 'orderServices',
                width: '10%',
                render: (text,record,index)=>{
                    if(text !== undefined && text !== null){
                        const obj = text.find(x => x.productId === record.id && x.serviceId === 1)
                        if(obj !== null && obj !== undefined)
                            return (<p>{obj.timeConsumption}</p>)
                    }else
                        return (<p></p>)
                }
            },
            {
                title: 'Frezavimo laikas',
                dataIndex: 'orderServices',
                width: '10%',
                render: (text,record,index)=>{
                    if(text !== undefined && text !== null){
                        const obj = text.find(x => x.productId === record.id && x.serviceId === 2)
                        if(obj !== null && obj !== undefined)
                            return (<p>{obj.timeConsumption}</p>)
                    }else
                        return (<p></p>)
                }
            },
            {
                title: 'Dažymo laikas',
                dataIndex: 'orderServices',
                width: '10%',
                render: (text,record,index)=>{
                    if(text !== undefined && text !== null){
                        const obj = text.find(x => x.productId === record.id && x.serviceId === 3)
                        if(obj !== null && obj !== undefined)
                            return (<p>{obj.timeConsumption}</p>)
                    }else
                        return (<p></p>)
                }
            },
            {
                title: 'Šlifavimo laikas',
                dataIndex: 'orderServices',
                width: '10%',
                render: (text,record,index)=>{
                    if(text !== undefined && text !== null){
                        const obj = text.find(x => x.productId === record.id && x.serviceId === 4)
                        if(obj !== null && obj !== undefined)
                            return (<p>{obj.timeConsumption}</p>)
                    }else
                        return (<p></p>)
                }
            },
            {
                title: 'Suklijavimo laikas',
                dataIndex: 'orderServices',
                width: '10%',
                render: (text,record,index)=>{
                    if(text !== undefined && text !== null){
                        const obj = text.find(x => x.productId === record.id && x.serviceId === 5)
                        if(obj !== null && obj !== undefined)
                            return (<p>{obj.timeConsumption}</p>)
                    }else
                        return (<p></p>)
                }
            },
            {
                title: 'Surinkimo laikas',
                dataIndex: 'orderServices',
                width: '10%',
                render: (text,record,index)=>{
                    if(text !== undefined && text !== null){
                        const obj = text.find(x => x.productId === record.id && x.serviceId === 6)
                        if(obj !== null && obj !== undefined)
                            return (<p>{obj.timeConsumption}</p>)
                    }else
                        return (<p></p>)
                }
            },
            {
                title: 'Pakavimo laikas',
                dataIndex: 'orderServices',
                width: '10%',
                render: (text,record,index)=>{
                    if(text !== undefined && text !== null){
                        const obj = text.find(x => x.productId === record.id && x.serviceId === 7)
                        if(obj !== null && obj !== undefined)
                            return (<p>{obj.timeConsumption}</p>)
                    }else
                        return (<p></p>)
                }
            },
            {
                title: 'Pakavimo dėžutės kodas',
                dataIndex: 'packagingBoxCode',
                width: '10%'
            },
            


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
                        <div style={{ padding: '15px' }}></div>
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
                        onClose={this.unshowAddProductModal} />
                    : null}
                {this.state.updateProduct.visibility !== false ?
                    <UpdateProductComponent visible={this.state.updateProduct.visibility} record={this.state.updateProduct.record}
                        save={this.saveProduct} saveWithImg={this.saveProductWithImg} onClose={this.unshowProductModal} /> :
                    null}
                {/* {this.state.productMaterials.visibility !== false ?
                    <ProductMaterialsComponent visible={this.state.productMaterials.visibility} onClose={this.unshowProductMaterialsComponent}
                        save={this.saveProductMaterials} record={this.state.productMaterials.record} /> : null
                } */}

                {this.state.addProductMaterials.visibility !== false ?
                    <AddProductMaterialsComponent visible={this.state.addProductMaterials.visibility} index={this.state.addProductMaterials.index}
                        onClose={this.unshowAddProductMaterials} record={this.state.addProductMaterials.record}
                        save={this.saveAddProductMaterials} materialsWarehouseData={this.props.materialsWarehouseReducer.materialsWarehouseData}
                    /> : null}

            </>
        )
    }
}

// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        productsReducer: state.productsReducer,
        materialsWarehouseReducer: state.materialsWarehouseReducer,
        materialsReducer: state.materialsReducer
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getProducts, addProduct, updateProduct, updateProductWithImage, updateManyMaterials, getMaterialsWarehouseData, updateManyWarehouseMaterials })(withRouter(ProductsScrenn))


