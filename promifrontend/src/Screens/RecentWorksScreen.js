import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Table, Space, Card, Typography, Col, Row, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { getRecentWorks, createRecentWork, updateRecentWork, deleteRecentWork } from '../Actions/recentWorksActions'
import AddRecentWorkComponent from '../Components/recent_works_components/AddRecentWorkComponent.js';
import moment from 'moment'
import UpdateRecentWorkComponent from '../Components/recent_works_components/UpdateRecentWorkComponent.js';
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
        this.unshowAddWork();
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
    unshowUpdateWork = () => {
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
        this.unshowUpdateWork()
    }
    componentDidMount() {
        if(this.props.usersReducer.currentUser !== null){
            this.props.getRecentWorks();    
        }else{
            this.props.history.push('/login')
        }
        
    }

    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateWork(record)}>Atnaujinti</Button>
                )
            },
            {
                title: "Laikas",
                dataIndex: "time",
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{moment(text).format("HH:mm")}  {moment(text).format("YYYY/MM/DD")}</Typography.Text>
                )
            },
            {
                title: 'Nr',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{text.order.orderNumber}</Typography.Text>
                )
            },
            {
                title: 'Kodas',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{text.code}</Typography.Text>
                )
            },
            {
                title: 'Foto',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => (
                    <div>
                        {text.imagePath === null || text.imagePath === undefined ?
                            <p></p> : <Image src={text.imagePath} />}
                    </div>
                )
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '15%'
            },
            {
                title: "Vardas",
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{record.user.name}  {record.workTitle}</Typography.Text>
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
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddWork}>Pridėti atliktą darbą</Button></Space>)}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addRecentWorkVisibility !== false ?
                    <AddRecentWorkComponent onClose={this.unshowAddWork} save={this.saveAddWork}
                        visible={this.state.addRecentWorkVisibility} /> : null}
                {this.state.updateRecentWorkComponent.visibility !== false ?
                <UpdateRecentWorkComponent onClose={this.unshowUpdateWork} save={this.saveUpdateWork}
                visible={this.state.updateRecentWorkComponent.visibility} record={this.state.updateRecentWorkComponent.record} />:null}
            </>
        )
    }
}

//get redux states
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        recentWorksReducer: state.recentWorksReducer
    }
}

export default connect(mapStateToProps, { getRecentWorks, createRecentWork, updateRecentWork, deleteRecentWork })(withRouter(RecentWorksScreen))

