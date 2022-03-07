import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Table, Space, Card, Typography, Col, Row, Button, Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../../styles/customStyles.js';
import { getLastMonthSoldProducts } from '../../appStore/actions/reportsActions'
//you can either import the `OutputType` const or `jsPDF` class if you want to create another PDF from scratch (without using the template) 
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import moment from 'moment';
import promiLogo from '../../images/promi-logo_juodas2.png'

function LastMonthSoldProducts() {
    const dispatch = useDispatch();
    const reportsReducer = useSelector((state) => state.reportsReducer)

    //download pdf
    const downloadPdf = () => {
        let startOfPrevMonth = moment().subtract(1, 'month').startOf('month').format('YYYY/MM/DD')
        let endOfPrevMonth = moment().subtract(1, 'month').endOf('month').format('YYYY/MM/DD')
        var props = {
            outputType: OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: "Invoice 2021",
            orientationLandscape: false,
            compress: true,
            logo: {
                src: promiLogo,
                width: 34.33, //aspect ratio = width/height
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
                label: "Parduota per praejusi menesi ",
                // num: 19,
                invDate: `Data nuo: ${startOfPrevMonth}`,
                invGenDate: `Data iki: ${endOfPrevMonth}`,
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
                        title: "Kodas",
                        style: {
                            width: 30
                        },
                    },
                    {
                        title: "Pavadinimas"
                    },
                    {
                        title: "Kiekis"
                    },
                    { title: "Kaina" },
                    {
                        title: "Vardas",
                        style: {
                            width: 30
                        }
                    },
                    {
                        title: "Pavarde",
                        style: {
                            width: 30
                        }
                    },
                    // {
                    //   title: "Nuotrauka",
                    // },
                ],
                table: Array.from(reportsReducer.last_month_sold_products, (item, index) => ([
                    index + 1,
                    item.productCode !== null ? item.productCode : "",
                    item.name !== null ? item.name : "",
                    item.quantity !== null ? item.quantity : "",
                    item.price !== null ? item.price : "",
                    item.customerName !== null ? item.customerName : "",
                    item.customerLastName !== null ? item.customerLastName : "",
                    // <img src={item.imagePath !== null ? item.imagePath : ""} width={50}/>,
                ])),
                invTotalLabel: "Kiekis:",
                invTotal: `${reportsReducer.last_month_sold_products_qty}`,
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

    useEffect(() => {
        dispatch(getLastMonthSoldProducts())
    }, [])
    const lastMonthSoldProductsColumns = [
        {
            title: 'Kodas',
            dataIndex: 'productCode',
            width: '15%',
            render: (text, record, index) => (
                <p>{text === null ? "" : text}</p>
            )
        },
        {
            title: 'Pavadinimas',
            dataIndex: 'name',
            width: '15%',
            render: (text, record, index) => (
                <p>{text === null ? "" : text}</p>
            )
        },
        {
            title: 'Nuotrauka',
            dataIndex: 'imagePath',
            width: '10%',
            render: (text, record, index) => (
                <Image src={text === null ? "" : text} width={30} />
            )
        },
        {
            title: 'Kiekis',
            dataIndex: 'quantity',
            width: '20%',
            render: (text, record, index) => (
                <p>{text === null ? "" : text}</p>
            )
        },
        {
            title: 'Kaina',
            dataIndex: 'price',
            width: '20%',
            render: (text, record, index) => (
                <p>{text === null ? "" : text}</p>
            )
        },
        {
            title: 'Klientas(nestandartinis)',
            width: '20%',
            render: (text, record, index) => (
                <p>{record.customerName === null && record.customerLastName === null ? "" : `${record.customerName} ${record.record.customerLastName}`}</p>
            )
        }
    ]
    return (
        <Col lg={24} style={{ marginTop: '20px' }}>
            <div style={{ marginRight: '40px', textAlign: 'start' }}>
                <h3>Parduota per praėjusį mėnesį</h3>
            </div>
            <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                <Table
                    id='my-table'
                    rowKey="id"
                    columns={lastMonthSoldProductsColumns}
                    dataSource={reportsReducer.last_month_sold_products}
                    pagination={{ pageSize: 15 }}
                    scroll={{ x: 'calc(200px + 50%)' }}
                    footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={(e) => downloadPdf()}><i className="fas fa-print"></i> Export pdf</Button></Space>)}
                />

            </Card>
        </Col>
    )
}

export default LastMonthSoldProducts