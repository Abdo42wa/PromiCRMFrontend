import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWarehouseData, createWarehouseData, updateWarehouseData, updateWarehouseWithImg } from '../appStore/actions/warehouseActions'
import { Table, Space, Card, Typography, Col, Row, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddWarehouseDataComponent from '../components/warehouse_components/AddWarehouseDataComponent'
import moment from 'moment';
import UpdateWarehouseDataComponent from '../components/warehouse_components/UpdateWarehouseDataComponent';

class WarehouseCountingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.props.createWarehouseData(postObj)
        this.unshowAddWarehouseData()
    }

    // For UpdateWarehouseDataComponent
    showUpdateWarehouseData = (record) => {
        this.setState(prevState => ({
            updateWarehouse: {
                ...prevState.updateWarehouse,
                visibility: true,
                record: record
            }
        }))
    }
    unshowUpdateWarehouseData = () => {
        this.setState(prevState =>({
            updateWarehouse: {
                ...prevState.updateWarehouse,
                visibility: false,
                record: null
            }
        }))
    }
    saveUpdateWarehouseData = (postObj, reducerObj) => {
        this.props.updateWarehouseData(postObj, reducerObj)
        this.unshowUpdateWarehouseData();
    }

    saveUpdateWarehouseWithImg = (postObj, id) => {
        this.props.updateWarehouseWithImg(postObj, id);
        this.unshowUpdateWarehouseData();
    }


    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getWarehouseData()
        } else {
            this.props.history.push('/login')
        }
    }
    render() {
        const columns = [
            // {
            //     title: 'Atnaujinti',
            //     width: '10%',
            //     render: (text, record, index) => (
            //         <Button onClick={(e) => this.showUpdateWarehouseData(record)}>Atnaujinti</Button>
            //     )
            // },
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
                title: 'Nuotrauka',
                dataIndex: 'order',
                width: '20%',
                render: (text, record, index) => (
                    <div>
                        {text === null || text === undefined ?
                            <p></p> : <Image src={text.imagePath} />}
                    </div>
                )
            },
            {
                title: 'Paskutini kartą keista',
                dataIndex: 'lastTimeChanging',
                width: '20%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD,h:mm:ss a')}</p>
                )
            }
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={1}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Sandėlys</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite sandėlio produktus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <div style={{ padding: '15px' }}></div>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.warehouseReducer.warehouseData}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                    //footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddWarehouseData}>Pridėti prie sandėlio</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addWarehouseVisibility !== false ?
                    <AddWarehouseDataComponent visible={this.state.addWarehouseVisibility} onClose={this.unshowAddWarehouseData}
                        save={this.saveAddWarehouseData} /> : null}
                {this.state.updateWarehouse.visibility !== false ?
                    <UpdateWarehouseDataComponent visible={this.state.updateWarehouse.visibility} save={this.saveUpdateWarehouseData}
                        record={this.state.updateWarehouse.record} onClose={this.unshowUpdateWarehouseData}
                        saveWithImg={this.saveUpdateWarehouseWithImg} />
                    : null}

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
export default connect(mapStateToProps, { getWarehouseData, createWarehouseData, updateWarehouseData, updateWarehouseWithImg })(withRouter(WarehouseCountingsScreen))

