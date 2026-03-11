"use client";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addAddress } from "@/lib/features/address/addressSlice";
import toast from "react-hot-toast";

export default function AddressModal() {
      const { getToken } = useAuth();
      const dispatch = useDispatch();
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

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const token = await getToken();
                  const { data } = await axios.post(
                        "/api/address",
                        { address },
                        { headers: { Authorization: `Bearer ${token}` } }
                  );
                  dispatch(addAddress(data.newAddress));
                  toast.success(data.message);
                  setShowAddressModal(false);
            } catch (err) {
                  console.error(err);
                  toast.error(err?.response?.data?.message || err.message);
            }
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