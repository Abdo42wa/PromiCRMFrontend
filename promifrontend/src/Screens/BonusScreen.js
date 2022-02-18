import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBonuses, createBonus, updateBonus, getMonthMadeProducts } from '../appStore/actions/bonusesActions'
import { useHistory } from 'react-router-dom';
import { Table, Space, Card, Typography, Col, Row, Button, notification, message } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddBonusComponent from '../components/bonus_components/AddBonusComponent'
import UpdateBonusComponent from '../components/bonus_components/UpdateBonusComponent'
// import moment from 'moment';
import moment from 'moment-business-days';


function BonusScreen(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [addBonusVisibility, setAddBonusVisibility] = useState(false)
    const [updateBonusVisibility, setUpdateBonusVisibility] = useState({
        visibility: false,
        record: null
    })
    const usersReducer = useSelector((state) => state.usersReducer)
    const bonusesReducer = useSelector((state) => state.bonusesReducer)


    const showAddBonusModal = () => {
        if (bonusesReducer.bonuses.length > 0) {
            message.error('Bonusas šiam mėnesiui jau yra pridėtas');
        } else
            setAddBonusVisibility(true)
    }
    const unshowAddBonusModal = () => {
        setAddBonusVisibility(false)
    }
    const saveAddBonus = (postObj) => {
        dispatch(createBonus(postObj))
        unshowAddBonusModal();
    }

    //for UpdateBonusComponent
    const showUpdateBonusModal = (record) => {
        setUpdateBonusVisibility(prevState => ({
            ...prevState,
            visibility: true,
            record: record
        }))
    }
    const unshowUpdateBonusModal = () => {
        setUpdateBonusVisibility(prevState => ({
            ...prevState,
            visibility: false,
            record: null
        }))
    }
    const saveUpdateBonus = (postObj, reducerObj) => {
        dispatch(updateBonus(postObj, reducerObj))
        unshowUpdateBonusModal();
    }
    useEffect(() => {
        if (usersReducer.currentUser !== null) {
            dispatch(getBonuses())
            dispatch(getMonthMadeProducts())
        } else
            history.push('/login')
    }, [usersReducer.currentUser])

    const columns = [
        {
            title: 'Atnaujinti',
            width: '5%',
            render: (text, record, index) => (
                <Button onClick={(e) => showUpdateBonusModal(record)}>Atnaujinti</Button>
            )
        },
        {
            title: "Pasiekti tikslui",
            width: '15%',
            render: (text, record, index) => {
                //if today is not business day get next business day. else get today
                let today_day = moment().isBusinessDay() === false ? moment().nextBusinessDay().format('YYYY/MM/DD') : moment().format('YYYY/MM/DD')
                //get this month working days count
                let business_days = moment().monthBusinessDays()
                let last_month_business_day = business_days[business_days.length - 1]._d
                //getting difference between days not including weekends
                let left_days = moment(last_month_business_day, 'YYYY/MM/DD').businessDiff(moment(today_day, 'YYYY/MM/DD'))
                
                //getting how many products left until (quantity) bonus
                let month_made_products = bonusesReducer.month_made_products !== null && bonusesReducer.month_made_products.quantity !== undefined ? bonusesReducer.month_made_products.quantity : 0
                let base_quantity = record.quantity !== null && record.quantity !== undefined ? record.quantity : 0
                let left_to_make = base_quantity - month_made_products
                let make_in_day_goal = left_to_make / left_days

                return (<Typography.Text>{Math.round(make_in_day_goal) <= 0 ? '0/d' : `${Math.round(make_in_day_goal)}/d.`}</Typography.Text>)
            }
        },
        {
            title: 'Tikslas per mėnesi',
            dataIndex: 'quantity',
            width: '15%'
        },
        {
            title: 'Liko pagaminti',
            width: '20%',
            render: (text, record, index) => {
                let month_made_products = bonusesReducer.month_made_products !== null && bonusesReducer.month_made_products.quantity !== undefined ? bonusesReducer.month_made_products.quantity : 0
                let base_quantity = record.quantity !== null && record.quantity !== undefined ? record.quantity : 0
                let left_until = base_quantity - month_made_products
                return (<Typography.Text>{left_until}</Typography.Text>)

                // <p>heheh</p>
            }
        },
        {
            title: 'Bonusas',
            dataIndex: 'reward',
            width: '20%'
        },
        {
            title: 'Sukaupta',
            dataIndex: 'accumulated',
            width: '20%'
        },
    ]
    return (
        <>

            <div style={{ marginTop: 45, marginBottom: 45 }}>
                <Col span={24} offset={1}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                <Typography.Title>Bonusai</Typography.Title>
                                <Typography.Text>Pridėkite ir atnaujinkite bonusus</Typography.Text>
                            </div>
                        </Col>
                    </Row>
                    <div style={{ padding: '15px' }}></div>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    dataSource={bonusesReducer.bonuses}
                                    pagination={false}
                                    bordered
                                    scroll={{ x: 'calc(300px + 50%)' }}
                                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={(e) => showAddBonusModal()} >Pridėti bonusą</Button></Space>)}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </div>

            {addBonusVisibility !== false ? <AddBonusComponent visible={addBonusVisibility} onClose={unshowAddBonusModal}
                save={saveAddBonus} /> : null}
            {updateBonusVisibility.visibility === true ?
                <UpdateBonusComponent visible={updateBonusVisibility.visibility} record={updateBonusVisibility.record}
                    save={saveUpdateBonus} onClose={unshowUpdateBonusModal} /> :
                null}

        </>
    )


}

// connect to redux states. defining all actions
export default BonusScreen
