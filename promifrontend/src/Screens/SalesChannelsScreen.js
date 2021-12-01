import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { getSalesChannels, createSalesChannel, updateSalesChannel } from '../Actions/salesChannelsActions'
import AddSalesChannelComponent from '../Components/sales_channels_components/AddSalesChannelComponent.js';
import UpdateSalesChannelComponent from '../Components/sales_channels_components/UpdateSalesChannelComponent.js';

class SalesChannelsScreen extends React.Component {
    constructor(props) {
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
    showAddSalesChannel = () => {
        this.setState({
            addSalesChannelVisibility: true
        })
    }
    unshowAddSalesChannel = () => {
        this.setState({
            addSalesChannelVisibility: false
        });
    }
    saveAddSalesChannel = (postObj) => {
        this.props.createSalesChannel(postObj);
        this.setState({
            addSalesChannelVisibility: false
        });
    }
    // for updateSalesChannel component
    showUpdateSalesChannel = (record) => {
        const obj = {
            record: record,
            visibility: true
        }
        this.setState({
            updateSalesChannel: obj
        })
    }
    unshowUpdateSalesChannel = () => {
        const obj = {
            record: null,
            visibility: false
        }
        this.setState({
            updateSalesChannel: obj
        })
    }
    saveUpdateSalesChannel = (postObj, reducerObj) => {
        this.props.updateSalesChannel(postObj,reducerObj);
        this.unshowUpdateSalesChannel();
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getSalesChannels(() => {
            });
        }
    }
    render() {
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
                title: 'Kontaktinis asmuo',
                dataIndex: 'contactPerson',
                width: '10%'
            },
            {
                title: 'El. paštas',
                dataIndex: 'email',
                width: '10%'
            },
            {
                title: 'Telefono numeris',
                dataIndex: 'phoneNumber',
                width: '10%'
            },
            {
                title: 'Adresas siuntų pristatymui',
                dataIndex: 'deliveryAddress',
                width: '10%'
            },
            {
                title: 'Nuolaida',
                dataIndex: 'discount',
                width: '10%'
            },

            {
                title: 'Tarpininkavimo mokestis',
                dataIndex: 'brokerageFee',
                width: '10%'
            },
            {
                title: 'Atsakingo asmens vardas',
                dataIndex: 'user',
                width: '10%',
                render: (text,record,index)=>(
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Atsakingo asmens pavardė',
                dataIndex: 'user',
                width: '10%',
                render: (text,record,index)=>(
                    <Typography.Text>{text.surname}</Typography.Text>
                )
            },
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={1}>
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
                            <Col span={23}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.salesChannelsReducer.salesChannels}
                                        pagination={{ pageSize: 15 }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddSalesChannel}>Pridėti pardavimo kanalą</Button></Space>)}
                                    />
                                    {/* <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.addMaterial}>Pridėti materialą</Button></Space> */}
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addSalesChannelVisibility !== false ?
                    <AddSalesChannelComponent visible={this.state.addSalesChannelVisibility} onClose={this.unshowAddSalesChannel}
                        save={this.saveAddSalesChannel} /> : null}
                {this.state.updateSalesChannel.visibility !== false?
                <UpdateSalesChannelComponent visible={this.state.updateSalesChannel.visibility} record={this.state.updateSalesChannel.record}
                    onClose={this.unshowUpdateSalesChannel} save={this.saveUpdateSalesChannel}
                />:null}
                

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        salesChannelsReducer: state.salesChannelsReducer
    }
}

export default connect(mapStateToProps, { getSalesChannels, createSalesChannel, updateSalesChannel })(withRouter(SalesChannelsScreen))
