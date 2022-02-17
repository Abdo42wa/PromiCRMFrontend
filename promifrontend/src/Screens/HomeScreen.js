import React from 'react'
import { getUsers } from '../appStore/actions/userListActions'
import { Table, Card, Typography, Col, Row, Tag, Checkbox } from 'antd'
import { Image } from 'antd'
import {
    getOrders, getUncompletedWarehouseOrders, getUncompletedExpressOrders,
    getOrdersUncompleted, getClientsOrders, getLastWeeksCompletedOrders,
    getRecentOrders, getLastMonthCompletedOrders, getUrgetOrders,
    getUncompletedOrdersTimes, getMainPendingProducts, getNecessaryToMakeToday,
    getTodayMadeProducts, getMainTodayNewOrders, getUnsendedOrders, getEmployeeMadeProducts, getRecommendedForProductionOrders
} from '../appStore/actions/ordersAction'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWeekWorks, updateWork } from '../appStore/actions/weeklyworkschedulesAction'
import { tableCardStyle, tableCardBodyStyle } from '../styles/customStyles.js';
import { getMaterialsWarehouseData } from '../appStore/actions/materialsWarehouseActions';
import { getProducts } from '../appStore/actions/productsActions'
import { getWarehouseProducts } from '../appStore/actions/warehouseActions'
import moment from 'moment';
// import { Chart } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2';
import LastWeeksProducts from '../components/LastWeeksProducts'
import LastMonthProducts from '../components/LastMonthProducts'




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
            done: false
        }
    }

    // getUser = (userId) => {
    //     const user = this.props.usersListReducer.users.find(u => String(u.id) === userId)
    //     if (user !== null && user !== undefined) {
    //         return (<p>${user.name} ${user.surname}</p>)
    //     } else {
    //         return <p></p>
    //     }

    // }
    datediff(first) {
        var future = moment(first);
        var today = new Date();
        var start = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        return future.diff(start, 'days');
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

    //employees-made-orders

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            //Pagrindiniai rodikliai. 
            this.props.getMainPendingProducts()
            this.props.getNecessaryToMakeToday()
            this.props.getTodayMadeProducts()
            this.props.getMainTodayNewOrders()

            //Get work times. Suplanuotas darbo laikas
            this.props.getUncompletedOrdersTimes()
            //WeeklyWorkSchedule works. Only for this particular week. Savaites ukio darbai
            this.props.getWeekWorks()
            //Gaminiu tvarkarascio darbai.
            this.props.getUrgetOrders()
            //Klientu darbu lentele. Not-standart works.
            this.props.getClientsOrders();


            //Express neatlikti uzsakymai
            this.props.getUncompletedExpressOrders();
            // get uncompleted orders. Daugiausia nepagamintu produktu
            this.props.getOrdersUncompleted();
            // get uncompleted orders for warehouse. Gaminimo i sandeli lentele
            this.props.getUncompletedWarehouseOrders();
            // get from warehouse. Gaminiu kiekis sandelyje
            this.props.getWarehouseProducts();
            //Get most recents orders/works. Newest 10 works. Naujausi atlikti darbai
            this.props.getRecentOrders();


            // Pagamintu gaminiu ataskaita per 30 dienu. Uz kiekviena diena
            this.props.getLastMonthCompletedOrders()
            //Pagamintu gaminiu ataskaita per 30 dienu. Darbuotoju per menesi pagamintu produktu skaicius
            this.props.getEmployeeMadeProducts()
            // Pagamintu gaminiu kiekis savaitemis
            this.props.getLastWeeksCompletedOrders()
            // Neisiustu siuntiniu lentele
            this.props.getUnsendedOrders()
            // Rekomenduojama gaminti lentele
            this.props.getRecommendedForProductionOrders()
        } else {
            this.props.history.push('/login');
        }

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
        const workTimesColumns = [
            {
                title: 'Lazeriavimo laikas',
                dataIndex: 'laserTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Frezavimo laikas',
                dataIndex: 'milingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Dažymo laikas',
                dataIndex: 'paintingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Šlifavimo laikas',
                dataIndex: 'grindingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Suklijavimo laikas',
                dataIndex: 'bondingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Surinkimo laikas',
                dataIndex: 'collectionTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Pakavimo laikas',
                dataIndex: 'packingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            //DONE TIMES
            {
                title: 'Lazeriavimo laikas(padarytas)',
                dataIndex: 'doneLaserTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Frezavimo laikas(padarytas)',
                dataIndex: 'doneMilingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Dažymo laikas(padarytas)',
                dataIndex: 'donePaintingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Šlifavimo laikas(padarytas)',
                dataIndex: 'doneGrindingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Suklijavimo laikas(padarytas)',
                dataIndex: 'doneBondingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Surinkimo laikas(padarytas)',
                dataIndex: 'doneCollectionTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },
            {
                title: 'Pakavimo laikas(padarytas)',
                dataIndex: 'donePackingTime',
                width: '10%',
                render: (text, record, index) => {
                    if (Math.floor(text / 60) === 0) {
                        return (
                            <Typography.Text>{Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    } else {
                        return (
                            <Typography.Text>{Math.floor(text / 60)}h {Math.round(((text / 60) - Math.floor(text / 60)) * 60)} m</Typography.Text>
                        )
                    }
                }
            },

        ]
        const urgentOrders = [
            {
                title: 'Deadline',
                dataIndex: 'orderFinishDate',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'NR',
                dataIndex: 'orderNumber',
                width: '10%'
            },
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            // {
            //     title: 'Foto',
            //     dataIndex: 'product',
            //     width: '10%',
            //     render: (text, record, index) => (
            //         <div>
            //             {text.imagePath === null || text.imagePath === undefined ?
            //                 <p></p> : <Image src={text.imagePath} />}
            //         </div>
            //     )
            // },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '10%'
            },
            {
                title: 'Užsakymo tipas',
                dataIndex: 'orderType',
                width: '10%'
            },
            {
                title: 'Platforma',
                dataIndex: 'platforma',
                width: '10%'
            },
            // {
            //     title: 'Surinkta',
            //     dataIndex: 'CollectionUserId',
            //     width: '10%',
            //     render: (text, record, index) => {
            //         this.getUser
            //     }
            // },
            {
                title: 'Vėluojama dienų',
                width: '10%',
                render: (text, record, index) => (
                    // <Tag className='Neatlikta'>{record.status ? 'Atlikta' : this.datediff(record.orderFinishDate)}</Tag>
                    <Typography.Text>{record.status ? <Tag className='atlikta'>Atlikta</Tag> : this.datediff(record.orderFinishDate) < 0 ? <Tag className='Neatlikta'>{Math.abs(this.datediff(record.orderFinishDate))}</Tag> : <Tag className='atlikta'>{Math.abs(this.datediff(record.orderFinishDate))}</Tag>} </Typography.Text>

                )
            }
        ]
        const productionOrders = [
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '10%'
            }
        ]



        const recentWorksColumns = [
            {
                title: "Laikas",
                dataIndex: "CompletionDate",
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{moment(text).format("HH:mm")}  {moment(text).format("YYYY/MM/DD")}</Typography.Text>
                )
            },
            {
                title: 'Nr',
                dataIndex: 'orderNumber',
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{text.orderNumber}</Typography.Text>
                )
            },
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '15%',
                render: (text, record, index) => (
                    <Typography.Text>{text}</Typography.Text>
                )
            },
            {
                title: 'Foto',
                dataIndex: 'product',
                width: '15%',
                render: (text, record, index) => {
                    if (text === null || text === undefined) {
                        if (record.imagePath === undefined || record.imagePath === null) {
                            return (<p></p>)
                        } else {
                            return (<Image src={record.imagePath} height={30} alt='Foto' />)
                        }
                    } else {
                        if (text.imagePath === null)
                            return (<p></p>)
                        else
                            return (<Image src={text.imagePath} height={30} alt='Foto' />)
                    }
                }
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
                    <Typography.Text>{record.user.name}  {record.packingComplete !== null ? <p>Supakavo</p> : <p></p>}</Typography.Text>
                )
            },
        ]
        const uncompletedExpressOrderColumns = [
            {
                title: 'Dealinas',
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
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            {
                title: 'Foto',
                dataIndex: 'imagePath',
                width: '10%',
                render: (text, record, index) => {
                    if (text === null || text === undefined)
                        return (<p></p>)
                    else
                        return <Image src={text} height={40} alt='Foto' />
                }
            },
            {
                title: 'Platforma',
                dataIndex: 'platforma',
                width: '10%'
            }
        ]


        const completedWarehouseOrders = [
            {
                title: 'Kiekis',
                dataIndex: 'quantityProductWarehouse',
                width: '30%'
            },
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '30%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '30%',
                render: (text, record, index) => (
                    <div>
                        {text === null || text === undefined ?
                            <p></p> : <Image src={text} height={30} />}
                    </div>
                )
            },
        ]

        //daugiausia nepagamintu produktu
        const uncompletedOrders = [
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '20%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '20%'
            },
            {
                title: 'Nuotrauka',
                dataIndex: 'imagePath',
                width: '20%',
                render: (text, record, index) => (
                    <div>
                        {text === null || text === undefined ?
                            <p></p> : <Image src={text} height={30} />}
                    </div>
                )
            }
        ]

        // Neisiustu siuntiniu lentele
        const unsendedOrders = [
            {
                title: 'Uzsakymo numeris',
                dataIndex: 'orderNumber',
                width: '20%'
            },
            {
                title: 'Data',
                dataIndex: 'orderFinishDate',
                width: '20%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '20%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '20%'
            }
        ]


        const uncompletedWarehouseOrders = [
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '20%'
            },
            {
                title: 'Kodas',
                dataIndex: 'productCode',
                width: '20%'
            },
            {
                title: 'Foto',
                dataIndex: 'imagePath',
                width: '20%',
                render: (text, record, index) => (
                    <div>
                        {text === null || text === undefined ?
                            <p></p> : <Image src={text} height={30} />}
                    </div>
                )
            },
            // {
            //     title: 'Deadline(didžiausia)',
            //     dataIndex: 'orderFinishDate',
            //     width: '20%',
            //     render: (text, record, index) => (
            //         <Typography.Text>{moment(text).format("YYYY/MM/DD")}</Typography.Text>
            //     )
            // },
            {
                title: 'Data(seniausia)',
                dataIndex: 'minOrderFinishDate',
                width: '20%',
                render: (text, record, index) => (
                    <Typography.Text>{moment(text).format("YYYY/MM/DD")}</Typography.Text>
                )
            }
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
                width: '25%',
            },
            {
                title: 'Klientas',
                dataIndex: 'customer',
                width: '25%',
                render: (text, record, index) => {
                    if (text === null)
                        return (<p></p>)
                    else
                        return (<Typography.Text>{text.name}  {text.companyName}</Typography.Text>)

                }
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
                <div style={{ marginTop: 45, marginBottom: 45 }}>

                    <Col lg={24} style={{ marginTop: '20px' }}>

                        <div style={{ marginRight: '40px', textAlign: 'start' }}>
                            <h3>Pagrindiniai rodikliai</h3>
                        </div>
                        <table class="table">
                            <thead style={{ background: 'black', color: 'whitesmoke' }}>
                                <tr>
                                    <th scope="col-25"></th>
                                    <th scope="col-25">Viso</th>
                                    <th scope="col-25">Šiandien pagaminta</th>
                                    <th scope="col-25">Nauji užsakyti gaminiai (2 d.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Laukiantys gaminiai</th>
                                    <td>{this.props.orderDetailsReducer.main_pending_products === null ? "" : this.props.orderDetailsReducer.main_pending_products === undefined ? "" : this.props.orderDetailsReducer.main_pending_products.quantity}</td>
                                    <td>{this.props.orderDetailsReducer.main_today_made_products === null ? "" : this.props.orderDetailsReducer.main_today_made_products === undefined ? "" : this.props.orderDetailsReducer.main_today_made_products.quantity}</td>
                                    <td>{this.props.orderDetailsReducer.main_new_today_orders === null ? "" : this.props.orderDetailsReducer.main_new_today_orders === undefined ? "" : this.props.orderDetailsReducer.main_new_today_orders.quantity}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Būtina šiandien atlikti</th>
                                    <td>{this.props.orderDetailsReducer.main_necessary_today === null ? "" : this.props.orderDetailsReducer.main_necessary_today === undefined ? "" : this.props.orderDetailsReducer.main_necessary_today.quantity}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                    </Col>

                    <Col lg={24} style={{ marginTop: '20px' }}>
                        {/* <Row gutter={16}>
                                <Col span={16}> */}
                        <div style={{ marginRight: '40px', textAlign: 'start' }}>
                            <h3>Suplanuotas darbo laikas</h3>
                        </div>
                        {/* </Col>
                            </Row> */}
                        {/* <Row gutter={16}> */}
                        {/* <Col span={24}> */}
                        <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                            <Table
                                rowKey="id"
                                columns={workTimesColumns}
                                dataSource={this.props.orderDetailsReducer.uncompleted_orders_times}
                                pagination={{ pageSize: 15 }}
                                bWorked
                                scroll={{ x: 'calc(200px + 50%)' }}

                            />

                        </Card>
                        {/* </Col> */}
                        {/* </Row> */}
                    </Col>
                    <Col lg={24} style={{ marginTop: '20px' }}>
                        {/* <Row gutter={16}>
                                <Col span={16}> */}
                        <div style={{ marginRight: '40px', textAlign: 'start' }}>
                            <h3>Savaitės ūkio darbai</h3>
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

                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Gaminių tvarkaraškis(Užsakymai)</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={urgentOrders}
                                        dataSource={this.props.orderDetailsReducer.urgent_orders}
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
                                    <h3>Rekomenduojama gaminti(Užsakymai)</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={productionOrders}
                                        dataSource={this.props.productionOrders}
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
                                    <h3>Klientų darbų lentelė</h3>
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
                                    <h3>Express neatlikti užsakymai</h3>
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

                    {/* <Col span={24} style={{ marginTop: '60px', bottom: '50px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Naujausi produktai</h3>
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
                    </Col> */}

                    {/* daugiausia nepagamintu produkt */}
                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Daugiausia nepagamintų produktų</h3>
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

                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Neisiustu siuntiniu lentele</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={unsendedOrders}
                                        dataSource={this.props.orderDetailsReducer.unsended_orders}
                                        pagination={false}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Gaminimo į sandėlį lentelė</h3>
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
                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Gaminių kiekis sandėlyje</h3>
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
                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Naujausi atlikti darbai</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={recentWorksColumns}
                                        dataSource={this.props.orderDetailsReducer.recent_orders}
                                        pagination={false}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Paskutinių gaminių ataskaita per paskutines 30 dienų</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <LastMonthProducts data={this.props.orderDetailsReducer.last_month_orders} />
                                </Card>
                            </Col>
                        </Row>
                        <div className='row' style={{ marginTop: '15px', marginBottom: '15px' }}>
                            {this.props.orderDetailsReducer.employees_made_products !== undefined && this.props.orderDetailsReducer.employees_made_products &&
                                this.props.orderDetailsReducer.employees_made_products.map((element) => (
                                    <div className='col' style={{ padding: '10px' }}>
                                        <div style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                            <h3>{element.user.name} {element.user.surname}: {element.quantity}</h3>
                                        </div>
                                    </div>
                                ))}
                        </div>

                    </Col>

                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Pagamintų gaminių kiekis savaitemis</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <LastWeeksProducts data={this.props.orderDetailsReducer.last_weeks_orders} />
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
        orderDetailsReducer: state.orderDetailsReducer,
        productionOrders: state.orderDetailsReducer.production_orders,
        warehouseReducer: state.warehouseReducer
    }
}
export default connect(mapStateToProps, {
    getWeekWorks, getUsers, updateWork,
    getOrders, getUncompletedWarehouseOrders, getUncompletedExpressOrders,
    getOrdersUncompleted, getWarehouseProducts, getMaterialsWarehouseData,
    getLastWeeksCompletedOrders, getClientsOrders, getProducts,
    getLastMonthCompletedOrders, getUrgetOrders, getRecentOrders,
    getUncompletedOrdersTimes, getMainPendingProducts, getNecessaryToMakeToday,
    getTodayMadeProducts, getMainTodayNewOrders, getUnsendedOrders, getEmployeeMadeProducts, getRecommendedForProductionOrders
})(withRouter(HomeScreen))

