import SlBadge from '@shoelace-style/shoelace/dist/react/badge';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlCard from '@shoelace-style/shoelace/dist/react/card';
import SlSpinner from '@shoelace-style/shoelace/dist/react/spinner';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Api from '../WebApi';
import Skeleton from './Skeleton';

export default function UserScrapList() {
    const { user } = useContext(UserContext);
    const [userProductList, setUserProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [iscrapDeleteBtn, setDeleteScrapBtn] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${Api.GetScrapByUserID}/${user._id}`)
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
                        const response = await axios.delete(`${Api.DeleteScrapProductById}/${productId}`);
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
    };

    const converintoDate = (date) => {
        const createdAt = new Date(date);
        const formattedCreatedAt = createdAt.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return formattedCreatedAt;
    }

    const handleScrapDetais = (product) => {
        navigate('/userscrapdetails', { state: product });
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
                [...Array(12)].map((_, index) => (
                    <div className='w-screen h-auto p-4 grid grid-flow-col grid-cols-4'>
                        <Skeleton key={index} />
                    </div>
                ))
            ) : error ? (
                <p>Error: {error}</p>
            ) : userProductList.length === 0 ? (
                <div className='w-screen bg-white h-screen flex justify-center'><h3 className='mt-11 text-center font-oswald font-medium'>No scrap products available.</h3></div>
            ) : (<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 sm:gap-3 gap-4 p-5 place-items-center '>{
                userProductList.map((product) => (
                    <>
                        <SlCard className="card-overview">
                            <img
                                className='h-[300px] w-[340px] object-contain'
                                slot="image"
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            <strong>{product.title}</strong>
                            <br />
                            <strong className='text-lg font-semibold'>Yur Price : {product.price}  /- Rs</strong>
                            <br />
                            <p className='line-clamp-2'>{product.description}</p>
                            <br />
                            <div>
                                <small>{converintoDate(product.createdAt)}</small>
                                <button disabled={isDeleteLoading} onClick={() => { handleDeleteProduct(product._id) }} className='text-xl float-right btn btn-outline btn-warning'  >{isDeleteLoading ? <SlSpinner /> : <RiDeleteBin6Line />}</button>
                            </div>
                            <div slot="footer">
                                <SlButton variant="primary" pill onClick={() => { handleScrapDetais(product) }}>
                                    More Info
                                </SlButton>
                                <SlBadge variant="danger" pill>
                                    <p className='p-2 font-semibold font-oswald'>{product.status}</p>
                                </SlBadge>
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
