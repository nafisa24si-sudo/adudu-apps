import { useState, useMemo } from "react";
import { Search, Filter, Globe, User, ExternalLink } from "lucide-react"; // Install lucide-react dulu
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  

  // Menggunakan useMemo untuk efisiensi filter data
  const filteredFrameworks = useMemo(() => {
    const _searchTerm = searchTerm.toLowerCase();
    return frameworkData.filter((framework) => {
      const matchesSearch =
        framework.name.toLowerCase().includes(_searchTerm) ||
        framework.description.toLowerCase().includes(_searchTerm);

      const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  // Mengambil unique tags
  const allTags = useMemo(() => {
    return [...new Set(frameworkData.flatMap((f) => f.tags))];
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Framework Explorer</h1>
          <p className="text-gray-500">Temukan teknologi terbaik untuk proyek Anda berikutnya.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search framework name or description..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer"
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">All Categories</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrameworks.length > 0 ? (
            filteredFrameworks.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h2>
                    <span className="p-1.5 bg-indigo-50 rounded-lg">
                      <Globe className="w-4 h-4 text-indigo-600" />
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center text-xs text-gray-400 mb-4">
                    <User className="w-3 h-3 mr-1" />
                    <span>{item.details.developer}</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.details.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2 px-4 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors gap-2"
                  >
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-lg">No frameworks found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}