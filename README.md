# Darlan Tecno Split

Landing page de captação pelo WhatsApp. HTML, CSS e JavaScript puros, sem build e
sem dependências. Para ver localmente, basta abrir o `index.html` no navegador.

```
index.html     conteúdo, SEO e dados estruturados (HVACBusiness)
styles.css     sistema visual completo
script.js      header, menu, revelação ao rolar, barra do celular, galeria
img/           fotos em WebP, mapa e imagem de compartilhamento (og.jpg)
favicon.svg    ícone da aba
```

`PRODUCT.md`, `README.md` e `.impeccable/` não sobem para a Vercel (`.vercelignore`).

---

## 1. Antes de publicar

| # | O que | Onde |
|---|---|---|
| 1 | **Domínio** | `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` e o JSON-LD (marcados com `TROCAR`). Hoje: `https://darlantecnosplit.com.br/` |
| 2 | **Fotos reais** | ver seção 2 |

O WhatsApp (`5555999613719`) e o Instagram já estão certos em todos os links.

## 2. Trocar as fotos de banco pelas fotos reais

Todas as fotos atuais são do Unsplash, usadas como ilustração. A galeria avisa
"Imagens ilustrativas" e o rodapé diz "Fotos ilustrativas: Unsplash".
**Esses dois avisos só saem quando todas as fotos forem do Darlan.**

Mantenha os nomes de arquivo e, de preferência, a proporção:

| Arquivo | Proporção | Onde aparece |
|---|---|---|
| `hero-1400.webp` + `hero-800.webp` | retrato ~5:7 | hero (o aparelho deve ficar no terço de cima) |
| `sobre.webp` | ~4:3 | seção Sobre |
| `gal-residencial.webp` | retrato 2:3 | galeria, coluna alta da esquerda |
| `gal-condensadoras.webp` | retrato 2:3 | galeria, coluna alta da direita |
| `gal-comercial.webp` | 3:2 | galeria, faixa larga de cima |
| `gal-suporte.webp`, `gal-fachada.webp` | 3:2 | galeria, quadros menores |
| `gal-*-lg.webp` | igual à miniatura | versão ampliada que abre ao clicar |
| `og.jpg` | 1200x630 | prévia ao compartilhar o link |

A galeria recorta com `object-fit: cover`, então outra proporção também funciona.
Se mudar o tamanho, atualize `width` e `height` da `<img>` (evita a página "pular").
Ao trocar uma foto da galeria, troque também `alt` e `data-caption` (tire o
"(imagem ilustrativa)").

Converter com ffmpeg: `ffmpeg -i foto.jpg -vf scale=800:-2 -c:v libwebp -quality 78 gal-x.webp`

## 3. Decisões do projeto

- **Tema claro travado**, com faixas em azul profundo (cor de marca, não modo escuro).
- **Uma cor de destaque:** azul. `#2878F0` nos títulos grandes; `#1D6AE0` em botões e
  links, porque `#2878F0` com texto branco não passa no contraste AA.
- **Raios:** 12px em botões e controles, 20px em cards e fotos.
- **Nada inventado:** sem anos de experiência, número de clientes, garantias,
  depoimentos ou marcas. O FAQ só responde o que foi confirmado e manda para o WhatsApp
  quando depende do caso.
- **Cada botão abre o WhatsApp com uma mensagem própria** (orçamento geral, cada
  serviço, consulta de região, dúvida), para o Darlan saber de onde veio o contato.
- **Sem listener de scroll:** tudo usa `IntersectionObserver`.
- **Movimento reduzido respeitado:** com a preferência ligada, nada anima e nada some.
- **Sem JavaScript** os textos aparecem e todos os links funcionam; perdem-se as
  animações, o menu do celular e a galeria ampliada.
- **Celular:** barra fixa "Solicitar orçamento" aparece depois dos botões do hero e
  some no CTA final. O `body` reserva o espaço dela, então nada fica escondido.
- **Mapa:** recorte estático do OpenStreetMap (só a cidade, sem endereço), com a
  atribuição obrigatória no canto.
- **Ícones:** Phosphor, embutidos como sprite SVG no topo do `index.html`.
