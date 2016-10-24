# Simulador

Este simulador foi construído de modo a não necessitar recursos complementares para ser utilizado, sendo
requisito necessário apenas um navegador Web para utilizar a plataforma desenvolvida.
A partir do uso deste simulador podemos obter valores para o campo elétrico, a força elétrica, trabalho e
diferença de potencial para objetos carregados eletricamente que possuem geometria de ponto, anel, disco
e linha em qualquer ponto do espaço tridimensional. Trata-se de um importante recurso educacional que
convenientemente pode ser utilizado em sala de aula, durante a abordagem do conteúdo de eletrostática no
ensino superior.


# Desenvolvimento

Para a construção do simulador foram avaliados diversas possibilidades de implementação, dando importância
para ferramentas que possibilitassem a construção de um simulador portável para vários sistemas operacionais.
Assim, estudando várias ferramentas computacionais disponíveis, foi determinado o uso de JavaScript, HTML5
e WebGL para o desenvolvimento de um protótipo da aplicação, para posteriormente realizar a construção
da ferramenta.

WebGL é uma das principais ferramentas utilizadas na construção deste trabalho. WebGL é uma
API de modo imediato de renderização 3D, projetado para a web. Essa API é derivada do OpenGL ES 2.0 e
provê funcionalidades similares de renderização, mas em um contexto HTML. Para auxiliar na utilização
desta API, exitem várias bibliotecas que aceleram e simplificam o desenvolvimento. Neste trabalho foi
utilizado a Three.js, que é um biblioteca voltada para o desenvolvimento WebGL em JavaScript. Assim,
para implementação das outras funcionalidades do simulador, também optamos pela linguagem JavaScript
que permitiu o desenvolvimento das funções de cálculo, integrando com as componentes de visualização
construídas em WebGL.
