// Editable vector prototypes and diagrams. Run: cd tools && npm ci && npm run design
const fs = require('node:fs');
const path = require('node:path');
const { Resvg } = require('@resvg/resvg-js');
const root = path.resolve(__dirname, '..');
const C = {bg:'#F5F7FB', ink:'#17233C', mute:'#66748C', blue:'#2563EB', pale:'#EDF3FF', line:'#DCE3EF', green:'#11795D', red:'#B63C49'};
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll('\n','&#xa;');
let parts=[], W=1440,H=1080;
function rect(x,y,w,h,fill='#FFFFFF',stroke=C.line,r=16){parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`);}
function text(x,y,s,size=18,color=C.ink,weight=400){parts.push(`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(s)}</text>`);}
function lines(x,y,arr,size=18,color=C.mute,gap=29){arr.forEach((s,i)=>text(x,y+i*gap,s,size,color));}
function pill(x,y,w,s,fill=C.pale,color=C.blue){rect(x,y,w,32,fill,fill,16);text(x+13,y+22,s,14,color,600);}
function button(x,y,w,s,solid=true){rect(x,y,w,48,solid?C.blue:'#FFFFFF',solid?C.blue:C.line,12);text(x+18,y+30,s,16,solid?'#FFFFFF':C.blue,600);}
function avatar(x,y,initials){parts.push(`<circle cx="${x+30}" cy="${y+30}" r="30" fill="#E0EAFE"/>`);text(x+12,y+39,initials,22,C.blue,700);}
function start(title,subtitle,{mobile=false}={}){
 W=mobile?390:1440;H=mobile?1120:1080;parts=[];rect(0,0,W,H,C.bg,C.bg,0);rect(0,0,W,84,'#FFFFFF','#FFFFFF',0);
 text(mobile?24:56,49,'TutorGo.kz',25,C.blue,800);
 if(!mobile){text(310,48,'Найти репетитора',16);text(545,48,'Мои занятия',16,C.mute);text(720,48,'Сообщения',16,C.mute);pill(1160,25,220,'UX prototype · sample data');}
 text(mobile?24:56,mobile?133:148,title,mobile?28:36,C.ink,750);
 text(mobile?24:56,mobile?168:185,subtitle,mobile?14:18,C.mute);
 text(mobile?24:56,H-30,'Учебный макет · все данные демонстрационные',mobile?12:15,C.mute);
}
function save(relative,description){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img"><title>${esc(description)}</title><desc>Design specification only. Sample data. Not an implemented application.</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#66748C"/></marker></defs><g font-family="Arial, sans-serif">${parts.join('')}</g></svg>`;
 const file=path.join(root,relative);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file+'.svg',svg);
 fs.writeFileSync(file+'.png',new Resvg(svg,{font:{loadSystemFonts:true,defaultFontFamily:'Arial'}}).render().asPng());
}

start('Найдите своего репетитора','Математика · подготовка к ЕНТ · онлайн');
rect(56,222,1328,82);text(80,253,'Предмет',13,C.mute);text(80,283,'Математика',18,C.ink,600);
text(350,253,'Бюджет за 60 минут',13,C.mute);text(350,283,'3 000–8 000 ₸',18,C.ink,600);
text(660,253,'Удобное время',13,C.mute);text(660,283,'После 16:00 · UTC+5',18,C.ink,600);button(1130,239,228,'Показать результаты');
pill(56,327,202,'Проверенные документы');pill(272,327,130,'Онлайн');text(1120,349,'По ближайшему времени',15,C.mute);
const tutors=[['АК','Айдана К.','Математика · ЕНТ','4,9 · 24 отзыва','6 000 ₸','24 октября · 16:00'],['ДА','Данияр А.','Математика · 7–11 класс','4,8 · 18 отзывов','5 000 ₸','24 октября · 18:00'],['МС','Мадина С.','Алгебра · геометрия','5,0 · 12 отзывов','7 000 ₸','25 октября · 18:00']];
tutors.forEach((t,i)=>{let y=385+i*194;rect(56,y,920,176);avatar(80,y+24,t[0]);text(160,y+43,t[1],23,C.ink,700);text(160,y+74,t[2],17,C.mute);text(160,y+105,t[3],16,C.mute);text(460,y+105,t[5],15,C.mute);pill(160,y+122,224,'Документы проверены','#E6F5EF',C.green);text(735,y+45,t[4],25,C.ink,700);text(735,y+72,'за 60 минут',14,C.mute);button(735,y+96,210,'Профиль и время');});
rect(1000,385,384,362);text(1024,426,'Как выбрать',23,C.ink,700);lines(1024,468,['Сравните предмет, опыт и цену.','Значок означает проверку','загруженных документов,','а не гарантию результата.','','Время показано в UTC+5.','Заявка ждёт ответа репетитора.'],17);
rect(1000,773,384,170,C.pale,C.pale);text(1024,813,'Если ничего не найдено',20,C.blue,650);lines(1024,848,['Расширьте бюджет или время.','Сброс фильтров сохраняет предмет.'],16);
save('prototype/01-search-results','Search results, filters, verification explanation and empty-state specification');

start('Профиль репетитора','Поиск → профиль → заявка → подтверждение и оплата');
rect(56,222,820,238);avatar(84,252,'АК');text(170,285,'Айдана К.',30,C.ink,700);text(170,319,'Математика · ЕНТ · опыт 6 лет',19,C.mute);pill(170,340,224,'Документы проверены','#E6F5EF',C.green);text(170,409,'4,9 · 24 отзыва после занятий',17,C.mute);
rect(56,484,820,224);text(84,525,'Об уроках',24,C.ink,700);lines(84,566,['Помогаю разобрать школьную программу и подготовиться к ЕНТ.','На первой встрече определим цель и составим план занятий.','Формат: онлайн, 60 минут. Язык: русский.','Образование и отзывы доступны в отдельных разделах.'],18);
rect(56,732,820,237);text(84,774,'Выберите свободное время',23,C.ink,700);text(84,806,'24 октября 2026 · UTC+5',17,C.mute);button(84,831,180,'16:00–17:00');button(282,831,180,'18:00–19:00',false);pill(84,902,290,'17:00–18:00 · уже занято','#F1F3F7',C.mute);
rect(904,222,480,562);text(932,269,'6 000 ₸',34,C.ink,750);text(932,302,'за 60 минут · онлайн',18,C.mute);text(932,352,'Выбрано',15,C.mute);text(932,385,'24 октября, 16:00–17:00',22,C.ink,650);lines(932,432,['1. Отправьте заявку на выбранный слот.','2. Дождитесь согласия репетитора.','3. Оплатите в тестовом режиме.','Бронь подтверждена после обоих шагов.'],17);button(932,565,424,'Отправить заявку');lines(932,652,['Слот занят? Покажем новые варианты.','Срок ответа и оплаты виден в заявке.','Повторный клик не создаёт вторую бронь.'],16);
rect(904,810,480,159,'#FFF5E7','#FFF5E7');text(932,851,'Заявка отправлена',21,'#8E570D',650);lines(932,887,['Статус: ожидает ответа репетитора.','Оплата станет доступна после согласия.'],16);
save('prototype/02-tutor-profile-booking','Tutor profile, available slots and request pending tutor acceptance');

start('Подтверждение и оплата','Репетитор принял заявку · платёжный режим Sandbox');
rect(56,222,806,453);pill(84,250,255,'Согласие репетитора получено','#E6F5EF',C.green);text(84,329,'Проверьте детали занятия',27,C.ink,700);lines(84,380,['Айдана К. · математика · подготовка к ЕНТ','24 октября 2026 · 16:00–17:00 · UTC+5','Онлайн · ссылка появится в подтверждённой брони'],19);text(84,508,'Способ оплаты',17,C.mute);rect(84,530,750,64,C.pale,C.pale);text(108,570,'Тестовая страница платёжного провайдера',20,C.blue,650);text(84,637,'Реквизиты карты вводятся у провайдера, а не в TutorGo.',16,C.mute);
rect(890,222,494,453);text(920,275,'К оплате',25,C.ink,700);text(920,334,'Занятие · 60 минут',19,C.mute);text(920,402,'6 000 ₸',42,C.ink,750);lines(920,453,['Демонстрационная сумма.','Реальные деньги не списываются.','До истечения срока: 14:32'],17);button(920,565,434,'Перейти к тестовой оплате');
rect(56,709,644,240,'#E6F5EF','#E6F5EF');text(84,756,'Успех: занятие подтверждено',24,C.green,700);lines(84,802,['Бронь TG-DEMO-104 · платёж выполнен','Оплата учтена один раз.','Открыть «Мои занятия» → ссылка на урок'],18);button(84,878,260,'Перейти к занятию');
rect(724,709,660,240,'#FCEDEF','#FCEDEF');text(752,756,'Платёж не прошёл',24,C.red,700);lines(752,802,['Покажем причину и актуальный статус брони.','Повторная попытка использует ту же заявку.','Поздний платёж после отмены: проверка / возврат.'],18);button(752,878,280,'Повторить попытку',false);
save('prototype/03-checkout','Sandbox checkout with tutor acceptance, success, failure and late-payment states');

start('Кабинет репетитора','Заявки, расписание и выплаты');
[['Заявки на ответ','2'],['Занятия на неделе','6'],['Ожидается к выплате','18 000 ₸']].forEach((t,i)=>{let x=56+i*449;rect(x,222,425,123);text(x+24,263,t[0],17,C.mute);text(x+24,316,t[1],32,C.ink,750);});
rect(56,369,840,355);text(84,414,'Новая заявка',25,C.ink,700);pill(692,391,172,'Ожидает ответа','#FFF1DA','#8E570D');text(84,462,'Ученик A · математика · ЕНТ',21,C.ink,650);lines(84,503,['24 октября · 16:00–17:00 · UTC+5','60 минут · 6 000 ₸ · онлайн','После согласия ученик сможет оплатить.'],18);button(84,625,256,'Принять заявку');button(364,625,256,'Отклонить с причиной',false);
rect(920,369,464,355);text(948,414,'Доступность',25,C.ink,700);lines(948,462,['Пт / Сб · 16:00–20:00','Часовой пояс: UTC+5','','Исключение: 25 октября — выходной','Занятые интервалы не доступны','для повторной записи.'],17);button(948,625,408,'Изменить расписание',false);
rect(56,748,1328,235);text(84,792,'Ближайшее подтверждённое занятие',23,C.ink,700);text(84,839,'Ученик B · 23 октября · 18:00–19:00',20);pill(84,864,234,'Подтверждено и оплачено','#E6F5EF',C.green);button(1026,816,330,'Открыть внешний урок');text(84,946,'Выплата создаётся после завершённого оплаченного занятия; сумма и статус видны в истории.',17,C.mute);
save('prototype/04-tutor-dashboard','Tutor request acceptance, availability exceptions and payout states');

start('Проверка документов','Кабинет администратора · доступ только по роли');
rect(56,222,440,761);text(84,264,'Очередь проверки',24,C.ink,700);pill(84,287,145,'На проверке · 3');
[['Айдана К.','Диплом · ожидает проверки'],['Данияр А.','Сертификат · ожидает проверки'],['Мадина С.','Диплом · требуется уточнение']].forEach((t,i)=>{let y=351+i*130;rect(80,y,392,108,i===0?C.pale:'#FFFFFF',i===0?'#A5BFFF':C.line,12);text(102,y+38,t[0],21,C.ink,650);text(102,y+76,t[1],15,C.mute);});
rect(520,222,864,761);text(548,265,'Айдана К. · example-diploma.pdf',25,C.ink,700);pill(548,288,235,'Демонстрационный документ');rect(548,344,808,248,'#F5F7FB',C.line,12);text(580,391,'Предпросмотр защищённого файла',23,C.ink,650);lines(580,437,['В реальном приложении доступен только модератору.','Личные сведения в макете отсутствуют.','Проверяем соответствие имени, типа документа и предмета.','Файл открывается по временной защищённой ссылке.'],18);
text(548,637,'Комментарий к решению',18,C.ink,650);rect(548,660,808,95);text(572,700,'Например: загрузите читаемую копию документа.',17,C.mute);text(548,791,'При отклонении причина обязательна.',16,C.mute);button(548,823,250,'Одобрить документ');button(818,823,260,'Отклонить с причиной',false);lines(548,928,['После одобрения: значок «Документы проверены».','Решение сохраняется с датой и идентификатором администратора.'],17);
save('prototype/05-admin-verification','Admin verification queue, protected document preview and rejection reason');

start('Репетиторы','Математика · ЕНТ · онлайн',{mobile:true});
rect(24,198,342,140);text(44,232,'Бюджет · 3 000–8 000 ₸',17,C.ink,600);text(44,264,'После 16:00 · UTC+5',16,C.mute);button(44,282,302,'Изменить фильтры',false);pill(24,358,245,'Только проверенные документы');
rect(24,410,342,397);avatar(44,434,'АК');text(120,461,'Айдана К.',24,C.ink,700);text(120,490,'Математика · ЕНТ',15,C.mute);text(44,545,'4,9 · 24 отзыва',17,C.mute);pill(44,566,245,'Документы проверены','#E6F5EF',C.green);lines(44,638,['Ближайший слот:','24 октября · 16:00–17:00'],17);text(44,713,'6 000 ₸ / 60 минут',24,C.ink,700);button(44,738,302,'Профиль и время');
rect(24,833,342,186,C.pale,C.pale);text(44,873,'Нет подходящего времени?',20,C.blue,650);lines(44,910,['Расширьте время или бюджет.','Фильтры можно сбросить.','Заявка не означает оплату.'],16);
save('prototype/06-mobile-search','Mobile 390px search specification with vertical filters and tutor card');

// The same box positions generate editable draw.io sources and matching exports.
function diagram(name,title,nodes,edges,height=840){
 W=1400;H=height;parts=[];rect(0,0,W,H,'#FFFFFF','#FFFFFF',0);text(40,55,title,30,C.ink,700);
 const cells=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 if(name==='Use_Case_Diagram') {rect(290,90,850,865,'#FFFFFF',C.line,0);text(310,120,'TutorGo system boundary',16,C.mute);cells.push('<mxCell id="boundary" value="TutorGo system boundary" style="rounded=0;verticalAlign=top;fillColor=none;" vertex="1" parent="1"><mxGeometry x="290" y="90" width="850" height="865" as="geometry"/></mxCell>');}
 for(const n of nodes){
   if(n.shape==='ellipse')parts.push(`<ellipse cx="${n.x+n.w/2}" cy="${n.y+n.h/2}" rx="${n.w/2}" ry="${n.h/2}" fill="${C.pale}" stroke="${C.line}"/>`);
   else if(n.shape==='actor'){const cx=n.x+n.w/2;parts.push(`<g stroke="${C.mute}" stroke-width="2" fill="none"><circle cx="${cx}" cy="${n.y+20}" r="14"/><path d="M${cx},${n.y+34} v42 m-32,-22 h64 M${cx},${n.y+76} l-28,30 m28,-30 l28,30"/></g>`);}
   else rect(n.x,n.y,n.w,n.h,n.fill||C.pale,C.line,14);
   const yy=n.shape==='actor'?n.y+125:n.y+n.h/2-(n.label.length-1)*14;
   n.label.forEach((v,i)=>text(n.x+(n.shape==='ellipse'?28:16),yy+i*28+6,v,n.shape==='actor'?16:18,C.ink,i?400:650));
   const shape=n.shape==='actor'?'shape=umlActor;':n.shape==='ellipse'?'ellipse;':'rounded=1;';
   cells.push(`<mxCell id="${n.id}" value="${esc(n.label.join('\n'))}" style="${shape}whiteSpace=wrap;html=0;fontSize=16;fillColor=${n.fill||C.pale};strokeColor=${C.line};" vertex="1" parent="1"><mxGeometry x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" as="geometry"/></mxCell>`);
 }
 edges.forEach((e,i)=>{const a=nodes.find(n=>n.id===e.from),b=nodes.find(n=>n.id===e.to);const x1=a.shape==='actor'?a.x+a.w/2+32:a.x+a.w,y1=a.shape==='actor'?a.y+54:a.y+a.h/2,x2=b.shape==='actor'?b.x+b.w/2-32:b.x,y2=b.shape==='actor'?b.y+54:b.y+b.h/2;const via=e.via||(e.include?[[735,y1],[735,y2]]:[]);const d=`M${x1},${y1} `+via.map(p=>`L${p[0]},${p[1]}`).join(' ')+` L${x2},${y2}`;parts.push(`<path d="${d}" fill="none" stroke="${C.mute}" stroke-width="2" ${e.include?'stroke-dasharray="7 5"':''} ${e.association?'':'marker-end="url(#arrow)"'}/>`);if(e.label){const lx=e.include?742:(x1+x2)/2-45,ly=e.include?715:(y1+y2)/2-18;rect(lx-4,ly-16,e.label.length*7+8,22,'#FFFFFF','#FFFFFF',3);text(lx,ly,e.label,13,C.mute);}cells.push(`<mxCell id="e${i}" value="${esc(e.label||'')}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=0;labelBackgroundColor=#FFFFFF;endArrow=${e.association?'none':'block'};dashed=${e.include?1:0};" edge="1" parent="1" source="${e.from}" target="${e.to}"><mxGeometry relative="1" as="geometry"><Array as="points">${via.map(p=>`<mxPoint x="${p[0]}" y="${p[1]}"/>`).join('')}</Array></mxGeometry></mxCell>`);});
 text(40,H-30,'TutorGo · proposed MVP architecture · 20 October 2026',15,C.mute);
 save('diagrams/exports/'+name+'.drawio',title);
 fs.writeFileSync(path.join(root,'diagrams',name+'.drawio'),`<mxfile host="app.diagrams.net"><diagram name="${esc(title)}"><mxGraphModel page="1" pageWidth="${W}" pageHeight="${H}"><root>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`);
}
diagram('System_Context_Diagram','TutorGo system context',[
 {id:'student',x:40,y:160,w:220,h:100,label:['Student / parent','Find, book and review']},
 {id:'tutor',x:40,y:360,w:220,h:100,label:['Tutor','Profile, slots, requests']},
 {id:'admin',x:40,y:560,w:220,h:100,label:['Administrator','Verify and moderate']},
 {id:'system',x:480,y:270,w:360,h:280,label:['TutorGo web platform','React frontend + proposed API','Availability and booking','Sandbox payments and reviews']},
 {id:'payment',x:1080,y:160,w:280,h:100,label:['Payment provider sandbox','Checkout + signed callbacks']},
 {id:'notify',x:1080,y:360,w:280,h:100,label:['Notification provider','Email / optional SMS']},
 {id:'video',x:1080,y:560,w:280,h:100,label:['External lesson provider','Tutor supplies meeting URL']}
],[{from:'student',to:'system'},{from:'tutor',to:'system'},{from:'admin',to:'system'},{from:'system',to:'payment',label:'Adapter'},{from:'system',to:'notify',label:'Events'},{from:'system',to:'video',label:'URL only'}]);
diagram('Component_Diagram','TutorGo component diagram — proposed modular monolith',[
 {id:'ui',x:30,y:305,w:220,h:150,label:['React SPA','Student, tutor, admin','HTTPS / JSON']},
 {id:'api',x:360,y:305,w:230,h:150,label:['NestJS API boundary','Auth and role guards','Input validation']},
 {id:'profiles',x:700,y:110,w:300,h:130,label:['Profiles and Catalog','Verification, subjects','Search and reviews']},
 {id:'booking',x:700,y:320,w:300,h:130,label:['Availability and Booking','Slots, holds, acceptance','Payment orchestration']},
 {id:'events',x:700,y:530,w:300,h:130,label:['Messaging and Events','Booking participants','Notifications / payouts']},
 {id:'db',x:1120,y:110,w:250,h:130,label:['PostgreSQL','Relations, constraints','Transactions']},
 {id:'files',x:1120,y:320,w:250,h:130,label:['Private file storage','Protected documents','Access-controlled URLs']},
 {id:'provider',x:1120,y:530,w:250,h:130,label:['Provider adapters','Sandbox payment','Email, external lesson URL']}
],[{from:'ui',to:'api',label:'REST'},{from:'api',to:'profiles'},{from:'api',to:'booking'},{from:'api',to:'events'},{from:'profiles',to:'db'},{from:'profiles',to:'files'},{from:'booking',to:'db'},{from:'booking',to:'provider'},{from:'events',to:'db'},{from:'events',to:'provider'}]);
diagram('Use_Case_Diagram','TutorGo use cases — roles and booking stages',[
 {id:'student',shape:'actor',x:30,y:140,w:190,h:170,label:['Student / parent']},
 {id:'search',shape:'ellipse',x:330,y:145,w:370,h:100,label:['Search / view tutors','FR-04, FR-07, FR-18']},
 {id:'request',shape:'ellipse',x:330,y:300,w:370,h:100,label:['Request booking','FR-09']},
 {id:'pay',shape:'ellipse',x:780,y:145,w:320,h:100,label:['Pay accepted request','FR-11']},
 {id:'review',shape:'ellipse',x:780,y:300,w:320,h:100,label:['Review completed lesson','FR-12']},
 {id:'tutor',shape:'actor',x:30,y:470,w:190,h:170,label:['Tutor']},
 {id:'profile',shape:'ellipse',x:330,y:475,w:370,h:100,label:['Manage profile / availability','FR-04–06, FR-08']},
 {id:'accept',shape:'ellipse',x:330,y:630,w:370,h:100,label:['Accept / decline / complete','FR-10, FR-16']},
 {id:'shared',shape:'ellipse',x:780,y:475,w:320,h:130,label:['Cancel / message','Booking participants','FR-10, FR-14–15']},
 {id:'slot',shape:'ellipse',x:780,y:755,w:320,h:100,label:['Select available slot','FR-08–09']},
 {id:'admin',shape:'actor',x:30,y:775,w:190,h:170,label:['Administrator']},
 {id:'verify',shape:'ellipse',x:330,y:810,w:370,h:110,label:['Verify / moderate','FR-06, FR-17']},
 {id:'provider',shape:'actor',x:1180,y:140,w:190,h:170,label:['Payment provider']}
],[{from:'student',to:'search',association:true},{from:'student',to:'request',association:true},{from:'student',to:'pay',association:true,via:[[270,225],[270,135],[750,135],[750,195]]},{from:'student',to:'review',association:true,via:[[270,225],[270,275],[750,275],[750,350]]},{from:'pay',to:'provider',association:true},{from:'request',to:'slot',include:true,label:'<<include>>'},{from:'student',to:'shared',association:true,via:[[250,194],[250,425],[760,425],[760,540]]},{from:'tutor',to:'profile',association:true},{from:'tutor',to:'accept',association:true},{from:'tutor',to:'shared',association:true,via:[[270,555],[270,605],[750,605],[750,540]]},{from:'admin',to:'verify',association:true}],1020);
console.log('Generated 6 prototype SVG/PNG pairs and 3 draw.io diagrams with matching SVG/PNG exports.');
