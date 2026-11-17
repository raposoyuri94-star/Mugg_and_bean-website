export type DishCategory = 'breakfast' | 'coffee' | 'bakery' | 'lunch';
export type MenuCategory = 'favourites' | Exclude<DishCategory, 'lunch'>;

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  image: string;
  summary: string;
  description: string;
  featured?: boolean;
  tag?: string;
  /** Preencher apenas com um preço confirmado pela loja, em meticais. */
  priceMzn?: number;
}

export interface Moment {
  image: string;
  alt: string;
  label: string;
  caption: string;
}

// Morada: site oficial do Baía Mall. Telefone: perfil comercial no Tripadvisor.
// Fontes completas e data de consulta em content-sources.md.
export const store = {
  name: 'Mugg & Bean Baía Mall',
  address: 'Av. da Marginal, Bairro Triunfo',
  city: 'Maputo, Moçambique',
  phone: '+258 84 912 0414',
  phoneHref: 'tel:+258849120414',
  mapQuery: 'Mugg & Bean Baia Mall, Maputo, Mozambique',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mugg+%26+Bean+Baia+Mall%2C+Maputo%2C+Mozambique',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mugg+%26+Bean+Baia+Mall%2C+Maputo%2C+Mozambique',
  instagramUrl: 'https://www.instagram.com/mugg_and_bean/',
} as const;

export const menuCategories: ReadonlyArray<{ id: MenuCategory; label: string }> = [
  { id: 'favourites', label: 'Os favoritos' },
  { id: 'breakfast', label: 'Pequeno-almoço' },
  { id: 'coffee', label: 'Café e bebidas' },
  { id: 'bakery', label: 'Doces e bolos' },
];

// Sugestões da marca. A disponibilidade e os preços locais são confirmados na loja.
export const dishes: readonly Dish[] = [
  {
    id: 'cappuccino', name: 'Um bom cappuccino', category: 'coffee', image: 'cappuccino.jpg',
    summary: 'A sua pausa de todos os dias, na medida certa.',
    description: 'Café expresso com leite de textura suave e cremosa. Escolha o seu tamanho preferido e reserve um momento só para si.',
    featured: true, tag: 'O favorito de todos os dias',
  },
  {
    id: 'breakfast', name: 'Pequeno-almoço clássico', category: 'breakfast', image: 'breakfast.jpg',
    summary: 'Um bom dia começa com uma boa refeição.',
    description: 'Dois ovos, bacon e tomate grelhado. Uma combinação familiar, servida com uma dose generosa de hospitalidade.',
    featured: true,
  },
  {
    id: 'muffin', name: 'O nosso muffin gigante', category: 'bakery', image: 'muffin.webp',
    summary: 'Um pouco maior. Mais difícil de partilhar.',
    description: 'Preparado de raiz, com a receita que acompanha a marca há três décadas. Pergunte pelos sabores do dia e pelos acompanhamentos disponíveis.',
    featured: true, tag: 'Acabado de sair do forno',
  },
  {
    id: 'stack', name: 'Sanduíche de frango Alabama', category: 'lunch', image: 'chicken-stack.jpg',
    summary: 'Camadas generosas de coisas boas.',
    description: 'Frango desfiado, tomate, bacon e mozzarella derretida em pão de massa mãe, com molho de cheddar, mostarda e mel, e abacate sujeito a disponibilidade. Acompanhado de batatas fritas ou salada.',
    featured: true,
  },
  {
    id: 'grill', name: 'Pequeno-almoço na grelha', category: 'breakfast', image: 'grill-breakfast.jpg',
    summary: 'Para as manhãs que pedem um pouco mais.',
    description: 'Carne de vaca com molho barbecue, bacon, salsicha, dois ovos, batata crocante, tomate grelhado e cogumelos com ervas aromáticas.',
  },
  {
    id: 'omelette', name: 'Omeleta Rancheros', category: 'breakfast', image: 'omelette.jpg',
    summary: 'Mais sabor, com um toque de picante.',
    description: 'Cheddar, mozzarella, malagueta e molho de tomate com bacon, abacate, batatinhas, milho, tomate-cereja e maionese picante. Servida com natas ácidas. Abacate sujeito a disponibilidade.',
  },
  {
    id: 'americano', name: 'Café americano', category: 'coffee', image: 'americano.jpg',
    summary: 'Intenso, suave e simplesmente bom.',
    description: 'Uma dose dupla de café expresso com água quente. Preparado com cuidado para saborear ao seu ritmo.',
  },
  {
    id: 'latte', name: 'Café latte', category: 'coffee', image: 'latte.jpg',
    summary: 'Uma forma suave de começar o dia.',
    description: 'Café expresso com leite de textura cremosa. Uma combinação familiar para os momentos que merecem um pouco mais de calma.',
  },
  {
    id: 'chocolate', name: 'Chocolate quente', category: 'coffee', image: 'hot-chocolate.jpg',
    summary: 'Uma chávena cheia de conforto.',
    description: 'Chocolate quente com leite cremoso. Para acompanhar uma boa conversa ou matar a vontade de algo doce.',
  },
  {
    id: 'cake', name: 'Uma fatia de bolo', category: 'bakery', image: 'cake.webp',
    summary: 'Há sempre espaço para uma fatia.',
    description: 'Escolha entre os bolos preparados pela loja. Os sabores e acompanhamentos variam conforme a disponibilidade. Na fotografia, um bolo de chocolate da colecção da marca.',
  },
];

export const moments: readonly Moment[] = [
  {
    image: 'moment-coffee.webp', label: 'Um momento só para si',
    alt: 'Uma mão a mexer uma chávena de café à luz da tarde',
    caption: 'Um momento só para si. Um café preparado com carinho.',
  },
  {
    image: 'instagram-muffin.webp', label: 'Um doce para acompanhar',
    alt: 'Um muffin gigante acompanhado de compota e queijo cheddar, numa fotografia partilhada no Instagram',
    caption: 'Um pouco de doce, um pouco de salgado. O nosso muffin gigante, à maneira Mugg & Bean.',
  },
  {
    image: 'friends.webp', label: 'Juntos sabe melhor',
    alt: 'Duas amigas a conversar e a partilhar uma refeição no Mugg & Bean',
    caption: 'Há sempre tempo para mais uma história à volta da mesa.',
  },
  {
    image: 'moment-takeaway.webp', label: 'O seu café, onde estiver',
    alt: 'Uma cliente a saborear um café Mugg & Bean num copo para levar',
    caption: 'O seu café preferido, onde quer que o dia o leve.',
  },
];

export function formatPrice(priceMzn?: number): string {
  return priceMzn === undefined
    ? 'Consulte na loja'
    : new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(priceMzn);
}
