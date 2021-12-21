import React from 'react'
import { getUsers } from '../Actions/userListActions'
import { Table, Card, Typography, Col, Row, Tag } from 'antd'
import { Image } from 'antd'
import { getOrders,getUncompletedOrders,getUncompletedExpressOrders, getCompletedWarehouseOrders } from '../Actions/orderAction'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWorks, updateWork } from '../Actions/WeeklyWorkScheduleAction'
import { tableCardStyle, tableCardBodyStyle } from '../styles/customStyles.js';
import { getMaterialsWarehouseData } from '../Actions/materialsWarehouseActions';
import { getProducts } from '../Actions/productsActions'
import { getRecentWorks } from '../Actions/recentWorksActions'
import moment from 'moment';



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Works: [],
            orders: [],
            products: [],
            collectionTime: 0,
            bondingTime: 0,
            laserTime: 0,
            paintingTime: 0,
            milingTime: 0,
            packingTime: 0,
            uncompletedExpressOrders: [],
            completedOrdersWarehouse: []
        }
    }
    // const dispatch = useDispatch();
    // const usersReducer = useSelector(state => state.usersReducer)
    // const { currentUser } = usersReducer
    setCompletedWarehouseOrders = () => {
        const warehouseOrders = JSON.parse(JSON.stringify(this.props.orderDetailsReducer.completed_warehouse_orders))
        const products = JSON.parse(JSON.stringify(this.state.products))
        const array = []
        warehouseOrders.forEach(element => {
            let obj = products.find((obj)=>obj.code === element.productCode);
            if(obj !== undefined){
                const order = {
                    productCode: element.productCode,
                    quantity: element.quantity,
                    imagePath: obj.imagePath
                }
                array.push(order)
            }else{
                array.push(element)
            }
        });
        this.setState({
            completedOrdersWarehouse: array
        })
    }


    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getWorks(() => {
                const dataClone = JSON.parse(JSON.stringify(this.props.weeklyWorkScheduleReducer.workSchedules));
                this.setState({
                    Works: dataClone
                });
                this.props.getOrders(() => {

                    const orderDataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
                    console.log('orders:'+JSON.stringify(orderDataClone))
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
                    console.log(this.getTime());

                })

                this.props.getRecentWorks();
                // this.props.getUncompletedOrders();
                this.props.getUncompletedExpressOrders();
                this.props.getCompletedWarehouseOrders(() => {
                    this.setCompletedWarehouseOrders();
                });
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

    getTime(type) {
        const array = this.state.products //.map((x) => x.collectionTime)
        var sum = array.map((x) => x.collectionTime).reduce((a, b) => {
            return a + b;
        });
        var sum1 = array.map((x) => x.bondingTime).reduce((a, b) => {
            return a + b;
        });
        var sum2 = array.map((x) => x.laserTime).reduce((a, b) => {
            return a + b;
        });
        var sum3 = array.map((x) => x.paintingTime).reduce((a, b) => {
            return a + b;
        });
        var sum4 = array.map((x) => x.milingTime).reduce((a, b) => {
            return a + b;
        });
        var sum5 = array.map((x) => x.packingTime).reduce((a, b) => {
            return a + b;
        });
        this.setState({
            collectionTime: sum,
            bondingTime: sum1,
            laserTime: sum2,
            paintingTime: sum3,
            milingTime: sum4,
            packingTime: sum5
        })
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
        const workColumns = [
            {
                title: 'surinkimo laikas',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{this.state.collectionTime} min</Typography.Text>
                )
            },
            {
                title: 'Suklijavimo laikas',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{this.state.bondingTime} min</Typography.Text>
                )
            },
            {
                title: 'Lazeriavimo laikas',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{this.state.laserTime} min</Typography.Text>
                )
            },
            {
                title: 'Dažymo laikas',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{this.state.paintingTime} min</Typography.Text>
                )
            },
            {
                title: 'Frezavimo laikas',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{this.state.milingTime} min</Typography.Text>
                )
            },
            {
                title: 'Pakavimo laikas',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{this.state.packingTime} min</Typography.Text>
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
                dataIndex: 'imagePath',
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
                    <Typography.Text>{record.status ? <Tag className='atlikta'>Atlikta</Tag> : this.datediff(record.orderFinishDate) < 0 ? <Tag className='Neatlikta'>{Math.abs(this.datediff(record.orderFinishDate))}</Tag> : <Tag className='atlikta'>{Math.abs(this.datediff(record.orderFinishDate))}</Tag>} </Typography.Text>

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

        const recentWorksColumns = [
            {
                title: "Laikas",
                dataIndex: "time",
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{moment(text).format("HH:mm")}  {moment(text).format("YYYY/MM/DD")}</Typography.Text>
                )
            },
            {
                title: 'Nr',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{text.order.orderNumber}</Typography.Text>
                )
            },
            {
                title: 'Kodas',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{text.code}</Typography.Text>
                )
            },
            {
                title: 'Foto',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => (
                    <div>
                        {text.imagePath === null || text.imagePath === undefined ?
                            <p></p> : <Image src={text.imagePath} />}
                    </div>
                )
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '15%'
            },
            {
                title: "Vardas",
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{record.user.name}  {record.workTitle}</Typography.Text>
                )
            },
        ]
        const uncompletedExpressOrderColumns = [
            {
                title: 'Užsakymo pabaigos data',
                dataIndex: 'orderFinishDate',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'Nr',
                dataIndex: 'orderNumber',
                width: '10%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '10%'
            },
            {
                title: 'Prekės kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '10%',
                render: (text, record, index) => (
                    <Image
                        width={100}
                        src={text}
                    />
                )
            },
            {
                title: 'Platforma',
                dataIndex: 'platforma',
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
            }


        ]


        const completedWarehouseOrders = [
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '30%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '30%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '30%',
                render: (text, record, index) => (
                    <div>
                        {text === null || text === undefined ?
                            <p></p> : <Image src={text} height={70}/>}
                    </div>
                )
            },
        ]
        return (
            <>
                <h1>Pagrindinis</h1>
                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Row>
                        <Col span={10} >
                            {/* <Row gutter={16}>
                                <Col span={16}> */}
                            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                <h5>Savaitės darbo grafikas</h5>
                            </div>
                            {/* </Col>
                            </Row> */}
                            {/* <Row gutter={16}> */}
                            {/* <Col span={24}> */}
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    dataSource={this.state.Works}
                                    pagination={{ pageSize: 15 }}
                                    bWorked
                                    scroll={{ x: 'calc(200px + 50%)' }}

                                />

                            </Card>
                            {/* </Col> */}
                            {/* </Row> */}
                        </Col>
                        <Col span={12} offset={1} >
                            {/* <Row gutter={16}>
                                <Col span={16}> */}
                            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                <h5>Suplanuotas darbo laikas</h5>
                            </div>
                            {/* </Col>
                            </Row> */}
                            {/* <Row gutter={16}> */}
                            {/* <Col span={24}> */}
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    rowKey="id"
                                    columns={workColumns}
                                    dataSource={this.state.Works}
                                    pagination={{ pageSize: 15 }}
                                    bWorked
                                    scroll={{ x: 'calc(200px + 50%)' }}

                                />

                            </Card>
                            {/* </Col> */}
                            {/* </Row> */}
                        </Col>

                    </Row>


                    <Col span={24} style={{ marginTop: '20px' }}>
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

                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Express neatlikti užsakymai</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={uncompletedExpressOrderColumns}
                                        dataSource={this.props.orderDetailsReducer.uncompleted_express_orders}
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                        scroll={{ x: 'calc(200px + 50%)' }}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col> 

                    <Col span={24} style={{ marginTop: '60px', bottom: '50px' }}>
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
                    <Col span={24} style={{ marginTop: '60px', bottom: '50px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Gaminių kiekis sandėlyje</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={completedWarehouseOrders}
                                        dataSource={this.state.completedOrdersWarehouse}
                                        pagination={false}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24} style={{ marginTop: '60px', bottom: '50px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Naujausi atlikti darbai</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={recentWorksColumns}
                                        dataSource={this.props.recentWorksReducer.recent_works.slice(0,10)}
                                        pagination={false}
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
        materialsWarehouseReducer: state.materialsWarehouseReducer.materialsWarehouseData,
        recentWorksReducer: state.recentWorksReducer,
        orderDetailsReducer: state.orderDetailsReducer
    }
}
export default connect(mapStateToProps, { getWorks, getUsers, updateWork, getOrders,getUncompletedOrders,getUncompletedExpressOrders, getCompletedWarehouseOrders, getMaterialsWarehouseData, getProducts, getRecentWorks })(withRouter(HomeScreen))

