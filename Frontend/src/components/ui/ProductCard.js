import SlRating from '@shoelace-style/shoelace/dist/react/rating';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategory } from '../../redux-config/CategorySlice';
import { getProduct } from "../../redux-config/ProductSlice";
import AddToCart from './AddToCart';

const ProductCard = () => {
    const { productList, isLoading, error } = useSelector((store) => store.product);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
        dispatch(getCategory())
    }, []);

    const handleClick = (product) => {
        navigate('/productdetails', { state: product });
    };

    if (!productList) return null;

    const productDetails = productList.slice(0, 16);

    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) {
            return 0;
        }
        const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
        const average = (totalRating / (ratings.length * 5)) * 5;
        return average;
    };

    return (
        <>
            {productDetails.map((product, index) => (
                <div key={index} className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <div onClick={() => handleClick(product)} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to="#">
                        <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={product.thumbnail} alt="product thumbnail" />
                        <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src={product.images[0]} alt="product image" />
                        <svg className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                    </div>
                    <div className="mt-4 px-5 pb-5">
                        <Link to="#">
                            <h5 className="text-xl font-oswald tracking-tight text-slate-900">{product.productName}</h5>
                        </Link>
                        <div className="mt-2 mb-5 flex items-center justify-between">
                            <p>
                                <span className="text-2xl font-oswald font-bold text-slate-900">Rs {product.price}/- Only</span>
                                <span className="text-sm font-oswald text-slate-900 line-through">Rs {product.price + 102.23}  /- Only</span>
                            </p>
                        </div>
                        <div className='w-full p-3'>
                            <SlRating label="Rating" precision={0.5} value={calculateAverageRating(product.rating)} />
                        </div>

                        <AddToCart margin={"ml-0"} productId={product._id} />
                        
                        <button className='ml-0 mt-3 w-full font-oswald flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'>Buy Now</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ProductCard;
