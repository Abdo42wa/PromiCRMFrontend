import React, { useEffect } from 'react'
import { Table, Card, Typography, Col, Row, Tag, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getMainPendingProducts, getTodayMadeProducts, getMainTodayNewOrders, getNecessaryToMakeToday } from '../../appStore/actions/ordersDetailsActions'
//Pagrindiniai rodikliai
function PendingProductsComponent() {
    const dispatch = useDispatch()
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    useEffect(() => {
        dispatch(getMainPendingProducts())
        dispatch(getTodayMadeProducts())
        dispatch(getMainTodayNewOrders())
        dispatch(getNecessaryToMakeToday())
    }, [])
    return (
        //Pagrindiniai rodikliai
        <Col lg={24} style={{ marginTop: '20px' }}>

            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                <h3>Pagrindiniai rodikliai</h3>
            </div>
            <table className="table">
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
                        <td>{orderDetailsReducer.main_pending_products === null ? "" : orderDetailsReducer.main_pending_products === undefined ? "" : orderDetailsReducer.main_pending_products.quantity}</td>
                        <td>{orderDetailsReducer.main_today_made_products === null ? "" : orderDetailsReducer.main_today_made_products === undefined ? "" : orderDetailsReducer.main_today_made_products.quantity}</td>
                        <td>{orderDetailsReducer.main_new_today_orders === null ? "" : orderDetailsReducer.main_new_today_orders === undefined ? "" : orderDetailsReducer.main_new_today_orders.quantity}</td>
                    </tr>
                    <tr>
                        <th scope="row">Būtina šiandien atlikti</th>
                        <td>{orderDetailsReducer.main_necessary_today === null ? "" : orderDetailsReducer.main_necessary_today === undefined ? "" : orderDetailsReducer.main_necessary_today.quantity}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </Col>
    )
}

export default PendingProductsComponent