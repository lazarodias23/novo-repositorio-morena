import { Model, Category, Club, ServiceType } from './types';

export const HOUSE_PHOTOS = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1571508601891-ca5c7a71ad5f?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=1200'
];

export const QUALITY_SEALS = [
  { id: '1', name: 'Curadoria Elite', description: 'Seleção rigorosa de cada perfil do nosso catálogo.', icon: 'Award' },
  { id: '2', name: 'Sigilo Absoluto', description: 'Protocolos de segurança e discrição nível bancário.', icon: 'Lock' },
  { id: '3', name: 'Perfil Verificado', description: 'Fotos 100% reais validadas pela nossa equipe.', icon: 'ShieldCheck' },
  { id: '4', name: 'Atendimento VIP', description: 'Concierge dedicado disponível 24 horas por dia.', icon: 'Users' }
];

const OFFICIAL_WHATSAPP = '5551996554609';

export const MODELS: Model[] = [
  {
    id: '1',
    name: 'Valentina Rossi',
    age: 23,
    category: Category.DIAMOND,
    height: '1.72m',
    weight: '58kg',
    hair: 'Morena',
    location: 'Cachoeira do Sul - RS',
    // Fix: Changed 'Central' to 'Cachoeira do Sul' to match Region type
    region: 'Cachoeira do Sul',
    city: 'Cachoeira do Sul',
    price: 'R$ 1.500/h',
    description: 'Elegância e sofisticação definem Valentina. Uma companhia perfeita para jantares de negócios, eventos sociais e momentos íntimos inesquecíveis.',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=80&w=1200'
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
    whatsapp: OFFICIAL_WHATSAPP,
    verified: true,
    services: [ServiceType.INCALL, ServiceType.DINNER, ServiceType.EVENTS]
  },
  {
    id: 'reg-1',
    name: 'Camila Silva',
    age: 22,
    category: Category.GOLD,
    height: '1.70m',
    weight: '60kg',
    hair: 'Morena',
    location: 'Cachoeira do Sul - RS',
    // Fix: Changed 'Central' to 'Cachoeira do Sul' to match Region type
    region: 'Cachoeira do Sul',
    city: 'Cachoeira do Sul',
    price: 'R$ 600/h',
    description: 'Beleza gaúcha autêntica em Cachoeira do Sul. Atendimento carinhoso e momentos de prazer garantidos.',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200'
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200',
    whatsapp: OFFICIAL_WHATSAPP,
    verified: true,
    services: [ServiceType.INCALL, ServiceType.OUTCALL]
  },
  {
    id: 'reg-2',
    name: 'Letícia Weber',
    age: 24,
    category: Category.DIAMOND,
    height: '1.75m',
    weight: '59kg',
    hair: 'Loira',
    location: 'Gramado - RS',
    // Fix: Changed 'Serra' to 'Serra Gaúcha' to match Region type
    region: 'Serra Gaúcha',
    city: 'Gramado',
    price: 'R$ 1.200/h',
    description: 'O luxo da Serra Gaúcha personificado. Letícia encanta com seu olhar penetrante e curvas esculpidas.',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=1200'
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=1200',
    whatsapp: OFFICIAL_WHATSAPP,
    verified: true,
    services: [ServiceType.OUTCALL, ServiceType.TRAVEL]
  },
  {
    id: 'reg-4',
    name: 'Bia Floripa',
    age: 23,
    category: Category.DIAMOND,
    height: '1.73m',
    weight: '58kg',
    hair: 'Morena',
    location: 'Florianópolis - SC',
    // Fix: Changed 'Litoral' to 'Florianópolis' to match Region type
    region: 'Florianópolis',
    city: 'Florianópolis',
    price: 'R$ 1.800/h',
    description: 'A ilha da magia agora tem um novo nome. Bia oferece o que há de melhor em Florianópolis.',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200'
    ],
    mainPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200',
    whatsapp: OFFICIAL_WHATSAPP,
    verified: true,
    services: [ServiceType.INCALL, ServiceType.OUTCALL, ServiceType.TRAVEL, ServiceType.EVENTS]
  }
];

export const CLUBS: Club[] = [
  {
    id: 'c1',
    name: 'Morena Bruta Private',
    location: 'Cachoeira do Sul - RS',
    address: 'Centro, Cachoeira do Sul - RS',
    description: 'Nosso espaço exclusivo para encontros e eventos privados com total discrição.',
    photos: ['https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1200'],
    mainPhoto: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    mapsUrl: 'https://goo.gl/maps/placeholder',
    openingHours: 'Todos os dias: 24h'
  }
];