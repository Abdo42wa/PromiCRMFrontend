import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBonuses, createBonus, updateBonus } from '../appStore/actions/bonusesActions'
import { useHistory } from 'react-router-dom';
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddBonusComponent from '../components/bonus_components/AddBonusComponent'
import UpdateBonusComponent from '../components/bonus_components/UpdateBonusComponent'

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
            title: 'Naudotojas',
            dataIndex: 'user',
            width: '15%',
            render: (text, record, index) => (
                <Typography.Text>{text.name === null || text.name === '' ? '' : text.name} </Typography.Text>
            )
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '15%'
        },
        {
            title: 'Sukaupta',
            dataIndex: 'accumulated',
            width: '20%'
        },
        {
            title: 'Bonusas',
            dataIndex: 'bonusas',
            width: '20%'
        },
        {
            title: 'Liko iki',
            dataIndex: 'leftUntil',
            width: '20%'
        }
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
                                    pagination={{ pageSize: 15 }}
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
