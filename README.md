# Mapa Recife

Um mapa pra quem quer conhecer o Recife sem se perder no meio de tantas opções.

**Quer ver funcionando?** https://wendellfeliix.github.io/mapa-recife/ (o link só abre depois que o GitHub Pages for ativado neste repositório)

## Por que eu fiz isso

Eu tinha uma ideia na cabeça e quis ver até onde conseguia levá-la. Tentei explorar ela da melhor forma que pude, e o resultado é este mapa: a ideia transformada em código.

A ideia é simples. Eu penso em quem não conhece bem a região e fica sem saber por onde começar. Aqui a pessoa escolhe o tipo de passeio que quer fazer, vê onde o lugar fica no mapa e consegue achar, com mais facilidade, algo que tenha a ver com ela.

Também pensei em quem não costuma sair muito. Às vezes falta um empurrãozinho, ou só saber o que existe por perto. Por isso dá pra guardar os lugares favoritos e voltar neles depois, quando bater a vontade de sair.

O visual veio do frevo. A faixa colorida no topo lembra a sombrinha, e as cores fortes ajudam a separar as categorias de uma olhada só.

## O que dá pra fazer

- Ver os lugares no mapa, cada um com seu pino
- Filtrar por **Comer** (vermelho), **Ver** (azul) ou **Cultura** (verde)
- Clicar num pino pra ler sobre o lugar, ou clicar na lista e deixar o mapa levar você até lá
- Abrir o lugar direto no Google Maps pra traçar o caminho
- Favoritar o que gostou. Os favoritos ficam salvos no seu navegador, então não somem quando você fecha a página
- Usar no celular: o mapa fica em cima e a lista embaixo
- Navegar só pelo teclado, se preferir

## Como rodar no seu computador

1. Baixe ou clone este repositório
2. Abra a pasta no VS Code
3. Instale a extensão **Live Server**
4. Clique com o botão direito no `index.html` e escolha **Open with Live Server**

Precisa de internet, porque o mapa, as fontes e o Leaflet vêm da web.

## Como o projeto está organizado

```
mapa-recife/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    ├── places.js
    └── script.js
```

O `index.html` monta a página, o `style.css` cuida do visual, o `script.js` faz tudo funcionar e o `places.js` guarda os dados dos lugares.

## Como adicionar um lugar

Abra o `js/places.js`, copie um dos blocos da lista `PLACES` e troque pelos dados do seu lugar. Pra pegar a latitude e a longitude certas, clique com o botão direito no local exato no Google Maps e copie os dois números que aparecem no topo do menu.

## O que eu usei

- HTML, CSS e JavaScript puro, sem framework
- [Leaflet](https://leafletjs.com/) pro mapa
- [OpenStreetMap](https://www.openstreetmap.org/copyright) pros mapas de fundo
- Fontes Bungee e Lexend, do Google Fonts

Escolhi não usar framework de propósito. Queria praticar a base: integrar uma biblioteca externa, manter o mapa e a lista sempre sincronizados e guardar dados no navegador.

## O que ainda não está perfeito

- Os lugares são poucos, só um começo
- As coordenadas são aproximadas, então um pino pode cair a alguns metros do lugar de verdade
- As descrições são resumos curtos meus, não guias oficiais

## O que quero fazer depois

- Busca por nome
- Rota até o lugar
- Mais lugares e mais categorias
- Fotos de cada lugar

## Quem fez

Sou o Félix, designer UI/UX e ilustrador, aqui do Recife.

- GitHub: [WendellFeliix](https://github.com/WendellFeliix)
- Portfólio: https://sites.google.com/view/wendellfelixportifolio/home

Mapas © colaboradores do [OpenStreetMap](https://www.openstreetmap.org/copyright).
