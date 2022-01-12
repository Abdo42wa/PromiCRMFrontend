import React from 'react';
import { connect } from 'react-redux';
import { getOrders, addOrder, updateOrder, updateOrderWithImage, addOrderWarehouse } from '../Actions/orderAction'
import { Table, Space, Card, Typography, Col, Row, Button, Tag, Image, Select } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import { withRouter } from 'react-router-dom';
import AddOrderComponent from '../Components/order_components/AddOrderComponent';
import UpdateOrderComponent from '../Components/order_components/UpdateOrderComponent';
import { getProducts } from '../Actions/productsActions'
import { getUsers } from '../Actions/userListActions'
import moment from 'moment';

const { Option } = Select;
class OrderScrenn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            imgPath: [],
            userId: '',
            productDevices: [],
            addOrderVisibility: false,
            updateOrder: {
                visibility: false,
                record: null
            }
        }
    }

    showAddOrderModal = () => {
        this.setState({
            addOrderVisibility: true
        })
    }
    unshowAddOrderModal = () => {
        this.setState({
            addOrderVisibility: false
        })
    }
    saveAddOrder = (postObj) => {
        this.props.addOrder(postObj, () => {

            const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            this.setState({
                orders: dataClone,
                addOrderVisibility: false
            })
        })
        this.unshowAddOrderModal();
        // window.location.reload();
    }

    saveorderwarehouse = (postObj) => {
        this.props.addOrderWarehouse(postObj, () => {
            this.setState({
                addOrderVisibility: false
            });
        });
        console.log("saveorderwarehouse working");
        //window.location.reload();
    }


    showOrderModal = (record) => {
        const obj = {
            visibility: true,
            record: record
        }
        this.setState({
            updateOrder: obj
        })
    }
    unshowOrderModal = () => {
        const obj = {
            visibility: false,
            record: null
        }
        this.setState({
            updateOrder: obj
        });
    }
    saveOrder = (postObj, reducerObj) => {
        this.props.updateOrder(postObj, reducerObj, () => {

            const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            this.setState({
                orders: dataClone
            });
            this.unshowOrderModal();
        });

    }
    updateOrderWithImg = (postObj, id) => {
        this.props.updateOrderWithImage(postObj, id);
        this.unshowOrderModal();
    }

    addProductsForOrder = (id) => {
        this.props.history.push(`/orders/product/${id}`);
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getProducts(() => {
                this.props.getUsers()

                this.props.getOrders(() => {
                    const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders))
                    this.setState({
                        orders: dataClone
                    });
                    this.getOrDerdevice();

                })

            });

        } else {
            this.props.history.push('/');
        }
    }

    getOrderImage(kodas) {
        //console.log(this.props.productsReducer.products.filter(word => word.code === "555GG"))
        const img = this.props.productsReducer.products.filter(word => word.code === kodas);
        //console.log(img.map((x) => x.imagePath))
        const arr = img.map((x) => x.imagePath)
        //console.log(arr[0])
        return arr[0]
    }

    getOrDerdevice(productCode) {
        const product = this.props.productsReducer.products.find(word => word.code === productCode);
        const laserTime = product.laserTime
        const milingTime = product.milingTime
        const collectionTime = product.collectionTime
        const packingTime = product.packingTime
        const paintingTime = product.paintingTime
        const bondingTime = product.bondingTime

        //console.log(product + 'sssssssssssssssssssssssssssssssssssss')
        //console.log(productCode)

        this.state.productDevices.push({ laserTime, milingTime, collectionTime, packingTime, paintingTime, bondingTime })
        //
        // console.log(this.state.productDevices.map(element => element.laserTime))
        // console.log(this.state.productDevices)
        if (product !== undefined) {
            return (
                [
                    { id: 1, name: "Lazeriavimo laikas", value: laserTime, key: "laserUserId" },
                    { id: 2, name: "Frezavimo laikas", value: milingTime, key: "milingUserId" },
                    { id: 3, name: "Surinkimo laikas", value: collectionTime, key: "collectionUserId" },
                    { id: 4, name: "Pakavimo laikas", value: packingTime, key: "packingUserId" },
                    { id: 5, name: "Dažymo laikas", value: paintingTime, key: "paintingUserId" },
                    { id: 6, name: "Suklijavimo laikas", value: bondingTime, key: "bondingUserId" }
                ]
            )
        }
    }

    getName(id, name, record) {
        console.log(name);

        if (name === 'collectionUserId') {
            const postObj = {
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.userId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": moment().format('YYYY/MM/DD'),
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            const reducerObj = {
                "id": record.id,
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.userId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": moment().format('YYYY/MM/DD'),
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            console.log(postObj)
            console.log(reducerObj)
            this.props.updateOrder(postObj, reducerObj, () => {

                //const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            });
        }
        if (name === 'laserUserId') {
            const postObj = {
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": this.state.userId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": moment().format('YYYY/MM/DD'),
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            const reducerObj = {
                "id": record.id,
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": this.state.userId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": moment().format('YYYY/MM/DD'),
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            // console.log(name)
            this.props.updateOrder(postObj, reducerObj, () => {

                //const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            });
        }
        if (name === 'milingUserId') {
            const postObj = {
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": this.state.userId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": moment().format('YYYY/MM/DD'),
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            const reducerObj = {
                "id": record.id,
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": this.state.userId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": moment().format('YYYY/MM/DD'),
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            // console.log(name)
            this.props.updateOrder(postObj, reducerObj, () => {

                //const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            });
        }
        if (name === 'packingUserId') {
            const postObj = {
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": this.state.userId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": moment().format('YYYY/MM/DD'),
            }
            const reducerObj = {
                "id": record.id,
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": this.state.userId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": moment().format('YYYY/MM/DD'),
            }
            // console.log(name)
            this.props.updateOrder(postObj, reducerObj, () => {

                //const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            });
        }
        if (name === 'paintingUserId') {
            const postObj = {
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": this.state.userId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": moment().format('YYYY/MM/DD'),
                "packingComplete": record.packingComplete,
            }
            const reducerObj = {
                "id": record.id,
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": record.bondingUserId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": this.state.userId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": record.bondingComplete,
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": moment().format('YYYY/MM/DD'),
                "packingComplete": record.packingComplete,
            }
            console.log(postObj)
            console.log(reducerObj)
            this.props.updateOrder(postObj, reducerObj, () => {

                //const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            });
        }

        if (name === 'bondingUserId') {
            const postObj = {
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": this.state.userId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": moment().format('YYYY/MM/DD'),
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            const reducerObj = {
                "id": record.id,
                "userId": record.userId,
                "orderType": record.orderType,
                "status": record.status,
                "orderNumber": record.orderNumber,
                "date": record.date,
                "platforma": record.platforma,
                "moreInfo": record.moreInfo,
                "quantity": record.quantity,
                "photo": record.photo,
                "productCode": record.productCode,
                "comment": record.comment,
                "shipmentTypeId": record.shipmentTypeId,
                "customerId": record.customerId,
                "device": record.device,
                "productionTime": record.productionTime,
                "address": record.address,
                "countryId": record.countryId,
                "price": record.price,
                "currencyId": record.currencyId,
                "vat": record.vat,
                "orderFinishDate": record.orderFinishDate,
                "collectionUserId": record.collectionUserId,
                "bondingUserId": this.state.userId,
                "laserUserId": record.laserUserId,
                "milingUserId": record.milingUserId,
                "paintingUserId": record.paintingUserId,
                "packingUserId": record.packingUserId,
                "collectionComplete": record.collectionComplete,
                "bondingComplete": moment().format('YYYY/MM/DD'),
                "laserComplete": record.laserComplete,
                "milingComplete": record.milingComplete,
                "paintingComplete": record.paintingComplete,
                "packingComplete": record.packingComplete,
            }
            // console.log(name)
            this.props.updateOrder(postObj, reducerObj, () => {

                //const dataClone = JSON.parse(JSON.stringify(this.props.orderReducer.orders));
            });
        }


        // console.log(postObj);
        // console.log(reducerObj);
        //console.log(record.milingUserId);
    }

    onOrderTypeChange = (value) => {
        this.setState(({
            userId: value
        }))
        console.log(value)
    }
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showOrderModal(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Pridėti produktus',
                width: '5%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.addProductsForOrder(record.id)}>Pridėti</Button>
                )
            },
            {
                title: 'Atsakingas asmuo',
                dataIndex: 'user',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            },
            {
                title: 'Užsakymo tipas',
                dataIndex: 'orderType',
                width: '10%'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === false ? <Tag className='Neatlikta'>Neatlikta</Tag> : <Tag className='atlikta'>Atlikta</Tag>}</Typography.Text>
                )
            },
            {
                title: 'Nuotrauka',
                //dataIndex: 'imagePath',
                width: '10%',
                render: (text, record, index) => (
                    <Image src={this.getOrderImage(record.productCode)} />
                )
            },
            {
                title: 'Užsakymo numeris',
                dataIndex: 'orderNumber',
                width: '10%'
            },
            {
                title: 'Data',
                dataIndex: 'date',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },
            {
                title: 'Platforma',
                dataIndex: 'platforma',
                width: '10%'
            },
            {
                title: 'Daugiau informacijos',
                dataIndex: 'moreInfo',
                width: '10%'
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
                width: '10%'
            },
            {
                title: 'Prekės kodas',
                dataIndex: 'productCode',
                width: '10%'
            },
            {
                title: 'Siuntos tipas',
                dataIndex: 'shipment',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.type}</Typography.Text>
                )
            },
            {
                title: 'Klientas',
                dataIndex: 'customer',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            },
            {
                title: 'Įrenginys',
                dataIndex: 'device',
                width: '90%',
                render: (text, record, index) => (
                    <div style={{ display: 'grid' }}>

                        {this.getOrDerdevice(record.productCode) != null && this.getOrDerdevice(record.productCode).map(item => {
                            return (
                                <>
                                    {
                                        item.value !== 0 && <Tag onClick={(e) => this.getName(e.id, item.key, record)} defaultValue={item.name} style={{ padding: '3px', margin: '5px', borderRadius: '40px' }}>{item.value} {item.name}</Tag>

                                    }
                                    <Select
                                        optionFilterProp="children"
                                        onChange={(e) => this.onOrderTypeChange(e)}

                                    >
                                        {this.props.usersListReducer.users.map((element, index) => {
                                            return (<Option key={element.id} value={element.id}>{element.name}  {element.surname}</Option>)
                                        })}
                                    </Select>
                                </>


                            )
                        })}
                        {/* <ul>
                            {this.getOrDerdevice(record.productCode) != null && this.getOrDerdevice(record.productCode).map(item => {
                                return (
                                    <>
                                        {
                                            item.value !== 0 && <li onClick={(e) => this.getName(item.name)} key={item.name} value={item.name} >{item.value} {item.name}</li>
                                        }
                                        <Select
                                            optionFilterProp="children"
                                            onChange={(e) => this.onOrderTypeChange(e)}

                                        >
                                            {this.props.usersListReducer.users.map((element, index) => {
                                                return (<Option key={element.id} value={element.id}>{element.name}  {element.surname}</Option>)
                                            })}
                                        </Select>
                                    </>
                                )
                            })}
                        </ul> */}
                    </div >

                )
            },
            {
                title: 'Gamybos laikas',
                dataIndex: 'productionTime',
                width: '10%'
            },
            {
                title: 'Adresas',
                dataIndex: 'address',
                width: '10%'
            },
            {
                title: 'Šalis',
                dataIndex: 'country',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            },
            {
                title: 'Komentaras',
                dataIndex: 'comment',
                width: '10%'
            },
            {
                title: 'Kaina',
                dataIndex: 'price',
                width: '10%'
            },
            {
                title: 'Valiuta',
                dataIndex: 'currency',
                width: '10%',
                render: (text, record, index) => (
                    <Typography.Text>{text === null ? '' : text.name}</Typography.Text>
                )
            },
            {
                title: 'VAT',
                dataIndex: 'vat',
                width: '10%'
            },
            {
                title: 'Užsakymo pabaigos data',
                dataIndex: 'orderFinishDate',
                width: '10%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            },


        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Užsakymai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite užsakymus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.state.orders}
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                        scroll={{ x: 'calc(700px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddOrderModal}>Pridėti užsakymą</Button></Space>)}
                                    />

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addOrderVisibility !== false ?
                    <AddOrderComponent visible={this.state.addOrderVisibility} save={this.saveAddOrder}
                        onClose={this.unshowAddOrderModal}
                        saveorderwarehouse={this.saveorderwarehouse}
                    />
                    : null}
                {this.state.updateOrder.visibility !== false ?
                    <UpdateOrderComponent visible={this.state.updateOrder.visibility} record={this.state.updateOrder.record}
                        save={this.saveOrder} onClose={this.unshowOrderModal}
                        saveWithImg={this.updateOrderWithImg} /> :
                    null}

            </>
        )
    }
}

// get states from redux. map them to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        productsReducer: state.productsReducer,
        orderReducer: state.orderReducer,
        usersListReducer: state.usersListReducer
    }
}

// connect to redux states. define all actions
export default connect(mapStateToProps, { getOrders, addOrder, updateOrder, updateOrderWithImage, addOrderWarehouse, getProducts, getUsers })(withRouter(OrderScrenn))


