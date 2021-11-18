import React from 'react';
import { connect } from 'react-redux';
import { getBonuses, createBonus, updateBonus } from '../Actions/bonusActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router';

class BonusScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addBonusVisibility: false,
            updateBonus: {
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
        console.log('Save postObj:' + JSON.stringify(postObj))
    }

    //for UpdateBonusComponent
    showUpdateBonusModal = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateBonus: obj
        })
    }
    unshowUpdateBonusModal = (record) => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateBonus: obj
        })
    }
    saveUpdateBonus = (postObj, reducerObj) => {
        console.log('PostObj:' + JSON.stringify(postObj))
        console.log('ReducerObj:' + JSON.stringify(reducerObj))
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getBonuses();
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
                dataIndex: 'userId',
                width: '15%'
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
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Bonusai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite bonusus</Typography.Text>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={18}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.bonusReducer.bonuses}
                                        pagination={{ pageSize: 15 }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddCountry} >Pridėti šaly</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {/* {this.state.addCountryVisibility !== false ? <AddCountryComponents visible={this.state.addCountryVisibility} onClose={this.unshowAddCountry}
                    save={this.saveCountry} /> : null}
                {this.state.updateCountryVisibility.visibility !== false ?
                    <UpdateCountryComponents visible={this.state.updateCountryVisibility.visibility} record={this.state.updateCountryVisibility.record}
                        save={this.saveUpdateCountry} onClose={this.unshowUpdateCountry} /> :
                    null} */}


            </>
        )
    }
}

//get redux states.
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        bonusReducer: state.bonusReducer
    }
}

// connect to redux states. defining all actions
export default connect(mapStateToProps, { getBonuses, createBonus, updateBonus })(withRouter(BonusScreen))
