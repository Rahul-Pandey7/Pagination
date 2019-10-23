import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from 'query-string';


export default class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:[],
            obj:{
                subject:'',
                order:'',
                page:1
        }
    }
}
    componentDidMount = () => {
        console.log(this.props.location.search)
        const val = queryString.parse(this.props.location.search)
        let data={
            subject:val.sort,
            order:val.order,
            page:val.page
        }
        this.setState({
            obj:data
        })
        axios({
            method: 'get',
            url: `http://localhost:5000/sort?${queryString.stringify(this.state.obj)}`,
            page: this.state.page
        })

            .then((response) => {
                console.log(response.data)
                 this.setState({
                    arr: [...response.data],
                });
            })
            .catch((err) => alert(err))
    }
    change_subject = (e) => {
        console.log(e.target.value)
        const val = (e.target.value)
        let data=this.state.obj
        data.subject=val
        this.setState({
            obj: data
        },
            () => {this.props.history.push(`/sort?${queryString.stringify(this.state.obj)}`)})
    }
    change_sorting = (e) => {
        console.log(e.target.value)
        const val = (e.target.value)
        let data=this.state.obj
        data.order=val
        this.setState({
            obj: data
        },
            () => { this.props.history.push(`/sort?${queryString.stringify(this.state.obj)}`) })
    }
    select_page = (e) => {

        console.log(e.target.value)
        const val = (e.target.value)
        let data=this.state.obj
        data.page=val
        this.setState({
            obj: data
        },
            () => { this.props.history.push(`/sort?${queryString.stringify(this.state.obj)}`) })
    }
    render() {
        return (
            <div>
                <div className="jumbotron" style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }}>
                    <h1 className="text-center display-4 text-white">Marks Statistics</h1>
                </div>
                <div className="container mt-5">
                    <div class="input-group mb-3 w-50">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Subjects</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01"
                            onChange={this.change_subject} value={this.state.obj.subject}>
                            <option selected></option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div class="input-group mb-3 mt-5 w-50">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Sort By</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01"
                            onChange={this.change_sorting} value={this.state.obj.order}>
                            <option selected></option>
                            <option value="1">Ascending Order</option>
                            <option value="-1">Descending Order</option>
                        </select>
                    </div>
                    <label>Page No:</label>
                    <input type="text" className="mt-4" onChange={this.select_page} value={this.state.obj.page} name="page" />
                </div>
                <div className="container mt-5">
                    <div className="row">
                        {this.state.arr.map((items,index)=>{
                            return (
                                <div className="col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <h1 class="card-title">"{items.name}"</h1>
                                 {this.state.subject=="Mathematics"? <h4 className="text-success">Mathematics: {items.Mathematics}</h4> : <h4>Mathematics: {items.Mathematics}</h4> }   
                                 {this.state.subject=="Physics"? <h4 className="text-success">Physics: {items.Physics}</h4> : <h4>Physics: {items.Physics}</h4> }   
                                 {this.state.subject=="Chemistry"? <h4 className="text-success">Chemistry: {items.Chemistry}</h4> : <h4>Chemistry: {items.Chemistry}</h4> }   
                                 {this.state.subject=="Biology"? <h4 className="text-success">Biology: {items.Biology}</h4> : <h4>Biology: {items.Biology}</h4> }   
                                 {this.state.subject=="Hindi"? <h4 className="text-success">Hindi: {items.Hindi}</h4> : <h4>Hindi: {items.Hindi}</h4> }   
                                 {this.state.subject=="English"? <h4 className="text-success">English: {items.English}</h4> : <h4>English: {items.English}</h4> }   
                                </div>
                            </div>
                        </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}