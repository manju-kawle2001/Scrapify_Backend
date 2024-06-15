import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlRating from '@shoelace-style/shoelace/dist/react/rating';
import SlSpinner from '@shoelace-style/shoelace/dist/react/spinner';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Api from '../WebApi';

export default function UserCreativeProductList() {
    const { user } = useContext(UserContext);
    const [userProductList, setUserProductList] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [iscrapDeleteBtn, setDeleteScrapBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${Api.GetPRoductByUserID}/${user._id}`)
                console.log(response.data.products);;
                setUserProductList(response.data.products);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching user products', error);
                console.log(error);
                setIsLoading(false);
            }
        };

        if (user) {
            fetchUserProducts();
        }
    }, [user]);


    const handleDeleteProduct = async (productId) => {
        setDeleteScrapBtn(true);
        swal({
            title: "Are you sure?",
            text: "You want Delete The Scrap ?",
            icon: "warning",
            buttons: ["Cancel", "OK"], // Array containing button text
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    setIsDeleteLoading(true);
                    swal("Product Deleted", {
                        icon: "success",
                    });

                    try {
                        const response = await axios.delete(`${Api.DeleteProductById}/${productId}`);
                        console.log('Product deleted:', response.data);
                        const updatedProductList = userProductList.filter((product) => product._id !== productId);
                        setUserProductList(updatedProductList);
                        setIsDeleteLoading(false);
                    } catch (error) {
                        console.log('Error deleting product:', error);
                        setIsDeleteLoading(false)
                    }

                } else {
                    setDeleteScrapBtn(false);
                }
            });
    }



    const handleProductDtails = (product) => {
        navigate('/userproductdetails', { state: product });
    }




    const css = `
        .card-overview {
            max-width: 300px;
        }

        .card-overview small {
            color: var(--sl-color-neutral-500);
        }

        .card-overview [slot="footer"] {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        `;

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : userProductList.length === 0 ? (
                <p>No products available.</p>
            ) : (<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 sm:gap-3 gap-2 place-items-center'>{
                userProductList.map((product) => (
                    <>
                        <SlCard className="card-overview">
                            <img
                                className='h-[300px]'
                                slot="image"
                                src={product.thumbnail}
                                alt={product.productName}
                            />
                            <strong>{product.productName}</strong>
                            <br />
                            <p className='line-clamp-2'>{product.description}</p>
                            <br />
                            <div className='w-full'>
                                <small>{product.createdAt}</small>
                                <button disabled={isDeleteLoading} onClick={() => { handleDeleteProduct(product._id) }} className='text-xl float-right btn btn-outline btn-warning'  >{isDeleteLoading ? <SlSpinner /> : <RiDeleteBin6Line />}</button>
                            </div>
                            <div slot="footer">
                                <SlButton variant="primary" pill onClick={() => handleProductDtails(product)}>
                                    More Info
                                </SlButton>
                                <SlRating></SlRating>
                            </div>
                        </SlCard>

                        <style>{css}</style>
                    </>
                ))}
            </div>

            )}
        </div>
    );
}
