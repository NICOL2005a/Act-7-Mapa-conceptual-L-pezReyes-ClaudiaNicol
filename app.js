// ============================================================
// PDI Mapa Conceptual — app.js
// ============================================================
var histAnim   = null;
var noiseTimer = null;
var colorState = { r:180, g:80, b:200 };

// ── DATA ──────────────────────────────────────────────────
var DATA = {
  img:{
    t:'Imagen Digital', u:'Unidad 1 \u00b7 Fundamentos',
    c:'#f8a7c8', tc:'#c0487e', em:'&#128444;',
    f:'$f(x,y)$ \u2014 funci\u00f3n de intensidad. Tama\u00f1o $M\\times N$ p\u00edxeles, rango $[0,\\,2^k-1]$',
    demo:'grid', dl:'Matriz de p\u00edxeles \u2014 valor de intensidad en cada celda',
    items:[
      ['Definici\u00f3n','Funci\u00f3n bidimensional f(x,y) donde el valor es la intensidad del p\u00edxel en la posici\u00f3n (x,y).'],
      ['P\u00edxel','Picture Element. Unidad m\u00ednima de una imagen digital. Valor 0\u2013255 en 8 bits.'],
      ['Resoluci\u00f3n','N\u00famero de p\u00edxeles por unidad (PPI/DPI). Mayor resoluci\u00f3n = mayor detalle y mayor peso de archivo.'],
      ['Profundidad de bits','1 bit = Blanco/Negro. 8 bits = 256 tonos de gris. 24 bits = 16.7 M colores RGB.'],
      ['Muestreo','Convertir la imagen anal\u00f3gica continua a discreta definiendo la rejilla de p\u00edxeles.'],
      ['Cuantizaci\u00f3n','Asignar un nivel de intensidad entero a cada muestra. M\u00e1s niveles = mayor fidelidad tonal.'],
      ['Tipos de imagen','Binaria (0/1), escala de grises (8 bits), color RGB (24 bits), multiespectral (n canales).']
    ]
  },
  hist:{
    t:'Histograma', u:'Unidad 1 \u00b7 Transformaciones de Intensidad',
    c:'#f8a7c8', tc:'#c0487e', em:'&#128202;',
    f:'$h(r_k)=n_k$ \u00a0\u00a0 Ecualizaci\u00f3n: $s_k=(L-1)\\displaystyle\\sum_{j=0}^{k}\\frac{n_j}{MN}$',
    demo:'hist', dl:'Histograma animado \u2014 distribuci\u00f3n de intensidades',
    items:[
      ['Definici\u00f3n','Gr\u00e1fica de distribuci\u00f3n de frecuencias: h(rk)=nk indica cu\u00e1ntos p\u00edxeles tienen el nivel de intensidad rk.'],
      ['Brillo','g = f + c desplaza el histograma horizontalmente. c>0 aclara, c<0 oscurece la imagen.'],
      ['Contraste','g = a\u00b7f expande (a>1) o comprime (a<1) el rango del histograma.'],
      ['Ecualizaci\u00f3n','Redistribuye los niveles usando la CDF acumulada para obtener un histograma aproximadamente uniforme.'],
      ['Especificaci\u00f3n','Transforma el histograma para que se aproxime a uno de referencia (Rayleigh, exponencial, hip\u00e9rbola\u2026).'],
      ['Distribuciones objetivo','Uniforme, Exponencial, Rayleigh, Hipercúbica, Hiperb\u00f3lica. Cada una produce efectos visuales distintos.'],
      ['Normalizaci\u00f3n','Dividir entre el valor m\u00e1ximo para escalar el histograma al rango [0,1] o [0,255].']
    ]
  },
  color:{
    t:'Modelos de Color', u:'Unidad 1 \u00b7 Representaci\u00f3n del Color',
    c:'#f8a7c8', tc:'#c0487e', em:'&#127912;',
    f:'$RGB \\to HSV:\\; V=\\max(R,G,B),\\; S=\\frac{V-\\min}{V},\\; H=60^\\circ\\!\\cdot\\!\\frac{G-B}{V-\\min}$',
    demo:'color', dl:'Mezclador RGB interactivo \u2014 mueve los sliders',
    items:[
      ['RGB','Rojo, Verde, Azul. Modelo aditivo de luz. Canal 0\u2013255. (255,0,0) = rojo puro.'],
      ['CMY / CMYK','Cian, Magenta, Amarillo. Modelo sustractivo (impresi\u00f3n). K=negro para compensar imprecisi\u00f3n de tintas.'],
      ['HSV','Hue (0\u2013360\u00b0), Saturation (0\u20131), Value (0\u20131). M\u00e1s intuitivo para el ser humano que RGB.'],
      ['HSI','Intensity = promedio de canales R,G,B. Separa informaci\u00f3n de color de la luminosidad.'],
      ['YCbCr','Y = luminancia, Cb/Cr = crominancia azul/roja. Usado en compr. JPEG y video digital.'],
      ['Conversi\u00f3n RGB\u2192HSV','S=(max\u2212min)/max; V=max(R,G,B); H=arctan de componentes. Proceso reversible.'],
      ['Importancia','El modelo de color elegido impacta directamente en segmentaci\u00f3n, umbralizaci\u00f3n y an\u00e1lisis.']
    ]
  },
  ai:{
    t:'An\u00e1lisis de Im\u00e1genes', u:'Unidad 2 \u00b7 Visi\u00f3n Artificial',
    c:'#c9a7f0', tc:'#7c4dbe', em:'&#128300;',
    f:'Otsu: $\\sigma_B^2(T)=\\omega_0\\omega_1(\\mu_0-\\mu_1)^2$ \u2014 maximizar varianza entre clases',
    demo:'seg', dl:'Segmentaci\u00f3n con umbral T ajustable \u2014 desliza para cambiar',
    items:[
      ['Objetivo','Extraer informaci\u00f3n sem\u00e1ntica de la imagen: detectar objetos, medir formas, clasificar regiones.'],
      ['Segmentaci\u00f3n','Dividir la imagen en regiones homog\u00e9neas. M\u00e9todo de Otsu calcula el umbral \u00f3ptimo autom\u00e1ticamente.'],
      ['Detecci\u00f3n de bordes','Localizar cambios bruscos de intensidad. Operadores: Sobel, Prewitt, Canny (gradiente + supresi\u00f3n + hist\u00e9resis).'],
      ['Morfolog\u00eda matem\u00e1tica','Erosi\u00f3n y dilataci\u00f3n sobre im\u00e1genes binarias. Base de apertura y cierre morfol\u00f3gico.'],
      ['Descriptores de forma','\u00c1rea, per\u00edmetro, circularidad, momentos de Hu \u2014 invariantes a rotaci\u00f3n, escala y traslaci\u00f3n.'],
      ['Reconocimiento','Clasificar objetos segmentados usando descriptores. Base del reconocimiento de patrones.'],
      ['Pipeline','Adquisici\u00f3n \u2192 Preprocesamiento \u2192 Segmentaci\u00f3n \u2192 Extracci\u00f3n \u2192 Clasificaci\u00f3n \u2192 Decisi\u00f3n.']
    ]
  },
  eti:{
    t:'Etiquetado Comp. Conexas', u:'Unidad 2 \u00b7 An\u00e1lisis Estructural',
    c:'#c9a7f0', tc:'#7c4dbe', em:'&#127991;',
    f:'$V_4(p)=\\{(x\\pm1,y),(x,y\\pm1)\\}$ \u00a0\u00a0 $V_8$ agrega $\\{(x\\pm1,y\\pm1)\\}$',
    demo:'label', dl:'Etiquetado V8 \u2014 cada color = componente conexa distinta',
    items:[
      ['Objetivo','Identificar y numerar regiones aisladas (objetos) en una imagen binaria asign\u00e1ndoles etiquetas \u00fanicas.'],
      ['Vecindad V4','4 vecinos: arriba, abajo, izquierda, derecha. Conexi\u00f3n sin diagonales. M\u00e1s restrictiva.'],
      ['Vecindad V8','8 vecinos: incluyendo las 4 diagonales. M\u00e1s permisiva. Detecta m\u00e1s conexiones.'],
      ['Paradoja V4/V8','Para consistencia topol\u00f3gica: si el fondo usa V4, los objetos deben usar V8 y viceversa.'],
      ['Algoritmo secuencial','1\u00aa pasada: etiquetas provisionales + tabla de equivalencias. 2\u00aa pasada: resuelve con Union-Find.'],
      ['Algoritmo BFS','Para cada p\u00edxel no etiquetado, BFS explora todos sus vecinos conexos y asigna la misma etiqueta.'],
      ['Aplicaciones','Conteo de objetos, medici\u00f3n de \u00e1rea/per\u00edmetro por componente, extracci\u00f3n de blobs.']
    ]
  },
  rui:{
    t:'Modelos de Ruido', u:'Unidad 2 \u00b7 Degradaci\u00f3n y Restauraci\u00f3n',
    c:'#a7c8f8', tc:'#3a7dd4', em:'&#128225;',
    f:'Gaussiano: $p(z)=\\dfrac{1}{\\sqrt{2\\pi}\\,\\sigma}\\,e^{-\\frac{(z-\\mu)^2}{2\\sigma^2}}$',
    demo:'noise', dl:'Comparativa: limpia vs Gaussiano vs Sal y Pimienta',
    items:[
      ['Definici\u00f3n','Variaci\u00f3n aleatoria no deseada en la intensidad de los p\u00edxeles. Origen: adquisici\u00f3n, transmisi\u00f3n o almacenamiento.'],
      ['Gaussiano','Distribuci\u00f3n normal con \u03bc (media) y \u03c3\u00b2 (varianza). El m\u00e1s com\u00fan en sensores CCD/CMOS.'],
      ['Sal y Pimienta','P\u00edxeles aleatorios toman 0 (pimienta) o 255 (sal). Causado por errores en transmisi\u00f3n.'],
      ['Uniforme','Todos los valores del intervalo [a,b] igualmente probables. Media = (a+b)/2.'],
      ['Rayleigh / Erlang','Rayleigh en im\u00e1genes de radar; Erlang/Gamma en im\u00e1genes m\u00e9dicas (ultrasonido, RM).'],
      ['Estimaci\u00f3n del modelo','Se estima el tipo de ruido analizando el histograma de una regi\u00f3n homog\u00e9nea de la imagen.'],
      ['Filtros de restauraci\u00f3n','Media \u2192 Gaussiano; Mediana \u2192 Sal&Pimienta; Wiener \u2192 balance ruido-borrosidad.']
    ]
  },
  ops:{
    t:'Ops. Aritm\u00e9ticas y L\u00f3gicas', u:'Unidad 2 \u00b7 Procesamiento P\u00edxel a P\u00edxel',
    c:'#a7c8f8', tc:'#3a7dd4', em:'&#9881;',
    f:'$h=f+g$ \u00a0 $h=|f-g|$ \u00a0 $h=f\\cdot g$ \u00a0 $h=f/g$ \u00a0 AND \u00a0 OR \u00a0 NOT',
    demo:'ops', dl:'Suma de im\u00e1genes A+B p\u00edxel a p\u00edxel \u2014 h=(A+B)/2',
    items:[
      ['Concepto','Operaciones aplicadas p\u00edxel a p\u00edxel entre dos im\u00e1genes del mismo tama\u00f1o.'],
      ['Suma','h = f+g. Promediar N frames reduce el ruido Gaussiano (SNR mejora \u221aN veces).'],
      ['Resta','h = |f\u2212g|. Detecta cambios entre fotogramas (motion detection, sustracci\u00f3n de fondo).'],
      ['Multiplicaci\u00f3n','h = f\u00b7g. Aplicar m\u00e1scaras de inter\u00e9s, shading correction, blending.'],
      ['Divisi\u00f3n','h = f/g. Correcci\u00f3n de iluminaci\u00f3n no uniforme (flat-field correction en microscop\u00eda).'],
      ['AND / OR / NOT','L\u00f3gicas sobre im\u00e1genes binarias. AND=intersecci\u00f3n de regiones, OR=uni\u00f3n, NOT=complemento.'],
      ['XOR','Diferencia sim\u00e9trica de dos m\u00e1scaras. \u00datil para detectar p\u00edxeles que cambiaron entre dos binarias.']
    ]
  }
};

// ── DEMOS ─────────────────────────────────────────────────
function stopAnims() {
  if (histAnim)   { clearInterval(histAnim);   histAnim   = null; }
  if (noiseTimer) { clearInterval(noiseTimer); noiseTimer = null; }
}

function runDemo(key) {
  stopAnims();
  var cv = document.getElementById('dc');
  ({ grid:demoGrid, hist:demoHist, color:demoColor,
     seg:demoSeg, label:demoLabel, noise:demoNoise, ops:demoOps })[DATA[key].demo](cv);
}

function demoGrid(cv) {
  var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
  ctx.clearRect(0,0,W,H);
  var v=[[45,80,120,200,230,180,100,55],[60,100,160,220,240,200,130,70],
         [80,130,190,230,255,220,160,90],[100,160,210,240,255,240,190,110],
         [90,140,200,230,245,225,170,100]];
  var cw=Math.floor(W/8), ch=Math.floor(H/5);
  for (var r=0;r<5;r++) for (var c=0;c<8;c++) {
    var n=v[r][c];
    ctx.fillStyle='rgb('+n+','+Math.round(n*.7+40)+','+Math.round(n*.85+40)+')';
    ctx.fillRect(c*cw,r*ch,cw-1,ch-1);
    ctx.fillStyle=n>140?'#222':'#eee';
    ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(n, c*cw+cw/2, r*ch+ch/2+4);
  }
}

function demoHist(cv) {
  var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
  var bins=26, bw=Math.floor((W-20)/bins);
  var targets=[], curr=[];
  for (var i=0;i<bins;i++) {
    var x=(i-bins/2)/(bins/5.5);
    targets.push(Math.round(85*Math.exp(-.5*x*x)));
    curr.push(0);
  }
  histAnim=setInterval(function(){
    var done=true;
    for (var i=0;i<bins;i++) { if(curr[i]<targets[i]){curr[i]=Math.min(curr[i]+3,targets[i]);done=false;} }
    ctx.clearRect(0,0,W,H);
    var mx=Math.max.apply(null,curr)||1;
    for (var i=0;i<bins;i++) {
      var bh=Math.round((curr[i]/mx)*(H-28));
      var g=ctx.createLinearGradient(0,H-28,0,H-28-bh);
      g.addColorStop(0,'#c0487e'); g.addColorStop(1,'#f8a7c8');
      ctx.fillStyle=g;
      ctx.fillRect(i*bw+10,H-28-bh,bw-1,bh);
    }
    ctx.strokeStyle='#ddd'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(10,2); ctx.lineTo(10,H-26); ctx.lineTo(W-4,H-26); ctx.stroke();
    ctx.fillStyle='#999'; ctx.font='9px sans-serif'; ctx.textAlign='center';
    ctx.fillText('0',14,H-14); ctx.fillText('128',W/2,H-14); ctx.fillText('255',W-10,H-14);
    if(done){clearInterval(histAnim);histAnim=null;}
  },30);
}

function demoColor(cv) { colorState={r:180,g:80,b:200}; drawColor(cv); }
function drawColor(cv) {
  var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
  var R=colorState.r, G=colorState.g, B=colorState.b;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#f8f4ff'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgb('+R+','+G+','+B+')';
  ctx.beginPath(); ctx.roundRect(8,8,W/2-12,H-16,8); ctx.fill();
  var bx=W/2+6, bw2=W-bx-8, bh=14;
  [[R,'#ff6688','R'],[G,'#44cc88','G'],[B,'#5599ff','B']].forEach(function(a,i){
    var vv=a[0],cl=a[1],lb=a[2],y=14+i*30;
    ctx.fillStyle='#eee'; ctx.beginPath(); ctx.roundRect(bx,y,bw2,bh,4); ctx.fill();
    ctx.fillStyle=cl;     ctx.beginPath(); ctx.roundRect(bx,y,Math.round(bw2*vv/255),bh,4); ctx.fill();
    ctx.fillStyle='#333'; ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(lb+': '+vv, bx+4, y+bh-2);
  });
  var Mx=Math.max(R,G,B)||1, mn=Math.min(R,G,B);
  var V=Math.round(Mx/255*100), S=Math.round((Mx-mn)/Mx*100)||0;
  var H2=0;
  if(Mx!==mn){
    if(Mx===R) H2=60*((G-B)/(Mx-mn)%6);
    else if(Mx===G) H2=60*((B-R)/(Mx-mn)+2);
    else H2=60*((R-G)/(Mx-mn)+4);
  }
  H2=Math.round(H2<0?H2+360:H2);
  ctx.fillStyle='#666'; ctx.font='9px sans-serif'; ctx.textAlign='left';
  ctx.fillText('H:'+H2+'  S:'+S+'%  V:'+V+'%', bx+2, H-5);
}

function demoSeg(cv) { drawSeg(cv,120); }
function drawSeg(cv,T) {
  var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
  ctx.clearRect(0,0,W,H);
  var half=Math.floor(W/2)-3;
  for (var x=0;x<half;x++) for (var y=0;y<H-16;y++) {
    var d=Math.sqrt(Math.pow(x-half*.42,2)+Math.pow(y-(H-16)*.5,2));
    var n=Math.max(0,Math.min(255,255-d*3));
    ctx.fillStyle='rgb('+Math.round(n*.9)+','+Math.round(n*.7)+','+n+')';
    ctx.fillRect(x,y,1,1);
  }
  for (var x=half+6;x<W;x++) for (var y=0;y<H-16;y++) {
    var d=Math.sqrt(Math.pow(x-half-6-half*.42,2)+Math.pow(y-(H-16)*.5,2));
    var n=Math.max(0,Math.min(255,255-d*3));
    ctx.fillStyle=n>T?'#ede1ff':'#7c4dbe';
    ctx.fillRect(x,y,1,1);
  }
  ctx.fillStyle='rgba(0,0,0,.4)'; ctx.fillRect(0,H-16,W,16);
  ctx.fillStyle='#fff'; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
  ctx.fillText('Original',half/2,H-5);
  ctx.fillText('Umbral T='+T,half+6+(W-half-6)/2,H-5);
  ctx.strokeStyle='#fff'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(half+3,0); ctx.lineTo(half+3,H-16); ctx.stroke();
}

function demoLabel(cv) {
  var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#f5f0ff'; ctx.fillRect(0,0,W,H);
  var grid=[[0,1,1,0,0,0,1,1,1,0,0,1,0],[0,1,1,0,0,0,1,0,1,0,0,1,0],
            [0,1,1,0,0,0,1,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,0,0,1,0,0,0,0,1,1,1,0],[1,1,0,0,1,0,0,0,0,1,0,1,0],
            [0,0,0,0,1,0,0,0,0,1,1,1,0]];
  var lbs=grid.map(function(r){return r.map(function(){return 0;});}); var l=1;
  for (var r=0;r<7;r++) for (var c=0;c<13;c++) {
    if(grid[r][c]===1&&lbs[r][c]===0){
      var q=[[r,c]]; lbs[r][c]=l;
      while(q.length){
        var p=q.shift(),cr=p[0],cc=p[1];
        [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]].forEach(function(d){
          var nr=cr+d[0],nc=cc+d[1];
          if(nr>=0&&nr<7&&nc>=0&&nc<13&&grid[nr][nc]===1&&lbs[nr][nc]===0){lbs[nr][nc]=l;q.push([nr,nc]);}
        });
      } l++;
    }
  }
  var cols=['#f8a7c8','#c9a7f0','#a7c8f8','#ffd6a7','#b5ead7'];
  var cw=Math.floor(W/13), ch=Math.floor((H-16)/7);
  for (var r=0;r<7;r++) for (var c=0;c<13;c++) {
    ctx.fillStyle=grid[r][c]===0?'#e8e0f5':cols[(lbs[r][c]-1)%cols.length];
    ctx.fillRect(c*cw+1,r*ch+1,cw-1,ch-1);
    if(grid[r][c]===1){
      ctx.fillStyle='#fff'; ctx.font='bold 8px sans-serif'; ctx.textAlign='center';
      ctx.fillText(lbs[r][c],c*cw+cw/2,r*ch+ch/2+3);
    }
  }
  ctx.fillStyle='rgba(0,0,0,.4)'; ctx.fillRect(0,H-16,W,16);
  ctx.fillStyle='#fff'; ctx.font='9px sans-serif'; ctx.textAlign='center';
  ctx.fillText((l-1)+' componentes conexas \u2014 etiquetado V8',W/2,H-5);
}

function demoNoise(cv) {
  function draw(){
    var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
    ctx.clearRect(0,0,W,H);
    var pw=Math.floor(W/3)-2, lbls=['Limpia','Gaussiano','Sal & Pim.'];
    for (var p=0;p<3;p++) {
      var x0=p*(pw+3), img=ctx.createImageData(pw,H-16);
      for (var i=0;i<pw*(H-16);i++) {
        var px=i%pw, py=Math.floor(i/pw);
        var n=Math.round(80+90*Math.sin(px/pw*Math.PI)*Math.cos(py/(H-16)*Math.PI*1.4)+60);
        if(p===1){var g=(Math.random()+Math.random()+Math.random()-1.5)*38;n=Math.max(0,Math.min(255,n+g));}
        else if(p===2){var rv=Math.random();if(rv<.06)n=0;else if(rv<.12)n=255;}
        img.data[i*4]=Math.round(n*.9);img.data[i*4+1]=Math.round(n*.7+30);
        img.data[i*4+2]=n;img.data[i*4+3]=255;
      }
      ctx.putImageData(img,x0,0);
      ctx.fillStyle='rgba(0,0,0,.5)'; ctx.fillRect(x0,H-16,pw,16);
      ctx.fillStyle='#fff'; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
      ctx.fillText(lbls[p],x0+pw/2,H-5);
    }
  }
  draw(); noiseTimer=setInterval(draw,2000);
}

function demoOps(cv) {
  var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
  ctx.clearRect(0,0,W,H); ctx.fillStyle='#f5f0ff'; ctx.fillRect(0,0,W,H);
  var bw=68,bh=54,ax=8,ay=8,bx=W-bw-8,by=8;
  for (var y=0;y<bh;y++) for (var x=0;x<bw;x++) {
    ctx.fillStyle='rgb('+Math.round(200*x/bw+55)+','+Math.round(100*y/bh+80)+',180)';
    ctx.fillRect(ax+x,ay+y,1,1);
  }
  ctx.fillStyle='#c0487e'; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
  ctx.fillText('A',ax+bw/2,ay+bh+11);
  ctx.fillStyle='#7c4dbe'; ctx.font='bold 20px sans-serif'; ctx.fillText('+',W/2,ay+bh/2+8);
  for (var y=0;y<bh;y++) for (var x=0;x<bw;x++) {
    ctx.fillStyle='rgb(100,'+Math.round(180*(1-x/bw)+40)+','+Math.round(200*y/bh+55)+')';
    ctx.fillRect(bx+x,by+y,1,1);
  }
  ctx.fillStyle='#3a7dd4'; ctx.font='bold 10px sans-serif'; ctx.fillText('B',bx+bw/2,by+bh+11);
  var rx=Math.round((W-bw)/2), ry=H-bh-6;
  for (var y=0;y<bh;y++) for (var x=0;x<bw;x++) {
    ctx.fillStyle='rgb('+Math.min(255,Math.round((Math.round(200*x/bw+55)+100)/2))+',110,180)';
    ctx.fillRect(rx+x,ry+y,1,1);
  }
  ctx.fillStyle='#555'; ctx.font='bold 9px sans-serif'; ctx.fillText('h=(A+B)/2',rx+bw/2,ry-4);
  ctx.strokeStyle='#c9a7f0'; ctx.lineWidth=1.2; ctx.setLineDash([3,2]);
  ctx.beginPath(); ctx.moveTo(ax+bw/2,ay+bh+13); ctx.lineTo(rx+bw/2,ry); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bx+bw/2,by+bh+13); ctx.lineTo(rx+bw/2,ry); ctx.stroke();
  ctx.setLineDash([]);
}

// ── PANEL ─────────────────────────────────────────────────
function openPanel(key) {
  var d=DATA[key];

  // focus: dim todos, activa el clickeado
  document.querySelectorAll('.sn').forEach(function(n){ n.classList.add('dim'); n.classList.remove('active'); });
  var node=document.getElementById('n-'+key);
  if(node){ node.classList.remove('dim'); node.classList.add('active'); }
  document.getElementById('ms').classList.add('zoomed');

  // contenido
  document.getElementById('ptitle').textContent=d.t;
  document.getElementById('ptitle').style.color=d.tc;
  document.getElementById('punit').textContent=d.u;
  document.getElementById('pnl').style.borderLeftColor=d.c;

  var fEl=document.getElementById('pformula');
  fEl.style.background=d.c+'22'; fEl.style.color=d.tc; fEl.innerHTML=d.f;
  if(window.MathJax) MathJax.typesetPromise([fEl]);

  // sliders extra
  var ex=document.getElementById('pextra'); ex.innerHTML='';
  if(key==='color'){
    ex.innerHTML=
      "<div class='srow'><label>R</label><input type='range' min='0' max='255' value='180' id='sr'><span id='vr'>180</span></div>"+
      "<div class='srow'><label>G</label><input type='range' min='0' max='255' value='80'  id='sg'><span id='vg'>80</span></div>"+
      "<div class='srow'><label>B</label><input type='range' min='0' max='255' value='200' id='sb'><span id='vb2'>200</span></div>";
    setTimeout(function(){
      ['sr','sg','sb'].forEach(function(id){ document.getElementById(id).addEventListener('input',updC); });
    },50);
  } else if(key==='ai'){
    ex.innerHTML="<div class='srow'><label>T</label><input type='range' min='20' max='240' value='120' id='st'><span id='vt'>120</span></div>";
    setTimeout(function(){ document.getElementById('st').addEventListener('input',updS); },50);
  }

  document.getElementById('dlbl').textContent=d.dl;
  runDemo(key);

  var html='';
  for(var i=0;i<d.items.length;i++){
    html+="<div class='di'><div class='dd' style='background:"+d.c+"'></div>"+
          "<p><strong>"+d.items[i][0]+":</strong> "+d.items[i][1]+"</p></div>";
  }
  document.getElementById('pitems').innerHTML=html;

  document.getElementById('overlay').classList.add('show');
  document.getElementById('pnl').classList.add('show');
}

function closePanel() {
  stopAnims();
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('pnl').classList.remove('show');
  document.querySelectorAll('.sn').forEach(function(n){ n.classList.remove('dim','active'); });
  document.getElementById('ms').classList.remove('zoomed');
}

function updC() {
  var r=+document.getElementById('sr').value, g=+document.getElementById('sg').value, b=+document.getElementById('sb').value;
  document.getElementById('vr').textContent=r; document.getElementById('vg').textContent=g; document.getElementById('vb2').textContent=b;
  colorState.r=r; colorState.g=g; colorState.b=b;
  drawColor(document.getElementById('dc'));
}
function updS() {
  var t=+document.getElementById('st').value;
  document.getElementById('vt').textContent=t;
  drawSeg(document.getElementById('dc'),t);
}

// ── VISTA TARJETAS ────────────────────────────────────────
var bgm={img:'#fde2ef',hist:'#fde2ef',color:'#fde2ef',ai:'#ede1ff',eti:'#ede1ff',rui:'#ddeeff',ops:'#ddeeff'};
var bdb={img:'#f8a7c8',hist:'#f8a7c8',color:'#f8a7c8',ai:'#c9a7f0',eti:'#c9a7f0',rui:'#a7c8f8',ops:'#a7c8f8'};

function switchView(v) {
  document.getElementById('mapv').style.display   = v==='map'   ? 'block':'none';
  document.getElementById('cardsv').style.display = v==='cards' ? 'block':'none';
  document.getElementById('bmap').className   = 'btn'+(v==='map'   ?' on':'');
  document.getElementById('bcards').className = 'btn'+(v==='cards' ?' on':'');
  if(v==='cards') buildCards();
}

function buildCards() {
  var g=document.getElementById('cg');
  if(g.children.length>0) return;
  Object.keys(DATA).forEach(function(k){
    var d=DATA[k], div=document.createElement('div');
    div.className='cc';
    div.style.background=bgm[k]; div.style.borderColor=bdb[k];
    div.addEventListener('click',function(){openPanel(k);});
    var items=d.items.slice(0,5).map(function(i){return '<li>'+i[0]+'</li>';}).join('');
    div.innerHTML='<span class="ce">'+d.em+'</span>'+
      '<h3 style="color:'+d.tc+'">'+d.t+'</h3>'+
      '<span class="cu" style="color:'+d.tc+'bb">'+d.u+'</span>'+
      '<ul>'+items+'</ul>';
    g.appendChild(div);
  });
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // botones vista
  document.getElementById('bmap').addEventListener('click',   function(){ switchView('map'); });
  document.getElementById('bcards').addEventListener('click', function(){ switchView('cards'); });
  document.getElementById('overlay').addEventListener('click', closePanel);
  document.getElementById('pcl').addEventListener('click',    closePanel);

  // nodos principales — click con efecto pop
  var nodeMap = {
    'n-img':'img','n-hist':'hist','n-color':'color',
    'n-ai':'ai','n-eti':'eti','n-rui':'rui','n-ops':'ops'
  };
  Object.keys(nodeMap).forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.cursor = 'pointer';
    el.addEventListener('click', function() {
      // efecto visual de clic
      el.classList.add('clicked');
      setTimeout(function(){ el.classList.remove('clicked'); }, 450);
      openPanel(nodeMap[id]);
    });
  });

  // subnodos
  ['img','hist','color','ai','eti','rui','ops'].forEach(function(k) {
    document.querySelectorAll('.sub-'+k).forEach(function(el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function() { openPanel(k); });
    });
  });

  // tooltip
  var tip = document.getElementById('tooltip');
  document.querySelectorAll('[data-tip]').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      tip.textContent = el.getAttribute('data-tip') + ' \u2014 clic para ver';
      tip.classList.add('show');
    });
    el.addEventListener('mousemove', function(e) {
      tip.style.left = (e.clientX + 14) + 'px';
      tip.style.top  = (e.clientY - 38) + 'px';
    });
    el.addEventListener('mouseleave', function() { tip.classList.remove('show'); });
  });

  // Activar animacion de entrada DESPUES de registrar eventos
  var allNodes = document.querySelectorAll('.sn');
  allNodes.forEach(function(n, i){
    setTimeout(function(){ n.classList.add('anim-in'); }, i * 80);
  });
  // debug
  console.log('PDI OK - nodos con click:', document.querySelectorAll('.sn').length);
});
