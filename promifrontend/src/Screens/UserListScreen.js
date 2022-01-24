import React from 'react';
import { connect } from 'react-redux';
import { Table, Space, Card, Typography, Col, Row } from 'antd'
import Button from "react-bootstrap/Button";
import { PlusOutlined } from '@ant-design/icons';
import { getUsers } from '../appStore/actions/userListActions'
import { register } from '../appStore/actions/userAction';
import { withRouter } from 'react-router-dom'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddUserComponent from '../components/users_components/AddUserComponent';



class UserListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addVisibility: false
        }
    }

    showAddComponent = () => {
        this.setState({
            addVisibility: true
        })
    }
    unshowAddComponent = () => {
        this.setState({
            addVisibility: false
        })
    }
    saveAddUser = (postObj) => {
        this.props.register(postObj)
        this.unshowAddComponent()
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getUsers(() => {
            });
        } else {
            this.props.history.push('/login');
        }
    }
    render() {
        const columns = [
            {
                title: 'El. paštas',
                dataIndex: 'email',
                width: '25%'
            },
            {
                title: 'Vardas',
                dataIndex: 'name',
                width: '25%'
            },
            {
                title: 'Pavardė',
                dataIndex: 'surname',
                width: '25%'
            },
            {
                title: 'Telefono numeris',
                dataIndex: 'phoneNumber',
                width: '25%'
            }
        ]
        return (
            <>
                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={1}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Naudotojai</Typography.Title>
                                    <Typography.Text>Pridėkite naudotojus, kurie galės naudotis sveitaine.</Typography.Text>
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
                                        dataSource={this.props.usersListReducer.users}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddComponent}><PlusOutlined />Pridėti naudotoją</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addVisibility === true ?
                    <AddUserComponent onClose={this.unshowAddComponent}
                        saveChanges={this.saveAddUser} visible={this.state.addVisibility} />
                    : null}
            </>
        )
    }
}

// get redux state. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        usersListReducer: state.usersListReducer
    }
}

export default connect(mapStateToProps, { getUsers, register })(withRouter(UserListScreen));