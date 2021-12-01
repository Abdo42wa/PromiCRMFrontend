import React from 'react';
import { connect } from 'react-redux';
import { getBonuses, createBonus, updateBonus } from '../Actions/bonusActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router';
import AddBonusComponent from '../Components/bonus_components/AddBonusComponent'
import UpdateBonusComponent from '../Components/bonus_components/UpdateBonusComponent'

class BonusScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Bonuses: [],
            addBonusVisibility: false,
            updateBonussVisibility: {
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
        this.props.createBonus(postObj, () => {

            const dataClone = JSON.parse(JSON.stringify(this.props.bonusReducer.bonuses));
            this.setState({
                Bonuses: dataClone,
                addBonusVisibility: false
            })

        })
        window.location.reload();
        this.unshowAddBonusModal();
    }

    //for UpdateBonusComponent
    showUpdateBonusModal = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateBonussVisibility: obj
        })
    }
    unshowUpdateBonusModal = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateBonussVisibility: obj
        });

    }
    saveUpdateBonus = (postObj, reducerObj) => {
        this.props.updateBonus(postObj, reducerObj, () => {
            const bonusClone = this.props.bonusReducer.bonuses;
            this.setState({
                bonuses: bonusClone,
                updateBonussVisibility: false
            });

        });
        this.unshowUpdateBonusModal();
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getBonuses(() => {
            });
        } else {
            this.props.history.push('/login')
        }
    }
    // getUserName = (id) => {
    //     const username = this.props.bonusReducer.bonuses.map((x) => x.user)
    //     if (username === null) {

    //         return;
    //     } else {

    //         const result = username.filter(word => word.id === id);
    //         const name = result.map((x) => x.name)
    //         console.log(name);
    //         return name[0];
    //     }
    // }

    // getUserName = (id) => {
    //     //this.props.getUsers();
    //     //const username = this.props.userListReducer.users;
    //     const result = this.props.usersListReducer.users.filter(word => word.id === id);
    //     const name = result.map((x) => x.name)
    //     console.log(name);
    //     return name[0];
    // }


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
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddBonusModal} >Pridėti bonusą</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>

                {this.state.addBonusVisibility !== false ? <AddBonusComponent visible={this.state.addBonusVisibility} onClose={this.unshowAddBonusModal}
                    save={this.saveAddBonus} /> : null}
                {this.state.updateBonussVisibility.visibility !== false ?
                    <UpdateBonusComponent visible={this.state.updateBonussVisibility.visibility} record={this.state.updateBonussVisibility.record}
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
