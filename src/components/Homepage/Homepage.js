// import Navbar from "../Navbar/Navbar";
// import Editor from "../Editor/Editor";
import React from 'react'
import Heading from '../heading/heading'
import './homepage.css'
import Card from '../Card/card'
var margin={
    marginTop:"80px",
}
var color1={
    backgroundColor:'white',
    height:'100vh',
    
}


function Homepage() {
    return (
        <>
         
    <div style={color1}>
        <div style={margin}>
       <Heading />
       </div>
       
       <div className='row'>
       <Card 
        description=" A public platform building the definitive collection of coding questions & answers" 
        src="https://cdn.sstatic.net/Img/home/illo-public.svg?v=14bd5a506009"
        title="For Community"
        /> 
        <Card 
        description="A community-based space to find and contribute answers to challenges, and one of the most popular websites in the world." 
        src="https://cdn.sstatic.net/Img/home/illo-teams.svg?v=7e543f14fcc0"
        title="For Experts"
        />
    
       </div>
       
       <div class="verdicts">
        
				<p><strong>500+</strong><br/>
				Daily Doubts</p>

				<p><strong>100+</strong><br/>
				Active Users</p>

				<p><strong>25+</strong><br/>
				Experts</p>
               
                <p><strong>100+</strong><br/>
				doubt solve daily</p>

			</div>

    </div>
    


       </>


    )
}

export default Homepage