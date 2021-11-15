import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getCountries } from '../Actions/countryAction'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';



class CountryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],


        }
    }


    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getCountries(() => {
                const countriesClone = JSON.parse(JSON.stringify(this.props.countryReducer.countries));
                this.setState({
                    countries: countriesClone
                });
            });
        } else {
            this.props.history.push('/')
        }
    }
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '20%',
                render: (text, record, index) => (
                    <Button>Atnaujinti</Button>
                )
            },
            {
                title: 'Pavadinimas',
                dataIndex: 'name',
                width: '20%'
            },
            {
                title: 'Trumpas pavadinimas',
                dataIndex: 'shortName',
                width: '20%'
            },
            {
                title: 'kontinentas',
                dataIndex: 'continent',
                width: '20%'
            },
            {
                title: 'šalys Id',
                dataIndex: 'id',
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
                                    <Typography.Title>šalyse</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite šaly</Typography.Text>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={18}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.state.countries}
                                        pagination={{ pageSize: 15 }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }}>Pridėti šaly</Button></Space>)}
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
//getting redux state. mapping to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        countryReducer: state.countryReducer
    }
}

//connect redux states, and define all action that will be used
export default connect(mapStateToProps, { getCountries })(withRouter(CountryScreen))