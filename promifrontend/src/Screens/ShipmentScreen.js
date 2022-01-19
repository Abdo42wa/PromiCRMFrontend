import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getShipments, createShipment, updateShipment } from '../Actions/shipmentsActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddShipmentComponent from '../Components/shipments_components/AddShipmentComponent';
import UpdateShipmentComponent from '../Components/shipments_components/UpdateShipmentComponent';

class ShipmentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipments: [],
            addShipmentVisibility: false,
            updateShipmentVisibility: {
                visibility: false,
                record: null
            }
        }
    }
    // FOR AddShipmentComponent
    showAddShipment = () => {
        this.setState({
            addShipmentVisibility: true
        });
    }

    unshowShipmentVisibility = () => {
        this.setState({
            addShipmentVisibility: false
        });
    }

    saveAddShipment = (postObj) => {
        this.props.createShipment(postObj, () => {
            const shipmentsClone = this.props.shipmentsReducer.shipments;
            this.setState({
                shipments: shipmentsClone,
                addShipmentVisibility: false
            });
        });
    }

    //FOR UpdateShipmentComponent
    showUpdateShipment = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateShipmentVisibility: obj
        });
    }

    unshowUpdateShipment = (record) => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateShipmentVisibility: obj
        });
    }

    saveUpdateShipment = (postObj, reducerObj) => {
        // console.log('Save update:' + JSON.stringify(postObj))
        this.props.updateShipment(postObj, reducerObj, () => {
            //get clone of shipments reducer state which just updated
            const shipmentsClone = JSON.parse(JSON.stringify(this.props.shipmentsReducer.shipments));
            this.setState({
                shipments: shipmentsClone
            });
            this.unshowUpdateShipment();
        });
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getShipments(() => {
                const shipmentsClone = JSON.parse(JSON.stringify(this.props.shipmentsReducer.shipments));
                this.setState({
                    shipments: shipmentsClone
                }, () => console.log('Shipments set to:' + JSON.stringify(this.state.shipments)));
            });
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateShipment(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Tipas',
                dataIndex: 'type',
                width: '15%'
            },
            {
                title: 'Periodas',
                dataIndex: 'period',
                width: '15%'
            },
            {
                title: 'Pristatymo kaina',
                dataIndex: 'shippingCost',
                width: '20%'
            },
            {
                title: 'Pristatymo numeris',
                dataIndex: 'shippingNumber',
                width: '20%'
            },
            {
                title: 'Pristatymo informacija',
                dataIndex: 'shipmentInfo',
                width: '20%'
            }
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={1}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Pristatymai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite pristatymus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <div style={{padding: '15px'}}></div>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.shipmentsReducer.shipments}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddShipment}>Pridėti pristatymą</Button></Space>)}
                                    />
                                    {/* <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.addMaterial}>Pridėti materialą</Button></Space> */}
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addShipmentVisibility !== false ?
                    <AddShipmentComponent onClose={this.unshowShipmentVisibility} save={this.saveAddShipment} visible={this.state.addShipmentVisibility}
                    /> : null}
                {this.state.updateShipmentVisibility.visibility !== false ?
                    <UpdateShipmentComponent visible={this.state.updateShipmentVisibility.visibility}
                        save={this.saveUpdateShipment} onClose={this.unshowUpdateShipment}
                        record={this.state.updateShipmentVisibility.record} /> : null}

            </>
        )
    }
}

//get redux states. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        shipmentsReducer: state.shipmentsReducer
    }
}

// connect to redux states, define all action that will be used
export default connect(mapStateToProps, { getShipments, createShipment, updateShipment })(withRouter(ShipmentScreen))