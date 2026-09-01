import React, { useState, useMemo } from 'react';
import { Search, Info, ChevronRight, ChevronDown, AlertCircle, CheckCircle, XCircle, Filter, BookOpen, Database, Globe, Layers } from 'lucide-react';
import { metadataMappings } from './data/metadataMappings';

const MetadataCrosswalkExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMapping, setSelectedMapping] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // table, cards, flow
  const [expandedCategories, setExpandedCategories] = useState(new Set(['Title Elements']));
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(metadataMappings.map(m => m.category))];
    return cats;
  }, []);

  // Filter mappings
  const filteredMappings = useMemo(() => {
    let filtered = metadataMappings;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.ogd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.dublinCore.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.dcat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(m => m.status === statusFilter);
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(m => m.level.includes(levelFilter));
    }

    return filtered;
  }, [selectedCategory, searchTerm, statusFilter, levelFilter]);

  // Group by category
  const groupedMappings = useMemo(() => {
    const grouped = {};
    filteredMappings.forEach(mapping => {
      if (!grouped[mapping.category]) {
        grouped[mapping.category] = [];
      }
      grouped[mapping.category].push(mapping);
    });
    return grouped;
  }, [filteredMappings]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'exact': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ambiguous': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'problematic': return <XCircle className="w-4 h-4 text-orange-500" />;
      case 'gap': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'unmappable': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'partial': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'catalog': return 'bg-blue-100 text-blue-800';
      case 'dataset': return 'bg-green-100 text-green-800';
      case 'distribution': return 'bg-purple-100 text-purple-800';
      case 'catalog/dataset': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'exact': return 'bg-green-50 text-green-700 border-green-200';
      case 'ambiguous': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'problematic': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'gap': return 'bg-red-50 text-red-700 border-red-200';
      case 'unmappable': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'partial': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layers className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Metadata Crosswalk Explorer</h1>
                <p className="text-sm text-gray-600 mt-1">OGD → Dublin Core → DCAT v3 Mapping Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredMappings.length} mappings
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search metadata fields..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="exact">✓ Exact Match</option>
              <option value="ambiguous">⚠ Ambiguous</option>
              <option value="problematic">⚠ Problematic</option>
              <option value="gap">✗ Gap</option>
              <option value="unmappable">✗ Unmappable</option>
              <option value="partial">◑ Partial</option>
            </select>

            {/* Level Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="catalog">📚 Catalog</option>
              <option value="dataset">📊 Dataset</option>
              <option value="distribution">📁 Distribution</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setViewMode('table')}
              >
                Table
              </button>
              <button
                className={`px-3 py-1 rounded ${viewMode === 'cards' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setViewMode('cards')}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {viewMode === 'table' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {Object.entries(groupedMappings).map(([category, mappings]) => (
              <div key={category} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-6 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center space-x-3">
                    {expandedCategories.has(category) ?
                      <ChevronDown className="w-4 h-4 text-gray-500" /> :
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    }
                    <span className="font-semibold text-gray-700">{category}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {mappings.length} fields
                    </span>
                  </div>
                </button>

                {expandedCategories.has(category) && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            OGD
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            AI Kosh
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dublin Core
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DCAT v3
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mappings.map((mapping) => (
                          <tr key={mapping.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                {mapping.ogd}
                              </code>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {mapping.aikosh}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <code className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                                {mapping.dublinCore}
                              </code>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <code className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">
                                {mapping.dcat}
                              </code>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelBadge(mapping.level)}`}>
                                {mapping.level}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(mapping.status)}
                                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(mapping.status)}`}>
                                  {mapping.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedMapping(mapping)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Details →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMappings.map((mapping) => (
              <div
                key={mapping.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMapping(mapping)}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {mapping.category}
                  </span>
                  {getStatusIcon(mapping.status)}
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">OGD:</span>
                    <code className="block text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded mt-1">
                      {mapping.ogd}
                    </code>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500">Maps to:</span>
                    <code className="block text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded mt-1">
                      {mapping.dcat}
                    </code>
                  </div>
                </div>

                <div className={`mt-3 text-xs px-2 py-1 rounded-full border inline-block ${getStatusColor(mapping.status)}`}>
                  {mapping.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMapping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMapping.category}</h2>
                  <p className="text-sm text-gray-600 mt-1">Metadata Field Mapping Details</p>
                </div>
                <button
                  onClick={() => setSelectedMapping(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Mapping Flow */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Mapping Flow</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <Database className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs text-gray-500">OGD</span>
                      <code className="block text-sm mt-1 text-blue-700 font-mono">
                        {selectedMapping.ogd}
                      </code>
                    </div>
                  </div>

                  <div className="text-center">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs text-gray-500">AI Kosh</span>
                      <div className="text-sm mt-1 font-medium">
                        {selectedMapping.aikosh}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs text-gray-500">Dublin Core</span>
                      <code className="block text-xs mt-1 text-green-700 font-mono">
                        {selectedMapping.dublinCore}
                      </code>
                    </div>
                  </div>

                  <div className="text-center">
                    <Layers className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <span className="text-xs text-gray-500">DCAT v3</span>
                      <code className="block text-xs mt-1 text-purple-700 font-mono">
                        {selectedMapping.dcat}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Level */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Applies To</h3>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {selectedMapping.level}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Analysis Notes</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{selectedMapping.notes}</p>
                </div>
              </div>

              {/* Recommendation */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">NIC Action Required</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{selectedMapping.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding the Mappings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Status Legend */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Mapping Status</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm"><strong>Exact:</strong> Perfect semantic match</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm"><strong>Ambiguous:</strong> Unclear semantic intent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm"><strong>Problematic:</strong> Structural mismatch</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm"><strong>Gap:</strong> Field missing in OGD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm"><strong>Unmappable:</strong> No equivalent in standards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm"><strong>Partial:</strong> Limited mapping available</span>
                </div>
              </div>
            </div>

            {/* Key Challenges */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Key Challenges</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Subject classification requires 3 OGD fields → 1 Dublin Core field</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Format info at wrong level (dataset vs distribution)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Complex organizational attribution lost in Dublin Core</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Missing language metadata for multilingual context</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Distribution metadata requires separate entities per format</span>
                </li>
              </ul>
            </div>

            {/* Recommendations Summary */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Priority Actions</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Standardize date formats to ISO 8601</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Separate distributions by format</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Add language metadata field</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Implement qualified attribution for DCAT</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Restructure distribution metadata as separate entities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Mapping Analysis Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {metadataMappings.filter(m => m.status === 'exact').length}
              </div>
              <div className="text-sm opacity-90">Exact Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {metadataMappings.filter(m => m.status === 'ambiguous').length}
              </div>
              <div className="text-sm opacity-90">Ambiguous</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {metadataMappings.filter(m => m.status === 'problematic').length}
              </div>
              <div className="text-sm opacity-90">Problematic</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {metadataMappings.filter(m => m.status === 'gap').length}
              </div>
              <div className="text-sm opacity-90">Gaps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {metadataMappings.filter(m => m.status === 'unmappable').length}
              </div>
              <div className="text-sm opacity-90">Unmappable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataCrosswalkExplorer;