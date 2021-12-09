import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMaterialsWarehouseData, createMaterialWarehouseData, updateMaterialWarehouseData,updateMaterialWarehouseWithImage } from '../Actions/materialsWarehouseActions';
import { Table, Space, Card, Typography, Col, Row, Button,Image } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import moment from 'moment'
import AddMaterialWarehouseComponent from '../Components/materials_warehouse_components/AddMaterialWarehouseComponent';
import UpdateMaterialWarehouseComponent from '../Components/materials_warehouse_components/UpdateMaterialWarehouseComponent';
import SuplementMaterialWarehouseComponent from '../Components/materials_warehouse_components/SuplementMaterialWarehouseComponent';

class MaterialsWarehouseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addMaterialVisibility: false,
            updateMaterialWarehouse: {
                record: null,
                visibility: false
            },
            suplementMaterialVisibility: false
        }
    }


    //for AddMaterialWarehouseDataComponent
    showAddMaterialComponent = () => {
        this.setState({
            addMaterialVisibility: true
        });
    }
    unshowAddMaterialComponent = () => {
        this.setState({
            addMaterialVisibility: false
        })
    }
    saveAddMaterialWarehouse = (postObj) => {
        this.props.createMaterialWarehouseData(postObj);
        this.setState({
            addMaterialVisibility: false
        })
    }
    //For UpdateMaterialWarehouseDataComponent
    showUpdateMaterialComponent = (record) => {
        const obj = {
            record: record,
            visibility: true
        }
        this.setState({
            updateMaterialWarehouse: obj
        })
    }
    unshowUpdateMaterialComponent = () => {
        const obj = {
            record: null,
            visibility: false
        }
        this.setState({
            updateMaterialWarehouse: obj
        })
    }
    saveUpdateMaterialWarehouse = (postObj, reducerObj) => {
            this.props.updateMaterialWarehouseData(postObj, reducerObj);
            this.unshowUpdateMaterialComponent();
        
    }
    saveUpdateMaterialWarehouseWithImg = (postObj, id) => {
        this.props.updateMaterialWarehouseWithImage(postObj, id);
        this.unshowUpdateMaterialComponent();
    
}

    // for SuplementMaterialComponent
    showSuplementMaterialComponent = () => {
        this.setState({
            suplementMaterialVisibility: true
        })
    }
    unshowSuplementMaterialComponent = () => {
        this.setState({
            suplementMaterialVisibility: false
        })
    }
    saveSuplementMaterial = (postObj, reducerObj) => {
        this.props.updateMaterialWarehouseData(postObj,reducerObj);
        this.setState({
            suplementMaterialVisibility: false
        })
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getMaterialsWarehouseData();
        }
    }
    render() {
        console.log(this.props.materialsWarehouseReducer.materialsWarehouseData)
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateMaterialComponent(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Medžiaga',
                dataIndex: 'title',
                width: '15%'
            },
            {
                title: 'Matavimo vnt.',
                dataIndex: 'measuringUnit',
                width: '10%'
            },
            {
                title: 'Fotografijos url',
                dataIndex: 'imagePath',
                width: '10%',
                render: (text,record,index)=>(
                    <div>
                        {text === null || text === undefined?
                        <p></p>:<Image src={text}/>}
                    </div>
                )
            },
            {
                title: 'Esamas kiekis',
                dataIndex: 'quantity',
                width: '15%'
            },
            {
                title: 'Papildoma info',
                dataIndex: 'info',
                width: '15%'
            },
            {
                title: 'Pristatymo terminas d.d.',
                dataIndex: 'deliveryTime',
                width: '10%'
            },
            {
                title: 'Medžiagos vidutiniškai užteks',
                dataIndex: 'useDays',
                width: '10%'
            },
            {
                title: 'Paskutinis papildymas',
                dataIndex: 'lastAdittion',
                width: '15%',
                render: (text, record, index) => (
                    <p>{moment(text).format('YYYY/MM/DD')}</p>
                )
            }

        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Medžiagų sandėlis</Typography.Title>
                                    <Typography.Text>Pridėkite naujas medžiagas prie medžiagų sandėlio ir atnaujinkite jas</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.materialsWarehouseReducer.materialsWarehouseData}
                                        pagination={{ pageSize: 15 }}
                                        // bordered
                                        // scroll={{ x: 'calc(700px + 50%)' }}
                                        footer={() => (
                                            <div style={{display: 'flex'}}>
                                                <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddMaterialComponent}>Pridėti medžiagą</Button></Space>
                                                <Space/>
                                                <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showSuplementMaterialComponent}>Papildyti sandėlį</Button></Space>
                                            </div>
                                        )}
                                    />
                                    

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addMaterialVisibility !== false ?
                    <AddMaterialWarehouseComponent visible={this.state.addMaterialVisibility} onClose={this.unshowAddMaterialComponent}
                        save={this.saveAddMaterialWarehouse} />
                    : null}
                {this.state.updateMaterialWarehouse.visibility !== false ?
                    <UpdateMaterialWarehouseComponent visible={this.state.updateMaterialWarehouse.visibility} record={this.state.updateMaterialWarehouse.record}
                        onClose={this.unshowUpdateMaterialComponent} save={this.saveUpdateMaterialWarehouse}
                        saveWithImg={this.saveUpdateMaterialWarehouseWithImg} />
                    : null}
                {this.state.suplementMaterialVisibility !== false ?
                    <SuplementMaterialWarehouseComponent visible={this.state.suplementMaterialVisibility} onClose={this.unshowSuplementMaterialComponent}
                        save={this.saveSuplementMaterial} /> : null}

            </>
        )
    }
}

//get redux states
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        materialsWarehouseReducer: state.materialsWarehouseReducer
    }
}

export default connect(mapStateToProps, { getMaterialsWarehouseData, createMaterialWarehouseData, updateMaterialWarehouseData, updateMaterialWarehouseWithImage })(withRouter(MaterialsWarehouseScreen))
