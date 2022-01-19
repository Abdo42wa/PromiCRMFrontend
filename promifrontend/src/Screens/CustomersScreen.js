import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCustomers, createCustomer, updateCustomer } from '../Actions/customersActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddCustomerComponent from '../Components/customers_components/AddCustomerComponent';
import UpdateCustomerComponent from '../Components/customers_components/UpdateCustomerComponent';

class CustomersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            addCustomerVisibility: false,
            updateCustomer: {
                visibility: false,
                record: null
            }
        }
    }
    //FOR AddCustomerComponent
    showAddCustomer = () => {
        this.setState({
            addCustomerVisibility: true
        });
    }
    unshowAddCustomer = () => {
        this.setState({
            addCustomerVisibility: false
        });
    }
    saveAddCustomer = (postObj) => {
        this.props.createCustomer(postObj, () => {
            //clone update customersReducer
            const customersClone = JSON.parse(JSON.stringify(this.props.customersReducer.customers));
            this.setState({
                customers: customersClone,
                addCustomerVisibility: false
            });
        });
    }

    // FOR UpdateCustomerComponent
    showUpdateCustomer = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateCustomer: obj
        });
    }
    unshowUpdateCustomer = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateCustomer: obj
        });
    }
    saveUpdateCustomer = (postObj, reducerObj) => {
        this.props.updateCustomer(postObj, reducerObj, () => {
            //get updated customers from redux state. clone it
            const customersClone = JSON.parse(JSON.stringify(this.props.customersReducer.customers));
            this.setState({
                customers: customersClone
            });
            this.unshowUpdateCustomer();
        });
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getCustomers(() => {
                // clone customers redux state.
                const customersClone = JSON.parse(JSON.stringify(this.props.customersReducer.customers));
                this.setState({
                    customers: customersClone
                });
                this.unshowUpdateCustomer();
            });
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
                    <Button onClick={(e) => this.showUpdateCustomer(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Vardas',
                dataIndex: 'name',
                width: '15%'
            },
            {
                title: 'Pavardė',
                dataIndex: 'lastName',
                width: '15%'
            },
            {
                title: 'El. paštas',
                dataIndex: 'email',
                width: '20%'
            },
            {
                title: 'Telefono numeris',
                dataIndex: 'phoneNumber',
                width: '20%'
            },
            {
                title: 'Kompanijos vardas',
                dataIndex: 'companyName',
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
                                    <Typography.Title>Klientai</Typography.Title>
                                    <Typography.Text>Pridėkite klientus ir atnaujinkite jų informaciją</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <div style={{padding: '15px'}}></div>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.customersReducer.customers}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddCustomer}>Pridėti klientą</Button></Space>)}
                                    />                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addCustomerVisibility !== false ?
                    <AddCustomerComponent visible={this.state.addCustomerVisibility}
                        save={this.saveAddCustomer} onClose={this.unshowAddCustomer} /> : null}
                {this.state.updateCustomer.visibility !== false ?
                    <UpdateCustomerComponent visible={this.state.updateCustomer.visibility}
                        save={this.saveUpdateCustomer} onClose={this.unshowUpdateCustomer}
                        record={this.state.updateCustomer.record}
                    /> : null}
            </>
        )
    }
}

// get redux states. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        customersReducer: state.customersReducer
    }
}
// connect to redux states, defining all action that will be used
export default connect(mapStateToProps, { getCustomers, createCustomer, updateCustomer })(withRouter(CustomersScreen))