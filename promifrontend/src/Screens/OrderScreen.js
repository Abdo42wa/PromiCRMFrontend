import React from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder, updateOrderWithImage, addOrderWarehouse } from '../Actions/orderAction'
import { checkWarehouseProduct, createWarehouseData } from '../Actions/warehouseActions'
import { Table, Space, Card, Typography, Col, Row, Button, Tag, Image, Select, Input } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import AddOrderComponent from '../Components/order_components/AddOrderComponent';
import UpdateOrderComponent from '../Components/order_components/UpdateOrderComponent';
import { getProducts } from '../Actions/productsActions'
import { getUsers } from '../Actions/userListActions'
import moment from 'moment';

const { Option } = Select;
const inputStyle = {
    width: '80px'
}
const selectOptionStyle = {
    width: '90px'
}
class OrderScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addOrderVisibility: false,
            updateOrder: {
                visibility: false,
                record: null
            }
        }
    }

    showAddOrderModal = () => {
        this.setState({
            addOrderVisibility: true
        })
    }
    unshowAddOrderModal = () => {
        this.setState({
            addOrderVisibility: false
        })
    }
    saveAddOrder = (postObj) => {
        this.props.addOrder(postObj)
        this.unshowAddOrderModal();
        // window.location.reload();
    }

    showOrderModal = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateOrder: obj
        })
    }
    unshowOrderModal = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateOrder: obj
        });
    }
    saveOrder = (postObj, reducerObj) => {
        this.props.updateOrder(postObj, reducerObj)
        this.unshowOrderModal();

    }
    updateOrderWithImg = (postObj, id) => {
        this.props.updateOrderWithImage(postObj, id);
        this.unshowOrderModal();
    }

    // addProductsForOrder = (id) => {
    //     this.props.history.push(`/orders/product/${id}`);
    // }

    // changeOrderStatus = (id) => {
    //     const result = this.props.orderReducer.orders.filter(x => x.id === id);
    //     return (result[0].status)
    // }

    onDataChange = (record, inputName, value, completeDateName) => {
        const obj = {
            ...record,
            [inputName]: value,
            [completeDateName]: moment().format('YYYY/MM/DD,h:mm:ss a')
        }
        //destructuring obj. couse i dont want to add id to postObj
        // reducer obj will have it. so deleting id from postobj
        const { id, ...postObj1 } = obj;
        const reducerObj1 = obj;
        console.log('postobj:' + JSON.stringify(postObj1))
        console.log('reducerObj:' + JSON.stringify(reducerObj1))
        if (record.orderType === "Standartinis" || record.orderType === "Ne-standartinis") {
            if (inputName !== "packingUserId") {
                this.props.updateOrder(postObj1, reducerObj1)
            } else {
                // if packing was selected. then add Status to true(done)
                const postObj = {
                    ...postObj1,
                    "status": true
                }
                const reducerObj = {
                    ...reducerObj1,
                    "status":true
                }
                this.props.updateOrder(postObj,reducerObj)
            }
        } else if (record.orderType === "Sandelis") {
            if (inputName !== "packingUserId") {
                this.props.updateOrder(postObj1, reducerObj1)
            } else {
                // if packing was selected. then add Status to true(done)
                const postObj = {
                    ...postObj1,
                    "status": true
                }
                const reducerObj = {
                    ...reducerObj1,
                    "status":true
                }
                const warehouseCountingPostObj = {
                    "orderId": reducerObj.id,
                    "quantityProductWarehouse": reducerObj.quantity,
                    "lastTimeChanging": moment().format('YYYY/MM/DD,h:mm:ss a'),
                    "productCode": reducerObj.productCode,
                }
                this.props.updateOrder(postObj,reducerObj)
                this.props.createWarehouseData(warehouseCountingPostObj)
                // this.props.updateOrder(postObj)
            }
        }
        // else if(record.orderType === "Ne-standartinis"){
        //     if(inputName !== "packingUserId"){
        //         this.props.updateOrder(postObj1,reducerObj1)
        //     }else{
        //         // if packing was selected. then add Status to true(done)
        //         const postObj = {
        //             ...postObj1,
        //             "status":true
        //         }
        //         this.props.updateOrder(postObj)
        //     }


    }


    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getUsers(() => {
                this.props.getOrders(() => {
                })
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
                    <Button onClick={(e) => this.showOrderModal(record)}>Atnaujinti</Button>
                )
            },
            // {
            //     title: 'Pridėti produktus',
            //     width: '5%',
            //     render: (text, record, index) => (
            //         <Button onClick={(e) => this.addProductsForOrder(record.id)}>Pridėti</Button>
            //     )
            // },
            {
                title: 'Atsakingas asmuo',
                dataIndex: 'user',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            },
            {
                title: 'Užsakymo tipas',
                dataIndex: 'orderType',
                width: '10%'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                width: '10%',
                render: (text, record, index) => (
                    //<Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                )
            },
            {
                title: 'Foto',
                dataIndex: 'product',
                width: '10%',
                render: (text, record, index) => {
                    if (text === null || text === undefined){
                        if (record.imagePath === undefined || record.imagePath === null){
                            return (<p></p>)
                        }else{
                            return (<Image src={record.imagePath} alt='Foto' />)
                        }
                    }else {
                        if (text.imagePath === null)
                            return (<p></p>)
                        else
                            return (<Image src={text.imagePath} alt='Foto' />)
                    }

                }
            },
            {
                title: 'Užsakymo numeris',
                dataIndex: 'orderNumber',
                width: '10%'
            },
            {
                title: 'Data',
                dataIndex: 'date',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'Platforma',
                dataIndex: 'platforma',
                width: '10%'
            },
            {
                title: 'Daugiau informacijos',
                dataIndex: 'moreInfo',
                width: '10%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '10%'
            },
            {
                title: 'Prekės kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            {
                title: 'Siuntos tipas',
                dataIndex: 'shipment',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.type}</Typography.Text>
                )
            },
            {
                title: 'Klientas',
                dataIndex: 'customer',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            }

            , {
                title: 'Gamybos laikas',
                dataIndex: 'productionTime',
                width: '10%'
            },
            {
                title: 'Adresas',
                dataIndex: 'address',
                width: '10%'
            },
            {
                title: 'Frezavimas',
                dataIndex: 'milingUserId',
                width: '10%',
                render: (text, record, index) => (
                    <div style={{ display: 'flex' }}>
                        <Select
                            style={{ ...selectOptionStyle }}
                            optionFilterProp="children"
                            onChange={(e) => this.onDataChange(record, "milingUserId", e, "milingComplete")}
                            defaultValue={text}
                        >
                            {this.props.usersListReducer.users.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                            })}
                        </Select>
                        {/* if record doesnt have product its Not-standart work. then display time from Order obj */}
                        {record.product === undefined || record.product === null ?
                            <div>
                                {record.milingTime === undefined || record.milingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.milingTime} min`} />}
                            </div> :
                            <div>
                                {record.product.milingTime === undefined || record.product.milingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.product.milingTime} min`} />}
                            </div>
                        }
                    </div>
                )
            },
            {
                title: 'Lazeriavimas',
                dataIndex: 'laserUserId',
                width: '10%',
                render: (text, record, index) => (
                    <div style={{ display: 'flex' }}>
                        <Select
                            style={{ width: '80px' }}
                            optionFilterProp="children"
                            onChange={(e) => this.onDataChange(record, "laserUserId", e, "laserComplete")}
                            defaultValue={text}
                        >
                            {this.props.usersListReducer.users.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                            })}
                        </Select>
                        {record.product === undefined || record.product === null ?
                            <div>
                                {record.laserTime === undefined || record.laserTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.laserTime} min`} />}
                            </div> :
                            <div>
                                {record.product.laserTime === undefined || record.product.laserTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.product.laserTime} min`} />}
                            </div>
                        }
                    </div>

                )
            },
            {
                title: 'Dažymas',
                dataIndex: 'paintingUserId',
                width: '10%',
                render: (text, record, index) => (
                    <div style={{ display: 'flex' }}>
                        <Select
                            style={{ width: '80px' }}
                            optionFilterProp="children"
                            onChange={(e) => this.onDataChange(record, "paintingUserId", e, "paintingComplete")}
                            defaultValue={text}
                        >
                            {this.props.usersListReducer.users.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                            })}
                        </Select>
                        {record.product === undefined || record.product === null ?
                            <div>
                                {record.paintingTime === undefined || record.paintingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.paintingTime} min`} />}
                            </div> :
                            <div>
                                {record.product.paintingTime === undefined || record.product.paintingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.product.paintingTime} min`} />}
                            </div>
                        }
                    </div>

                )
            },
            {
                title: 'Suklijavimas',
                dataIndex: 'bondingUserId',
                width: '10%',
                render: (text, record, index) => (
                    <div style={{ display: 'flex' }}>
                        <Select
                            style={{ width: '80px' }}
                            optionFilterProp="children"
                            onChange={(e) => this.onDataChange(record, "bondingUserId", e, "bondingComplete")}
                            defaultValue={text}
                        >
                            {this.props.usersListReducer.users.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                            })}
                        </Select>
                        {record.product === undefined || record.product === null ?
                            <div>
                                {record.bondingTime === undefined || record.bondingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.bondingTime} min`} />}
                            </div> :
                            <div>
                                {record.product.bondingTime === undefined || record.product.bondingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.product.bondingTime} min`} />}
                            </div>
                        }
                    </div>
                )
            },
            {
                title: 'Surinkimas',
                dataIndex: 'collectionUserId',
                width: '10%',
                render: (text, record, index) => (
                    <div style={{ display: 'flex' }}>
                        <Select
                            style={{ width: '80px' }}
                            optionFilterProp="children"
                            onChange={(e) => this.onDataChange(record, "collectionUserId", e, "collectionComplete")}
                            defaultValue={text}
                        >
                            {this.props.usersListReducer.users.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                            })}
                        </Select>
                        {record.product === undefined || record.product === null ?
                            <div>
                                {record.collectionTime === undefined || record.collectionTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.collectionTime} min`} />}
                            </div> :
                            <div>
                                {record.product.collectionTime === undefined || record.product.collectionTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.product.collectionTime} min`} />}
                            </div>
                        }
                    </div>
                )
            },
            {
                title: 'Pakavimas',
                dataIndex: 'packingUserId',
                width: '10%',
                render: (text, record, index) => (
                    <div style={{ display: 'flex' }}>
                        <Select
                            style={{ width: '80px' }}
                            optionFilterProp="children"
                            onChange={(e) => this.onDataChange(record, "packingUserId", e, "packingComplete")}
                            defaultValue={text}
                        >
                            {this.props.usersListReducer.users.map((element, index) => {
                                return (<Option key={element.id} value={element.id}>{element.name} </Option>)
                            })}
                        </Select>
                        {record.product === undefined || record.product === null ?
                            <div>
                                {record.packingTime === undefined || record.packingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.packingTime} min`} />}
                            </div> :
                            <div>
                                {record.product.packingTime === undefined || record.product.packingTime === null ?
                                    <Input style={{ ...inputStyle }} disabled /> : <Input style={{ ...inputStyle }} disabled defaultValue={`${record.product.packingTime} min`} />}
                            </div>
                        }
                    </div>
                )
            },
            {
                title: 'Šalis',
                dataIndex: 'country',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            },
            {
                title: 'Komentaras',
                dataIndex: 'comment',
                width: '10%'
            },
            {
                title: 'Kaina',
                dataIndex: 'price',
                width: '10%'
            },
            {
                title: 'Valiuta',
                dataIndex: 'currency',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            },
            {
                title: 'VAT',
                dataIndex: 'vat',
                width: '10%'
            },
            {
                title: 'Užsakymo pabaigos data',
                dataIndex: 'orderFinishDate',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },


        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Užsakymai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite užsakymus</Typography.Text>
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
                                        dataSource={this.props.orderReducer.orders}
                                        pagination={{ pageSize: 5 }}
                                        bordered
                                        scroll={{ x: 'calc(700px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddOrderModal}>Pridėti užsakymą</Button></Space>)}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addOrderVisibility !== false ?
                    <AddOrderComponent visible={this.state.addOrderVisibility} save={this.saveAddOrder}
                        onClose={this.unshowAddOrderModal}
                        saveorderwarehouse={this.saveOrderWarehouse}
                    />
                    : null}
                {this.state.updateOrder.visibility !== false ?
                    <UpdateOrderComponent visible={this.state.updateOrder.visibility} record={this.state.updateOrder.record}
                        save={this.saveOrder} onClose={this.unshowOrderModal}
                        saveWithImg={this.updateOrderWithImg} /> :
                    null}

            </>
        )
    }
}
// 
// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        productsReducer: state.productsReducer,
        orderReducer: state.orderReducer,
        usersListReducer: state.usersListReducer,
        warehouseReducer: state.warehouseReducer.warehouseData
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getOrders, addOrder, updateOrder, updateOrderWithImage, createWarehouseData, addOrderWarehouse, getProducts, getUsers, checkWarehouseProduct })(withRouter(OrderScrenn))


