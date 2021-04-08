//import React from "react";
//import { connect } from 'react-redux';
import ReactTable from "react-table";
import { Link } from 'react-router-dom'
import "react-table/react-table.css";

import React, { Component } from 'react'
//import Input from '../../components/UI/Input/Input'
//import Button from '../../components/UI/Button/Button'
import * as actionTypes from '../../store/actions/userlist'
import {connect} from 'react-redux'
//import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'
import { object } from "prop-types";

class UserList extends React.Component {
    componentDidMount() {
        if (this.props.userLists.length === 0) {
            this.props.getUserList(1);
        }
    }
    render() {


        console.log('props =====>' +  JSON.stringify(this.props.pagesU) );
        
        //let aa = this.props.userLists.map(function(item) { return item.props._id == this.props.selectedUser.props._id ? this.props.selectedUser : item; });
        //  if (this.props.selectedUser.length != 0) {
        //      this.props.userLists.forEach(function(item, i) { if (item._id == this.props.selectedUser._id) this.props.userLists[i] = this.props.selectedUser;});
        //  }
        return (
            <div className="ui container">
                <br />
                <strong> User list </strong>
                <br />
                <br />
                <ReactTable
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            onClick: (event) => {
                                this.props.getSelectedUser(rowInfo.original)
                            },
                        }
                    }}
                    data={this.props.userLists}
                    filterable
                
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) > -1}
                    columns={[
                        {
                            Header: "شناسه",
                            accessor: "_id",
                            Cell: e => <Link to={{ pathname: `/userDetails/${e.value}`, state: { selectedUser: 1 } }} >{e.value}</Link>
                        },
                        {
                            Header: "کاربر",
                            accessor: "role"
                        },
                        {
                            Header: "پلن",
                            accessor: "payPlan"
                        },
                        {
                            Header: "AvatarURL",
                            accessor: "avatarURL"
                        },
                        {
                            Header: "کشور",
                            accessor: "country"
                        },
                        {
                            Header: "شهر",
                            accessor: "city"
                        },
                        {
                            Header: "آدرس",
                            accessor: "address"
                        },
                        {
                            Header: "درباره",
                            accessor: "about"
                        },
                        {
                            Header: "Instagram",
                            accessor: "instagram"
                        },
                        {
                            Header: "Facebook",
                            accessor: "facebook"
                        },
                        {
                            Header: "Telegram",
                            accessor: "telegram"
                        },
                        {
                            Header: "نام",
                            accessor: "name"
                        },
                        {
                            Header: "Email",
                            accessor: "email"
                        },
                        {
                            Header: "Start at",
                            accessor: "Start_at"
                        },
                        {
                            Header: "Expire at",
                            accessor: "Expire_at"
                        },
                        {
                            Header: "Created",
                            accessor: "created"
                        },
                        {
                            Header: "Edited",
                            accessor: "edited"
                        }
                    ]}
                    pages={this.props.pagesU}
                    defaultPageSize={2}
                    noDataText={"Loading..."}
                    pageSizeOptions={[2, 10, 20, 25, 50, 100]}
                    className="-striped -highlight"
                    onFetchData={(state, instance) => {

                        this.props.getUserList(state.page);
                        //this.setState({loading: true});
                        // testService.getTestData(state.page, state.pa, state.sorted, state.filtered, (res) => {
                        //     this.setState({
                        //         data: res.data.rows,
                        //         pages: res.data.pages,
                        //         loading: false
                        //     })
                        // });
                    }}

                    manual
                />
                <br />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        userLists: state.userlist.userLists,
        pagesU:state.userlist.pagesUsrs,
        selectedUser:state.userlist.selectedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserList: (page) => dispatch(actionTypes.fetchUsers(page)),
        getSelectedUser: (selectedUser) => dispatch(actionTypes.selectedUsersInfo(selectedUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
