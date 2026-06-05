import { Flame, Leaf, Fish, Cake, Coffee } from "lucide-react";

interface Dish {
  name: string;
  desc: string;
  price: string;
  icon: typeof Flame;
  color: string;
}

const categories: { title: string; dishes: Dish[] }[] = [
  {
    title: "Starters",
    dishes: [
      { name: "Samboosa Trio", desc: "Crispy golden pastry filled with spiced potato & peas, minced lamb keema, and creamy paneer fillings. Served with mint chutney & tamarind sauce.", price: "₹280", icon: Leaf, color: "text-emerald-600 bg-emerald-50" },
      { name: "Punjabi Chole Chaat", desc: "Tangy chickpea & potato chaat with yogurt, tamarind chutney, sev, and onions. Topped with pomegranate and fresh coriander.", price: "₹220", icon: Leaf, color: "text-amber-600 bg-amber-50" },
      { name: "Paneer Tikka", desc: "Soft paneer cubes marinated in yogurt, spices & herbs, grilled to perfection. Served with mint chutney, onions & lemon.", price: "₹320", icon: Flame, color: "text-rose-600 bg-rose-50" },
    ],
  },
  {
    title: "Main Course",
    dishes: [
      { name: "Mutton Rogan Josh", desc: "Tender mutton slow-cooked in aromatic Kashmiri gravy with fennel, ginger & whole spices. Served with fragrant jeera rice.", price: "₹650", icon: Flame, color: "text-rose-600 bg-rose-50" },
      { name: "Mixed Grill Platter", desc: "Assortment of Chicken Malai Tikka, Lamb Seekh Kebab & Tandoori Prawns. Served with laccha paratha, mint chutney & salad.", price: "₹680", icon: Flame, color: "text-orange-600 bg-orange-50" },
      { name: "Goan Fish & Prawn Curry Combo", desc: "Grilled prawns & fish fillets in coconut-cashew gravy, served with steamed rice & lemon wedges.", price: "₹720", icon: Fish, color: "text-sky-600 bg-sky-50" },
      { name: "Vegetable Biryani", desc: "Fragrant basmati rice cooked with seasonal vegetables, saffron, whole spices & herbs. Served with raita & mirchi ka salan.", price: "₹380", icon: Leaf, color: "text-emerald-600 bg-emerald-50" },
    ],
  },

  {
    title: "Desserts",
    dishes: [
      { name: "Warm Gulab Jamun with Rabri", desc: "Soft & juicy gulab jamuns soaked in sugar syrup, served warm with thickened saffron rabri.", price: "₹240", icon: Cake, color: "text-amber-600 bg-amber-50" },
      { name: "Mixed Indian Mithai Platter", desc: "Assortment of moist Motichoor Ladoo, Kaju Katli & Besan Barfi.", price: "₹260", icon: Cake, color: "text-yellow-600 bg-yellow-50" },
      { name: "Masala Chai & Gulab Jamun", desc: "Aromatic masala chai with cardamom & ginger, paired with one warm gulab jamun.", price: "₹180", icon: Coffee, color: "text-amber-700 bg-amber-50" },
    ],
  },
];
export default function Menu() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
        <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">Our Menu</span>
        <h1 className="text-4xl font-bold text-stone-900 mt-2">Crafted with love</h1>
        <p className="text-stone-500 mt-3 max-w-xl mx-auto">From family recipes to modern favorites — every dish is a celebration of flavor.</p>
      </div>

      <div className="space-y-14">
        {categories.map((cat) => (
          <section key={cat.title}>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-stone-900">{cat.title}</h2>
              <div className="flex-1 h-px bg-stone-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.dishes.map((d) => (
                <div key={d.name} className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-lg transition flex gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${d.color}`}>
                    <d.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-stone-900">{d.name}</h3>
                      <span className="text-amber-700 font-bold whitespace-nowrap">{d.price}</span>
                    </div>
                    <p className="text-sm text-stone-500 mt-1 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
