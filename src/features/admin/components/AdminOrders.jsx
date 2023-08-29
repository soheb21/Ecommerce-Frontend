import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITEMS_PER_PAGE } from '../../../app/constant';
import Pagination from '../../common/Pagination';
import { fetchOrdersAsync, selectOrders, selectTotalOrders, updateOrderStatusAsync } from '../../order/orderSlice';

const AdminOrders = () => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
   
    const totalOrders = useSelector(selectTotalOrders)
    const [editableOrderId, setEditableOrderId] = useState(-1)


    const handlePage = (page) => {
        setPage(page)
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchOrdersAsync(pagination))
    }
    const handleStatus = (e, data) => {
        const newStatus = { ...data, status: e.target.value }
        dispatch(updateOrderStatusAsync(newStatus))
        setEditableOrderId(-1)


    }
  
    const handleEdit = (item) => {
        setEditableOrderId(item.id)
    }
    const chooseColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-pink-200 text-purple-600";
            case "Dispatched":
                return "bg-purple-200 text-purple-600";
            case "Shipped":
                return "bg-yellow-200 text-purple-600";
            case "Delivered":
                return "bg-green-200 text-purple-600";
            case "Cancel":
                return "bg-red-200 text-white";

            default:
                return "bg-pink-200 text-purple-600";
        }
    }
    const orders = useSelector(selectOrders)

    useEffect(() => {
        handlePage()
    }, [dispatch, handlePage, editableOrderId,selectOrders])
    return (
        <>
            {/* component */}
            <div className="overflow-x-auto">
                <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-full ">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-pink-200 text-pink-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Order no</th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-center">Total Amount</th>
                                        <th className="py-3 px-6 text-center">Shipping Address</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {
                                        orders && orders.map(order => <tr className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">

                                                    <span className="font-medium">#{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.items[0].map(item => <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.product.thumbnail}
                                                        />
                                                    </div>
                                                    <span>{item.product.title} - {item.quantity}</span>
                                                </div>)}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    <p>₹{order.totalAmount}</p>

                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    <p>{order.getAddress[0].streetAddress} {order.getAddress[0].city} </p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">

                                                {/* {order.status} */}




                                                {
                                                    order.id === editableOrderId ? (
                                                        <select onChange={(e) => handleStatus(e, order)} >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Dispatched">Dispatched</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Cancel">Cancel</option>
                                                        </select>

                                                    ) : (
                                                        <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-sm`}>
                                                            {order.status}
                                                        </span>
                                                    )
                                                }



                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                           
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            onClick={e => handleEdit(order)}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>)
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination handlePage={handlePage} page={page} setPage={setPage} totalItems={totalOrders} />

            </div>
        </>

    )
}

export default AdminOrders