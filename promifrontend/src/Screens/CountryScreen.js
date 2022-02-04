import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getCountries, addCountry, updateCountry } from '../appStore/actions/countriesAction'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddCountryComponents from '../components/countries_components/AddCountryComponents';
import UpdateCountryComponents from '../components/countries_components/UpdateCountryComponents';



class CountryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCountryVisibility: false,
            updateCountryVisibility: {
                record: null,
                visibility: false
            }


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
        this.props.addCountry(postObject)
        this.unshowAddCountry()
    }


    showUpdateCountry = (record) => {
        this.setState(prevState => ({
            updateCountryVisibility: {
                ...prevState.updateCountryVisibility,
                record: record,
                visibility: true
            }
        }))
    }



    unshowUpdateCountry = () => {
        this.setState(prevState => ({
            updateCountryVisibility: {
                ...prevState.updateCountryVisibility,
                record: null,
                visibility: false
            }
        }))
    }
    saveUpdateCountry = (postObj, reducerObj) => {
        this.props.updateCountry(postObj, reducerObj)
        this.unshowUpdateCountry();
    }
    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getCountries()
        } else {
            this.props.history.push('/login')
        }
        
    }

    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '30%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateCountry(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Pavadinimas',
                dataIndex: 'name',
                width: '35%'
            },
            {
                title: 'Trumpinys',
                dataIndex: 'shortName',
                width: '35%'
            }
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={1}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Šalys</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite šalis</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <div style={{padding: '15px'}}></div>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.countryReducer.countries}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
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