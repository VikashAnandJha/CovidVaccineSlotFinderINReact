import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';


function VaccineCenterList(prop) {
    const [centerList, setCenterList] = useState([])
const distData=prop.data;



    useEffect(()=>{
        console.log("dist slot :"+distData.distName)
        if(distData.distId>0) 
        fetchVaccineSlots()
    },[distData])

    const fetchVaccineSlots=function()
    {
     
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${distData.distId}&date=29-06-2021`).then(function(resp){
                
             
            console.log(resp.data.centers)
            setCenterList(resp.data.centers)
                 
               
                
            }).catch(function(error){
                console.log(error)
            })
    
    }


    return (
        <div>
            <h3>Covid Vaccine Centers for {prop.data.distName} </h3>
            
        </div>
    )
}

export default VaccineCenterList
