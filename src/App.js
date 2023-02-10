import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from 'react-redux'
import { addCache } from './history/historySlice'

import useGooglePlaceAutoComplete from "./service/google_place_autocomplete";

function Home() {

    const [name, setName] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const dispatch = useDispatch()
    const { cache } = useSelector((state) => state.history)

    const placeRef = useRef();
    const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
    let autoComplete = "";

    const { handleSubmit, register, setValue, formState: { errors } } = useForm({});

    const handlePlaceSelect = async () => {
        let placeObj = await googleAutoCompleteSvc.getInfo(autoComplete);
        console.log("Obj", placeObj)
        placeRef.current.value = placeObj.name;
        setValue("place", placeObj.name);
        setName(placeObj.name)
        setLat(placeObj.lat)
        setLng(placeObj.long)
    };

    const onSubmit = async () => {
        console.log("Success!");
        console.log("name : ", name)
        console.log("lat : ", lat)
        console.log("lng : ", lng)
        await dispatch(addCache("NAME: " + name + " - LAT: " + lat + " - LONG: " + lng))
    };

    useEffect(() => {
        async function loadGoogleMaps() {
            // initialize the Google Place Autocomplete widget and bind it to an input element.
            // eslint-disable-next-line
            autoComplete = await googleAutoCompleteSvc.initAutoComplete(placeRef.current, handlePlaceSelect);
        }
        loadGoogleMaps();
    }, []);


    const Items = cache.map((item) => {

        return (
            <div>{item}</div>
        );
    });

    let view = Items;

    return (
        <>

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Search Place:</p>
                <div>
                    <div>
                        <label>Enter</label>
                        <input
                            id="place"
                            type="text"
                            placeholder="KLCC"
                            {...register("place", { required: true })}
                            ref={placeRef}
                        />
                        {errors.place && <span className="validation-error">Error: Place is required.</span>}
                    </div>
                </div>
                <p></p>
                <div>
                    <button type="submit">
                        Submit
                    </button>
                </div>
                <hr />
                <p>Search History:</p>
                <div>
                    {view}
                </div>
            </form>
        </div>
        
        </>
    );
}

export default Home;