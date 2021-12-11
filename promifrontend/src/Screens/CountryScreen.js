import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getCountries, addCountry, updateCountry } from '../Actions/countryAction'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddCountryComponents from '../Components/countries_components/AddCountryComponents';
import UpdateCountryComponents from '../Components/countries_components/UpdateCountryComponents';



class CountryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            addCountryVisibility: false,
            updateCountryVisibility: {
                record: null,
                visibility: false
            }


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

    showAddCountry = () => {
        this.setState({
            addCountryVisibility: true
        });
    }

    unshowAddCountry = () => {
        this.setState({
            addCountryVisibility: false
        });
    }

    saveCountry = (postObject) => {
        this.props.addCountry(postObject, () => {
            const countriesClone = this.props.countryReducer.countries;
            this.setState({
                countries: countriesClone,
                addCountryVisibility: false
            });
        });
    }


    showUpdateCountry = (record) => {
        const obj = {
            record: record,
            visibility: true
        }
        this.setState({
            updateCountryVisibility: obj
        }, () => console.log('Record is set:' + JSON.stringify(this.state.updateCountryVisibility.record)));
    }



    unshowUpdateCountry = () => {
        const obj = {
            record: null,
            visibility: false
        }
        this.setState({
            updateCountryVisibility: obj
        });
    }
    saveUpdateCountry = (postObj, reducerObj) => {
        this.props.updateCountry(postObj, reducerObj, () => {
            const countriesClone = this.props.countryReducer.countries;
            this.setState({
                countries: countriesClone,
                updateCountryVisibility: false
            });
        });
    }

    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '25%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateCountry(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Pavadinimas',
                dataIndex: 'name',
                width: '25%'
            },
            {
                title: 'Trumpinys',
                dataIndex: 'shortName',
                width: '25%'
            },
            {
                title: 'Kontinentas',
                dataIndex: 'continent',
                width: '25%'
            }
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Šalys</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite šalis</Typography.Text>
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
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddCountry} >Pridėti šalį</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addCountryVisibility !== false ? <AddCountryComponents visible={this.state.addCountryVisibility} onClose={this.unshowAddCountry}
                    save={this.saveCountry} /> : null}
                {this.state.updateCountryVisibility.visibility !== false ?
                    <UpdateCountryComponents visible={this.state.updateCountryVisibility.visibility} record={this.state.updateCountryVisibility.record}
                        save={this.saveUpdateCountry} onClose={this.unshowUpdateCountry} /> :
                    null}


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
export default connect(mapStateToProps, { getCountries, addCountry, updateCountry })(withRouter(CountryScreen))