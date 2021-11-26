import React from 'react';
import '../App.css'
import { connect } from 'react-redux';
import { getWorks, addWork, updateWork } from '../Actions/WeeklyWorkScheduleAction'
import { getUsers } from '../Actions/userListActions'
import { Table, Space, Card, Typography, Col, Row, Button, Tag } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import AddWeeklyWorkScheduleComponent from '../Components/WeeklyWorkSchedul_components/AddWeeklyWorkScheduleComponent'
import UpdateWeeklyWorkScheduleComponent from '../Components/WeeklyWorkSchedul_components/UpdateWeeklyWorkScheduleComponent'




class WeeklyWorkScheduleScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Works: [],
            addWorkVisibility: false,
            updateWork: {
                visibility: false,
                record: null
            }

        }
    }

    showAddWorkModal = () => {
        this.setState({
            addWorkVisibility: true
        })
    }
    unshowAddWorkModal = () => {
        this.setState({
            addWorkVisibility: false
        })
    }
    saveAddWork = (postObj) => {
        this.props.addWork(postObj, () => {

            const dataClone = JSON.parse(JSON.stringify(this.props.weeklyWorkScheduleReducer.workSchedules));
            this.setState({
                Works: dataClone,
                addWorkVisibility: false
            })
        })
        window.location.reload();
    }

    showWorkModal = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateWork: obj
        })
    }
    unshowWorkModal = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateWork: obj
        });
    }
    saveWork = (postObj, reducerObj) => {
        this.props.updateWork(postObj, reducerObj, () => {

            const dataClone = JSON.parse(JSON.stringify(this.props.weeklyWorkScheduleReducer.workSchedules));
            this.setState({
                Works: dataClone
            });
        });
        this.unshowWorkModal();
    }



    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getWorks(() => {
                const dataClone = JSON.parse(JSON.stringify(this.props.weeklyWorkScheduleReducer.workSchedules))
                this.setState({
                    Works: dataClone
                });
            })
        } else {
            this.props.history.push('/');
        }

    }

    // getUserName = (id) => {
    //     const username = this.state.Works.map((x) => x.user)
    //     const result = username.filter(word => word.id === id);
    //     const name = result.map((x) => x.name)
    //     return name;
    // }
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showWorkModal(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Vartotojo vardas',
                dataIndex: 'user',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Darbas apibūdinimas',
                dataIndex: 'darbasApibūdinimas',
                width: '10%'
            },
            {
                title: 'Atlikta',
                dataIndex: 'atlikta',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='Atlikta'>Atlikta</Tag>}</Typography.Text>
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
                                    <Typography.Title>Savaitės darbo grafikas</Typography.Title>
                                    <Typography.Text>Pridėkite savaitės darbo grafikas.</Typography.Text>

                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.state.Works}
                                        pagination={{ pageSize: 15 }}
                                        bWorked
                                        scroll={{ x: 'calc(700px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddWorkModal}>Pridėti įsakyma</Button></Space>)}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addWorkVisibility !== false ?
                    <AddWeeklyWorkScheduleComponent visible={this.state.addWorkVisibility} save={this.saveAddWork}
                        onClose={this.unshowAddWorkModal} />
                    : null}
                {this.state.updateWork.visibility !== false ?
                    <UpdateWeeklyWorkScheduleComponent visible={this.state.updateWork.visibility} record={this.state.updateWork.record}
                        save={this.saveWork} onClose={this.unshowWorkModal} /> :
                    null}

            </>
        )
    }
}

// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        weeklyWorkScheduleReducer: state.weeklyWorkScheduleReducer,
        usersListReducer: state.usersListReducer
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getWorks, addWork, updateWork, getUsers })(withRouter(WeeklyWorkScheduleScreen))


