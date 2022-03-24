import React, { useEffect, useState } from 'react'
import { Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getMainPendingProducts, getTodayMadeProducts, getMainTodayNewOrders, getNecessaryToMakeToday, getAmountOfBoxs } from '../../appStore/actions/ordersDetailsActions'
import { getMaterialsWarehouseData } from '../../appStore/actions/materialsWarehouseActions'
//Pagrindiniai rodikliai
function PendingProductsComponent() {
    const dispatch = useDispatch()
    const [boxNumer, setBoxNumer] = useState(0);
    const orderDetailsReducer = useSelector((state) => state.orderDetailsReducer)
    const materialsWarehouseData = useSelector((state) => state.materialsWarehouseReducer.materialsWarehouseData)
    useEffect(() => {
        dispatch(getMainPendingProducts())
        dispatch(getTodayMadeProducts())
        dispatch(getMainTodayNewOrders())
        dispatch(getNecessaryToMakeToday())
        dispatch(getMaterialsWarehouseData())
        dispatch(getAmountOfBoxs())
        getboxNumber();
    }, [])

    const getboxNumber = () => {
        const boxNumbers = materialsWarehouseData.find((b) => b.title === "Deze");
        console.log(boxNumbers.quantity);
        setBoxNumer(boxNumbers.quantity)
        //return ;
    }
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

                    <tr>
                        <th scope="row">Deziu skaicius / vidutiniskai kiek laiko dar uzteks</th>
                        <td>{boxNumer} / {orderDetailsReducer.amount_of_boxs === null ? "" : orderDetailsReducer.amount_of_boxs === undefined ? "" : boxNumer / orderDetailsReducer.amount_of_boxs + " d"}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </Col>
    )
}

export default PendingProductsComponent