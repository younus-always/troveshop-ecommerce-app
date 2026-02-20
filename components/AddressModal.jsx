"use client";
import { useState } from "react";
import { XIcon } from "lucide-react";


export default function AddressModal() {
      const [address, setAddress] = useState({
            name: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            phone: ''
      });

      const handleAddressChange = (e) => {
            setAddress({
                  ...address,
                  [e.target.name]: e.target.value
            });
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            setShowAddressModal(false);
      };

      return (
            <form onSubmit={e =>
                  toast.promise(handleSubmit(e),
                        { loading: 'Adding Address...' })}
                  className="fixed inset-0 z-50 bg-white/60 backdrop-blur h-screen flex items-center justify-center">
                  <div className="flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-6">
                        <h2 className="text-3xl ">Add New <span className="font-semibold">Address</span></h2>
                        <input
                              type="text"
                              name="name"
                              placeholder="Enter your name"
                              value={address.name}
                              onChange={handleAddressChange}
                              className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                              required />
                        <input
                              type="email"
                              name="email"
                              placeholder="Email address"
                              value={address.email}
                              onChange={handleAddressChange}
                              className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                              required />
                        <input
                              type="text"
                              name="street"
                              placeholder="Street"
                              value={address.street}
                              onChange={handleAddressChange}
                              className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                              required />
                        <div className="flex gap-4">
                              <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={address.city}
                                    onChange={handleAddressChange}
                                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                                    required />
                              <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                                    value={address.state}
                                    onChange={handleAddressChange}
                                    required />
                        </div>
                        <div className="flex gap-4">
                              <input
                                    type="number"
                                    name="zip"
                                    placeholder="Zip code"
                                    value={address.zip}
                                    onChange={handleAddressChange}
                                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                                    required />
                              <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={address.country}
                                    onChange={handleAddressChange}
                                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                                    required />
                        </div>
                        <input
                              type="text"
                              name="phone"
                              placeholder="Phone"
                              value={address.phone}
                              onChange={handleAddressChange}
                              className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                              required />
                        <button className="bg-slate-800 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-900 active:scale-95 transition-all">SAVE ADDRESS</button>
                  </div>
                  <XIcon
                        size={30}
                        onClick={() => setShowAddressModal(false)}
                        className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer"
                  />
            </form>
      )
}