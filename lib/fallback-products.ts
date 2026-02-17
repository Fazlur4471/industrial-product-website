import type { Product } from './types'

export const fallbackProducts: Product[] = [
  {
    id: '1',
    slug: 'industrial-steel-plate',
    name: 'Industrial Steel Plate',
    category: 'trading',
    description: 'High-quality steel plates for construction and industrial applications',
    longDescription:
      'Premium grade steel plates manufactured to international standards. Suitable for heavy-duty construction, machinery manufacturing, and structural applications. Available in various thicknesses and grades.',
    images: [
      '/images/steel-plate.jpg',
      '/images/pump-product.jpg',
    ],
    specs: {
      'Thickness': '5-50mm',
      'Width': '1000-2500mm',
      'Length': '2000-6000mm',
      'Grade': 'A36/ST37',
    },
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    slug: 'industrial-pipe',
    name: 'Industrial Pipe Systems',
    category: 'trading',
    description: 'Durable piping solutions for industrial applications',
    longDescription:
      'Comprehensive range of industrial pipes including carbon steel, stainless steel, and alloy pipes. Designed for high-pressure applications, chemical transport, and structural support. ISO certified manufacturing.',
    images: [
      '/images/industrial-pipes.jpg',
    ],
    specs: {
      'Diameter': '10mm-1000mm',
      'Material': 'Carbon Steel, Stainless Steel',
      'Pressure Rating': 'Up to 500 bar',
      'Length': 'Custom',
    },
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    slug: 'aluminum-ingots',
    name: 'Aluminum Ingots',
    category: 'trading',
    description: 'Premium aluminum ingots for manufacturing',
    longDescription:
      'High-purity aluminum ingots suitable for automotive, aerospace, and consumer electronics manufacturing. Certified quality with full traceability and documentation.',
    images: [
      '/images/aluminum-ingots.jpg',
    ],
    specs: {
      'Purity': '99.7% minimum',
      'Size': '25kg ingots',
      'Grade': 'A95',
      'Certification': 'ISO 9001',
    },
    inStock: true,
    featured: false,
  },
  {
    id: '4',
    slug: 'copper-rods',
    name: 'Copper Rods',
    category: 'trading',
    description: 'High-conductivity copper rods for electrical applications',
    longDescription:
      'Electrolytic copper rods with excellent conductivity and malleability. Ideal for electrical equipment, power distribution, and telecommunications infrastructure.',
    images: [
      '/images/copper-rods.jpg',
    ],
    specs: {
      'Diameter': '10mm-50mm',
      'Purity': '99.99%',
      'Conductivity': 'IACS 100%',
      'Length': '1-6 meters',
    },
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    slug: 'cnc-turning-services',
    name: 'CNC Turning Services',
    category: 'manufacturing',
    description: 'Precision CNC turning and machining services',
    longDescription:
      'State-of-the-art CNC turning facilities with tight tolerance capabilities. Production-ready components for automotive, aerospace, and industrial sectors. Quick turnaround with quality assurance.',
    images: [
      '/images/cnc-machine.jpg',
    ],
    specs: {
      'Max Diameter': '200mm',
      'Max Length': '500mm',
      'Tolerance': '±0.05mm',
      'Materials': 'Steel, Aluminum, Brass',
    },
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    slug: 'welding-fabrication',
    name: 'Welding & Fabrication',
    category: 'manufacturing',
    description: 'Professional welding and metal fabrication services',
    longDescription:
      'Complete welding solutions including MIG, TIG, and arc welding. Custom fabrication for structures, frames, and industrial equipment. Certified welders and full inspection services.',
    images: [
      '/images/welding.jpg',
    ],
    specs: {
      'Welding Types': 'MIG, TIG, ARC',
      'Max Structure Size': '5m x 3m x 3m',
      'Material': 'All ferrous metals',
      'Certification': 'ISO 3834',
    },
    inStock: true,
    featured: false,
  },
  {
    id: '7',
    slug: 'metal-stamping',
    name: 'Metal Stamping',
    category: 'manufacturing',
    description: 'High-volume metal stamping and pressing services',
    longDescription:
      'Advanced stamping technology for high-volume production runs. Capable of producing complex shapes with tight tolerances. Competitive pricing for large batches.',
    images: [
      '/images/metal-stamping.jpg',
    ],
    specs: {
      'Press Capacity': 'Up to 100 tons',
      'Max Part Size': '400mm x 300mm',
      'Materials': 'Steel, Aluminum, Copper',
      'Min Order': '1000 units',
    },
    inStock: true,
    featured: true,
  },
  {
    id: '8',
    slug: 'heat-treatment',
    name: 'Heat Treatment Services',
    category: 'manufacturing',
    description: 'Professional heat treatment for metal components',
    longDescription:
      'Specialized heat treatment services including hardening, tempering, and annealing. Controlled atmosphere furnaces for precise temperature management and quality control.',
    images: [
      '/images/heat-treatment.jpg',
    ],
    specs: {
      'Max Temp': '1200°C',
      'Furnace Size': '2m x 1m x 1m',
      'Cycle Time': '24-48 hours',
      'Quality Control': 'Full testing reports',
    },
    inStock: true,
    featured: false,
  },
]
