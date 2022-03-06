import React from 'react'
import { getUsers } from '../appStore/actions/userListActions'
import { Table, Card, Typography, Col, Row, Tag, Checkbox } from 'antd'
import { Image } from 'antd'
import { getOrders } from '../appStore/actions/ordersAction'
import {
    getEmployeeMadeProducts, getLastMonthCompletedOrders, getLastWeeksCompletedOrders,
    getMainPendingProducts, getRecentOrders, getUncompletedOrdersTimes, getNecessaryToMakeToday,
    getTodayMadeProducts, getMainTodayNewOrders, getUnsendedOrders,
    getUncompletedWarehouseOrders,
    getUncompletedOrdersByPlatforms
} from '../appStore/actions/ordersDetailsActions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tableCardStyle, tableCardBodyStyle } from '../styles/customStyles.js';
import { getMaterialsWarehouseData } from '../appStore/actions/materialsWarehouseActions';
import { getProducts } from '../appStore/actions/productsActions'
import { getWarehouseProducts } from '../appStore/actions/warehouseActions'
import moment from 'moment';
import LastWeeksProducts from '../components/LastWeeksProducts'
import LastMonthProducts from '../components/LastMonthProducts'
import PendingProductsComponent from '../components/dashboard_components/PendingProductsComponent'
import PlannedWorkTimeComponent from '../components/dashboard_components/PlannedWorkTimeComponent'
import WeeklyWorkScheduleComponent from '../components/dashboard_components/WeeklyWorkScheduleComponent'
import UrgentOrdersComponent from '../components/dashboard_components/UrgentOrdersComponent'
import RecomendedOrdersComponent from '../components/dashboard_components/RecomendedOrdersComponent'
import ClientsOrdersComponent from '../components/dashboard_components/ClientsOrdersComponent'
import UncompletedExpressOrdersComponent from '../components/dashboard_components/UncompletedExpressOrdersComponent'
import MostUncompletedOrders from '../components/dashboard_components/MostUncompletedOrders'




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

    //employees-made-orders

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            // get uncompleted orders for warehouse. Gaminimo i sandeli lentele
            this.props.getUncompletedWarehouseOrders();
            // get from warehouse. Gaminiu kiekis sandelyje
            this.props.getWarehouseProducts();
            //Get most recents orders/works. Newest 10 works. Naujausi atlikti darbai
            this.props.getRecentOrders();

            //Atvaizdavimas pagal platforma kiek uzsakyta ir labiausiai veluojantys is tu eiles tvarka.
            this.props.getUncompletedOrdersByPlatforms()


            // Pagamintu gaminiu ataskaita per 30 dienu. Uz kiekviena diena
            this.props.getLastMonthCompletedOrders()
            //Pagamintu gaminiu ataskaita per 30 dienu. Darbuotoju per menesi pagamintu produktu skaicius
            this.props.getEmployeeMadeProducts()
            // Pagamintu gaminiu kiekis savaitemis
            this.props.getLastWeeksCompletedOrders()
            // Neisiustu siuntiniu lentele
            this.props.getUnsendedOrders()
        } else {
            this.props.history.push('/login');
        }

    }

    render() {
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

        const uncompleted_orders_by_platforms_columns = [
            {
                title: 'Platforma',
                dataIndex: 'platforma',
                width: '20%',
                render: (text, record, index) => (
                    <Typography.Text>{text !== null ? text : ""}</Typography.Text>
                )
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '20%'
            },
            {
                title: 'Kaina',
                dataIndex: 'price',
                width: '20%',
                render: (text, record, index) => (
                    <Typography.Text>{text !== null ? text : ""}</Typography.Text>
                )
            },
            {
                title: 'Platforma',
                dataIndex: 'orderFinishDate',
                width: '20%',
                render: (text, record, index) => (
                    <Typography.Text>{text !== null ? moment(text).format("YYYY/MM/DD") : ""}</Typography.Text>
                )
            },
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

        
        return (
            <>
                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    {/* Pagrindiniai rodikliai */}
                    <PendingProductsComponent />
                    {/* Suplanuotas darbo laikas */}
                    <PlannedWorkTimeComponent />
                    {/* Savaites ukio darbai */}
                    <WeeklyWorkScheduleComponent />
                    {/* Gaminiu tvarkarastis(Uzsakymai) / Urgent Orders*/}
                    <UrgentOrdersComponent />
                    {/* Rekomenduojama gaminti(Užsakymai) */}
                    <RecomendedOrdersComponent/>
                    {/* Klientu darbu lentele */}
                    <ClientsOrdersComponent/>
                    {/* Express neatlikti užsakymai */}
                    <UncompletedExpressOrdersComponent/>
                    {/* Daugiausia nepagamintu produkt */}
                    <MostUncompletedOrders/>
                    
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

                    {/* //Atvaizdavimas pagal platforma kiek uzsakyta ir labiausiai veluojantys is tu eiles tvarka. */}
                    <Col span={24} style={{ marginTop: '20px' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <h3>Nepadaryti užsakymai pagal Platforma</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={uncompleted_orders_by_platforms_columns}
                                        dataSource={this.props.orderDetailsReducer.uncompleted_orders_by_platforms}
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
                                    <div id={element.id + "fa"} className='col' style={{ padding: '10px' }}>
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
        warehouseReducer: state.warehouseReducer
    }
}
export default connect(mapStateToProps, {
    getUsers,
    getOrders, getUncompletedWarehouseOrders,
    getWarehouseProducts, getMaterialsWarehouseData,
    getLastWeeksCompletedOrders, getProducts,
    getLastMonthCompletedOrders, getRecentOrders,
    getUncompletedOrdersTimes, getMainPendingProducts, getNecessaryToMakeToday,
    getTodayMadeProducts, getMainTodayNewOrders, getUnsendedOrders,
    getEmployeeMadeProducts,getUncompletedOrdersByPlatforms
})(withRouter(HomeScreen))

