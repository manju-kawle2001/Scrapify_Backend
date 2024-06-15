import SlSpinner from '@shoelace-style/shoelace/dist/react/spinner';
import axios from 'axios';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';
import Api from '../WebApi';
function ProductUplodedForm() {

    const { categoryList, isLoading, error } = useSelector((store) => store.category);
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [finalPrice, setFinalPrice] = useState(0);
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        thumbnail: '',
        shippingcost: '',
        images: ''
    });


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryName: '',
        price: '',
        seller: '',
        brand: '',
        actualprice: '',
        quintity: '',
        discount: '',
        shippingcost: '',
        thumbnail: null,
        images: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (!value.trim()) {
            setErrors((prevState) => ({ ...prevState, [name]: `${name} cannot be empty` }));
        } else {
            setErrors((prevState) => ({ ...prevState, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = Object.values(errors).every((error) => !error);
        if (!isFormValid) {
            toast.error('Please fill all fields correctly and ensure they are not empty');
            return;
        }
        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('productName', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('quintity', formData.quintity);
        formDataToSend.append('sellerId', user._id);
        formDataToSend.append('brand', formData.brand)
        formDataToSend.append('shippingcost', formData.shippingcost)
        formDataToSend.append('thumbnail', formData.thumbnail);
        formData.images.forEach((image, index) => {
            formDataToSend.append('images', image);
        });

        try {
            console.log(formDataToSend);
            const response = await axios.post(Api.AddProductByUserID, formDataToSend);
            console.log('Product added successfully:', response.data);
        } catch (error) {
            console.log('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, thumbnail: file });

    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    function calculateFinalPrice() {
        let actualPrice = 200;
        let discountPercentage = 10;
        let shippingCost = 5;
        let quantity = 2;
        let commissionPercentage = 5;
        let discountedPrice = actualPrice - (actualPrice * (discountPercentage / 100));
        let totalShippingCost = shippingCost * quantity;
        let finalPriceBeforeCommission = discountedPrice + totalShippingCost;
        let commissionPrice = finalPriceBeforeCommission * (commissionPercentage / 100);
        // let finalPrice = finalPriceBeforeCommission + commissionPrice;
        // setFinalCost(finalPrice||200)
    }

    let actualPrice = 111;
    let discountPercentage = 10;
    let shippingCost = 5;
    let quantity = 2;
    let commissionPercentage = 5;

    return (

        <div className="sm:w-3/5 w-10/12 h-full flex justify-center items-center border-2 border-slate-800 rounded-xl p-4">
            <form className='grid-cols-2 w-10/12 grid gap-4' onSubmit={handleSubmit} enctype="multipart/form-data">

                <div className='col-span-2'>
                    <div> <Label htmlFor="title" value="Title" /></div>
                    <TextInput type="text" name="title" placeholder="Title" onChange={handleInputChange} />
                    <br />
                    <span className="text-red-500 z-30">{errors.title}</span>
                </div>

                <div className='col-span-1'>
                    <div> <Label htmlFor="category" value="Category" /></div>
                    <select className="select select-bordered" name="category" onChange={handleInputChange}>
                        <option disabled selected>Pick one</option>
                        {categoryList.map((category, index) => (
                            <option key={category._id} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    <span className="text-red-500">{errors.category}</span>
                </div>
                <div className='col-span-1'>
                    <div>
                        <Label htmlFor='brand'>Brand Name</Label>
                        <TextInput type='text' name='brand' placeholder='Brand Name' onChange={handleInputChange} ></TextInput>
                    </div>
                </div>


                <div className='col-span-2'>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Add Scrap Description</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24"
                            placeholder="Add Scrap Description" type="text" name="description" onChange={handleInputChange}>
                        </textarea>
                        <span className="text-red-500">{errors.description}</span>
                    </label>
                </div>

                {/* price --------------------- */}
                <div className='cols-span-2'>
                    <div> <Label htmlFor="actual price" value="Actual Price" />
                        <span className="text-red-500">{errors.price}</span>
                    </div>
                    <TextInput type="number" min={0} defaultValue={0} name="actual price" placeholder="Actual Price" />

                </div>
                <div className='cols-span-2'>
                    <div> <Label htmlFor="quintity" value='Quintity' />
                        <span className="text-red-500">{errors.quintity}</span>
                    </div>
                    <TextInput min={1} defaultValue={1} type="number" name="quintity" placeholder="Quintity" onChange={handleInputChange} />

                </div>
                <div className='cols-span-2'>
                    <div> <Label htmlFor="ShippingCost" value="ShippingCost" />
                        <span className="text-red-500">{errors.price}</span>
                    </div>
                    <TextInput type="number" min={0} defaultValue={0} name="shippingcost" placeholder="ShippingCost" onChange={handleInputChange} />

                </div>
                <div className='cols-span-2'>
                    <div> <Label htmlFor="discount" value='Discount' />
                        <span className="text-red-500">{errors.quintity}</span>
                    </div>
                    <TextInput min={0} max={80} type="number" name="discount" placeholder="discount" onChange={handleInputChange} />

                </div>

                <div className='cols-span-2'>
                    <div> <Label htmlFor="Commission" value='Scrapify Commission' />
                        <span className="text-red-500">{errors.quintity}</span>
                    </div>
                    <TextInput min={1} disabled type="Commission" name="Commission" placeholder="Commission" onChange={handleInputChange} />

                </div>

                <div className='cols-span-2'>
                    <div> <Label htmlFor="price" value="Price" />
                        <span className="text-red-500">{errors.price}</span>
                    </div>
                    <TextInput type="number" min={0} defaultValue={0} name="price" placeholder="Price" value={123} disabled onChange={handleInputChange} />

                </div>


                {/* prce end -------------------------------------------------------- */}


                <div className='col-span-2'>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="file-upload" value="Upload File" />
                        </div>
                        <FileInput type="file" name="thumbnail" accept="image/*" onChange={handleThumbnailChange} id="file-upload" />
                    </div>

                </div>
                <div>
                    <span className="text-red-500">{errors.thumbnail}</span>
                </div>

                <div className='col-span-2'>
                    <div className="mb-2 block">
                        <Label htmlFor="file-upload" value="Upload Images" />
                    </div>
                    <FileInput type="file" name="images" accept="image/*" multiple onChange={handleImagesChange} />

                </div>
                <div>
                    <span className="text-red-500">{errors.images}</span>
                </div>
                <div className='col-span-2'>
                    <Button className='bg-[#232323]' type="submit">{loading ? <SlSpinner /> : 'Add Product'}</Button>
                </div>
            </form >
        </div >
    );
}

export default ProductUplodedForm;
