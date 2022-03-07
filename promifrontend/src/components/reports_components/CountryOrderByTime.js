import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Table, Space, Card, Col, Button, DatePicker, Form, message } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles.js';
import { getCompletedCountryOrdersByTime, refreshReports } from '../../appStore/actions/reportsActions'
//you can either import the `OutputType` const or `jsPDF` class if you want to create another PDF from scratch (without using the template) 
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import moment from 'moment';
import promiLogo from '../../images/promi-logo_juodas2.png'

function CountryOrderByTime() {
    const dispatch = useDispatch();
    const [dates, setDates] = useState({
        dateFrom: moment(),
        dateTo: moment()
    })
    const monthFormat = 'YYYY/MM/DD';
    const reportsReducer = useSelector((state) => state.reportsReducer)

    //on Date change
    const onDataChange = (value, inputName) => {
        setDates(prevState => ({
            ...prevState,
            [inputName]: value
        }))
    }
    const getOrdersData = () => {
        if (dates.dateFrom !== null && dates.dateTo !== null) {
            let dateF = moment(dates.dateFrom).format('YYYY/MM/DD')
            let dateT = moment(dates.dateTo).format('YYYY/MM/DD')
            if (dateT <= dateF) {
                message.error("Data (iki) yra mežesnė arba lygi Datai (nuo). Pataisykite!")
            } else {
                let queryString = `dateFrom=${dateF}&dateTo=${dateT}`
                console.log(queryString)
                dispatch(getCompletedCountryOrdersByTime(queryString))
            }
        } else {
            message.error('Jūs nepridėjote datų');
        }
        console.log('heheh')

    }
    //download pdf
    const downloadPdf = () => {
        console.log(dates.dateFrom)
        console.log(dates.dateTo)
        var props = {
            outputType: OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: "Invoice 2021",
            orientationLandscape: false,
            compress: true,
            logo: {
                src: promiLogo,
                width: 30.33, //aspect ratio = width/height
                height: 10.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "Promi",
                address: "K. Donelaicio g. 78, LT-44254 Kaunas",
                phone: "+370 673 09003",
                email: "promi@gmail.com",
                email_1: "infopromi@gmail.al",
                website: "www.promi.lt",
            },
            invoice: {
                label: "Parduota Šalis",
                // num: 19,
                invDate: `Data nuo: ${dates.dateFrom}`,
                invGenDate: `Data iki: ${dates.dateTo}`,
                headerBorder: false,
                tableBodyBorder: false,
                header: [
                    {
                        title: "#",
                        style: {
                            width: 10
                        }
                    },
                    {
                        title: "Šalis",
                        style: {
                            width: 60
                        }
                    },
                    {
                        title: "Kiekis",
                        style: {
                            width: 60
                        }
                    },
                    {
                        title: "Kaina",
                        style: {
                            width: 60
                        }
                    },

                ],
                table: Array.from(reportsReducer.completed_Country_orders_by_time, (item, index) => ([
                    index + 1,
                    item.countryName !== null ? item.countryName : "",
                    item.quantity !== null ? item.quantity : "",
                    item.price !== null ? item.price : ""
                ])),
                invTotalLabel: "Kiekis:",
                invTotal: `${reportsReducer.completed_Country_orders_by_time_qty}`,
                // invCurrency: "Isviso"
                // invDescLabel: "Invoice Note",
                // invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        };

        const pdfObject = jsPDFInvoiceTemplate(props);

    }
    const lastMonthSoldProductsColumns = [
        {
            title: 'Šalis',
            dataIndex: 'countryName',
            width: '30%',
            render: (text, record, index) => (
                <p key={index + 1}>{text === null ? "" : text}</p>
            )
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '35%',
            render: (text, record, index) => (
                <p key={index + 2}>{text === null ? "" : text}</p>
            )
        },
        {
            title: 'Kaina',
            dataIndex: 'price',
            width: '35%',
            render: (text, record, index) => (
                <p key={index + 3}>{text === null ? "" : text}</p>
            )
        }
    ]
    useEffect(() => {
        dispatch(refreshReports())
        // eslint-disable-next-line
    }, [])

    return (
        <Col lg={24} style={{ marginTop: '20px' }}>
            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                <h3>Ataskaita pagal Šalis per pasirinkta laika</h3>
            </div>
            <div style={{ padding: '2px', display: 'flex', marginTop: '5px' }}>
                <Form
                    layout='inline'
                    id="myForm"
                    name="myForm"
                >
                    <Form.Item
                        key="dateFrom"
                        name="dateFrom"
                        label="Data (nuo)"
                        initialValue={dates.dateFrom}
                        rules={[{ required: true, message: 'Įveskite datą (nuo)!' }]}
                    >
                        <DatePicker value={dates.dateFrom} format={monthFormat} picker="date" onChange={(date, dateString) => onDataChange(dateString, "dateFrom")} />
                    </Form.Item>
                    <Form.Item
                        key="dateTo"
                        name="dateTo"
                        label="Data (iki)"
                        initialValue={dates.dateTo}
                        rules={[{ required: true, message: 'Įveskite datą (iki)!' }]}
                    >
                        <DatePicker value={dates.dateTo} format={monthFormat} picker='date' onChange={(date, dateString) => onDataChange(dateString, "dateTo")} />
                    </Form.Item>
                    <Form.Item
                        key="findBtn"
                        name="findBtn"
                        label="Ieškoti"
                    >
                        <Button key="searchBtn" type='primary' onClick={(e) => getOrdersData()}>Ieškoti</Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ marginTop: '5px' }}></div>
            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                <Table
                    id='my-table'
                    rowKey="id"
                    columns={lastMonthSoldProductsColumns}
                    dataSource={reportsReducer.completed_Country_orders_by_time}
                    pagination={{ pageSize: 15 }}
                    scroll={{ x: 'calc(200px + 50%)' }}
                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            size="large"
                            style={{ ...buttonStyle }}
                            onClick={(e) => downloadPdf()}
                            disabled={reportsReducer.completed_Country_orders_by_time.length < 1}
                        >
                            <i className="fas fa-print"></i> Export pdf
                        </Button></Space>)}
                />

            </Card>
        </Col>
    )
}

export default CountryOrderByTime