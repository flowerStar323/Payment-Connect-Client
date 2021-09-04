import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Table, Modal, notification, Input } from "antd";
import axios from 'axios';
import { ServerURL } from "../../config/port";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
class Users extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            visible: false,
            editID: "",
            email: "",
            name: ""
        };
        this.columns = [
            {
                title: "Email",
                dataIndex: "email",
                width: "15%",
                align: "center"
            }, {
                title: "Name",
                width: "15%",
                dataIndex: "name",
                align: "center"
            }, {
                title: "Entries Count",
                width: "20%",
                dataIndex: "count",
                align: "center"
            }, {
                width: "20%",
                title: "Payment",
                dataIndex: "payment",
                align: "center"
            }, {
                title: "Status",
                dataIndex: "Status",
                width: "20%",
                align: "center",
                render: (text, record) => {
                    return <Button.Group>
                        <Button type="primary" onClick={() => this.editModal(record)} style={{ borderRadius: "20px 0 0 20px" }}><i className="fa fa-edit" /></Button>
                        <Button type="dashed" onClick={() => this.showDelModal(record.id, "sus")}><i className="fa fa-lock" style={{ color: "black" }} /></Button>
                        <Button type="danger" onClick={() => this.showDelModal(record.id, "del")} style={{ borderRadius: "0 20px 20px 0" }}><i className="fa fa-trash" /></Button>
                    </Button.Group>
                }
            }
        ];
    }
    editModal = (record) => {
        this.setState({ visible: true, editID: record.id, name: record.name, email: record.email });
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    handleOk = () => {
        const { email, name, editID } = this.state;
        axios.post(`${ServerURL}/editUsers`, { id: editID, email, name }).then(e => {
            if (e) {
                notification.success({
                    message: "Success",
                    description: "Edit Successful"
                }); this.componentWillMount();
            }
        })
        this.setState({ visible: false })
    }
    onEditChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    showDelModal = (id, flag) => {
        const { Del } = this;
        confirm({
            title: flag === "del" ? 'Are you sure delete this item?' : 'Are you sure suspend this item?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                Del(id, flag);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    Del = (id, flag) => {
        axios.post(`${ServerURL}/delUsers`, { id, flag })
            .then(e => {
                if (e) {
                    notification.success({
                        message: "Success",
                        description: flag === "del" ? "Delete Successful" : "Suspend Successful"
                    });
                    this.componentWillMount();
                }
            }).catch(err => console.log(err));
    }
    componentWillMount() {
        axios.get(`${ServerURL}/getUsers`)
            .then(e => {
                var showdata = e.data.filter((v) => v.status === 0)
                var data = showdata.map((v, k) => {
                    var pay = "", count = 0;
                    if (v.countANDpay.length === 0) {
                        pay = "$0";
                        count = 1;
                    }
                    else {
                        v.countANDpay.map((v1, k1) => {
                            pay += v1.pay;
                            count += v1.count;
                        });
                    }
                    return {
                        id: v._id,
                        email: v.email,
                        name: v.name,
                        payment: pay,
                        count
                    }
                });
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div style={{ height: "90vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="user-header-text">
                    MANAGER USERS
                </div>
                <Card style={{ width: "95%", height: "80%", borderRadius: "20px" }}
                >
                    <Table bordered pagination={false} dataSource={this.state.data} columns={this.columns} />
                </Card>
                <Modal title={<div style={{ textAlign: "center", fontWeight: "bold", color: "#C90E08", fontSize: "20px" }}>USER EDIT</div>} visible={this.state.visible} footer={false} onOk={this.handleOk}>
                    <div className="modal-root">
                        <div className="Log-Input-Container">
                            <div className="email-content">
                                NAME :
                            </div>
                            <div style={{ display: "flex" }}>
                                <div className="email-icon">
                                    <i className="fa fa-user" style={{ color: "white" }} />
                                </div>
                                <div>
                                    <Input size="large" name="name" value={this.state.name} onChange={(e) => this.onEditChange(e)} placeholder="Name here........" className="email-input" />
                                </div>
                            </div>
                        </div>
                        <div className="Log-Input-Container">
                            <div className="email-content">
                                E-Mail :
                            </div>
                            <div style={{ display: "flex" }}>
                                <div className="email-icon">
                                    <i className="fa fa-envelope" style={{ color: "white" }} />
                                </div>
                                <div>
                                    <Input size="large" name="email" value={this.state.email} onChange={(e) => this.onEditChange(e)} placeholder="E-mail here........" className="email-input" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer-customer">
                            <div className="modal-footer-ok" onClick={() => this.handleOk()}><div>OK</div></div>
                            <div className="modal-footer-cancel" onClick={() => this.handleCancel()}><div>Cancel</div></div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default Users;