const useGooglePlaceAutoComplete = () => {

    const initAutoComplete = async (input, callback) => {
        let autoComplete =
            new window.google.maps.places.Autocomplete(input,
                {
                    // limit to Malaysia for now
                    componentRestrictions: { country: ["my"] },
                    fields: ["address_component", "geometry", "name"],
                    types: ["establishment"]
                }
            );
        autoComplete.addListener("place_changed", callback);

        return autoComplete;

    };

    const getInfo = async (autoComplete) => {

        const place = autoComplete.getPlace();
        

        let resInfo = {
            "lat": place.geometry.location.lat(),
            "long": place.geometry.location.lng(),
            "name": place.name,
        };

        return resInfo;

    };

    return {
        initAutoComplete,
        getInfo
    };

};

export default useGooglePlaceAutoComplete;