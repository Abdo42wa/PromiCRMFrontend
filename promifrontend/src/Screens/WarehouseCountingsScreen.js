import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWarehouseData, createWarehouseData, updateWarehouseData } from '../Actions/warehouseActions'
import { Table, Space, Select, Card, Typography, Col, Row, Input, Modal, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddWarehouseDataComponent from '../Components/warehouse_components/AddWarehouseDataComponent'
import moment from 'moment';

class WarehouseCountingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warehouseData: [],
            addWarehouseVisibility: false,
            updateWarehouse: {
                visibility: false,
                record: null
            }
        }
    }
    // For AddWarehouseDataComponent
    showAddWarehouseData = () => {
        this.setState({
            addWarehouseVisibility: true
        });
    }
    unshowAddWarehouseData = () => {
        this.setState({
            addWarehouseVisibility: false
        });
    }
    saveAddWarehouseData = (postObj) => {
        this.props.createWarehouseData(postObj, () => {
            //get updated warehouseData redux state
            const dataClone = JSON.parse(JSON.stringify(this.props.warehouseReducer.warehouseData));
            this.setState({
                warehouseData: dataClone,
                addWarehouseVisibility: false
            });
        });
    }

    // For UpdateWarehouseDataComponent
    showUpdateWarehouseData = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateWarehouse: obj
        });
    }
    unshowUpdateWarehouseData = () => {
        const obj = {
            visibility: true,
            record: null
        }
        this.setState({
            updateWarehouse: obj
        });
    }
    saveUpdateWarehouseData = (postObj, reducerObj) => {
        console.log('Post:' + JSON.stringify(postObj));
        console.log('ReducerObj:' + JSON.stringify(reducerObj))
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getWarehouseData(() => {
                //clone warehouseData. do not work directly
                
                const warehouseDataClone = JSON.parse(JSON.stringify(this.props.warehouseReducer.warehouseData));
                console.log(JSON.stringify(warehouseDataClone))
                this.setState({
                    warehouseData: warehouseDataClone
                });
            });
        }
    }
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateWarehouseData(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Užsakymo numeris',
                dataIndex: 'orderId',
                width: '10'
            },
            {
                title: 'Produkto kiekis sandelyje',
                dataIndex: 'quantityProductWarehouse',
                width: '20%'
            },
            {
                title: 'Fotografija',
                dataIndex: 'photo',
                width: '20%'
            },
            {
                title: 'Paskutini kartą keista',
                dataIndex: 'lastTimeChanging',
                width: '20%',
                render: (text,record,index) =>(
                    <p>{moment(text).format('YYYY/MM-DD')}</p>
                )
            }
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Sandėlys</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite sandėlio produktus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={18}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.state.warehouseData}
                                        pagination={{ pageSize: 15 }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddWarehouseData}>Pridėti prie sandėlio</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addWarehouseVisibility !== false?
                <AddWarehouseDataComponent visible={this.state.addWarehouseVisibility} onClose={this.unshowAddWarehouseData}
                save={this.saveAddWarehouseData} />:null}
                {/* {this.state.addShipmentVisibility !== false ?
                    <AddShipmentComponent onClose={this.unshowShipmentVisibility} save={this.saveAddShipment} visible={this.state.addShipmentVisibility}
                    /> : null}
                {this.state.updateShipmentVisibility.visibility !== false ?
                    <UpdateShipmentComponent visible={this.state.updateShipmentVisibility.visibility}
                        save={this.saveUpdateShipment} onClose={this.unshowUpdateShipment}
                        record={this.state.updateShipmentVisibility.record} /> : null} */}

            </>
        )
    }
}

//get redux states. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        warehouseReducer: state.warehouseReducer
    }
}
//connect to redux states, defining all actions that will be used
export default connect(mapStateToProps, { getWarehouseData, createWarehouseData, updateWarehouseData })(withRouter(WarehouseCountingsScreen))

