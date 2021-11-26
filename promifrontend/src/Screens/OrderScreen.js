import React from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder } from '../Actions/orderAction'
import { Table, Space, Card, Typography, Col, Row, Button, Tag, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import AddOrderComponent from '../Components/order_components/AddOrderComponent';
import UpdateOrderComponent from '../Components/order_components/UpdateOrderComponent';
import moment from 'moment';


class OrderScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
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
            //window.location.reload();
        });

    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getOrders(() => {
                const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders))
                this.setState({
                    orders: dataClone
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
                    <Button onClick={(e) => this.showOrderModal(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Vartotojo ID',
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
                title: 'statusą',
                dataIndex: 'status',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
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
                title: 'platformas',
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
                title: 'Nuotrauka',
                dataIndex: 'photo',
                width: '10%',
                render: (text, record, index) => (
                    <Image
                        width={100}
                        src={text}
                    />
                )
            },
            {
                title: 'Prekės kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            {
                title: 'siuntos tipo ID',
                dataIndex: 'shipment',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.type}</Typography.Text>
                )
            },
            {
                title: 'Kliento',
                dataIndex: 'customer',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'įrenginys',
                dataIndex: 'device',
                width: '10%'
            },
            {
                title: 'Gamybos laikas',
                dataIndex: 'productionTime',
                width: '10%'
            },
            {
                title: 'Adresu',
                dataIndex: 'address',
                width: '10%'
            },
            {
                title: 'šalies',
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
                title: 'valiutos',
                dataIndex: 'currency',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'vat',
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
                                    <Typography.Title>įsakymus</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite įsakymus</Typography.Text>
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
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddOrderModal}>Pridėti įsakyma</Button></Space>)}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addOrderVisibility !== false ?
                    <AddOrderComponent visible={this.state.addOrderVisibility} save={this.saveAddOrder}
                        onClose={this.unshowAddOrderModal} />
                    : null}
                {this.state.updateOrder.visibility !== false ?
                    <UpdateOrderComponent visible={this.state.updateOrder.visibility} record={this.state.updateOrder.record}
                        save={this.saveOrder} onClose={this.unshowOrderModal} /> :
                    null}

            </>
        )
    }
}

// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        orderReducer: state.orderReducer
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getOrders, addOrder, updateOrder })(withRouter(OrderScrenn))


