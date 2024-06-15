import GoogleMapReact from 'google-map-react';
import React from 'react';

function MapComponent(props) {
    return (
        <div className="h-[300px] mb-5 w-full sm:w-3/5 lg:w-2/5 mx-auto">
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={props.center}
                defaultZoom={props.zoom}
            >
            </GoogleMapReact>
        </div>
    );
}

function About() {
    const mapCenter = { lat: 51.505, lng: -0.09 };
    const mapZoom = 11;
    return (
        <div className="flex flex-col h-full">
            <div className="bg-[#DEDED2] flex-grow">
                <h1 className="font-oswald sm:text-4xl font-bold text-center pt-5">Office Locations & Contact Info</h1>
                <div className="flex justify-center items-center flex-col sm:flex-row text-center mt-10">
                    <div className="mb-10 sm:mb-0 sm:mr-5 w-full  sm:w-1/2 flex justify-center items-center flex-col">
                        <p className="font-oswald sm:text-xl font-medium">
                            Indore, India (HQ)<br />
                            Pune, India<br />
                            Vadodara, India<br />
                            ------------------------------
                        </p>
                        <p className="font-oswald sm:text-xl font-medium">
                            Vijay-Nagar Indore<br />
                            (M.P) HeadQuatar 452010<br />
                            Helpline No.9876543212
                        </p>
                    </div>
                    <div className="w-full sm:w-1/2 flex justify-center items-center flex-col">
                        <MapComponent center={mapCenter} zoom={mapZoom} />
                    </div>
                </div>
                <div className='h-[1px] bg-black opacity-35'></div>
            </div>
        </div>
    );
}

export default About;
