import React from 'react';
import { connect } from 'react-redux';
import { Table, Space, Card, Typography, Col, Row } from 'antd'
import Button from "react-bootstrap/Button";
import { getUsers } from '../Actions/userListActions'
import { withRouter } from 'react-router-dom'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';



class UserListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    registerUser = () => {
        this.props.history.push('/register');
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getUsers(() => {
                const usersClone = JSON.parse(JSON.stringify(this.props.usersListReducer.users));
                this.setState({
                    users: usersClone
                }, () => console.log('Users:' + JSON.stringify(this.state.users)));
            });
        } else {
            this.props.history.push('/login');
        }
    }
    render() {
        const columns = [
            {
                title: 'El. pašas',
                dataIndex: 'email',
                width: '50%'
            },
            {
                title: 'Telefono numeris',
                dataIndex: 'phoneNumber',
                width: '50%'
            }
        ]
        return (
            <>
                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Naudotojai</Typography.Title>
                                    <Typography.Text>Pridėkite naudotojus, kurie galės naudotis sveitaine.</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={18}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.usersListReducer.users}
                                        pagination={{ pageSize: 15 }}
                                    // footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.onOpenAddCompany()}><PlusOutlined />Pridėti kompaniją</Button></Space>)}
                                    />
                                    <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.registerUser}>Pridėti naudotoją</Button></Space>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
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

export default connect(mapStateToProps, { getUsers })(withRouter(UserListScreen));