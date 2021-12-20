import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Table, Space, Card, Typography, Col, Row, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { getRecentWorks, createRecentWork, updateRecentWork, deleteRecentWork } from '../Actions/recentWorksActions'

class RecentWorksScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addRecentWorkVisibility: false,
            updateRecentWorkComponent: {
                record: null,
                visibility: false
            }
        }
    }
    showAddWork = () => {
        this.setState({
            addRecentWorkVisibility: true
        })
    }
    unshowAddWork = () => {
        this.setState({
            addRecentWorkVisibility: false
        })
    }
    saveAddWork = (postObj) => {
        this.props.createRecentWork(postObj);
    }
    showUpdateWork = (record) => {
        const obj = {
            record: record,
            visibility: true
        }
        this.setState({
            updateRecentWorkComponent: obj
        })
    }
    unshowUpdateWork = (record) => {
        const obj = {
            record: null,
            visibility: false
        }
        this.setState({
            updateRecentWorkComponent: obj
        })
    }
    saveUpdateWork = (postObj, reducerObj) => {
        this.props.updateRecentWork(postObj, reducerObj)
    }
    componentDidMount(){
        this.props.getRecentWorks();
    }

    render() {
        const columns = [
            {
                title: "Laikas",
                dataIndex: "time",
                width: '15%'
            },
            {
                title: "Darbuotojas",
                dataIndex: 'user',
                width: '15%',
                render: (text, record, index) => {
                    <Typography.Text>{text.name}</Typography.Text>
                }
            },
            {
                title: 'Nr',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => {
                    <Typography.Text>{text.orderId}</Typography.Text>
                }
            },
            {
                title: 'Foto',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => {
                    <div>
                        {text.imagePath === null || text.imagePath === undefined ?
                            <p></p> : <Image src={text.imagePath} />}
                    </div>
                }
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '15%'
            }
        ]
        return (
            <>
                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Atlikti darbai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite atliktus darbus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.recentWorksReducer.recent_works}
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
            </>
        )
    }
}

//get redux states
const mapStateToProps = (state)=>{
    return {
        recentWorksReducer: state.recentWorksReducer,
    }
}

export default connect(mapStateToProps,{getRecentWorks,createRecentWork,updateRecentWork,deleteRecentWork})(withRouter(RecentWorksScreen))

