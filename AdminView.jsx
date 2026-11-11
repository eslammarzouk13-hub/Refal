import React, { useState } from 'react';

export default function AdminView({ products, setProducts, orders, setOrders, setView }) {
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'عطور', price: '', image: '', desc: '', stock: 10
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    };
    setProducts([productToAdd, ...products]);
    setNewProduct({ name: '', category: 'عطور', price: '', image: '', desc: '', stock: 10 });
    alert('تم إضافة المنتج بنجاح!');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-8">
      <div className="border border-black p-6 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">لوحة تحكم الأدمن (Rifal Admin)</h2>
          <p className="text-xs text-gray-600">تحكم كامل بالمنتجات والطلبات في مصر.</p>
        </div>
        <button onClick={() => setView('customer')} className="border border-black px-4 py-2 text-xs font-bold bg-white">
          العودة لواجهة المتجر
        </button>
      </div>

      <div className="border border-black p-6 bg-white">
        <h3 className="font-black text-lg mb-4 border-b border-black pb-2">إضافة عطر أو مكياج جديد</h3>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div><label className="block text-xs font-bold mb-1">الاسم</label><input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full border border-black p-2 text-xs" /></div>
          <div>
            <label className="block text-xs font-bold mb-1">القسم</label>
            <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full border border-black p-2 text-xs bg-white">
              <option value="عطور">عطور</option>
              <option value="مكياج">مكياج</option>
            </select>
          </div>
          <div><label className="block text-xs font-bold mb-1">السعر (ج.م)</label><input type="number" required value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full border border-black p-2 text-xs" /></div>
          <div><label className="block text-xs font-bold mb-1">رابط الصورة (URL)</label><input type="text" required value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className="w-full border border-black p-2 text-xs" /></div>
          <div><label className="block text-xs font-bold mb-1">المخزن</label><input type="number" required value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full border border-black p-2 text-xs" /></div>
          <div><label className="block text-xs font-bold mb-1">الوصف</label><input type="text" required value={newProduct.desc} onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })} className="w-full border border-black p-2 text-xs" /></div>
          <div className="sm:col-span-2 md:col-span-3"><button type="submit" className="w-full bg-black text-white py-2 font-bold text-xs">إضافة المنتج</button></div>
        </form>
      </div>

      <div className="border border-black p-6 bg-white">
        <h3 className="font-black text-lg mb-4 border-b border-black pb-2">إدارة المنتجات ({products.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="border border-black p-3 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover border border-black" />
                <div><h4 className="font-bold text-xs">{p.name}</h4><span className="text-[10px] text-gray-500">{p.price} ج.م</span></div>
              </div>
              <button onClick={() => deleteProduct(p.id)} className="border border-black bg-white px-2 py-1 text-xs font-bold">حذف</button>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-black p-6 bg-white">
        <h3 className="font-black text-lg mb-4 border-b border-black pb-2">متابعة الطلبات ({orders.length})</h3>
        {orders.length === 0 ? <p className="text-gray-500 text-xs text-center py-6">لا توجد طلبات.</p> : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-black p-4 bg-gray-50 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-black pb-2">
                  <span className="font-black">{order.id} - هاتف: {order.userPhone}</span>
                  <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="border border-black p-1 bg-white font-bold">
                    <option value="1. قيد المراجعة">1. قيد المراجعة</option>
                    <option value="2. جاري التجهيز">2. جاري التجهيز</option>
                    <option value="3. تم الشحن">3. تم الشحن</option>
                    <option value="4. تم التسليم">4. تم التسليم</option>
                  </select>
                </div>
                <p><strong>العنوان:</strong> {order.gov} - {order.address} | <strong>الإجمالي:</strong> {order.total} ج.م</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
