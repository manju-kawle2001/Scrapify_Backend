import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../../App';
import Api from '../WebApi';
function ScrapUploadForm() {

    const { scrapcategoryList, isLoading, error } = useSelector((store) => store.scrapcategory);
    const CountryName = Country.getCountryByCode("IN")
    const { user, setUser } = useContext(UserContext);
    const StateName = State.getStatesOfCountry('IN')
    const [stateCode, setStateCode] = useState('MP');
    const [cityName, setCityName] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            const cities = await City.getCitiesOfState("IN", stateCode);
            setCityName(cities);
        };
        fetchCities();
    }, [stateCode]);



    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryName: '',
        condition: '',
        price: '',
        seller: '',
        city: '',
        state: '',
        landmark: '',
        fullAddress: '',
        status: '',
        pincode: '',

        thumbnail: null,
        images: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, thumbnail: file });
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('categoryName', formData.categoryName);
        formDataToSend.append('condition', formData.condition);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('seller', user._id);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('landmark', formData.landmark);
        formDataToSend.append('state', stateCode);
        formDataToSend.append('fullAddress', formData.fullAddress);
        formDataToSend.append('pincode', formData.pincode);
        formDataToSend.append('thumbnail', formData.thumbnail);

        formData.images.forEach((image, index) => {
            formDataToSend.append('images', image);
        });
        try {
            console.log("Scrap Product Info : ", formDataToSend);
            const response = await axios.post(Api.AddScrapProduct, formDataToSend);
            console.log('Product added successfully:', response.data);
        } catch (error) {
            console.log('Error adding product:', error);
        }
    };

    return (
        <div className="sm:w-3/5 w-10/12 h-full flex justify-center items-center border-2 border-slate-800 rounded-xl p-4">
            <form className='grid-cols-1 sm:grid-cols-2  w-10/12 grid gap-4' onSubmit={handleSubmit} enctype="multipart/form-data">

                <div className='col-span-2'>
                    <div> <Label htmlFor="title" value="Title" /></div>
                    <TextInput type="text" name="title" placeholder="Title" onChange={handleInputChange} />
                </div>

                <div className='sm:col-span-1 col-span-2'>
                    <div> <Label htmlFor="category" value="Category" /></div>
                    <select className="select select-bordered" name="categoryName" onChange={handleInputChange}>
                        <option disabled selected>Pick one</option>
                        {scrapcategoryList.map((category, index) => (
                            <option key={category._id} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='sm:col-span-1 col-span-2'>
                    <div>
                        <Label htmlFor="condition" value="Conditon" />
                    </div>
                    <select className="select select-bordered" name="condition" onChange={handleInputChange}>
                        <option disabled selected  >Pick Up One</option>
                        <option value={'good'}>Good</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'worst'}>Worst</option>
                    </select>
                </div>

                <div className='sm:col-span-2 col-span-2'>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Add Scrap Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24"
                            placeholder="Add Scrap Description" type="text" name="description" onChange={handleInputChange}>
                        </textarea>
                    </label>
                </div>
                <div className='sm:cols-span-2 col-span-2'>
                    <div> <Label htmlFor="price" value="Price" /></div>
                    <TextInput type="number" name="price" placeholder="Price" onChange={handleInputChange} />
                </div>

                <div className='sm:col-span-1 col-span-2'>
                    <div> <Label htmlFor="state" value="State" /></div>
                    <select className="select select-bordered" onChange={(e) => setStateCode(e.target.value)}>
                        {StateName.map((state, index) => (
                            <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className='sm:col-span-1 col-span-2'>
                    <div>
                        <Label htmlFor="state" value="city" />
                    </div>
                    <select className="select select-bordered" name="city" onChange={handleInputChange}>
                        {cityName.map((city, index) => (
                            <option key={city.isoCode} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                </div>

                <div className='sm:col-span-1  col-span-2'>
                    <div> <Label htmlFor="landmark" value="landmark" /></div>
                    <TextInput name='landmark' placeholder='landmark' onChange={handleInputChange} />
                </div>

                <div className='sm:col-span-1 col-span-2'>
                    <div> <Label htmlFor="landmark" value="fullAddress" /></div>
                    <TextInput type="text" name="fullAddress" placeholder="fullAddress" onChange={handleInputChange} />
                </div>

                <div className='sm:col-span-1'>
                    <div> <Label htmlFor="pincode" value="pincode" /></div>
                    <TextInput type="text" name="pincode" placeholder="pincode" onChange={handleInputChange} />
                </div>

                <div className='col-span-2 sm:col-span-2'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="file-upload" value="Upload File" />
                        </div>
                        <FileInput type="file" name="thumbnail" accept="image/*" onChange={handleThumbnailChange} id="file-upload" />
                    </div>
                </div>

                <div className='col-span-2'>
                    <div className="mb-2 block">
                        <Label htmlFor="file-upload" value="Upload Images" />
                    </div>
                    <FileInput type="file" name="images" accept="image/*" multiple onChange={handleImagesChange} />
                </div>
                <div className='col-span-2'>
                    <Button className='b' type="submit">Add Product</Button>
                </div>
            </form >
        </div >
    );
}

export default ScrapUploadForm;
