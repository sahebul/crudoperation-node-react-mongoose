import React,{Component } from 'react';
import axios from 'axios';
export default class Edit extends Component{
  constructor(props){
    super(props);
    this.onChangePersonName=this.onChangePersonName.bind(this);
    this.onChangeBusinessName=this.onChangeBusinessName.bind(this);
    this.onChangeGST=this.onChangeGST.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.state={
      person_name:'',
      business_name:'',
      gst_no:''
    }
  }
  onChangePersonName(e){
    this.setState({
      person_name:e.target.value
    })
  }
  onChangeBusinessName(e){
    this.setState({
      business_name:e.target.value
    })
  }
  onChangeGST(e){
    this.setState({
      gst_no:e.target.value
    })
  }
  componentDidMount(){
    axios.get('http://localhost:4001/business/edit/'+this.props.match.params.id)
    .then(response=>{
      this.setState({
        person_name:response.data.person_name,
        business_name:response.data.business_name,
        gst_no:response.data.gst_no
      })
      .catch(function(err){
        console.log(err);
      })
    })
  }
  onSubmit(e){
    e.preventDefault();
    const obj = {
      person_name:this.state.person_name,
      business_name:this.state.business_name,
      gst_no:this.state.gst_no
    };
    axios.post('http://localhost:4001/business/update/'+this.props.match.params.id,obj)
    .then(res=>console.log(res.data));
    this.props.history.push('/index');
  }
  render(){
    return (
      <div style={{marginTop:10}}>
      <h3>Update Business</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Person Name: </label>
          <input type="text" className="form-control" value={this.state.person_name} onChange={this.onChangePersonName}/>
        </div>
        <div className="form-group">
          <label>Business Name: </label>
          <input value={this.state.business_name} onChange={this.onChangeBusinessName} type="text" className="form-control"/>
        </div>
        <div className="form-group">
          <label>GST: </label>
          <input value={this.state.gst_no} onChange={this.onChangeGST} type="text" className="form-control"/>
        </div>
        <div className="form-group">
        <input type="submit" value="Update" className="btn btn-primary"/>
        </div>
      </form>
      </div>
    );
  }
}
