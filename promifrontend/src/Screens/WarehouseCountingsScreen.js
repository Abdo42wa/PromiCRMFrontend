import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWarehouseData, createWarehouseData, updateWarehouseData } from '../Actions/warehouseActions'
import { Table, Space, Select, Card, Typography, Col, Row, Input, Modal, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';

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
        console.log('Save:' + JSON.stringify(postObj))
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
                title: 'Produkto kiekis sandelyje',
                dataIndex: 'quantityProductWarehouse',
                width: '30%'
            },
            {
                title: 'Fotografija',
                dataIndex: 'photo',
                width: '30%',
                render: (value, record, index) => (
                    <Image
                        preview={false}
                        src={value}
                        width={200}
                    />
                )
            },
            {
                title: 'Paskutini kartą keista',
                dataIndex: 'lastTimeChanging',
                width: '30%'
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
                                    {/* <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.addMaterial}>Pridėti materialą</Button></Space> */}
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
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

