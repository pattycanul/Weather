import React from "react";
import './Search.css'

export const Search = ({search, setSearch, takeApi}) => {
    
    const realizarBusqueda = ({target}) => {
        setSearch(target.value)
    }
    const addCard = async (e) =>{
        e.preventDefault()
        const newCiudad =+ await takeApi(search) 

        console.log(newCiudad)
        setSearch('');
    }
    
return (
        <div>
            <input type="text" class="input" name="search" value={search} onChange={realizarBusqueda}/>
            <button type="submit" class="btn" onClick={addCard}>Agregar Ciudad</button>
        </div>
    )
}