import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemFromCartAsync, selectItems, updateCartFromItemAsync } from './cartSlice';


export default function Cart() {
    const dispatch = useDispatch()
    const items = useSelector(selectItems)

    // console.log("items:",items[0])
    const totalAmount = items.reduce((amount, item) => item.product.price * item.quantity + amount, 0)
    const totalItem = items.reduce((total, item) => item.quantity + total, 0)
    const updateQty = (e, item) => {
        //spread the item and update the quantity
        dispatch(updateCartFromItemAsync({ id: item.id, quantity: +e.target.value }))

    }
    const deleteItem = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }
    return (


        <>

            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                        Cart
                    </h1>
                    <div className="flow-root">
                        {
                            items.length > 0 ?
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {items && items.map((item) => (
                                        <li key={item.product.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.product.thumbnail}
                                                    alt={item.product.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.product.href}>{item.product.title}</a>
                                                        </h3>
                                                        <p className="ml-4">₹{item.product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.product.brand}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-gray-500">
                                                        <label
                                                            htmlFor="quantity"
                                                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Qty
                                                        </label>
                                                        <select onChange={(e) => updateQty(e, item)} value={item.quantity}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>

                                                    <div className="flex">
                                                        <button
                                                            onClick={(e) => deleteItem(e, item.id)}
                                                            type="button"
                                                            className="font-medium text-pink-600 hover:text-pink-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <p>Cart is empty</p>
                        }
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Totol Items in Cart</p>
                        <p>{totalItem} item</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">

                        <Link
                            to={"/checkout"}
                            className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or
                            <Link to="/">
                                <button
                                    type="button"
                                    className="ml-2 font-medium text-pink-600 hover:text-pink-500"
                                    onClick={() => setOpen(false)}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
}
