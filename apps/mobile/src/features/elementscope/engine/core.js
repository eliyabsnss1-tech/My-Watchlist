// ElementScope engine, moved from https://eliyabsnss1-tech.github.io/elementscope/ (index.html) unchanged.
// Plain ES5 kept on purpose: it's large, already tested in the original app, and typed through core.d.ts.
/* ===== ELEMENT DATA (118) ===== */
var CAT={ak:{n:'Alkali metal',c:'#ff6b6b'},ae:{n:'Alkaline earth metal',c:'#ffa94d'},tm:{n:'Transition metal',c:'#4dabf7'},pt:{n:'Post-transition metal',c:'#51cf66'},md:{n:'Metalloid',c:'#38d9a9'},nm:{n:'Reactive nonmetal',c:'#ffd43b'},hl:{n:'Halogen',c:'#3bc9db'},ng:{n:'Noble gas',c:'#9775fa'},ln:{n:'Lanthanide',c:'#f783ac'},ac:{n:'Actinide',c:'#da77f2'}};
var RAW='H|Hydrogen|nm|1.008;He|Helium|ng|4.0026;Li|Lithium|ak|6.94;Be|Beryllium|ae|9.0122;B|Boron|md|10.81;C|Carbon|nm|12.011;N|Nitrogen|nm|14.007;O|Oxygen|nm|15.999;F|Fluorine|hl|18.998;Ne|Neon|ng|20.18;Na|Sodium|ak|22.99;Mg|Magnesium|ae|24.305;Al|Aluminium|pt|26.982;Si|Silicon|md|28.085;P|Phosphorus|nm|30.974;S|Sulfur|nm|32.06;Cl|Chlorine|hl|35.45;Ar|Argon|ng|39.948;K|Potassium|ak|39.098;Ca|Calcium|ae|40.078;Sc|Scandium|tm|44.956;Ti|Titanium|tm|47.867;V|Vanadium|tm|50.942;Cr|Chromium|tm|51.996;Mn|Manganese|tm|54.938;Fe|Iron|tm|55.845;Co|Cobalt|tm|58.933;Ni|Nickel|tm|58.693;Cu|Copper|tm|63.546;Zn|Zinc|tm|65.38;Ga|Gallium|pt|69.723;Ge|Germanium|md|72.63;As|Arsenic|md|74.922;Se|Selenium|nm|78.971;Br|Bromine|hl|79.904;Kr|Krypton|ng|83.798;Rb|Rubidium|ak|85.468;Sr|Strontium|ae|87.62;Y|Yttrium|tm|88.906;Zr|Zirconium|tm|91.224;Nb|Niobium|tm|92.906;Mo|Molybdenum|tm|95.95;Tc|Technetium|tm|98;Ru|Ruthenium|tm|101.07;Rh|Rhodium|tm|102.91;Pd|Palladium|tm|106.42;Ag|Silver|tm|107.87;Cd|Cadmium|tm|112.41;In|Indium|pt|114.82;Sn|Tin|pt|118.71;Sb|Antimony|md|121.76;Te|Tellurium|md|127.6;I|Iodine|hl|126.9;Xe|Xenon|ng|131.29;Cs|Caesium|ak|132.91;Ba|Barium|ae|137.33;La|Lanthanum|ln|138.91;Ce|Cerium|ln|140.12;Pr|Praseodymium|ln|140.91;Nd|Neodymium|ln|144.24;Pm|Promethium|ln|145;Sm|Samarium|ln|150.36;Eu|Europium|ln|151.96;Gd|Gadolinium|ln|157.25;Tb|Terbium|ln|158.93;Dy|Dysprosium|ln|162.5;Ho|Holmium|ln|164.93;Er|Erbium|ln|167.26;Tm|Thulium|ln|168.93;Yb|Ytterbium|ln|173.05;Lu|Lutetium|ln|174.97;Hf|Hafnium|tm|178.49;Ta|Tantalum|tm|180.95;W|Tungsten|tm|183.84;Re|Rhenium|tm|186.21;Os|Osmium|tm|190.23;Ir|Iridium|tm|192.22;Pt|Platinum|tm|195.08;Au|Gold|tm|196.97;Hg|Mercury|tm|200.59;Tl|Thallium|pt|204.38;Pb|Lead|pt|207.2;Bi|Bismuth|pt|208.98;Po|Polonium|pt|209;At|Astatine|hl|210;Rn|Radon|ng|222;Fr|Francium|ak|223;Ra|Radium|ae|226;Ac|Actinium|ac|227;Th|Thorium|ac|232.04;Pa|Protactinium|ac|231.04;U|Uranium|ac|238.03;Np|Neptunium|ac|237;Pu|Plutonium|ac|244;Am|Americium|ac|243;Cm|Curium|ac|247;Bk|Berkelium|ac|247;Cf|Californium|ac|251;Es|Einsteinium|ac|252;Fm|Fermium|ac|257;Md|Mendelevium|ac|258;No|Nobelium|ac|259;Lr|Lawrencium|ac|266;Rf|Rutherfordium|tm|267;Db|Dubnium|tm|268;Sg|Seaborgium|tm|269;Bh|Bohrium|tm|270;Hs|Hassium|tm|277;Mt|Meitnerium|tm|278;Ds|Darmstadtium|tm|281;Rg|Roentgenium|tm|282;Cn|Copernicium|tm|285;Nh|Nihonium|pt|286;Fl|Flerovium|pt|289;Mc|Moscovium|pt|290;Lv|Livermorium|pt|293;Ts|Tennessine|hl|294;Og|Oganesson|ng|294';
var ELEMENTS=RAW.split(';').map(function(s,i){var a=s.split('|');return{z:i+1,sym:a[0],name:a[1],cat:a[2],mass:+a[3]};});
var EL={},EL_BY_NAME={};
ELEMENTS.forEach(function(e){EL[e.sym]=e;EL_BY_NAME[e.name.toLowerCase()]=e;});
EL_BY_NAME.aluminum=EL.Al;EL_BY_NAME.sulphur=EL.S;EL_BY_NAME.cesium=EL.Cs;
var METAL={ak:1,ae:1,tm:1,pt:1,ln:1,ac:1};
function isMetal(s){return !!METAL[EL[s].cat];}
function pos(z){ // [row,col] in the standard table; rows 9/10 = f-block
 if(z===1)return[1,1];if(z===2)return[1,18];
 if(z<=4)return[2,z-2];if(z<=10)return[2,z+8];
 if(z<=12)return[3,z-10];if(z<=18)return[3,z];
 if(z<=36)return[4,z-18];if(z<=54)return[5,z-36];
 if(z<=56)return[6,z-54];if(z<=71)return[9,z-54];if(z<=86)return[6,z-68];
 if(z<=88)return[7,z-86];if(z<=103)return[10,z-86];return[7,z-100];}
var GAS={H:1,He:1,N:1,O:1,F:1,Ne:1,Cl:1,Ar:1,Kr:1,Xe:1,Rn:1},LIQ={Br:1,Hg:1};
var DIATOMIC={H:'H₂',N:'N₂',O:'O₂',F:'F₂',Cl:'Cl₂',Br:'Br₂',I:'I₂'};
var ELEM_INFO={H:'Water, all living tissue, fuels, acids; ~73% of the Sun by mass',He:'Balloons, MRI coolant, welding gas, natural-gas wells',Li:'Rechargeable batteries, ceramics and glass, lubricating grease',Be:'Aerospace alloys, X-ray windows, the gem emerald',B:'Borosilicate (Pyrex) glass, borax, detergents, chip doping',C:'All living things, plastics, fuels, steel, diamond, graphite, carbonates',N:'78% of air, proteins and DNA, fertiliser',O:'21% of air, water, and ~46% of Earth\'s crust (in rocks)',F:'Toothpaste fluoride, Teflon (PTFE), refrigerants',Ne:'Neon signs, lasers, trace gas in air',Na:'Table salt, glass, soap, body fluids',Mg:'Chlorophyll, light alloys, antacids, bones',Al:'Cans, foil, aircraft and phone frames, clays and feldspar',Si:'Sand, glass, ceramics, computer chips, solar cells, silicone',P:'DNA, bones and teeth, fertiliser, matches, ATP energy',S:'Rubber vulcanising, sulfuric acid, proteins, eggs, volcanoes',Cl:'Salt, bleach, PVC plastic, pool water, stomach acid',Ar:'1% of air, light bulbs, welding shield gas',K:'Bananas, fertiliser, nerves and muscles, feldspar minerals',Ca:'Bones, teeth, limestone, chalk, cement, milk, shells',Ti:'White paint (TiO₂), sunscreen, implants, aircraft frames',V:'Tool steels, flow batteries',Cr:'Stainless steel, chrome plating, the red of rubies',Mn:'Steel hardener, alkaline batteries',Fe:'Steel, blood haemoglobin, magnets, rust, Earth\'s core',Co:'Li-ion battery cathodes, blue pigments, vitamin B12',Ni:'Stainless steel, coins, rechargeable batteries, plating',Cu:'Wires, plumbing, circuit boards, coins, brass and bronze',Zn:'Galvanised steel, brass, batteries, sunscreen, enzymes',Ga:'LEDs (GaN), phone chips, melts in your hand',Ge:'Fibre optics, infrared lenses, early transistors',As:'Semiconductors (GaAs), old wood preservatives',Se:'Solar cells, glass decolouring, antioxidant enzymes',Br:'Flame retardants, seawater, photography',Kr:'Photo flashes, high-performance lamps',Zr:'Nuclear fuel cladding, ceramics, cubic zirconia',Mo:'Steel alloys (316 stainless), lubricants',Pd:'Catalytic converters, electronics, hydrogen filters',Ag:'Jewellery, mirrors, solder, electronics, solar cells',Sn:'Solder, tin-plated cans, bronze, pewter',Sb:'Flame retardants, lead-acid battery alloys',I:'Iodised salt, thyroid hormone, antiseptics',Xe:'HID headlights, ion thrusters, anaesthetic',Cs:'Atomic clocks, drilling fluids',Ba:'X-ray contrast meals, green fireworks, drilling mud',Nd:'Strong magnets in speakers, motors, headphones, wind turbines',W:'Bulb filaments, drill bits, welding electrodes',Pt:'Catalytic converters, jewellery, lab ware, fuel cells',Au:'Jewellery, electronics contacts, coins, dentistry',Hg:'Old thermometers, fluorescent lamps, dental amalgam',Pb:'Car batteries, radiation shielding, old pipes and paint',Rn:'Radioactive gas seeping from soil and granite into basements',U:'Nuclear fuel, trace amounts in granite and soil'};
var GEN_INFO={ak:'Soft, very reactive metal — never found pure in nature; lives in salts, minerals and body fluids.',ae:'Reactive metal found in minerals, rocks, bones and seawater, never pure in nature.',tm:'Hard, dense metal used in alloys, catalysts, pigments and electronics.',pt:'Soft, low-melting metal used in alloys, solders, batteries and electronics.',md:'Semiconducting element found in minerals, chips, glass and alloys.',nm:'Non-metal essential in living things, plastics, fuels and minerals.',hl:'Very reactive non-metal found in salts, disinfectants and plastics.',ng:'Inert gas — forms almost no compounds; trace amounts in air or natural gas.',ln:'Rare-earth metal used in magnets, lasers, phosphors and glass polishing.',ac:'Radioactive heavy metal found in uranium/thorium ores or made in reactors.'};
function elemInfo(e){if(ELEM_INFO[e.sym])return ELEM_INFO[e.sym];if(e.z>=104)return'Synthetic super-heavy element made in particle accelerators; it exists for only fractions of a second.';if(e.z>=93||e.sym==='Tc'||e.sym==='Pm')return'Synthetic/radioactive element, made in reactors or accelerators; not found in everyday materials.';return GEN_INFO[e.cat];}
function elemState(e){return GAS[e.sym]?'gas':LIQ[e.sym]?'liquid':e.z>=104?'unknown (synthetic)':'solid';}
/* ===== FORMULA PARSER & ANALYSER ===== */
var SUBD='₀₁₂₃₄₅₆₇₈₉',SUPD={'+':'⁺','-':'⁻','1':'','2':'²','3':'³','4':'⁴'};
function cleanF(s){return s.replace(/[₀-₉]/g,function(c){return SUBD.indexOf(c);}).replace(/[•*⋅∙]/g,'·').replace(/\s+/g,'');}
function parseGroup(str){
 var i=0;
 function num(){var j=i;while(i<str.length&&/\d/.test(str[i]))i++;return i>j?parseInt(str.slice(j,i),10):1;}
 function seq(close){
  var m={};
  while(i<str.length){
   var ch=str[i];
   if(ch===close){i++;return m;}
   if(ch==='('||ch==='['||ch==='{'){i++;var inner=seq(ch==='('?')':ch==='['?']':'}');var n=num();for(var k in inner)m[k]=(m[k]||0)+inner[k]*n;}
   else if(/[A-Z]/.test(ch)){var sym=ch;if(/[a-z]/.test(str[i+1]||'')&&EL[ch+str[i+1]]){sym=ch+str[i+1];i+=2;}else if(EL[ch]){i++;}else throw new Error('bad');var c=num();m[sym]=(m[sym]||0)+c;}
   else throw new Error('bad');
  }
  if(close)throw new Error('unclosed');
  return m;}
 return seq(null);}
function parseFormula(raw){
 try{
  var s=cleanF(raw).replace(/\((aq|s|l|g)\)$/,'');
  if(!s||!/^[A-Za-z0-9()\[\]{}·.]+$/.test(s))return null;
  var parts=s.split(/[·.]/).filter(Boolean),tot={},hyd=false;
  parts.forEach(function(p,idx){var mm=p.match(/^(\d+)(.*)$/),mult=1;if(mm){mult=+mm[1];p=mm[2];}if(!p)throw new Error('empty');var g=parseGroup(p);for(var k in g)tot[k]=(tot[k]||0)+g[k]*mult;if(idx>0)hyd=true;});
  var keys=Object.keys(tot);if(!keys.length)return null;
  return{counts:tot,hydrate:hyd};
 }catch(e){return null;}}
function canon(counts){return Object.keys(counts).sort().map(function(k){return k+counts[k];}).join('');}
var C1={h:1,c:1,n:1,o:1,s:1,p:1,f:1,k:1,i:1,b:1,v:.3,w:.3,y:.3,u:.3};
var C2={cl:2.2,na:2.2,ca:2.2,mg:2.2,al:2.2,si:2.2,fe:2.2,cu:2.2,zn:2.2,br:2.2,ag:2.2,au:2.2,pb:2.2,sn:2.2,li:2.2,mn:2.2,cr:2.2,ni:2.2,ti:2.2,ba:2.2,hg:2.2,ar:2.2,he:2.2,ne:2.2,pt:2.2,sr:2.2,rb:2.2,ra:2.2,kr:2.2,xe:2.2,as:2.2,se:2.2,ge:2.2,ga:2.2,cd:2.2};
function segRun(r){
 var best=[0],prev=[-1];
 for(var i=1;i<=r.length;i++){best[i]=-1e9;
  var a=r[i-1];if(EL[a.toUpperCase()]&&best[i-1]>-1e8){var sc=best[i-1]+(C1[a]||.4);if(sc>best[i]){best[i]=sc;prev[i]=1;}}
  if(i>=2){var b=r.slice(i-2,i);if(EL[b[0].toUpperCase()+b[1]]&&best[i-2]>-1e8){var s2=best[i-2]+(C2[b]||.4);if(s2>best[i]){best[i]=s2;prev[i]=2;}}}}
 if(best[r.length]<-1e8)return null;
 var out=[],i2=r.length;while(i2>0){var l=prev[i2];var t=r.slice(i2-l,i2);out.unshift(t[0].toUpperCase()+t.slice(1));i2-=l;}
 return out.join('');}
function smartCase(c){
 var runs=c.match(/[a-z]+|[^a-z]+/g)||[],out='';
 for(var i=0;i<runs.length;i++){if(/^[a-z]/.test(runs[i])){var s=segRun(runs[i]);if(!s)return null;out+=s;}else out+=runs[i];}
 return out;}
var COMMON_LOWER={nacl:'NaCl',hcl:'HCl',naoh:'NaOH',koh:'KOH',kcl:'KCl',hbr:'HBr',cao:'CaO',mgo:'MgO',zno:'ZnO',cuo:'CuO',hcn:'HCN',agcl:'AgCl',nabr:'NaBr',ki:'KI',co:'CO',hf:'HF',nai:'NaI',feo:'FeO',sic:'SiC'};
function tryFormula(raw){
 var c=cleanF(raw.trim());
 if(!/^[A-Za-z0-9()\[\]{}·.]+$/.test(c)||!/[A-Za-z]/.test(c))return null;
 var hasD=/\d/.test(c),f=null,lc=c.toLowerCase();
 if(!hasD&&COMMON_LOWER[lc])f=COMMON_LOWER[lc];
 else if(c===lc){if(!hasD)return null;f=smartCase(c);}
 else{if(!hasD&&/^[A-Z]+$/.test(c)&&c.length>4)return null;if(/^[A-Z][a-z]+$/.test(c)&&!EL[c])return null;f=c;}
 if(!f)return null;
 var p=parseFormula(f);if(!p)return null;
 if(Object.keys(p.counts).length===1&&!hasD&&!p.hydrate)return null;
 return{formula:f,counts:p.counts,hydrate:p.hydrate};}
function fmtF(f){return esc(f).replace(/([A-Za-z)\]])(\d+)/g,'$1<sub>$2</sub>');}
function subTxt(f){return f.replace(/(\d)/g,function(d){return SUBD[+d];});}
function sup(n){var a=Math.abs(n);return(a===1?'':String(a).replace(/\d/g,function(d){return'⁰¹²³⁴⁵⁶⁷⁸⁹'[+d];}))+(n>0?'⁺':'⁻');}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

var IONS=[['HCO3','bicarbonate',-1,/HCO3(?![a-z])/],['CO3','carbonate',-2,/CO3(?![a-z])/],['SO4','sulfate',-2,/SO4(?![a-z])/],['NO3','nitrate',-1,/NO3(?![a-z])/],['PO4','phosphate',-3,/PO4(?![a-z])/],['OH','hydroxide',-1,/OH(?![a-z0-9])/],['NH4','ammonium',1,/NH4(?![a-z])/],['ClO','hypochlorite',-1,/ClO(?![a-z0-9])/],['MnO4','permanganate',-1,/MnO4(?![a-z])/]];
var ANION={O:-2,S:-2,Se:-2,F:-1,Cl:-1,Br:-1,I:-1,N:-3,P:-3};
function ionicCtx(counts,src){
 var ions=[],hasHCO3=false;
 IONS.forEach(function(I){if(I[0]==='CO3'&&hasHCO3)return;if(I[3].test(src)){ions.push({f:I[0],name:I[1],ch:I[2],els:Object.keys(parseFormula(I[0]).counts)});if(I[0]==='HCO3')hasHCO3=true;}});
 var metals=Object.keys(counts).filter(isMetal),charge={};
 if(!ions.length&&metals.length===1){var neg=0;for(var k in counts)if(!isMetal(k)){if(ANION[k]===undefined){neg=null;break;}neg+=ANION[k]*counts[k];}
  if(neg!==null&&neg!==0){var z=-neg/counts[metals[0]];charge[metals[0]]=(z===Math.round(z))?z:'mixed';}}
 return{ions:ions,metals:metals,charge:charge};}
function typicalCharge(s){var e=EL[s];if(e.cat==='ak')return 1;if(e.cat==='ae')return 2;return{Al:3,Zn:2,Ag:1,Cd:2,Ga:3}[s]||null;}
var ORG={H:['On the outer edge of each molecule, bonded to C, O or N atoms','Terminal atoms that complete the bonding of heavier atoms'],C:['In the central skeleton (chain or ring) of every molecule','Backbone atom — bonds to up to four neighbours'],O:['As –OH, C=O or bridging links attached to the carbon skeleton','Functional-group atom: makes the molecule polar and reactive'],N:['In amine/amide-type groups attached to the skeleton','Functional-group atom (proteins, DNA bases, dyes)'],S:['In sulfur-containing groups on the molecule','Cross-links and reactive sites'],P:['In phosphate groups attached to the molecule','Energy-carrying/bonding group'],Cl:['As side atoms attached to carbon','Heavy halogen substituent'],F:['As side atoms attached to carbon','Very strong, inert C–F bonds'],Br:['As side atoms attached to carbon','Heavy halogen substituent'],Si:['In Si–O or Si–C links of the skeleton','Skeleton atom like carbon but with Si–O flexibility'],Mg:['At the centre of the ring system of the molecule','Metal ion held by the ring']};
function rolesFor(kind,counts,src,sym,ctx,hyd){
 var n=counts[sym],r;
 if(kind==='ionic'){
  var ion=ctx.ions.filter(function(i){return i.els.indexOf(sym)>=0;})[0];
  if(ion&&!isMetal(sym))r=['Inside the '+ion.name+' ('+subTxt(ion.f)+sup(ion.ch)+') groups — covalently bonded clusters that behave as one ion','Part of the '+ion.name+' ion'];
  else if(isMetal(sym)){var z=ctx.charge[sym];if(z===undefined)z=typicalCharge(sym);var ct=(z==='mixed')?' (mixed charges)':(z?' ('+sym+sup(z)+')':'');r=['Everywhere in the crystal lattice as positive ions'+ct+', each surrounded by oppositely-charged neighbours','Cation — balances the negative ions and sets the lattice charge'];}
  else{var an=ANION[sym];r=['Throughout the lattice as negative ions'+(an?' ('+sym+sup(an)+')':'')+' that sit between the metal ions','Anion — pulls the crystal together through electrostatic attraction'];}
  if(hyd&&(sym==='H'||sym==='O'))r[0]+='; also in the water molecules trapped inside the crystal (water of hydration)';
  return r;}
 if(kind==='metallic')return['Every atom is '+EL[sym].name.toLowerCase()+' — packed in a regular lattice','Shares a "sea" of free electrons: conducts heat and electricity'];
 if(kind==='atomic')return['Single unbonded atoms drifting freely','Inert — does not bond with other atoms'];
 if(kind==='alloy')return['Atoms mixed evenly through the metal lattice','Alloying metal that tunes strength and hardness'];
 if(kind==='network')return['Every atom bonded to neighbours in one continuous covalent network (one giant molecule)','Network-forming atom — gives hardness and high melting point'];
 if(kind==='polymer'){
  if(sym==='C')return['Along the backbone of very long chain molecules','Backbone atom of the polymer chain'];
  if(sym==='H')return['Hanging off the carbon backbone along every chain','Side atoms that fill the carbon bonds'];
  if(sym==='O')return['In ester/ether/carbonyl links along or off the chain','Polar link that adds stiffness and adhesion'];
  if(sym==='N')return['In amide/nitrile/amine groups on or in the chain','Strong hydrogen-bonding link between chains'];
  return['As side groups attached along the carbon chain','Side group that sets the plastic\'s properties'];}
 if(kind==='organic'&&ORG[sym])return ORG[sym];
 if(ORG[sym]&&kind==='molecular'&&/[CH]/.test(Object.keys(counts).join('')))return ORG[sym];
 return['Covalently bonded inside every molecule ('+n+' atom'+(n>1?'s':'')+' per formula unit)','Shares electrons with its neighbours to hold the molecule together'];}
function classify(counts,src){
 var syms=Object.keys(counts),metals=syms.filter(isMetal),non=syms.filter(function(s){return!isMetal(s);});
 if(syms.length===1){var s=syms[0];if(EL[s].cat==='ng')return'atomic';if(isMetal(s))return'metallic';return counts[s]>1?'molecular':'network';}
 if(/NH4(?![a-z])/.test(src)&&syms.length>2)return'ionic';
 if(metals.length&&non.length)return'ionic';
 if(metals.length>1&&!non.length)return'alloy';
 if(/^(SiO2|SiC|BN|B4C|Si3N4)$/.test(src.replace(/\s/g,'')))return'network';
 if(counts.C&&counts.H)return'organic';
 return'molecular';}
function genArrange(kind,counts,ctx,total,hyd){
 var syms=Object.keys(counts),ratio=syms.map(function(s){return s+' '+counts[s];}).join(' : ');
 if(kind==='ionic'){var txt='Ionic compound: positive ions ('+ctx.metals.join(', ')+(ctx.ions.some(function(i){return i.f==='NH4';})?', NH₄⁺':'')+') and negative ions attract each other and pack into a repeating 3-D crystal lattice. There are no separate molecules; the formula gives the simplest ion ratio ('+ratio+').';
  if(ctx.ions.length)txt+=' Inside the lattice, '+ctx.ions.map(function(i){return i.name+' ('+subTxt(i.f)+sup(i.ch)+')';}).join(' and ')+' act as single covalently-bonded units.';
  if(hyd)txt+=' Water molecules are trapped between the ions (a hydrate).';return txt;}
 if(kind==='organic')return'Organic (carbon-based) molecule with '+total+' atoms: carbon atoms form the skeleton, hydrogen atoms sit around the outside, and any O/N/S atoms form functional groups. Atom ratio '+ratio+'.';
 if(kind==='molecular')return'Covalent molecule: atoms share electrons and are joined into discrete molecules of '+total+' atoms each ('+ratio+').';
 if(kind==='network')return'Covalent network solid: atoms are bonded in one continuous 3-D (or layered) network — effectively one giant molecule.';
 if(kind==='metallic')return'Metal: atoms sit in a regular lattice and share a "sea" of free electrons.';
 if(kind==='atomic')return'Noble gas: single atoms that do not bond with each other.';
 if(kind==='polymer')return'Polymer: very long chains built by repeating the unit shown ('+ratio+'). Chains tangle and cling together to make the solid material.';
 return'Metal alloy / intermetallic: different metal atoms mixed in one lattice ('+ratio+').';}
var STRUCT_RAW=[
['H2O','Bent (V-shaped) molecule: one O in the centre with two H attached about 104.5° apart. Hydrogen bonds between neighbouring molecules keep water liquid at room temperature.',{H:'The two "arms" of the V — each bonded to the oxygen|Donate hydrogen bonds; make water polar',O:'Centre of every water molecule|Pulls electrons toward itself — makes up ~89% of the mass'}],
['CO2','Linear molecule O=C=O: carbon in the middle with a double bond to an oxygen at each end. Non-polar, so it is a gas at room temperature.',{C:'Middle of the line|Central atom double-bonded to both oxygens',O:'One at each end of the molecule|Terminal atoms; they absorb infrared heat (greenhouse gas)'}],
['SiO2','Giant covalent network: every Si sits at the centre of a tetrahedron of 4 O atoms, and each O bridges two Si atoms (hence 1 Si : 2 O). This is quartz and sand — and, when disordered, glass.',{Si:'Centre of each SiO₄ tetrahedron|Network skeleton — gives hardness',O:'Bridging between two Si atoms|Links the tetrahedra together'}],
['ClNa','Rock-salt cubic lattice: each Na⁺ is surrounded by six Cl⁻ and each Cl⁻ by six Na⁺, repeating in every direction — which is why salt crystals are tiny cubes.',{Na:'Na⁺ ions at alternating lattice points, with 6 Cl⁻ neighbours|Cation (positive ion)',Cl:'Cl⁻ ions at alternating lattice points, with 6 Na⁺ neighbours|Anion (negative ion)'}],
['C6H12O6','Glucose: a ring of 5 carbons and 1 oxygen with an –OH group on most carbons plus a CH₂OH tail. The C:H:O ratio is 1:2:1.',{C:'The ring skeleton (5 carbons) and the CH₂OH tail carbon|Backbone and energy-rich bonds',H:'Around the outside, on carbons and in the –OH groups|Outer atoms; the –OH hydrogens make it dissolve in water',O:'One inside the ring, the rest in –OH groups on the outside|Make glucose polar and water-soluble'}],
['Fe2O3','Oxide lattice (corundum type): Fe³⁺ ions sit in the gaps of a close-packed framework of O²⁻ ions. This is haematite and the main compound in red-brown rust.',{Fe:'Fe³⁺ ions in the gaps between oxygen ions|Gives the red-brown colour',O:'The close-packed O²⁻ framework|Holds the structure together (~30% of mass)'}],
['CH4','Tetrahedral molecule: one C in the middle bonded to four H atoms at the corners (109.5°). A non-polar gas.',{C:'Centre of the tetrahedron|Central atom',H:'Four H at the corners|Outer atoms; burn to make water'}],
['H3N','Pyramid-shaped molecule: N at the top, three H forming the base, and a lone electron pair pointing up.',{N:'Top of the pyramid|Lone pair makes ammonia a base',H:'Three H at the base|Outer atoms'}],
['O2','Diatomic molecule: two oxygen atoms joined by a double bond (O=O) — the gas you breathe.',{O:'Both atoms are oxygen: every molecule is O=O|Respiration and burning'}],
['N2','Diatomic molecule with a very strong triple bond (N≡N), which is why nitrogen gas is so unreactive — it makes up 78% of air.',{N:'Both atoms in each N≡N molecule|Inert filler gas'}],
['H2','Two H atoms joined by a single bond: the lightest molecule of all.',{H:'Both atoms in each H–H molecule|Fuel / reducing agent'}],
['O3','Ozone: a bent molecule of three oxygen atoms; in the stratosphere it absorbs UV light.',{O:'All three atoms in each bent molecule|Absorbs ultraviolet radiation'}],
['CCaO3','Ionic lattice of Ca²⁺ ions alternating with carbonate (CO₃²⁻) groups. In each carbonate, C sits in the middle of a flat triangle of 3 O. This is calcite — limestone, marble, chalk and shells.',{Ca:'Ca²⁺ ions between the carbonate groups|Cation, ~40% of the mass',C:'Centre of each flat triangular CO₃ group|Central atom of carbonate',O:'Three O at the corners of every carbonate triangle|Form the carbonate group; ~48% of the mass'}],
['CHNaO3','Ionic: Na⁺ ions alternate with bicarbonate (HCO₃⁻) groups; the H is attached to one oxygen of the triangle.',{Na:'Na⁺ ions between bicarbonate groups|Cation',C:'Centre of each HCO₃⁻ group|Central atom',H:'Attached to one oxygen in each bicarbonate|Makes it slightly acidic — it releases CO₂ with acid',O:'Three O around the carbon|Part of bicarbonate'}],
['H2O2','H–O–O–H: two OH units joined through a weak O–O (peroxide) bond in a skewed shape, which is why it breaks down easily into water and oxygen.',{H:'One on each end of the molecule|Outer atoms',O:'The two middle atoms, bonded to each other|Weak O–O bond makes it an oxidiser'}],
['C2H6O','Ethanol: CH₃–CH₂–OH — a two-carbon chain with an –OH group at one end.',{C:'The two-carbon chain|Backbone',H:'Five on the carbons and one on the oxygen|Outer atoms',O:'The –OH group at the end of the chain|Makes it mix with water'}],
['C12H22O11','Sucrose: a glucose ring joined to a fructose ring through an oxygen bridge. Many –OH groups make it very water-soluble.',{C:'Two ring skeletons plus side carbons|Backbone',H:'Outside the rings and in –OH groups|Outer atoms',O:'Ring oxygens, the bridge between rings and many –OH groups|Water-loving groups'}],
['CaO','Ionic rock-salt lattice of Ca²⁺ and O²⁻ — quicklime.',{Ca:'Ca²⁺ at alternate lattice sites|Cation',O:'O²⁻ at alternate lattice sites|Anion'}],
['Al2O3','Close-packed O²⁻ framework with Al³⁺ ions filling two-thirds of the gaps — corundum (rubies, sapphires, sandpaper).',{Al:'Al³⁺ in the gaps of the oxygen framework|Cation',O:'The close-packed oxygen framework|Anion framework'}],
['MgO','Ionic rock-salt lattice of Mg²⁺ and O²⁻.',{Mg:'Mg²⁺ at alternate lattice sites|Cation',O:'O²⁻ at alternate lattice sites|Anion'}],
['O2Ti','Rutile lattice: each Ti⁴⁺ is surrounded by 6 O²⁻ and each O by 3 Ti. The brightest white pigment known.',{Ti:'Ti⁴⁺ in the centre of oxygen octahedra|Cation',O:'O²⁻ ions bridging between titanium ions|Anion'}],
['HNaO','Ionic: Na⁺ ions alternate with hydroxide (OH⁻) groups in a lattice — caustic soda.',{Na:'Na⁺ between hydroxide ions|Cation',O:'In each OH⁻ group|Oxygen end of hydroxide',H:'Attached to the oxygen in each OH⁻|Hydrogen end of hydroxide'}],
['ClH','Diatomic polar molecule H–Cl. Dissolved in water it becomes hydrochloric acid.',{H:'One end of the H–Cl molecule|Gives up as H⁺ in water',Cl:'Other end of the molecule|Pulls the shared electrons'}],
['H2O4S','Sulfuric acid: S at the centre of a tetrahedron with two double-bonded O and two –OH groups.',{S:'Centre of the tetrahedron|Central atom',O:'Four around the sulfur: two S=O and two –OH|Create the strong acid groups',H:'On the two –OH groups|Released as H⁺ in water'}],
['CO','Carbon monoxide: C≡O triple-bonded diatomic molecule. Toxic gas from incomplete burning.',{C:'One end of the molecule|Binds to haemoglobin',O:'Other end of the molecule|Shares a triple bond with carbon'}],
['Fe3O4','Magnetite: spinel lattice with Fe²⁺ and Fe³⁺ ions in the gaps of a close-packed O²⁻ framework. It is magnetic.',{Fe:'Both Fe²⁺ and Fe³⁺ in the gaps of the oxygen framework|Gives magnetism',O:'The close-packed O²⁻ framework|Holds the structure'}],
['C3H8','Propane: a chain of three carbons carrying eight hydrogens (CH₃–CH₂–CH₃). A gas that liquefies under mild pressure.',{C:'The three-carbon chain|Backbone',H:'Eight H around the outside of the chain|Outer atoms'}],
['ClK','Rock-salt lattice of K⁺ and Cl⁻ ions, like table salt but with potassium.',{K:'K⁺ at alternate lattice sites|Cation',Cl:'Cl⁻ at alternate lattice sites|Anion'}]];
var STRUCT={};
function buildStruct(){STRUCT_RAW.forEach(function(r){var p=parseFormula(r[0]);STRUCT[canon(p.counts)]={arrange:r[1],where:r[2]};});}
function analyzeFormula(src,o){
 o=o||{};var p=parseFormula(src);if(!p)return null;var counts=p.counts,syms=Object.keys(counts),mass=0,total=0;
 syms.forEach(function(s){mass+=counts[s]*EL[s].mass;total+=counts[s];});
 var kind=o.kind||classify(counts,src),ctx=kind==='ionic'?ionicCtx(counts,src):{ions:[],metals:[],charge:{}};
 var st=STRUCT[canon(counts)],comp=syms.map(function(s){
  var w=(o.where&&o.where[s])||(st&&st.where[s]),pair=w?w.split('|'):rolesFor(kind,counts,src,s,ctx,p.hydrate);
  return{sym:s,count:counts[s],pct:counts[s]*EL[s].mass/mass*100,atomPct:counts[s]/total*100,where:pair[0],role:pair[1]||''};});
 comp.sort(function(a,b){return b.pct-a.pct;});
 var ratio=Object.keys(counts).map(function(s){return s+'<sub>'+counts[s]+'</sub>';}).join('');
 return{comp:comp,mass:mass,kind:kind,hasAtoms:true,total:total,formula:src,
  arrange:o.arrange||(st&&!o.kind?st.arrange:null)||(st?st.arrange:null)||genArrange(kind,counts,ctx,total,p.hydrate),counts:counts};}
function normalizeComp(c){var t=0;c.forEach(function(x){t+=x.pct;});c.forEach(function(x){x.pct=x.pct/t*100;});return c;}
function parseLines(txt){return txt.trim().split('\n').map(function(l){var a=l.split('|').map(function(x){return x.trim();});if(!EL[a[0]])throw new Error('Bad symbol '+a[0]+' in '+l);return{sym:a[0],pct:+a[1],where:a[2]||'',role:a[3]||''};});}
function mixComp(mix,phase){
 var tot=0,acc={};mix.forEach(function(m){tot+=m[1];});
 mix.forEach(function(m){var a=analyzeFormula(m[0],{kind:'molecular'});a.comp.forEach(function(c){var o=acc[c.sym]||(acc[c.sym]={pct:0,l:[]});o.pct+=m[1]/tot*c.pct;o.l.push((m[2]||m[0])+' ('+(m[1]/tot*100>=10?(m[1]/tot*100).toFixed(0):(m[1]/tot*100).toFixed(1))+'% of the mix)');});});
 var pre={liquid:'Mixed evenly through the whole liquid',gas:'Evenly mixed throughout the gas (gases mix completely)',solid:'Mixed through the material'}[phase||'liquid'];
 return Object.keys(acc).map(function(s){return{sym:s,pct:acc[s].pct,where:pre+' — as part of '+acc[s].l.join(', '),role:'Component of '+acc[s].l.map(function(x){return x.split(' (')[0];}).join(' and ')};}).sort(function(a,b){return b.pct-a.pct;});}
/* ===== KNOWN ITEMS (exact + keyword) ===== */
var ITEMS=[];
function add(o){ITEMS.push(o);}
add({title:'Pencil',label:'Everyday object',names:['pencil','lead pencil','graphite pencil','wooden pencil','hb pencil'],
summary:'A wooden pencil: a graphite-and-clay core inside a cedar casing, topped by a brass band and a rubber eraser.',
comp:'C|52|Graphite core (stacked carbon sheets), plus cellulose in the wood and the lacquer coat|Leaves the grey mark; builds the wood\nO|32|Wood casing (cellulose, lignin), clay binder in the core, eraser filler, paint|Part of wood polymers and mineral clay\nH|6|Wood fibres, lacquer and the rubber eraser|Bonded to carbon in organic polymers\nSi|4|Clay mixed through the graphite core; pumice grit in the eraser|Binder that sets the hardness (HB, 2B…)\nAl|2|Clay in the core|Part of the clay binder\nCu|1.2|Brass ferrule — the metal band holding the eraser|Main metal in brass\nZn|0.8|Brass ferrule|Alloy partner of copper\nTi|0.5|White paint and eraser pigment (TiO₂)|Opacity and whiteness\nS|0.5|Vulcanised rubber inside the eraser|Cross-links the rubber',
parts:'Graphite + clay core|The "lead": layered carbon flakes glued with clay. Layers slide off onto paper as marks.|C,Si,Al,O\nCedar wood casing|Cellulose and lignin fibres holding the core.|C,O,H\nLacquer / paint|Thin resin-and-pigment coat on the outside.|C,H,O,Ti\nBrass ferrule|Metal band at the top that clamps the eraser.|Cu,Zn\nEraser|Rubber with pumice grit and sulphur cross-links.|C,H,S,Si,O'});
add({title:'Processor / chip (CPU, GPU, IC)',label:'Electronic component',
names:['cpu','processor','microprocessor','chip','microchip','integrated circuit','gpu','graphics card','ram','memory chip','ssd','soc','asic','fpga','intel','amd','nvidia','ryzen','xeon','snapdragon','threadripper','epyc','celeron','pentium','athlon','exynos','geforce','radeon','microcontroller','arduino chip'],
rx:/\b(core i[3579]|core ultra|apple m[1-4]|m[1-4] (pro|max|ultra)|rtx|gtx|rx \d{3,4}|arc a\d+|atmega\d*|esp32|stm32|lm\d{3}|ne555)\b/,
summary:'A packaged chip: a tiny silicon die with billions of transistors, wired through copper layers, mounted on a glass-fibre/epoxy substrate and capped by a nickel-plated copper heat spreader. Exact figures vary by chip; the silicon die itself is only a small share of the mass.',
comp:'Cu|30|Heat-spreader lid, substrate wiring layers, on-die interconnect and pads|Conducts heat and electricity\nO|20|Silicon-dioxide insulation on the die; glass fibre and epoxy of the substrate|Insulator between wires and transistors\nSi|15|The die: ultra-pure silicon where billions of transistors are etched; also glass fibre|The semiconductor that switches current\nC|12|Epoxy resin of the package substrate and underfill|Holds the layers together\nNi|4|Nickel plating on the heat-spreader lid and contacts|Prevents corrosion\nAl|3|Metal interconnect layers and thermal contact areas|Wiring and heat path\nCa|2|Glass-fibre filler in the substrate|Glass filler\nH|2|Epoxy resin|Bonded to carbon in the resin\nSn|2|Solder bumps linking die to package and package to board|Joins parts electrically\nB|1|Boron doping in the silicon and borosilicate glass fibre|Creates positive "holes" in p-type silicon\nN|1|Silicon-nitride layers and epoxy hardener|Protective barrier layers\nAu|0.5|Plated contact pads and ultra-fine bond wires|Corrosion-proof contacts\nP|0.3|Phosphorus doping in the silicon|Adds free electrons (n-type silicon)\nHf|0.1|Hafnium-oxide insulator under each transistor gate|High-k insulator that lets transistors shrink\nW|0.1|Tiny tungsten plugs joining transistors to wiring|Vertical connectors (vias)\nCo|0.1|Cobalt liners in the finest wiring layers|Stops wire failure\nTi|0.1|Titanium-nitride barrier layers|Barrier and adhesion layer',
parts:'Silicon die|The tiny chip itself — transistors live in its top few micrometres.|Si,O,B,P,Hf,W,N\nMetal interconnect stack|10–15 layers of microscopic wiring above the transistors.|Cu,Al,Co,Ti,W\nPackage substrate|Glass-fibre/epoxy board that fans out the connections.|C,H,O,Si,Ca,Cu,B\nSolder bumps and pads|Join die to substrate and package to the board.|Sn,Au,Ni\nHeat spreader (lid)|Nickel-plated copper cap that moves heat to the cooler.|Cu,Ni'});
add({title:'Stainless steel',label:'Alloy',names:['stainless steel','stainless','304 stainless','316 stainless','inox'],
summary:'Austenitic stainless steel (like 304): iron alloyed with chromium and nickel. (Grade 316 also adds ~2% molybdenum.)',
comp:'Fe|70.4|Throughout the alloy — the metal lattice of the whole piece|Base metal; gives strength\nCr|18|Dissolved evenly in the lattice AND concentrated in an invisible ~2–3 nm Cr₂O₃ film on the surface|Makes it "stainless" — a self-healing oxide skin\nNi|8|Dissolved evenly through the lattice|Keeps the tough, non-magnetic austenite structure\nMn|2|Dissolved in the lattice|Deoxidiser; aids toughness\nSi|1|Dissolved in the lattice|Deoxidiser used during melting\nC|0.08|Tucked between metal atoms (kept very low)|Hardness; low to avoid corrosion\nN|0.1|Tucked between metal atoms|Strengthens and aids corrosion resistance'});
add({title:'Steel / iron metal',label:'Alloy',names:['steel','carbon steel','mild steel','structural steel','metal part','nail','screw','bolt','nut','wrench','hammer','knife','blade','razor','chain','rebar','girder','tool','scissors','spring','sword','paperclip','staple','tin can','food can','spoon','fork','cutlery'],
summary:'Typical carbon steel: nearly all iron with a little carbon and manganese. (Galvanised or plated parts add a thin zinc/tin coat; cutlery is usually stainless.)',
comp:'Fe|98|Throughout the metal grains (an iron crystal lattice)|Base metal\nC|0.4|Tucked between iron atoms and as hard iron-carbide (Fe₃C) grains|Turns soft iron into hard steel\nMn|0.8|Dissolved evenly in the lattice|Adds strength and removes sulfur\nSi|0.3|Dissolved in the lattice|Deoxidiser\nO|0.2|Thin oxide film on the surface|First layer of rust'});
add({title:'Cast iron',label:'Alloy',names:['cast iron','skillet','cast iron pan','manhole cover','radiator'],summary:'Iron with 2–4% carbon, much of it as graphite flakes.',
comp:'Fe|94.5|Throughout the metal matrix|Base metal\nC|3.5|Mostly as flakes of graphite embedded in the iron|Makes it castable and brittle; flakes hold oils (seasoning)\nSi|1.7|Dissolved in the iron|Encourages graphite flakes\nMn|0.5|Dissolved in the iron|Strength'});
add({title:'Brass',label:'Alloy',names:['brass','brass key','key','keys','doorknob','faucet','trumpet','trombone'],summary:'Brass: copper alloyed with zinc (small lead content in many machined parts).',
comp:'Cu|63|Throughout the alloy lattice|Base metal; gives the gold colour\nZn|35|Dissolved evenly in the copper lattice|Adds hardness and lowers cost\nPb|2|As tiny droplets between grains|Makes it easy to machine'});
add({title:'Bronze',label:'Alloy',names:['bronze','bronze statue','bell','medal','cymbal','sculpture'],summary:'Bronze: copper hardened with tin; the green patina is copper carbonate/oxide on the surface.',
comp:'Cu|88|Throughout the alloy|Base metal\nSn|11|Dissolved in the copper lattice|Hardens copper (the "Bronze Age")\nP|0.3|Dissolved in the lattice|Deoxidiser in phosphor bronze\nO|0.3|Surface patina|Forms green/brown corrosion layer'});
add({title:'Solder',label:'Alloy',names:['solder','soldering','tin solder'],summary:'Modern lead-free electronics solder (Sn-Ag-Cu). Older solder was ~63% tin, 37% lead.',
comp:'Sn|96.5|Throughout the alloy|Main metal; melts at ~217 °C\nAg|3|Dissolved/as tiny Ag₃Sn crystals|Strengthens the joint\nCu|0.5|Dissolved in the alloy|Lowers melting point, reduces copper dissolving'});
add({title:'Sterling silver',label:'Alloy',names:['sterling silver','silverware','silver spoon','silver jewelry'],summary:'925 sterling silver.',
comp:'Ag|92.5|Throughout the metal|Bright, soft base metal\nCu|7.5|Dissolved evenly in the silver lattice|Hardens silver (also causes tarnish)'});
add({title:'Aluminium can / foil',label:'Alloy',names:['aluminium can','aluminum can','soda can','beer can','can','cans','foil','aluminium foil','aluminum foil','tin foil','aluminium alloy','aluminum alloy'],summary:'Aluminium alloy sheet (3xxx series) with a ~5 nm self-forming oxide skin.',
comp:'Al|96.5|Bulk of the metal sheet|Light, soft base metal\nMn|1.2|Dissolved in the lattice|Strength\nMg|1|Dissolved in the lattice|Strength and formability\nFe|0.5|Tiny particles between grains|Impurity / grain control\nSi|0.3|Tiny particles between grains|Impurity / strength\nO|0.3|A ~5 nm aluminium-oxide skin on every surface|Protects against corrosion\nCu|0.2|Dissolved in the lattice|Strength'});
add({title:'US penny (1 cent)',label:'Coin',names:['penny','us penny','one cent','1 cent coin','cent'],summary:'Modern US cent: a zinc core plated with copper.',
comp:'Zn|97.5|The whole inner core|Cheap, light core metal\nCu|2.5|Thin plated skin on the outside|Gives the copper colour'});
add({title:'Coin (cupronickel)',label:'Coin',names:['coin','coins','quarter','dime'],summary:'Clad coin: outer layers of copper–nickel over a pure copper core.',
comp:'Cu|91.7|Core plus 75% of each outer layer|Conductor, base metal\nNi|8.3|Outer cladding layers (25% Ni)|Silver colour and wear resistance'});
add({title:'Glass (soda-lime)',label:'Material',names:['glass','window','window glass','glass bottle','jar','glass jar','mirror','lens','windshield','drinking glass','wine glass','glassware'],
summary:'Ordinary soda-lime glass: a random, non-crystalline network of silica with sodium, calcium and magnesium in the gaps. (A mirror adds a thin silver or aluminium coating on the back.)',
comp:'O|47|Bonded in the Si–O–Si network and with Na, Ca, Mg|Bridging atoms of the network\nSi|34|Centre of SiO₄ tetrahedra in a random 3-D network|Backbone — hard and transparent\nNa|10.4|Sits in gaps of the network, breaking some Si–O bridges|Flux — lowers the melting temperature (soda)\nCa|6.4|In gaps, bonded to oxygen|Stabiliser — water resistance, hardness (lime)\nMg|2.4|In gaps of the network|Stabiliser, reduces crystallising\nAl|0.5|Replaces a little Si in the network|Improves durability'});
add({title:'Granite',label:'Rock',names:['granite','granite countertop','granite slab','granite stone'],
summary:'Granite is a speckled igneous rock made of three main minerals: quartz, feldspar and mica.',
comp:'O|48|Bound in every mineral: quartz, feldspar and mica|Bonded to Si and Al in the silicate frame\nSi|33.5|Quartz grains (glassy grey) and the silicate frame of the feldspars|Silicate backbone\nAl|7.6|Feldspar crystals (blocky white/pink) and mica|Part of the aluminosilicate frame\nK|3.5|Pink K-feldspar crystals and black mica flakes|Gives many granites their pink colour\nNa|2.7|White plagioclase feldspar crystals|Sodium end of the feldspar family\nFe|1.4|Black biotite mica flakes, hornblende and magnetite specks|Dark colour of the speckles\nCa|1|Plagioclase feldspar and hornblende|Calcium-rich feldspar\nMg|0.3|Biotite mica and hornblende|Part of the dark minerals\nTi|0.2|Accessory minerals (titanite, ilmenite)|Minor ore grains\nH|0.1|Hydroxyl groups inside the mica|Bound in mica structure\nU|0.0004|Tiny zircon/uraninite grains|Natural radioactivity — source of radon',
parts:'Quartz|Clear to grey glassy grains of SiO₂.|Si,O\nFeldspar|Pink or white blocky crystals (K, Na, Ca aluminosilicates).|K,Na,Ca,Al,Si,O\nMica & hornblende|Black flecks rich in iron and magnesium.|Fe,Mg,K,Al,H\nAccessory minerals|Tiny zircon, apatite, titanite grains.|Ti,U'});
add({title:'Banana',label:'Fruit',names:['banana','plantain'],
summary:'A banana is roughly 75% water and 22% carbohydrate (starch turning to sugar as it ripens), so oxygen, carbon and hydrogen dominate.',
comp:'O|77|Water in the pulp cells (~75% of the fruit) and in the sugar molecules|Mostly as water — keeps cells plump\nC|12|Sugars, starch and fibre (cellulose, pectin) in pulp and peel|Carbohydrate skeleton\nH|9.9|Water and sugars throughout the pulp|Bonded to O and C\nK|0.4|Dissolved in the cell sap of the pulp|Famous banana mineral — nerves and muscles (includes a trace of radioactive K-40)\nN|0.2|Amino acids and proteins in pulp and seeds|Protein building block\nMg|0.03|Pulp sap and green peel (chlorophyll centre)|Enzyme helper, chlorophyll core\nP|0.03|Pulp and seeds: phosphates and cell membranes|Energy molecules (ATP)\nCa|0.01|Cell walls (calcium pectate)|Firms up cell walls',
parts:'Peel|Cellulose, tannins, and chlorophyll while green.|C,H,O,Mg\nPulp|Water-rich cells holding sugars, starch and potassium.|O,C,H,K\nStrings (phloem)|Fibres that carry sap through the fruit.|C,O,N\nTiny seeds|Dark specks with proteins and phosphates.|N,P,C'});
add({title:'Human body',label:'Living organism',names:['blood','heart','brain','liver','organ','muscle','kidney','lung','human','human body','body','person','people','man','woman','baby','child','human being'],
summary:'About 60% of the body is water; the rest is proteins, fats, minerals and carbohydrates. Six elements (O, C, H, N, Ca, P) make up ~98.5%.',
comp:'O|65|Water (~60% of body weight) and every organic molecule|Water and organic molecules\nC|18.5|Fat, proteins, carbohydrates and DNA in every cell|Backbone of all organic molecules\nH|9.5|Water and organic molecules everywhere|Bonded to O and C\nN|3.2|Proteins (muscle, skin) and DNA bases|Amino acids and DNA\nCa|1.5|99% in bones and teeth (hydroxyapatite); a little in blood and muscle|Bone strength, nerve and muscle signals\nP|1|85% in bones and teeth; also DNA, cell membranes, ATP|Bone mineral and energy (ATP)\nK|0.4|Inside every cell|Nerve signals, heartbeat\nS|0.3|Proteins such as keratin in hair and nails|Holds proteins in shape (disulfide bridges)\nNa|0.15|Blood and the fluid outside cells|Fluid balance, nerves\nCl|0.15|Blood and stomach acid|Fluid balance, digestion\nMg|0.05|Bones and inside cells|Enzyme helper\nFe|0.006|Red blood cells (haemoglobin) and muscle (myoglobin)|Carries oxygen\nZn|0.003|Enzymes throughout the body|Enzyme helper\nI|0.00002|Thyroid gland|Makes thyroid hormone',
parts:'Water pool|Cells, blood and tissue fluid.|H,O\nBones & teeth|Calcium phosphate mineral on a collagen frame.|Ca,P,O\nMuscle & organs|Proteins, fats and salts.|C,N,O,S,K\nBlood|Haemoglobin (iron) in red cells; sodium and chloride in plasma.|Fe,Na,Cl'});
add({title:'Milk',label:'Liquid food',names:['milk','cow milk','whole milk','skim milk'],summary:'Milk is ~87% water with lactose, fat droplets, and protein (casein) particles that carry calcium and phosphate.',
comp:'O|80.9|Water (87% of milk) plus lactose, fat and proteins|Mostly as water\nH|10.7|Water, lactose and fats|Water and organics\nC|6.6|Dissolved lactose, milk-fat globules, casein and whey proteins|Organic backbone\nN|0.53|Proteins: casein micelles and whey|Protein building block\nK|0.15|Dissolved in the liquid|Electrolyte\nCa|0.12|Inside casein micelles (as calcium phosphate) and dissolved|Why milk supports bones\nCl|0.1|Dissolved chloride|Electrolyte\nP|0.09|Casein micelles and dissolved phosphate|Part of the micelles\nNa|0.05|Dissolved in the liquid|Electrolyte\nS|0.03|Whey proteins|Amino-acid sulfur\nMg|0.01|Dissolved in the liquid|Electrolyte'});
add({title:'Alkaline battery (AA/AAA/D)',label:'Device',names:['battery','batteries','aa battery','aaa battery','aa','aaa','alkaline battery','dry cell','d battery','c battery','9v battery'],
summary:'A typical alkaline cell: zinc powder gel (anode) and manganese dioxide (cathode) in a potassium-hydroxide electrolyte, inside a steel can.',
comp:'Mn|24|Cathode: dark MnO₂ paste lining the outer wall|Takes up electrons while discharging\nO|20|MnO₂ cathode, KOH electrolyte, and Zn(OH)₂ products|Oxide partner of Mn\nZn|18|Anode: zinc-powder gel in the central core|Gives up electrons — the fuel\nFe|17|Outer steel can and cathode collector ring|Case and current collector\nK|3|Potassium hydroxide soaked into the separator and gel|Ion-carrying electrolyte\nC|3|Graphite mixed into the cathode; plastic seal|Makes the cathode conductive\nH|1.5|Electrolyte water and KOH|Part of the electrolyte\nCu|1.5|Brass current-collector pin down the middle|Carries current from the anode',
parts:'Steel can|Positive terminal and outer case.|Fe\nMnO₂ cathode ring|Dark paste against the can wall.|Mn,O,C\nSeparator|Paper layer soaked in electrolyte between anode and cathode.|K,O,H\nZinc gel anode|Powder in the centre.|Zn,K\nBrass pin & seal|Collects current from the anode.|Cu,Zn'});
add({title:'Lithium-ion battery',label:'Device',names:['lithium battery','lithium ion battery','li ion battery','li ion','lithium ion','phone battery','laptop battery','rechargeable battery','power bank','18650'],
summary:'A typical Li-ion cell: a graphite anode and a lithium-metal-oxide cathode on thin foils, in organic electrolyte inside a steel or aluminium case. Mix varies by chemistry.',
comp:'C|18|Graphite anode (layers that store Li⁺) plus plastic separator and binder|Anode host for lithium ions\nO|14|Metal-oxide cathode and the electrolyte|Oxide part of the cathode\nCu|13|Anode current-collector foil|Carries current out of the anode\nNi|12|Cathode (NMC/NCA mix)|Boosts energy storage\nFe|10|Steel can or pouch tabs|Casing\nAl|7|Cathode current-collector foil|Current collector\nCo|4|Cathode oxide layers|Stabilises the cathode crystal\nMn|4|Cathode (NMC)|Safer, stable cathode part\nLi|3|Shuttles between graphite anode and oxide cathode; dissolved in electrolyte|The charge carrier — moves back and forth\nF|1.5|LiPF₆ salt in the electrolyte; PVDF binder|Electrolyte salt and binder\nH|1.5|Organic electrolyte solvent and binder|Bonded to carbon\nP|0.6|LiPF₆ salt in the electrolyte|Electrolyte'});
add({title:'Lead-acid (car) battery',label:'Device',names:['car battery','lead acid battery','lead acid','12v battery','automotive battery'],summary:'Lead plates in dilute sulfuric acid, in a polypropylene case.',
comp:'Pb|60|Grid plates and PbO₂/Pb active material in each cell|Stores charge as lead dioxide and lead\nC|13|Polypropylene case and separators|Casing\nO|11|PbO₂ and PbSO₄ on the plates; water and acid|Reaction partner in the plates\nH|6|Acid–water electrolyte and the case|Part of the electrolyte\nS|3.5|Sulfuric acid electrolyte and lead sulfate|Forms PbSO₄ on discharge\nSb|0.7|Alloyed into some lead grids|Hardens the lead\nCa|0.1|Alloyed into some lead grids|Reduces gassing'});
add({title:'Smartphone',label:'Device',names:['samsung','galaxy s','s24','s23','s22','iphone 15','iphone 14','iphone 13','pixel phone','huawei','xiaomi','oneplus','redmi','phone','smartphone','iphone','android','mobile phone','cell phone','cellphone','galaxy','samsung galaxy','pixel','mobile'],
summary:'A modern smartphone: aluminium (or steel/titanium) frame, glass front and back, a Li-ion battery, a circuit board and camera modules.',
comp:'Al|18|Frame and back plate; some inner brackets|Light, strong chassis\nO|18|Glass screen and camera cover, oxide layers, battery cathode|Part of glass and metal oxides\nSi|14|Aluminosilicate screen glass and every chip|Glass network and semiconductor\nC|14|Plastic parts, circuit-board resin, battery graphite|Plastics and battery anode\nFe|8|Screws, SIM tray, shields, springs, speaker magnets|Strength and magnetism\nCu|8|Circuit-board traces, flex cables, antennas, camera modules|Conductor\nCo|3|Battery cathode|Battery metal\nNi|2|Battery cathode; plating on connectors|Battery metal, corrosion plating\nH|2|Plastics, adhesives, battery electrolyte|Bonded to carbon\nLi|2|Inside the battery between anode and cathode|Charge carrier\nSn|1|Solder joints on the circuit board|Solder\nMg|1|Frame alloy and inner brackets|Light-alloy additive\nTi|0.5|Camera rings and premium frames|Strong, light metal\nNd|0.2|Magnets in speaker, vibration motor, camera focus|Strong permanent magnets\nAg|0.1|Solder paste and contacts|Conductor\nTa|0.05|Tiny capacitors on the board|Capacitor metal\nAu|0.03|Plating on connectors and chip bond wires|Corrosion-proof contacts\nIn|0.02|Transparent ITO touch layer in the display|Transparent conductor',
parts:'Display glass + OLED|Aluminosilicate glass over thin organic light-emitting layers.|Si,O,Al,C,In\nMetal frame|Aluminium alloy (sometimes steel or titanium).|Al,Mg,Fe,Ti\nBattery|Li-ion pouch cell, the heaviest internal part.|Li,Co,Ni,C,Cu\nLogic board|Chips on a copper circuit board held by solder.|Si,Cu,Sn,Au,Ag,Ta\nSpeaker & haptics|Rare-earth magnets and coils.|Nd,Fe,Cu'});
add({title:'Cable / wire',label:'Everyday object',names:['cable','cables','usb','usb cable','usb c','charger cable','charging cable','ethernet','ethernet cable','hdmi','hdmi cable','power cord','extension cord','wire','wires','copper wire','electrical wire','headphone cable','lightning cable'],
summary:'A typical insulated cable: copper strands inside a PVC jacket, with plated metal connectors.',
comp:'Cu|55|Core: bundle of thin conductor strands inside the insulation|Carries the electric current\nC|22|PVC/PE insulation jacket|Backbone of the insulating polymer\nCl|11|PVC jacket (chlorine on every second carbon)|Makes PVC flame-resistant\nO|4|Plasticisers and plastic parts|Plasticiser/binder\nH|3|Plastic jacket|Bonded to carbon\nFe|1.5|Connector shells and pins|Connector body\nCa|1|Chalk filler in the PVC|Filler\nSn|1|Tin plating on the copper strands|Prevents corrosion, helps soldering\nNi|1|Plating on connector shells|Corrosion plating\nZn|0.5|Brass pins inside plugs|Brass partner of copper\nAu|0.1|Thin gold flash on connector contacts|Low-resistance, corrosion-proof contact',
parts:'Copper conductors|Many fine strands twisted together.|Cu,Sn\nInsulation|Plastic around each conductor.|C,H,Cl,O\nOuter jacket|PVC sheath with chalk filler.|C,Cl,Ca\nConnector|Plated metal shell and pins.|Fe,Ni,Zn,Au'});
add({title:'Light bulb (LED)',label:'Device',names:['light bulb','lightbulb','bulb','led bulb','lamp','led lamp','incandescent bulb','light','led'],
summary:'A modern LED bulb: aluminium heat sink, plastic/glass diffuser, a driver circuit and a gallium-nitride LED chip. (An old incandescent bulb is mostly glass with a tungsten filament in argon.)',
comp:'Al|25|Finned heat-sink body|Carries heat away from the LED\nC|25|Plastic diffuser dome, housing, driver-board resin|Plastic structure\nO|20|Diffuser and glass; oxide on the LED chip|Part of glass and oxides\nSi|10|Diffuser/glass, silicone lens, driver chips|Glass and semiconductors\nCu|5|Wiring and board traces|Conductor\nH|3|Plastics and silicone|Bonded to carbon\nFe|3|Screw-base shell|Base metal\nZn|2|Brass screw base|Brass partner\nSn|1|Solder|Joins parts\nCa|1|Glass and phosphor|Glass component\nY|0.03|Yellow phosphor on the LED chip|Turns blue light into white\nGa|0.1|LED chip (gallium nitride)|Makes the light\nN|0.1|LED chip (GaN)|Part of the GaN crystal\nIn|0.02|InGaN layer in the LED chip|Tunes the colour'});
/* ---- formula-based items ---- */
function F(names,formula,title,label,summary,more){var o={names:names,formula:formula,title:title,label:label,summary:summary};for(var k in(more||{}))o[k]=more[k];add(o);}
F(['water','h2o','pure water','drinking water','ice','steam','water vapor','water vapour','snow','rain','tap water','cloud','fog','mist','hail'],'H2O','Water','Liquid / compound','Water (also ice, steam, rain, snow). Tap water carries tiny amounts of dissolved Ca, Mg, Na, Cl, but the composition is essentially H₂O.');
F(['salt','table salt','sodium chloride','nacl','rock salt','sea salt','halite'],'NaCl','Salt (sodium chloride)','Mineral / compound','Table salt — crystals of sodium chloride (iodised salt adds a trace of iodine).');
F(['sugar','sucrose','table sugar','cane sugar','white sugar'],'C12H22O11','Sugar (sucrose)','Food / compound','Table sugar is sucrose.');
F(['glucose','dextrose','blood sugar','fructose','c6h12o6'],'C6H12O6','Glucose','Food / compound','Glucose — the sugar cells burn for energy. Fructose shares the same formula, arranged differently.');
F(['baking soda','sodium bicarbonate','bicarbonate of soda','nahco3'],'NaHCO3','Baking soda','Compound','Sodium bicarbonate.');
F(['sand','quartz','silica','sio2','sandstone','silicon dioxide','flint'],'SiO2','Sand / quartz (silicon dioxide)','Mineral / compound','Quartz and sand are crystalline silicon dioxide.');
F(['rust','iron oxide','fe2o3','hematite','haematite'],'Fe2O3','Rust / iron(III) oxide','Compound','Rust is hydrated iron oxide; the red-brown core compound is Fe₂O₃.');
F(['chalk','limestone','marble','eggshell','egg shell','seashell','sea shell','shell','pearl','calcite','coral','caco3'],'CaCO3','Limestone / chalk / marble (calcium carbonate)','Mineral / compound','Calcium carbonate — limestone, marble, chalk, eggshells and sea shells. Real samples hold traces of Mg, Fe and organic matter.');
F(['diamond'],'C','Diamond','Gemstone / element','Pure carbon in a rigid crystal.',{kind:'network',arrange:'Every carbon atom is bonded to four others in a rigid tetrahedral 3-D network — the hardest natural material.',where:{C:'Every atom in the crystal, each bonded to 4 neighbours|Gives extreme hardness and sparkle'}});
F(['graphite','pencil lead'],'C','Graphite','Mineral / element','Pure carbon in layers.',{kind:'network',arrange:'Carbon atoms form flat hexagonal sheets; sheets are only weakly held together so they slide — that is why graphite writes and lubricates.',where:{C:'Every atom, arranged in flat honeycomb sheets stacked like paper|Strong in-sheet bonds, slippery between sheets, conducts electricity'}});
F(['carbon dioxide','co2','dry ice'],'CO2','Carbon dioxide','Gas / compound','Carbon dioxide — fizzy-drink gas, ~0.04% of air, dry ice when solid.');
F(['ammonia','nh3'],'NH3','Ammonia','Gas / compound','Ammonia — fertiliser and cleaner gas.');
F(['methane','ch4'],'CH4','Methane','Gas / compound','Methane — the main part of natural gas.');
F(['propane','lpg','c3h8'],'C3H8','Propane (LPG)','Gas / compound','Propane — bottled barbecue and heating gas.');
F(['butane','lighter','lighter fluid'],'C4H10','Butane','Gas / compound','Butane — lighter fuel and camping gas.');
F(['ethanol','alcohol','ethyl alcohol','c2h6o'],'C2H6O','Ethanol (alcohol)','Liquid / compound','Ethanol — drinking alcohol and fuel additive.');
F(['isopropanol','rubbing alcohol','isopropyl alcohol'],'C3H8O','Isopropyl alcohol','Liquid / compound','Rubbing alcohol.');
F(['hydrogen peroxide','h2o2'],'H2O2','Hydrogen peroxide','Liquid / compound','Hydrogen peroxide — usually sold as a 3% solution in water.');
F(['ozone','o3'],'O3','Ozone','Gas / molecule','Ozone gas.');
F(['laughing gas','nitrous oxide','n2o'],'N2O','Nitrous oxide','Gas / compound','Laughing gas.');
F(['carbon monoxide','co'],'CO','Carbon monoxide','Gas / compound','Toxic gas from incomplete burning.');
F(['quicklime','calcium oxide'],'CaO','Quicklime','Compound','Calcium oxide.');
F(['alumina','aluminium oxide','aluminum oxide','corundum'],'Al2O3','Alumina (corundum)','Mineral / compound','Aluminium oxide.');
F(['ruby'],'Al2O3','Ruby','Gemstone','Corundum (Al₂O₃) with a trace of chromium that makes it red.',{extra:'Cr|0.3|Replaces a few Al³⁺ ions in the crystal|Creates the red colour'});
F(['sapphire'],'Al2O3','Sapphire','Gemstone','Corundum with traces of iron and titanium that make it blue.',{extra:'Fe|0.05|Replaces a few Al³⁺ ions|Colour centre (with Ti)\nTi|0.02|Replaces a few Al³⁺ ions|Colour centre (with Fe)'});
F(['emerald','beryl'],'Be3Al2Si6O18','Emerald (beryl)','Gemstone','Beryl with chromium/vanadium that makes it green.',{extra:'Cr|0.2|Replaces a few Al³⁺ ions|Creates the green colour'});
F(['amethyst'],'SiO2','Amethyst','Gemstone','Quartz coloured purple by a little iron.',{extra:'Fe|0.01|Trace iron in the quartz lattice|Purple colour centre'});
F(['gypsum','drywall','plasterboard','plaster board','sheetrock'],'CaSO4.2H2O','Gypsum / drywall','Mineral / compound','Gypsum is hydrated calcium sulfate (paper facing on drywall adds some C, H, O).');
F(['epsom salt','epsom salts'],'MgSO4.7H2O','Epsom salt','Compound','Magnesium sulfate heptahydrate.');
F(['acetic acid','ch3cooh'],'C2H4O2','Acetic acid','Liquid / compound','Pure acetic acid.');
F(['aspirin','acetylsalicylic acid'],'C9H8O4','Aspirin','Medicine','Acetylsalicylic acid (tablets add a little binder).');
F(['paracetamol','acetaminophen','tylenol'],'C8H9NO2','Paracetamol','Medicine','Paracetamol / acetaminophen.');
F(['ibuprofen','advil'],'C13H18O2','Ibuprofen','Medicine','Ibuprofen.');
F(['caffeine'],'C8H10N4O2','Caffeine','Compound','Caffeine.');
F(['vitamin c','ascorbic acid'],'C6H8O6','Vitamin C','Compound','Ascorbic acid.');
F(['urea'],'CH4N2O','Urea','Compound','Urea.');
F(['chlorophyll'],'C55H72MgN4O5','Chlorophyll a','Biomolecule','The green pigment in plants, with magnesium at its centre.');
F(['bone','bones','tooth','teeth','tooth enamel','hydroxyapatite'],'Ca10(PO4)6(OH)2','Bone / tooth mineral (hydroxyapatite)','Biomineral','Hydroxyapatite is the mineral in bone and enamel; living bone also carries collagen protein (C, H, N, O).');
F(['cotton','cellulose','starch','linen','hemp','cotton shirt','jeans','denim','t shirt','tshirt','shirt','towel','cloth','fabric','textile','clothes','banknote','money','cash','dollar bill','bandage','gauze'],'C6H10O5','Cotton / cellulose fabric','Natural fibre','Plant fibres are chains of glucose rings (cellulose). Dyes and finishes add traces.',{kind:'polymer'});
F(['polyethylene','pe','hdpe','ldpe','plastic bag','shopping bag','milk jug','cling film','trash bag'],'C2H4','Polyethylene (PE)','Plastic','Polyethylene — bags, milk jugs and film (repeat unit C₂H₄).',{kind:'polymer'});
F(['polypropylene','pp','tupperware','food container','plastic container','yogurt pot'],'C3H6','Polypropylene (PP)','Plastic','Polypropylene — food containers, caps and car parts (repeat unit C₃H₆).',{kind:'polymer'});
F(['pvc','polyvinyl chloride','vinyl','plastic pipe','pipe'],'C2H3Cl','PVC (polyvinyl chloride)','Plastic','PVC — pipes, cables, flooring (repeat unit C₂H₃Cl).',{kind:'polymer',where:{Cl:'Side atom on every second carbon of the chain|Makes PVC rigid and flame-retardant'}});
F(['polystyrene','styrofoam','foam cup','packing foam','foam'],'C8H8','Polystyrene / Styrofoam','Plastic','Polystyrene foam (repeat unit C₈H₈), ~95% air by volume.',{kind:'polymer'});
F(['pet','pet bottle','plastic bottle','water bottle','soda bottle','polyester','fleece','polyester fabric'],'C10H8O4','PET (plastic bottle / polyester)','Plastic','PET — bottles and polyester fabric (repeat unit C₁₀H₈O₄).',{kind:'polymer',where:{O:'In the ester (–COO–) links between repeat units|Polar links that give stiffness and clarity'}});
F(['nylon','stockings','tights','parachute'],'C12H22N2O2','Nylon 6,6','Plastic','Nylon (repeat unit C₁₂H₂₂N₂O₂).',{kind:'polymer',where:{N:'In the amide (–CONH–) links of the chain|Hydrogen-bonds neighbouring chains: strength'}});
F(['ptfe','teflon','non stick','nonstick','nonstick pan','non stick pan'],'C2F4','Teflon (PTFE)','Plastic','PTFE non-stick coating (repeat unit C₂F₄).',{kind:'polymer',where:{F:'A sheath of fluorine atoms wrapped around the carbon backbone|Non-stick, chemically inert surface'}});
F(['acrylic','pmma','plexiglass','perspex'],'C5H8O2','Acrylic (PMMA)','Plastic','Acrylic / plexiglass (repeat unit C₅H₈O₂).',{kind:'polymer'});
F(['polycarbonate','cd','dvd','compact disc','safety glasses','sunglasses','glasses frame'],'C16H14O3','Polycarbonate','Plastic','Polycarbonate (CDs/DVDs add a thin aluminium reflective layer).',{kind:'polymer'});
F(['silicone','silicon rubber','silicone rubber','sealant','silicone sealant'],'C2H6OSi','Silicone','Polymer','Silicone (PDMS) chains with a Si–O backbone.',{kind:'polymer',where:{Si:'In the Si–O–Si backbone of the chain|Flexible, heat-stable backbone',O:'Bridging between silicon atoms in the backbone|Makes the chain flexible',C:'In the methyl (–CH₃) groups on every silicon|Side groups that repel water',H:'On the methyl groups|Outer atoms'}});
F(['natural rubber','rubber band','eraser'],'C5H8','Natural rubber (polyisoprene)','Polymer','Natural rubber (repeat unit C₅H₈), cross-linked with a little sulfur.',{kind:'polymer'});
F(['wax','candle','paraffin wax','paraffin','crayon'],'C25H52','Candle wax (paraffin)','Fuel / wax','Paraffin wax — long hydrocarbon chains.');
F(['cooking oil','olive oil','vegetable oil','sunflower oil','oil','fat','lard'],'C57H104O6','Cooking oil / fat (triglyceride)','Food / lipid','A triglyceride: glycerol carrying three long fatty-acid tails.',{kind:'organic',arrange:'A triglyceride: a 3-carbon glycerol head with three ~18-carbon fatty-acid tails attached by ester links. Almost all the atoms are C and H in the tails, which is why oil does not mix with water.',where:{C:'Glycerol head (3 C) and the three long fatty-acid chains (~54 C)|Skeleton and energy store',H:'Along the fatty-acid chains|Outer atoms of the tails',O:'Only in the three ester (–COO–) links joining tails to the glycerol|The only polar part of the molecule'}});
F(['abs','lego','lego brick','toy brick','3d printer filament'],null,'ABS plastic','Plastic','ABS (acrylonitrile-butadiene-styrene), the plastic of LEGO bricks.',{mix:[['C3H3N',25,'acrylonitrile'],['C4H6',15,'butadiene'],['C8H8',60,'styrene']],phase:'solid'});
/* ---- mixtures ---- */
function M(names,mix,title,label,summary,phase,more){var o={names:names,mix:mix,title:title,label:label,summary:summary,phase:phase};for(var k in(more||{}))o[k]=more[k];add(o);}
M(['air','atmosphere','fresh air','the air','breathable air','wind'],[['N2',75.5,'nitrogen gas'],['O2',23.2,'oxygen gas'],['Ar',1.28,'argon'],['CO2',0.06,'carbon dioxide']],'Air','Gas mixture','Dry air by mass: 78% nitrogen and 21% oxygen by volume, plus argon, CO₂ and traces of neon, helium and water vapour.','gas');
M(['vinegar'],[['H2O',95,'water'],['C2H4O2',5,'acetic acid']],'Vinegar','Liquid mixture','Vinegar is about 5% acetic acid in water.','liquid');
M(['seawater','sea water','ocean water','ocean','sea','salt water'],[['H2O',96.5,'water'],['NaCl',2.72,'sodium chloride'],['MgCl2',0.38,'magnesium chloride'],['MgSO4',0.17,'magnesium sulfate'],['CaSO4',0.12,'calcium sulfate'],['KCl',0.07,'potassium chloride']],'Seawater','Liquid mixture','Seawater is ~96.5% water with ~3.5% dissolved salts.','liquid');
M(['natural gas','cooking gas','lng','biogas'],[['CH4',90,'methane'],['C2H6',5,'ethane'],['C3H8',2,'propane'],['N2',2,'nitrogen'],['CO2',1,'carbon dioxide']],'Natural gas','Gas mixture','Mostly methane with other light hydrocarbons.','gas');
M(['gasoline','petrol','fuel','car fuel'],[['C8H18',75,'octane and similar alkanes'],['C7H8',20,'toluene (aromatics)'],['C4H10',5,'butane']],'Gasoline (petrol)','Liquid fuel','A mixture of hydrocarbons with 4–12 carbons.','liquid');
M(['diesel','diesel fuel','kerosene','jet fuel','paraffin oil'],[['C12H26',100,'dodecane-type hydrocarbons']],'Diesel / kerosene','Liquid fuel','Hydrocarbon chains with ~10–16 carbons.','liquid');
M(['beer','ale','lager'],[['H2O',92,'water'],['C2H6O',4.5,'ethanol'],['C6H12O6',3,'dextrins and sugars'],['CO2',0.5,'dissolved carbon dioxide']],'Beer','Liquid mixture','Beer: ~92% water, ~4–5% alcohol and some sugars and dissolved CO₂.','liquid');
M(['wine','red wine','white wine'],[['H2O',86,'water'],['C2H6O',12,'ethanol'],['C6H12O6',1,'sugars'],['C4H6O6',0.8,'tartaric acid']],'Wine','Liquid mixture','Wine: ~86% water and ~12% alcohol.','liquid');
M(['vodka','whiskey','whisky','rum','gin','brandy','spirits','liquor'],[['H2O',60,'water'],['C2H6O',40,'ethanol']],'Spirits (40% ABV)','Liquid mixture','A 40% alcohol spirit is ~34% ethanol by mass.','liquid');
M(['bleach','chlorine bleach'],[['H2O',94,'water'],['NaClO',5,'sodium hypochlorite'],['NaOH',1,'sodium hydroxide']],'Household bleach','Liquid mixture','Sodium hypochlorite solution.','liquid');
M(['honey','syrup','maple syrup'],[['C6H12O6',80,'fructose and glucose'],['H2O',17,'water'],['C12H22O11',3,'sucrose']],'Honey / syrup','Food mixture','Honey is ~80% sugars and 17% water.','liquid');
M(['coffee','tea','espresso','latte','brewed coffee'],[['H2O',98.8,'water'],['C8H10N4O2',0.06,'caffeine'],['C16H18O9',0.2,'chlorogenic acid and other organics']],'Coffee / tea','Liquid mixture','Brewed coffee or tea is >98% water with a tiny amount of dissolved organics.','liquid');
M(['soda','cola','coke','pepsi','fizzy drink','soft drink','sprite'],[['H2O',89,'water'],['C12H22O11',10.5,'sugar'],['CO2',0.3,'dissolved carbon dioxide'],['H3PO4',0.05,'phosphoric acid']],'Soda (soft drink)','Liquid mixture','Water, sugar and dissolved CO₂.','liquid');
M(['juice','orange juice','apple juice','lemonade'],[['H2O',88,'water'],['C6H12O6',6,'fructose and glucose'],['C12H22O11',4,'sucrose'],['C6H8O7',1,'citric acid']],'Fruit juice','Liquid mixture','Fruit juice is ~88% water with sugars and fruit acids.','liquid');
/* ===== MATERIAL LIBRARY, DEVICE + FOOD BUILDERS (specific items; composition computed from formulas) ===== */
var MAT={
 abs:[['C8H8',55],['C4H6',20],['C3H3N',25]],pc:[['C16H14O3',100]],pet:[['C10H8O4',100]],nylon:[['C12H22N2O2',100]],pp:[['C3H6',100]],pe:[['C2H4',100]],pvc:[['C2H3Cl',100]],ps:[['C8H8',100]],pbt:[['C12H12O4',100]],pmma:[['C5H8O2',100]],
 puFoam:[['C27H36N2O10',100]],silicone:[['C2H6OSi',100]],rubber:[['C5H8',100]],epoxy:[['C21H24O4',88],['C15H12Br4O2',12]],cellulose:[['C6H10O5',100]],celAcetate:[['C10H14O7',100]],
 steel:[['Fe',98.4],['C',.4],['Mn',.8],['Si',.3],['Cr',.1]],stainless:[['Fe',70],['Cr',18],['Ni',8],['Mn',2],['Si',1],['C',.1],['Mo',0.9]],alu6061:[['Al',97.5],['Mg',1],['Si',.6],['Cu',.3],['Cr',.2],['Fe',.4]],alCast:[['Al',89],['Si',9],['Cu',2]],zincAlloy:[['Zn',96],['Al',4]],brass:[['Cu',63],['Zn',35],['Pb',2]],castIron:[['Fe',94],['C',3.5],['Si',2.3],['Mn',.5]],ti64:[['Ti',90],['Al',6],['V',4]],
 solder:[['Sn',96.5],['Ag',3],['Cu',.5]],cupronickel:[['Cu',75],['Ni',25]],
 sodaLime:[['SiO2',73],['Na2O',14],['CaO',9],['MgO',4]],alumSilGlass:[['SiO2',62],['Al2O3',17],['Na2O',13],['K2O',3],['MgO',4],['CaO',1]],eGlass:[['SiO2',54],['CaO',17],['Al2O3',14],['B2O3',8],['MgO',4],['Na2O',1]],boroGlass:[['SiO2',81],['B2O3',13],['Na2O',4],['Al2O3',2]],
 fr4:[['eGlass',50],['epoxy',50]],
 icPkg:[['SiO2',60],['epoxy',20],['Si',8],['Cu',10],['Ni',1.5],['Au',.3]],
 pcb:[['fr4',58],['Cu',20],['solder',4],['icPkg',12],['BaTiO3',2],['Ni',1.5],['Au',.1],['Ag',.1],['Pd',.02]],
 liCell:[['LiCoO2',33],['C',18],['Cu',10],['Al',6],['C3H4O3',11],['LiPF6',2],['pe',3],['alu6061',5],['pp',4]],
 magnetNd:[['Nd2Fe14B',100]],ferrite:[['MnFe2O4',70],['ZnFe2O4',30]],
 cementPortland:[['CaO',64],['SiO2',21],['Al2O3',5.5],['Fe2O3',3],['SO3',2.5],['MgO',2],['K2O',1]],
 brickClay:[['SiO2',60],['Al2O3',20],['Fe2O3',7],['CaO',5],['K2O',3],['MgO',2],['Na2O',1],['TiO2',1]],
 porcelain:[['SiO2',66],['Al2O3',25],['K2O',4],['Na2O',1],['CaO',1.5],['Fe2O3',.5]],
 tireRubber:[['rubber',46],['C',25],['steel',15],['SiO2',8],['C10H8O4',3],['ZnO',1.8],['S',1],['stearic',.2]],stearic:[['C18H36O2',100]],
 protein:[['C100H157N26O32S',100]],fat:[['C57H104O6',100]],
 wool:[['C',50],['H',6.9],['N',16.3],['O',22.5],['S',3.5]],leather:[['C',48],['H',7],['N',15],['O',27],['Cr2O3',3]],
 wood:[['C6H10O5',45],['C5H8O4',25],['C10H12O3',25],['H2O',5]]};
var MATLBL={abs:'ABS plastic',pc:'polycarbonate',pet:'PET plastic',nylon:'nylon',pp:'polypropylene',pe:'polyethylene',pvc:'PVC',ps:'polystyrene',pbt:'PBT plastic',pmma:'acrylic',puFoam:'polyurethane foam',silicone:'silicone',rubber:'rubber',epoxy:'epoxy resin',cellulose:'cellulose',celAcetate:'cellulose acetate',steel:'steel',stainless:'stainless steel',alu6061:'aluminium alloy',alCast:'cast aluminium',zincAlloy:'zinc alloy',brass:'brass',castIron:'cast iron',ti64:'titanium alloy',solder:'solder',sodaLime:'soda-lime glass',alumSilGlass:'aluminosilicate glass',eGlass:'glass fibre',boroGlass:'borosilicate glass',fr4:'circuit-board laminate',icPkg:'chip packages',pcb:'circuit boards',liCell:'lithium-ion cell',magnetNd:'neodymium magnet',ferrite:'ferrite',tireRubber:'tyre rubber compound',protein:'protein',fat:'fat',wool:'wool protein',leather:'leather',wood:'wood',Cu:'copper',Al:'aluminium',Fe:'iron',Au:'gold',Ag:'silver',Ni:'nickel',Sn:'tin',Zn:'zinc',C:'carbon',Nd2Fe14B:'neodymium magnet',C10H8O4:'PET film',SiO2:'silica',BaTiO3:'ceramic capacitors',cementPortland:'cement',brickClay:'fired clay',porcelain:'porcelain'};
var DEVROLE={Cu:'Conductor: wiring, coils and circuit traces',Fe:'Structure: steel and magnets',Al:'Light structure, heat spreading and foil',C:'Plastics, rubber, fibres and carbon materials',H:'Bonded to carbon in plastics, rubber and foam',O:'Part of plastics, glass and oxides',Si:'Glass, silicon chips and silicone',Ni:'Plating, steel alloys and battery electrodes',Sn:'Solder and plating',Au:'Corrosion-free contacts',Ag:'Solder, contacts and conductive ink',Nd:'Powerful magnets',B:'Magnets and glass',Li:'Battery charge carrier',Co:'Battery cathode',N:'Nylon, polyurethane and ABS plastic',Cl:'PVC plastic',Br:'Flame retardant in circuit boards',Zn:'Brass, galvanising and rubber additive',Mg:'Light alloy and glass',Ca:'Glass, cement and fillers',Na:'Glass and electrolytes',K:'Glass and fillers',Cr:'Stainless steel and plating',Mn:'Steel strengthening and ferrites',Ti:'Pigment and light strong alloys',Pb:'Brass additive and solder',P:'Battery electrolyte and flame retardant',F:'Battery electrolyte and non-stick coatings',S:'Rubber cross-links and sulfur compounds',Ba:'Ceramic capacitors',Pd:'Contact plating',Mo:'Stainless steel strengthening',V:'Titanium alloy strengthening',Al2:'Light structure'};
function expandMat(key,w,out,path){var m=MAT[key];if(m){var t=m.reduce(function(a,x){return a+x[1];},0);m.forEach(function(x){expandMat(x[0],w*x[1]/t,out,path.concat(key));});}else out.push({f:key,w:w,lbl:path.length?path[0]:key,top:path.length?path[0]:key});}
/* DEV: parts = [name, description, weight, [[material,share],...]] */
function DEV(title,names,label,summary,parts,more){
 var tw=parts.reduce(function(a,p){return a+p[2];},0),acc={},pinfo=[];
 parts.forEach(function(p,pi){var out=[],mt=p[3].reduce(function(a,x){return a+x[1];},0);p[3].forEach(function(x){expandMat(x[0],p[2]/tw*x[1]/mt,out,[]);});
  var pe={};out.forEach(function(c){var an=analyzeFormula(c.f,{kind:'molecular'});if(!an)throw new Error('DEV: bad formula '+c.f+' in '+title);an.comp.forEach(function(e){var g=c.w*e.pct/100;var o=acc[e.sym]||(acc[e.sym]={g:0,l:{}});o.g+=g;var k=p[0]+'|'+(MATLBL[c.top]||c.top);o.l[k]=(o.l[k]||0)+g;pe[e.sym]=(pe[e.sym]||0)+g;});});pinfo.push([p[0],p[1],pe]);});
 var syms=Object.keys(acc).sort(function(a,b){return acc[b].g-acc[a].g;}),tot=syms.reduce(function(a,s){return a+acc[s].g;},0);
 var lines=syms.filter(function(s){return acc[s].g/tot>=0.00005;}).map(function(s){var ls=Object.keys(acc[s].l).sort(function(a,b){return acc[s].l[b]-acc[s].l[a];}).slice(0,3).map(function(k){var q=k.split('|');return q[0].toLowerCase()+' ('+q[1]+')';});
  return s+'|'+(acc[s].g/tot*100).toFixed(4)+'|In the '+ls.join(', ')+'|'+(DEVROLE[s]||'Component of the materials used');});
 var pstr=pinfo.map(function(p){var pt=0;Object.keys(p[2]).forEach(function(s){pt+=p[2][s];});var els=Object.keys(p[2]).filter(function(s){return acc[s]&&acc[s].g/tot>=0.00005&&p[2][s]/pt>=0.003;}).sort(function(a,b){return p[2][b]-p[2][a];}).slice(0,9);return p[0]+'|'+p[1]+'|'+els.map(function(s){return s+':'+(p[2][s]/pt*100).toFixed(3);}).join(',');}).join('\n');
 var o={title:title,label:label,names:names,summary:summary,comp:lines.join('\n'),parts:pstr,basis:'typical'};for(var k in(more||{}))o[k]=more[k];add(o);}
/* FOOD: per 100 g -> macronutrient molecules + minerals as atoms */
function FOOD(names,title,label,n,more){/* n:{w,p,f,c,sug,fib, Na,K,Ca,Mg,P,Fe,Zn, salt:Cl/Na ratio} */
 var starch=Math.max(0,(n.c||0)-(n.sug||0)-(n.fib||0)),mix=[],sol=n.liquid?'liquid':'solid';
 function A(f,w,l){if(w>0.00005)mix.push([f,w,l]);}
 A('H2O',n.w||0,'water');A('C100H157N26O32S',n.p||0,'protein');A('C57H104O6',n.f||0,'fat');A('C6H10O5',starch,'starch');A('C6H12O6',n.sug||0,'sugars');A('C6H10O5',n.fib||0,'fibre');
 var mins={Na:'sodium',K:'potassium',Ca:'calcium',Mg:'magnesium',P:'phosphorus',Fe:'iron',Zn:'zinc'};
 Object.keys(mins).forEach(function(k){if(n[k])A(k,n[k]/1000,mins[k]);});
 if(n.Na)A('Cl',n.Na/1000*(n.salt||1)*1.54,'chloride');
 var sum=0;mix.forEach(function(m){sum+=m[1];});
 var o={title:title,label:label||'Food',names:names,mix:mix,phase:sol,summary:'Typical '+title.toLowerCase()+': '+(n.w?Math.round(n.w)+'% water':'')+(n.p?', '+(n.p<10?n.p.toFixed(1):Math.round(n.p))+'% protein':'')+(n.f?', '+(n.f<10?n.f.toFixed(1):Math.round(n.f))+'% fat':'')+(n.c?', '+(n.c<10?n.c.toFixed(1):Math.round(n.c))+'% carbohydrate':'')+' (per 100 g). Elements are worked out from these macronutrients plus the main minerals.',basis:'typical'};
 for(var k in(more||{}))o[k]=more[k];add(o);}
/* ===== SPECIFIC DEVICES & OBJECTS (typical builds) ===== */
DEV('Headphones (over-ear)',['headphones','headphone','over ear headphones','over-ear headphones','wireless headphones','bluetooth headphones','headset','gaming headset','studio headphones','sony headphones','airpods max','beats headphones','bose headphones'],'Electronic device','Typical over-ear headphones: ABS plastic cups and headband, foam ear pads with a leatherette cover, a driver made of a neodymium magnet, copper voice coil and thin plastic diaphragm, a cable, and (in wireless models) a small lithium-ion battery and circuit board.',
[['Cups & headband','Plastic shells over a thin steel or aluminium band that holds the shape.',38,[['abs',72],['steel',20],['alu6061',8]]],['Ear pads','Soft polyurethane foam wrapped in a leatherette cover.',17,[['puFoam',62],['pvc',22],['pet',16]]],['Drivers (speakers)','The sound-making part: a magnet, a coil of copper wire and a very thin plastic diaphragm.',17,[['magnetNd',38],['Cu',14],['pet',10],['steel',12],['abs',26]]],['Cable & plug','Copper wires inside a PVC jacket, with a nickel/gold-plated plug.',9,[['Cu',38],['pvc',54],['brass',5],['Ni',2.5],['Au',.2]]],['Battery & circuit board','Wireless models only: Bluetooth electronics and a small rechargeable cell.',19,[['liCell',55],['pcb',45]]]]);
DEV('Earbuds (wireless) with case',['earbuds','earbud','airpods','air pods','wireless earbuds','bluetooth earbuds','in ear headphones','in-ear headphones','galaxy buds'],'Electronic device','Typical wireless earbuds and their charging case: tiny plastic shells and silicone tips, a miniature magnet driver, a coin-sized lithium cell and circuit board in each bud, and a larger plastic case with its own battery.',
[['Earbud shells & tips','Plastic shell and soft silicone ear tip.',30,[['abs',55],['pc',25],['silicone',20]]],['Drivers & microphones','Small magnet, copper coil and diaphragm.',10,[['magnetNd',35],['Cu',20],['pet',15],['steel',10],['abs',20]]],['Bud batteries & electronics','Tiny lithium cell and circuit board.',20,[['liCell',45],['pcb',55]]],['Charging case','Plastic case with a hinge, battery and charging contacts.',40,[['pc',48],['abs',12],['liCell',22],['pcb',10],['steel',6],['Au',.2],['Ni',1.8]]]]);
DEV('Keyboard',['keyboard','computer keyboard','pc keyboard','wireless keyboard','usb keyboard','membrane keyboard','typing keyboard'],'Electronic device','A typical full-size keyboard: mostly ABS or PBT plastic (case and keycaps), a steel backing plate, rubber domes, a plastic membrane printed with silver and carbon tracks, a small circuit board and a copper cable.',
[['Keycaps','Plastic caps you press (ABS or PBT).',27,[['abs',60],['pbt',40]]],['Case & feet','Plastic housing and rubber feet.',34,[['abs',88],['rubber',5],['pvc',7]]],['Steel backing plate','Flat steel sheet that stiffens the keyboard.',16,[['steel',100]]],['Membrane & rubber domes','Plastic sheets printed with silver/carbon contact tracks, and silicone springs under each key.',12,[['pet',50],['silicone',42],['Ag',3],['C',5]]],['Circuit board & cable','Controller board and USB cable with copper wire.',11,[['pcb',50],['Cu',20],['pvc',30]]]]);
DEV('Computer mouse',['computer mouse','pc mouse','wireless mouse','usb mouse','gaming mouse','optical mouse','mouse computer','logitech mouse'],'Electronic device','A typical optical mouse: a small ABS plastic shell, a circuit board with an optical sensor chip, switches and a scroll wheel, a copper cable (or battery) and a few steel or metal parts.',
[['Plastic shell & buttons','ABS shell with polycarbonate lens.',58,[['abs',92],['pc',8]]],['Circuit board & sensor','Optical sensor, switches and controller.',16,[['pcb',100]]],['Cable','Copper wires in a plastic jacket.',16,[['Cu',34],['pvc',66]]],['Scroll wheel & weight','Rubber tyre on the wheel, small steel parts.',10,[['rubber',30],['steel',55],['abs',15]]]]);
DEV('Laptop',['laptop','notebook computer','notebook pc','macbook','ultrabook','chromebook','gaming laptop','thinkpad','laptop computer'],'Electronic device','A typical aluminium-body laptop: an aluminium chassis, a glass-fronted LCD panel, a lithium-ion battery that makes up about a sixth of the weight, circuit boards loaded with chips, a plastic keyboard and a copper heat pipe and fan.',
[['Chassis & lid','Aluminium alloy body, magnesium or steel inner frame.',34,[['alu6061',82],['steel',10],['alCast',8]]],['Screen','Glass front, plastic films, LED backlight and a thin metal back.',16,[['alumSilGlass',55],['pmma',12],['pet',16],['pcb',6],['alu6061',11]]],['Battery','Lithium-ion cells with a plastic wrap.',17,[['liCell',94],['pet',6]]],['Mainboard, chips & SSD','Circuit boards carrying the processor, memory and storage.',11,[['pcb',100]]],['Keyboard & trackpad','Plastic keys, steel plate, glass trackpad.',9,[['abs',38],['steel',30],['alumSilGlass',18],['silicone',8],['pcb',6]]],['Cooling & speakers','Copper heat pipes, aluminium fins, plastic fan, small magnets.',8,[['Cu',38],['Al',24],['abs',22],['magnetNd',8],['steel',8]]],['Cables & ports','Copper flex cables and port housings.',5,[['Cu',30],['pet',34],['steel',26],['Ni',5],['Au',.5],['abs',4.5]]]]);
DEV('Tablet',['tablet','ipad','android tablet','galaxy tab','kindle','e-reader','ereader','tablet computer'],'Electronic device','A typical tablet: an aluminium back, a large glass touchscreen, a lithium-ion battery that is about a third of the weight, and a small circuit board.',
[['Aluminium back & frame','Thin aluminium alloy casing.',30,[['alu6061',92],['steel',8]]],['Glass screen & display layers','Chemically strengthened glass over plastic films and LEDs.',27,[['alumSilGlass',68],['pet',14],['pmma',8],['Cu',3],['alu6061',7]]],['Battery','Lithium-ion pouch cells.',32,[['liCell',100]]],['Circuit board & chips','Processor, memory and radios.',8,[['pcb',100]]],['Cameras, speakers & glue','Small magnets, lenses and adhesive tape.',3,[['magnetNd',20],['pc',30],['pet',30],['Cu',10],['alumSilGlass',10]]]]);
DEV('Smartwatch',['smartwatch','smart watch','apple watch','fitbit','galaxy watch','fitness tracker','garmin watch'],'Electronic device','A typical smartwatch: an aluminium or stainless-steel case, a glass or sapphire screen, a small lithium battery, a circuit board, and a silicone or fluoroelastomer strap.',
[['Case','Aluminium alloy or stainless steel.',32,[['alu6061',60],['stainless',40]]],['Screen glass & display','Strengthened glass over an OLED panel.',14,[['alumSilGlass',70],['pet',15],['Cu',3],['alu6061',12]]],['Battery','Small lithium-ion cell.',16,[['liCell',100]]],['Circuit board & sensors','Chips, motion and heart-rate sensors.',10,[['pcb',100]]],['Strap','Silicone or fluoroelastomer band with a metal clasp.',28,[['silicone',88],['stainless',10],['Ti',2]]]]);
DEV('Phone charger (USB wall adapter)',['phone charger','charger','usb charger','wall charger','power adapter','usb wall adapter','charging brick','fast charger','power brick'],'Electronic device','A typical USB wall charger: a polycarbonate case, brass prongs, a transformer wound with copper wire on a ferrite core, and a small circuit board with capacitors and a switching chip.',
[['Plastic case','Polycarbonate shell, fire-resistant.',34,[['pc',100]]],['Prongs','Brass pins that plug into the socket.',12,[['brass',92],['Ni',8]]],['Transformer','Copper winding around a ferrite core with plastic bobbin.',28,[['Cu',34],['ferrite',46],['pbt',20]]],['Circuit board & capacitors','Switching chip, capacitors and diodes.',26,[['pcb',85],['Al',8],['steel',7]]]]);
DEV('Power bank',['power bank','powerbank','portable charger','battery pack usb','external battery','portable battery','anker'],'Electronic device','A typical power bank: mostly lithium-ion cells (about two thirds of the weight), inside an aluminium or ABS casing with a small circuit board.',
[['Lithium-ion cells','Cylindrical or pouch cells that store the energy.',68,[['liCell',100]]],['Casing','Aluminium sleeve or ABS plastic shell.',22,[['alu6061',50],['abs',50]]],['Circuit board & ports','Charging control chip and USB sockets.',8,[['pcb',85],['steel',15]]],['Cable','Short USB cable.',2,[['Cu',40],['pvc',60]]]]);
DEV('Wi-Fi router',['router','wifi router','wi-fi router','wireless router','modem router','home router'],'Electronic device','A typical home Wi-Fi router: a plastic case, a large circuit board with chips and a metal heat sink, antennas, and a power supply.',
[['Plastic case','ABS or polycarbonate shell.',45,[['abs',70],['pc',30]]],['Circuit board & chips','Processor, memory and radio chips.',28,[['pcb',100]]],['Heat sink & shield','Aluminium and tin-plated steel.',14,[['alu6061',60],['steel',40]]],['Antennas & cables','Copper and plastic.',8,[['Cu',40],['pvc',40],['brass',20]]],['Power adapter','Small transformer and cable.',5,[['Cu',34],['ferrite',30],['pc',36]]]]);
DEV('TV (LED/LCD flat screen)',['television','tv','tv set','flat screen tv','led tv','lcd tv','smart tv','oled tv','computer monitor'],'Electronic device','A typical LED-LCD television: two sheets of glass sandwiching a liquid-crystal layer, an acrylic light guide and LED backlight, a plastic frame and back cover, steel and aluminium supports, and circuit boards.',
[['Glass panels & films','Two glass sheets with liquid crystal between them, and plastic optical films.',31,[['alumSilGlass',58],['pet',18],['pmma',16],['C',2],['In2O3',1.5],['alu6061',4.5]]],['Plastic frame & back cover','Polystyrene/ABS housing.',27,[['ps',50],['abs',40],['pc',10]]],['Metal chassis & stand','Steel back plate and base.',20,[['steel',80],['alu6061',20]]],['Circuit boards','Power supply and image-processing boards.',11,[['pcb',100]]],['LED backlight & cables','LED strips on aluminium, copper cables.',7,[['alu6061',40],['Cu',30],['pvc',30]]],['Speakers & misc','Small magnets and foam.',4,[['magnetNd',15],['steel',25],['pet',30],['puFoam',30]]]]);
DEV('Car (petrol sedan)',['car','automobile','sedan','passenger car','toyota','honda civic','suv','motor car','petrol car','gas car','hatchback'],'Vehicle','A typical petrol car: about 60% steel and iron by weight, with aluminium parts, plastics, rubber tyres, glass, copper wiring, a lead-acid battery, fluids, and trace platinum-group metals in the catalytic converter.',
[['Steel body & frame','Pressed steel panels, beams, suspension and exhaust.',46,[['steel',97],['Zn',3]]],['Engine & gearbox','Cast iron and aluminium engine, steel gears.',20,[['castIron',40],['alCast',38],['steel',22]]],['Tyres','Rubber compound with carbon black and steel cord.',5,[['tireRubber',100]]],['Glass','Windscreen and windows.',3,[['sodaLime',100]]],['Interior & plastics','Seats (foam, fabric), dashboard and trim plastics.',11,[['pp',34],['puFoam',20],['pet',16],['abs',12],['pvc',10],['nylon',8]]],['Wiring & electronics','Copper harness, motors and control units.',3,[['Cu',55],['pvc',30],['pcb',15]]],['Battery','Lead-acid starter battery.',2,[['Pb',70],['H2SO4',8],['pp',8],['H2O',14]]],['Fluids','Fuel, engine oil, coolant, washer fluid.',8,[['C8H18',50],['C2H6O2',20],['H2O',20],['C25H52',10]]],['Catalytic converter','Ceramic honeycomb coated with platinum-group metals.',2,[['porcelain',96],['Pt',.3],['Pd',.3],['Rh',.05],['Ce',3]]]]);
DEV('Bicycle',['bicycle','bike','road bike','mountain bike'],'Vehicle','A typical bicycle: an aluminium (or steel) frame, steel chain, gears and spokes, rubber tyres and a plastic or leather saddle.',
[['Frame & fork','Aluminium alloy tubes.',38,[['alu6061',100]]],['Drivetrain & brakes','Steel chain, gears, cranks and brake parts.',27,[['steel',88],['alu6061',12]]],['Wheels','Aluminium rims, steel spokes and hubs.',15,[['alu6061',58],['steel',42]]],['Tyres & tubes','Rubber with nylon cords.',14,[['tireRubber',85],['nylon',15]]],['Saddle & grips','Foam, plastic and synthetic leather.',6,[['puFoam',40],['pp',30],['pvc',20],['steel',10]]]]);
DEV('Bike helmet',['helmet','bike helmet','bicycle helmet','safety helmet','cycling helmet'],'Everyday object','A typical bike helmet: a thick shell of expanded polystyrene foam with a thin polycarbonate outer skin and nylon or polyester straps.',
[['Foam liner','Expanded polystyrene that crushes to absorb impact.',72,[['ps',100]]],['Outer shell','Thin polycarbonate or PET skin.',14,[['pc',70],['pet',30]]],['Straps & buckle','Nylon webbing and plastic clips.',9,[['nylon',60],['pet',20],['abs',20]]],['Pads','Polyurethane foam comfort pads.',5,[['puFoam',100]]]]);
DEV('Eyeglasses',['glasses','eyeglasses','spectacles','sunglasses','reading glasses','eye glasses'],'Everyday object','Typical glasses: plastic (polycarbonate or CR-39) lenses, a cellulose-acetate or metal frame, small steel screws and hinges, and silicone nose pads.',
[['Lenses','Polycarbonate or hard-coated plastic.',40,[['pc',100]]],['Frame','Cellulose acetate or titanium/stainless metal.',48,[['celAcetate',70],['stainless',20],['ti64',10]]],['Hinges & screws','Small stainless steel parts.',8,[['stainless',100]]],['Nose pads','Silicone.',4,[['silicone',100]]]]);
DEV('Wristwatch (quartz)',['watch','wristwatch','wrist watch','quartz watch','analog watch','casio','rolex','seiko'],'Everyday object','A typical quartz wristwatch: a stainless-steel case and bracelet, a mineral or sapphire crystal, a brass and steel movement, and a silver-oxide button cell.',
[['Case & bracelet','316L stainless steel.',62,[['stainless',100]]],['Crystal','Sapphire (aluminium oxide) or hardened glass.',10,[['Al2O3',60],['sodaLime',40]]],['Movement','Quartz module with brass and steel gears and a small circuit.',20,[['brass',40],['steel',28],['pcb',20],['abs',12]]],['Battery','Silver-oxide button cell.',3,[['Ag2O',40],['Zn',25],['KOH',6],['steel',29]]],['Dial & hands','Brass and paint.',5,[['brass',70],['alu6061',20],['TiO2',10]]]]);
DEV('Refrigerator',['refrigerator','fridge','freezer','fridge freezer','kitchen fridge'],'Appliance','A typical refrigerator: a pressed-steel shell, plastic liners, a thick layer of polyurethane insulation foam, a steel compressor with a copper motor, aluminium or copper tubing, glass shelves and a trace of hydrocarbon refrigerant.',
[['Steel cabinet & doors','Painted/galvanised steel sheet.',40,[['steel',96],['Zn',2],['TiO2',2]]],['Plastic liners & shelves','Polystyrene/ABS inside, polypropylene bins.',17,[['ps',45],['abs',25],['pp',30]]],['Insulation foam','Polyurethane foam between the walls.',9,[['puFoam',100]]],['Compressor & motor','Steel and cast iron with a copper motor winding.',18,[['steel',50],['castIron',25],['Cu',25]]],['Tubing & coils','Copper and aluminium heat exchangers.',6,[['Cu',45],['alu6061',45],['steel',10]]],['Glass shelves & seals','Tempered glass and rubber gaskets.',9,[['sodaLime',70],['pvc',30]]],['Refrigerant & oil','Isobutane gas and compressor oil.',1,[['C4H10',40],['C25H52',60]]]]);
DEV('Washing machine',['washing machine','washer','laundry machine','front loader washer'],'Appliance','A typical washing machine: a painted-steel cabinet and drum, concrete or cast-iron counterweights, a plastic tub, a copper-wound motor, rubber seals and a glass door.',
[['Steel cabinet & drum','Painted steel and stainless-steel drum.',40,[['steel',60],['stainless',40]]],['Counterweights','Concrete or cast-iron blocks that steady the drum.',28,[['castIron',45],['cementPortland',22],['SiO2',33]]],['Plastic tub & parts','Polypropylene tub and housings.',14,[['pp',80],['abs',20]]],['Motor & wiring','Copper windings, steel rotor.',9,[['Cu',40],['steel',55],['pvc',5]]],['Door, seals & hoses','Glass window and rubber seals.',6,[['sodaLime',45],['rubber',55]]],['Controls','Circuit board.',3,[['pcb',100]]]]);
DEV('Car tyre',['tire','tyre','car tire','car tyre','wheel tire','rubber tire','tires','tyres'],'Vehicle part','A typical car tyre: roughly 45% rubber (natural and synthetic), about a quarter carbon black, steel cord belts, silica, textile cord and small amounts of zinc oxide and sulfur.',
[['Tyre','The whole tyre as a single composite.',100,[['tireRubber',100]]]]);
DEV('Incandescent light bulb',['incandescent bulb','incandescent light bulb','old light bulb','filament bulb','tungsten bulb','edison bulb','halogen bulb'],'Everyday object','A classic bulb: a soda-lime glass envelope filled with argon, a thin tungsten filament, nickel-plated support wires and a brass or aluminium screw base.',
[['Glass bulb','Soda-lime glass.',86,[['sodaLime',100]]],['Filament & wires','Tungsten filament on nickel-iron support wires.',2,[['W',50],['Ni',25],['Fe',20],['Mo',5]]],['Screw base','Brass or aluminium with lead-free solder.',11,[['brass',70],['alu6061',20],['solder',10]]],['Gas fill','Argon–nitrogen.',1,[['Ar',90],['N2',10]]]]);
DEV('Wedding ring (14k gold)',['gold ring','wedding ring','14k gold','14k gold ring','18k gold','gold jewelry','gold jewellery','engagement ring'],'Jewellery','14-carat gold is 58.5% gold alloyed with silver, copper and a little zinc to make it hard enough to wear (the exact mix sets the colour).',
[['Ring','14k yellow gold alloy.',100,[['Au',58.5],['Ag',12],['Cu',26.5],['Zn',3]]]]);
DEV('Toothpaste',['toothpaste','tooth paste','dentifrice','colgate','crest'],'Cosmetic','A typical fluoride toothpaste: about a quarter water, sorbitol and glycerin to keep it moist, hydrated silica as the gentle abrasive, a foaming agent, sodium fluoride (about 0.3%) and thickeners.',
[['Paste','All ingredients mixed together.',100,[['H2O',24],['C6H14O6',32],['C3H8O3',8],['SiO2',20],['C12H25NaO4S',1.5],['NaF',.32],['C6H10O5',2],['C6H8O7',.3],['TiO2',1],['C2H6O',.3]]]],{model:'concentric'});
DEV('Soap bar',['soap','bar soap','soap bar','hand soap bar','body soap'],'Cosmetic','A bar of traditional soap: sodium salts of fatty acids (sodium palmitate and stearate/oleate), some water and glycerin, and a little salt.',
[['Soap','Fatty-acid sodium salts, water and glycerin.',100,[['C16H31NaO2',40],['C18H33NaO2',30],['H2O',15],['C3H8O3',8],['NaCl',1.5],['C18H35NaO2',5.5]]]]);
DEV('Hand sanitizer (gel)',['hand sanitizer','sanitiser','sanitizer','hand sanitiser','alcohol gel'],'Cosmetic','Typical 70% alcohol gel: ethanol (or isopropanol), water, a little glycerin and a thickener.',
[['Gel','Alcohol and water thickened with a polymer.',100,[['C2H6O',66],['H2O',29],['C3H8O3',2],['C6H10O5',2],['C3H8O',1]]]]);
DEV('Concrete',['concrete','cement','portland cement','sidewalk','pavement','mortar','cured concrete'],'Building material','Cured concrete: gravel and sand glued by hardened cement paste. Cement is mostly calcium silicates, so the element list is dominated by oxygen, calcium, silicon and carbon (from limestone aggregate).',
[['Cement paste','Hydrated calcium silicate gel binding everything.',20,[['cementPortland',82],['H2O',18]]],['Sand','Quartz grains.',32,[['SiO2',100]]],['Gravel','Crushed limestone (or granite).',45,[['CaCO3',100]]],['Reinforcing steel','Rebar (in reinforced concrete).',3,[['steel',100]]]]);
DEV('Brick (fired clay)',['brick','bricks','clay brick','red brick','fired brick','masonry brick'],'Building material','Fired clay brick: aluminosilicate clay baked until it fuses; the red colour comes from iron oxide.',
[['Brick','Fired clay.',100,[['brickClay',100]]]]);
DEV('Porcelain / ceramic mug',['porcelain','ceramic','ceramic mug','coffee mug','mug','dinner plate','teacup','pottery','ceramic tile'],'Ceramic','Fired porcelain and ceramics: clay-based, essentially silicon and aluminium oxides with some potassium and calcium, usually with a glass-like glaze.',
[['Body','Fired kaolin-feldspar-quartz body.',94,[['porcelain',100]]],['Glaze','Thin glassy surface layer.',6,[['SiO2',62],['Al2O3',10],['CaO',9],['K2O',5],['Na2O',4],['ZnO',5],['B2O3',5]]]]);
DEV('Plywood / chipboard furniture',['plywood','chipboard','mdf','particleboard','particle board','ikea furniture','flat pack furniture','chair','table','bookshelf','wooden furniture','office desk','wooden chair','wooden table'],'Furniture','Wooden furniture: wood fibre (cellulose, hemicellulose, lignin) held with urea-formaldehyde or similar resin, a thin laminate or varnish, and steel screws.',
[['Wood panels','Wood fibre and chips.',82,[['wood',92],['CH4N2O',3],['CH2O',2],['H2O',3]]],['Surface coating','Melamine/paper laminate or varnish.',10,[['C3H6N6',45],['cellulose',35],['TiO2',10],['C',10]]],['Screws & hinges','Steel fittings.',8,[['steel',100]]]]);
DEV('Mattress',['mattress','bed mattress','foam mattress','pillow','cushion','sofa foam'],'Furniture','A typical foam mattress: polyurethane foam, a polyester/cotton cover, and sometimes steel springs.',
[['Foam layers','Polyurethane and memory foam.',74,[['puFoam',100]]],['Cover & fill','Polyester and cotton fabric.',14,[['pet',70],['cellulose',30]]],['Springs & frame','Steel coils (innerspring models).',12,[['steel',100]]]]);
DEV('Blood',['blood','human blood','red blood','plasma blood'],'Biological','Blood is about 80% water, 17–18% protein (haemoglobin and plasma proteins), with salts, sugar and fats; the iron in haemoglobin is only about 0.05% of the total.',
[['Blood','Plasma and cells.',100,[['H2O',80.5],['protein',17],['NaCl',.7],['C6H12O6',.1],['fat',.6],['K',.02],['Ca',.008],['Fe',.047],['Mg',.003],['P',.012],['Zn',.001]]]],{phase:'liquid'});
/* ===== FOODS: typical composition per 100 g (macronutrients + minerals), elements derived from formulas ===== */
function FD(names,title,label,w,p,f,c,sug,fib,Na,K,Ca,Mg,P,Fe,Zn,more){FOOD(names,title,label,{w:w,p:p,f:f,c:c,sug:sug,fib:fib,Na:Na,K:K,Ca:Ca,Mg:Mg,P:P,Fe:Fe,Zn:Zn},more);}
/* names, title, label, water, protein, fat, carbs, sugar, fibre, Na, K, Ca, Mg, P, Fe, Zn  (g and mg per 100 g) */
FD(['apple','apples','red apple','green apple'],'Apple','Fruit',85.6,.3,.2,13.8,10.4,2.4,1,107,6,5,11,.12,.04);
FD(['orange','oranges'],'Orange','Fruit',86.8,.9,.1,11.8,9.4,2.4,0,181,40,10,14,.1,.07);
FD(['grape','grapes'],'Grapes','Fruit',80.5,.7,.2,18.1,15.5,.9,2,191,10,7,20,.36,.07);
FD(['strawberry','strawberries'],'Strawberry','Fruit',90.9,.7,.3,7.7,4.9,2,1,153,16,13,24,.41,.14);
FD(['tomato','tomatoes'],'Tomato','Fruit / vegetable',94.5,.9,.2,3.9,2.6,1.2,5,237,10,11,24,.27,.17);
FD(['potato','potatoes','raw potato'],'Potato','Vegetable',79.3,2,.1,17.5,.8,2.1,6,425,12,23,57,.78,.3);
FD(['carrot','carrots'],'Carrot','Vegetable',88.3,.9,.2,9.6,4.7,2.8,69,320,33,12,35,.3,.24);
FD(['onion','onions'],'Onion','Vegetable',89.1,1.1,.1,9.3,4.2,1.7,4,146,23,10,29,.21,.17);
FD(['broccoli'],'Broccoli','Vegetable',89.3,2.8,.4,6.6,1.7,2.6,33,316,47,21,66,.73,.41);
FD(['spinach'],'Spinach','Vegetable',91.4,2.9,.4,3.6,.4,2.2,79,558,99,79,49,2.7,.53);
FD(['lettuce','iceberg lettuce','salad leaves'],'Lettuce','Vegetable',95.6,.9,.1,3,2,1.2,10,141,18,7,20,.41,.15);
FD(['cucumber','cucumbers'],'Cucumber','Vegetable',95.2,.7,.1,3.6,1.7,.5,2,147,16,13,24,.28,.2);
FD(['avocado','avocados'],'Avocado','Fruit',73.2,2,14.7,8.5,.7,6.7,7,485,12,29,52,.55,.64);
FD(['rice','white rice','cooked rice','steamed rice'],'Cooked white rice','Grain',68.4,2.7,.3,28.2,0,.4,1,35,10,12,43,.2,.49);
FD(['bread','white bread','sandwich bread','toast','loaf of bread'],'White bread','Baked food',36.7,9,3.2,49,5,2.7,490,115,260,25,99,3.6,.74,{salt:1.5});
FD(['pasta','spaghetti','cooked pasta','noodles','macaroni'],'Cooked pasta','Grain',62,5.8,.9,30.9,.6,1.8,1,44,7,18,58,1.3,.5);
FD(['oats','oatmeal','porridge oats','rolled oats'],'Oats (dry)','Grain',8.2,16.9,6.9,66.3,1,10.6,2,429,54,177,523,4.7,4);
FD(['egg','eggs','hen egg','boiled egg','fried egg'],'Egg (whole)','Animal product',76.2,12.6,9.5,.7,.4,0,142,138,56,12,198,1.75,1.3);
FD(['chicken','chicken breast','raw chicken','roast chicken'],'Chicken breast','Meat',74.9,22.5,2.6,0,0,0,45,370,5,28,213,.37,.68);
FD(['beef','ground beef','minced beef','steak','hamburger meat','burger patty'],'Beef (ground)','Meat',63.7,17.2,20,0,0,0,66,270,12,18,158,1.9,4.2);
FD(['pork','pork loin','pork chop','pork meat'],'Pork (loin)','Meat',72,21,6,0,0,0,50,350,10,25,220,.8,2);
FD(['salmon','salmon fillet','atlantic salmon'],'Salmon','Fish',68.5,20.4,13.4,0,0,0,59,363,12,27,240,.34,.36);
FD(['tuna','tuna fish','yellowfin tuna'],'Tuna','Fish',74,24.4,.5,0,0,0,39,441,4,50,254,.77,.6);
FD(['tofu','firm tofu'],'Tofu (firm)','Plant protein',84.6,8,4.8,1.9,.6,.3,7,121,350,30,97,2.7,.8);
FD(['cheese','cheddar','cheddar cheese'],'Cheddar cheese','Dairy',37,24.9,33.1,1.3,.5,0,653,98,710,28,460,.7,3.1,{salt:1.3});
FD(['yogurt','yoghurt','plain yogurt','greek yogurt'],'Plain yogurt','Dairy',88,3.5,3.3,4.7,4.7,0,46,155,121,12,95,.05,.6,{liquid:false});
FD(['butter'],'Butter (salted)','Dairy',16,.9,81.1,.1,.1,0,643,24,24,2,24,.02,.09,{salt:1.5});
FD(['olive oil','vegetable oil','sunflower oil','cooking oil bottle','canola oil'],'Olive / vegetable oil','Fat',0,0,100,0,0,0,2,1,1,0,0,.56,0,{liquid:true});
FD(['peanut butter'],'Peanut butter','Spread',1.2,25,50,20,9.2,6,426,649,49,168,335,1.9,2.5,{salt:1.5});
FD(['almond','almonds'],'Almonds','Nut',4.4,21.2,49.9,21.6,4.4,12.5,1,733,269,270,481,3.7,3.1);
FD(['peanut','peanuts','groundnut'],'Peanuts','Nut',6.5,25.8,49.2,16.1,4.7,8.5,18,705,92,168,376,4.6,3.3);
FD(['lentils','lentil','cooked lentils'],'Cooked lentils','Legume',69.6,9,.4,20.1,1.8,7.9,2,369,19,36,180,3.3,1.3);
FD(['black beans','beans','kidney beans','cooked beans'],'Cooked black beans','Legume',66,8.9,.5,23.7,.3,8.7,1,355,27,70,140,2.1,1.1);
FD(['corn','sweetcorn','sweet corn','maize'],'Sweet corn','Vegetable / grain',76,3.3,1.4,19,6.3,2,15,270,2,37,89,.5,.45);
FD(['dark chocolate','chocolate','dark chocolate bar','cocoa chocolate'],'Dark chocolate (70-85%)','Sweet',1.4,7.8,42.6,45.9,24,10.9,20,715,73,228,308,11.9,3.3);
FD(['milk chocolate','chocolate bar'],'Milk chocolate','Sweet',1.3,7.7,29.7,59.4,51.5,3.4,79,372,189,63,208,2.3,2.3);
FD(['potato chips','chips','crisps','potato crisps'],'Potato chips','Snack',2,7,35,53,0.3,4.8,525,1275,24,69,172,1.3,1,{salt:1.5});
FD(['bacon','cooked bacon','fried bacon'],'Cooked bacon','Meat',12.7,37,42,1.4,0,0,1717,565,14,33,533,1.4,3.6,{salt:1.5});
FD(['ketchup','tomato ketchup','tomato sauce'],'Ketchup','Sauce',68.6,1,.1,27,22.8,.3,907,379,15,15,26,.4,.2,{salt:1.5,liquid:true});
FD(['sugar cookie','cookie','cookies','biscuit','biscuits'],'Cookie (plain)','Baked food',4,5,20,68,30,2,380,120,30,20,100,3,.6,{salt:1.3});
FD(['pizza','cheese pizza','slice of pizza'],'Cheese pizza (slice)','Prepared food',45,11,10,34,3.5,2.3,600,184,188,24,190,2.5,1.4,{salt:1.5});
FD(['french fries','fries','chips fried','fried potatoes'],'French fries','Prepared food',38,3.4,15,41,0.3,3.8,210,579,11,30,100,1,.4,{salt:1.5});
FD(['mushroom','mushrooms','button mushroom'],'Mushroom','Vegetable / fungus',92.4,3.1,.3,3.3,2,1,5,318,3,9,86,.5,.52);
FD(['peas','green peas'],'Green peas','Vegetable',78.9,5.4,.4,14.5,5.7,5.1,5,244,25,33,108,1.5,1.2);
FD(['cabbage'],'Cabbage','Vegetable',92.2,1.3,.1,5.8,3.2,2.5,18,170,40,12,26,.47,.18);
FD(['watermelon'],'Watermelon','Fruit',91.5,.6,.2,7.6,6.2,.4,1,112,7,10,11,.24,.1);
FD(['pineapple'],'Pineapple','Fruit',86,.5,.1,13.1,9.9,1.4,1,109,13,12,8,.29,.12);
FD(['mango'],'Mango','Fruit',83.5,.8,.4,15,13.7,1.6,1,168,11,10,14,.16,.09);
FD(['lemon','lemons'],'Lemon','Fruit',88.98,1.1,.3,9.3,2.5,2.8,2,138,26,8,16,.6,.06);
FD(['coconut','coconut meat'],'Coconut (fresh)','Fruit',47,3.3,33.5,15.2,6.2,9,20,356,14,32,113,2.4,1.1);
FD(['walnut','walnuts'],'Walnuts','Nut',4.1,15.2,65.2,13.7,2.6,6.7,2,441,98,158,346,2.9,3.1);
FD(['soy sauce'],'Soy sauce','Sauce',71,8,.1,5.6,.4,.8,5500,435,33,74,166,1.5,.4,{salt:1.5,liquid:true});
FD(['mayonnaise','mayo'],'Mayonnaise','Sauce',15,1,75,.6,.6,0,635,20,8,2,15,.2,.2,{salt:1.5});
/* ===== CATEGORY ENGINE DATA (smart estimates for anything else) ===== */
function CT(title,kw,summary,comp,more){var o={cat:true,title:title,label:'Category estimate',names:kw,summary:summary,comp:comp};for(var k in(more||{}))o[k]=more[k];add(o);}
CT('Fruit',['fruit','apple','orange','grape','lemon','lime','mango','pear','peach','plum','cherry','berry','strawberry','blueberry','raspberry','melon','watermelon','pineapple','kiwi','papaya','grapefruit','apricot','fig','coconut','tomato','avocado','pomegranate','mandarin','tangerine'],'Fruit is mostly water with sugars, fibre and acids.',
'O|78|Water in the juicy pulp cells and in the sugar molecules|Mostly as water\nC|11|Sugars, fibre (cellulose, pectin) and acids in pulp and skin|Carbohydrate skeleton\nH|10|Water and sugars|Bonded to O and C\nK|0.2|Dissolved in the cell sap|Main fruit mineral\nN|0.15|Amino acids and proteins in pulp and seeds|Protein building block\nCa|0.03|Cell walls and peel (calcium pectate)|Firms up cell walls\nMg|0.02|Green skin (chlorophyll) and sap|Chlorophyll core\nP|0.02|Seeds and cell membranes|Energy molecules');
CT('Vegetable',['vegetable','potato','carrot','onion','lettuce','spinach','cabbage','broccoli','cucumber','pepper','corn','garlic','celery','mushroom','salad','pumpkin','beet','radish','kale','zucchini','eggplant','peas','beans','lentil'],'Vegetables are water-rich plant tissue with starch, fibre and some minerals.',
'O|80|Water in plant cells and carbohydrate molecules|Mostly as water\nC|9|Starch, sugars and cellulose fibre|Carbohydrate skeleton\nH|10|Water and carbohydrates|Bonded to O and C\nN|0.3|Proteins and amino acids|Protein building block\nK|0.3|Dissolved in cell sap|Main plant mineral\nS|0.05|Sulfur compounds (strong in onion and garlic)|Flavour molecules and proteins\nCa|0.05|Cell walls|Firms up tissue\nMg|0.03|Chlorophyll centre in green parts|Chlorophyll core\nP|0.05|Cell membranes and seeds|Energy molecules');
CT('Meat, fish & eggs',['meat','beef','chicken','pork','steak','fish','salmon','tuna','lamb','bacon','sausage','turkey','ham','shrimp','egg','eggs','burger','hamburger','hot dog','seafood','tofu'],'Animal protein foods: water, protein and fat.',
'O|65|Water in muscle fibres (~70%), plus proteins and fats|Mostly as water\nC|18|Proteins (actin, myosin) and fat droplets|Backbone of proteins and fat\nH|10|Water and organic molecules|Bonded to O and C\nN|3|Muscle proteins (amino acids)|Protein\nK|0.3|Inside muscle cells|Electrolyte\nP|0.2|Phosphates and cell membranes|Energy (ATP)\nS|0.2|Amino acids cysteine and methionine|Holds proteins in shape\nNa|0.1|Fluid between cells|Electrolyte\nCa|0.01|Shell/bone fragments|Hardness\nFe|0.003|Myoglobin (the red pigment) in muscle|Carries oxygen');
CT('Dairy product',['cheese','yogurt','yoghurt','butter','cream','ice cream','custard','dairy'],'Dairy: milk fat, protein and calcium phosphate.',
'C|35|Milk fat and casein protein|Fat and protein backbone\nO|40|Water and organic molecules|Water and organics\nH|9|Water and fat|Bonded to C and O\nN|4|Casein protein|Protein\nCa|1|Casein micelles (calcium phosphate)|Bone-building mineral\nNa|0.7|Added salt|Flavour and preservation\nP|0.7|Casein micelles|Part of the micelles\nS|0.2|Whey proteins|Amino-acid sulfur');
CT('Bread, grain & pasta',['sushi','fries','popcorn','toast','pretzel','muffin','donut','doughnut','porridge','granola','bread','rice','pasta','flour','cake','cookie','biscuit','cereal','wheat','oat','oats','noodle','noodles','pizza','pastry','cracker','grain','dough','tortilla','bagel','pancake','waffle','sandwich','burrito'],'Starchy foods: starch granules, some protein, water and salt.',
'O|49|Starch molecules and water|Part of starch and water\nC|38|Starch (long glucose chains) and gluten protein|Carbohydrate backbone\nH|7|Starch and water|Bonded to C and O\nN|1.5|Gluten and other proteins|Protein\nNa|0.4|Added salt|Flavour\nK|0.15|Bran and germ|Mineral\nP|0.1|Bran and germ (phytate)|Mineral\nMg|0.05|Bran and germ|Mineral\nFe|0.003|Enriched flour|Fortification');
CT('Candy & chocolate',['candy','chocolate','sweet','sweets','gum','jelly','lollipop','caramel','dessert','marshmallow','cocoa'],'Sweets: mostly sugar plus fat and flavourings.',
'C|45|Sugar and cocoa fat|Sugar and fat backbone\nO|40|Sugar molecules|Part of sugar\nH|7|Sugar and fat|Bonded to C and O\nN|1|Cocoa and milk proteins|Protein\nMg|0.2|Cocoa solids|Mineral\nK|0.5|Cocoa solids|Mineral\nCa|0.1|Milk solids|Mineral');
CT('Water-based food or drink',['soup','sauce','ketchup','jam','mayonnaise','gravy','broth','beverage','drink','smoothie','energy drink'],'Most drinks are mostly water with dissolved sugars or acids.',
'O|87|Water|Solvent\nH|11|Water|Solvent\nC|1.8|Dissolved sugars and acids|Flavour and sweetness\nN|0.02|Amino acids|Trace\nK|0.03|Dissolved minerals|Trace\nNa|0.01|Dissolved minerals|Trace');
CT('Wood',['wood','wooden','timber','log','plank','lumber','tree','bark','branch','plywood','bamboo','stick','twig','sawdust','mdf','cork'],'Wood: cellulose fibres glued by lignin.',
'C|49.5|Cellulose fibres and lignin glue in every cell wall|Structural polymers\nO|43.5|Cellulose and lignin|Part of the polymers\nH|6.2|Cellulose and lignin|Bonded to C and O\nN|0.3|Proteins in living cells|Trace\nCa|0.3|Calcium-oxalate crystals in cell walls|Hardness\nK|0.1|Sap|Trace\nMg|0.05|Sap|Trace\nSi|0.05|Silica grains (more in bamboo)|Dulls saws');
CT('Paper & cardboard',['paper','cardboard','book','newspaper','magazine','tissue','notebook','envelope','carton','box','card','napkin','receipt'],'Paper: cellulose fibres with a chalk filler.',
'O|48|Cellulose and filler|Part of the polymers\nC|43|Cellulose fibres|Polymer backbone\nH|6|Cellulose|Bonded to C and O\nCa|2|Calcium-carbonate filler in the sheet|Whiteness and smoothness\nAl|0.5|Clay coating|Gloss\nSi|0.3|Clay coating|Gloss\nTi|0.3|TiO₂ whitener|Brightness');
CT('Wool, silk, hair & leather',['wallet','belt','purse','handbag','saddle','suede','wool','silk','hair','fur','fingernail','feather','horn','leather','skin','sweater','cashmere','claw','wig'],'Protein fibres (keratin, fibroin or collagen).',
'C|49|Protein chains|Protein backbone\nO|22|Protein chains|Part of amino acids\nN|16|Amino acids|Protein\nH|6.5|Protein chains|Bonded to C, N, O\nS|3|Cysteine bridges between chains (strongest in hair and wool)|Locks protein chains together');
CT('Plastic item',['bottle','cap','lid','cup','bag','toothbrush','ruler','button','sponge','brush','hose','doll','phone case','keycard','card','clip','tube','plastic','polymer','resin','toy','packaging','pen','ballpoint','comb','straw','bin','helmet','case','cover'],'Most plastics are carbon–hydrogen chains with additives.',
'C|78|Along the polymer chains|Chain backbone\nH|10|Side atoms on the chains|Fills the carbon bonds\nO|8|Ester and other polar links|Polar links\nN|1|Amide groups (nylon/ABS parts)|Strength\nCl|1.5|PVC parts|Flame retardant\nTi|0.5|White pigment (TiO₂)|Colour\nCa|0.5|Chalk filler|Filler\nZn|0.3|Stabiliser|Heat stability');
CT('Rubber & soles',['wheel','yoga mat','mat','rubber duck','rubber','tyre','tire','latex','balloon','ball','glove','gloves','boot','boots','sneaker','shoe','shoes','sandal','flip flop'],'Rubber with carbon-black reinforcement and sulfur cross-links.',
'C|72|Rubber chains and carbon-black filler|Polymer backbone and reinforcing filler\nH|8|Rubber chains|Bonded to carbon\nO|8|Silica filler and additives|Filler\nSi|3|Silica filler|Grip and strength\nS|1.5|Cross-links between rubber chains|Vulcanising\nZn|1.5|Zinc oxide activator|Speeds curing\nFe|5|Steel cords in tyres|Reinforcement');
CT('Ceramic / porcelain / brick',['saucer','jug','pot','roof tile','chimney','fireplace','ceramic','porcelain','pottery','tile','tiles','clay','brick','mug','plate','dish','toilet','bowl','vase','teapot','sink','bathtub','china','stoneware','terracotta','flower pot'],'Fired clay: silicates of aluminium with feldspar and glaze.',
'O|52|Oxide network of silica and alumina|Part of the oxides\nSi|24|Silica and aluminosilicate crystals|Hard glassy frame\nAl|14|Clay (kaolin) crystals|Frame and strength\nK|2.5|Feldspar flux|Flux\nCa|1.5|Glaze and flux|Glaze\nNa|1|Flux|Flux\nFe|1.2|Iron oxide (brick red, glaze colour)|Colour\nMg|0.5|Talc / glaze|Flux\nTi|0.5|Glaze opacifier|Whiteness',
{parts:'Clay body|Fired aluminosilicate crystals bonded by glass.|Si,Al,O,K\nGlaze|Thin glassy coating on the surface.|Si,O,Ca,Na\nColour oxides|Iron, titanium or other pigments.|Fe,Ti'});
CT('Concrete / cement',['concrete','cement','mortar','plaster','pavement','sidewalk','stucco'],'Hardened calcium silicate cement binding sand and gravel.',
'O|50|Silicates, aggregates and bound water|Part of oxides\nCa|20|Calcium-silicate-hydrate gel binding the sand and stones|The glue (cement paste)\nSi|14|Sand and gravel; calcium silicate|Aggregate and binder\nC|3|Limestone (carbonate)|Carbonate\nAl|3|Cement phases and clay|Binder\nFe|2|Cement colour and rebar traces|Colour\nS|1|Gypsum in the cement|Sets cement timing\nMg|1|Cement and dolomite|Binder\nH|1|Bound water|Water');
CT('Rock / mineral',['rock','stone','mineral','pebble','boulder','crystal','gem','gemstone','cobblestone','basalt','slate','gravel','pumice','obsidian','lava','cliff','mountain','shale'],'Average continental crust composition: silicate minerals.',
'O|47|Bonded in every silicate mineral|Bonded to Si and metals\nSi|28|Quartz and the silicate frames of feldspar and mica|Silicate backbone\nAl|8|Feldspars and clays|Aluminosilicate frame\nFe|5|Dark minerals and oxides|Dark colour\nCa|3.6|Calcium feldspar and carbonates|Mineral component\nNa|2.8|Sodium feldspar|Mineral component\nK|2.6|Potassium feldspar and mica|Mineral component\nMg|2.1|Dark minerals|Mineral component\nTi|0.4|Accessory minerals|Minor');
CT('Soil / dirt',['soil','dirt','earth','mud','ground','compost','topsoil','dust'],'Mineral grains plus decaying plant matter and water.',
'O|47|Mineral grains and water|Part of minerals\nSi|27|Sand and silt (quartz)|Mineral grains\nAl|7|Clay minerals|Clay frame\nFe|4|Iron oxides (brown/red colour)|Colour\nC|2|Humus (decayed plant matter)|Organic matter\nCa|1.5|Mineral and shells|Mineral\nK|1.4|Clay and feldspar|Mineral\nMg|0.8|Clay|Mineral\nH|1|Water and humus|Water\nN|0.2|Humus and proteins|Plant nutrient\nP|0.1|Mineral and fertiliser|Plant nutrient');
CT('Metal object (unspecified alloy)',['metal','metallic','alloy','metals'],'An unspecified metal object: estimated as a mix of the most common structural metals.',
'Fe|72|Throughout the metal body|Base structural metal\nAl|10|Light parts and alloy additions|Light metal\nCu|6|Wiring and brass parts|Conductor\nZn|4|Coating and brass parts|Corrosion coating\nCr|3|Alloy addition|Corrosion resistance\nNi|3|Alloy addition|Toughness\nC|1|Inside steel grains|Hardening\nSn|1|Solder and plating|Coating',{generic:true});
CT('Electronic device',['microphone','airpods','airpod','earphones','earphone','headset','webcam','ipad','macbook','smart speaker','gopro','apple watch','fitbit','hdd','tv remote','socket','sensor','antenna','modem','vape','laptop','computer','pc','tablet','tv','television','monitor','router','camera','console','playstation','xbox','headphones','headphone','earbuds','speaker','smartwatch','watch','drone','keyboard','mouse','remote','charger','adapter','motherboard','pcb','circuit','circuit board','gadget','device','electronic','electronics','appliance','microwave','fridge','refrigerator','washing machine','oven','printer','scanner','radio','calculator','flash drive','usb drive','sd card','hard drive','solar panel','toaster','kettle','fan','robot','raspberry pi','game controller','gamepad','joystick','projector'],'Typical electronics: plastic housing, steel and aluminium parts, copper wiring, glass and circuit boards with trace precious metals.',
'C|26|Plastic housings, circuit-board resin|Plastic structure\nO|18|Plastics, glass, oxides|Part of plastics and glass\nFe|14|Frames, screws, shielding|Structure\nSi|8|Glass screens and chips|Glass and semiconductors\nCu|7|Wiring and circuit-board traces|Conductor\nAl|7|Heat sinks and casings|Light structure and cooling\nH|4|Plastics|Bonded to carbon\nCa|2|Glass and fillers|Filler\nSn|1.5|Solder|Joins parts\nZn|1.5|Plating|Coating\nNi|1|Plating|Corrosion plating\nMg|0.5|Casings|Light alloy\nBr|0.5|Flame retardants in plastics|Fire safety\nPb|0.3|Old solder and glass|Legacy\nSb|0.2|Flame-retardant synergist|Fire safety\nAg|0.05|Solder and contacts|Conductor\nAu|0.03|Connector plating|Contacts\nPd|0.01|Capacitors and contacts|Contacts',
{parts:'Housing|Plastics, aluminium or steel shell.|C,H,Al,Fe\nCircuit board|Glass-fibre resin carrying copper traces, solder and chips.|Cu,Sn,Si,C,Au\nDisplay or glass|Glass and thin conductive layers.|Si,O,In\nWiring & connectors|Copper wire and plated contacts.|Cu,Ni,Au,Zn'});
CT('Vehicle',['tesla','bmw','mercedes','toyota','ford','ferrari','audi','honda','lorry','taxi','ambulance','submarine','ebike','e bike','jeep','suv','sedan','kayak','canoe','car','truck','bike','bicycle','motorcycle','scooter','vehicle','bus','train','plane','airplane','aeroplane','aircraft','ship','boat','van','tractor','helicopter','skateboard'],'Vehicles are mostly steel and aluminium with plastics, rubber and glass.',
'Fe|55|Body panels, chassis and engine|Strong structure\nC|15|Plastics, rubber tyres, fluids|Plastics and rubber\nAl|8|Engine parts and trim|Light structure\nO|8|Glass, oxides and plastics|Part of glass\nH|2|Plastics, rubber, fluids|Bonded to C\nSi|3|Glass and tyres|Glass\nCu|2|Wiring and motors|Conductor\nZn|1|Galvanised coating|Rust protection\nPb|0.5|Battery|Battery plates\nNi|0.4|Steel alloys and battery|Alloy\nCr|0.5|Trim and alloys|Shiny corrosion-resistant coating',
{parts:'Body & frame|Steel (and aluminium) panels, galvanised.|Fe,Al,Zn\nEngine / motor|Cast iron, aluminium, copper windings.|Fe,Al,Cu\nTyres|Rubber with carbon black and steel cords.|C,H,S,Fe\nGlass & interior|Windows, plastics and foam.|Si,O,C,H'});
CT('Furniture & instrument',['drawer','bench','flute','drum','swing','crib','chair','table','desk','sofa','couch','bed','shelf','bookshelf','cabinet','furniture','wardrobe','stool','mattress','guitar','piano','violin','door','fence','ladder','picture frame'],'Furniture is mostly wood or particleboard with steel fittings and foam padding.',
'C|42|Wood fibres, glue, upholstery foam|Wood and foam polymers\nO|38|Wood, glue and glass|Part of polymers\nH|6|Wood and foam|Bonded to C and O\nFe|8|Screws, hinges and legs|Hardware\nN|1.5|Glue and foam|Polyurethane foam\nAl|1.5|Trim and legs|Light metal\nSi|1|Glass and paint|Glass and filler\nCu|0.5|Brass fittings|Fittings\nZn|0.5|Brass and plating|Plating\nCa|0.5|Fillers|Fillers',{parts:'Wood frame|Cellulose and lignin; sometimes chipboard with resin glue.|C,H,O\nFixings|Steel screws, hinges, brackets.|Fe,Zn\nUpholstery foam|Polyurethane foam and fabric.|C,H,N,O'});
CT('Building',['house','building','wall','roof','floor','bridge','skyscraper','home','room','tower'],'Buildings are mostly concrete, brick, wood and steel.',
'O|48|Concrete, brick, wood, glass|Part of oxides\nSi|14|Brick, glass, concrete aggregate|Silicate\nCa|12|Cement and plaster|Cement binder\nC|12|Wood, plastics, insulation|Organic materials\nFe|4|Reinforcing steel and fittings|Structure\nAl|3|Clay brick, window frames|Frames\nH|3|Wood, water, plastics|Bonded to C and O\nMg|0.5|Cement|Binder');
CT('Machine / engine',['engine','motor','machine','gear','pump','turbine','generator','bearing','drill','saw','lawnmower','crane','excavator'],'Machines are mostly steel and cast iron with aluminium, copper windings and some oil.',
'Fe|70|Frame, gears and shafts|Strong structure\nAl|10|Housings and light parts|Light structure\nCu|5|Motor windings|Conductor\nC|8|Steel carbon, plastics and lubricants|Steel hardening and oil\nZn|1|Plating and brass|Coating\nNi|1|Alloy steel|Alloy\nCr|1|Hardened steel|Hardness\nH|1.5|Oil and plastics|Bonded to C\nSn|0.5|Bearings|Bearing alloy');
CT('Jewellery',['jewelry','jewellery','ring','necklace','bracelet','earring','earrings','pendant','wedding ring','gold ring','gold chain'],'Typical 14-karat gold alloy (58% gold); other metals harden it and shift the colour.',
'Au|58.5|Throughout the alloy|Gives the colour and prevents tarnish\nCu|25|Dissolved in the gold lattice|Hardens and gives a reddish tint\nAg|12|Dissolved in the gold lattice|Lightens the colour\nZn|4.5|Dissolved in the gold lattice|Hardens and lowers melting point');
CT('Soap / cosmetics',['toilet paper','wipes','hair gel','body wash','hand cream','nail varnish','soap','shampoo','toothpaste','lotion','face cream','moisturizer','lipstick','makeup','perfume','deodorant','sunscreen','detergent','cleaner','conditioner','shaving cream','nail polish','mascara'],'Personal-care products are mostly water, surfactants, oils and small amounts of minerals.',
'O|62|Water and oils|Water and fatty molecules\nC|20|Surfactants, oils and waxes|Fatty chains\nH|10|Water and oils|Bonded to C and O\nNa|2.5|Soap and detergent salts|Cleaning salts\nSi|1.5|Silicones and silica|Silky feel, abrasive\nS|1|Sulfate surfactants|Cleaning\nCl|0.8|Salts|Thickener\nCa|1|Toothpaste calcium carbonate|Abrasive\nTi|0.2|TiO₂ and sunscreen|White pigment\nF|0.1|Toothpaste fluoride|Prevents cavities');
CT('Medicine / pill',['pill','pills','medicine','drug','medication','capsule','vitamin','vitamins','supplement','antibiotic','painkiller','ointment'],'A tablet: active drug with fillers and binders.',
'C|50|Active drug and cellulose filler|Organic skeleton\nO|30|Active drug and fillers|Part of organics\nH|6|Organic molecules|Bonded to C and O\nN|3|Active drug groups|Active site\nMg|1|Magnesium stearate lubricant|Helps tablets press\nSi|1|Silica flow agent|Keeps powder flowing\nCa|0.5|Calcium filler|Filler\nTi|0.3|TiO₂ coating|White coating');
CT('Coal / charcoal',['coal','charcoal','briquette'],'Coal and charcoal: mostly carbon with ash.',
'C|80|Carbon-rich matter making up the fuel|The fuel\nH|4|Left-over hydrocarbons|Volatile part\nO|8|Bound in the carbon structure|Impurity\nS|1|Sulfur impurity|Makes acid gas when burnt\nN|1.5|Bound nitrogen|Impurity\nSi|2|Ash (silicates)|Ash\nAl|1|Ash (clays)|Ash\nFe|0.7|Ash (pyrite)|Ash');
CT('Paint / ink / glue',['marker','highlighter','sticker','sticky note','label','paint','ink','dye','pigment','lacquer','varnish','glue','adhesive','epoxy','tape'],'Paint: polymer binder with mineral pigments and fillers.',
'O|42|Binder, pigments and fillers|Part of binder and pigments\nC|30|Polymer binder|Binder backbone\nH|8|Binder|Bonded to C\nTi|9|TiO₂ white pigment|Opacity\nCa|4|Calcium-carbonate filler|Filler\nSi|3|Silica filler|Filler\nAl|1|Pigment|Colour\nZn|1|Zinc oxide|Anti-mould\nN|1|Binder|Binder');
CT('Animal',['animal','dog','cat','horse','cow','bird','insect','bug','spider','bee','ant','mammal','reptile','frog','snake','pig','sheep','goat','rabbit','whale','dolphin','elephant','lion','tiger','bear','monkey','duck','butterfly','worm'],'Animal bodies: water, proteins, fats and bone minerals.',
'O|62|Water and organic molecules|Water and organics\nC|20|Proteins, fats, DNA|Backbone of organic molecules\nH|9.5|Water and organics|Bonded to O and C\nN|3.5|Proteins and DNA|Amino acids\nCa|1.5|Bones, teeth or shell|Hardness\nP|1|Bones and DNA|Bone and energy\nK|0.3|Inside cells|Nerves\nS|0.3|Proteins|Protein shape\nNa|0.15|Body fluid|Fluids\nCl|0.15|Body fluid|Fluids\nFe|0.01|Blood|Oxygen carrier');
CT('Plant',['tobacco','cigarette','cigar','peanut','almond','walnut','olive','hay','straw','plant','leaf','leaves','grass','flower','seed','nut','nuts','herb','weed','moss','algae','seaweed','cactus','fern','rose','tulip','bush','shrub'],'Fresh plant tissue: water, carbohydrates and a little protein.',
'O|78|Water in the cells and carbohydrates|Mostly water\nC|11|Cellulose and sugars|Structural and energy\nH|10|Water and carbohydrates|Bonded to O and C\nN|0.4|Proteins and chlorophyll|Protein and chlorophyll\nK|0.25|Cell sap|Water balance\nCa|0.12|Cell walls|Strengthens walls\nMg|0.05|Chlorophyll core|Photosynthesis\nP|0.05|Cell membranes|Energy\nS|0.03|Proteins|Protein shape');
CT('Gas (unspecified)',['gas','gases','vapor','vapour','fumes','smoke','exhaust'],'An unspecified gas: estimated with ordinary air as the baseline. Name the gas (helium, methane, chlorine…) for an exact answer.',
'N|75.5|Evenly mixed throughout the gas as N₂ molecules|Main filler gas\nO|23.2|Evenly mixed as O₂ molecules|Reactive gas\nAr|1.28|Evenly mixed as single atoms|Inert filler\nC|0.02|Evenly mixed as CO₂|Trace greenhouse gas',{generic:true});
CT('Liquid (unspecified)',['liquid','solution','fluid','liquids'],'An unspecified liquid: most everyday liquids are water with a little dissolved matter. Name it for an exact answer.',
'O|84|As water molecules throughout the liquid|Solvent\nH|11|As water molecules throughout the liquid|Solvent\nC|2|As dissolved organic molecules|Dissolved matter\nNa|0.5|As dissolved salts|Dissolved salt\nCl|0.8|As dissolved salts|Dissolved salt\nCa|0.1|Dissolved minerals|Dissolved mineral\nK|0.05|Dissolved minerals|Dissolved mineral',{generic:true});
CT('General object',[],'An unspecified solid object: an average of everyday materials (plastic, wood, metal, glass).',
'C|35|Plastics, wood, paper, fabric|Organic materials\nO|30|Wood, plastics, glass and oxides|Part of organics and oxides\nH|6|Plastics and wood|Bonded to C and O\nFe|8|Metal parts|Structure\nSi|6|Glass and ceramics|Glass\nAl|4|Light metal parts|Light metal\nCu|2|Wiring|Conductor\nCa|2|Fillers and glass|Filler\nN|1|Plastics and fabrics|Polymers\nCl|1|PVC|Plastics\nNa|1|Glass|Glass\nZn|1|Coatings|Coating\nTi|0.5|White pigments|Whiteness',{generic:true});

add({cat:true,title:'Clothing & textiles',label:'Category estimate',names:['sock','socks','hat','scarf','carpet','rug','curtain','pillow','blanket','backpack','umbrella','tent','flag','sail','jacket','coat','dress','pants','trousers','shorts','underwear','bedsheet','sheet','rope','string','thread','cushion','apron','uniform','clothing','garment','sleeping bag','pajamas'],summary:'Textiles are typically a cotton and polyester blend: cellulose chains from cotton plus synthetic polyester.',mix:[['C6H10O5',50,'cotton / natural fibre'],['C10H8O4',45,'polyester / synthetic fibre'],['C12H22N2O2',5,'nylon / elastic parts']],phase:'solid'});
add({title:'The Sun / stars',label:'Astronomical object',names:['sun','star','stars','sunlight','the sun'],summary:'Stars are balls of hot plasma, about three-quarters hydrogen and a quarter helium by mass, with small amounts of heavier elements.',comp:'H|73.5|Throughout the star as hot plasma; fusing into helium in the core|Fuel — fused to release energy\nHe|24.9|Throughout the star; built up in the core by fusion|Fusion product\nO|0.8|Spread through the plasma|Heavier element made by earlier stars\nC|0.3|Spread through the plasma|Heavier element made by earlier stars\nFe|0.16|Spread through the plasma|Heavier element made by earlier stars\nNe|0.12|Spread through the plasma|Heavier element made by earlier stars\nN|0.09|Spread through the plasma|Heavier element made by earlier stars\nSi|0.07|Spread through the plasma|Heavier element made by earlier stars\nMg|0.07|Spread through the plasma|Heavier element made by earlier stars\nS|0.04|Spread through the plasma|Heavier element made by earlier stars'});
add({title:'The Moon',label:'Astronomical object',names:['moon','the moon','lunar','lunar rock'],summary:'The Moon is a rocky body; its crust is mostly oxygen locked in silicate minerals.',comp:'O|43|Locked in silicate and oxide minerals of the crust and soil|Bonded to Si, Mg, Fe, Al, Ca\nSi|21|Silicate minerals of the crust|Silicate backbone\nMg|19|Olivine and pyroxene in the mantle and crust|Mineral component\nFe|10|Mantle minerals, basalt and a small iron core|Dense metal and mineral component\nCa|3|Anorthosite crust (the bright highlands)|Mineral component\nAl|3|Anorthosite crust|Mineral component\nTi|0.5|Ilmenite in the dark basalt plains|Mineral component'});
add({title:'Fire / flame',label:'Process',names:['fire','flame','flames','campfire','burning'],summary:'A flame is hot gas: fuel reacting with oxygen from the air, with glowing soot in yellow flames.',mix:[['N2',70,'nitrogen from the air'],['CO2',12,'carbon dioxide produced'],['H2O',10,'water vapour produced'],['O2',6,'leftover oxygen'],['C',2,'glowing soot particles']],phase:'gas'});
add({title:'Lightning',label:'Natural phenomenon',names:['lightning','thunder','thunderstorm','plasma'],summary:'Lightning is a channel of super-heated air (plasma), so it contains the elements of air, ionised.',mix:[['N2',75.5,'nitrogen'],['O2',23.2,'oxygen'],['Ar',1.28,'argon']],phase:'gas'});
/* ===== compound NAME -> FORMULA engine (exact, by charge balancing) ===== */
var CATION={sodium:['Na',1],potassium:['K',1],lithium:['Li',1],rubidium:['Rb',1],cesium:['Cs',1],caesium:['Cs',1],silver:['Ag',1],ammonium:['(NH4)',1,1],hydrogen:['H',1],
 magnesium:['Mg',2],calcium:['Ca',2],barium:['Ba',2],strontium:['Sr',2],beryllium:['Be',2],zinc:['Zn',2],cadmium:['Cd',2],aluminium:['Al',3],aluminum:['Al',3],gallium:['Ga',3],scandium:['Sc',3],bismuth:['Bi',3],
 iron:['Fe',[3,2]],copper:['Cu',[2,1]],tin:['Sn',[2,4]],lead:['Pb',[2,4]],manganese:['Mn',[2,4,7]],chromium:['Cr',[3,2,6]],cobalt:['Co',[2,3]],nickel:['Ni',[2]],mercury:['Hg',[2,1]],titanium:['Ti',[4,3]],vanadium:['V',[5,4,3]],gold:['Au',[3,1]],platinum:['Pt',[4,2]],
 ferric:['Fe',3],ferrous:['Fe',2],cupric:['Cu',2],cuprous:['Cu',1],stannic:['Sn',4],stannous:['Sn',2],plumbic:['Pb',4]},
 ROMAN={i:1,ii:2,iii:3,iv:4,v:5,vi:6,vii:7},
 ANION={chloride:['Cl',1],bromide:['Br',1],iodide:['I',1],fluoride:['F',1],oxide:['O',2],sulfide:['S',2],sulphide:['S',2],nitride:['N',3],phosphide:['P',3],hydride:['H',1],carbide:['C',4],selenide:['Se',2],
 hydroxide:['(OH)',1,1],carbonate:['(CO3)',2,1],'hydrogen carbonate':['(HCO3)',1,1],bicarbonate:['(HCO3)',1,1],sulfate:['(SO4)',2,1],sulphate:['(SO4)',2,1],'hydrogen sulfate':['(HSO4)',1,1],bisulfate:['(HSO4)',1,1],sulfite:['(SO3)',2,1],sulphite:['(SO3)',2,1],
 nitrate:['(NO3)',1,1],nitrite:['(NO2)',1,1],phosphate:['(PO4)',3,1],'hydrogen phosphate':['(HPO4)',2,1],'dihydrogen phosphate':['(H2PO4)',1,1],acetate:['(C2H3O2)',1,1],cyanide:['(CN)',1,1],permanganate:['(MnO4)',1,1],chromate:['(CrO4)',2,1],dichromate:['(Cr2O7)',2,1],
 chlorate:['(ClO3)',1,1],perchlorate:['(ClO4)',1,1],hypochlorite:['(ClO)',1,1],chlorite:['(ClO2)',1,1],bromate:['(BrO3)',1,1],iodate:['(IO3)',1,1],peroxide:['(O2)',2,1],thiosulfate:['(S2O3)',2,1],thiosulphate:['(S2O3)',2,1],oxalate:['(C2O4)',2,1],citrate:['(C6H5O7)',3,1],
 silicate:['(SiO3)',2,1],borate:['(BO3)',3,1],thiocyanate:['(SCN)',1,1],bisulfite:['(HSO3)',1,1],formate:['(CHO2)',1,1],lactate:['(C3H5O3)',1,1],tartrate:['(C4H4O6)',2,1],benzoate:['(C7H5O2)',1,1],stearate:['(C18H35O2)',1,1]},
 PFX={mono:1,di:2,tri:3,tetra:4,penta:5,hexa:6,hepta:7,octa:8,nona:9,deca:10},
 NONMET={hydrogen:'H',carbon:'C',nitrogen:'N',oxygen:'O',fluorine:'F',phosphorus:'P',sulfur:'S',sulphur:'S',chlorine:'Cl',bromine:'Br',iodine:'I',silicon:'Si',boron:'B',arsenic:'As',selenium:'Se',xenon:'Xe'},
 STEM={oxide:'O',chloride:'Cl',fluoride:'F',bromide:'Br',iodide:'I',sulfide:'S',sulphide:'S',nitride:'N',hydride:'H',carbide:'C',phosphide:'P'},
 ACID={'hydrochloric acid':'HCl','sulfuric acid':'H2SO4','sulphuric acid':'H2SO4','nitric acid':'HNO3','phosphoric acid':'H3PO4','carbonic acid':'H2CO3','hydrofluoric acid':'HF','hydrobromic acid':'HBr','hydroiodic acid':'HI','sulfurous acid':'H2SO3','nitrous acid':'HNO2','perchloric acid':'HClO4','chloric acid':'HClO3','hypochlorous acid':'HClO','chromic acid':'H2CrO4','boric acid':'H3BO3','oxalic acid':'C2H2O4','citric acid':'C6H8O7','hydrocyanic acid':'HCN','formic acid':'CH2O2','lactic acid':'C3H6O3','hydrogen sulfide':'H2S','hydrogen chloride':'HCl','hydrogen peroxide':'H2O2','hydrogen fluoride':'HF','hydrogen cyanide':'HCN','tartaric acid':'C4H6O6','ascorbic acid':'C6H8O6','benzoic acid':'C7H6O2','stearic acid':'C18H36O2','oleic acid':'C18H34O2','salicylic acid':'C7H6O3','folic acid':'C19H19N7O6','amino acid':'C2H5NO2'},
 COMMON={'methanol':'CH4O','methyl alcohol':'CH4O','acetone':'C3H6O','benzene':'C6H6','formaldehyde':'CH2O','acetylene':'C2H2','ethylene':'C2H4','ethene':'C2H4','ethyne':'C2H2','hexane':'C6H14','pentane':'C5H12','heptane':'C7H16','octane':'C8H18','glycerol':'C3H8O3','glycerin':'C3H8O3','glycerine':'C3H8O3','ethylene glycol':'C2H6O2','antifreeze':'C2H6O2','phenol':'C6H6O','chloroform':'CHCl3','carbon tetrachloride':'CCl4','toluene':'C7H8','xylene':'C8H10','styrene':'C8H8','propylene':'C3H6','butadiene':'C4H6','fructose':'C6H12O6','galactose':'C6H12O6','lactose':'C12H22O11','maltose':'C12H22O11','nicotine':'C10H14N2','morphine':'C17H19NO3','codeine':'C18H21NO3','glycine':'C2H5NO2','alanine':'C3H7NO2','cholesterol':'C27H46O','testosterone':'C19H28O2','estradiol':'C18H24O2','estrogen':'C18H24O2','progesterone':'C21H30O2','cortisol':'C21H30O5','dopamine':'C8H11NO2','serotonin':'C10H12N2O','adrenaline':'C9H13NO3','epinephrine':'C9H13NO3','melatonin':'C13H16N2O2','atp':'C10H16N5O13P3','vitamin d':'C27H44O','vitamin d3':'C27H44O','vitamin e':'C29H50O2','vitamin a':'C20H30O','retinol':'C20H30O','capsaicin':'C18H27NO3','menthol':'C10H20O','vanillin':'C8H8O3','limonene':'C10H16','camphor':'C10H16O','naproxen':'C14H14O3','amoxicillin':'C16H19N3O5S','penicillin':'C16H18N2O4S','metformin':'C4H11N5','adenine':'C5H5N5','guanine':'C5H5N5O','cytosine':'C4H5N3O','thymine':'C5H6N2O2','uracil':'C4H4N2O2','sucralose':'C12H19Cl3O8','aspartame':'C14H18N2O5','saccharin':'C7H5NO3S','msg':'C5H8NNaO4','monosodium glutamate':'C5H8NNaO4','glutamic acid':'C5H9NO4','urea':'CH4N2O','creatine':'C4H9N3O2','taurine':'C2H7NO3S','lysine':'C6H14N2O2','tryptophan':'C11H12N2O2','chlorophyll':'C55H72MgN4O5','cellulose':'C6H10O5','starch':'C6H10O5','dna':'C5H7N2O6P','teflon':'C2F4','freon':'CCl2F2','ozone':'O3','nitrous oxide':'N2O','laughing gas':'N2O','dry ice':'CO2','quicklime':'CaO','slaked lime':'CaH2O2','lime':'CaO','caustic soda':'NaOH','lye':'NaOH','potash':'K2CO3','soda ash':'Na2CO3','washing soda':'Na2CO3','epsom salt':'MgSO4.7H2O','borax':'Na2B4O7.10H2O','alum':'KAl(SO4)2.12H2O','bluestone':'CuSO4.5H2O','blue vitriol':'CuSO4.5H2O','saltpeter':'KNO3','saltpetre':'KNO3','muriatic acid':'HCl','vitriol':'H2SO4','rust':'Fe2O3','magnetite':'Fe3O4','hematite':'Fe2O3','calcite':'CaCO3','aragonite':'CaCO3','dolomite':'CaMg(CO3)2','gypsum':'CaSO4.2H2O','fluorite':'CaF2','halite':'NaCl','pyrite':'FeS2','fool\'s gold':'FeS2','galena':'PbS','sphalerite':'ZnS','cinnabar':'HgS','malachite':'Cu2CO3(OH)2','azurite':'Cu3(CO3)2(OH)2','corundum':'Al2O3','bauxite':'Al2O3','cassiterite':'SnO2','rutile':'TiO2','titanium dioxide':'TiO2','zinc oxide':'ZnO','chalcopyrite':'CuFeS2','barite':'BaSO4','apatite':'Ca5(PO4)3OH','orthoclase':'KAlSi3O8','albite':'NaAlSi3O8','talc':'Mg3Si4O10(OH)2','kaolinite':'Al2Si2O5(OH)4','olivine':'Mg2SiO4','zircon':'ZrSiO4','spinel':'MgAl2O4','topaz':'Al2SiO4F2','garnet':'Mg3Al2Si3O12','tourmaline':'NaMg3Al6B3Si6O27(OH)4','beryl':'Be3Al2Si6O18','serpentine':'Mg3Si2O5(OH)4','mica':'KAl3Si3O10(OH)2','muscovite':'KAl3Si3O10(OH)2','feldspar':'KAlSi3O8','chromite':'FeCr2O4','ilmenite':'FeTiO3','wolframite':'FeWO4','scheelite':'CaWO4','uraninite':'UO2','pitchblende':'UO2','sulfur dioxide':'SO2','sulphur dioxide':'SO2','nitrogen dioxide':'NO2','carbon monoxide':'CO','carbon dioxide':'CO2','ammonia':'NH3','methane':'CH4','natural gas':'CH4','ethane':'C2H6','propane':'C3H8','butane':'C4H10','water':'H2O'},
 DIRECT_UNSAFE={};
function pfxSplit(w){var best=null;Object.keys(PFX).forEach(function(p){if(w.indexOf(p)===0&&w.length>p.length&&(!best||p.length>best[0].length))best=[p,w.slice(p.length)];});return best;}
function charges(spec){return Array.isArray(spec)?spec:[spec];}
function balance(cat,an){/* cat=[sym,charge,isGroup], an=[sym,charge,isGroup] -> formula */
 var c=cat[1],a=an[1],g=function(x,y){return y?g(y,x%y):x;},l=c*a/g(c,a),nc=l/c,na=l/a;
 function part(sym,n,isGroup){if(n===1)return isGroup&&false?sym:sym.replace(/^\((.*)\)$/,'$1').length===sym.length?sym:sym.replace(/^\((.*)\)$/,'$1');return(isGroup?sym:sym)+(isGroup?n:n);}
 function fm(spec,n){var s=spec[0],grp=spec[2];if(n===1)return grp?s.slice(1,-1):s;return(grp?s:s)+n;}
 return fm(cat,nc)+fm(an,na);}
function nameToFormula(nq){
 if(COMMON[nq])return{f:COMMON[nq],note:''};
 if(ACID[nq])return{f:ACID[nq],note:''};
 var t=nq.split(' ');if(t.length<2)return null;
 var hyd='',mh=nq.match(/^(.*) ((?:mono|di|tri|tetra|penta|hexa|hepta|octa|nona|deca|undeca|dodeca)?hydrate)$/);
 if(mh){var hp=mh[2].replace(/hydrate$/,''),hn=hp==='undeca'?11:hp==='dodeca'?12:(PFX[hp]||1);hyd='.'+(hn>1?hn:'')+'H2O';nq=mh[1];t=nq.split(' ');}
 if(ACID[nq]||COMMON[nq])return{f:(ACID[nq]||COMMON[nq])+hyd,note:''};
 /* ionic: [cation (roman)] [anion words] */
 var anW=null,k;for(k=Math.min(2,t.length-1);k>=1;k--){var cand=t.slice(t.length-k).join(' ');if(ANION[cand]){anW=cand;t=t.slice(0,t.length-k);break;}}
 if(anW&&t.length>=1){var cw=t[0],rom=t[1]&&ROMAN[t[1]],cs=CATION[cw];
  if(cs&&t.length===(rom?2:1)){var ch,note='';
   if(cs[1]&&typeof cs[1]==='number'){ch=cs[1];}
   else{var opts=cs[1];if(rom){if(opts.indexOf(rom)<0&&!(cw==='iron'||cw==='copper'||cw==='tin'||cw==='lead'||cw==='manganese'||cw==='chromium'||cw==='cobalt'||cw==='nickel'||cw==='mercury'||cw==='titanium'||cw==='vanadium'||cw==='gold'||cw==='platinum'))return null;ch=rom;}
    else{ch=opts[0];note='“'+cw+'” can have several charges; assumed '+cw+'('+['','I','II','III','IV','V','VI','VII'][ch]+'). Write e.g. “'+cw+'(II)” to choose.';}}
   var cat=[cs[0],ch,cs[2]];if(cw==='mercury'&&ch===1)cat=['Hg2',2,0];
   var f=balance(cat,ANION[anW]);if(cat[0]==='Hg2')f=ANION[anW][1]===1?'Hg2'+(ANION[anW][2]?ANION[anW][0].slice(1,-1):ANION[anW][0])+'2':'Hg2'+(ANION[anW][2]?ANION[anW][0].slice(1,-1):ANION[anW][0]);
   if(f.indexOf('H')===0&&cw==='hydrogen')note='';
   return{f:f+hyd,note:note};}}
 /* covalent binary with Greek prefixes: "carbon dioxide", "dinitrogen pentoxide" */
 if(t.length===2||(!anW&&nq.split(' ').length===2)){var tt=nq.split(' '),a1=tt[0],b1=tt[1],p1=1,nm=NONMET[a1];
  if(!nm){var s1=pfxSplit(a1);if(s1&&NONMET[s1[1]]){p1=PFX[s1[0]];nm=NONMET[s1[1]];}}
  if(nm){var p2=1,st=b1.replace(/^mono/,'');var sp=pfxSplit(b1);
   var anionStem=null;Object.keys(STEM).forEach(function(s){if(b1===s)anionStem=[s,1];else if(sp&&sp[1]===s){anionStem=[s,PFX[sp[0]]];}else if(b1==='pentoxide'||b1==='monoxide'||b1==='dioxide'||b1==='trioxide'||b1==='tetroxide'||b1==='heptoxide'){}});
   var ox=b1.match(/^(mono|di|tri|tetra|penta|hepta)ox ?ide$/)||b1.match(/^(mono|di|tri|tetr|pent|hept)oxide$/);
   if(!anionStem&&ox){var m2={mon:1,mono:1,di:2,tri:3,tetr:4,tetra:4,pent:5,penta:5,hept:7,hepta:7};anionStem=['oxide',m2[ox[1]]];}
   if(anionStem){var sym2=STEM[anionStem[0]],n2=anionStem[1];if(p1===1&&anionStem[0]==='oxide'&&nm==='C'&&n2===1)p1=1;
    if(nm===sym2)return null;return{f:nm+(p1>1?p1:'')+sym2+(n2>1?n2:''),note:''};}}}
 return null;}
/* ===== SUBATOMIC PARTICLES: reference data (PDG-style values, rounded) ===== */
var PARTICLES=[];
function PT(o){PARTICLES.push(o);}
/* atoms: 'yes' = ordinary part of atoms · 'part' = inside atoms, not a building block you can pull out · 'decay' = only appears when atoms change · 'no' = not part of normal atoms */
PT({id:'electron',name:'Electron',sym:'e⁻',al:['electron','e-','electrons','beta minus','electron particle'],fam:'Lepton · fermion',q:'−1',m:'0.511 MeV/c²',kg:'9.109×10⁻³¹ kg',sp:'½',life:'Stable',disc:'1897 · J. J. Thomson',
 sum:'The light, negatively charged particle that surrounds every atom’s nucleus. Electrons decide how atoms bond, so almost all of chemistry, electricity and light comes from them.',
 atoms:'yes',status:'In every atom',where:'Outside the nucleus, in shells (a cloud of probability) around it. A neutral atom has exactly as many electrons as protons, and the outer ones form the chemical bonds.',svg:'cloud',cnt:'e',
 made:[],facts:['About 1/1836 of a proton’s mass.','No smaller parts have ever been found: it is an elementary particle.','Moving electrons are an electric current; the same particle flying out of a nucleus is called a beta particle.'],tags:['Electric current','Lightning','Beta decay','Cathode rays'],rel:['Proton','Positron','Photon','Muon']});
PT({id:'proton',name:'Proton',sym:'p⁺',al:['proton','protons','p+','hydrogen nucleus','h+'],fam:'Baryon · hadron',q:'+1',m:'938.27 MeV/c²',kg:'1.6726×10⁻²⁷ kg',sp:'½',life:'Stable (never seen to decay)',disc:'1917–1919 · Ernest Rutherford',
 sum:'The positively charged particle in the nucleus. The number of protons in an atom is its atomic number and decides which element it is: 6 protons is always carbon, 79 is always gold.',
 atoms:'yes',status:'In every nucleus',where:'In the nucleus, packed together with neutrons. Hydrogen-1 is the one atom whose entire nucleus is a single proton.',svg:'p',cnt:'p',
 made:['Up quark','Up quark','Down quark'],facts:['Made of two up quarks and one down quark, held together by gluons.','The three quarks supply only about 1% of the proton’s mass. The rest is the energy of the strong force (E = mc²).','Most cosmic rays are protons.'],tags:['Cosmic rays','Hydrogen ions (H⁺)','Particle accelerators','Solar wind'],rel:['Neutron','Electron','Up quark','Down quark','Gluon']});
PT({id:'neutron',name:'Neutron',sym:'n⁰',al:['neutron','neutrons','n0','free neutron'],fam:'Baryon · hadron',q:'0',m:'939.57 MeV/c²',kg:'1.6749×10⁻²⁷ kg',sp:'½',life:'About 15 minutes when free; stable inside most nuclei',disc:'1932 · James Chadwick',
 sum:'The electrically neutral particle in the nucleus. It adds mass and acts as a nuclear “glue” between protons; different neutron counts make different isotopes of the same element.',
 atoms:'yes',status:'In every nucleus except hydrogen-1',where:'In the nucleus, side by side with the protons. Carbon-12 has 6 neutrons, carbon-14 has 8.',svg:'n',cnt:'n',
 made:['Up quark','Down quark','Down quark'],facts:['Slightly heavier than a proton.','A free neutron decays into a proton, an electron and an antineutrino in about 15 minutes.','Neutrons keep nuclear chain reactions going in reactors, and neutron stars are made almost entirely of them.'],tags:['Nuclear reactors','Neutron stars','Cosmic-ray showers','Radioactive decay'],rel:['Proton','Beta particle','Neutrino','Down quark']});
PT({id:'up',name:'Up quark',sym:'u',al:['up quark','u quark','up quarks','quark up'],fam:'Quark · fermion · generation 1',q:'+⅔',m:'≈ 2.2 MeV/c²',kg:'≈ 3.9×10⁻³⁰ kg',sp:'½',life:'Stable (always bound inside a hadron)',disc:'Proposed 1964 · seen in 1968 (SLAC)',
 sum:'One of the two lightest quarks and a building block of ordinary matter. Two of them sit in every proton and one in every neutron.',
 atoms:'part',status:'Inside protons and neutrons',where:'Inside the nucleus, but never on its own: a proton holds 2 up quarks and a neutron holds 1. Quarks are always locked inside particles by the strong force (confinement).',svg:'qu',cnt:'u',
 made:[],facts:['An atom with Z protons and N neutrons contains 2Z + N up quarks.','No one has ever isolated a single quark.','Its mass is a tiny part of a proton’s mass.'],tags:['Protons','Neutrons','Pions'],rel:['Down quark','Proton','Neutron','Gluon']});
PT({id:'down',name:'Down quark',sym:'d',al:['down quark','d quark','down quarks','quark down'],fam:'Quark · fermion · generation 1',q:'−⅓',m:'≈ 4.7 MeV/c²',kg:'≈ 8.4×10⁻³⁰ kg',sp:'½',life:'Stable (always bound inside a hadron)',disc:'Proposed 1964 · seen in 1968 (SLAC)',
 sum:'The other light quark in ordinary matter. A proton has one, a neutron has two.',
 atoms:'part',status:'Inside protons and neutrons',where:'Inside the nucleus: a proton holds 1 down quark and a neutron holds 2. It can’t be pulled out alone.',svg:'qd',cnt:'d',
 made:[],facts:['An atom with Z protons and N neutrons contains Z + 2N down quarks.','When a neutron turns into a proton in beta decay, one down quark changes into an up quark.','It is slightly heavier than the up quark, which is part of why the neutron outweighs the proton.'],tags:['Protons','Neutrons','Pions','Beta decay'],rel:['Up quark','Proton','Neutron','Beta particle']});
PT({id:'strange',name:'Strange quark',sym:'s',al:['strange quark','s quark','strange quarks'],fam:'Quark · fermion · generation 2',q:'−⅓',m:'≈ 93 MeV/c²',kg:'≈ 1.7×10⁻²⁸ kg',sp:'½',life:'Always bound inside short-lived particles',disc:'1947 (kaons) · quark picture 1964',
 sum:'A heavier cousin of the down quark. It isn’t a regular part of atoms but appears in exotic, short-lived particles such as kaons.',
 atoms:'no',status:'Not a normal part of atoms',where:'Not in a normal atom’s protons or neutrons. A proton’s quark “sea” briefly shows strange quark pairs popping in and out, but they are not part of its basic makeup.',svg:null,cnt:null,
 made:[],facts:['Particles that contain it were named “strange” because they lived unexpectedly long.','Neutron stars may contain strange matter in their cores (still unproven).'],tags:['Particle accelerators','Cosmic-ray collisions','Kaons','Hypernuclei'],rel:['Down quark','Kaon','Charm quark']});
PT({id:'charm',name:'Charm quark',sym:'c',al:['charm quark','c quark','charm quarks','charmed quark'],fam:'Quark · fermion · generation 2',q:'+⅔',m:'≈ 1.27 GeV/c²',kg:'≈ 2.3×10⁻²⁷ kg',sp:'½',life:'Very short (about 10⁻¹² s inside hadrons)',disc:'1974 · J/ψ particle (SLAC & Brookhaven)',
 sum:'A heavy quark about 1.4 times as massive as a proton. It exists only for a split second in accelerators and cosmic-ray collisions.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms at all: it is heavy and decays almost instantly into lighter quarks.',svg:null,cnt:null,
 made:[],facts:['Its discovery in 1974 is called the “November Revolution” of particle physics.','Charm quarks were common in the first moments after the Big Bang.'],tags:['Particle accelerators','Early universe','Cosmic-ray collisions'],rel:['Strange quark','Top quark','Up quark']});
PT({id:'bottom',name:'Bottom quark',sym:'b',al:['bottom quark','b quark','beauty quark','bottom quarks'],fam:'Quark · fermion · generation 3',q:'−⅓',m:'≈ 4.18 GeV/c²',kg:'≈ 7.5×10⁻²⁷ kg',sp:'½',life:'Very short (about 10⁻¹² s inside hadrons)',disc:'1977 · Fermilab (Υ particle)',
 sum:'A heavy quark, about four and a half times a proton’s mass, produced only in high-energy collisions.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms. It is made in accelerators and cosmic-ray collisions and decays within a trillionth of a second.',svg:null,cnt:null,
 made:[],facts:['B-mesons, which contain bottom quarks, help physicists study why the universe holds more matter than antimatter.'],tags:['Particle accelerators','Cosmic-ray collisions','Early universe'],rel:['Top quark','Charm quark','Down quark']});
PT({id:'top',name:'Top quark',sym:'t',al:['top quark','t quark','truth quark','top quarks'],fam:'Quark · fermion · generation 3',q:'+⅔',m:'≈ 172.7 GeV/c²',kg:'≈ 3.1×10⁻²⁵ kg',sp:'½',life:'≈ 5×10⁻²⁵ s (decays before it can bind)',disc:'1995 · Fermilab (CDF and DØ)',
 sum:'The heaviest known elementary particle, about as heavy as a tungsten atom, yet it is a point-like particle with no known parts.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms. It is made only in the most energetic collisions and decays in about 10⁻²⁵ seconds, so quickly that it never forms a hadron.',svg:null,cnt:null,
 made:[],facts:['Its mass is about 184 times a proton’s, close to a tungsten atom’s.','Produced at the Large Hadron Collider in huge numbers for study.'],tags:['Particle accelerators','Early universe'],rel:['Bottom quark','Higgs boson','W boson']});
PT({id:'gluon',name:'Gluon',sym:'g',al:['gluon','gluons','strong force carrier'],fam:'Gauge boson · force carrier',q:'0',m:'0 (massless)',kg:'0',sp:'1',life:'Stable (but always confined)',disc:'1979 · DESY, Hamburg (PETRA)',
 sum:'The carrier of the strong force. Gluons bind quarks into protons and neutrons, and the leftover strong force holds nuclei together.',
 atoms:'part',status:'Inside protons and neutrons',where:'Inside every proton and neutron, constantly exchanged between the quarks. They also carry about half of a proton’s momentum. Their number isn’t fixed: they appear and vanish all the time.',svg:'gl',cnt:null,
 made:[],facts:['Comes in 8 types, each carrying “colour charge”.','Gluons carry colour charge themselves, so they attract each other.','Most of the proton’s mass is the energy of this gluon field.'],tags:['Protons','Neutrons','Quark–gluon plasma','Particle jets'],rel:['Up quark','Down quark','Proton','Photon']});
PT({id:'photon',name:'Photon',sym:'γ',al:['photon','photons','light particle','quantum of light','gamma ray','gamma rays'],fam:'Gauge boson · force carrier',q:'0',m:'0 (massless)',kg:'0',sp:'1',life:'Stable',disc:'Concept 1905 · Einstein; named 1926',
 sum:'The particle of light and of the electromagnetic force. It carries energy, from radio waves to X-rays and gamma rays, and always moves at the speed of light.',
 atoms:'part',status:'Exchanged inside atoms',where:'Not a stored “part” of an atom. Virtual photons are exchanged between the nucleus and its electrons and create the pull that keeps them bound. Real photons are emitted or absorbed when an electron jumps between energy levels; that gives each element its colours.',svg:'ph',cnt:null,
 made:[],facts:['The light from a neon sign is photons released as electrons drop to lower energy levels.','Gamma rays are photons released by atomic nuclei.','Has no mass and no electric charge.'],tags:['Light','Radio waves','X-rays','Gamma rays','Sunlight'],rel:['Electron','Gluon','W boson','Positron']});
PT({id:'w',name:'W boson',sym:'W±',al:['w boson','w bosons','w particle','w+','w-','weak boson'],fam:'Gauge boson · force carrier',q:'±1',m:'80.4 GeV/c²',kg:'1.4×10⁻²⁵ kg',sp:'1',life:'≈ 3×10⁻²⁵ s',disc:'1983 · CERN (UA1, UA2)',
 sum:'A carrier of the weak force, the force that lets one kind of quark change into another. It is behind beta decay and the fusion that powers the Sun.',
 atoms:'decay',status:'Only in radioactive decay',where:'Not in a stable atom. When a nucleus undergoes beta decay, a neutron turns into a proton through a very short-lived (virtual) W⁻ boson that becomes an electron and an antineutrino.',svg:null,cnt:null,
 made:[],facts:['About 86 times the mass of a proton.','Without it the Sun couldn’t turn hydrogen into helium.'],tags:['Beta decay','Particle accelerators','Stellar fusion'],rel:['Z boson','Neutron','Neutrino','Higgs boson']});
PT({id:'z',name:'Z boson',sym:'Z⁰',al:['z boson','z bosons','z particle','z0','z zero'],fam:'Gauge boson · force carrier',q:'0',m:'91.19 GeV/c²',kg:'1.6×10⁻²⁵ kg',sp:'1',life:'≈ 3×10⁻²⁵ s',disc:'1983 · CERN (UA1, UA2)',
 sum:'The neutral partner of the W boson. It carries the weak force when particles interact without changing charge.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms. It is produced only in high-energy collisions and decays almost immediately. Its measured decays showed that there are three light kinds of neutrino.',svg:null,cnt:null,
 made:[],facts:['About 97 times the mass of a proton.','Neutrino detectors rely on it for “neutral current” interactions.'],tags:['Particle accelerators','Early universe'],rel:['W boson','Higgs boson','Neutrino']});
PT({id:'higgs',name:'Higgs boson',sym:'H⁰',al:['higgs boson','higgs','higgs particle','god particle','the higgs'],fam:'Scalar boson',q:'0',m:'125.1 GeV/c²',kg:'2.2×10⁻²⁵ kg',sp:'0',life:'≈ 1.6×10⁻²² s',disc:'2012 · CERN (ATLAS and CMS)',
 sum:'A ripple in the Higgs field, which gives mass to elementary particles such as electrons and the W and Z bosons.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms. It is created only in high-energy collisions, such as at the Large Hadron Collider, and decays in a tiny fraction of a second. The Higgs field gives electrons their mass but most of an atom’s mass comes from the strong force.',svg:null,cnt:null,
 made:[],facts:['The only known particle with spin 0.','Predicted in 1964 and found 48 years later.'],tags:['Large Hadron Collider','Early universe'],rel:['W boson','Z boson','Top quark','Electron']});
PT({id:'muon',name:'Muon',sym:'μ⁻',al:['muon','muons','mu','mu-','mu minus'],fam:'Lepton · fermion · generation 2',q:'−1',m:'105.66 MeV/c²',kg:'1.884×10⁻²⁸ kg',sp:'½',life:'2.2 microseconds',disc:'1936 · Anderson & Neddermeyer',
 sum:'A heavy twin of the electron, about 207 times heavier and unstable. Cosmic rays create muons in the upper atmosphere and they pass through you all the time.',
 atoms:'no',status:'Not part of normal atoms',where:'Not in ordinary atoms. In the lab it can replace an electron to make a short-lived “muonic atom” whose orbit hugs the nucleus 200 times closer.',svg:null,cnt:null,
 made:[],facts:['About one muon passes through every square centimetre of sea-level ground per minute.','They live so briefly that they only reach the ground because of time dilation.','Used to scan pyramids and volcanoes for hidden chambers.'],tags:['Cosmic rays','Particle accelerators','Pyramid scanning'],rel:['Electron','Tau','Neutrino']});
PT({id:'tau',name:'Tau lepton',sym:'τ⁻',al:['tau','tau lepton','tau particle','tauon','tau-'],fam:'Lepton · fermion · generation 3',q:'−1',m:'1776.9 MeV/c²',kg:'3.17×10⁻²⁷ kg',sp:'½',life:'2.9×10⁻¹³ s',disc:'1975 · Martin Perl (SLAC)',
 sum:'The heaviest lepton, about 3,500 times the electron’s mass and roughly twice a proton’s. It decays almost at once.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms. It exists only briefly after high-energy collisions or cosmic-ray impacts.',svg:null,cnt:null,
 made:[],facts:['Heavy enough to decay into particles containing quarks.','Perl received the 1995 Nobel Prize for it.'],tags:['Particle accelerators','Cosmic-ray collisions'],rel:['Muon','Electron','Neutrino']});
PT({id:'neutrino',name:'Neutrino',sym:'ν',al:['neutrino','neutrinos','electron neutrino','muon neutrino','tau neutrino','antineutrino','anti neutrino','antineutrinos','solar neutrino'],fam:'Lepton · fermion',q:'0',m:'< 0.8 eV/c² (tiny, exact value unknown)',kg:'< 1.4×10⁻³⁶ kg',sp:'½',life:'Stable',disc:'Predicted 1930 · detected 1956',
 sum:'An almost massless, uncharged particle that barely interacts with anything. Trillions of them from the Sun pass through your body every second without a trace.',
 atoms:'decay',status:'Released when atoms change',where:'Not stored in atoms. Neutrinos are released when nuclei change: in beta decay, in nuclear reactors and in the fusion that powers the Sun.',svg:null,cnt:null,
 made:[],facts:['Comes in three types (electron, muon, tau) that switch type as they travel (“oscillation”).','A light-year of lead would stop only about half of them.','Hundreds of thousands of times lighter than an electron, but not zero.'],tags:['The Sun','Nuclear reactors','Supernovae','Beta decay','Cosmic rays'],rel:['Electron','Neutron','Muon','W boson']});
PT({id:'positron',name:'Positron',sym:'e⁺',al:['positron','positrons','antielectron','anti electron','beta plus','e+'],fam:'Antiparticle · lepton',q:'+1',m:'0.511 MeV/c²',kg:'9.109×10⁻³¹ kg',sp:'½',life:'Stable until it meets an electron',disc:'Predicted 1928 · seen 1932 (Anderson)',
 sum:'The electron’s antimatter twin: same mass, opposite charge. When it meets an electron both vanish in a flash of gamma rays.',
 atoms:'decay',status:'Only in some radioactive decays',where:'Not a part of atoms. Certain unstable nuclei, such as fluorine-18, emit a positron when a proton turns into a neutron (β⁺ decay).',svg:null,cnt:null,
 made:[],facts:['PET scans in hospitals detect the gamma rays from positron–electron annihilation.','Potassium-40, present in bananas and in your body, emits a positron in a very rare decay branch.'],tags:['PET scanners','Cosmic rays','Radioactive decay','Lightning'],rel:['Electron','Photon','Antiproton','Antimatter']});
PT({id:'antiproton',name:'Antiproton',sym:'p̄',al:['antiproton','antiprotons','anti proton','anti-proton','antineutron','anti neutron'],fam:'Antiparticle · baryon',q:'−1',m:'938.27 MeV/c²',kg:'1.6726×10⁻²⁷ kg',sp:'½',life:'Stable until it meets matter',disc:'1955 · Chamberlain & Segrè (Berkeley)',
 sum:'The proton’s antimatter twin: the same mass with negative charge, made of two anti-up and one anti-down quark.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms. It is made in accelerators; at CERN antiprotons are combined with positrons to build antihydrogen.',svg:null,cnt:null,
 made:['Up quark','Up quark','Down quark'],facts:['Antihydrogen atoms were first made in 1995 and trapped in 2010.','Meeting an ordinary proton, it annihilates into pions.'],tags:['Particle accelerators','Cosmic rays','Antimatter labs'],rel:['Proton','Positron','Antimatter']});
PT({id:'pion',name:'Pion',sym:'π',al:['pion','pions','pi meson','pi mesons','pi+','pi-','pi0'],fam:'Meson · hadron',q:'+1, −1 or 0',m:'139.6 MeV/c² (π⁰: 135.0)',kg:'2.49×10⁻²⁸ kg',sp:'0',life:'2.6×10⁻⁸ s (π⁰: 8.5×10⁻¹⁷ s)',disc:'Predicted 1935 · found 1947',
 sum:'A short-lived particle made of one quark and one antiquark. Pions were first proposed to explain how the nucleus holds together.',
 atoms:'part',status:'A brief helper inside the nucleus',where:'Not a permanent part of atoms. Virtual pions are exchanged between protons and neutrons and produce the leftover strong force that holds nuclei together. Real pions come from cosmic-ray or accelerator collisions.',svg:null,cnt:null,
 made:['Up quark','Down quark'],facts:['Yukawa predicted it in 1935 and won a Nobel Prize for the idea.','Most pions made in the atmosphere decay into muons.'],tags:['Cosmic rays','Particle accelerators','Nuclear force'],rel:['Muon','Proton','Neutron','Up quark']});
PT({id:'kaon',name:'Kaon',sym:'K',al:['kaon','kaons','k meson','k+','k-'],fam:'Meson · hadron',q:'+1, −1 or 0',m:'493.7 MeV/c² (K⁰: 497.6)',kg:'8.80×10⁻²⁸ kg',sp:'0',life:'1.2×10⁻⁸ s (charged)',disc:'1947 · Rochester & Butler',
 sum:'A meson that contains a strange quark. Kaons helped physicists discover that nature treats matter and antimatter slightly differently.',
 atoms:'no',status:'Not part of atoms',where:'Not in atoms. It is made in cosmic-ray collisions and accelerators and decays within about ten nanoseconds.',svg:null,cnt:null,
 made:['Strange quark','Up quark'],facts:['Studying kaons led to the discovery of CP violation in 1964.'],tags:['Cosmic rays','Particle accelerators'],rel:['Strange quark','Pion','Muon']});
PT({id:'alpha',name:'Alpha particle',sym:'α',al:['alpha','alpha particle','alpha particles','alpha ray','alpha rays','alpha radiation','alpha decay','helium nucleus','he2+'],fam:'Composite nucleus (helium-4)',q:'+2',m:'3727.4 MeV/c²',kg:'6.645×10⁻²⁷ kg',sp:'0',life:'Stable',disc:'Named 1899 · Ernest Rutherford',
 sum:'A helium-4 nucleus: two protons and two neutrons. Heavy radioactive atoms such as uranium and radium shoot them out when they decay.',
 atoms:'decay',status:'Ejected from heavy nuclei',where:'Not a regular part of atoms, but it is the nucleus of every helium atom. Heavy nuclei such as uranium-238 or americium-241 (in smoke detectors) eject it when they decay.',svg:'alpha',cnt:null,
 made:['Proton','Proton','Neutron','Neutron'],facts:['A sheet of paper or the outer layer of skin stops it.','Rutherford’s gold-foil experiment used alpha particles and revealed the nucleus.','The helium in balloons comes from alpha particles that picked up electrons underground.'],tags:['Radioactive decay','Smoke detectors','Radon gas','Uranium ore'],rel:['Proton','Neutron','Beta particle','Photon']});
PT({id:'beta',name:'Beta particle',sym:'β',al:['beta particle','beta particles','beta ray','beta rays','beta radiation','beta decay','beta'],fam:'Electron or positron from a nucleus',q:'−1 (β⁻) or +1 (β⁺)',m:'0.511 MeV/c²',kg:'9.109×10⁻³¹ kg',sp:'½',life:'Stable',disc:'1899 · Rutherford',
 sum:'A fast electron (or positron) thrown out of a nucleus when a neutron turns into a proton (or the reverse). It is created at the moment of decay, not stored in the atom beforehand.',
 atoms:'decay',status:'Created when a nucleus decays',where:'Not inside the nucleus before decay. In β⁻ decay a neutron becomes a proton, an electron and an antineutrino. Carbon-14 and tritium decay this way.',svg:null,cnt:null,
 made:[],facts:['Stopped by a few millimetres of aluminium.','Carbon-14 dating relies on beta decay.'],tags:['Radioactive decay','Carbon-14','Tritium','Radiation therapy'],rel:['Electron','Positron','Neutron','Neutrino']});
PT({id:'deuteron',name:'Deuteron',sym:'d / ²H⁺',al:['deuteron','deuterons','heavy hydrogen nucleus','deuterium nucleus'],fam:'Composite nucleus (hydrogen-2)',q:'+1',m:'1875.6 MeV/c²',kg:'3.344×10⁻²⁷ kg',sp:'1',life:'Stable',disc:'1931 · Harold Urey (deuterium)',
 sum:'The nucleus of heavy hydrogen (deuterium): one proton bound to one neutron.',
 atoms:'yes',status:'Nucleus of deuterium atoms',where:'In the nucleus of the rare hydrogen-2 atom: about 1 in 6,400 hydrogen atoms in nature, which is why a little heavy water exists in all water.',svg:'deut',cnt:null,
 made:['Proton','Neutron'],facts:['Fusion reactors aim to fuse deuterons with tritons.','Its binding is weak: about 2.2 MeV.'],tags:['Heavy water','Fusion research','Seawater'],rel:['Proton','Neutron','Alpha particle']});
PT({id:'triton',name:'Triton',sym:'t / ³H⁺',al:['triton','tritons','tritium nucleus'],fam:'Composite nucleus (hydrogen-3)',q:'+1',m:'2808.9 MeV/c²',kg:'5.007×10⁻²⁷ kg',sp:'½',life:'Half-life 12.3 years (beta decay)',disc:'1939 · Alvarez & Cornog',
 sum:'The nucleus of tritium (hydrogen-3): one proton and two neutrons. It is radioactive.',
 atoms:'yes',status:'Nucleus of tritium atoms',where:'In the nucleus of tritium atoms, which are extremely rare in nature (made by cosmic rays in the upper atmosphere) and are made artificially in reactors.',svg:null,cnt:null,
 made:['Proton','Neutron','Neutron'],facts:['Decays into helium-3 by beta decay.','Glow-in-the-dark watch dials and exit signs use tritium.'],tags:['Cosmic-ray reactions','Nuclear reactors','Glow signs'],rel:['Deuteron','Beta particle','Neutron']});
PT({id:'graviton',name:'Graviton',sym:'G',al:['graviton','gravitons'],fam:'Hypothetical gauge boson',q:'0',m:'0 (predicted)',kg:'0',sp:'2',life:'Unknown (never detected)',disc:'Hypothesised, never detected',
 sum:'A theoretical particle that would carry gravity. It has never been detected, and no tested theory of quantum gravity exists yet.',
 atoms:'no',status:'Hypothetical',where:'Not known to exist. Gravity between the particles in an atom is so weak that the particle would be impossible to detect directly.',svg:null,cnt:null,
 made:[],facts:['Gravity is about 10³⁶ times weaker than electromagnetism between two protons.','Gravitational waves are detected, but individual gravitons are not.'],tags:['Quantum gravity theories'],rel:['Photon','Gluon','Higgs boson']});
/* family pages */
PT({id:'quark',name:'Quark',sym:'q',family:true,al:['quark','quarks','flavor of quark','quark flavours','quark flavors'],fam:'Elementary particle · fermion',q:'+⅔ or −⅓',m:'2 MeV to 173 GeV',kg:'',sp:'½',life:'',disc:'Proposed 1964 · Gell-Mann, Zweig',
 sum:'Quarks are the building blocks of protons, neutrons and all other hadrons. There are six types (flavours): up, down, strange, charm, bottom, top. They are never found alone.',
 atoms:'part',status:'Inside every nucleus',where:'Only the two lightest, up and down, make up ordinary matter, inside the protons and neutrons of every nucleus. The other four exist for a split second in accelerators and cosmic rays.',svg:'p',cnt:null,
 members:['Up quark','Down quark','Strange quark','Charm quark','Bottom quark','Top quark'],made:[],facts:['Quarks carry colour charge and are always confined in groups of 2 or 3.','A proton is up + up + down, a neutron is up + down + down.'],tags:[],rel:['Gluon','Proton','Neutron']});
PT({id:'lepton',name:'Lepton',sym:'ℓ',family:true,al:['lepton','leptons'],fam:'Elementary particle · fermion',q:'−1 or 0',m:'0 to 1777 MeV',kg:'',sp:'½',life:'',disc:'Electron 1897',
 sum:'Leptons are elementary particles that don’t feel the strong force. There are six: the electron, muon and tau, each with its own neutrino.',
 atoms:'yes',status:'Only the electron is in atoms',where:'Of the six leptons only the electron is in ordinary atoms, in the cloud around the nucleus. The others come from decays, cosmic rays and accelerators.',svg:'cloud',cnt:null,
 members:['Electron','Muon','Tau lepton','Neutrino'],made:[],facts:['Leptons have no known inner structure.'],tags:[],rel:['Quark','Photon']});
PT({id:'boson',name:'Boson',sym:'B',family:true,al:['boson','bosons','force carrier','force carriers','gauge boson'],fam:'Particle type · whole-number spin',q:'0 or ±1',m:'0 to 125 GeV',kg:'',sp:'0, 1 (or 2)',life:'',disc:'Photon 1905 · Higgs 2012',
 sum:'Bosons carry forces between particles (photon, gluon, W and Z) and one of them, the Higgs, is linked to mass. They have whole-number spin.',
 atoms:'part',status:'Photons and gluons act inside atoms',where:'Photons act between electrons and the nucleus, and gluons act inside the protons and neutrons. The W and Z bosons matter only when nuclei decay.',svg:'ph',cnt:null,
 members:['Photon','Gluon','W boson','Z boson','Higgs boson','Graviton'],made:[],facts:['Many bosons can occupy the same state; this makes lasers possible.'],tags:[],rel:['Electron','Quark']});
PT({id:'fermion',name:'Fermion',sym:'F',family:true,al:['fermion','fermions','matter particles','matter particle'],fam:'Particle type · half-integer spin',q:'',m:'',kg:'',sp:'½, 3⁄2 …',life:'',disc:'Name 1945 · Dirac',
 sum:'Fermions are particles with half-integer spin, including quarks, electrons and neutrinos. Two identical fermions can never be in the same state (the Pauli exclusion principle), so electrons fill atomic shells and matter takes up space.',
 atoms:'yes',status:'Protons, neutrons and electrons are fermions',where:'Electrons, protons and neutrons are all fermions, so electrons stack into shells. That is what gives the periodic table its structure.',svg:'cloud',cnt:null,
 members:['Electron','Proton','Neutron','Up quark','Down quark','Neutrino'],made:[],facts:['Named after Enrico Fermi.'],tags:[],rel:['Boson','Quark','Lepton']});
PT({id:'hadron',name:'Hadron',sym:'h',family:true,al:['hadron','hadrons'],fam:'Particle type · made of quarks',q:'',m:'',kg:'',sp:'',life:'',disc:'Name 1962',
 sum:'A hadron is any particle made of quarks held together by the strong force. They come as baryons (three quarks, like the proton) and mesons (a quark plus an antiquark).',
 atoms:'yes',status:'Protons and neutrons are hadrons',where:'Protons and neutrons are hadrons, and they make up every nucleus. Other hadrons (pions, kaons, …) live only fractions of a second.',svg:'p',cnt:null,
 members:['Proton','Neutron','Pion','Kaon'],made:[],facts:['The Large Hadron Collider collides protons, which are hadrons.'],tags:[],rel:['Quark','Gluon']});
PT({id:'baryon',name:'Baryon',sym:'B',family:true,al:['baryon','baryons'],fam:'Hadron · three quarks',q:'',m:'',kg:'',sp:'½, 3⁄2',life:'',disc:'Name 1953',
 sum:'A baryon is a hadron made of three quarks. Protons and neutrons are the only stable ones and make up almost all the mass of everyday matter.',
 atoms:'yes',status:'Protons and neutrons are baryons',where:'Every proton (uud) and neutron (udd) is a baryon. Almost all the mass of ordinary matter comes from baryons.',svg:'p',cnt:null,
 members:['Proton','Neutron','Antiproton'],made:[],facts:['Baryon number is conserved: this is why a proton doesn’t just decay.'],tags:[],rel:['Meson','Hadron','Quark']});
PT({id:'meson',name:'Meson',sym:'M',family:true,al:['meson','mesons'],fam:'Hadron · quark + antiquark',q:'',m:'',kg:'',sp:'0 or 1',life:'',disc:'Predicted 1935',
 sum:'A meson is a hadron made of one quark and one antiquark. All are unstable, living between 10⁻²³ and 10⁻⁸ seconds or so.',
 atoms:'part',status:'Brief helpers in the nucleus',where:'Not permanent parts of atoms. Virtual pions help hold protons and neutrons together; real mesons come from cosmic rays and accelerators.',svg:null,cnt:null,
 members:['Pion','Kaon'],made:[],facts:['Yukawa predicted mesons before they were found.'],tags:[],rel:['Baryon','Hadron','Quark']});
PT({id:'nucleon',name:'Nucleon',sym:'N',family:true,al:['nucleon','nucleons'],fam:'Proton or neutron',q:'+1 or 0',m:'≈ 939 MeV/c²',kg:'≈ 1.67×10⁻²⁷ kg',sp:'½',life:'',disc:'Name 1941',
 sum:'“Nucleon” is the common name for a proton or a neutron, the particles inside a nucleus. An atom’s mass number is its number of nucleons.',
 atoms:'yes',status:'Everything in the nucleus',where:'The nucleus is a tight cluster of nucleons: carbon-12 has 12 (6 protons and 6 neutrons).',svg:'nucleus',cnt:null,
 members:['Proton','Neutron'],made:[],facts:['Each nucleon is made of three quarks.'],tags:[],rel:['Quark','Alpha particle']});
PT({id:'antimatter',name:'Antimatter',sym:'ā',family:true,al:['antimatter','anti matter','antiparticle','antiparticles','anti particle','antimatter particle'],fam:'Mirror-image particles',q:'',m:'',kg:'',sp:'',life:'',disc:'Dirac 1928 · positron 1932',
 sum:'Every particle has an antiparticle with the same mass and opposite charge. When matter and antimatter meet, they annihilate into energy.',
 atoms:'no',status:'Not part of normal atoms',where:'Ordinary atoms contain no antimatter. Tiny amounts appear in some radioactive decays and cosmic rays, and are made deliberately in accelerators and hospital PET scanners.',svg:null,cnt:null,
 members:['Positron','Antiproton'],made:[],facts:['The universe seems to contain far more matter than antimatter, and nobody knows exactly why.'],tags:[],rel:['Electron','Proton']});
PT({id:'subatomic',name:'Subatomic particles',sym:'⚛',family:true,al:['subatomic particle','subatomic particles','subatomic','elementary particle','elementary particles','particle','particles','standard model'],fam:'Everything smaller than an atom',q:'',m:'',kg:'',sp:'',life:'',disc:'',
 sum:'Subatomic particles are the pieces atoms are made of, and the particles that can exist outside them. Three of them make up every atom: protons, neutrons and electrons. The protons and neutrons in turn are made of quarks.',
 atoms:'yes',status:'Three build every atom',where:'Protons and neutrons form the nucleus, electrons surround it, and quarks sit inside the nucleons. Many others only show up in decays and collisions.',svg:'nucleus',cnt:null,
 members:['Proton','Neutron','Electron','Up quark','Down quark','Gluon','Photon','Neutrino','Muon','Higgs boson'],made:[],facts:['The Standard Model lists 17 elementary particles: 6 quarks, 6 leptons, 4 force carriers and the Higgs.'],tags:[],rel:[]});
var PMAP=null;
function findParticle(nq){
 if(!PMAP){PMAP={};PARTICLES.forEach(function(p){p.al.concat([p.name]).forEach(function(a){var k=normQ(a);if(k&&!PMAP[k])PMAP[k]=p;});});PARTICLES.forEach(function(p){PMAP['t_'+normQ(p.name)]=p;});}
 if(PMAP[nq])return PMAP[nq];
 if(/s$/.test(nq)&&PMAP[nq.slice(0,-1)])return PMAP[nq.slice(0,-1)];
 return null;}
function particleByName(n){findParticle('x');return PMAP['t_'+normQ(n)]||null;}
/* ===== RESOLVER ===== */
var HEB={};'מים=water;אוויר=air;אויר=air;עיפרון=pencil;עפרון=pencil;מחשב=computer;מחשב נייד=laptop;מעבד=processor;טלפון=phone;סמארטפון=smartphone;פלאפון=phone;אייפון=iphone;סוללה=battery;כבל=cable;חוט=wire;זכוכית=glass;חלון=window;מראה=mirror;עדשה=lens;גרניט=granite;בננה=banana;תפוח=apple;תפוז=orange;לימון=lemon;ענבים=grape;אבטיח=watermelon;תות=strawberry;עגבנייה=tomato;עגבניה=tomato;מלפפון=cucumber;בצל=onion;שום=garlic;תפוח אדמה=potato;גזר=carrot;חסה=lettuce;פלפל=pepper;אורז=rice;לחם=bread;פיצה=pizza;פסטה=pasta;עוגה=cake;עוגיה=cookie;שוקולד=chocolate;סוכר=sugar;מלח=salt;חלב=milk;גבינה=cheese;יוגורט=yogurt;חמאה=butter;ביצה=egg;בשר=meat;עוף=chicken;דג=fish;סושי=sushi;קפה=coffee;תה=tea;מיץ=juice;בירה=beer;יין=wine;וודקה=vodka;קולה=cola;שמן=oil;דבש=honey;חומץ=vinegar;ים=sea;מי ים=seawater;אדמה=soil;חול=sand;אבן=stone;סלע=rock;בטון=concrete;לבנה=brick;קרמיקה=ceramic;חרסינה=porcelain;פורצלן=porcelain;כוס=cup;ספל=mug;צלחת=plate;קערה=bowl;סכין=knife;מזלג=fork;כף=spoon;מספריים=scissors;פטיש=hammer;מסמר=nail;בורג=screw;שרשרת=chain;מפתח=key;מטבע=coin;פרוטה=penny;זהב=gold;כסף=silver;נחושת=copper;ברזל=iron;פלדה=steel;נירוסטה=stainless steel;אלומיניום=aluminium;פליז=brass;ארד=bronze;עופרת=lead;בדיל=tin;זרחן=phosphorus;מימן=hydrogen;חמצן=oxygen;חנקן=nitrogen;פחמן=carbon;סיליקון=silicon;הליום=helium;נתרן=sodium;אשלגן=potassium;סידן=calcium;מגנזיום=magnesium;גופרית=sulfur;כלור=chlorine;יוד=iodine;כספית=mercury;אורניום=uranium;יהלום=diamond;גרפיט=graphite;פחם=coal;עץ=wood;נייר=paper;קרטון=cardboard;ספר=book;עיתון=newspaper;פלסטיק=plastic;גומי=rubber;צמיג=tire;כדור=ball;צעצוע=toy;לגו=lego;בקבוק=bottle;שקית=bag;תיק=backpack;מטרייה=umbrella;כובע=hat;גרב=sock;חולצה=shirt;מכנסיים=pants;ג\'ינס=jeans;נעל=shoe;נעליים=shoes;צמר=wool;משי=silk;עור=leather;שיער=hair;ציפורן=fingernail;כותנה=cotton;שמיכה=blanket;כרית=pillow;שטיח=carpet;וילון=curtain;כיסא=chair;שולחן=table;ספה=sofa;מיטה=bed;דלת=door;בית=house;מכונית=car;רכב=car;אופניים=bicycle;אוטובוס=bus;מטוס=airplane;ספינה=ship;רכבת=train;אופנוע=motorcycle;מנוע=engine;מנורה=lamp;נורה=bulb;טלוויזיה=tv;טלויזיה=tv;מקרר=fridge;מיקרוגל=microwave;מדפסת=printer;מצלמה=camera;אוזניות=headphones;רמקול=speaker;שעון=watch;מקלדת=keyboard;עכבר=mouse;מטען=charger;אדם=human;גוף=body;כלב=dog;חתול=cat;סוס=horse;פרה=cow;ציפור=bird;חרק=insect;עצם=bone;שן=tooth;דם=blood;לב=heart;מוח=brain;פרח=flower;עשב=grass;עלה=leaf;שמש=sun;ירח=moon;כוכב=star;אש=fire;ברק=lightning;גשם=rain;שלג=snow;קרח=ice;אדים=steam;סבון=soap;שמפו=shampoo;משחת שיניים=toothpaste;שפתון=lipstick;בושם=perfume;תרופה=medicine;אספירין=aspirin;קפאין=caffeine;אלכוהול=alcohol;אמוניה=ammonia;מתאן=methane;בנזין=gasoline;סולר=diesel;גז=gas;נוזל=liquid;מתכת=metal;סגסוגת=alloy;חפץ=object;חומר=material;צבע=paint;דבק=glue;נר=candle;שעווה=wax;חלודה=rust;קוורץ=quartz;שיש=marble;גיר=chalk;גבס=gypsum;פחמן דו חמצני=carbon dioxide;מי חמצן=hydrogen peroxide;סודה לשתייה=baking soda;מלח שולחן=table salt;מצית=lighter;פח=can;קופסת שימורים=tin can;מזרן=mattress;תנור=oven;סיר=pot;מחבת=pan;מחשבון=calculator;רדיו=radio;מטבח=kitchen'.split(';').forEach(function(x){var a=x.split('=');HEB[a[0]]=a[1];});
'אלקטרון=electron;אלקטרונים=electron;פרוטון=proton;פרוטונים=proton;נייטרון=neutron;ניוטרון=neutron;נויטרון=neutron;קווארק=quark;קוורק=quark;קווארקים=quark;גלואון=gluon;פוטון=photon;פוטונים=photon;נייטרינו=neutrino;ניוטרינו=neutrino;פוזיטרון=positron;מיואון=muon;בוזון היגס=higgs boson;היגס=higgs boson;חלקיק אלפא=alpha particle;חלקיק בטא=beta particle;חלקיק תת אטומי=subatomic particle;חלקיקים תת אטומיים=subatomic particle;אנטי חומר=antimatter;אנטיחומר=antimatter;פיון=pion;דאוטריום=deuteron;גרביטון=graviton;לפטון=lepton;בריון=baryon;הדרון=hadron;נוקלאון=nucleon;פרמיון=fermion;בוזון=boson'.split(';').forEach(function(x){var a=x.split('=');HEB[a[0]]=a[1];});
function hebLookup(w){if(HEB[w])return HEB[w];var b=w.replace(/(ים|ות)$/,'');if(b!==w&&HEB[b])return HEB[b];if(w.length>3&&/^[הובלמכש]/.test(w)){var s=w.slice(1);if(HEB[s])return HEB[s];var s2=s.replace(/(ים|ות)$/,'');if(HEB[s2])return HEB[s2];}return null;}
function translateHeb(s){
 s=s.replace(/[֑-ׇ]/g,'').replace(/[״"]/g,'');var toks=s.split(/[^א-ת'a-zA-Z0-9]+/).filter(Boolean),out=[],i=0;
 while(i<toks.length){var t=toks[i],two=toks[i+1]?t+' '+toks[i+1]:null;
  if(/^[א-ת']/.test(t)){var h=(two&&hebLookup(two));if(h){out.push(h);i+=2;continue;}h=hebLookup(t);if(h){out.push(h);i++;continue;}i++;continue;}
  out.push(t);i++;}
 return out.join(' ');}
function normQ(s){s=String(s);if(/[\u0590-\u05FF]/.test(s))s=translateHeb(s);return String(s).toLowerCase().replace(/[₀-₉]/g,function(c){return SUBD.indexOf(c);}).replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();}
function escRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
var NAME_MAP={},FORMULA_INDEX={},VOCAB=[],ALTNAMES={aluminum:'Al',sulphur:'S',cesium:'Cs'};
function parseParts(t){return t.trim().split('\n').map(function(l){var a=l.split('|');var t=(a[2]||'').split(',').filter(Boolean),zp={},hz=false;var els=t.map(function(x){var q=x.split(':');if(q[1]!==undefined){zp[q[0]]=+q[1];hz=true;}return q[0];});return{name:a[0],desc:a[1],els:els,zp:hz?zp:null};});}
function init(){
 buildStruct();
 var ORD={'Pencil':['Lacquer','Cedar','Graphite','Brass','Eraser'],'Processor / chip (CPU, GPU, IC)':['Heat','Silicon','Metal','Package','Solder'],'Cable / wire':['Outer','Insulation','Copper','Connector']},MOD={'Banana':'concentric','Alkaline battery (AA/AAA/D)':'concentric','Granite':'phases','Human body':'phases'};
 ITEMS.forEach(function(it){if(MOD[it.title])it.model=MOD[it.title];if(it.parts&&ORD[it.title]){var ln=it.parts.split('\n');it.parts=ORD[it.title].map(function(k){return ln.filter(function(l){return l.indexOf(k)===0;})[0];}).join('\n');}});
 var vocab={};
 ITEMS.forEach(function(it){
  it._res=it.names.map(function(n){var nn=normQ(n);if(!NAME_MAP[nn]||(it.basis&&!NAME_MAP[nn].basis))NAME_MAP[nn]=it;nn.split(' ').forEach(function(w){if(w.length>=4)vocab[w]=1;});return{name:nn,re:new RegExp('(?:^| )'+escRe(nn)+'(?:s|es)?(?= |$)')};});
  if(it.formula&&!it.extra&&!it.kind){var p=parseFormula(it.formula);if(p){var k=canon(p.counts);if(!FORMULA_INDEX[k])FORMULA_INDEX[k]=it;}}});
 ELEMENTS.forEach(function(e){vocab[e.name.toLowerCase()]=1;});
 VOCAB=Object.keys(vocab);}
function getData(it){
 if(it._d)return it._d;var d;
 if(it.comp){d={comp:normalizeComp(parseLines(it.comp)),arrange:null,hasAtoms:false};}
 else if(it.formula){d=analyzeFormula(it.formula,{kind:it.kind,where:it.where,arrange:it.arrange});
  if(it.extra){var ex=parseLines(it.extra),et=0;ex.forEach(function(x){et+=x.pct;});
   d.comp.forEach(function(c){c.pct*=(100-et)/100;});
   ex.forEach(function(x){var f=d.comp.filter(function(c){return c.sym===x.sym;})[0];if(f){f.pct+=x.pct;f.where+='; also '+x.where;}else d.comp.push({sym:x.sym,pct:x.pct,where:x.where,role:x.role});});
   d.comp.sort(function(a,b){return b.pct-a.pct;});d.hasAtoms=false;}}
 else if(it.mix){d={comp:mixComp(it.mix,it.phase),arrange:null,hasAtoms:false};}
 d.parts=it.parts?parseParts(it.parts):[];it._d=d;return d;}
function lev(a,b){var m=a.length,n=b.length,p=[],i,j;for(j=0;j<=n;j++)p[j]=j;for(i=1;i<=m;i++){var prev=p[0];p[0]=i;for(j=1;j<=n;j++){var t=p[j];p[j]=Math.min(p[j]+1,p[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=t;}}return p[n];}
function elemItem(el){
 var info=elemInfo(el),st=elemState(el),arr='Pure element: atomic number '+el.z+', '+CAT[el.cat].n.toLowerCase()+', atomic mass '+el.mass+'. At room temperature it is a '+st+'.';
 if(DIATOMIC[el.sym])arr+=' As a free '+(st==='solid'?'solid':st)+' it exists as '+DIATOMIC[el.sym]+' molecules.';
 return{title:el.name,label:'Element',element:el,_d:{comp:[{sym:el.sym,pct:100,where:'Every atom of the sample is '+el.name.toLowerCase()+'. Typical places: '+info,role:'The only element present'}],arrange:arr,hasAtoms:false,parts:[]}};}
function lookupElement(raw,nq){
 var t=raw.trim();
 if(EL_BY_NAME[nq])return EL_BY_NAME[nq];
 if(/^[A-Z][a-z]?$/.test(t)&&EL[t])return EL[t];
 if(/^[a-z]{1,2}$/.test(t)){var cap=t[0].toUpperCase()+t.slice(1);if(EL[cap]&&!/^(in|as|at|be|no|he|am|or|go|is|it|me|my|us|to|so|by|do|if|on|up|we|hi|ok)$/.test(t))return EL[cap];}
 if(/^\d{1,3}$/.test(t)&&+t>=1&&+t<=118)return ELEMENTS[+t-1];
 return null;}
function findCandidates(nq){
 var found=[],i,j;
 ITEMS.forEach(function(it){
  it._res.forEach(function(p){var m=p.re.exec(nq);if(m){var st=m.index+(m[0].charAt(0)===' '?1:0);found.push({it:it,score:p.name.length+(p.name.indexOf(' ')>=0?2:0),start:st,end:st+p.name.length,name:p.name});}});
  if(it.rx){var m2=it.rx.exec(nq);if(m2)found.push({it:it,score:m2[0].length+3,start:m2.index,end:m2.index+m2[0].length,name:m2[0]});}});
 found.sort(function(a,b){return b.score-a.score;});
 var acc=[];found.forEach(function(f){if(acc.some(function(a){return a.it===f.it||(f.start<a.end&&a.start<f.end);}))return;acc.push(f);});
 var els=[];
 ELEMENTS.forEach(function(e){var nm=e.name.toLowerCase();var m=new RegExp('(?:^| )'+nm+'(?= |$)').exec(nq);if(m){var st=m.index+(m[0].charAt(0)===' '?1:0);if(!acc.some(function(a){return st<a.end&&a.start<st+nm.length;}))els.push({el:e,score:nm.length,start:st,end:st+nm.length});}});
 for(var al in ALTNAMES){var m3=new RegExp('(?:^| )'+al+'(?= |$)').exec(nq);if(m3)els.push({el:EL[ALTNAMES[al]],score:al.length,start:m3.index,end:m3.index+al.length});}
 return{items:acc,els:els};}
function cap(s){return s.replace(/\b[a-z]/g,function(c){return c.toUpperCase();});}
function blend(list,ctx){
 var tot=0;list.forEach(function(l){tot+=l.w;});
 var r={title:ctx.title,label:'',summary:'',notes:ctx.notes||[],how:ctx.how||[],badge:ctx.badge,estimate:!!ctx.estimate,interp:ctx.interp||''};
 if(list.length===1){var it=list[0].it,d=getData(it);
  r.title=ctx.title||it.title;r.label=it.label||'';r.summary=it.summary||'';
  r.comp=d.comp.map(function(c){var o={};for(var k in c)o[k]=c[k];return o;});r.arrange=d.arrange;r.parts=d.parts||[];r.hasAtoms=!!d.hasAtoms;r.formula=d.formula||(it.formula||null);r.mass=d.mass;r.counts=d.counts;
  r.basis=it.element?{k:'calc',t:'Standard element data (periodic table)'}:(it.cat||it.generic)?{k:'guess',t:'Rough guess from a category. Real items of this kind vary a lot.'}:(it.formula&&!it.extra&&!it.kind)?{k:'calc',t:'Calculated exactly from the formula '+it.formula.replace(/[·.]/g,'·')+' with standard atomic masses.'}:it.mix?{k:'typical',t:(it.basis==='typical'?'Typical recipe/nutrition values for an average sample, converted to elements by calculation. Brands and batches differ.':'Typical mixture worked out from its main ingredients. Real samples differ.')}:{k:'typical',t:it.basis==='typical'?'Typical build from common materials, converted to elements by calculation. Real products differ by brand and model.':'Typical composition written from reference knowledge. Real samples differ.'};
  r.mixSrc=it.mix||null;r.imodel=it.model||null;r.phase=it.phase||null;r.ikind=it.kind||null;if(it.element){r.element=it.element;}
  return r;}
 r.basis={k:'guess',t:'Combined estimate from several items ('+list.map(function(l){return l.it.title;}).slice(0,3).join(', ')+'). Treat as approximate.'};
 var acc={},parts=[],names=[];
 list.forEach(function(l){var d=getData(l.it),sh=l.w/tot;names.push(l.it.title+' ('+Math.round(sh*100)+'%)');
  d.comp.forEach(function(c){var o=acc[c.sym]||(acc[c.sym]={sym:c.sym,pct:0,wh:[],ro:[]});o.pct+=c.pct*sh;o.wh.push('■ '+l.it.title+': '+c.where);if(c.role)o.ro.push(c.role);});
  (d.parts||[]).forEach(function(p){parts.push({name:p.name+' ('+l.it.title+')',desc:p.desc,els:p.els});});});
 r.comp=Object.keys(acc).map(function(k){var o=acc[k];var seen={},ro=o.ro.filter(function(x){if(seen[x])return false;seen[x]=1;return true;});return{sym:o.sym,pct:o.pct,where:o.wh.join('\n'),role:ro.slice(0,2).join(' / ')};}).sort(function(a,b){return b.pct-a.pct;});
 r.blendItems=list.map(function(l){return l.it;});r.label='Smart blend';r.summary='Combined estimate for “'+ctx.raw+'” built from: '+names.join(' + ')+'.';r.parts=parts;r.arrange=null;r.hasAtoms=false;r.blendNames=names;
 return r;}
function fromCandidates(raw,nq,cf,extra){
 var items=cf.items,ng=items.filter(function(c){return!c.it.generic;}),use,list,leftover;
 var covered=items.concat(cf.els).map(function(c){return[c.start,c.end];});
 leftover=nq.split(' ').filter(function(w){return w.length>1;}).filter(function(w){var idx=nq.indexOf(w);return!covered.some(function(c){return idx>=c[0]&&idx<c[1];});});
 if(ng.length)use=ng;else if(cf.els.length)use=cf.els.map(function(e){return{it:elemItem(e.el),score:e.score};});else if(items.length)use=items;else return null;
 var max=use.reduce(function(a,c){return Math.max(a,c.score);},0);
 use=use.filter(function(c){return c.score>=.35*max;}).slice(0,3);
 list=use.map(function(c){return{it:c.it,w:c.score};});
 var exact=NAME_MAP[nq]!==undefined,isCat=list.some(function(l){return l.it.cat;}),multi=list.length>1,notes=[],how=[];
 list.forEach(function(l){how.push('“'+(use.filter(function(u){return u.it===l.it;})[0].name||l.it.title)+'” → '+l.it.title);});
 var badge,estimate=false;
 if(list.length===1&&list[0].it.element){badge={t:'Element',c:'b-info'};}
 else if(multi){badge={t:'Smart blend',c:'b-warn'};estimate=true;}
 else if(isCat){badge={t:'Category estimate',c:'b-warn'};estimate=true;}
 else{badge={t:exact?'Exact match':'Keyword match',c:exact?'b-ok':'b-info'};}
 if(estimate)notes.push({cls:'warn',text:'This is an estimate: “'+raw+'” isn\'t one exact entry, so ElementScope analysed its words and combined the typical compositions of '+(multi?'those things':'that kind of thing')+'. Real objects vary by brand, grade and design — treat percentages as typical, not lab-measured.'});
 else if(!list[0].it.element)notes.push({cls:'',text:'Typical composition (mass %). Real products vary by brand, grade and design.'});
 if(leftover.length&&!exact)notes.push({cls:'',text:'Words not used for the estimate: '+leftover.join(', ')+'. Add a material word (wooden, steel, plastic, glass…) to refine it.'});
 if(list.length===1&&list[0].it.element&&leftover.length)notes.push({cls:'',text:'Read as the element '+list[0].it.title+'; other words ignored: '+leftover.join(', ')+'.'});
 return blend(list,{title:(list.length===1&&!list[0].it.cat?list[0].it.title:cap(raw)),raw:raw,badge:badge,estimate:estimate,notes:(extra||[]).concat(notes),how:how});}
function fuzzyFix(nq,cf){
 var covered=cf.items.concat(cf.els).map(function(c){return[c.start,c.end];}),pos=0,changed=false,SKIP=/^(with|from|made|that|this|which|small|large|big|thing|style)$/;
 var out=nq.split(' ').map(function(t){var idx=nq.indexOf(t,pos);pos=idx+t.length;
  if(t.length<5||SKIP.test(t)||covered.some(function(c){return idx>=c[0]&&idx<c[1];}))return t;
  var best=null,bd=9,lim=t.length<=7?1:2;
  VOCAB.forEach(function(v){if(Math.abs(v.length-t.length)>2)return;var d=lev(t,v);if(d>0&&d<=lim&&(d<bd||(d===bd&&v.length>best.length))){bd=d;best=v;}});
  if(best){changed=true;return best;}return t;});
 return changed?out.join(' '):null;}
function byTitle(t){return ITEMS.filter(function(i){return i.title===t;})[0];}
function suggest(nq){
 var best={};
 Object.keys(NAME_MAP).forEach(function(k){if(k.length<3||Math.abs(k.length-nq.length)>3)return;var d=lev(nq,k),lim=Math.max(1,Math.min(k.length<=4?1:k.length<=8?2:3,Math.floor(nq.length/3)));if(d<=lim){var t=NAME_MAP[k].title;if(!best[t]||d<best[t].d)best[t]={d:d,q:k,t:t};}});
 ELEMENTS.forEach(function(e){var k=e.name.toLowerCase();if(Math.abs(k.length-nq.length)>2)return;var d=lev(nq,k);if(d<=2&&d<=Math.floor(k.length/3))best[e.name]={d:d,q:k,t:e.name};});
 return Object.keys(best).map(function(k){return best[k];}).sort(function(x,y){return x.d-y.d;}).slice(0,3);}
function fallback(raw,nq){return{unrecognized:true,query:raw,suggest:nq?suggest(nq):[]};}
function formulaResult(fo,raw){
 var a=analyzeFormula(fo.formula),known=FORMULA_INDEX[canon(fo.counts)];
 var r={title:fmtF(fo.formula),titleHtml:true,label:'Chemical formula',summary:known?known.title+' — '+known.summary:'Parsed chemical formula using the 118-element table.',
  badge:{t:'Formula parsed',c:'b-ok'},comp:a.comp,arrange:a.arrange,parts:[],hasAtoms:true,formula:fo.formula,mass:a.mass,counts:a.counts,notes:[],how:['Formula parser read '+fo.formula+' → '+Object.keys(a.counts).map(function(s){return a.counts[s]+'× '+EL[s].name;}).join(', ')],estimate:false,basis:{k:'calc',t:'Calculated exactly from the formula with standard atomic masses.'}};
 if(fo.formula!==raw.trim())r.interp='Read as '+fo.formula;
 if(fo.hydrate)r.notes.push({cls:'',text:'This is a hydrate: water molecules are locked inside the crystal in the stated ratio.'});
 r.notes.push({cls:'',text:'Percentages are exact for this formula (mass % and atom %). Use the toggle to switch.'});return r;}
function resolve(q){
 var raw=String(q||'').trim();if(!raw)return null;
 var nq=normQ(raw),ex=NAME_MAP[nq];
 var pt=findParticle(nq);if(pt)return{particle:pt,title:pt.name,label:'Subatomic particle',badge:{t:'Subatomic particle',c:'b-info'},comp:[],parts:[],notes:[],how:[],basis:{k:'calc',t:'Reference values for this particle'}};
 if(ex){var r0=fromCandidates(raw,nq,{items:[{it:ex,score:nq.length,start:0,end:nq.length,name:nq}],els:[]});if(r0)return r0;}
 var el=lookupElement(raw,nq);
 if(el){return blend([{it:elemItem(el),w:1}],{title:el.name,raw:raw,badge:{t:'Element',c:'b-info'},how:['Matched the periodic table: '+el.name+' ('+el.sym+')'],notes:[]});}
 var nf=nameToFormula(nq);
 if(nf){var fo2=tryFormula(nf.f);if(fo2){var r2=formulaResult(fo2,raw),ttl=raw.trim().replace(/\s+/g,' ');r2.title=ttl.charAt(0).toUpperCase()+ttl.slice(1);r2.titleHtml=false;r2.label='Chemical compound';r2.badge={t:'Named compound',c:'b-ok'};r2.interp='Read as '+subTxt(fo2.formula)+(nf.note?' · '+nf.note:'');r2.basis={k:'calc',t:'Calculated exactly from the formula '+fo2.formula+' with standard atomic masses. The name was converted by balancing ion charges.'};r2.how=['Compound name converted to a formula by balancing ion charges: '+fo2.formula];return r2;}}
 var fo=tryFormula(raw);
 if(fo)return formulaResult(fo,raw);
 var cf=findCandidates(nq),fix=fuzzyFix(nq,cf),r;
 if(fix){r=fromCandidates(raw,fix,findCandidates(fix),[{cls:'',text:'Did you mean “'+fix+'”? Showing results for that.'}]);if(r){r.badge={t:'Closest match',c:'b-info'};return r;}}
 r=fromCandidates(raw,nq,cf);if(r)return r;
 return fallback(raw,nq);}
init();
/* ===== VISUALS (SVG builders, no DOM) ===== */
var PAL=['#3b6ef5','#14b8a6','#f59e0b','#ef6b6b','#8b7cf6','#ec4899','#84cc16'],TRACE='#b6bdc9',SHOW=6;
function fmtPct(p){if(p>=10)return p.toFixed(1)+'%';if(p>=1)return p.toFixed(2)+'%';if(p>=0.01)return parseFloat(p.toPrecision(2))+'%';return'<0.01%';}
function txtCol(h){var n=parseInt(h.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;return(r*299+g*587+b*114)/1000>150?'#10142a':'#fff';}
/* ---------- structure model ---------- */
var DEV_RX=/device|electronic|vehicle|machine|furniture|building|cable|battery|phone|bulb|chip|jewel|everyday object|tool|appliance|component|instrument/i,LIQ_RX=/liquid|gas|drink|solution|fluid|mixture|process|phenomenon|plasma/i;
var OUTER=/\b(surface|coat|coating|coated|skin|peel|shell|casing|housing|case|jacket|plating|plated|film|lacquer|glaze|cover|frame|exterior|outer|crust|paint|bark|rind|lid|wall|walls|sheath|finish|cladding|edge|outside)\b/i;
var CORE=/\b(core|centre|center|inside|inner|interior|nucleus|seed|seeds|cathode|anode|die|filling|marrow|pith|kernel|heart|electrolyte|substrate|wiring|windings|circuit|board|chips?|battery|pulp|crystals?)\b/i;
function atomShares(comp){var a=comp.map(function(c){return c.atomPct!==undefined?c.atomPct:c.pct/EL[c.sym].mass;}),t=a.reduce(function(x,y){return x+y;},0);return a.map(function(x){return x/t*100;});}
function buildModel(r,comp){
 var cmap={};comp.forEach(function(c){cmap[c.sym]=c;});
 var syms=comp.map(function(c){return c.sym;}),label=(r.label||'')+' '+(r.title||''),m={zones:[],cmap:cmap,type:'',note:''};
 function atoms(note,bond){var sh=atomShares(comp);m.type=bond?'bond':'field';m.kind='atoms';m.zones=comp.map(function(c,i){return{id:c.sym,name:EL[c.sym].name,desc:fmtPct(c[state.key])+(state.key==='atomPct'?' of all atoms':' of the mass'),pc:pctS(c[state.key]),els:[c.sym],share:sh[i],color:c.color};});m.note=note||'Each dot is an atom, shown in proportion to its share of all atoms in the material.';}
 function bondInfo(){m.single=true;}
 if(r.mixSrc){var tot=r.mixSrc.reduce(function(a,x){return a+x[1];},0);m.type='bond';m.single=true;m.kind='mix';
  m.zones=r.mixSrc.map(function(x,i){var els=Object.keys(parseFormula(x[0]).counts).filter(function(s){return cmap[s];});return{id:'c'+i,name:x[2]||x[0],desc:(x[1]/tot*100>=10?(x[1]/tot*100).toFixed(0):(x[1]/tot*100).toFixed(1))+'% of the mix by mass',pc:pctS(x[1]/tot*100),els:els,share:x[1]/tot*100,color:null};});
  m.note='';return m;}
 if(r.element||r.formula||/Alloy|Coin/i.test(r.label||'')){atoms('',true);m.single=true;return m;}
 var type=null,zones=[];
 if(r.parts&&r.parts.length&&!r.blendItems){type=r.imodel||'stack';var used={};
  r.parts.forEach(function(p,i){var els=p.els.filter(function(s){return cmap[s];});els.forEach(function(s){used[s]=1;});if(els.length)zones.push({id:'z'+i,name:p.name,desc:p.desc,els:els,zp:p.zp||null});});
  var rest=syms.filter(function(s){return!used[s];});if(rest.length)zones.push({id:'zr',name:'Spread throughout',desc:'Present across the whole item rather than in one part.',els:rest});}
 else{
  var dev=r.blendItems?r.blendItems.some(function(it){return DEV_RX.test((it.label||'')+' '+it.title);}):DEV_RX.test(label);
  if(!dev&&LIQ_RX.test(label)){atoms('Fluids are mixed evenly at the molecular scale; each dot is an atom.');return m;}
  type=dev?'stack':'concentric';var buck={o:[],b:[],c:[]};
  comp.forEach(function(c){var t=c.where||'',io=t.search(OUTER),ic=t.search(CORE),k='b';if(io>=0&&(ic<0||io<=ic))k='o';else if(ic>=0)k='c';buck[k].push(c.sym);});
  var nm=dev?['Housing & surface','Body & internals','Core & active parts']:['Outer surface','Body','Core'],ds=['Found on or near the outside.','Spread through the bulk of the item.','Concentrated toward the inside.'];
  ['o','b','c'].forEach(function(k,i){if(buck[k].length)zones.push({id:'d'+k,name:nm[i],desc:ds[i],els:buck[k]});});
  if(zones.length<2){atoms('This material is essentially uniform: the elements are spread evenly rather than in layers.');return m;}}
 if(type==='concentric'&&zones.length>5)type='stack';
 if(type==='concentric'&&zones.length<2)type='stack';
 m.type=type;m.zones=zones;m.note=type==='concentric'?'Cross-section, outside to centre.':type==='phases'?'Regions or phases of the material.':'Cross-section, outside at the top.';return m;}
function pctS(v){return v>=99.95?'100%':v>=0.1?v.toFixed(1)+'%':'<0.1%';}
function dly(i){return Math.min(260+i*28,780);}
function zpv(m,zin,sym){var z=m.zmap&&m.zmap[zin];return(z&&z.zp&&z.zp[sym]!=null&&state.key==='pct')?z.zp[sym]:m.cmap[sym][state.key];}
function chip(x,y,sym,rad,zin,m,fs,pl,dl){var c=m.cmap[sym].color,tc=txtCol(c);return'<g class="ch" data-sym="'+sym+'" data-zin="'+zin+'" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')"><g class="cs" style="animation-delay:'+(dl||0)+'ms"><circle r="'+rad+'" fill="'+c+'"/><text text-anchor="middle" dy=".35em" fill="'+tc+'"'+(fs?' style="font-size:'+fs+'px"':'')+'>'+sym+'</text>'+(pl?'<text class="pl'+(pl===2?' h':'')+'" y="'+(rad+8.5)+'" text-anchor="middle">'+pctS(zpv(m,zin,sym))+'</text>':'')+'</g></g>';}
function svgConc(m){var n=m.zones.length,R0=112,Rin=38,step=(R0-Rin)/(n-1),s='<svg viewBox="0 0 240 240" role="img" aria-label="Concentric cross-section">',di=0;
 m.zones.forEach(function(z,i){var R=Rin+(n-1-i)*step;s+='<circle class="zn" data-zone="'+z.id+'" cx="120" cy="120" r="'+R+'" fill-opacity="'+(0.05+0.05*i).toFixed(2)+'" style="animation-delay:'+(i*90)+'ms"/>';});
 m.zones.forEach(function(z,i){var R=Rin+(n-1-i)*step,k=z.els.length,last=i===n-1;
  if(last){var rr=k===1?0:(k<=6?21:25),cr=k<=4?11:(k<=6?9:7.5),sp=k===1?99:2*Math.PI*rr/k;z.els.forEach(function(sy,j){var a=(-90+360*j/k)*Math.PI/180;s+=chip(120+rr*Math.cos(a),120+rr*Math.sin(a),sy,cr,z.id,m,cr<9?7:0,sp>=36?1:2,dly(di++));});}
  else{var rm=R-step/2,cr=Math.max(6.5,Math.min(12,step/2-2,Math.PI*rm/k-1.5)),st=-62+i*37,sp=2*Math.PI*rm/k;z.els.forEach(function(sy,j){var a=(st+360*j/k)*Math.PI/180;s+=chip(120+rm*Math.cos(a),120+rm*Math.sin(a),sy,cr,z.id,m,cr<9?7:0,sp>=36?1:2,dly(di++));});
   s+='<text class="zb" x="120" y="'+(120-R+9)+'" text-anchor="middle">'+(i+1)+'</text>';}});
 return s+'</svg>';}
function svgStack(m){var W=320,y=0,s='',di=0;
 m.zones.forEach(function(z,i){var per=9,rw=Math.ceil(z.els.length/per),h=26+rw*40;s+='<rect class="zn" data-zone="'+z.id+'" x="1" y="'+(y+1)+'" width="318" height="'+h+'" rx="14" fill-opacity="'+(0.05+0.045*i).toFixed(2)+'" style="animation-delay:'+(i*80)+'ms"/><text class="zl" x="14" y="'+(y+19)+'">'+esc((i+1)+'  '+z.name.slice(0,40))+'</text>';
  z.els.forEach(function(sy,j){s+=chip(25+(j%per)*33,y+38+Math.floor(j/per)*40,sy,12,z.id,m,0,1,dly(di++));});y+=h+8;});
 return'<svg viewBox="0 0 '+W+' '+(y-6)+'" role="img" aria-label="Layered cross-section">'+s+'</svg>';}
function svgPhases(m){var cols=[0,0],s='',bw=155,di=0;
 m.zones.forEach(function(z,i){var per=4,rw=Math.ceil(z.els.length/per),h=26+rw*40,c=cols[0]<=cols[1]?0:1,x=c*(bw+10),y=cols[c];
  s+='<rect class="zn" data-zone="'+z.id+'" x="'+(x+1)+'" y="'+(y+1)+'" width="'+(bw-2)+'" height="'+h+'" rx="14" fill-opacity="'+(0.05+0.04*(i%4)).toFixed(2)+'" style="animation-delay:'+(i*80)+'ms"/><text class="zl" x="'+(x+12)+'" y="'+(y+20)+'">'+esc(z.name.slice(0,22))+'</text>';
  z.els.forEach(function(sy,j){s+=chip(x+26+(j%per)*34,y+40+Math.floor(j/per)*40,sy,12,z.id,m,0,1,dly(di++));});cols[c]+=h+8;});
 return'<svg viewBox="0 0 320 '+(Math.max(cols[0],cols[1])-6)+'" role="img" aria-label="Phases and regions">'+s+'</svg>';}
function svgField(m){var C=14,Rw=8,N=C*Rw,sp=[],tot=0,cnt=m.zones.map(function(z){return Math.max(1,Math.round(z.share/100*N));});
 var sum=cnt.reduce(function(a,b){return a+b;},0);while(sum>N){var mi=cnt.indexOf(Math.max.apply(null,cnt));cnt[mi]--;sum--;}while(sum<N){var ma=0;m.zones.forEach(function(z,i){if(z.share/100*N-cnt[i]>m.zones[ma].share/100*N-cnt[ma])ma=i;});cnt[ma]++;sum++;}
 cnt.forEach(function(c,i){for(var k=0;k<c;k++)sp.push(i);});
 var slots=[];for(var r=0;r<Rw;r++)for(var c=0;c<C;c++)slots.push([c,r]);
 var arr=[];
 if(m.checker){slots.forEach(function(sl,i){arr[i]=(sl[0]+sl[1])%2;});}
 else{var seed=0,str=(state.last&&state.last.title)||'x';for(var q=0;q<str.length;q++)seed=(seed*31+str.charCodeAt(q))>>>0;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
  arr=sp.slice();for(var i=arr.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1)),t=arr[i];arr[i]=arr[j];arr[j]=t;}}
 var s='<svg viewBox="0 0 320 192" role="img" aria-label="Particle view">';
 slots.forEach(function(sl,i){var zi=arr[i],z=m.zones[zi],x=13+sl[0]*22+(sl[1]%2)*11,y=16+sl[1]*23;
  var sym=m.kind==='atoms'?z.els[0]:'';
  s+='<g class="ch" '+(sym?'data-sym="'+sym+'" ':'')+'data-zin="'+z.id+'" data-zone="'+z.id+'" transform="translate('+x+' '+y+')"><g class="cs" style="animation-delay:'+Math.min(200+i*4,700)+'ms"><circle r="9.5" fill="'+z.color+'"/>'+(sym?'<text text-anchor="middle" dy=".35em" fill="'+txtCol(z.color)+'" style="font-size:'+(sym.length>1?7.5:9)+'px">'+sym+'</text>':'')+'</g></g>';});
 return s+'</svg>';}
function modelHTML(m){
 var svg=m.type==='bond'?bondMain(m):m.type==='concentric'?svgConc(m):m.type==='stack'?svgStack(m):m.type==='phases'?svgPhases(m):svgField(m);
 var legend=m.zones.map(function(z,i){var dot=(m.type==='field'||m.type==='bond')&&z.color?'<i style="background:'+z.color+'"></i>':'';var pc=(m.type==='field'||m.type==='bond')&&z.pc?' <span class="lp">'+z.pc+'</span>':'';var pre=(m.type==='concentric'||m.type==='stack')?(i+1)+'. ':'';return'<button class="zc" data-zone="'+z.id+'">'+dot+pre+esc(z.name)+pc+'</button>';}).join('');
 return svg+'<div class="zr">'+legend+'</div>'+(m.type==='bond'?'':'<p class="note">'+esc(m.note)+'</p>')+'<div class="mi" id="mi"></div><div id="bond"></div>';}
function bondMain(m){var b=substanceStruct(state.last,m);m.note=b.note;return'<div class="bw">'+wrap(b.svg)+'</div><p class="note">'+esc(b.note)+'</p>';}
/* ===== atomic bond structures ===== */
var VAL={H:1,C:4,N:3,O:2,F:1,Cl:1,Br:1,I:1,S:2,P:3,Si:4,B:3,Se:2},
 SMI_RAW={'H2O':'O','CO2':'O=C=O','O2':'O=O','N2':'N#N','H2':'[H][H]','NH3':'N','CH4':'C','H2O2':'OO','O3':'[O]=[O][O]','N2O':'[N]#[N][O]','CO':'[C]#[O]','C2H6O':'CCO','C3H8O':'CC(C)O','C3H8':'CCC','C4H10':'CCCC','C2H4O2':'CC(=O)O','CH4N2O':'NC(=O)N','C6H12O6':'OCC1OC(O)C(O)C(O)C1O','C12H22O11':'OCC1OC(CO)(OC2OC(CO)C(O)C(O)C2O)C(O)C1O','C6H8O6':'OCC(O)C1OC(=O)C(O)=C1O','C9H8O4':'CC(=O)OC1=CC=CC=C1C(=O)O','C8H9NO2':'CC(=O)NC1=CC=C(O)C=C1','C13H18O2':'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O','C8H10N4O2':'CN1C=NC2=C1C(=O)N(C)C(=O)N2C','C2H6':'CC','C7H8':'CC1=CC=CC=C1','C3H3N':'C=CC#N','C4H6':'C=CC=C','C8H8':'C=CC1=CC=CC=C1','C4H6O6':'OC(C(O)C(=O)O)C(=O)O','C6H8O7':'OC(=O)CC(O)(C(=O)O)CC(=O)O','Cl2':'ClCl','F2':'FF','Br2':'BrBr','I2':'II','H2S':'S','SO2':'O=S=O','NO2':'[O]=[N][O]','HCl':'Cl','H3PO4':'OP(=O)(O)O'},
 POLY_RAW={'C2H4':'*CC*','C3H6':'*CC(C)*','C2H3Cl':'*CC(Cl)*','C8H8':'*CC(C1=CC=CC=C1)*','C2F4':'*C(F)(F)C(F)(F)*','C5H8O2':'*CC(C)(C(=O)OC)*','C5H8':'*CC(C)=CC*','C6H10O5':'*OC1C(CO)OC(*)C(O)C1O','C10H8O4':'*OCCOC(=O)C1=CC=C(C=C1)C(=O)*','C12H22N2O2':'*NCCCCCCNC(=O)CCCCC(=O)*','C16H14O3':'*OC(=O)OC1=CC=C(C=C1)C(C)(C)C1=CC=C(C=C1)*','C2H6OSi':'*[Si](C)(C)O*'},
 GRP={'CO3':'[O-]C(=O)[O-]','HCO3':'OC(=O)[O-]','SO4':'[O-]S(=O)(=O)[O-]','PO4':'[O-]P(=O)([O-])[O-]','OH':'[O-][H]','NH4':'[N+]([H])([H])([H])[H]','ClO':'[O-]Cl'},
 SMI={},POLY={};
function cf(f){var p=parseFormula(f);return p?canon(p.counts):f;}
Object.keys(SMI_RAW).forEach(function(k){SMI[cf(k)]=SMI_RAW[k];});Object.keys(POLY_RAW).forEach(function(k){POLY[cf(k)]=POLY_RAW[k];});
function sGeom(s){var a=[],b=[],stack=[],prev=-1,ring={},ord=1,i=0;
 function add(sym,fix,ch){a.push({s:sym,x:0,y:0,fix:fix,ch:ch||0});var k=a.length-1;if(prev>=0)b.push([prev,k,ord]);prev=k;ord=1;}
 while(i<s.length){var c=s[i];
  if(c==='('){stack.push(prev);i++;}else if(c===')'){prev=stack.pop();i++;}
  else if(c==='='){ord=2;i++;}else if(c==='#'){ord=3;i++;}
  else if(/\d/.test(c)){var n=+c;if(ring[n]!==undefined){b.push([ring[n],prev,ord]);ord=1;delete ring[n];}else ring[n]=prev;i++;}
  else if(c==='*'){add('*',1);i++;}
  else if(c==='['){var j=s.indexOf(']',i),t=s.slice(i+1,j),ch=/\+$/.test(t)?1:/-$/.test(t)?-1:0;t=t.replace(/[+-]$/,'');i=j+1;add(t,1,ch);}
  else{var sym=c;if(c==='C'&&s[i+1]==='l'){sym='Cl';i++;}else if(c==='B'&&s[i+1]==='r'){sym='Br';i++;}i++;add(sym,0);}}
 return{a:a,b:b};}
function molFrom(smi,noH){var g=sGeom(smi),a=g.a,b=g.b,deg=a.map(function(){return 0;});
 b.forEach(function(x){deg[x[0]]+=x[2];deg[x[1]]+=x[2];});
 a.slice().forEach(function(x,i){if(x.fix||noH)return;var h=(VAL[x.s]||0)-deg[i];for(var k=0;k<h;k++){a.push({s:'H',x:0,y:0,ih:1});b.push([i,a.length-1,1]);}});
 return{a:a,b:b};}
function layout(m){
 var a=m.a,b=m.b,nb=a.map(function(){return[];});b.forEach(function(x){nb[x[0]].push(x[1]);nb[x[1]].push(x[0]);});
 var isH=function(i){return!!a[i].ih;},hv=[];a.forEach(function(p,i){if(!isH(i))hv.push(i);});
 var hn=function(i){return nb[i].filter(function(j){return!isH(j);});},TP=Math.PI*2;
 var rings=[],keys={};
 b.forEach(function(x){var i=x[0],j=x[1];if(isH(i)||isH(j))return;var prev={},q=[i],found=false;prev[i]=-1;
  while(q.length&&!found){var u=q.shift();hn(u).forEach(function(v){if(found||(u===i&&v===j)||prev[v]!==undefined)return;prev[v]=u;if(v===j)found=true;else q.push(v);});}
  if(found){var path=[],c=j;while(c!==-1){path.push(c);c=prev[c];}if(path.length<=8){var k=path.slice().sort(function(p,q2){return p-q2;}).join(',');if(!keys[k]){keys[k]=1;rings.push(path.reverse());}}}});
 rings=rings.filter(function(r){return!rings.some(function(o){return o!==r&&o.length<r.length&&o.every(function(x){return r.indexOf(x)>=0;});});});
 var P={},ringOf={},rp={};rings.forEach(function(r,ri){r.forEach(function(x){(ringOf[x]=ringOf[x]||[]).push(ri);});});
 function setPoly(ri,cx,cy,a0,step,k0){var r=rings[ri],n=r.length,R=.5/Math.sin(Math.PI/n);r.forEach(function(x,k){var t=a0+step*((k-k0+n)%n);if(!P[x])P[x]={x:cx+R*Math.cos(t),y:cy+R*Math.sin(t)};});rp[ri]=1;}
 function angd(p,q){var d=Math.abs(p-q)%TP;return d>Math.PI?TP-d:d;}
 function bestDir(v,u){var pv=P[v],ns=hn(v).filter(function(w){return P[w]&&w!==u;}).map(function(w){return Math.atan2(P[w].y-pv.y,P[w].x-pv.x);}),best=0,bs=-1e9,ids=Object.keys(P);
  for(var t=0;t<24;t++){var an=t*TP/24,px=pv.x+Math.cos(an),py=pv.y+Math.sin(an),md=9;ids.forEach(function(id){if(+id===v)return;var d=Math.hypot(P[id].x-px,P[id].y-py);if(d<md)md=d;});
   var nd=9;ns.forEach(function(g){nd=Math.min(nd,angd(an,g));});var sc=Math.min(md,1.8)+(ns.length>=2?Math.min(nd,2.1)/2.1:ns.length===1?-Math.abs(nd-2.09)/3.1:0);if(sc>bs){bs=sc;best=an;}}
  return best;}
 if(rings.length){setPoly(0,0,0,0,TP/rings[0].length,0);}else if(hv.length)P[hv[0]]={x:0,y:0};
 var ch=true,guard=0;
 while(ch&&guard++<300){ch=false;
  rings.forEach(function(r,ri){if(rp[ri])return;var n=r.length,k=-1;for(var t=0;t<n;t++){if(P[r[t]]&&P[r[(t+1)%n]]){k=t;break;}}if(k<0)return;
   var p=P[r[k]],q=P[r[(k+1)%n]],mx=(p.x+q.x)/2,my=(p.y+q.y)/2,ex=q.x-p.x,ey=q.y-p.y,L=Math.hypot(ex,ey)||1,nx=-ey/L,ny=ex/L,gx=0,gy=0,gc=0,id;
   for(id in P){gx+=P[id].x;gy+=P[id].y;gc++;}gx/=gc;gy/=gc;
   if(Math.hypot(mx+nx-gx,my+ny-gy)<Math.hypot(mx-nx-gx,my-ny-gy)){nx=-nx;ny=-ny;}
   var ap=.5/Math.tan(Math.PI/n),cx=mx+nx*ap,cy=my+ny*ap,t0=Math.atan2(p.y-cy,p.x-cx),t1=Math.atan2(q.y-cy,q.x-cx),d=t1-t0;while(d>Math.PI)d-=TP;while(d<-Math.PI)d+=TP;
   setPoly(ri,cx,cy,t0,d>0?TP/n:-TP/n,k);ch=true;});
  hv.forEach(function(u){if(P[u])return;var v=hn(u).filter(function(w){return P[w];})[0];if(v===undefined)return;
   var dir=bestDir(v,u);P[u]={x:P[v].x+Math.cos(dir),y:P[v].y+Math.sin(dir)};
   var ri=(ringOf[u]||[]).filter(function(q2){return!rp[q2];})[0];
   if(ri!==undefined){var r=rings[ri],n=r.length,R=.5/Math.sin(Math.PI/n),cx=P[u].x+Math.cos(dir)*R,cy=P[u].y+Math.sin(dir)*R;setPoly(ri,cx,cy,Math.atan2(P[u].y-cy,P[u].x-cx),TP/n,r.indexOf(u));}
   ch=true;});}
 hv.forEach(function(u,i){if(!P[u])P[u]={x:3+i*.5,y:3};});
 /* gentle relaxation of the heavy-atom skeleton */
 for(var it=0;it<80;it++){var f={};hv.forEach(function(u){f[u]=[0,0];});
  b.forEach(function(x){if(isH(x[0])||isH(x[1]))return;var p=P[x[0]],q=P[x[1]],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)+1e-3,k=(d-1)*.25;f[x[0]][0]+=dx/d*k;f[x[0]][1]+=dy/d*k;f[x[1]][0]-=dx/d*k;f[x[1]][1]-=dy/d*k;});
  for(var i2=0;i2<hv.length;i2++)for(var j2=i2+1;j2<hv.length;j2++){var u1=hv[i2],u2=hv[j2],dx2=P[u1].x-P[u2].x,dy2=P[u1].y-P[u2].y,d2=Math.hypot(dx2,dy2)+1e-3;if(d2<1.5){var pu=(1.5-d2)*.06;f[u1][0]+=dx2/d2*pu;f[u1][1]+=dy2/d2*pu;f[u2][0]-=dx2/d2*pu;f[u2][1]-=dy2/d2*pu;}}
  hv.forEach(function(u){P[u].x+=f[u][0];P[u].y+=f[u][1];});}
 hv.forEach(function(u){a[u].x=P[u].x;a[u].y=P[u].y;});
 /* hydrogens go into the largest free angles around their heavy atom */
 hv.forEach(function(u){var hs=nb[u].filter(isH);if(!hs.length)return;var used=hn(u).map(function(w){return Math.atan2(a[w].y-a[u].y,a[w].x-a[u].x);});
  hs.forEach(function(h){var best=0,bs=-1;for(var t=0;t<24;t++){var an=t*TP/24,nd=9;used.forEach(function(g){nd=Math.min(nd,angd(an,g));});if(nd>bs+1e-6){bs=nd;best=an;}}used.push(best);a[h].x=a[u].x+Math.cos(best)*.78;a[h].y=a[u].y+Math.sin(best)*.78;});});
 return m;}
var MC={};
function getMol(key,smi,noH){var k=key+'|'+(noH?1:0);if(!MC[k])MC[k]=layout(molFrom(smi,noH));return MC[k];}
/* fit a laid-out molecule into a box; returns point copies (never mutates the cached molecule) */
function place(m,x,y,w,h,pad,rot,maxSc){var c=Math.cos(rot||0),s=Math.sin(rot||0),P=m.a.map(function(p){return{s:p.s,x:p.x*c-p.y*s,y:p.x*s+p.y*c,ch:p.ch};}),x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
 P.forEach(function(p){x0=Math.min(x0,p.x);x1=Math.max(x1,p.x);y0=Math.min(y0,p.y);y1=Math.max(y1,p.y);});
 var sc=Math.min((w-2*pad)/Math.max(x1-x0,.01),(h-2*pad)/Math.max(y1-y0,.01),maxSc||46),cx=(x0+x1)/2,cy=(y0+y1)/2;
 P.forEach(function(p){p.px=x+w/2+(p.x-cx)*sc;p.py=y+h/2+(p.y-cy)*sc;});return{P:P,sc:sc,m:m};}
function atomSvg(p,r,zin,cm,dl,lab){var ok=cm&&cm[p.s],c=ok?cm[p.s].color:TRACE;if(!ok)return'<circle cx="'+p.px.toFixed(1)+'" cy="'+p.py.toFixed(1)+'" r="'+r+'" fill="'+c+'" opacity=".7"/>';
 var tc=txtCol(c),sel=state.mixMode?'data-zone="'+zin+'"':'data-sym="'+p.s+'"';
 return'<g class="ch" '+sel+' data-zin="'+zin+'" transform="translate('+p.px.toFixed(1)+' '+p.py.toFixed(1)+')"><g class="cs" style="animation-delay:'+dl+'ms"><circle r="'+r+'" fill="'+c+'"/>'+(r>=6?'<text text-anchor="middle" dy=".35em" fill="'+tc+'" style="font-size:'+(r>=9?(p.s.length>1?8:9.5):6.5)+'px">'+p.s+'</text>':'')+(p.ch&&r>=9?'<text class="chg" x="'+(r*.7)+'" y="'+(-r*.55)+'" text-anchor="middle">'+(p.ch>0?'+':'−')+'</text>':'')+'</g></g>';}
function drawPlaced(pl,zinOf,cm,d0){var P=pl.P,sc=pl.sc,r=Math.max(5,Math.min(13,sc*.34)),bw=Math.max(1.5,Math.min(3.4,sc*.07)),s='<g stroke="var(--ink)" stroke-opacity=".55" stroke-width="'+bw.toFixed(1)+'" stroke-linecap="round" class="bonds">';
 pl.m.b.forEach(function(x){var p=P[x[0]],q=P[x[1]];
  if(p.s==='*'||q.s==='*'){var st=p.s==='*'?q:p,en=p.s==='*'?p:q,dx=en.px-st.px,dy=en.py-st.py,d=Math.sqrt(dx*dx+dy*dy)||1;en.px=st.px+dx/d*sc*.75;en.py=st.py+dy/d*sc*.75;s+='<line x1="'+st.px.toFixed(1)+'" y1="'+st.py.toFixed(1)+'" x2="'+en.px.toFixed(1)+'" y2="'+en.py.toFixed(1)+'" stroke-dasharray="3 3"/>';return;}
  var dx=q.px-p.px,dy=q.py-p.py,d=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/d,ny=dx/d,o=x[2],offs=o===1?[0]:o===2?[-.5,.5]:[-1,0,1],g=bw*2.2;
  offs.forEach(function(k){s+='<line x1="'+(p.px+nx*k*g).toFixed(1)+'" y1="'+(p.py+ny*k*g).toFixed(1)+'" x2="'+(q.px+nx*k*g).toFixed(1)+'" y2="'+(q.py+ny*k*g).toFixed(1)+'"/>';});});
 s+='</g>';P.forEach(function(p,i){if(p.s==='*')return;s+=atomSvg(p,p.s==='H'?Math.max(4.5,r*.68):r,zinOf(p.s),cm,Math.min((d0||240)+i*20,760));});return s;}
function seqFor(items,n){var tot=items.reduce(function(t,x){return t+x.w;},0),cnt=items.map(function(x){return Math.max(1,Math.round(x.w/tot*n));}),sum=cnt.reduce(function(a,b){return a+b;},0);
 while(sum>n){var i=cnt.indexOf(Math.max.apply(null,cnt));if(cnt[i]<=1)break;cnt[i]--;sum--;}
 while(sum<n){var j=0;items.forEach(function(x,k){if(x.w/tot*n-cnt[k]>items[j].w/tot*n-cnt[j])j=k;});cnt[j]++;sum++;}
 var out=[],left=cnt.slice();for(var k=0;k<n;k++){var bi=0,bv=-1;left.forEach(function(c,i2){var v=c/(n-k)+(i2===k%items.length?.001:0);if(v>bv){bv=v;bi=i2;}});left[bi]--;out.push(items[bi].s);}return out;}
function rndGen(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
var W0=320,H0=200;
/* metallic lattice with a sea of free electrons */
function metalSvg(items,zin,cm){var cols=10,rows=6,R=13.5,dx=2*R+1.5,flat=[],pos=[],i,j,rnd=rndGen(7),s='';
 for(j=0;j<rows;j++)for(i=0;i<cols;i++)flat.push([i,j]);var seq=seqFor(items,flat.length);
 for(i=seq.length-1;i>0;i--){var k=Math.floor(rnd()*(i+1)),t=seq[i];seq[i]=seq[k];seq[k]=t;}
 flat.forEach(function(f,idx){pos.push({s:seq[idx],px:(W0-(cols-1)*dx-dx/2)/2+f[0]*dx+(f[1]%2)*dx/2,py:(H0-(rows-1)*dx*.866)/2+f[1]*dx*.866});});
 s+='<g>';for(i=0;i<40;i++)s+='<circle class="eb" r="1.8" cx="'+(12+rnd()*(W0-24)).toFixed(1)+'" cy="'+(12+rnd()*(H0-24)).toFixed(1)+'" style="animation-delay:-'+(rnd()*6).toFixed(1)+'s;animation-duration:'+(4+rnd()*4).toFixed(1)+'s"/>';s+='</g>';
 pos.forEach(function(p,idx){s+=atomSvg(p,12.5,zin(p.s),cm,Math.min(200+idx*7,700));});return s;}
/* ionic lattice; cat flag marks cations; groups[sym]=smiles key draws a polyatomic ion in the anion cell */
function ionicSvg(items,zin,cm,groups){var cols=8,rows=5,gx=38,gy=38,N=cols*rows,cat=items.filter(function(x){return x.cat;}),an=items.filter(function(x){return!x.cat;});
 if(!cat.length||!an.length){cat=[items[0]];an=items.slice(1).length?items.slice(1):[items[0]];}
 var tc=cat.reduce(function(t,x){return t+x.w;},0),ta=an.reduce(function(t,x){return t+x.w;},0),rC=tc/(tc+ta),seqC=seqFor(cat,Math.max(1,Math.round(N*rC))),seqA=seqFor(an,Math.max(1,N-seqC.length)),ci=0,ai=0,grid=[],kind=[],acc=0,placed=0,i,j,s='';
 for(j=0;j<rows;j++)for(i=0;i<cols;i++){acc+=rC;var isC=Math.floor(acc+1e-9)>placed;if(rC>=.42&&rC<=.58)isC=((i+j)%2===0);if(isC)placed++;kind.push(isC);}
 var ox=(W0-(cols-1)*gx)/2,oy=(H0-(rows-1)*gy)/2;
 for(j=0;j<rows;j++)for(i=0;i<cols;i++){var c=kind[j*cols+i];grid.push({s:c?seqC[ci++%seqC.length]:seqA[ai++%seqA.length],c:c,px:ox+i*gx,py:oy+j*gy,i:i,j:j});}
 s+='<g stroke="var(--ink)" stroke-opacity=".4" stroke-width="1.6" stroke-dasharray="2 3">';
 grid.forEach(function(p){[[1,0],[0,1]].forEach(function(d){var ii=p.i+d[0],jj=p.j+d[1];if(ii<cols&&jj<rows){var q=grid[jj*cols+ii];if(q.c!==p.c)s+='<line x1="'+p.px+'" y1="'+p.py+'" x2="'+q.px+'" y2="'+q.py+'"/>';}});});s+='</g>';
 grid.forEach(function(p,idx){var dl=Math.min(200+idx*9,760);
  if(!p.c&&groups&&groups[p.s]){var g=groups[p.s],pl=place(g.mol,p.px-17,p.py-17,34,34,3,0,15);s+=drawPlaced(pl,zin,cm,dl);}
  else s+=atomSvg({s:p.s,px:p.px,py:p.py,ch:p.c?1:-1},p.c?10:12,zin(p.s),cm,dl);});return s;}
/* honeycomb (graphite / diamond / SiC) */
function honeySvg(items,zin,cm){var L=25,hx=L*1.7320508,pts={},list=[],s='',cx0=3*hx+(3%2?hx/2:0),cy0=3*L*1.5;
 for(var r=-1;r<8;r++)for(var c=-1;c<8;c++){var cx=c*hx+(r%2?hx/2:0),cy=r*L*1.5;for(var k=0;k<6;k++){var an=(30+60*k)*Math.PI/180,x=cx+L*Math.cos(an)-cx0+W0/2,y=cy+L*Math.sin(an)-cy0+H0/2,key=Math.round(x)+','+Math.round(y);if(!pts[key]&&x>=16&&x<=W0-16&&y>=14&&y<=H0-14){pts[key]=1;list.push({px:x,py:y,t:k%2});}}}
 list.forEach(function(p){p.s=items.length>1?items[p.t].s:items[0].s;});
 s+='<g stroke="var(--ink)" stroke-opacity=".5" stroke-width="2.4" stroke-linecap="round">';
 list.forEach(function(p,a){for(var b=a+1;b<list.length;b++){var d=Math.hypot(p.px-list[b].px,p.py-list[b].py);if(d>L-2&&d<L+2)s+='<line x1="'+p.px.toFixed(1)+'" y1="'+p.py.toFixed(1)+'" x2="'+list[b].px.toFixed(1)+'" y2="'+list[b].py.toFixed(1)+'"/>';}});s+='</g>';
 list.forEach(function(p,i){s+=atomSvg(p,8,zin(p.s),cm,Math.min(200+i*6,760));});return s;}
/* SiO2-type network: X nodes on a square net, Y atoms bridging each bond */
function netSvg(items,zin,cm){var X=items[0].s,Y=items[1].s,gx=60,gy=48,ox=(W0-4*gx)/2,oy=(H0-3*gy)/2,nodes=[],br=[],s='<g stroke="var(--ink)" stroke-opacity=".5" stroke-width="2.4" stroke-linecap="round">',i,j;
 for(j=0;j<4;j++)for(i=0;i<5;i++){var p={s:X,px:ox+i*gx,py:oy+j*gy};nodes.push(p);if(i<4){s+='<line x1="'+p.px+'" y1="'+p.py+'" x2="'+(p.px+gx)+'" y2="'+p.py+'"/>';br.push({s:Y,px:p.px+gx/2,py:p.py});}if(j<3){s+='<line x1="'+p.px+'" y1="'+p.py+'" x2="'+p.px+'" y2="'+(p.py+gy)+'"/>';br.push({s:Y,px:p.px,py:p.py+gy/2});}}
 s+='</g>';nodes.forEach(function(p,k){s+=atomSvg(p,11,zin(p.s),cm,Math.min(200+k*10,700));});br.forEach(function(p,k){s+=atomSvg(p,8,zin(p.s),cm,Math.min(260+k*8,760));});return s;}
/* organic / polymer schematic chain from element weights */
function chainSvg(items,zin,cm,nC){var n=Math.max(3,Math.min(nC||7,8)),bw=2.4,sx=(W0-40)/(n-1),y0=H0/2,P=[],s='<g stroke="var(--ink)" stroke-opacity=".5" stroke-width="'+bw+'" stroke-linecap="round">',others=items.filter(function(x){return x.s!=='C'&&x.s!=='H';}),hasH=items.some(function(x){return x.s==='H';}),i;
 for(i=0;i<n;i++)P.push({s:'C',px:20+i*sx,py:y0+(i%2?18:-18)});
 for(i=0;i<n-1;i++)s+='<line x1="'+P[i].px+'" y1="'+P[i].py+'" x2="'+P[i+1].px+'" y2="'+P[i+1].py+'"/>';
 var subs=[],oi=0;P.forEach(function(p,k){var up=k%2?1:-1;if(others.length&&k%2===(oi%2)&&k>0&&k<n-1){var o=others[oi++%others.length];subs.push({s:o.s,px:p.px,py:p.py+up*34,r:9.5});s+='<line x1="'+p.px+'" y1="'+p.py+'" x2="'+p.px+'" y2="'+(p.py+up*34)+'"/>';}
  else if(hasH){subs.push({s:'H',px:p.px,py:p.py+up*28,r:6.5});s+='<line x1="'+p.px+'" y1="'+p.py+'" x2="'+p.px+'" y2="'+(p.py+up*28)+'"/>';}});
 s+='</g>';P.forEach(function(p,k){s+=atomSvg(p,10.5,zin('C'),cm,200+k*40);});subs.forEach(function(p,k){s+=atomSvg(p,p.r,zin(p.s),cm,300+k*30);});return s;}
/* gas / mixed particles: several small molecules in a field */
function fieldSvg(list,zinOf,cm){/* list: [{mol,n,zin?}] */
 var cols=4,rows=3,cw=W0/cols,ch=H0/rows,slots=[],i,j,rnd=rndGen(11),s='';for(j=0;j<rows;j++)for(i=0;i<cols;i++)slots.push([i,j]);
 var tot=list.reduce(function(t,x){return t+x.n;},0),seq=[];list.forEach(function(x,k){for(var q=0;q<x.n;q++)seq.push(k);});
 for(i=seq.length-1;i>0;i--){var k2=Math.floor(rnd()*(i+1)),t=seq[i];seq[i]=seq[k2];seq[k2]=t;}
 for(i=0;i<slots.length;i++){var it=list[seq[i%seq.length]],sl=slots[i];s+=drawPlaced(place(it.mol,sl[0]*cw+3,sl[1]*ch+3,cw-6,ch-6,8,rnd()*6.28,24),it.zin?function(){return it.zin;}:zinOf,cm,200+i*45);}return s;}
/* ===== choose the right bonding picture ===== */
var GROUPS=[['HCO3',/HCO3(?![a-z])/,'C'],['CO3',/CO3(?![a-z])/,'C'],['SO4',/SO4(?![a-z])/,'S'],['PO4',/PO4(?![a-z])/,'P'],['OH',/OH(?![a-z0-9])/,'H'],['NH4',/NH4(?![a-z])/,'N'],['ClO',/ClO(?![a-z0-9])/,'Cl']];
function itemsFrom(els,cmap,counts){return els.filter(function(s){return cmap[s];}).map(function(s){var c=cmap[s];return{s:s,w:counts&&counts[s]?counts[s]:(c.atomPct!==undefined?c.atomPct:c.pct/EL[s].mass),cat:isMetal(s)};});}
function wrap(inner,vb){return'<svg viewBox="0 0 '+W0+' '+(vb||H0)+'" role="img" aria-label="Atomic bonding structure">'+inner+'</svg>';}
function atomMol(sym){return{a:[{s:sym,x:0,y:0,ch:0}],b:[]};}
function ionMol(f){var p=parseFormula(f);if(!p)return null;var main=f.split(/[·.]/)[0],cnt=parseFormula(main).counts,metals=Object.keys(cnt).filter(isMetal),a=[],b=[],g=null;
 GROUPS.forEach(function(G){if(!g&&G[1].test(main)){g=G;}});
 var nCat=Math.min(2,metals.length?cnt[metals[0]]:1),k=0;
 metals.slice(0,1).forEach(function(m){for(var i=0;i<nCat;i++)a.push({s:m,x:-1.9+i*0,y:i*1.6-(nCat-1)*.8,ch:1});});
 if(g&&GRP[g[0]]){var gm=molFrom(GRP[g[0]]),off=a.length;gm.a.forEach(function(p){a.push({s:p.s,x:p.x*.8+1.2,y:p.y*.8,ch:p.ch});});gm.b.forEach(function(x){b.push([x[0]+off,x[1]+off,x[2]]);});
  if(!gm.a.length)return null;}
 else{var an=Object.keys(cnt).filter(function(s){return!isMetal(s);}),na=an.length?Math.min(2,cnt[an[0]]):0;for(var i=0;i<na;i++)a.push({s:an[0],x:1.2,y:i*1.6-(na-1)*.8,ch:-1});}
 return{a:a,b:b};}
function alkaneN(counts){var ks=Object.keys(counts);return ks.length===2&&counts.C&&counts.H===2*counts.C+2?counts.C:0;}
function compMol(f){var key=cf(f),p=parseFormula(f);if(!p)return null;if(SMI[key])return{mol:getMol(key,SMI[key])};
 var ks=Object.keys(p.counts);if(ks.length===1&&ks[0]==='C')return{mol:getMol('soot','C1=CC=CC=C1')};if(ks.length===1&&p.counts[ks[0]]===1)return{mol:atomMol(ks[0])};
 var n=alkaneN(p.counts);if(n)return{mol:getMol('alk'+n,new Array(n+1).join('C'),n>8)};
 if(ks.some(isMetal)&&ks.some(function(s){return!isMetal(s);})){var im=ionMol(f);if(im)return{mol:layoutKeep(im)};}
 var nC=Math.min(p.counts.C||5,6),smi=new Array(nC+1).join('C');if(p.counts.O>1)smi=smi.replace(/CC$/,'C(O)C(=O)');return{mol:getMol('sch'+f,smi,true),schem:true};}
function layoutKeep(m){return m;}
function elementStruct(sym,title,zf){var e=EL[sym],zin=zf||function(s){return s;},cm=state.model.cmap;
 if(e.cat==='ng')return{svg:fieldSvg([{mol:atomMol(sym),n:8}],zin,cm),note:'Noble-gas atoms are stable on their own, so they form no bonds and simply move around separately.'};
 if(isMetal(sym))return{svg:metalSvg([{s:sym,w:1}],zin,cm),note:'Metallic bonding: the atoms sit in a regular lattice and share a sea of free electrons (small moving dots), which is why metals conduct and bend.'};
 var di=SMI[cf(sym+'2')];if(DIATOMIC[sym]&&di)return{svg:fieldSvg([{mol:getMol(cf(sym+'2'),di),n:6}],zin,cm),note:'Two atoms share electrons in a covalent bond, forming a '+sym+'₂ molecule'+(sym==='N'?' (triple bond)':sym==='O'?' (double bond)':'')+'.'};
 if(sym==='S')return{svg:drawPlaced(place(getMol('S8','S1SSSSSSS1'),0,0,W0,H0,26,0,44),zin,cm,240),note:'Sulfur forms crown-shaped rings of eight atoms (S₈), held together by single covalent bonds.'};
 var dia=/diamond/i.test(title||'');
 return{svg:honeySvg([{s:sym,w:1}],zin,cm),note:sym==='C'?(dia?'Diamond: each carbon bonds to four others in a rigid 3-D network (flattened to hexagons here).':'Graphite-type network: each carbon bonds to three others in flat hexagonal layers.'):'Covalent network: each atom is bonded to its neighbours in one continuous structure (simplified 2-D view).'};}
function substanceStruct(r,m){var cmap=m.cmap,zin=function(s){return s;},cm=cmap,note,cnt=r.counts,key=cnt?canon(cnt):'';
 if(r.element)return elementStruct(r.element.sym,r.title);
 if(r.mixSrc){state.mixMode=true;var tot=r.mixSrc.reduce(function(t,x){return t+x[1];},0),list=[],schem=false;
  r.mixSrc.forEach(function(x,i){var cmol=compMol(x[0]);if(!cmol)return;if(cmol.schem)schem=true;list.push({mol:cmol.mol,n:Math.max(1,Math.round(x[1]/tot*12)),zin:'c'+i});});
  var svg=fieldSvg(list,zin,cm);state.mixMode=false;return{svg:svg,note:'Each little cluster is one particle of that component, with its real bonds (lines) drawn between the atoms. The components are mixed together, not joined by bonds.'+(schem?' A few large components are shown as simplified fragments.':'')};}
 if(!r.formula||!cnt){var its=itemsFrom(Object.keys(cmap),cmap);return{svg:metalSvg(its,zin,cm),note:'Alloy: different metal atoms sit in one shared lattice, swapping places with each other and sharing a sea of free electrons (small moving dots).'};}
 var src=r.formula,main=src.split(/[·.]/)[0],hyd=main!==src,mc=hyd?parseFormula(main).counts:cnt,ks=Object.keys(mc),metals=ks.filter(isMetal),non=ks.filter(function(s){return!isMetal(s);});
 if(ks.length===1&&mc[ks[0]]===1)return elementStruct(ks[0],r.title);
 if(r.ikind==='polymer'&&POLY[key])return{svg:drawPlaced(place(getMol('p'+key,POLY[key]),0,0,W0,H0,24,0,42),zin,cm,240),note:'One repeating unit of the polymer. The dashed bonds show the chain continuing on both sides, repeated thousands of times.'};
 if(SMI[key])return{svg:drawPlaced(place(getMol(key,SMI[key]),0,0,W0,H0,24,0,46),zin,cm,240),note:'Atoms joined by covalent bonds: one line is a shared electron pair, two lines a double bond, three a triple bond.'};
 var n=alkaneN(cnt);if(n>=5)return{svg:drawPlaced(place(getMol('alk'+n,new Array(n+1).join('C'),n>8),0,0,W0,H0,16,0,32),zin,cm,240),note:'A straight chain of '+n+' carbon atoms joined by single bonds'+(n>8?'; the hydrogens (2 on each carbon, 3 at the ends) are left out for clarity.':'.')};
 if(cnt.C>=6&&cnt.H)return{svg:chainSvg(itemsFrom(ks,cmap,cnt),zin,cm,cnt.C),note:'Schematic only: this molecule is too large to draw atom by atom. The zigzag shows its carbon backbone with the other atoms attached to it.'};
 if(/^(SiO2)$/.test(main))return{svg:netSvg([{s:'Si'},{s:'O'}],zin,cm),note:'Covalent network: every silicon is bonded to four oxygens and every oxygen bridges two silicons, forming one giant rigid structure (simplified 2-D view).'};
 if(/^(SiC|BN|B4C)$/.test(main)){var it2=itemsFrom(ks,cmap,mc);return{svg:honeySvg(it2,zin,cm),note:'Covalent network: unlike atoms bonded in one continuous rigid structure (simplified view).'};}
 if(metals.length&&non.length){var groups={},inG={},items=[];
  GROUPS.forEach(function(G){if(G[1].test(main)&&GRP[G[0]]&&mc[G[2]]&&!(G[0]==='CO3'&&groups.HCO3)){groups[G[0]]={mol:getMol('g'+G[0],GRP[G[0]]),w:mc[G[2]]};Object.keys(parseFormula(G[0]).counts).forEach(function(e){inG[e]=1;});}});
  var used=Object.keys(groups).length>0;
  metals.forEach(function(s){items.push({s:s,w:mc[s],cat:true});});
  Object.keys(groups).forEach(function(g){items.push({s:g,w:groups[g].w,cat:false});});
  non.forEach(function(s){if(!inG[s])items.push({s:s,w:mc[s],cat:false});});
  note='Ionic bonds (dashed): metal atoms hand electrons to the other atoms, so oppositely charged ions attract in a repeating lattice.'+(used?' The grouped atoms (such as CO₃, SO₄, PO₄, OH) are bonded covalently inside each ion.':'')+(hyd?' Water of crystallisation sits between the layers (not drawn).':'')+((!used&&ks.length>3)?' Simplified view of a complex mineral.':'');
  return{svg:ionicSvg(items,zin,cm,groups),note:note};}
 return{svg:honeySvg(itemsFrom(ks,cmap,mc),zin,cm),note:'Covalent bonding: atoms joined by shared electron pairs (simplified view).'};}
function zoneStruct(z,m){var cmap=m.cmap,els=z.els.filter(function(s){return cmap[s];});if(!els.length)return null;var zin=function(){return z.id;},cm=cmap,all=itemsFrom(els,cmap);
 if(els.length===1){var one=elementStruct(els[0],z.name,zin);return{parts:[{t:'',svg:one.svg,note:one.note}]};}
 var tot=all.reduce(function(t,x){return t+x.w;},0),keep=all.filter(function(x){return x.w/tot>=.02;}),dropped=all.filter(function(x){return x.w/tot<.02;});if(keep.length<2&&all.length>1){keep=all.slice().sort(function(a,b){return b.w-a.w;}).slice(0,2);dropped=all.filter(function(x){return keep.indexOf(x)<0;});}
 var syms=keep.map(function(x){return x.s;}),hasC=syms.indexOf('C')>=0,hasSi=syms.indexOf('Si')>=0,metals=keep.filter(function(x){return isMetal(x.s);}),org=[],si=[],oth=[];
 keep.forEach(function(x){if(isMetal(x.s))return;if(x.s==='Si'){si.push(x);return;}if(hasC)org.push(x);else if(hasSi&&x.s==='O')si.push(x);else oth.push(x);});
 var parts=[];
 if(org.length){var onlyC=org.length===1&&org[0].s==='C';parts.push({t:'Plastic / organic material',svg:onlyC?honeySvg(org,zin,cm):chainSvg(org,zin,cm,7),note:onlyC?'Graphite-type carbon: flat hexagonal layers of bonded carbon atoms.':'A carbon backbone with other atoms attached: plastics, resins, wood, rubber and fabrics are built from long chains like this (schematic).'});}
 if(metals.length){parts.push({t:'Metal parts',svg:metalSvg(metals,zin,cm),note:'Metallic bonding: atoms in a lattice sharing a sea of free electrons (small moving dots).'});}
 if(si.length){var sO=si.some(function(x){return x.s==='O';});parts.push({t:'Glass & silicon',svg:sO?netSvg([{s:'Si'},{s:'O'}],zin,cm):honeySvg(si,zin,cm),note:sO?'Silicon–oxygen covalent network (glass, rock, ceramic).':'Silicon: every atom bonded to its neighbours in one rigid network.'});}
 if(oth.length){var im=metals.length?ionicSvg(keep.map(function(x){return{s:x.s,w:x.w,cat:isMetal(x.s)};}),zin,cm):honeySvg(oth,zin,cm);parts=metals.length?[{t:'',svg:im,note:'Ionic bonds (dashed): metal atoms hand electrons to the other atoms, giving a lattice of attracting ions.'}]:parts.concat([{t:'Other covalent material',svg:im,note:'Atoms joined by shared electron pairs (simplified view).'}]);}
 if(dropped.length&&parts.length)parts[parts.length-1].note+=' Trace '+dropped.map(function(x){return x.s;}).join(', ')+' not drawn.';
 if(parts.length===1)parts[0].t='';
 return{parts:parts};}
/* ===== element profile: mass, structure, particles, isotopes ===== */
var ISO_RAW=[
'H|1|1:99.985,2:0.015|Tritium (³H, 12.3-year half-life) is radioactive. Deuterium (²H) is "heavy hydrogen" and has one neutron.',
'He|4|3:0.0002,4:99.9998|Helium-4 is an alpha particle when stripped of its electrons: 2 protons + 2 neutrons, extraordinarily stable.',
'Li|7|6:7.59,7:92.41|',
'Be|9|9:100|Beryllium-10 (1.4 million years) is made by cosmic rays and used to date rocks.',
'B|11|10:19.9,11:80.1|Boron-10 absorbs neutrons very well, so it is used in nuclear control rods.',
'C|12|12:98.93,13:1.07|Carbon-14 (5,730-year half-life) is radioactive and used for radiocarbon dating.',
'N|14|14:99.636,15:0.364|',
'O|16|16:99.757,17:0.038,18:0.205|',
'F|19|19:100|Fluorine has only one stable isotope, so every natural fluorine atom is identical.',
'Ne|20|20:90.48,21:0.27,22:9.25|',
'Na|23|23:100|Sodium-22 (2.6 years) is a positron emitter used in medical scanning research.',
'Mg|24|24:78.99,25:10.00,26:11.01|',
'Al|27|27:100|',
'Si|28|28:92.223,29:4.685,30:3.092|',
'P|31|31:100|Phosphorus-32 (14 days) is a beta emitter used as a biological tracer.',
'S|32|32:94.99,33:0.75,34:4.25,36:0.01|',
'Cl|35|35:75.76,37:24.24|This mix is why chlorine’s atomic mass (35.45) is not a whole number.',
'Ar|40|36:0.337,38:0.063,40:99.600|Argon-40 is made when potassium-40 decays, so most air argon is the product of radioactivity.',
'K|39|39:93.258,40:0.0117,41:6.730|Potassium-40 is slightly radioactive (1.25 billion-year half-life). It is the main reason bananas and your own body are faintly radioactive.',
'Ca|40|40:96.941,42:0.647,43:0.135,44:2.086,46:0.004,48:0.187|',
'Sc|45|45:100|',
'Ti|48|46:8.25,47:7.44,48:73.72,49:5.41,50:5.18|',
'V|51|50:0.250,51:99.750|',
'Cr|52|50:4.345,52:83.789,53:9.501,54:2.365|',
'Mn|55|55:100|',
'Fe|56|54:5.845,56:91.754,57:2.119,58:0.282|Iron-56 is among the most tightly bound nuclei, which is why fusion in stars stops at iron.',
'Co|59|59:100|Cobalt-60 (5.3 years) is a strong gamma source used in cancer radiotherapy and sterilising equipment.',
'Ni|58|58:68.077,60:26.223,61:1.140,62:3.635,64:0.926|Nickel-62 has the highest binding energy per nucleon of any nucleus.',
'Cu|63|63:69.15,65:30.85|',
'Zn|64|64:49.17,66:27.73,67:4.04,68:18.45,70:0.61|',
'Ga|69|69:60.108,71:39.892|',
'Ge|74|70:20.57,72:27.45,73:7.75,74:36.50,76:7.73|',
'As|75|75:100|',
'Se|80|74:0.89,76:9.37,77:7.63,78:23.77,80:49.61,82:8.73|',
'Br|79|79:50.69,81:49.31|',
'Kr|84|78:0.355,80:2.286,82:11.593,83:11.500,84:56.987,86:17.279|',
'Rb|85|85:72.17,87:27.83|Rubidium-87 is weakly radioactive (49 billion years) and is used in rock dating.',
'Sr|88|84:0.56,86:9.86,87:7.00,88:82.58|Strontium-90 (28.8 years) is a dangerous fission product that mimics calcium in bone.',
'Y|89|89:100|',
'Zr|90|90:51.45,91:11.22,92:17.15,94:17.38,96:2.80|',
'Nb|93|93:100|',
'Mo|98|92:14.53,94:9.15,95:15.84,96:16.67,97:9.60,98:24.39,100:9.82|Molybdenum-99 decays into technetium-99m, the most used medical imaging isotope.',
'Tc|98||No stable isotopes at all. The longest-lived, Tc-98, lasts about 4.2 million years. Tc-99m (6 hours) is the workhorse of medical imaging.',
'Ru|102|96:5.54,98:1.87,99:12.76,100:12.60,101:17.06,102:31.55,104:18.62|',
'Rh|103|103:100|',
'Pd|106|102:1.02,104:11.14,105:22.33,106:27.33,108:26.46,110:11.72|',
'Ag|107|107:51.839,109:48.161|',
'Cd|114|106:1.25,108:0.89,110:12.49,111:12.80,112:24.13,113:12.22,114:28.73,116:7.49|Cadmium-113 is an extremely strong neutron absorber.',
'In|115|113:4.29,115:95.71|Indium-115 is very slightly radioactive, but its half-life is about 440 trillion years.',
'Sn|120|112:0.97,114:0.66,115:0.34,116:14.54,117:7.68,118:24.22,119:8.59,120:32.58,122:4.63,124:5.79|Tin has 10 stable isotopes, the most of any element, helped by its “magic number” of 50 protons.',
'Sb|121|121:57.21,123:42.79|',
'Te|130|120:0.09,122:2.55,123:0.89,124:4.74,125:7.07,126:18.84,128:31.74,130:34.08|',
'I|127|127:100|Iodine-131 (8 days) is used to treat thyroid disease and is a fission product.',
'Xe|132|126:0.09,128:1.92,129:26.44,130:4.08,131:21.18,132:26.89,134:10.44,136:8.87|',
'Cs|133|133:100|Caesium-137 (30 years) is a fission product; caesium-133 defines the length of a second in atomic clocks.',
'Ba|138|130:0.106,132:0.101,134:2.417,135:6.592,136:7.854,137:11.232,138:71.698|',
'La|139|138:0.09,139:99.91|',
'Ce|140|136:0.185,138:0.251,140:88.45,142:11.114|',
'Pr|141|141:100|',
'Nd|142|142:27.2,143:12.2,144:23.8,145:8.3,146:17.2,148:5.7,150:5.6|',
'Pm|145||No stable isotopes. The longest-lived, Pm-145, has a 17.7-year half-life. Essentially none exists in nature.',
'Sm|152|144:3.07,147:14.99,148:11.24,149:13.82,150:7.38,152:26.75,154:22.75|',
'Eu|153|151:47.81,153:52.19|',
'Gd|158|152:0.20,154:2.18,155:14.80,156:20.47,157:15.65,158:24.84,160:21.86|Gadolinium-157 has the largest neutron-capture ability of any stable isotope.',
'Tb|159|159:100|',
'Dy|164|156:0.056,158:0.095,160:2.329,161:18.889,162:25.475,163:24.896,164:28.260|',
'Ho|165|165:100|',
'Er|166|162:0.139,164:1.601,166:33.503,167:22.869,168:26.978,170:14.910|',
'Tm|169|169:100|',
'Yb|174|168:0.123,170:2.982,171:14.09,172:21.68,173:16.103,174:32.026,176:12.996|',
'Lu|175|175:97.401,176:2.599|',
'Hf|180|174:0.16,176:5.26,177:18.60,178:27.28,179:13.62,180:35.08|',
'Ta|181|181:99.988|A very rare isomer, tantalum-180m (0.012%), is the only naturally occurring nuclear isomer.',
'W|184|180:0.12,182:26.50,183:14.31,184:30.64,186:28.43|',
'Re|187|185:37.40,187:62.60|Rhenium-187 is mildly radioactive (about 41 billion years).',
'Os|192|184:0.02,186:1.59,187:1.96,188:13.24,189:16.15,190:26.26,192:40.78|',
'Ir|193|191:37.3,193:62.7|',
'Pt|195|190:0.012,192:0.782,194:32.86,195:33.78,196:25.21,198:7.36|',
'Au|197|197:100|Gold has a single stable isotope, so all natural gold atoms are identical. It was forged in neutron-star collisions.',
'Hg|202|196:0.15,198:9.97,199:16.87,200:23.10,201:13.18,202:29.86,204:6.87|',
'Tl|205|203:29.52,205:70.48|',
'Pb|208|204:1.4,206:24.1,207:22.1,208:52.4|Lead-206, 207 and 208 are the end products of the uranium and thorium decay chains. Lead-208 has a doubly magic nucleus.',
'Bi|209|209:100|Bismuth-209 is radioactive in theory, but its half-life (about 20 billion billion years) is longer than the age of the universe.',
'Po|209||No stable isotopes. Polonium-209 lasts about 125 years; polonium-210 (138 days) is intensely radioactive.',
'At|210||The rarest natural element: no stable isotopes, and the longest-lived (At-210) lasts only 8.1 hours.',
'Rn|222||Radon-222 (3.8 days) is a radioactive gas that seeps from rock and soil as uranium decays.',
'Fr|223||Francium-223 lasts only 22 minutes. Almost none exists at any one time.',
'Ra|226||Radium-226 (1,600 years) is a decay product of uranium and was once used in glow-in-the-dark paint.',
'Ac|227||Actinium-227 (21.8 years) is a decay product of uranium-235.',
'Th|232|232:100|Thorium-232 (14 billion-year half-life) is the only natural isotope in significant amounts.',
'Pa|231||Protactinium-231 lasts about 32,800 years and is found in uranium ores.',
'U|238|234:0.0054,235:0.7204,238:99.2742|Uranium-235 (0.72%) is the fissile isotope that fuels reactors; uranium-238 makes up almost everything else.',
'Np|237||Neptunium-237 (2.1 million years) is made in nuclear reactors.',
'Pu|244||The longest-lived is Pu-244 (80 million years). Plutonium-239 (24,100 years) is used in reactors and weapons.',
'Am|243||Americium-243 lasts about 7,400 years. Americium-241 (432 years) is the isotope inside smoke detectors.',
'Cm|247||Curium-247 lasts about 15.6 million years. Made only in reactors and accelerators.',
'Bk|247||Berkelium-247 lasts about 1,400 years. Made only in reactors and accelerators.',
'Cf|251||Californium-251 lasts about 900 years. Californium-252 is a strong neutron source.',
'Es|252||Einsteinium-252 lasts about 472 days. It was first found in the debris of a hydrogen-bomb test.',
'Fm|257||Fermium-257 lasts about 100 days.',
'Md|258||Mendelevium-258 lasts about 51 days. Made one atom at a time.',
'No|259||Nobelium-259 lasts about an hour.',
'Lr|266||Lawrencium-266 lasts about 11 hours.',
'Rf|267||Rutherfordium: the longest-lived known isotope lasts roughly an hour or two.',
'Db|268||Dubnium: the longest-lived known isotope lasts about a day at most.',
'Sg|269||Seaborgium: the longest-lived known isotopes last minutes.',
'Bh|270||Bohrium: the longest-lived known isotopes last about a minute.',
'Hs|270||Hassium: the longest-lived known isotopes last seconds.',
'Mt|278||Meitnerium: the longest-lived known isotopes last seconds.',
'Ds|281||Darmstadtium: the longest-lived known isotopes last seconds.',
'Rg|282||Roentgenium: the longest-lived known isotopes last minutes at most.',
'Cn|285||Copernicium: the longest-lived known isotopes last about half a minute.',
'Nh|286||Nihonium: the longest-lived known isotopes last about ten seconds.',
'Fl|289||Flerovium: the longest-lived known isotopes last a couple of seconds.',
'Mc|290||Moscovium: the longest-lived known isotopes last under a second.',
'Lv|293||Livermorium: the longest-lived known isotopes last tens of milliseconds.',
'Ts|294||Tennessine: the longest-lived known isotopes last tens of milliseconds.',
'Og|294||Oganesson: only a handful of atoms have ever been made, each lasting about a millisecond.'];
var ISO={};ISO_RAW.forEach(function(l){var a=l.split('|');ISO[a[0]]={a:+a[1],nat:a[2]?a[2].split(',').map(function(x){var q=x.split(':');return[+q[0],+q[1]];}):[],note:a[3]||''};});
var SUPD='⁰¹²³⁴⁵⁶⁷⁸⁹';function supN(n){return String(n).replace(/\d/g,function(d){return SUPD[+d];});}
var ORDER=[[1,0],[2,0],[2,1],[3,0],[3,1],[4,0],[3,2],[4,1],[5,0],[4,2],[5,1],[6,0],[4,3],[5,2],[6,1],[7,0],[5,3],[6,2],[7,1]],LL='spdf',CAPS=[2,6,10,14];
var EXC={24:{'4s':1,'3d':5},29:{'4s':1,'3d':10},41:{'5s':1,'4d':4},42:{'5s':1,'4d':5},44:{'5s':1,'4d':7},45:{'5s':1,'4d':8},46:{'5s':0,'4d':10},47:{'5s':1,'4d':10},57:{'4f':0,'5d':1},58:{'4f':1,'5d':1},64:{'4f':7,'5d':1},78:{'6s':1,'5d':9},79:{'6s':1,'5d':10},89:{'5f':0,'6d':1},90:{'5f':0,'6d':2},91:{'5f':2,'6d':1},92:{'5f':3,'6d':1},93:{'5f':4,'6d':1},96:{'5f':7,'6d':1},103:{'5f':14,'6d':0,'7p':1}};
function econf(z){var left=z,sh={};ORDER.forEach(function(o){var k=o[0]+LL[o[1]],c=Math.min(left,CAPS[o[1]]);sh[k]=c;left-=c;});
 if(EXC[z]){var d=EXC[z];Object.keys(d).forEach(function(k){sh[k]=d[k];});}return sh;}
var NOBLE=[[2,'He'],[10,'Ne'],[18,'Ar'],[36,'Kr'],[54,'Xe'],[86,'Rn']];
function confText(z){var sh=econf(z),core=null;NOBLE.forEach(function(n){if(n[0]<z)core=n;});
 var skip={};if(core){var cs=econf(core[0]);Object.keys(cs).forEach(function(k){if(cs[k]>0)skip[k]=1;});}
 var keys=Object.keys(sh).filter(function(k){return sh[k]>0&&!skip[k];}).sort(function(a,b){return(+a[0]-+b[0])||(LL.indexOf(a[1])-LL.indexOf(b[1]));});
 return(core?'['+core[1]+'] ':'')+keys.map(function(k){return k+supN(sh[k]);}).join(' ');}
function shells(z){var sh=econf(z),out=[];Object.keys(sh).forEach(function(k){var n=+k[0];out[n-1]=(out[n-1]||0)+sh[k];});return out.map(function(x){return x||0;}).filter(function(x){return x>0;});}
function bohrSvg(z,A,col){var N=A-z,sh=shells(z),n=sh.length,step=Math.min(17,(106-36)/Math.max(n,1)),s='<svg viewBox="0 0 240 240" role="img" aria-label="Bohr model">',i,k;
 var shown=Math.min(A,56),pShown=Math.max(1,Math.round(shown*z/A)),nr=Math.min(30,9+Math.sqrt(shown)*2.6);
 for(i=0;i<n;i++){var R=36+(i+.4)*step+ (n<4?10:0);s+='<circle cx="120" cy="120" r="'+R.toFixed(1)+'" fill="none" stroke="var(--line)" stroke-width="1.2"/>';}
 for(i=0;i<n;i++){var R2=36+(i+.4)*step+(n<4?10:0),c=sh[i],dur=(8+i*5)*(i%2?1:-1);
  s+='<g class="orb" style="animation-duration:'+Math.abs(dur)+'s;animation-direction:'+(dur<0?'reverse':'normal')+'">';
  for(k=0;k<c;k++){var a=k/c*Math.PI*2;s+='<circle cx="'+(120+R2*Math.cos(a)).toFixed(1)+'" cy="'+(120+R2*Math.sin(a)).toFixed(1)+'" r="'+(c>18?2.3:3.1)+'" fill="'+col+'"/>';}s+='</g>';}
 var order=[];for(i=0;i<shown;i++)order.push(i<pShown?'p':'n');var seed=5;for(i=order.length-1;i>0;i--){seed=(seed*1664525+1013904223)>>>0;var j=Math.floor(seed/4294967296*(i+1)),t=order[i];order[i]=order[j];order[j]=t;}
 s+='<circle cx="120" cy="120" r="'+(nr+2).toFixed(1)+'" fill="var(--soft)"/>';
 for(i=0;i<shown;i++){var rr=nr*Math.sqrt((i+.5)/shown)*.92,an=i*2.39996;s+='<circle cx="'+(120+rr*Math.cos(an)).toFixed(1)+'" cy="'+(120+rr*Math.sin(an)).toFixed(1)+'" r="'+(shown>20?3.1:4.2)+'" fill="'+(order[i]==='p'?'#ef6b6b':'#8b93a7')+'"/>';}
 return s+'</svg>';}
function quarkSvg(kind){var q=kind==='p'?[['u','#ef6b6b'],['u','#ef6b6b'],['d','#3b6ef5']]:kind==='n'?[['u','#ef6b6b'],['d','#3b6ef5'],['d','#3b6ef5']]:null,s='<svg viewBox="0 0 90 70" role="img">';
 if(!q)return s+'<circle cx="45" cy="35" r="14" fill="#f59e0b"/><text x="45" y="35" dy=".35em" text-anchor="middle" font-size="11" font-weight="700" fill="#10142a">e⁻</text></svg>';
 var P=[[45,15],[22,52],[68,52]];s+='<g stroke="var(--mute)" stroke-width="1.6" stroke-dasharray="2 3" opacity=".7"><line x1="45" y1="15" x2="22" y2="52"/><line x1="45" y1="15" x2="68" y2="52"/><line x1="22" y1="52" x2="68" y2="52"/></g>';
 q.forEach(function(x,i){s+='<circle cx="'+P[i][0]+'" cy="'+P[i][1]+'" r="11" fill="'+x[1]+'"/><text x="'+P[i][0]+'" y="'+P[i][1]+'" dy=".35em" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">'+x[0]+'</text>';});return s+'</svg>';}
/* ===== Subatomic particle page ===== */
var PREF=[['Hydrogen-1',1,0],['Helium-4',2,2],['Carbon-12',6,6],['Iron-56',26,30],['Gold-197',79,118],['Uranium-238',92,146]];
var CNT={p:{n:'protons',f:function(z,n){return z;},eq:'protons = atomic number (Z)'},n:{n:'neutrons',f:function(z,n){return n;},eq:'neutrons = mass number − Z'},e:{n:'electrons',f:function(z,n){return z;},eq:'electrons = protons in a neutral atom'},u:{n:'up quarks',f:function(z,n){return 2*z+n;},eq:'up quarks = 2 × protons + neutrons'},d:{n:'down quarks',f:function(z,n){return z+2*n;},eq:'down quarks = protons + 2 × neutrons'}};
function wig(x1,y1,x2,y2,amp,n,col,w,op,tn){var dx=x2-x1,dy=y2-y1,L=Math.sqrt(dx*dx+dy*dy),nx=-dy/L,ny=dx/L,d='M'+x1.toFixed(1)+' '+y1.toFixed(1),i,t,o;for(i=1;i<=n*4;i++){t=i/(n*4);o=Math.sin(t*n*2*Math.PI)*amp*Math.min(1,t*6,(1-t)*6);d+=' L'+(x1+dx*t+nx*o).toFixed(1)+' '+(y1+dy*t+ny*o).toFixed(1);}var pa='<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" opacity="'+(op==null?1:op)+'"/>';return tn?pkw(tn,'<path d="'+d+'" fill="none" stroke="transparent" stroke-width="18" pointer-events="stroke"/>'+pa):pa;}
function pkw(tn,inner){return'<g class="pk" data-try="'+tn+'" role="button" tabindex="0" aria-label="Open '+tn+'">'+inner+'</g>';}
function ptAtomSvg(hl){
 var cx=130,cy=100,P='#ef6b6b',N='#8b93a7',E='#f59e0b',s='<svg viewBox="0 0 260 205" role="img" aria-label="Where it sits in an atom">',k=1.55,r=8.5,i;
 var nuc=[[0,0,'p'],[9,-8,'n'],[-9,-7,'p'],[10,8,'n'],[-8,9,'p'],[0,-15,'n'],[1,16,'p'],[-16,1,'n'],[17,-1,'p']];
 if(hl==='alpha'){nuc=[[-8,-8,'p'],[8,-8,'n'],[-8,8,'n'],[8,8,'p']];k=3.2;r=14;}
 if(hl==='deut'){nuc=[[-9,0,'p'],[9,0,'n']];k=3.6;r=16;}
 var big=(hl==='alpha'||hl==='deut');
 if(!big){s+='<circle cx="'+cx+'" cy="'+cy+'" r="45" fill="none" stroke="var(--line)" stroke-width="1.6"/><circle cx="'+cx+'" cy="'+cy+'" r="80" fill="none" stroke="var(--line)" stroke-width="1.6"/>';
  [[45,-35],[45,145],[80,15],[80,135],[80,255]].forEach(function(e){var a=e[1]*Math.PI/180,x=cx+e[0]*Math.cos(a),y=cy+e[0]*Math.sin(a),on=hl==='cloud'||hl==='e';
   s+=pkw('Electron','<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="15" fill="transparent"/>'+(on?'<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="12" fill="'+E+'" opacity=".22"/>':'')+'<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="6.5" fill="'+E+'" opacity="'+(on||hl==='ph'?1:.35)+'"/>');});}
 var kk=big?k:k,show=hl==='p'||hl==='n'||hl==='nucleus'||big;
 if(!big)s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(show?31:26)+'" fill="'+(show?'var(--soft)':'none')+'" stroke="'+(show?'var(--accent)':'var(--line)')+'" stroke-width="'+(show?1.6:1)+'" stroke-dasharray="'+(show?'3 3':'0')+'"/>';
 nuc.forEach(function(q){var x=cx+q[0]*(big?k:1.15),y=cy+q[1]*(big?k:1.15),on=big||hl==='nucleus'||(hl==='p'&&q[2]==='p')||(hl==='n'&&q[2]==='n'),c=q[2]==='p'?P:N;
  s+=pkw(q[2]==='p'?'Proton':'Neutron','<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(big?r:8.2)+'" fill="'+c+'" stroke="var(--card)" stroke-width="1.5" opacity="'+(on||hl==='cloud'&&0?1:(hl==='cloud'||hl==='e'||hl==='ph'?.55:.25))+'"/>'+(big?'<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" dy=".35em" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" pointer-events="none">'+(q[2]==='p'?'p':'n')+'</text>':''));});
 if(hl==='ph'){var a1=-35*Math.PI/180,ex=cx+80*Math.cos(a1),ey=cy+80*Math.sin(a1),ix=cx+45*Math.cos(a1+.5),iy=cy+45*Math.sin(a1+.5);
  s+='<circle cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" r="6.5" fill="none" stroke="'+E+'" stroke-dasharray="2 2"/>'+wig(ix,iy,ix+70,iy-62,5,5,'#d97706',2.4,1,'Photon')+'<path d="M'+(ix+70)+' '+(iy-62)+' l-9 2 m9 -2 l-1 9" stroke="#d97706" stroke-width="2.4" fill="none" stroke-linecap="round"/>';}
 var lab={cloud:'Electrons orbit outside the nucleus',e:'Electrons orbit outside the nucleus',p:'Protons sit in the nucleus (not to scale)',n:'Neutrons sit in the nucleus (not to scale)',nucleus:'Protons and neutrons make up the nucleus',alpha:'Alpha particle: 2 protons + 2 neutrons',deut:'Deuteron = 1 proton + 1 neutron',ph:'An electron drops a level and releases a photon'}[hl]||'';
 return s+'<text x="130" y="200" text-anchor="middle" font-size="10.5" fill="var(--mute)">'+lab+'</text></svg>';}
function quarkZoomSvg(hl){
 var s='<svg viewBox="0 0 260 205" role="img" aria-label="Inside a proton">'+pkw('Proton','<circle cx="130" cy="95" r="82" fill="var(--soft)" stroke="var(--line)" stroke-width="1.6"/>'),U='#ef6b6b',D='#3b6ef5',G='#8b5cf6';
 var Q=[[130,48,'u',U],[88,122,'u',U],[172,122,'d',D]],gOn=hl==='gl',i,j;
 for(i=0;i<3;i++)for(j=i+1;j<3;j++)s+=wig(Q[i][0],Q[i][1],Q[j][0],Q[j][1],4.5,6,G,2.2,gOn?1:.35,'Gluon');
 Q.forEach(function(q){var on=gOn?false:(hl==='qu'?q[2]==='u':hl==='qd'?q[2]==='d':true),c=q[3];
  s+=pkw(q[2]==='u'?'Up quark':'Down quark',(on&&(hl==='qu'||hl==='qd')?'<circle cx="'+q[0]+'" cy="'+q[1]+'" r="22" fill="'+c+'" opacity=".22"/>':'')+'<circle cx="'+q[0]+'" cy="'+q[1]+'" r="20" fill="transparent"/><circle cx="'+q[0]+'" cy="'+q[1]+'" r="15" fill="'+c+'" stroke="var(--card)" stroke-width="2" opacity="'+(on||gOn?1:.3)+'"/><text x="'+q[0]+'" y="'+q[1]+'" dy=".35em" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" opacity="'+(on||gOn?1:.5)+'" pointer-events="none">'+q[2]+'</text>');});
 return s+'<text x="130" y="200" text-anchor="middle" font-size="10.5" fill="var(--mute)">'+(gOn?'Gluons (purple) bind the three quarks inside a proton':'Inside a proton: up, up and down quarks')+'</text></svg>';}
function partSvg(t){if(!t)return'';if(t==='qu'||t==='qd'||t==='gl')return quarkZoomSvg(t);return ptAtomSvg(t);}
/* ===== Package API (added for My Apps; everything above is the original engine) ===== */
var state = { key: "pct", last: null, mixMode: false, model: null };
var THEME = { ink: "#eceef2", mute: "#9aa0ab", line: "#2a2d34", soft: "#23262c", card: "#1a1c21", accent: "#6c93ff" };

function structureSvg(m, r) {
  if (m.type === "bond") {
    var b = substanceStruct(r, m);
    m.note = b.note;
    return wrap(b.svg);
  }
  return m.type === "concentric" ? svgConc(m) : m.type === "stack" ? svgStack(m) : m.type === "phases" ? svgPhases(m) : svgField(m);
}

/** Sorts and colors the composition for a mode, builds the structure model and its main picture. */
function prepareResult(r, mode) {
  var key = mode === "atoms" && r.hasAtoms ? "atomPct" : "pct";
  state.last = r;
  state.key = key;
  state.mixMode = false;
  var k = 0;
  var comp = r.comp
    .slice()
    .sort(function (a, b) { return b[key] - a[key]; })
    .map(function (c) {
      var copy = {};
      for (var p in c) copy[p] = c[p];
      copy.color = c[key] >= 0.5 && k < PAL.length ? PAL[k++] : TRACE;
      return copy;
    });
  var m = buildModel(r, comp);
  m.zmap = {};
  m.zones.forEach(function (z) { m.zmap[z.id] = z; });
  state.model = m;
  var svg = structureSvg(m, r);
  return { key: key, comp: comp, model: m, svg: svg };
}

/** Atomic bonding pictures for one zone of a layered/concentric model. */
function zoneBonds(prepared, r, zoneId) {
  state.last = r;
  state.key = prepared.key;
  state.model = prepared.model;
  state.mixMode = false;
  var z = prepared.model.zmap[zoneId];
  var b = z && zoneStruct(z, prepared.model);
  if (!b) return [];
  return b.parts.map(function (p) { return { title: p.t || "", svg: wrap(p.svg, H0), note: p.note || "" }; });
}

function elementProfile(sym) {
  var e = EL[sym];
  if (!e) return null;
  var d = ISO[sym] || { a: Math.round(e.mass), nat: [], note: "" };
  var A = d.a, Z = e.z, N = A - Z, cat = CAT[e.cat], ps = pos(Z), fb = ps[0] >= 9;
  var sh = shells(Z);
  return {
    z: Z, sym: sym, name: e.name, mass: e.mass, category: cat.n, color: cat.c,
    state: elemState(e), info: elemInfo(e), massNumber: A, neutrons: N,
    group: fb ? "f-block" : String(ps[1]), period: fb ? ps[0] - 3 : ps[0],
    shells: sh, outer: sh[sh.length - 1], config: confText(Z), nobleGas: e.cat === "ng",
    upQuarks: A + Z, downQuarks: 2 * A - Z, stable: d.nat.length > 0,
    isotopes: d.nat.slice().sort(function (a, b) { return b[1] - a[1]; }).map(function (x) { return { mass: x[0], pct: x[1] }; }),
    isotopeNote: d.note || "",
    bohrSvg: bohrSvg(Z, A, cat.c),
    quarkSvgs: { p: quarkSvg("p"), n: quarkSvg("n"), e: quarkSvg("e") },
  };
}

function particleCounts(p) {
  var c = CNT[p.cnt];
  if (!c) return null;
  return { eq: c.eq, rows: PREF.map(function (a) { return { atom: a[0], value: c.f(a[1], a[2]).toLocaleString("en-US") + " " + c.n }; }) };
}

function particleSvg(p) { return p.svg ? partSvg(p.svg) : ""; }

function setTheme(t) { for (var k in t) THEME[k] = t[k]; }
function themeSvg(svg) { return svg.replace(/var\(--(\w+)\)/g, function (_, name) { return THEME[name] || "#888888"; }); }

var SUGGESTIONS = [
  ["Everyday things", ["Headphones", "Smartphone", "Laptop", "Car", "Banana", "Pizza", "Coffee", "Toothpaste", "Concrete", "Human body"]],
  ["Materials & chemicals", ["Stainless steel", "Granite", "Diamond", "Table salt", "Baking soda", "Sulfuric acid", "C6H12O6", "Seawater"]],
  ["Elements & particles", ["Gold", "Electron", "Proton", "Quark", "Neutrino", "Higgs boson", "Antimatter"]],
];

export {
  resolve, prepareResult, zoneBonds, elementProfile, particleCounts, particleSvg,
  setTheme, themeSvg, fmtPct, pctS, txtCol, subTxt, ELEMENTS, CAT, SUGGESTIONS, TRACE,
};
