import React from 'react'
import { getUsers } from '../Actions/userListActions'
import { Table, Card, Typography, Col, Row, Tag, Checkbox } from 'antd'
import { Image } from 'antd'
import { getOrders, getUncompletedWarehouseOrders, getUncompletedExpressOrders, getOrdersUncompleted, getClientsOrders, getLastWeeksCompletedOrders, getLastMonthCompletedOrders } from '../Actions/orderAction'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWeekWorks, updateWork } from '../Actions/WeeklyWorkScheduleAction'
import { tableCardStyle, tableCardBodyStyle } from '../styles/customStyles.js';
import { getMaterialsWarehouseData } from '../Actions/materialsWarehouseActions';
import { getProducts } from '../Actions/productsActions'
import { getRecentWorks } from '../Actions/recentWorksActions'
import { getWarehouseProducts } from '../Actions/warehouseActions'
import moment from 'moment';
// import { Chart } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2';
import LastWeeksProducts from '../Components/LastWeeksProducts'
import LastMonthProducts from '../Components/LastMonthProducts'




class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            products: [],
            collectionTime: 0,
            bondingTime: 0,
            laserTime: 0,
            paintingTime: 0,
            milingTime: 0,
            packingTime: 0,
            uncompletedExpressOrders: [],
            completedOrdersWarehouse: [],
            done: false,
            lastWeeksMadeProducts: [],
            lastMonthMadeProducts: []
        }
    }
    // const dispatch = useDispatch();
    // const usersReducer = useSelector(state => state.usersReducer)
    // const { currentUser } = usersReducer

    getLastWeeksMadeProducts = () => {
        const clone = JSON.parse(JSON.stringify(this.props.orderDetailsReducer.last_weeks_orders));
        console.log('clone' + JSON.stringify(clone))
        const array = []
        for (var i = 0; i < 5; i++) {
            if (clone[i] !== null && clone[i] !== undefined) {
                let quantity = clone[i].quantity;
                for (var a = i + 1; a < clone.length; a++) {
                    if (clone[i].weekNumber === clone[a].weekNumber) {
                        quantity = quantity + clone[a].quantity;
                        var values = clone.findIndex(x => x.id === clone[a].id)
                        clone.splice(values, 1);
                    }
                }
                const obj = {
                    "quantity": quantity,
                    "weekNumber": clone[i].weekNumber
                }
                array.push(obj)
            }
        }
        console.log('array of orders:' + JSON.stringify(array))
        this.setState({
            lastWeeksMadeProducts: array
        })
    }

    getLastMonthMadeProducts = () => {
        const clone = JSON.parse(JSON.stringify(this.props.orderDetailsReducer.last_month_orders))
        console.log('Month ORDERS: ' + JSON.stringify(clone))
        const array = []
        for (var i = 0; i < 5; i++) {
            if (clone[i] !== null && clone[i] !== undefined) {
                let quantity = clone[i].quantity;
                for (var a = i + 1; a < clone.length; a++) {
                    if (moment(clone[i].orderFinishDate).format('YYYY/MM/DD') === moment(clone[a].orderFinishDate).format('YYYY/MM/DD')) {
                        quantity = quantity + clone[a].quantity;
                        var values = clone.findIndex(x => x.id === clone[a].id)
                        clone.splice(values, 1);
                    }
                }
                const obj = {
                    "quantity": quantity,
                    "orderFinishDate": moment(clone[i].orderFinishDate).format('YYYY/MM/DD')
                }
                array.push(obj)
            }
        }
        console.log('array of MONTH orders:' + JSON.stringify(array))
        this.setState({
            lastMonthMadeProducts: array
        })
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getWeekWorks()
            this.props.getOrders(() => {

                const orderDataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
                // console.log('orders:' + JSON.stringify(orderDataClone))
                this.setState({
                    orders: orderDataClone
                });

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

            this.props.getUncompletedExpressOrders();
            // get from warehouse
            this.props.getWarehouseProducts();
            // get uncompleted orders for warehouse
            this.props.getUncompletedWarehouseOrders();
            // get uncompleted orders
            this.props.getOrdersUncompleted();
            this.props.getLastWeeksCompletedOrders(() => {
                this.getLastWeeksMadeProducts()
            })
            this.props.getLastMonthCompletedOrders(() => {
                this.getLastMonthMadeProducts();
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
        const orderarray = this.state.orders
        const orderCode = orderarray.map((x) => x.productCode)
        const orderStatus = orderarray.map((x) => x.status)
        const productCode = array.map((x) => x.code)
        // console.log(orderCode)
        // console.log(productCode)

        orderCode.forEach(element => {
            productCode.forEach(element1 => {
                orderStatus.forEach(element2 => {
                    // console.log(element)
                    // console.log(element1)
                    if (element === element1 && element2 === false) {
                        // console.log('true')
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
                })
            })
        });


    }
    onChange(value, record) {
        const postObj = {
            "userId": record.userId,
            "description": record.description,
            "done": value,
        }
        const reducerObj = {
            "id": record.id,
            "userId": record.userId,
            "user": record.user,
            "description": record.description,
            "done": value,
            "date": record.date
        }
        this.props.updateWork(postObj, reducerObj);
        console.log(postObj)
        console.log(reducerObj)
        // console.log(e.target.value)

        // this.setState({
        //     done: !this.state.done
        // })
    }
    render() {
        const columns = [
            {
                title: 'Vardas',
                dataIndex: 'user',
                width: '25%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Darbas',
                dataIndex: 'description',
                width: '25%'
            },
            {
                title: 'Atlikta',
                dataIndex: 'done',
                width: '25%',
                render: (text, record, index) => (
                    // <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                    <Checkbox onChange={(e) => this.onChange(e.target.checked, record)} value={text} defaultChecked={text} />
                )
            },
            {
                title: 'Data',
                dataIndex: 'date',
                width: '25%',
                render: (text, record, index) => (
                    <Typography.Text>{moment(text).format('YYYY/MM/DD')}</Typography.Text>
                )
            }
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
                    <Typography.Text>{text === null ? '' : text.type}</Typography.Text>
                )
            },
            {
                title: 'Klientas',
                dataIndex: 'customer',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
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
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
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
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
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
                dataIndex: 'quantityProductWarehouse',
                width: '30%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '30%',
                render: (text, record, index) => (
                    <div>
                        {text === null === text === undefined ?
                            <p></p> : <Image src={text} height={70} />}
                    </div>
                )
            },
        ]

        //daugiausia nepagamintu produktu
        const uncompletedOrders = [
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '25%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '25%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '25%',
                render: (text, record, index) => (
                    <div>
                        {text === null === text === undefined || text.trim() === "" ?
                            <p></p> : <Image src={text} height={70} />}
                    </div>
                )
            },
            {
                title: 'Deadline',
                dataIndex: 'orderFinishDate',
                width: '25%',
                render: (text, record, index) => (
                    <Typography.Text>{moment(text).format("YYYY/MM/DD")}</Typography.Text>
                )
            }
        ]


        const uncompletedWarehouseOrders = [
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '25%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '25%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '25%',
                render: (text, record, index) => (
                    <div>
                        {text === null === text === undefined || text.trim() === "" ?
                            <p></p> : <Image src={text} height={70} />}
                    </div>
                )
            },
            {
                title: 'Deadline',
                dataIndex: 'orderFinishDate',
                width: '25%',
                render: (text, record, index) => (
                    <Typography.Text>{moment(text).format("YYYY/MM/DD")}</Typography.Text>
                )
            },
        ]

        const clientOrders = [
            {
                title: 'Data',
                dataIndex: 'date',
                width: '25%'
            },
            {
                title: 'NR',
                dataIndex: 'orderNumber',
                width: '25%'
            },
            {
                title: 'Klientas',
                dataIndex: 'customer',
                width: '25%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}  {text.companyName}</Typography.Text>
                )
            },
            {
                title: 'Būklė',
                dataIndex: 'status',
                width: '25%',
                render: (text, record, index) => (
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                )
            },
        ]
        return (
            <>
                <h1>Pagrindinis</h1>
                <div style={{ marginTop: 45, marginBottom: 45 }}>

                    <Row>

                        <Col lg={12} md={24} >
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
                        <div style={{ padding: '10px' }}></div>
                        <Col lg={10} md={24} >
                            {/* <Row gutter={16}>
                                <Col span={16}> */}
                            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                <h5>Savaitės ūkio darbai</h5>
                            </div>
                            {/* </Col>
                            </Row> */}
                            {/* <Row gutter={16}> */}
                            {/* <Col span={24}> */}
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    dataSource={this.props.weeklyWorkScheduleReducer.workSchedules}
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

                    {/* Klientu darbu lentele */}
                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Klientų darbų lentelė</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={clientOrders}
                                        dataSource={this.props.orderDetailsReducer.clients_orders}
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

                    {/* daugiausia nepagamintu produkt */}
                    <Col span={24} style={{ marginTop: '60px', bottom: '50px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Daugiausia nepagamintų produktų</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={uncompletedOrders}
                                        dataSource={this.props.orderDetailsReducer.uncompleted_orders}
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
                                    <h5>Gaminimo į sandėlį lentelė</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={uncompletedWarehouseOrders}
                                        dataSource={this.props.orderDetailsReducer.uncompleted_warehouse_orders}
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
                                        dataSource={this.props.warehouseReducer.warehouse_products}
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
                                        dataSource={this.props.recentWorksReducer.recent_works.slice(0, 10)}
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
                                    <h5>Paskutinių gaminių ataskaita per paskutines 30 dienų</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <LastMonthProducts data={this.state.lastMonthMadeProducts} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24} style={{ marginTop: '60px', bottom: '50px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h5>Pagamintų gaminių kiekis</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <LastWeeksProducts data={this.state.lastWeeksMadeProducts} />
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
        orderDetailsReducer: state.orderDetailsReducer,
        warehouseReducer: state.warehouseReducer
    }
}
export default connect(mapStateToProps, { getWeekWorks, getUsers, updateWork, getOrders, getUncompletedWarehouseOrders, getUncompletedExpressOrders, getOrdersUncompleted, getWarehouseProducts, getMaterialsWarehouseData, getLastWeeksCompletedOrders, getClientsOrders, getProducts, getRecentWorks, getLastMonthCompletedOrders })(withRouter(HomeScreen))

