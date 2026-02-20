"use client";
import { couponDummyData } from "@/assets/assets";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";


export default function AdminCoupons() {
      const [coupons, setCoupons] = useState(couponDummyData);
      const [newCoupon, setNewCoupon] = useState({
            code: '',
            description: '',
            discount: '',
            forNewUser: false,
            forMember: false,
            isPublic: false,
            expiresAt: new Date()
      });

      const handleAddCoupon = (e) => {
            e.preventDefault();
            // logic to add coupon
      };

      const deleteCoupon = (code) => {
            // logic to delete coupon
      };

      const handleChange = (e) => setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });


      return (
            <div className="text-slate-500 mb-40">

                  {/* Add Coupon */}
                  <form onSubmit={(e) => toast.promise(handleAddCoupon(e), { loading: "Adding coupon..." })} className="max-w-sm text-sm">
                        <h2 className="text-2xl">Add <span className="text-slate-800 font-medium">Coupons</span></h2>
                        <div className="flex gap-2 max-sm:flex-col mt-2">
                              <input
                                    type="text"
                                    name="code"
                                    value={newCoupon.code}
                                    onChange={handleChange}
                                    placeholder="Coupon Code"
                                    className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
                                    required
                              />
                              <input
                                    type="number"
                                    name="discount"
                                    min={1}
                                    max={100}
                                    value={newCoupon.discount}
                                    onChange={handleChange}
                                    placeholder="Coupon Discount (%)"
                                    className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
                                    required
                              />
                        </div>
                        <input
                              type="text"
                              name="description"
                              value={newCoupon.description}
                              onChange={handleChange}
                              placeholder="Coupon Description"
                              className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md"
                              required
                        />

                        <label>
                              <p className="mt-3">Coupon Expiry Date</p>
                              <input
                                    type="date"
                                    name="expiresAt"
                                    value={format(newCoupon.expiresAt, 'yyyy-MM-dd')} onChange={handleChange}
                                    placeholder="Coupon Expires At"
                                    className="w-full mt-1 p-2 border border-slate-200 outline-slate-400 rounded-md"
                              />
                        </label>

                        <div className="mt-5">
                              <div className="flex gap-2 mt-3">
                                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                          <input
                                                type="checkbox"
                                                name="forNewUser"
                                                className="sr-only peer"
                                                checked={newCoupon.forNewUser}
                                                onChange={(e) => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })}
                                          />
                                          <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                                          <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                    </label>
                                    <p>For New User</p>
                              </div>
                              <div className="flex gap-2 mt-3">
                                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                          <input
                                                type="checkbox"
                                                name="forMember"
                                                className="sr-only peer"
                                                checked={newCoupon.forMember}
                                                onChange={(e) => setNewCoupon({ ...newCoupon, forMember: e.target.checked })}
                                          />
                                          <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                                          <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                    </label>
                                    <p>For Member</p>
                              </div>
                        </div>
                        <button className="mt-4 p-2 px-10 rounded bg-slate-700 text-white active:scale-95 transition">Add Coupon</button>
                  </form>

                  {/* List Coupons */}
                  <div className="mt-14">
                        <h2 className="text-2xl">List <span className="text-slate-800 font-medium">Coupons</span></h2>
                        <div className="overflow-x-auto mt-4 rounded-lg border border-slate-200 max-w-4xl">
                              <table className="min-w-full bg-white text-sm">
                                    <thead className="bg-slate-50">
                                          <tr>
                                                <th className="py-3 px-4 text-left font-semibold text-slate-600">Code</th>
                                                <th className="py-3 px-4 text-left font-semibold text-slate-600">Description</th>
                                                <th className="py-3 px-4 text-left font-semibold text-slate-600">Discount</th>
                                                <th className="py-3 px-4 text-left font-semibold text-slate-600">Expires At</th>
                                                <th className="py-3 px-4 text-left font-semibold text-slate-600">New User</th>
                                                <th className="py-3 px-4 text-left font-semibold text-slate-600">For Member</th>
                                                <th className="py-3 px-4 text-left font-semibold text-slate-600">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                          {coupons.map((coupon) => (
                                                <tr key={coupon.code} className="hover:bg-slate-50">
                                                      <td className="py-3 px-4 font-medium text-slate-800">{coupon.code}</td>
                                                      <td className="py-3 px-4 text-slate-800">{coupon.description}</td>
                                                      <td className="py-3 px-4 text-slate-800">{coupon.discount}%</td>
                                                      <td className="py-3 px-4 text-slate-800">{format(coupon.expiresAt, 'yyyy-MM-dd')}</td>
                                                      <td className="py-3 px-4 text-slate-800">{coupon.forNewUser ? 'Yes' : 'No'}</td>
                                                      <td className="py-3 px-4 text-slate-800">{coupon.forMember ? 'Yes' : 'No'}</td>
                                                      <td className="py-3 px-4 text-slate-800">
                                                            <DeleteIcon
                                                                  onClick={() => toast.promise(deleteCoupon(coupon.code), { loading: "Deleting coupon..." })} className="w-5 h-5 text-red-500 hover:text-red-800 cursor-pointer" />
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      )
}