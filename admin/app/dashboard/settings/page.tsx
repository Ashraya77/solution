export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Store Settings</h1>
      
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
          <input type="text" defaultValue="Computer Course Shop" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
          <input type="email" defaultValue="admin@courseshop.com" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold text-gray-800 mb-2">Payout Settings</h3>
          <p className="text-sm text-gray-500 mb-4">Connect your Stripe account to receive payments.</p>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">Connect Stripe</button>
        </div>

        <div className="pt-6">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}