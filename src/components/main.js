import React ,{useState,useEffect} from 'react'
import SelectForm from './selectform'
import {API} from '../api/index';


const Main = () => {

    const [places, getPlaces] = useState('');

    const getAllPlaces=async ()=>{
        const {data} = await API.get("/places")
        getPlaces(data);
    }

    useEffect(() => {
        getAllPlaces()
    }, []);

    return (
        <div>
            <SelectForm  places={places}/>
        </div>
    )
}

export default Main
