import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { Col, Tabs } from 'antd'
import '../styles/orders.css'
import StandartOrdersComponent from '../components/order_components/StandartOrdersComponent';
import NonStandartOrdersComponent from '../components/order_components/NonStandartOrdersComponent';

const { TabPane } = Tabs;
function OrderScrenn(props) {
    const history = useHistory()
    const usersReducer = useSelector((state) => state.usersReducer)
    useEffect(() => {
        if (usersReducer.currentUser === null)
            history.push('/login')
    }, [])
    return (
        <>

            <div style={{ marginTop: 45, marginBottom: 45 }}>
                <Col span={24} >
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab="Standartiniai" key='1'>
                            <StandartOrdersComponent />
                        </TabPane>
                        <TabPane tab="Ne-standartiniai" key='2'>
                            <NonStandartOrdersComponent />
                        </TabPane>
                    </Tabs>

                </Col>
            </div>
        </>
    )

}

export default OrderScrenn


