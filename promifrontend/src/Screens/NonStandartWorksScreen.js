import React from 'react';
import { connect } from 'react-redux';
import { getNonStandartWorks, createNonStandartWork, updateNonStandartWork } from '../Actions/nonStandartWorksActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import AddNonStandartWorkComponent from '../Components/nonStandartWorks_components/AddNonStandartWorkComponent';
import moment from 'moment';
import UpdateNonStandartWorkComponent from '../Components/nonStandartWorks_components/UpdateNonStandartWork';


class NonStandartWorksScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nonStandartWorks: [],
            addWorkVisibility: false,
            updateWork: {
                visibility: false,
                record: null
            }
        }
    }
    // For AddNonStandartWorkComponent
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
        this.props.createNonStandartWork(postObj, () => {
            //clone updated nonStandartData state from redux
            const dataClone = JSON.parse(JSON.stringify(this.props.nonStandartWorksReducer.nonStandartWorks));
            this.setState({
                nonStandartWorks: dataClone,
                addWorkVisibility: false
            })
        })
    }
    // For UpdateNonStandartWorkComponent
    showUpdateWorkModal = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateWork: obj
        })
    }
    unshowUpdateWorkModal = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateWork: obj
        });
    }
    saveUpdateWork = (postObj, reducerObj) => {
        this.props.updateNonStandartWork(postObj, reducerObj, () => {
            //clone updated nonStandartWorks state from redux
            const dataClone = JSON.parse(JSON.stringify(this.props.nonStandartWorksReducer.nonStandartWorks));
            this.setState({
                nonStandartWorks: dataClone
            });
            this.unshowUpdateWorkModal();
        });
    }
    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getNonStandartWorks(() => {
                const dataClone = JSON.parse(JSON.stringify(this.props.nonStandartWorksReducer.nonStandartWorks))
                this.setState({
                    nonStandartWorks: dataClone
                });
            })
        } else {
            this.props.history.push('/');
        }
    }
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateWorkModal(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Užsakymo numeris',
                dataIndex: 'orderNumber',
                width: '10%'
            },
            {
                title: 'Data',
                dataIndex: 'date',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'Užsakymo deadline',
                dataIndex: 'orderDeadline',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'Dienos iki deadline',
                dataIndex: 'daysUntilDeadline',
                width: '10%'
            },
            {
                title: 'Kliento id',
                dataIndex: 'customerId',
                width: '10%'
            },
            {
                title: 'Prietaisas',
                dataIndex: 'device',
                width: '10%'
            },
            {
                title: 'Planuojamas produkcijos laikas',
                dataIndex: 'plannedProductionTime',
                width: '10%'
            },
            {
                title: 'Komentaras',
                dataIndex: 'comment',
                width: '10%'
            },
            {
                title: 'Materialo id',
                dataIndex: 'materialId',
                width: '10%'
            },
            {
                title: 'Statusas',
                dataIndex: 'status',
                width: '10%',
                render: (text, record, index) => (
                    <p>{text === false ? 'Neįvykdytas' : 'Ivykdytas'}</p>
                )
            }

        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Nestandartiniai darbai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite nestandartinius darbus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.state.nonStandartWorks}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(700px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddWorkModal}>Pridėti nestandartinį darbą</Button></Space>)}
                                    />
                                    {/* <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.addMaterial}>Pridėti materialą</Button></Space> */}
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addWorkVisibility !== false ?
                    <AddNonStandartWorkComponent visible={this.state.addWorkVisibility} save={this.saveAddWork}
                        onClose={this.unshowAddWorkModal} />
                    : null}
                {this.state.updateWork.visibility !== false ?
                    <UpdateNonStandartWorkComponent visible={this.state.updateWork.visibility} record={this.state.updateWork.record}
                        save={this.saveUpdateWork} onClose={this.unshowUpdateWorkModal} />
                    : null}

            </>
        )
    }
}

// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        nonStandartWorksReducer: state.nonStandartWorksReducer
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getNonStandartWorks, createNonStandartWork, updateNonStandartWork })(withRouter(NonStandartWorksScrenn))


