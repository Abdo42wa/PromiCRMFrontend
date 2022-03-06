import React, { useEffect } from 'react'
import { Table, Card, Typography, Col,Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getWeekWorks,updateWork } from '../../appStore/actions/weeklyworkschedulesAction'
import { tableCardStyle, tableCardBodyStyle } from '../../styles/customStyles.js';
import moment from 'moment'
//Savaites ukio darbai
function WeeklyWorkScheduleComponent() {
    const dispatch = useDispatch()
    const weeklyWorkScheduleReducer = useSelector((state) => state.weeklyWorkScheduleReducer)
    //on complete
    const onChange = (value, record) => {
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
        dispatch(updateWork(postObj, reducerObj))
    }
    useEffect(() => {
        dispatch(getWeekWorks())
    }, [])
    const week_works_columns = [
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
                <Checkbox onChange={(e) => onChange(e.target.checked, record)} value={text} defaultChecked={text} />
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
    return (
        // Savaites ukio darbai
        <Col lg={24} style={{ marginTop: '20px' }}>
            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                <h3>Savaitės ūkio darbai</h3>
            </div>
            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                <Table
                    rowKey="id"
                    columns={week_works_columns}
                    dataSource={weeklyWorkScheduleReducer.workSchedules}
                    pagination={{ pageSize: 15 }}
                    bWorked
                    scroll={{ x: 'calc(200px + 50%)' }}

                />

            </Card>
        </Col>
    )
}

export default WeeklyWorkScheduleComponent