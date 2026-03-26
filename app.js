// ================================================================
// DATA — contenido de cada nodo
// ================================================================
var histAnim  = null;
var noiseTimer = null;
var colorState = { r: 180, g: 80, b: 200 };

var DATA = {
  img: {
    t:  'Imagen Digital',
    u:  'Unidad 1 \u00b7 Fundamentos',
    c:  '#f8a7c8', tc: '#c0487e', em: '&#128444;',
    f:  '$f(x,y)$ \u2014 funci\u00f3n de intensidad espacial. Tama\u00f1o $M\\times N$ p\u00edxeles, rango $[0,\\,2^k-1]$',
    demo: 'grid',
    dl: 'Matriz de p\u00edxeles \u2014 valor de intensidad en cada celda',
    items: [
      ['Definici\u00f3n',   'Funci\u00f3n bidimensional f(x,y) donde el valor es la intensidad del p\u00edxel.'],
      ['P\u00edxel',        'Unidad m\u00ednima. Valor 0\u2013255 (8 bits) = intensidad luminosa.'],
      ['Resoluci\u00f3n',   'PPI/DPI. Mayor resoluci\u00f3n = mayor detalle y mayor peso de archivo.'],
      ['Profundidad',       '1 bit = BN, 8 bits = 256 tonos, 24 bits = 16.7 M colores RGB.'],
      ['Muestreo',          'Convertir imagen continua a discreta (rejilla de p\u00edxeles).'],
      ['Cuantizaci\u00f3n', 'Asignar nivel entero a cada muestra. M\u00e1s niveles = mayor fidelidad.'],
      ['Tipos',             'Binaria, escala de grises, color RGB, multiespectral.']
    ]
  },

  hist: {
    t:  'Histograma',
    u:  'Unidad 1 \u00b7 Transformaciones de Intensidad',
    c:  '#f8a7c8', tc: '#c0487e', em: '&#128202;',
    f:  '$h(r_k)=n_k$ &nbsp; Ecualizaci\u00f3n: $s_k=(L-1)\\displaystyle\\sum_{j=0}^{k}\\frac{n_j}{MN}$',
    demo: 'hist',
    dl: 'Distribuci\u00f3n de intensidades animada \u2014 barra = frecuencia del nivel',
    items: [
      ['Definici\u00f3n',       'h(rk)=nk \u2014 cu\u00e1ntos p\u00edxeles tienen cada nivel de intensidad.'],
      ['Brillo',                'g = f + c desplaza el histograma horizontalmente.'],
      ['Contraste',             'g = a\u00b7f expande o comprime el rango del histograma.'],
      ['Ecualizaci\u00f3n',     'CDF acumulada para redistribuir a distribuci\u00f3n uniforme.'],
      ['Especificaci\u00f3n',   'Transforma hacia una distribuci\u00f3n de referencia (Rayleigh, exp\u2026).'],
      ['Distribuciones',        'Uniforme, Exponencial, Rayleigh, Hipercúbica, Hiperb\u00f3lica.'],
      ['Normalizaci\u00f3n',    'Divide entre el m\u00e1ximo para escalar a [0,1] o [0,255].']
    ]
  },

  color: {
    t:  'Modelos de Color',
    u:  'Unidad 1 \u00b7 Representaci\u00f3n del Color',
    c:  '#f8a7c8', tc: '#c0487e', em: '&#127912;',
    f:  '$RGB \\to HSV:\\; V=\\max(R,G,B),\\; S=\\frac{V-\\min}{V},\\; H=60^\\circ\\cdot\\frac{G-B}{V-\\min}$',
    demo: 'color',
    dl: 'Demo interactivo RGB \u2014 mueve los sliders para mezclar colores',
    items: [
      ['RGB',           'Rojo, Verde, Azul. Modelo aditivo de luz. Canal 0\u2013255.'],
      ['CMY/CMYK',      'Cian, Magenta, Amarillo. Modelo sustractivo (impresi\u00f3n).'],
      ['HSV',           'Hue (0\u2013360\u00b0), Saturation, Value. M\u00e1s intuitivo para humanos.'],
      ['HSI',           'Intensity = promedio de canales. Separa color de luminosidad.'],
      ['YCbCr',         'Y = luminancia, Cb/Cr = crominancia. Usado en JPEG y video.'],
      ['Conversi\u00f3n','S=(max\u2212min)/max; V=max(R,G,B); H=arctan de componentes.'],
      ['Importancia',   'El modelo elegido impacta segmentaci\u00f3n, umbralizaci\u00f3n y an\u00e1lisis.']
    ]
  },

  ai: {
    t:  'An\u00e1lisis de Im\u00e1genes',
    u:  'Unidad 2 \u00b7 Visi\u00f3n Artificial',
    c:  '#c9a7f0', tc: '#7c4dbe', em: '&#128300;',
    f:  'Otsu: $\\sigma_B^2(T)=\\omega_0\\omega_1(\\mu_0-\\mu_1)^2$ \u2014 maximizar varianza entre clases',
    demo: 'seg',
    dl: 'Segmentaci\u00f3n con umbral T ajustable \u2014 claro=objeto, oscuro=fondo',
    items: [
      ['Objetivo',              'Extraer informaci\u00f3n sem\u00e1ntica: detectar objetos, medir formas.'],
      ['Segmentaci\u00f3n',     'Umbralizaci\u00f3n global y m\u00e9todo de Otsu para umbral \u00f3ptimo.'],
      ['Detecci\u00f3n bordes', 'Sobel, Prewitt, Canny (gradiente + supresi\u00f3n + hist\u00e9resis).'],
      ['Morfolog\u00eda',       'Erosi\u00f3n y dilataci\u00f3n sobre im\u00e1genes binarias. Apertura y cierre.'],
      ['Descriptores',          '\u00c1rea, per\u00edmetro, circularidad, momentos de Hu.'],
      ['Reconocimiento',        'Clasificar objetos segmentados. Base del reconocimiento de patrones.'],
      ['Pipeline',              'Adq.\u2192Preproc.\u2192Seg.\u2192Extracci\u00f3n\u2192Clasificaci\u00f3n\u2192Decisi\u00f3n.']
    ]
  },

  eti: {
    t:  'Etiquetado Comp. Conexas',
    u:  'Unidad 2 \u00b7 An\u00e1lisis Estructural',
    c:  '#c9a7f0', tc: '#7c4dbe', em: '&#127991;',
    f:  '$V_4(p)=\\{(x\\pm1,y),(x,y\\pm1)\\}$ &nbsp;&nbsp; $V_8$ agrega $\\{(x\\pm1,y\\pm1)\\}$',
    demo: 'label',
    dl: 'Etiquetado V8 \u2014 cada color = componente conexa distinta',
    items: [
      ['Objetivo',          'Identificar regiones aisladas en imagen binaria con etiquetas \u00fanicas.'],
      ['V4',                '4 vecinos: arriba, abajo, izquierda, derecha. Sin diagonales.'],
      ['V8',                '8 vecinos: incluye las 4 diagonales. M\u00e1s permisiva.'],
      ['Paradoja',          'Si fondo usa V4 los objetos usan V8 y viceversa.'],
      ['Alg. secuencial',   '1\u00aa pasada: etiquetas + equivalencias. 2\u00aa pasada: Union-Find.'],
      ['BFS',               'BFS desde cada p\u00edxel no etiquetado, misma etiqueta a vecinos.'],
      ['Aplicaciones',      'Conteo de objetos, \u00e1rea/per\u00edmetro por componente, blobs.']
    ]
  },

  rui: {
    t:  'Modelos de Ruido',
    u:  'Unidad 2 \u00b7 Degradaci\u00f3n y Restauraci\u00f3n',
    c:  '#a7c8f8', tc: '#3a7dd4', em: '&#128225;',
    f:  'Gaussiano: $p(z)=\\dfrac{1}{\\sqrt{2\\pi}\\,\\sigma}\\,e^{-\\frac{(z-\\mu)^2}{2\\sigma^2}}$',
    demo: 'noise',
    dl: 'Limpia vs Gaussiano vs Sal y Pimienta \u2014 se regenera cada 2 s',
    items: [
      ['Definici\u00f3n',   'Variaci\u00f3n aleatoria no deseada en la intensidad de los p\u00edxeles.'],
      ['Gaussiano',         'Distribuci\u00f3n normal con \u03bc y \u03c3\u00b2. M\u00e1s com\u00fan en sensores CCD/CMOS.'],
      ['Sal y Pimienta',    'P\u00edxeles aleatorios toman 0 (pimienta) o 255 (sal).'],
      ['Uniforme',          'Todos los valores de [a,b] igualmente probables.'],
      ['Rayleigh/Erlang',   'Rayleigh en radar; Erlang/Gamma en im\u00e1genes m\u00e9dicas.'],
      ['Estimaci\u00f3n',   'Se estima el modelo con el histograma de una regi\u00f3n homog\u00e9nea.'],
      ['Filtros',           'Media\u2192Gaussiano; Mediana\u2192Sal&Pim.; Wiener\u2192balance.']
    ]
  },

  ops: {
    t:  'Ops. Aritm\u00e9ticas y L\u00f3gicas',
    u:  'Unidad 2 \u00b7 Procesamiento P\u00edxel a P\u00edxel',
    c:  '#a7c8f8', tc: '#3a7dd4', em: '&#9881;',
    f:  '$h=f+g$ &nbsp; $h=|f-g|$ &nbsp; $h=f\\cdot g$ &nbsp; $h=f/g$ &nbsp; AND &nbsp; OR &nbsp; NOT',
    demo: 'ops',
    dl: 'Demo suma A+B p\u00edxel a p\u00edxel \u2014 resultado h\u202f=\u202f(A+B)/2',
    items: [
      ['Concepto',          'Operaciones p\u00edxel a p\u00edxel entre im\u00e1genes del mismo tama\u00f1o.'],
      ['Suma',              'h = f+g. Promediar N frames reduce ruido Gaussiano (\u221aN veces).'],
      ['Resta',             'h = |f\u2212g|. Detecta cambios entre fotogramas (motion detection).'],
      ['Multiplicaci\u00f3n','h = f\u00b7g. M\u00e1scaras de inter\u00e9s, shading correction, blending.'],
      ['Divisi\u00f3n',     'h = f/g. Correcci\u00f3n de iluminaci\u00f3n no uniforme (flat-field).'],
      ['AND/OR/NOT',        'L\u00f3gicas sobre im\u00e1genes binarias. AND=intersecci\u00f3n, OR=uni\u00f3n.'],
      ['XOR',               'Diferencia sim\u00e9trica. Detecta p\u00edxeles que cambiaron entre dos binarias.']
    ]
  }
};

// ================================================================
// DEMOS — canvas
// ================================================================
function runDemo(key) {
  if (histAnim)  { clearInterval(histAnim);  histAnim  = null; }
  if (noiseTimer){ clearInterval(noiseTimer); noiseTimer = null; }
  var cv = document.getElementById('dc');
  var demos = { grid: demoGrid, hist: demoHist, color: demoColor,
                seg: demoSeg, label: demoLabel, noise: demoNoise, ops: demoOps };
  demos[DATA[key].demo](cv);
}

function demoGrid(cv) {
  var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  var v = [
    [45,  80, 120, 200, 230, 180, 100, 55],
    [60, 100, 160, 220, 240, 200, 130, 70],
    [80, 130, 190, 230, 255, 220, 160, 90],
    [100,160, 210, 240, 255, 240, 190,110],
    [90, 140, 200, 230, 245, 225, 170,100]
  ];
  var cw = Math.floor(W / 8), ch = Math.floor(H / 5);
  for (var r = 0; r < 5; r++) {
    for (var c = 0; c < 8; c++) {
      var n = v[r][c];
      ctx.fillStyle = 'rgb(' + n + ',' + Math.round(n * .7 + 40) + ',' + Math.round(n * .85 + 40) + ')';
      ctx.fillRect(c * cw, r * ch, cw - 1, ch - 1);
      ctx.fillStyle = n > 140 ? '#222' : '#eee';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(n, c * cw + cw / 2, r * ch + ch / 2 + 4);
    }
  }
}

function demoHist(cv) {
  var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  var bins = 26, bw = Math.floor((W - 20) / bins);
  var targets = [], curr = [];
  for (var i = 0; i < bins; i++) {
    var x = (i - bins / 2) / (bins / 5.5);
    targets.push(Math.round(85 * Math.exp(-.5 * x * x)));
    curr.push(0);
  }
  histAnim = setInterval(function () {
    var done = true;
    for (var i = 0; i < bins; i++) {
      if (curr[i] < targets[i]) { curr[i] = Math.min(curr[i] + 3, targets[i]); done = false; }
    }
    ctx.clearRect(0, 0, W, H);
    var mx = Math.max.apply(null, curr);
    for (var i = 0; i < bins; i++) {
      var bh = Math.round((curr[i] / mx) * (H - 28));
      var g = ctx.createLinearGradient(0, H - 28, 0, H - 28 - bh);
      g.addColorStop(0, '#c0487e'); g.addColorStop(1, '#f8a7c8');
      ctx.fillStyle = g;
      ctx.fillRect(i * bw + 10, H - 28 - bh, bw - 1, bh);
    }
    ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(10, 2); ctx.lineTo(10, H - 26); ctx.lineTo(W - 4, H - 26); ctx.stroke();
    ctx.fillStyle = '#999'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('0', 14, H - 14); ctx.fillText('128', W / 2, H - 14); ctx.fillText('255', W - 10, H - 14);
    if (done) { clearInterval(histAnim); histAnim = null; }
  }, 30);
}

function demoColor(cv) {
  colorState = { r: 180, g: 80, b: 200 };
  drawColor(cv);
}
function drawColor(cv) {
  var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  var R = colorState.r, G = colorState.g, B = colorState.b;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f8f4ff'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
  ctx.beginPath(); ctx.roundRect(8, 8, W / 2 - 12, H - 16, 8); ctx.fill();
  var bx = W / 2 + 6, bw2 = W - bx - 8, bh = 14;
  [[R, '#ff6688', 'R'], [G, '#44cc88', 'G'], [B, '#5599ff', 'B']].forEach(function (arr, i) {
    var vv = arr[0], cl = arr[1], lb = arr[2], y = 14 + i * 30;
    ctx.fillStyle = '#eee'; ctx.beginPath(); ctx.roundRect(bx, y, bw2, bh, 4); ctx.fill();
    ctx.fillStyle = cl; ctx.beginPath(); ctx.roundRect(bx, y, Math.round(bw2 * vv / 255), bh, 4); ctx.fill();
    ctx.fillStyle = '#333'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(lb + ': ' + vv, bx + 4, y + bh - 2);
  });
  var Mx = Math.max(R, G, B), mn = Math.min(R, G, B);
  var V = Math.round(Mx / 255 * 100), S = Mx > 0 ? Math.round((Mx - mn) / Mx * 100) : 0;
  var H2 = 0;
  if (Mx !== mn) {
    if (Mx === R) H2 = 60 * ((G - B) / (Mx - mn) % 6);
    else if (Mx === G) H2 = 60 * ((B - R) / (Mx - mn) + 2);
    else H2 = 60 * ((R - G) / (Mx - mn) + 4);
  }
  H2 = Math.round(H2 < 0 ? H2 + 360 : H2);
  ctx.fillStyle = '#666'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('H:' + H2 + '  S:' + S + '%  V:' + V + '%', bx + 2, H - 5);
}

function demoSeg(cv) { drawSeg(cv, 120); }
function drawSeg(cv, T) {
  var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  var half = Math.floor(W / 2) - 3;
  for (var x = 0; x < half; x++) {
    for (var y = 0; y < H - 16; y++) {
      var d = Math.sqrt(Math.pow(x - half * .42, 2) + Math.pow(y - (H - 16) * .5, 2));
      var n = Math.max(0, Math.min(255, 255 - d * 3));
      ctx.fillStyle = 'rgb(' + Math.round(n * .9) + ',' + Math.round(n * .7) + ',' + n + ')';
      ctx.fillRect(x, y, 1, 1);
    }
  }
  for (var x = half + 6; x < W; x++) {
    for (var y = 0; y < H - 16; y++) {
      var d = Math.sqrt(Math.pow(x - half - 6 - half * .42, 2) + Math.pow(y - (H - 16) * .5, 2));
      var n = Math.max(0, Math.min(255, 255 - d * 3));
      ctx.fillStyle = n > T ? '#ede1ff' : '#7c4dbe';
      ctx.fillRect(x, y, 1, 1);
    }
  }
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(0, H - 16, W, 16);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Original', half / 2, H - 5);
  ctx.fillText('Umbral T=' + T, half + 6 + (W - half - 6) / 2, H - 5);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(half + 3, 0); ctx.lineTo(half + 3, H - 16); ctx.stroke();
}

function demoLabel(cv) {
  var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f5f0ff'; ctx.fillRect(0, 0, W, H);
  var grid = [
    [0,1,1,0,0,0,1,1,1,0,0,1,0],
    [0,1,1,0,0,0,1,0,1,0,0,1,0],
    [0,1,1,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,1,0,0,0,0,1,1,1,0],
    [1,1,0,0,1,0,0,0,0,1,0,1,0],
    [0,0,0,0,1,0,0,0,0,1,1,1,0]
  ];
  var lbs = grid.map(function (r) { return r.map(function () { return 0; }); });
  var l = 1;
  for (var r = 0; r < 7; r++) {
    for (var c = 0; c < 13; c++) {
      if (grid[r][c] === 1 && lbs[r][c] === 0) {
        var q = [[r, c]]; lbs[r][c] = l;
        while (q.length) {
          var p = q.shift(), cr = p[0], cc = p[1];
          var dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
          for (var di = 0; di < dirs.length; di++) {
            var nr = cr + dirs[di][0], nc = cc + dirs[di][1];
            if (nr >= 0 && nr < 7 && nc >= 0 && nc < 13 && grid[nr][nc] === 1 && lbs[nr][nc] === 0) {
              lbs[nr][nc] = l; q.push([nr, nc]);
            }
          }
        }
        l++;
      }
    }
  }
  var cols = ['#f8a7c8','#c9a7f0','#a7c8f8','#ffd6a7','#b5ead7'];
  var cw = Math.floor(W / 13), ch = Math.floor((H - 16) / 7);
  for (var r = 0; r < 7; r++) {
    for (var c = 0; c < 13; c++) {
      ctx.fillStyle = grid[r][c] === 0 ? '#e8e0f5' : cols[(lbs[r][c] - 1) % cols.length];
      ctx.fillRect(c * cw + 1, r * ch + 1, cw - 1, ch - 1);
      if (grid[r][c] === 1) {
        ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(lbs[r][c], c * cw + cw / 2, r * ch + ch / 2 + 3);
      }
    }
  }
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(0, H - 16, W, 16);
  ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText((l - 1) + ' componentes conexas etiquetadas con V8', W / 2, H - 5);
}

function demoNoise(cv) {
  function draw() {
    var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    var pw = Math.floor(W / 3) - 2;
    var lbls = ['Limpia', 'Gaussiano', 'Sal & Pim.'];
    for (var p = 0; p < 3; p++) {
      var x0 = p * (pw + 3);
      var img = ctx.createImageData(pw, H - 16);
      for (var i = 0; i < pw * (H - 16); i++) {
        var px = i % pw, py = Math.floor(i / pw);
        var n = Math.round(80 + 90 * Math.sin(px / pw * Math.PI) * Math.cos(py / (H - 16) * Math.PI * 1.4) + 60);
        if (p === 1) {
          var g = (Math.random() + Math.random() + Math.random() - 1.5) * 38;
          n = Math.max(0, Math.min(255, n + g));
        } else if (p === 2) {
          var rv = Math.random();
          if (rv < .06) n = 0; else if (rv < .12) n = 255;
        }
        img.data[i*4] = Math.round(n*.9); img.data[i*4+1] = Math.round(n*.7+30);
        img.data[i*4+2] = n; img.data[i*4+3] = 255;
      }
      ctx.putImageData(img, x0, 0);
      ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(x0, H - 16, pw, 16);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(lbls[p], x0 + pw / 2, H - 5);
    }
  }
  draw();
  noiseTimer = setInterval(draw, 2000);
}

function demoOps(cv) {
  var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f5f0ff'; ctx.fillRect(0, 0, W, H);
  var bw = 68, bh = 54, ax = 8, ay = 8, bx = W - bw - 8, by = 8;
  for (var y = 0; y < bh; y++) for (var x = 0; x < bw; x++) {
    ctx.fillStyle = 'rgb(' + Math.round(200*x/bw+55) + ',' + Math.round(100*y/bh+80) + ',180)';
    ctx.fillRect(ax + x, ay + y, 1, 1);
  }
  ctx.fillStyle = '#c0487e'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('A', ax + bw / 2, ay + bh + 11);
  ctx.fillStyle = '#7c4dbe'; ctx.font = 'bold 20px sans-serif';
  ctx.fillText('+', W / 2, ay + bh / 2 + 8);
  for (var y = 0; y < bh; y++) for (var x = 0; x < bw; x++) {
    ctx.fillStyle = 'rgb(100,' + Math.round(180*(1-x/bw)+40) + ',' + Math.round(200*y/bh+55) + ')';
    ctx.fillRect(bx + x, by + y, 1, 1);
  }
  ctx.fillStyle = '#3a7dd4'; ctx.font = 'bold 10px sans-serif';
  ctx.fillText('B', bx + bw / 2, by + bh + 11);
  var rx = Math.round((W - bw) / 2), ry = H - bh - 6;
  for (var y = 0; y < bh; y++) for (var x = 0; x < bw; x++) {
    ctx.fillStyle = 'rgb(' + Math.min(255, Math.round((Math.round(200*x/bw+55)+100)/2)) + ',110,180)';
    ctx.fillRect(rx + x, ry + y, 1, 1);
  }
  ctx.fillStyle = '#555'; ctx.font = 'bold 9px sans-serif';
  ctx.fillText('h = (A+B)/2', rx + bw / 2, ry - 4);
  ctx.strokeStyle = '#c9a7f0'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 2]);
  ctx.beginPath(); ctx.moveTo(ax+bw/2, ay+bh+13); ctx.lineTo(rx+bw/2, ry); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bx+bw/2, by+bh+13); ctx.lineTo(rx+bw/2, ry); ctx.stroke();
  ctx.setLineDash([]);
}

// ================================================================
// PANEL — abrir / cerrar
// ================================================================
function openPanel(key) {
  var d = DATA[key];

  // header
  document.getElementById('ptitle').textContent = d.t;
  document.getElementById('ptitle').style.color  = d.tc;
  document.getElementById('punit').textContent   = d.u;
  document.getElementById('pnl').style.borderLeftColor = d.c;

  // formula
  var fEl = document.getElementById('pformula');
  fEl.style.background = d.c + '22';
  fEl.style.color = d.tc;
  fEl.innerHTML = d.f;
  if (window.MathJax) MathJax.typesetPromise([fEl]);

  // controles extra
  var ex = document.getElementById('pextra');
  ex.innerHTML = '';
  if (key === 'color') {
    ex.innerHTML =
      "<div class='srow'><label>R</label><input type='range' min='0' max='255' value='180' id='sr' oninput='updC()'><span id='vr'>180</span></div>" +
      "<div class='srow'><label>G</label><input type='range' min='0' max='255' value='80'  id='sg' oninput='updC()'><span id='vg'>80</span></div>"  +
      "<div class='srow'><label>B</label><input type='range' min='0' max='255' value='200' id='sb' oninput='updC()'><span id='vb2'>200</span></div>";
  } else if (key === 'ai') {
    ex.innerHTML =
      "<div class='srow'><label>T</label><input type='range' min='20' max='240' value='120' id='st' oninput='updS()'><span id='vt'>120</span></div>";
  }

  // demo canvas
  document.getElementById('dlbl').textContent = d.dl;
  runDemo(key);

  // items
  var html = '';
  for (var i = 0; i < d.items.length; i++) {
    html += "<div class='di'><div class='dd' style='background:" + d.c + "'></div>" +
            "<p><strong>" + d.items[i][0] + ":</strong> " + d.items[i][1] + "</p></div>";
  }
  document.getElementById('pitems').innerHTML = html;

  document.getElementById('overlay').className = 'show';
  document.getElementById('pnl').className     = 'show';
}

function closePanel() {
  if (histAnim)  { clearInterval(histAnim);  histAnim  = null; }
  if (noiseTimer){ clearInterval(noiseTimer); noiseTimer = null; }
  document.getElementById('overlay').className = '';
  document.getElementById('pnl').className     = '';
}

// sliders interactivos
function updC() {
  var r = +document.getElementById('sr').value;
  var g = +document.getElementById('sg').value;
  var b = +document.getElementById('sb').value;
  document.getElementById('vr').textContent  = r;
  document.getElementById('vg').textContent  = g;
  document.getElementById('vb2').textContent = b;
  colorState.r = r; colorState.g = g; colorState.b = b;
  drawColor(document.getElementById('dc'));
}
function updS() {
  var t = +document.getElementById('st').value;
  document.getElementById('vt').textContent = t;
  drawSeg(document.getElementById('dc'), t);
}

// ================================================================
// TOOLTIP
// ================================================================
document.addEventListener('DOMContentLoaded', function () {
  var tip = document.getElementById('tooltip');
  document.querySelectorAll('[data-tip]').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      tip.textContent = el.getAttribute('data-tip') + ' \u2014 clic para ver demo';
      tip.style.opacity = '1';
    });
    el.addEventListener('mousemove', function (e) {
      tip.style.left = (e.clientX + 14) + 'px';
      tip.style.top  = (e.clientY - 34) + 'px';
    });
    el.addEventListener('mouseleave', function () { tip.style.opacity = '0'; });
  });
});

// ================================================================
// CAMBIO DE VISTA
// ================================================================
function switchView(v) {
  document.getElementById('mapv').style.display    = v === 'map'   ? 'block' : 'none';
  document.getElementById('cardsv').style.display  = v === 'cards' ? 'block' : 'none';
  document.getElementById('bmap').className   = 'btn' + (v === 'map'   ? ' on' : '');
  document.getElementById('bcards').className = 'btn' + (v === 'cards' ? ' on' : '');
  if (v === 'cards') buildCards();
}

var bgm = { img:'#fde2ef', hist:'#fde2ef', color:'#fde2ef', ai:'#ede1ff', eti:'#ede1ff', rui:'#ddeeff', ops:'#ddeeff' };
var bdb = { img:'#f8a7c8', hist:'#f8a7c8', color:'#f8a7c8', ai:'#c9a7f0', eti:'#c9a7f0', rui:'#a7c8f8', ops:'#a7c8f8' };

function buildCards() {
  var g = document.getElementById('cg');
  if (g.children.length > 0) return;
  Object.keys(DATA).forEach(function (k) {
    var d = DATA[k];
    var div = document.createElement('div');
    div.className = 'cc';
    div.style.background  = bgm[k];
    div.style.borderColor = bdb[k];
    div.addEventListener('click', function () { openPanel(k); });
    var items = d.items.slice(0, 5).map(function (i) { return '<li>' + i[0] + '</li>'; }).join('');
    div.innerHTML =
      '<span class="ce">' + d.em + '</span>' +
      '<h3 style="color:' + d.tc + '">' + d.t + '</h3>' +
      '<span class="cu" style="color:' + d.tc + 'bb">' + d.u + '</span>' +
      '<ul>' + items + '</ul>';
    g.appendChild(div);
  });
}

// ================================================================
// Exponer funciones como globales para que los onclick del HTML
// funcionen correctamente cuando app.js carga con defer
// ================================================================
window.openPanel  = openPanel;
window.closePanel = closePanel;
window.switchView = switchView;
window.updC       = updC;
window.updS       = updS;