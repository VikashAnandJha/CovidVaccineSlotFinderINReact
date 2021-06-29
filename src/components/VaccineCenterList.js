import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';

import {   Item,Label,Button,Icon,Table } from 'semantic-ui-react'


const today=moment().endOf('day').add(0,'days').format('YYYY-MM-DD')
const todayF=moment().endOf('day').add(0,'days').format('DD-MM-YYYY') //f=>formatted diff
const tomorrowF=moment().endOf('day').add(1,'days').format('DD-MM-YYYY')
const dayAfterTomorrowF=moment().endOf('day').add(2,'days').format('DD-MM-YYYY')


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
     
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${distData.distId}&date=${todayF}`).then(function(resp){
                
             
            console.log(resp.data.centers)
            setCenterList(resp.data.centers)
                 
               
                
            }).catch(function(error){
                console.log(error)
            })
    
    }



    
console.log(centerList)
    let centerListToRender;
    let todayData="N/A",tomorrowData="N/A",dayAfterTomorrowData;
    if (centerList) {
        centerListToRender = centerList.map((center) => {
        return  (<>  
<Item>
             <Item.Content>
              <Item.Header>{center.name}</Item.Header>
              <Item.Meta> 
              {center.address}
              </Item.Meta>
              <Item.Description>
              <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Today</Table.HeaderCell>
        <Table.HeaderCell>Tomorrow({tomorrowF})</Table.HeaderCell> 
        <Table.HeaderCell>DayAfterTomorrow({dayAfterTomorrowF})</Table.HeaderCell> 
      </Table.Row>
    </Table.Header>
    
    <Table.Body>
    


<Table.Row>
        <Table.Cell> 
        {  
        center.sessions.map((slots)=>{
        let color;
        if(slots.available_capacity>0) color="green"; else color="red"

if(slots.date==todayF){
    return<><Button as='div' labelPosition='right'>
<Button basic color={color}>
<Icon name='Available' />
{slots.vaccine} {slots.min_age_limit}+
</Button>
<Label as='a' basic color={color} pointing='left'>
{slots.available_capacity}
</Label>
</Button>
<br></br>
</>
} }) } 
            
        
            </Table.Cell> 
            <Table.Cell> 
            
            { center.sessions.map((slots)=>{
        let color;
        if(slots.available_capacity>0) color="green"; else color="red"
 
if(slots.date==tomorrowF){
    return<><Button as='div' labelPosition='right'>
<Button basic color={color}>
<Icon name='Available' />
{slots.vaccine} {slots.min_age_limit}+
</Button>
<Label as='a' basic color={color} pointing='left'>
{slots.available_capacity}
</Label>
</Button>
<br></br>
</>
} }) } 
            
            
            </Table.Cell>   <Table.Cell> 
            
            { center.sessions.map((slots)=>{
        let color;
        if(slots.available_capacity>0) color="green"; else color="red"
 
if(slots.date==dayAfterTomorrowF){
    return<><Button as='div' labelPosition='right'>
<Button basic color={color}>
<Icon name='Available' />
{slots.vaccine} {slots.min_age_limit}+
</Button>
<Label as='a' basic color={color} pointing='left'>
{slots.available_capacity}
</Label>
</Button>
<br></br>
</>
} }) } 
            
            
            </Table.Cell>  
      </Table.Row>        
</Table.Body>
    </Table>
              </Item.Description>
            </Item.Content>
          </Item> 
        </>
            
        )
      });
    }else{
        centerListToRender="N/A"
    } 
let titleToRender;
    if(!(prop.data.distId>0)){
        centerListToRender="";
        titleToRender=""
    }else{
        titleToRender=<><h1>Covid Vaccine Centers {prop.data.distName} </h1></>
    }



    return (
        <div className="ui left">
            <hr></hr>
           
{titleToRender}
<div align="left">
<Item.Group >
                {centerListToRender}
                </Item.Group>
</div>
 
            
           
            
        </div>
    )
}

export default VaccineCenterList
