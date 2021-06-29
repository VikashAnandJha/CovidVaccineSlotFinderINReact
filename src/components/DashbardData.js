import React, { Component } from 'react'

export class DashboardData extends Component {

    

    constructor(props) {
        super(props)
    
        // this.fetchStateDetails(this.props.stateId)

        this.state={
            data:null
        }

      //  this.updateData = this.updateData.bind(this);
    }
    
   
    updateData = (result) => {
    


        this.setState(prevState => ({
            data:result
        }))

        //console.log("update data called")

       }

       fetchStateDetails(stateId){
        const url='https://lowcars.co.in/APIv2/docsPanel/mainPageData.php';
          fetch(url)
          .then(res => res.json())
            .then(
              (result) => {
                console.log("Showing results For "+stateId)
                console.log(result)
                 

             // this.updateData(result)
      
                
                 
              },
              
              (error) => {
                
              }
            )
       }

       componentDidMount(){
 console.log("Dashboar componentdidmount")
 this.fetchStateDetails(this.props.stateId)
       }


     
    render() {
        
       console.log("renderDashboard")
      

        return (
            <div>
<h1>Showing Results For {this.props.stateId} {this.state.count}</h1>
<div className="row">
 <div className="col col-4">
   <div className="tile"> 
    <div className="overlay">

      Free Slots
      
    </div>
  </div>
   </div><div className="col col-4">
   <div className="tile">
    <div className="overlay">
      
    </div>
  </div>
   </div>
   <div className="col col-4">
   <div className="tile">
    <div className="overlay">

      
    </div>
  </div>
   </div>

   
    
  </div>
                
            </div>
        )
    }
}

export default DashboardData
