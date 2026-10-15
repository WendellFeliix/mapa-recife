// Lugares do mapa. Pra adicionar um, copie um bloco e troque os dados.
//
// ATENÇÃO: as coordenadas (lat, lng) são APROXIMADAS. Confira cada uma no
// Google Maps: clique com o botão direito no local exato e copie os números
// que aparecem no topo do menu (o primeiro é lat, o segundo é lng).

const CATS = {
  comer: 'Comer',
  ver: 'Ver',
  cultura: 'Cultura',
};

const PLACES = [
  {
    id: 'marco-zero', cat: 'ver', nome: 'Marco Zero', bairro: 'Recife Antigo',
    lat: -8.0631, lng: -34.8712,
    desc: 'Praça do Recife Antigo com o piso desenhado por Cícero Dias e vista para o porto. É o palco de muitos eventos da cidade.',
    dica: 'Vá no fim da tarde, quando o sol baixa e a praça enche de gente.',
  },
  {
    id: 'boa-viagem', cat: 'ver', nome: 'Praia de Boa Viagem', bairro: 'Boa Viagem',
    lat: -8.1150, lng: -34.8930,
    desc: 'Praia urbana com calçadão, coqueiros e barracas. Na maré baixa, aparecem piscinas naturais perto da areia.',
    dica: 'Há placas de risco de tubarão. Entre na água só nos trechos indicados.',
  },
  {
    id: 'bom-jesus', cat: 'ver', nome: 'Rua do Bom Jesus', bairro: 'Recife Antigo',
    lat: -8.0622, lng: -34.8717,
    desc: 'Rua histórica de casarões coloridos, onde fica a Sinagoga Kahal Zur Israel. Uma das ruas mais fotogênicas da cidade.',
    dica: 'De manhã cedo a rua fica mais vazia, ótimo pra fotografar.',
  },
  {
    id: 'paco-do-frevo', cat: 'cultura', nome: 'Paço do Frevo', bairro: 'Recife Antigo',
    lat: -8.0618, lng: -34.8712,
    desc: 'Museu dedicado ao frevo, com exposição interativa sobre a música, a dança e a história do ritmo.',
    dica: 'Combine a visita com um passeio a pé pelo Recife Antigo.',
  },
  {
    id: 'cais-do-sertao', cat: 'cultura', nome: 'Cais do Sertão', bairro: 'Recife Antigo',
    lat: -8.0607, lng: -34.8714,
    desc: 'Museu sobre a cultura do sertão nordestino e a obra de Luiz Gonzaga, instalado em um armazém do porto.',
    dica: 'Reserve pelo menos uma hora e meia: a exposição é grande.',
  },
  {
    id: 'brennand', cat: 'cultura', nome: 'Instituto Ricardo Brennand', bairro: 'Várzea',
    lat: -8.0650, lng: -34.9510,
    desc: 'Conjunto em forma de castelo com coleção de armas, pinturas e esculturas, cercado por jardins.',
    dica: 'Fica mais afastado do centro. Vale ir de carro ou aplicativo.',
  },
  {
    id: 'santa-isabel', cat: 'cultura', nome: 'Teatro de Santa Isabel', bairro: 'Santo Antônio',
    lat: -8.0634, lng: -34.8787,
    desc: 'Teatro neoclássico do século XIX, de frente para a Praça da República.',
    dica: 'Olhe a programação: às vezes há apresentações com ingresso barato.',
  },
  {
    id: 'sao-jose', cat: 'comer', nome: 'Mercado de São José', bairro: 'São José',
    lat: -8.0655, lng: -34.8806,
    desc: 'Mercado público de estrutura de ferro, com barracas de comida, artesanato e produtos regionais.',
    dica: 'Vá de manhã, quando o movimento é grande e as barracas estão cheias.',
  },
  {
    id: 'rua-da-moeda', cat: 'comer', nome: 'Rua da Moeda', bairro: 'Recife Antigo',
    lat: -8.0619, lng: -34.8728,
    desc: 'Rua de bares e restaurantes no Recife Antigo, com muita música e movimento à noite.',
    dica: 'Chegue cedo nos fins de semana pra achar mesa.',
  },
];
