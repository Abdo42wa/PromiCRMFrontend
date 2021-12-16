import React from 'react';
import { connect } from 'react-redux';
import { getProducts, addProduct, updateProduct, updateProductWithImage, updateManyMaterials, insertManyMaterials } from '../Actions/productsActions'
import { Table, Space, Card, Typography, Col, Row, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import { getMaterialsWarehouseData, updateManyWarehouseMaterials } from '../Actions/materialsWarehouseActions';
// import {updateManyMaterials} from '../Actions/materialsActions'
import AddProductComponent from '../Components/products_components/AddProductComponent';
import UpdateProductComponent from '../Components/products_components/UpdateProductComponent';
import ProductMaterialsComponent from '../Components/products_components/ProductMaterialsComponent';
import AddProductMaterialsComponent from '../Components/products_components/addMaterials/AddProductMaterialsComponent';

class ProductsScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addProductVisibility: false,
            productMaterials: {
                visibility: false,
                record: null
            },
            addProductMaterials: {
                visibility: false,
                record: null
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
    //FOR materials
    showProductMaterialsComponent = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            productMaterials: obj
        })
    }
    unshowProductMaterialsComponent = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            productMaterials: obj
        })
    }
    saveProductMaterials = (postObj) => {
        const productMaterials = JSON.parse(JSON.stringify(postObj));
        const warehouseMaterialsClone = JSON.parse(JSON.stringify(this.props.materialsWarehouseReducer.materialsWarehouseData))
        const array = []
        const productMaterialsArray = []
        productMaterials.forEach(element => {
            warehouseMaterialsClone.forEach(element2 => {
                if (element2.id === element.materialWarehouseId && element.subtractQuantity !== undefined && element.subtractQuantity !== null) {
                    const obj = {
                        id: element2.id,
                        title: element2.title,
                        quantity: (element2.quantity - element.subtractQuantity),
                        measuringUnit: element2.measuringUnit,
                        info: element2.info,
                        deliveryTime: element2.deliveryTime,
                        useDays: element2.useDays,
                        lastAdittion: element2.lastAdittion,
                        imageName: element2.imageName,
                        imagePath: element2.imagePath

                    }
                    array.push(obj)
                }
            })
        })
        productMaterials.forEach(element => {
            if (element.subtractQuantity !== undefined && element.subtractQuantity !== null) {
                productMaterialsArray.push({ id: element.id, productId: element.productId, materialWarehouseId: element.materialWarehouseId, quantity: element.quantity })
            }
        })
        //turi tapti 3475 is 3490 nes prie quantity pridejau 15. veikiiia!!!
        this.props.updateManyMaterials(productMaterialsArray, () => {
            this.props.updateManyWarehouseMaterials(array, () => {
                this.unshowProductMaterialsComponent();
            })
        })
    }

    //for AddProductMaterialsComponent
    showAddProductMaterials = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            addProductMaterials: obj
        })
    }
    unshowAddProductMaterials = (record) => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            addProductMaterials: obj
        })
    }
    saveAddProductMaterials = (postObj) => {
        const productMaterials = JSON.parse(JSON.stringify(postObj));
        const warehouseMaterialsClone = JSON.parse(JSON.stringify(this.props.materialsWarehouseReducer.materialsWarehouseData))
        const array = []
        productMaterials.forEach(element => {
            warehouseMaterialsClone.forEach(element2 => {
                if (element2.id === element.materialWarehouseId) {
                    const obj = {
                        id: element2.id,
                        title: element2.title,
                        quantity: (element2.quantity - element.quantity),
                        measuringUnit: element2.measuringUnit,
                        info: element2.info,
                        deliveryTime: element2.deliveryTime,
                        useDays: element2.useDays,
                        lastAdittion: element2.lastAdittion,
                        imageName: element2.imageName,
                        imagePath: element2.imagePath
                    }
                    array.push(obj)
                }
            })
        })
        this.props.insertManyMaterials(postObj, () => {
            this.props.updateManyWarehouseMaterials(array, () => {
                this.unshowAddProductMaterials();
            })
        })
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
                title: 'Medžiagų atnaujinimas',
                width: '5%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showProductMaterialsComponent(record)}>Atnaujinimas</Button>
                )
            },
            {
                title: 'Medžiagų pridėjimas',
                width: '5%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showAddProductMaterials(record)}>Pridėjimas</Button>
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
                {this.state.productMaterials.visibility !== false ?
                    <ProductMaterialsComponent visible={this.state.productMaterials.visibility} onClose={this.unshowProductMaterialsComponent}
                        save={this.saveProductMaterials} record={this.state.productMaterials.record} /> : null
                }

                {this.state.addProductMaterials.visibility !== false ?
                    <AddProductMaterialsComponent visible={this.state.addProductMaterials.visibility}
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
export default connect(mapStateToProps, { getProducts, addProduct, updateProduct, updateProductWithImage, updateManyMaterials, getMaterialsWarehouseData, updateManyWarehouseMaterials, insertManyMaterials })(withRouter(ProductsScrenn))


