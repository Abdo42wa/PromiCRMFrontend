import React from 'react'
import { getUsers } from '../appStore/actions/userListActions'
import { Card, Col, Row } from 'antd'
import {
    getEmployeeMadeProducts, getLastMonthCompletedOrders,
    getLastWeeksCompletedOrders
} from '../appStore/actions/ordersDetailsActions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { tableCardStyle, tableCardBodyStyle } from '../styles/customStyles.js';
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
import UnsendedOrdersComponent from '../components/dashboard_components/UnsendedOrdersComponent'
import UncompletedOrdersByPlatformsComponent from '../components/dashboard_components/UncompletedOrdersByPlatformsComponent'
import UncompletedWarehouseOrdersComponent from '../components/dashboard_components/UncompletedWarehouseOrdersComponent'
import WarehouseProductsComponent from '../components/dashboard_components/WarehouseProductsComponent'
import RecentCompletedServices from '../components/dashboard_components/RecentCompletedServices'

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            // Pagamintu gaminiu ataskaita per 30 dienu. Uz kiekviena diena
            this.props.getLastMonthCompletedOrders()
            //Pagamintu gaminiu ataskaita per 30 dienu. Darbuotoju per menesi pagamintu produktu skaicius
            this.props.getEmployeeMadeProducts()
            // Pagamintu gaminiu kiekis savaitemis
            this.props.getLastWeeksCompletedOrders()
        } else
            this.props.history.push('/login');
    }
    render() {
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
                    <RecomendedOrdersComponent />
                    {/* Klientu darbu lentele */}
                    <ClientsOrdersComponent />
                    {/* Express neatlikti užsakymai */}
                    <UncompletedExpressOrdersComponent />
                    {/* Daugiausia nepagamintu produkt */}
                    <MostUncompletedOrders />
                    {/* Neisiustu siuntiniu lentele */}
                    <UnsendedOrdersComponent />

                    {/* Atvaizdavimas pagal platforma kiek uzsakyta ir labiausiai veluojantys is tu eiles tvarka. */}
                    <UncompletedOrdersByPlatformsComponent />
                    {/* Gaminimo i sandeli lentele */}
                    <UncompletedWarehouseOrdersComponent />
                    {/* Gaminių kiekis sandėlyje */}
                    <WarehouseProductsComponent />
                    {/* Naujausi atlikti darbai. Newest 10 works */}
                    <RecentCompletedServices />
                    {/* Paskutinių gaminių ataskaita per paskutines 30 dienų */}
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
                    {/* Pagamintų gaminių kiekis savaitemis */}
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
        usersListReducer: state.usersListReducer,
        orderDetailsReducer: state.orderDetailsReducer,
    }
}
export default connect(mapStateToProps, {
    getUsers,
    getLastWeeksCompletedOrders,
    getLastMonthCompletedOrders,
    getEmployeeMadeProducts
})(withRouter(HomeScreen))

