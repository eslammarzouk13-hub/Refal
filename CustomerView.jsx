import React, { useState } from 'react';

const egyptianGovernorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", 
  "الغربية", "القليوبية", "المنوفية", "البحيرة", "كفر الشيخ", 
  "أسيوط", "سوهاج", "قنا", "أسوان", "الأقصر", "البحر الأحمر"
];

export default function CustomerView({ 
  products, cart, addToCart, updateCartQty, user, setView, orders, setOrders 
}) {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedGov, setSelectedGov] = useState('القاهرة');
  const [addressDetails, setAddressDetails] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [vodafoneNumber, setVodafoneNumber] = useState('');
  
  const [customerSubView, setCustomerSubView] = useState('store');
  
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [step, setStep] = useState(1);

  const filteredProducts = activeCategory === 'الكل' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneInput.length < 10) {
      alert('الرجاء إدخال رقم هاتف مصري صحيح');
      return;
    }
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput === '1234' || otpInput.length === 4) {
      setCustomerSubView('store');
    } else {
      alert('رمز التحقق غير صحيح (استخدم 1234 للتجربة)');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: 'RFL-EG-' + Math.floor(1000 + Math.random() * 9000),
      userPhone: user ? user.phone : '01000000000',
      items: [...cart],
      total: totalCartPrice + 50,
      gov: selectedGov,
      address: addressDetails,
      payment: paymentMethod,
      status: '1. قيد المراجعة',
      date: new Date().toLocaleDateString('ar-EG')
    };

    setOrders([newOrder, ...orders]);
    alert('تم إرسال طلبك بنجاح! رقم الطلب: ' + newOrder.id);
    setCustomerSubView('orders');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b border-black pb-4">
        <div className="flex gap-4 text-sm font-bold">
          <button onClick={() => setCustomerSubView('store')} className={customerSubView === 'store' ? 'underline' : ''}>المتجر</button>
          <button onClick={() => setCustomerSubView('cart')} className={customerSubView === 'cart' ? 'underline' : ''}>السلة ({cart.length})</button>
          {user && <button onClick={() => setCustomerSubView('orders')} className={customerSubView === 'orders' ? 'underline' : ''}>طلباتي</button>}
        </div>
        <div>
          <button 
            onClick={() => setView('admin')} 
            className="text-xs border border-black px-3 py-1.5 font-bold hover:bg-black hover:text-white transition"
          >
            ⚙️ الانتقال لوحة الإدارة (Admin)
          </button>
        </div>
      </div>

      {customerSubView === 'store' && (
        <div>
          <div className="border border-black p-8 mb-8 text-center bg-gray-50">
            <h2 className="text-3xl font-black mb-2">رِفال | عطور ومكياج في مصر</h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              اكتشف تشكيلتنا الحصرية من أجمل البرفانات ومستحضرات التجميل الأصلية.
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {['الكل', 'عطور', 'مكياج'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs font-bold border border-black transition ${
                    activeCategory === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="border border-black flex flex-col bg-white group">
                <div className="h-64 overflow-hidden bg-gray-100 relative border-b border-black">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 font-bold">
                    {product.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.desc}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-black">{product.price} ج.م</span>
                      <span className="text-xs text-gray-500">مخزن: {product.stock}</span>
                    </div>
                    <button onClick={() => addToCart(product)} className="w-full bg-black text-white py-2 text-xs font-bold hover:bg-gray-800 transition">
                      إضافة إلى السلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {customerSubView === 'cart' && (
        <div className="max-w-2xl mx-auto border border-black p-6 bg-white">
          <h2 className="text-2xl font-black mb-6 border-b border-black pb-3">سلة الشراء</h2>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">السلة فارغة حالياً.</p>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border border-black" />
                      <div>
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <span className="text-xs text-gray-500">{item.price} ج.م</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateCartQty(item.id, -1)} className="border border-black px-2 py-1 font-bold">-</button>
                      <span className="text-sm font-bold">{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="border border-black px-2 py-1 font-bold">+</button>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCheckout} className="border-t border-black pt-6 space-y-4">
                <h3 className="font-bold text-md">بيانات الشحن داخل مصر</h3>
                <div>
                  <label className="block text-xs font-bold mb-1">المحافظة</label>
                  <select value={selectedGov} onChange={(e) => setSelectedGov(e.target.value)} className="w-full border border-black p-2 text-sm bg-white">
                    {egyptianGovernorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">العنوان التفصيلي</label>
                  <input type="text" required placeholder="مثال: شارع الهرم، عمارة 14" value={addressDetails} onChange={(e) => setAddressDetails(e.target.value)} className="w-full border border-black p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">طريقة الدفع</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setPaymentMethod('cod')} className={`p-2 text-xs font-bold border border-black ${paymentMethod === 'cod' ? 'bg-black text-white' : 'bg-white'}`}>الدفع عند الاستلام</button>
                    <button type="button" onClick={() => setPaymentMethod('vodafone')} className={`p-2 text-xs font-bold border border-black ${paymentMethod === 'vodafone' ? 'bg-black text-white' : 'bg-white'}`}>فودافون كاش</button>
                  </div>
                </div>
                {paymentMethod === 'vodafone' && (
                  <div className="p-3 bg-gray-50 border border-black text-xs space-y-2">
                    <p className="font-bold">تحويل المبلغ إلى فودافون كاش: <strong>01012345678</strong></p>
                    <input type="text" placeholder="رقم هاتفك المحول منه" value={vodafoneNumber} onChange={(e) => setVodafoneNumber(e.target.value)} className="w-full border border-black p-2 bg-white" required />
                  </div>
                )}
                <div className="border border-black p-4 bg-gray-50 space-y-2 text-sm">
                  <div className="flex justify-between"><span>الإجمالي:</span><span>{totalCartPrice} ج.م</span></div>
                  <div className="flex justify-between"><span>الشحن:</span><span>50 ج.م</span></div>
                  <div className="flex justify-between font-black text-lg border-t border-black pt-2"><span>النهائي:</span><span>{totalCartPrice + 50} ج.م</span></div>
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 font-bold text-sm">تأكيد الطلب</button>
              </form>
            </div>
          )}
        </div>
      )}

      {customerSubView === 'orders' && (
        <div className="max-w-3xl mx-auto border border-black p-6 bg-white">
          <h2 className="text-2xl font-black mb-6 border-b border-black pb-3">طلباتي السابقة</h2>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">لا توجد طلبات مسجلة.</p>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="border border-black p-4 bg-gray-50 space-y-2 text-xs">
                  <div className="flex justify-between font-black border-b border-black pb-2">
                    <span>{order.id}</span>
                    <span className="bg-black text-white px-2 py-1">{order.status}</span>
                  </div>
                  <p><strong>العنوان:</strong> {order.gov} - {order.address}</p>
                  <p><strong>الإجمالي:</strong> {order.total} ج.م</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
