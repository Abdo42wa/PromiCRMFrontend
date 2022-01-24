import React from 'react';
import { connect } from 'react-redux';
import { getBonuses, createBonus, updateBonus } from '../appStore/actions/bonusActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router';
import AddBonusComponent from '../components/bonus_components/AddBonusComponent'
import UpdateBonusComponent from '../components/bonus_components/UpdateBonusComponent'

class BonusScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addBonusVisibility: false,
            updateBonusVisibility: {
                visibility: false,
                record: null
            }
        }
    }

    showAddBonusModal = () => {
        this.setState({
            addBonusVisibility: true
        })
    }
    unshowAddBonusModal = () => {
        this.setState({
            addBonusVisibility: false
        })
    }
    saveAddBonus = (postObj) => {
        this.props.createBonus(postObj)
        this.unshowAddBonusModal();
    }

    //for UpdateBonusComponent
    showUpdateBonusModal = (record) => {
        this.setState(prevState => ({
            updateBonusVisibility: {
                ...prevState.updateBonusVisibility,
                visibility: true,
                record: record
            }
        }))
    }
    unshowUpdateBonusModal = () => {
        this.setState(prevState => ({
            updateBonusVisibility: {
                ...prevState.updateBonusVisibility,
                visibility: false,
                record: null
            }
        }))

    }
    saveUpdateBonus = (postObj, reducerObj) => {
        this.props.updateBonus(postObj, reducerObj)
        this.unshowUpdateBonusModal();
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getBonuses()
        } else {
            this.props.history.push('/login')
        }
    }
    
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '5%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateBonusModal(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Naudotojas',
                dataIndex: 'user',
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name === null || text.name === '' ? '' : text.name} </Typography.Text>
                )
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '15%'
            },
            {
                title: 'Sukaupta',
                dataIndex: 'accumulated',
                width: '20%'
            },
            {
                title: 'Bonusas',
                dataIndex: 'bonusas',
                width: '20%'
            },
            {
                title: 'Liko iki',
                dataIndex: 'leftUntil',
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
                                    <Typography.Title>Bonusai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite bonusus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <div style={{ padding: '15px' }}></div>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.bonusReducer.bonuses}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddBonusModal} >Pridėti bonusą</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>

                {this.state.addBonusVisibility !== false ? <AddBonusComponent visible={this.state.addBonusVisibility} onClose={this.unshowAddBonusModal}
                    save={this.saveAddBonus} /> : null}
                {this.state.updateBonusVisibility.visibility === true ?
                    <UpdateBonusComponent visible={this.state.updateBonusVisibility.visibility} record={this.state.updateBonusVisibility.record}
                        save={this.saveUpdateBonus} onClose={this.unshowUpdateBonusModal} /> :
                    null}

            </>
        )
    }
}

//get redux states.
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        bonusReducer: state.bonusReducer,
        usersListReducer: state.usersListReducer
    }
}

// connect to redux states. defining all actions
export default connect(mapStateToProps, { getBonuses, createBonus, updateBonus })(withRouter(BonusScreen))
