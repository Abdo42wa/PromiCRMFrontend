import React from 'react'
import { getUsers } from '../Actions/userListActions'
import { Table, Card, Typography, Col, Row, Checkbox, Tag } from 'antd'
import { Button, Image, Space } from 'antd'
import { getOrders } from '../Actions/orderAction'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWorks, updateWork } from '../Actions/WeeklyWorkScheduleAction'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import moment from 'moment';



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Works: [],
            orders: []
        }
    }
    // const dispatch = useDispatch();
    // const usersReducer = useSelector(state => state.usersReducer)
    // const { currentUser } = usersReducer

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getWorks(() => {
                const dataClone = JSON.parse(JSON.stringify(this.props.weeklyWorkScheduleReducer.workSchedules));
                this.setState({
                    Works: dataClone
                });
                this.props.getOrders(() => {

                    const orderDataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));

                    this.setState({
                        orders: orderDataClone
                    });
                    console.log(this.state.Works)

                })
            })
        } else {
            this.props.history.push('/login');
        }

    }
    daysDelayed = () => {
        var date1 = new Date("06/30/2019");

        var Difference_In_Time = new Date() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days;
    }
    datediff(first) {
        var future = moment(first);
        var today = new Date();
        var start = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        return future.diff(start, 'days');
    }
    render() {
        const columns = [
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
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                    // <Checkbox value={record.id} onChange={(e) => this.onChange(e)} checked={text === false ? false : true}>Atlikta</Checkbox>
                )
            },
        ]
        const orderColumns = [
            {
                title: 'Atsakingas asmuo',
                dataIndex: 'user',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Užsakymo tipas',
                dataIndex: 'orderType',
                width: '10%'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
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
                title: 'Platforma',
                dataIndex: 'platforma',
                width: '10%'
            },
            {
                title: 'Daugiau informacijos',
                dataIndex: 'moreInfo',
                width: '10%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '10%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'photo',
                width: '10%',
                render: (text, record, index) => (
                    <Image
                        width={100}
                        src={text}
                    />
                )
            },
            {
                title: 'Prekės kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            {
                title: 'Siuntos tipas',
                dataIndex: 'shipment',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.type}</Typography.Text>
                )
            },
            {
                title: 'Klientas',
                dataIndex: 'customer',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Įrenginys',
                dataIndex: 'device',
                width: '10%'
            },
            {
                title: 'Gamybos laikas',
                dataIndex: 'productionTime',
                width: '10%'
            },
            {
                title: 'Adresas',
                dataIndex: 'address',
                width: '10%'
            },
            {
                title: 'Šalis',
                dataIndex: 'country',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Komentaras',
                dataIndex: 'comment',
                width: '10%'
            },
            {
                title: 'Kaina',
                dataIndex: 'price',
                width: '10%'
            },
            {
                title: 'Valiuta',
                dataIndex: 'currency',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'VAT',
                dataIndex: 'vat',
                width: '10%'
            },
            {
                title: 'Užsakymo pabaigos data',
                dataIndex: 'orderFinishDate',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'Vėluojama dienų',
                width: '10%',
                render: (text, record, index) => (
                    <Tag className='Neatlikta'>{this.datediff(record.orderFinishDate)}</Tag>

                )
            }


        ]
        return (
            <>
                <h1>Home</h1>
                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={12} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Savaitės darbo grafikas</h5>
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
                                        scroll={{ x: 'calc(300px + 50%)' }}

                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24} offset={2} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Užsakymai</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={orderColumns}
                                        dataSource={this.state.orders}
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                        scroll={{ x: 'calc(200px + 50%)' }}
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

const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        weeklyWorkScheduleReducer: state.weeklyWorkScheduleReducer,
        usersListReducer: state.usersListReducer,
        orderReducer: state.orderReducer
    }
}
export default connect(mapStateToProps, { getWorks, getUsers, updateWork, getOrders })(withRouter(HomeScreen))

