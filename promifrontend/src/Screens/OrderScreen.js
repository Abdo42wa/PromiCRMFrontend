import React from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder, updateOrderWithImage, addOrderWarehouse } from '../Actions/orderAction'
import { Table, Space, Card, Typography, Col, Row, Button, Tag, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import AddOrderComponent from '../Components/order_components/AddOrderComponent';
import UpdateOrderComponent from '../Components/order_components/UpdateOrderComponent';
import { getProducts } from '../Actions/productsActions'
import moment from 'moment';


class OrderScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            imgPath: [],
            productDevices: [],
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
        this.props.addOrder(postObj, () => {

            const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            this.setState({
                orders: dataClone,
                addOrderVisibility: false
            })
        })
        this.unshowAddOrderModal();
        window.location.reload();
    }

    saveorderwarehouse = (postObj) => {
        this.props.addOrderWarehouse(postObj, () => {
            this.setState({
                addOrderVisibility: false
            });
        });
        console.log("saveorderwarehouse working");
        window.location.reload();
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
        this.props.updateOrder(postObj, reducerObj, () => {

            const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            this.setState({
                orders: dataClone
            });
            this.unshowOrderModal();
        });

    }
    updateOrderWithImg = (postObj, id) => {
        this.props.updateOrderWithImage(postObj, id);
        this.unshowOrderModal();
    }

    addProductsForOrder = (id) => {
        this.props.history.push(`/orders/product/${id}`);
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getProducts(() => {


                this.props.getOrders(() => {
                    const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders))
                    this.setState({
                        orders: dataClone
                    });
                    this.getOrDerdevice();

                })

            });

        } else {
            this.props.history.push('/');
        }
    }

    getOrderImage(kodas) {
        //console.log(this.props.productsReducer.products.filter(word => word.code === "555GG"))
        const img = this.props.productsReducer.products.filter(word => word.code === kodas);
        //console.log(img.map((x) => x.imagePath))
        const arr = img.map((x) => x.imagePath)
        //console.log(arr[0])
        return arr[0]
    }

    getOrDerdevice(productCode) {
        const product = this.props.productsReducer.products.find(word => word.code === productCode);
        const laserTime = product.laserTime
        const milingTime = product.milingTime
        const collectionTime = product.collectionTime
        const packingTime = product.packingTime
        const paintingTime = product.paintingTime
        const bondingTime = product.bondingTime

        //console.log(product + 'sssssssssssssssssssssssssssssssssssss')
        console.log(productCode)

        this.state.productDevices.push({ laserTime, milingTime, collectionTime, packingTime, paintingTime, bondingTime })
        //
        // console.log(this.state.productDevices.map(element => element.laserTime))
        // console.log(this.state.productDevices)
        if (laserTime !== undefined) {
            return (
                [
                    { id: 1, name: "laserTime", value: laserTime },
                    { id: 2, name: "milingTime", value: milingTime },
                    { id: 3, name: "collectionTime", value: collectionTime },
                    { id: 4, name: "packingTime", value: packingTime },
                    { id: 5, name: "paintingTime", value: paintingTime },
                    { id: 6, name: "bondingTime", value: bondingTime }
                ]
            )
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
            {
                title: 'Pridėti produktus',
                width: '5%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.addProductsForOrder(record.id)}>Pridėti</Button>
                )
            },
            {
                title: 'Atsakingas asmuo',
                dataIndex: 'user',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
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
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                )
            },
            {
                title: 'Nuotrauka',
                //dataIndex: 'imagePath',
                width: '10%',
                render: (text, record, index) => (
                    <Image src={this.getOrderImage(record.productCode)} />
                )
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
                    <Typography.Text>{text.type}</Typography.Text>
                )
            },
            {
                title: 'Klientas',
                dataIndex: 'customer',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Įrenginys',
                dataIndex: 'device',
                width: '10%',
                render: (text, record, index) => (
                    <div>
                        {/* {this.state.productDevices != null && this.state.productDevices.map((obj, index) => (
                            <Typography.Text>{obj.bondingTime},</Typography.Text>
                        ))} */}
                        {/* {this.getOrDerdevice()} */}
                        {this.getOrDerdevice(record.productCode) != null && this.getOrDerdevice(record.productCode).map(item => {
                            return (
                                // <div>{item.value} {item.name}  </div>
                                item.value !== 0 && <Tag>{item.value} {item.name}</Tag>
                            )
                        })}

                    </div>

                )
            },
            {
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
                title: 'Šalis',
                dataIndex: 'country',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
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
                    <Typography.Text>{text.name}</Typography.Text>
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
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.state.orders}
                                        pagination={{ pageSize: 10 }}
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
                        saveorderwarehouse={this.saveorderwarehouse}
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

// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        productsReducer: state.productsReducer,
        orderReducer: state.orderReducer
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getOrders, addOrder, updateOrder, updateOrderWithImage, addOrderWarehouse, getProducts })(withRouter(OrderScrenn))


