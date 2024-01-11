import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { GoogleMap, LoadScript, MarkerF, InfoWindow} from '@react-google-maps/api';
import {sports} from '../helpers/sport';
import axios from 'axios';
import {config} from '../config';

import {getCoachByDistance} from '../api/lesson'

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

const containerStyle = { height: '60vh', width: '100%' }

const API_KEY = 'AIzaSyDnxU0AwNwyTGSo1RAcsa4Dr27Xt0ngbaI';

const Search = (props)=>{
    
    const defaultProps = {
					    center: {
					      lat: 49.8865792,
					      lng: 2.359296
					    },
					    zoom: 16
					  };
					  
    
    const [position, setPosition] = useState(defaultProps.center)
    const [zoom, setZoom] = useState(16)
    const [address, setAddress] = useState("")
    const [radius, setRadius] = useState(5)
    const [coachs, setCoachs] = useState([])
    const [sport, setSport] = useState("")
    const [error, setError] = useState(null)
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    
    const showInfoWindow = () => {
        setInfoWindowOpen(true);
      };

    
    useEffect(()=>{
        if (window.navigator.geolocation) {
            
            window.navigator.geolocation.getCurrentPosition((position) => {
			 	let coords = {lat: position.coords.latitude, lng: position.coords.longitude};
			 	console.log(coords)
			 	setPosition(coords)
			 	
            }, (error)=>{
            	console.log(error)
            })
            
        }else{
            alert("Vous n'êtes pas géolocalisé")
        }
    }, [])
   
    const onSubmitForm = ()=>{
        axios.get('https://nominatim.openstreetmap.org/search?q='+address+'&format=geocodejson')
        .then((res)=>{
            if(res.data.features.length === 0) {
                setError("Address inexistante")
            }else{
                let lat = res.data.features[0].geometry.coordinates[1];
		        let lng = res.data.features[0].geometry.coordinates[0];
		        
		        let coords = {
		        	lat: lat,
		        	lng: lng
		        }
		        
		        let deg = radius * 0.009
		        
		        let lat_min = lat - deg; // -1.7
	        	let lat_max = lat + deg; // -1.5
	        	let long_max = lng + (deg / Math.cos( lat * (Math.PI/180)));
	        	let long_min = lng - (deg / Math.cos(lat*Math.PI/180))
	        	
	        	let data = {
					  min_lat: lat_min,
					  max_lat: lat_max,
					  min_lng: long_min,
					  max_lng: long_max,
					  sport: sport
					}
					
				getCoachByDistance(data)
				.then((res)=>{
				    setCoachs(res.result)
				    setPosition(coords)
				    setZoom(14)
				    console.log(coachs)
				})
				.catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
    
   
    const createMarkers = ()=>{
        return coachs.map((coach)=>{
        	let coords = {
		        	lat: coach.lat,
		        	lng: coach.lng
		        }
            return (
                <MarkerF
		          	position={coords}
				    text="My Marker"
				    onClick={() => setInfoWindowOpen(true)}
		         >
					{infoWindowOpen && <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
			             <div
				          	className="coachMarker"
				         >	
				        	<CloudinaryContext cloudName="dt6k2cynj">
					            <div>
					              <Image publicId={coach.imageUrl}>
					                <Transformation quality="auto" fetchFormat="auto" />
					              </Image>
					              <Link to={"/detail/"+coach.id}>{coach.firstName} {coach.lastName}</Link>
					            </div>
					         </CloudinaryContext>
				          	
					     </div>
			        </InfoWindow>}
		         </MarkerF>
            )
        })
    }
    
    return(
        <div>
            <h1>Trouvez un coach</h1>
            <form
				className="c-form"
				onSubmit={(e)=>{
					e.preventDefault();
					onSubmitForm()
				}}
			>
				<input 
					type="text" 
					placeholder="Tapez un adresse"
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<p>Choisissez un sport : </p>
				<select
					onChange={(e)=>{
						setSport(e.currentTarget.value)
					}}
				>
					{
						sports.map((sport, index)=>{
							return (<option key={index} value={sport}>
										{sport}
									</option>)
						})
					}
				</select>
				<p>Quelle distance (km) : </p>
				<select
					onChange={(e)=>{
						setRadius(e.currentTarget.value)
					}}
				>
					{
						[...Array(20).keys()].map((num, index)=>{
							return (<option key={index} value={num+1}>
										{num+1}
									</option>)
						})
					}
				</select>
				<input type="submit" name="Chercher"/>
			</form>
            <div>
		    	<LoadScript
			      googleMapsApiKey={API_KEY}
			    >
			      <GoogleMap
			    	mapContainerStyle={containerStyle}
			        center={position}
			        zoom={zoom}
			        onClick={() => setInfoWindowOpen(false)}
			      >
			        { /* Child components, such as markers, info windows, etc. */ }
			    	<MarkerF
				    	position={position}
				    	icon={"http://www.robotwoods.com/dev/misc/bluecircle.png"}
				    />
			    	{createMarkers()}
			      </GoogleMap>
			    </LoadScript>
		    </div>
          
        </div>
    )
}

export default Search