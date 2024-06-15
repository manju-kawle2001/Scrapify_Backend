import { Table } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../redux-config/CategorySlice";
import { getProduct } from "../../redux-config/ProductSlice";
import { getScrapCategorySlice } from "../../redux-config/ScrapCategory";

export default function ProductDetails() {
  const { productList, isLoading, error } = useSelector((store) => store.product);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());
    dispatch(getScrapCategorySlice());
  }, []);

  const handleClick = (item) => {
    navigate('/adminproductview', { state: item })
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && productList && productList.length === 0 && <p>No scrap lead available right now.</p>}
      {
        !isLoading && productList && productList.length > 0 && (
          <div className="mt-2 overflow-x-auto ">
            <Table>
              <Table.Head className="sticky top-0">
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>Product Name</Table.HeadCell>
                <Table.HeadCell>Product Price</Table.HeadCell>
                <Table.HeadCell>Stock Quantity</Table.HeadCell>
                <Table.HeadCell>Product Category</Table.HeadCell>
                <Table.HeadCell>Product Image</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {productList.map((item, index) => (
                  <Table.Row key={item._id} className="border-gray-700 bg-gray-800">
                    <Table.Cell className=" font-medium text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{item.productName}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{item.category}</Table.Cell>
                    <Table.Cell><img src={item.thumbnail} className="h-14 w-11 rounded-md" /></Table.Cell>
                    <Table.Cell>
                      <button onClick={() => handleClick(item)} className="font-medium hover:underline text-cyan-500">
                        View Details
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )
      }
    </>

  );
}
