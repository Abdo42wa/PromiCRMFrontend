import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { getMaterials, createMaterial, updateItem } from '../Actions/materialsActions'
import { Table, Space, Select, Card, Typography, Col, Row, Input, Modal, Button } from 'antd'
import { tableCardStyle, tableCardBodyStyle, buttonStyle } from '../styles/customStyles.js';
import AddMaterialComponent from '../Components/materials_components/AddMaterialComponent';
import UpdateMaterialComponent from '../Components/materials_components/UpdateMaterialComponent';


class MaterialsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalMaterials: [],
            materials: [],
            visibleHeader: [],
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
        this.props.createMaterial(postObject, () => {
            const materialsClone = this.props.materialsReducer.materials;
            this.setState({
                materials: materialsClone,
                addMaterialVisibility: false
            });
        });
    }

    //FOR UpdateMaterialComponent
    showUpdateMaterial = (record) => {
        const obj = {
            record: record,
            visibility: true
        }
        this.setState({
            updateMaterialVisibility: obj
        }, () => console.log('Record is set:' + JSON.stringify(this.state.updateMaterialVisibility.record)));
    }

    unshowUpdateMaterial = () => {
        const obj = {
            record: null,
            visibility: false
        }
        this.setState({
            updateMaterialVisibility: obj
        });
    }
    saveUpdateMaterial = (postObj, id, reducerObj) => {
        console.log(JSON.stringify(postObj))
        this.props.updateItem(id, postObj, reducerObj, ()=>{
            const materialsClone = this.props.materialsReducer.materials;
            this.setState({
                materials: materialsClone,
                updateMaterialVisibility: false
            });
        });
    }

    componentDidMount() {
        if (this.props.usersReducer.currentUser !== null) {
            this.props.getMaterials(() => {
                const materialsClone = JSON.parse(JSON.stringify(this.props.materialsReducer.materials));
                this.setState({
                    materials: materialsClone
                });
            });
        } else {
            this.props.history.push('/')
        }
    }
    render() {
        const columns = [
            {
                title: 'Atnaujinti',
                width: '20%',
                render: (text, record, index) => (
                    <Button onClick={(e) => this.showUpdateMaterial(record)}>Atnaujinti</Button>
                )
            },
            {
                title: 'Pavadinimas',
                dataIndex: 'name',
                width: '20%'
            },
            {
                title: 'Panaudotas materialas',
                dataIndex: 'materialUsed',
                width: '20%'
            },
            {
                title: 'Produkto id',
                dataIndex: 'productId',
                width: '20%'
            }
        ]
        return (
            <>

                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <Col span={24} offset={2}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <div style={{ marginRight: '40px', textAlign: 'start' }}>
                                    <Typography.Title>Materialai</Typography.Title>
                                    <Typography.Text>Pridėkite ir atnaujinkite materialus</Typography.Text>
                                </div>
                            </Col>
                        </Row>
                        {/* returns second column with table */}
                        {/* <FixedCostTable data={obj.types} countryVats={this.props.countryVats} category_title={obj.category_title} category_id={obj.category_id} /> */}
                        <Row gutter={16}>
                            <Col span={18}>
                                <Card size={'small'} style={{ ...tableCardStyle }} bodyStyle={{ ...tableCardBodyStyle }}>
                                    <Table
                                        rowKey="id"
                                        columns={columns}
                                        dataSource={this.state.materials}
                                        pagination={{ pageSize: 15 }}
                                        footer={() => (<Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.showAddMaterial}>Pridėti materialą</Button></Space>)}
                                    />
                                    {/* <Space style={{ display: 'flex', justifyContent: 'space-between' }}><Button size="large" style={{ ...buttonStyle }} onClick={this.addMaterial}>Pridėti materialą</Button></Space> */}
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