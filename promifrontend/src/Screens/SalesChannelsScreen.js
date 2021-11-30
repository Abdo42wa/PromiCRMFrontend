import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import {getSalesChannels,createSalesChannel,updateSalesChannel} from '../Actions/salesChannelsActions'

class SalesChannelsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // salesChannels: [],
            addSalesChannelVisibility: false,
            updateSalesChannel: {
                record: null,
                visibility: false
            }
        }
    }
    //for addSalesChannel component
    showAddSalesChannel = () =>{
        this.setState({
            addSalesChannelVisibility: true
        })
    }
    unshowSalesChannel = () =>{
        this.setState({
           addSalesChannelVisibility: false 
        });
    }
    saveSalesChannel = (postObj) =>{
        console.log('postObj:'+JSON.stringify(postObj))
    }
    // for updateSalesChannel component
    showUpdateSalesChannel = (record) =>{
        const obj = {
            record: record,
            visibility: true
        }
        this.setState({
            updateSalesChannel: obj
        })
    }
    unshowUpdateSalesChannel = () =>{
        const obj = {
            record: null,
            visibility: false
        }
        this.setState({
            updateSalesChannel: obj
        })
    }
    saveUpdateSalesChannel = (postObj,reducerObj) =>{
        console.log('PostObj:'+JSON.stringify(postObj));
        console.log('ReducerObj:'+JSON.stringify(reducerObj));
    }

    componentDidMount(){
        if(this.props.usersReducer.currentUser !== null){
            this.props.getSalesChannels(()=>{
            });
        }
    }
    render(){
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateSalesChannel(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Pavadinimas',
                dataIndex: 'title',
                width: '10%'
            },
            {
                title: 'Gamybos terminas',
                dataIndex: 'contactPerson',
                width: '15%'
            },
            {
                title: 'Pristatymo kaina',
                dataIndex: 'email',
                width: '15%'
            },
            {
                title: 'Pristatymo numeris',
                dataIndex: 'phoneNumber',
                width: '15%'
            },
            {
                title: 'Pristatymo informacija',
                dataIndex: 'deliveryAddress',
                width: '15%'
            },
            {
                title: 'Pristatymo numeris',
                dataIndex: 'brokerageFee',
                width: '10%'
            },
            {
                title: 'Pristatymo numeris',
                dataIndex: 'userId',
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
                                    <Typography.Title>Pardavimo kanalai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite pardavimo kanalus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={22}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.salesChannelsReducer.salesChannels}
                                        pagination={{ pageSize: 15 }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddSalesChannel}>Pridėti pristatymą</Button></Space>)}
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

const mapStateToProps = (state) =>{
    return {
        usersReducer: state.usersReducer,
        salesChannelsReducer: state.salesChannelsReducer
    }
}

export default connect(mapStateToProps,{getSalesChannels,createSalesChannel,updateSalesChannel})(withRouter(SalesChannelsScreen))
