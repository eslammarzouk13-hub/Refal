import React, { useState } from 'react';
import CustomerView from './components/CustomerView';
import AdminView from './components/AdminView';

const initialProducts = [
  {
    id: 1,
    name: "عطر العود الملكي الفاخر",
    category: "عطور",
    price: 850,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop&q=80",
    desc: "عطر شرقي مركز يدوم طويلاً، زجاجة 100 مل.",
    stock: 15
  },
  {
    id: 2,
    name: "عطر لورە الفرنسي",
    category: "عطور",
    price: 950,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=80",
    desc: "نفحات فرنسية ساحرة تناسب المناسبات الخاصة.",
    stock: 10
  },
  {
    id: 3,
    name: "مسك الطهارة الأصلي",
    category: "عطور",
    price: 350,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80",
    desc: "مسك أبيض مركز وعالي الجودة للجسم.",
    stock: 25
  },
  {
    id: 4,
    name: "باليت ظلال عيون مات",
    category: "مكياج",
    price: 450,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=80",
    desc: "ألوان ثابتة وعالية الصبغة تناسب جميع الأوقات.",
    stock: 20
  },
  {
    id: 5,
    name: "أحمر شفاه ثابت (مات)",
    category: "مكياج",
    price: 220,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=80",
    desc: "تركيبة مقاومة للماء تدوم طوال اليوم.",
    stock: 30
  },
  {
    id: 6,
    name: "ماسكارا تكثيف الرموش",
    category: "مكياج",
    price: 290,
    image: "https://images.unsplash.com/photo-1631730486784-544ab6305378?w=500&auto=format&fit=crop&q=80",
    desc: "تكثيف وتطويل فوري بدون تكتل.",
    stock: 18
  }
];

export default function App() {
  const [view, setView] = useState('customer');
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({ phone: '01012345678' });

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateCartQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans select-none pb-12" dir="rtl">
      <header className="border-b border-black sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 onClick={() => setView('customer')} className="text-2xl font-black tracking-wider cursor-pointer uppercase">
            R I F A L <span className="text-xs font-normal border border-black px-1">مصر</span>
          </h1>
          <div className="text-xs font-bold">
            {view === 'customer' ? '🛍️ واجهة العميل' : '⚙️ لوحة الإدارة'}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'customer' ? (
          <CustomerView 
            products={products} 
            cart={cart} 
            addToCart={addToCart} 
            updateCartQty={updateCartQty} 
            user={user} 
            setView={setView} 
            orders={orders} 
            setOrders={setOrders} 
          />
        ) : (
          <AdminView 
            products={products} 
            setProducts={setProducts} 
            orders={orders} 
            setOrders={setOrders} 
            setView={setView} 
          />
        )}
      </main>
    </div>
  );
}
