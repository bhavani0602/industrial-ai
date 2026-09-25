"use client";

import { useState } from "react";
import { Settings, User, Bell, Shield, Database } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function SettingsPage() {
  const { profileName, setProfileName, avatarUrl, setAvatarUrl } = useUser();
  
  const [inputName, setInputName] = useState(profileName);
  const [inputEmail, setInputEmail] = useState("bhavani@predictai.com");
  const [activeTab, setActiveTab] = useState("Profile");

  const initials = profileName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  const handleSave = () => {
    setProfileName(inputName);
    alert("Profile settings saved successfully to the database!");
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
          <Settings className="h-6 w-6 text-blue-600" />
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500">Manage your account and application preferences.</p>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
        <div className="flex border-b border-zinc-100">
          <button onClick={() => setActiveTab("Profile")} className={`flex-1 py-4 text-sm font-bold ${activeTab === 'Profile' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'} transition-colors`}>Profile</button>
          <button onClick={() => setActiveTab("Notifications")} className={`flex-1 py-4 text-sm font-bold ${activeTab === 'Notifications' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'} transition-colors`}>Notifications</button>
          <button onClick={() => setActiveTab("Security")} className={`flex-1 py-4 text-sm font-bold ${activeTab === 'Security' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'} transition-colors`}>Security</button>
          <button onClick={() => setActiveTab("Database")} className={`flex-1 py-4 text-sm font-bold ${activeTab === 'Database' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'} transition-colors`}>Database</button>
        </div>
        
        <div className="p-8 space-y-6">
          {activeTab === "Profile" && (
            <>
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md overflow-hidden relative">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="object-cover w-full h-full" />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">{profileName}</h3>
                  <p className="text-sm text-zinc-500">Operations Team Lead</p>
                  
                  <label className="mt-2 inline-block rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer">
                    Change Avatar
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setAvatarUrl(event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4 border-t border-zinc-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Full Name</label>
                  <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Email Address</label>
                  <input type="email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Role</label>
                  <input type="text" defaultValue="Administrator" disabled className="w-full rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Timezone</label>
                  <select className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white">
                    <option>Asia/Kolkata (IST)</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab !== "Profile" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">{activeTab} Settings</h3>
              <p className="mt-1 text-sm text-zinc-500 max-w-sm">
                These settings are part of the core infrastructure and will be fully integrated during Phase 2.
              </p>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3 border-t border-zinc-100 mt-6">
            <button 
              onClick={() => {}}
              className="rounded-lg border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
