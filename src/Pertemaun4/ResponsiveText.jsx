import React from "react";
import { Monitor, Smartphone, Tablet, Layout } from "lucide-react"; // Opsional: Install lucide-react

export default function ResponsiveText() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Tailwind Responsive Demo
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Coba lakukan <span className="font-semibold text-indigo-600">zoom in/out</span> atau ubah ukuran layar browser Anda untuk melihat keajaiban <span className="italic font-serif">breakpoints</span> bekerja secara real-time.
          </p>
        </section>

        <div className="grid gap-8">
          <ResponsiveWidth />
          <ResponsiveLayout />
        </div>
      </div>
    </div>
  );
}

function ResponsiveWidth() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Smartphone size={20} />
        </div>
        <h2 className="text-xl font-bold">Flexbox Responsiveness</h2>
      </div>

      <div className="space-y-4 text-slate-600 text-sm md:text-base mb-8">
        <p className="flex items-start gap-2">
          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono font-bold text-xs">md:flex-row</span>
          <span>Akan sejajar horizontal di layar tablet ke atas, dan vertikal di mobile.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono font-bold text-xs">md:w-1/2</span>
          <span>Membagi lebar tepat 50% saat mencapai breakpoint 768px.</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 overflow-hidden rounded-2xl font-medium text-white">
        <div className="bg-gradient-to-br from-rose-400 to-rose-500 w-full md:w-1/2 p-8 flex items-center justify-center shadow-inner">
          Kolom 1
        </div>
        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 w-full md:w-1/2 p-8 flex items-center justify-center shadow-inner">
          Kolom 2
        </div>
      </div>
    </div>
  );
}

function ResponsiveLayout() {
  const boxes = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
          <Layout size={20} />
        </div>
        <h2 className="text-xl font-bold">Grid System Adaptive</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm mb-8 bg-slate-50 p-4 rounded-2xl">
        <div className="flex flex-col">
          <span className="font-bold text-slate-400 uppercase tracking-tighter">Mobile</span>
          <span className="text-purple-600">1 Column</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-400 uppercase tracking-tighter">Small</span>
          <span className="text-purple-600 font-semibold">2 Cols (sm:)</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-400 uppercase tracking-tighter">Medium</span>
          <span className="text-purple-600 font-semibold">3 Cols (md:)</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-400 uppercase tracking-tighter">Desktop</span>
          <span className="text-purple-600 font-semibold">4 Cols (lg:)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boxes.map((i) => (
          <div
            key={i}
            className="group bg-white border-2 border-slate-100 p-6 rounded-2xl text-center transition-all hover:border-purple-200 hover:bg-purple-50"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center text-slate-400 group-hover:bg-purple-200 group-hover:text-purple-600 transition-colors">
              {i}
            </div>
            <p className="font-bold text-slate-700">Box {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}