import React from 'react'
import { getUsers } from '../Actions/userListActions'
import { Table, Card, Typography, Col, Row, Checkbox, Tag } from 'antd'
import { Button, Image, Space } from 'antd'
import { getOrders } from '../Actions/orderAction'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWorks, updateWork } from '../Actions/WeeklyWorkScheduleAction'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { getMaterialsWarehouseData } from '../Actions/materialsWarehouseActions';
import { getProducts } from '../Actions/productsActions'
import moment from 'moment';



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Works: [],
            orders: [],
            products: []
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

                this.props.getProducts(() => {
                    this.props.getMaterialsWarehouseData();
                    const productsDataClone = JSON.parse(JSON.stringify(this.props.productsReducer.products));
                    this.setState({
                        products: productsDataClone
                    });
                })
            })
        } else {
            this.props.history.push('/login');
        }

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
                    // <Tag className='Neatlikta'>{record.status ? 'Atlikta' : this.datediff(record.orderFinishDate)}</Tag>
                    <Typography.Text>{record.status ? <Tag className='atlikta'>Atlikta</Tag> : <Tag className='atlikta'>{this.datediff(record.orderFinishDate)}</Tag>}</Typography.Text>

                )
            }


        ]

        const productColumns = [
            {
                title: 'Produkto id',
                dataIndex: 'id',
                width: '10%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '10%',
                render: (text, record, index) => (
                    <div>
                        {text === null || text === undefined ?
                            <p></p> : <Image src={text} />}
                    </div>
                )
            },
            {
                title: 'Nuoroda',
                dataIndex: 'link',
                width: '10%'
            },
            {
                title: 'Prekės kodas',
                dataIndex: 'code',
                width: '10%'
            },
            {
                title: 'Kategorija',
                dataIndex: 'category',
                width: '10%'
            },
            {
                title: 'Medžiagos',
                dataIndex: 'productMaterials',
                width: '10%',
                render: (text, record, index) => (
                    <div>
                        {record.productMaterials.map((obj, index) => (
                            <Typography.Text>{obj.materialWarehouse.title},</Typography.Text>
                        ))}
                    </div>

                )
            },

            {
                title: 'Produkto pavadinimas',
                dataIndex: 'name',
                width: '10%'
            },
            {
                title: 'Ilgis Be Pakuotės',
                dataIndex: 'lengthWithoutPackaging',
                width: '10%'
            },
            {
                title: 'Ilgis su Pakuotės',
                dataIndex: 'lengthWithPackaging',
                width: '10%'
            },
            {
                title: 'Plotis Be Pakuotės',
                dataIndex: 'widthWithoutPackaging',
                width: '10%'
            },
            {
                title: 'Plotis su Pakuotės',
                dataIndex: 'widthWithPackaging',
                width: '10%'
            },
            {
                title: 'Aukštis Be pakuotės',
                dataIndex: 'heightWithoutPackaging',
                width: '10%'
            },
            {
                title: 'Aukštis su pakuotės',
                dataIndex: 'heightWithPackaging',
                width: '10%'
            },
            {
                title: 'svoris Bruto',
                dataIndex: 'weightGross',
                width: '10%'
            },
            {
                title: 'svoris Netto',
                dataIndex: 'weightNetto',
                width: '10%'
            },
            {
                title: 'surinkimo laikas',
                dataIndex: 'collectionTime',
                width: '10%'
            },
            {
                title: 'Suklijavimo laikas',
                dataIndex: 'bondingTime',
                width: '10%'
            },
            {
                title: 'Lazeriavimo  laikas',
                dataIndex: 'laserTime',
                width: '10%'
            },
            {
                title: 'Dažymo laikas',
                dataIndex: 'paintingTime',
                width: '10%'
            },
            {
                title: 'Frezavimo laikas',
                dataIndex: 'milingTime',
                width: '10%'
            },
            {
                title: 'Pakavimo dėžutės kodas',
                dataIndex: 'packagingBoxCode',
                width: '10%'
            },
            {
                title: 'Pakavimo laikas',
                dataIndex: 'packingTime',
                width: '10%'
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

                    <Col span={24} offset={2} style={{ marginTop: '60px', bottom: '50px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Naujausi produktai</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={productColumns}
                                        dataSource={this.state.products.slice(-3)}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
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
        orderReducer: state.orderReducer,
        productsReducer: state.productsReducer,
        materialsWarehouseReducer: state.materialsWarehouseReducer.materialsWarehouseData
    }
}
export default connect(mapStateToProps, { getWorks, getUsers, updateWork, getOrders, getMaterialsWarehouseData, getProducts })(withRouter(HomeScreen))

