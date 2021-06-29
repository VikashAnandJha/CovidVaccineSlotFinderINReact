import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { Statistic } from 'semantic-ui-react'
import VaccineCenterList from './VaccineCenterList'

import moment from 'moment';

import Moment from 'react-moment';
  function CovidSlotDashboard() {

    const [stateList,setstateList]= useState([])
    const [selectedState,setSelectedState]= useState({stateId:"",stateName:"All India"})
    const [selectedDist,setSelectedDist]= useState({distId:"",distName:""})
    
    const [stateData,setSateData]= useState([])
    const [distList,setDistList]= useState([])
    const [centerList,setCenterList]= useState([])

    const today=moment().endOf('day').add(0,'days').format('YYYY-MM-DD')
    const tomorrow=moment().endOf('day').add(1,'days').format('YYYY-MM-DD')
    const dayAfterTomorrow=moment().endOf('day').add(2,'days').format('YYYY-MM-DD')

    console.log("today"+today)



    useEffect(() => {
           
axios.get(`https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=${today}`).then(function(resp){
    

console.log(resp.data.getBeneficiariesGroupBy)

   setstateList(resp.data.getBeneficiariesGroupBy)
    
}).catch(function(error){
    console.log(error)
})


    }, [])

    useEffect(() => {
           
        axios.get(`https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=${selectedState.stateId}&district_id=${selectedDist.distId}&date=${today}`).then(function(resp){
            
         
        console.log(resp.data)
        
            setSateData(resp.data.topBlock.vaccination)
            if(!(selectedDist.distId>0))
            setDistList(resp.data.getBeneficiariesGroupBy)
           
            
        }).catch(function(error){
            console.log(error)
        })

        console.log("calling")
        
        
            }, [selectedState,selectedDist])


       


            let itemsToRender;
            if (stateList) {
              itemsToRender = stateList.map((state) => {
                return <option value={state.id}>{state.title} </option>;
              });
            }else{
                
            } 
            let cityitemsToRender;
            if (distList) {
                cityitemsToRender = distList.map((dist) => {
                return <option value={dist.id}>{dist.title} </option>;
              });
            }else{
                
            }

            const getStateListChange=function(e){

                setSelectedState({ 
                    stateName:e.target.options[e.target.selectedIndex].text,
                    stateId:e.target.value
                })
                console.log("state Specefic data set")
            
                // resetting the dist list

                setSelectedDist({ 
                    distName:"",
                    distId:""
                })
            
            } 
            const getDistListChange=function(e){

                setSelectedDist({ 
                    distName:e.target.options[e.target.selectedIndex].text,
                    distId:e.target.value
                })
                console.log("dist Specefic data set")
            //fetchStateData(selectedState.stateId)
            
            
            
            } 


           
            const StatisticExampleStatisticState = () => (
                <div>
                     
                <Statistic>
                      <Statistic.Value>{stateData.today}</Statistic.Value>
                      <Statistic.Label>Today Vaccinated</Statistic.Label>
                    </Statistic> 
                    
                    <Statistic>
                      <Statistic.Value>{stateData.total}</Statistic.Value>
                      <Statistic.Label>Total Vaccinated</Statistic.Label>
                    </Statistic>
                
                </div>
                
                   
                
                
                  )
                   
                  
                       
    
  let dataToRender;
    if (stateData.total) {
        console.log("state"+stateData)
         dataToRender= <>

       
       Showing Resuts for {selectedState.stateName} {selectedDist.distName}
       <br></br>
      <StatisticExampleStatisticState></StatisticExampleStatisticState>
        
      </>
    }else{
        dataToRender="Select the state to show its data"
    }

  

 
  

    return (
        <>

<div>

Select Your State
 <select onChange={getStateListChange}>
     <option value="">All India</option>

{ itemsToRender}     

 </select>

 Select Your City
 <select onChange={getDistListChange}>
     <option value="">All District</option>

{ cityitemsToRender}     

 </select>



 <br></br>
{dataToRender}

 <br>
 </br>
 <VaccineCenterList data={selectedDist}></VaccineCenterList>
 
             

            
</div>


        </>
        
    )
}

export default CovidSlotDashboard
