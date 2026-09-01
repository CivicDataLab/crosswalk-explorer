export const metadataMappings = [
  // Title Elements
  {
    id: 1,
    category: 'Title Elements',
    ogd: 'title',
    aikosh: 'Dataset Name',
    dublinCore: 'dc:title / dcterms:title',
    dcat: 'dcterms:title',
    level: 'catalog/dataset/distribution',
    status: 'exact',
    notes: 'Direct mapping with exact semantic match',
    recommendation: 'No changes needed'
  },
  {
    id: 2,
    category: 'Title Elements',
    ogd: '(absent)',
    aikosh: 'Short Description',
    dublinCore: 'dcterms:alternative / dcterms:abstract',
    dcat: 'dcterms:alternative / dcterms:abstract',
    level: 'dataset',
    status: 'gap',
    notes: 'OGD lacks alternative title field. AIKosh uses Short Description',
    recommendation: 'Add alternative title/abstract field to OGD for consistency'
  },

  // Creator/Publisher/Contributor
  {
    id: 3,
    category: 'Attribution',
    ogd: 'cdos_state_ministry / field_ministry_department',
    aikosh: 'Creator',
    dublinCore: 'dc:creator / dcterms:creator',
    dcat: 'dcterms:creator / prov:qualifiedAttribution',
    level: 'dataset / catalog',
    status: 'ambiguous',
    notes: 'Ambiguous because OGD uses cdos_state_ministry to represent what might be either a creator or publisher. Sometimes represents data creator, sometimes ministry-department responsible for publishing',
    recommendation: 'Retain mapping but clarify semantic intent. Make optional field with free text values'
  },
  {
    id: 4,
    category: 'Attribution',
    ogd: 'ministry_department / state_department / cdos_state_ministry',
    aikosh: 'Author',
    dublinCore: 'dc:publisher / dcterms:publisher',
    dcat: 'dcterms:publisher / prov:qualifiedAttribution',
    level: 'catalog / dataset',
    status: 'problematic',
    notes: 'OGD structure with separate fields creates redundancy in Dublin Core. Challenge: Dublin Core cannot maintain hierarchical relationship between ministry and department without additional structure',
    recommendation: 'Modify publisher field to accept array: ["Ministry of Earth", "Forest and Climate Change", "CPCB", "Legal Cell"]'
  },
  {
    id: 5,
    category: 'Attribution',
    ogd: 'cdos_state_ministry / field_ministry_department ',
    aikosh: 'Contributor',
    dublinCore: 'dc:contributor / dcterms:contributor',
    dcat: 'dcterms:contributor / prov:qualifiedAttribution',
    level: 'dataset / catalog',
    status: 'gap',
    notes: 'OGD lacks explicit contributor fields for external entities',
    recommendation: 'Add optional contributor field for external organizations'
  },

  // Subject Classification
  {
    id: 6,
    category: 'Subject Classification',
    ogd: 'keyword / keywords',
    aikosh: 'Tags',
    dublinCore: 'dc:subject / dcterms:subject',
    dcat: 'dcat:keyword',
    level: 'catalog/dataset',
    status: 'problematic',
    notes: 'Free-text tags like "Agricultural Marketing"',
    recommendation: 'Keep keyword, sector, sector_resource as separate fields; concatenate as compound word for Dublin Core: agriculture-agricultural_marketing-cotton_prices'
  },
  {
    id: 7,
    category: 'Subject Classification',
    ogd: 'sector / field_sector',
    aikosh: 'Sector',
    dublinCore: 'dc:subject / dcterms:subject',
    dcat: 'dcat:theme',
    level: 'catalog/dataset',
    status: 'problematic',
    notes: 'Controlled vocabulary from 36 predefined sectors like "Agriculture". DCAT separates themes (controlled) from keywords (free text). Dublin Core loses this distinction',
    recommendation: 'Use dcat:theme for controlled vocabulary. Deprecate "All" option; require explicit sector selection'
  },
  {
    id: 8,
    category: 'Subject Classification',
    ogd: 'sector_resource',
    aikosh: 'Sector',
    dublinCore: 'dc:subject / dcterms:subject',
    dcat: 'dcat:theme',
    level: 'dataset',
    status: 'problematic',
    notes: 'Additional sector classification at resource level.',
    recommendation: 'Deprecate "All" option; require explicit selection from a dropdown.'
  },

  // Description
  {
    id: 9,
    category: 'Description',
    ogd: 'body',
    aikosh: 'Long Description',
    dublinCore: 'dc:description / dcterms:description',
    dcat: 'dcterms:description',
    level: 'catalog',
    status: 'exact',
    notes: 'Closest equivalent according to semantic map. Present at catalog level only.',
    recommendation: 'Standardize nomenclature to match description instead of body. Add description to resource (dataset) too.'
  },
  // {
  //   id: 10,
  //   category: 'Description',
  //   ogd: '(absent)',
  //   aikosh: 'Short Description',
  //   dublinCore: 'dcterms:abstract',
  //   dcat: 'dcterms:abstract',
  //   level: 'dataset',
  //   status: 'gap',
  //   notes: 'OGD lacks dedicated abstract field',
  //   recommendation: 'Add abstract field for dataset summaries'
  // },

  // Date Elements
  {
    id: 11,
    category: 'Dates',
    ogd: 'created',
    aikosh: '(absent)',
    dublinCore: 'dcterms:created',
    dcat: 'dcterms:created',
    level: 'dataset',
    status: 'exact',
    notes: 'Direct mapping but format inconsistent (D/M/YYYY)',
    recommendation: 'Standardize to DD-MM-YYYY or ISO 8601'
  },
  {
    id: 12,
    category: 'Dates',
    ogd: 'published / published_date',
    aikosh: 'Published on',
    dublinCore: 'dcterms:issued',
    dcat: 'dcterms:issued',
    level: 'dataset',
    status: 'exact',
    notes: 'Semantic alignment exact but format inconsistent (D/M/YYYY).',
    recommendation: 'Standardize date format to DD-MM-YYYY or ISO 8601'
  },
  {
    id: 13,
    category: 'Dates',
    ogd: 'changed',
    aikosh: 'Updated On',
    dublinCore: 'dcterms:modified',
    dcat: 'dcterms:modified',
    level: 'dataset',
    status: 'exact',
    notes: 'Direct mapping but format inconsistent (D/M/YYYY).',
    recommendation: 'Standardize date format to DD-MM-YYYY or ISO 8601'
  },
  {
    id: 14,
    category: 'Dates',
    ogd: 'Duration of Date',
    aikosh: 'Start Date / End Date',
    dublinCore: 'dcterms:temporal',
    dcat: 'dcterms:temporal with dcat:startDate/endDate',
    level: 'dataset',
    status: 'problematic',
    notes: 'Date ranges handled differently. DCAT provides structured approach',
    recommendation: 'Use DCAT structured format with explicit start/end dates'
  },

  // Format and Type
  {
    id: 15,
    category: 'Format & Type',
    ogd: 'file_format',
    aikosh: 'Format',
    dublinCore: 'dc:format / dcterms:format',
    dcat: 'dcat:mediaType (Distribution level)',
    level: 'dataset',
    status: 'problematic',
    notes: 'OGD stores at dataset level; should be at distribution level',
    recommendation: 'Move to distribution level; create separate distributions per format'
  },
  {
    id: 16,
    category: 'Format & Type',
    ogd: 'resource_category',
    aikosh: 'Dataset Type',
    dublinCore: 'dc:type / dcterms:type',
    dcat: 'dcterms:type',
    level: 'dataset',
    status: 'ambiguous',
    notes: 'Dataset/Application distinction',
    recommendation: 'Use controlled vocabulary. More useful for AIKosh. May explore deprecating from OGD.'
  },

  // Identifiers
  {
    id: 17,
    category: 'Identifiers',
    ogd: 'domain + node_alias (URL of the dataset on the OGD platform)',
    aikosh: '(no equivalent)',
    dublinCore: 'dc:identifier / dcterms:identifier / foaf: homePage',
    dcat: 'dcterms:identifier / dcat:landingPage / dcat:accessURL / foaf: homePage',
    level: 'catalog/dataset',
    status: 'problematic',
    notes: 'Same URL used for multiple purposes; DCAT separates these concepts. Identifier can be S3 bucket id for dataset.',
    recommendation: 'Separate identifier, landing page, and access URLs'
  },
  {
    id: 48,
    category: 'Identifiers',
    ogd: 'field_reference_url',
    aikosh: '(no equivalent)',
    dublinCore: 'dcterms:source',
    dcat: 'dcterms:source',
    level: 'dataset',
    status: 'exact',
    notes: 'Direct match; useful for indicating original sources or datasets derived from others. Reference URL of Resource displayed on the dataset page',
    recommendation: 'Retain this metadata term. Update metadata field in the database itself.'
  },


  // Coverage
  {
    id: 18,
    category: 'Coverage',
    ogd: 'domain (inferred from domain) / Asset Jurisdiction / field_asset_jurisdiction',
    aikosh: 'Geographical Coverage',
    dublinCore: 'dcterms:spatial',
    dcat: 'dcterms:spatial',
    level: 'catalog / dataset',
    status: 'problematic',
    notes: 'Cannot capture hierarchical Indian administrative divisions',
    recommendation: 'Use array structure for hierarchies: ["Maharashtra", "Pune"]. Change nomenclature to match DCAT fields.'
  },
  {
    id: 19,
    category: 'Language',
    ogd: '(absent)',
    aikosh: '(absent)',
    dublinCore: 'dc:language / dcterms:language',
    dcat: 'dcterms:language',
    level: 'catalog/dataset',
    status: 'gap',
    notes: 'Critical gap for multilingual Indian context.language field is present in another non-public facing internal website of data.gov.in',
    recommendation: 'Add language metadata using ISO 639 codes'
  },

  // Rights and Licensing
  {
    id: 20,
    category: 'India Extension',
    ogd: 'Released Under / (Copyright information on the landing page of data.gov.in)',
    aikosh: '(no equivalent)',
    dublinCore: 'dc:rights / dcterms:rights / dcterms:RightsStatement',
    dcat: 'dcatin:applicableLegislation',
    level: 'catalog/dataset',
    status: 'ambiguous',
    notes: 'Usually "NDSAP". Dublin Core conflates license with rights. Can add Copyright info too.',
    recommendation: 'Use controlled vocabulary for legislation references.For Dublin Core dcterms:RightsStatement is the most appropriate.'
  },
  {
    id: 21,
    category: 'Rights & Licensing',
    ogd: '(implicit GODL)',
    aikosh: 'License',
    dublinCore: 'dcterms:license',
    dcat: 'dcterms:license',
    level: 'catalog/dataset',
    status: 'gap',
    notes: 'License rarely made explicit. It is on the data.gov.in landing page.',
    recommendation: 'Need controlled vocabulary for licensing agreements (CC 4.0, MIT, AGPL, GODL, etc.)'
  },
  {
    id: 22,
    category: 'Rights & Licensing',
    ogd: 'Access Type',
    aikosh: 'Visibility',
    dublinCore: 'dcterms:accessRights',
    dcat: 'dcterms:accessRights',
    level: 'dataset',
    status: 'exact',
    notes: 'Open/Registered/Restricted classification',
    recommendation: 'No changes needed. May explore replacing Access Type with Access Rights.'
  },

  // System-specific fields
  {
    id: 23,
    category: 'System Metadata',
    ogd: 'ogdp_view_count',
    aikosh: 'View Count',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'Statistical/boolean values not supported in standards',
    recommendation: 'Move to analytics system or create extension'
  },


  // Distribution-Level Mappings (New Section)
  {
    id: 25,
    category: 'Distribution Access',
    ogd: 'datafile',
    aikosh: 'Download URL',
    dublinCore: 'dcterms:relation',
    dcat: 'dcat:downloadURL',
    level: 'distribution',
    status: 'exact',
    notes: 'Direct download links map to downloadURL at distribution level',
    recommendation: 'Migrate from dataset to distribution level metadata'
  },
  {
    id: 26,
    category: 'Distribution Access',
    ogd: 'datafile_url (API)',
    aikosh: '(no equivalent)',
    dublinCore: 'dcterms:relation',
    dcat: 'dcat:endpointURL',
    level: 'distribution',
    status: 'exact',
    notes: 'API endpoints require separate DataService entity with documentation',
    recommendation: 'Create DataService entities for API access with proper documentation'
  },
  {
    id: 51,
    category: 'Distribution Access',
    ogd: '(no equivalent)',
    aikosh: '(no equivalent)',
    dublinCore: 'dc:description',
    dcat: 'dcat:endpointDescription',
    level: 'distribution',
    status: 'gap',
    notes: 'A description of the services available via the end-points, including their operations, parameters etc.',
    recommendation: 'Create DataService entities for API access with proper d'
  },

  {
    id: 52,
    category: 'Distribution Access',
    ogd: 'domain+node_alias',
    aikosh: '(no equivalent)',
    dublinCore: 'dcterms:identifier',
    dcat: 'dcat:landingpage',
    level: 'distribution',
    status: 'gap',
    notes: 'A landingpage of the distribution if the user has to navigate to a separate webpage to access the dataset.',
    recommendation: 'Add for datasets downloadable by link (large scale datasets eg. Kissan Call Center)'
  },

  {
    id: 27,
    category: 'Distribution Format',
    ogd: 'file_format',
    aikosh: 'File Format',
    dublinCore: 'dcterms:format',
    dcat: 'dcat:mediaType',
    level: 'distribution',
    status: 'problematic',
    notes: 'Format stored at dataset level in OGD; should be distribution-specific using IANA media types',
    recommendation: 'Move to distribution level; use IANA media types (text/csv, application/json)'
  },
  {
    id: 28,
    category: 'Distribution Format',
    ogd: 'file_size',
    aikosh: '(floppy icon symbol)',
    dublinCore: 'dcterms:extent',
    dcat: 'dcat:byteSize',
    level: 'distribution',
    status: 'exact',
    notes: 'File size in bytes maps directly at distribution level',
    recommendation: 'Migrate to distribution metadata; approximate when precise size unknown'
  },
  {
    id: 29,
    category: 'Distribution Structure',
    ogd: '(multiple formats in single field)',
    aikosh: '(multiple formats)',
    dublinCore: '(cannot represent properly)',
    dcat: 'Separate Distribution entities',
    level: 'distribution',
    status: 'problematic',
    notes: 'OGD lists "CSV/XML/JSON" in single field; DCAT requires separate distribution per format',
    recommendation: 'Create separate distribution entity for each format with own metadata'
  },
  {
    id: 30,
    category: 'Distribution Rights',
    ogd: 'Access Type (dataset level)',
    aikosh: 'Access Rights',
    dublinCore: 'dcterms:accessRights',
    dcat: 'dcterms:accessRights (distribution level)',
    level: 'distribution',
    status: 'ambiguous',
    notes: 'Access restrictions may vary by distribution format/method',
    recommendation: 'Consider distribution-specific access controls where applicable'
  },
  {
    id: 31,
    category: 'Distribution Identification',
    ogd: 'domain+node_alias (reused)',
    aikosh: 'Resource URL',
    dublinCore: 'dcterms:identifier',
    dcat: 'dcat:accessURL',
    level: 'distribution',
    status: 'problematic',
    notes: 'Same URL pattern used for identification, landing page, and access - needs separation',
    recommendation: 'Distinguish between dataset identifier, landing page, and distribution access URLs'
  },
  {
    id: 32,
    category: 'Distribution Metadata',
    ogd: 'field_resource_type',
    aikosh: 'Resource Type',
    dublinCore: '(moves to distribution)',
    dcat: 'dcterms:type',
    level: 'distribution',
    status: 'ambiguous',
    notes: 'Resource type classification at distribution level for different access methods',
    recommendation: 'Use controlled vocabulary; replace numerical values with descriptive strings'
  },

  // Additional Statistical/Boolean Metadata (Unmappable to DCAT)
  {
    id: 33,
    category: 'System Metadata',
    ogd: 'ogdp_download_count',
    aikosh: 'Download Count',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'Download statistics - boolean/numerical values not supported in Dublin Core or DCAT standards',
    recommendation: 'Move to analytics system or create extension properties'
  },
  {
    id: 34,
    category: 'System Metadata',
    ogd: 'is_visualized',
    aikosh: 'Visualization Flag',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'Boolean flag for visualization availability - not accommodated in document-centric metadata models',
    recommendation: 'Deprecate from core metadata or implement as extension property'
  },
  {
    id: 35,
    category: 'System Metadata',
    ogd: 'is_rated',
    aikosh: 'Rating Flag',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'Boolean flag for rating capability - system-specific functionality not in standards',
    recommendation: 'Deprecate from core metadata or move to system-specific extensions'
  },
  {
    id: 36,
    category: 'System Metadata',
    ogd: 'field_from_api / from_api',
    aikosh: '(no equivalent)',
    dublinCore: 'dcterms:relation',
    dcat: 'dcterms:relation',
    level: 'catalog/dataset',
    status: 'partial',
    notes: 'Boolean for dataset sourced from API.',
    recommendation: 'Deprecate from core metadata or move to system-specific extensions'
  },
  {
    id: 50,
    category: 'System Metadata',
    ogd: 'field_resource_type',
    aikosh: '(no equivalent)',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'Used for resource type 1/2/3/4/5',
    recommendation: 'Deprecate from core metadata or move to system-specific extensions. Or add string type instead of integers.'
  },
  {
    id: 37,
    category: 'System Metadata',
    ogd: 'api_request_count',
    aikosh: '(absent)',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'API usage statistics - numerical analytics data not part of metadata standards',
    recommendation: 'Move to separate analytics/monitoring system'
  },
  {
    id: 53,
    category: 'System Metadata',
    ogd: 'external_api_reference',
    aikosh: '(absent)',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'External api reference - numerical analytics data not part of metadata standards',
    recommendation: 'Move to separate analytics/monitoring system'
  },
  {
    id: 54,
    category: 'System Metadata',
    ogd: 'is_api_available',
    aikosh: '(absent)',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'Boolean value - numerical analytics data not part of metadata standards',
    recommendation: 'Move to separate analytics/monitoring system'
  },
  {
    id: 55,
    category: 'System Metadata',
    ogd: 'field_show_export',
    aikosh: '(absent)',
    dublinCore: '(no equivalent)',
    dcat: '(no equivalent)',
    level: 'dataset',
    status: 'unmappable',
    notes: 'Boolean value - numerical analytics data not part of metadata standards',
    recommendation: 'Move to separate analytics/monitoring system'
  },

  // Dublin Core Relationships (largely absent in OGD)
  {
    id: 38,
    category: 'Relationships',
    ogd: '(absent)',
    aikosh: '(absent)',
    dublinCore: 'dcterms:hasPart / dcterms:isPartOf',
    dcat: 'dcterms:hasPart / dcterms:isPartOf',
    level: 'catalog/dataset',
    status: 'gap',
    notes: 'OGD lacks explicit relationship metadata for composite datasets (or catalogs)',
    recommendation: 'Add relationship fields for consolidating/bifurcating datasets (or catalogs) and maintaining semantic meaning'
  },
  {
    id: 39,
    category: 'Relationships',
    ogd: '(absent)',
    aikosh: '(absent)',
    dublinCore: 'dcterms:hasVersion / dcterms:isVersionOf',
    dcat: 'dcterms:hasVersion / dcterms:isVersionOf',
    level: 'dataset',
    status: 'gap',
    notes: 'Version relationships for dataset (or catalog) evolution tracking',
    recommendation: 'Implement version tracking with proper relationship metadata'
  },
  {
    id: 40,
    category: 'Relationships',
    ogd: '(absent)',
    aikosh: '(absent)',
    dublinCore: 'dcterms:replaces / dcterms:isReplacedBy',
    dcat: 'dcterms:replaces / dcterms:isReplacedBy',
    level: 'dataset',
    status: 'gap',
    notes: 'Replacement relationships for superseded datasets',
    recommendation: 'Add replacement tracking for dataset lifecycle management'
  },
  {
    id: 41,
    category: 'Relationships',
    ogd: '(absent)',
    aikosh: '(absent)',
    dublinCore: 'dcterms:references / dcterms:isReferencedBy',
    dcat: 'dcterms:references / dcterms:isReferencedBy',
    level: 'dataset',
    status: 'gap',
    notes: 'Reference relationships for linked resources',
    recommendation: 'Implement cross-references between related datasets and resources.'
  },

  // License with Controlled Vocabulary
  // {
  //   id: 42,
  //   category: 'Rights & Licensing',
  //   ogd: '(controlled vocabulary needed)',
  //   aikosh: 'License Type',
  //   dublinCore: 'dcterms:license',
  //   dcat: 'dcterms:license',
  //   level: 'dataset',
  //   status: 'gap',
  //   notes: 'Need controlled vocabulary for licensing agreements (CC 4.0, MIT, AGPL, GODL, etc.)',
  //   recommendation: 'Implement controlled vocabulary to accommodate licensing agreements across platforms (AIKosh, Bharat Data Platform etc.)'
  // },

  // Missing Group Field from PDF
  {
    id: 43,
    category: 'Subject Classification',
    ogd: 'group',
    aikosh: '(no equivalent)',
    dublinCore: 'dc:subject / dcterms:subject',
    dcat: 'dcat:subject',
    level: 'catalog',
    status: 'gap',
    notes: 'Catalog-level grouping in OGD maps to DCAT subject property, distinct from themes and keywords',
    recommendation: 'Direct mapping - no changes needed semantically.'
  },

  // DCAT India Extensions
  {
    id: 24,
    category: 'India Extensions',
    ogd: 'high_value_dataset / field_high_value_dataset',
    aikosh: 'HVD Flag',
    dublinCore: 'dcterms:hvdCategory',
    dcat: 'dcatin:hvdCategory',
    level: 'catalog / dataset',
    status: 'partial',
    notes: 'Boolean in OGD; DCAT-AP uses categories. Extend for India',
    recommendation: 'Define HVD criteria and categories for India'
  },
  {
    id: 44,
    category: 'India Extensions',
    ogd: 'field_ds_govt_type / govt_type',
    aikosh: '(no equivalent)',
    dublinCore: 'dcterms:jurisdiction',
    dcat: 'dcatin:jurisdictionLevel',
    level: 'catalog/dataset',
    status: 'exact',
    notes: 'India-specific extension to capture complex federal structure (Central/State/District/Block/Panchayat)',
    recommendation: 'Use controlled vocabulary for government levels - backward compatible structure'
  },
  {
    id: 45,
    category: 'India Extensions',
    ogd: 'note',
    aikosh: '(no equivaent)',
    dublinCore: 'dcterms:note',
    dcat: 'dcatin:note',
    level: 'dataset',
    status: 'gap',
    notes: 'India-specific extension to capture note at dataset level.',
    recommendation: 'Use free text to capture note type metadata.'
  },

  // Frequency and Granularity fields mentioned in PDF
  {
    id: 46,
    category: 'Temporal Properties',
    ogd: 'frequency',
    aikosh: 'Frequency',
    dublinCore: 'dcterms:accrualPeriodictiy',
    dcat: 'dct:accrualPeriodicity',
    level: 'dataset',
    status: 'exact',
    notes: 'Update frequency maps directly, DCAT prefers controlled vocabulary from EU frequency vocabulary',
    recommendation: 'Use controlled vocabulary for consistency with international standards'
  },
  {
    id: 47,
    category: 'Temporal Properties',
    ogd: 'granularity',
    aikosh: 'Time Granularity',
    dublinCore: 'Coverage',
    dcat: 'dcat:temporalResolution',
    level: 'dataset',
    status: 'exact',
    notes: 'Temporal granularity (hourly, daily, monthly) maps to DCAT temporal resolution property',
    recommendation: 'Direct mapping - useful for time series datasets'
  },
  // Thumbnail
  {
    id: 49,
    category: 'Identifiers',
    ogd: '(no equivalent)',
    aikosh: 'Image URL',
    dublinCore: 'foaf:depiction',
    dcat: 'foaf:depiction',
    level: 'dataset',
    status: 'exact',
    notes: 'Semantic match with foaf type metadata.',
    recommendation: 'Retain this metadata term. Use correct metadata term.'
  },

];
