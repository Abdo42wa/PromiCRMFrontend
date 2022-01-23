import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getMaterials, createMaterial, updateItem } from '../Actions/materialsActions'
import { Table, Space, Card, Typography, Col, Row, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddMaterialComponent from '../Components/materials_components/AddMaterialComponent';
import UpdateMaterialComponent from '../Components/materials_components/UpdateMaterialComponent';


class MaterialsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addMaterialVisibility: false,
            updateMaterialVisibility: {
                record: null,
                visibility: false
            }
        }
    }
    //FOR AddMaterialComponent
    showAddMaterial = () => {
        this.setState({
            addMaterialVisibility: true
        });
    }
    unshowAddMaterial = () => {
        this.setState({
            addMaterialVisibility: false
        });
    }
    saveAddMaterial = (postObject) => {
        this.props.createMaterial(postObject)
        this.unshowAddMaterial()
    }

    //FOR UpdateMaterialComponent
    showUpdateMaterial = (record) => {
        this.setState(prevState => ({
            updateMaterialVisibility: {
                ...prevState.updateMaterialVisibility,
                record: record,
                visibility: true
            }
        }))
    }

    unshowUpdateMaterial = () => {
        this.setState(prevState => ({
            updateMaterialVisibility: {
                ...prevState.updateMaterialVisibility,
                record: null,
                visibility: false
            }
        }))
    }
    saveUpdateMaterial = (postObj, id, reducerObj) => {
        this.props.updateItem(id, postObj, reducerObj)
        this.unshowUpdateMaterial()
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getMaterials()
        } else {
            this.props.history.push('/login')
        }
    }
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '10%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateMaterial(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Produkto pavadinimas',
                dataIndex: 'product',
                width: '20%',
                render: (text, record, index) => (
                    <Typography.Text>{text.name}</Typography.Text>
                )
            },
            {
                title: 'Produkto kodas',
                dataIndex: 'product',
                width: '25%',
                render: (text, record, index) => (
                    <Typography.Text>{text.code}</Typography.Text>
                )
            },
            {
                title: 'Medžiaga',
                dataIndex: 'materialWarehouse',
                width: '25%',
                render: (text,record,index)=>(
                    <Typography.Text>{text.title}</Typography.Text>
                )
            },
            {
                title: 'Kiekis',
                dataIndex: 'quantity',
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
                                    <Typography.Title>Produktams priskirtos medžiagos</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite medžiagas</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        <div style={{padding: '15px'}}></div>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={23}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.props.materialsReducer.materials}
                                        pagination={{ pageSize: 15 }}
                                        bordered
                                        scroll={{ x: 'calc(300px + 50%)' }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddMaterial}>Pridėti medžiagą</Button></Space>)}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </div>
                {this.state.addMaterialVisibility !== false ? <AddMaterialComponent visible={this.state.addMaterialVisibility} onClose={this.unshowAddMaterial}
                    save={this.saveAddMaterial} /> : null}
                {this.state.updateMaterialVisibility.visibility !== false ?
                    <UpdateMaterialComponent visible={this.state.updateMaterialVisibility.visibility} data={this.state.updateMaterialVisibility.record}
                        save={this.saveUpdateMaterial} onClose={this.unshowUpdateMaterial} /> :
                    null}

            </>
        )
    }
}
//getting redux state. mapping to props
const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        materialsReducer: state.materialsReducer
    }
}

//connect redux states, and define all action that will be used
export default connect(mapStateToProps, { getMaterials, createMaterial, updateItem })(withRouter(MaterialsScreen))