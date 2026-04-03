// ═══════════════════════════════════════════════════════════
// Baby McGee Journal - Local Version
// Based on Google Script version but using localStorage
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════
var DUE = new Date('2026-09-04');
var MEDS = ['aspirin','prenatal','vitd','fishoil','lemonbalm','magnesium'];
var MED_NAMES = {aspirin:'Baby Aspirin',prenatal:'Thorne Prenatal',vitd:'Vitamin D3',fishoil:'Fish Oil',lemonbalm:'Lemon Balm',magnesium:'Magnesium'};
var STAR_LABELS = ['','Rough day','Okay','Feeling alright','Good day','Feeling great!'];

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
var offset = 0;
var dayData = null;
var monthData = {};
var transactions = [];
var questions = [];
var activeTab = 'today';
var saveTimer = null;

// ═══════════════════════════════════════════════════════════
// LOCAL STORAGE FUNCTIONS
// ═══════════════════════════════════════════════════════════
var LS_PREFIX = 'bmj_day_';

function lsKey(dateKey) { return LS_PREFIX + dateKey; }

function lsGet(dateKey) {
  try {
    var raw = localStorage.getItem(lsKey(dateKey));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
}

function lsPut(dateKey, data) {
  try {
    localStorage.setItem(lsKey(dateKey), JSON.stringify(data));
  } catch(e) {
    console.error('localStorage full:', e);
  }
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function renderStats() {
  var c = new Date(DUE); c.setDate(c.getDate()-280);
  var t = new Date(), diff = t - c;
  var w = Math.floor(diff/(7*24*3600*1000));
  var d = Math.floor((diff%(7*24*3600*1000))/(24*3600*1000));
  document.getElementById('stat-weeks').textContent = w+'w '+d+'d';
  document.getElementById('stat-days').textContent = Math.ceil((DUE-t)/(24*3600*1000));
  document.getElementById('stat-tri').textContent = w<13?'1st':w<27?'2nd':'3rd';
}

function toKey(o) { var d=new Date(); d.setDate(d.getDate()+o); return d.toISOString().slice(0,10); }
function toMonthKey(o) { var d=new Date(); d.setDate(d.getDate()+o); return d.toISOString().slice(0,7); }

function getDateLabel(o) {
  var d=new Date(); d.setDate(d.getDate()+o);
  if(o===0)return'Today · '+d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  if(o===-1)return'Yesterday · '+d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
}

function flashSave() {
  var b=document.getElementById('save-badge'); 
  if(b) {
    b.classList.add('show');
    setTimeout(function(){b.classList.remove('show');},1800);
  }
}

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════
function changeDay(dir) {
  if (dayData) {
    clearTimeout(saveTimer);
    collectDayData();
    commitSave();
  }

  if (dir === 0) offset = 0;
  else offset += dir;

  var dk = toKey(offset);
  dayData = lsGet(dk) || {};
  renderAll();
}

function jumpToDate(s) {
  if (!s) return;
  var t = new Date(); t.setHours(0,0,0,0);
  var newOffset = Math.round((new Date(s + 'T12:00:00') - t) / (24*3600*1000));
  var diff = newOffset - offset;
  changeDay(diff === 0 ? 0 : diff);
}

function showDatePicker() {
  var datePicker = document.getElementById('date-picker-today');
  if (datePicker) {
    datePicker.click();
  }
}

function showDatePickerBP() {
  var datePicker = document.getElementById('date-picker-bp');
  if (datePicker) {
    datePicker.click();
  }
}

// ═══════════════════════════════════════════════════════════
// RENDER ALL
// ═══════════════════════════════════════════════════════════
function renderAll() {
  if (!dayData) return;
  renderStats();

  // Date labels
  var dl = getDateLabel(offset);
  document.getElementById('date-label-today').textContent = dl;
  var bpLabel = document.getElementById('date-label-bp');
  if(bpLabel) bpLabel.textContent = dl;
  
  var dp = document.getElementById('date-picker-today'); 
  if(dp) dp.value = toKey(offset);
  
  var show = offset !== 0;
  var btnToday = document.getElementById('btn-today');
  if(btnToday) btnToday.style.display = show?'inline-block':'none';
  var btnTodayBp = document.getElementById('btn-today-bp');
  if(btnTodayBp) btnTodayBp.style.display = show?'inline-block':'none';

  // Medications
  MEDS.forEach(function(id) {
    applyMedState(id, dayData.meds ? dayData.meds[id] : undefined);
  });
  updateMedProgress();

  // Stars, Hypno
  updateStarUI(dayData.rating||0);
  updateHypnoUI(dayData.hypno||'');

  // Steps
  var stEl=document.getElementById('steps-input'); 
  if(stEl) stEl.value=dayData.steps||'';
  updateStepsUI(dayData.steps||'');

  // Notes
  var nEl=document.getElementById('notes-input');
  if(nEl) nEl.value=dayData.notes||'';

  // Meals
  renderMeals();

  // Week progress bars
  loadWeekProgress();
}

function renderMeals() {
  if(!dayData) return;
  
  var meals = dayData.meals || {
    breakfast: {foods: '', protein: '0'},
    lunch: {foods: '', protein: '0'},
    dinner: {foods: '', protein: '0'},
    snacks: {foods: '', protein: '0'}
  };
  
  // Breakfast
  var breakfastFoods = document.getElementById('breakfast-foods');
  var breakfastProtein = document.getElementById('breakfast-protein');
  if(breakfastFoods) breakfastFoods.value = meals.breakfast.foods || '';
  if(breakfastProtein) breakfastProtein.value = meals.breakfast.protein || '0';
  
  // Lunch
  var lunchFoods = document.getElementById('lunch-foods');
  var lunchProtein = document.getElementById('lunch-protein');
  if(lunchFoods) lunchFoods.value = meals.lunch.foods || '';
  if(lunchProtein) lunchProtein.value = meals.lunch.protein || '0';
  
  // Dinner
  var dinnerFoods = document.getElementById('dinner-foods');
  var dinnerProtein = document.getElementById('dinner-protein');
  if(dinnerFoods) dinnerFoods.value = meals.dinner.foods || '';
  if(dinnerProtein) dinnerProtein.value = meals.dinner.protein || '0';
  
  // Snacks
  var snacksFoods = document.getElementById('snacks-foods');
  var snacksProtein = document.getElementById('snacks-protein');
  if(snacksFoods) snacksFoods.value = meals.snacks.foods || '';
  if(snacksProtein) snacksProtein.value = meals.snacks.protein || '0';
  
  // Update total protein
  updateTotalProtein();
  
  // Update hydration
  var waterInput = document.getElementById('water-input');
  if(waterInput) waterInput.value = dayData.water || '';
  updateBuoyUI();
  updateHydrationDisplay();
  
  // Update exercise sessions
  renderExerciseSessions();
}

// ═══════════════════════════════════════════════════════════
// MEDICATION FUNCTIONS
// ═══════════════════════════════════════════════════════════
function applyMedState(id, state) {
  var row = document.getElementById('row-' + id);
  if (!row) return;
  row.classList.remove('checked', 'skipped');
  if (state === true) row.classList.add('checked');
  else if (state === 'skip') row.classList.add('skipped');
}

function updateMedProgress() {
  if (!dayData) return;
  var meds = dayData.meds || {};
  var taken   = MEDS.filter(function(id){ return meds[id] === true; }).length;
  var skipped = MEDS.filter(function(id){ return meds[id] === 'skip'; }).length;
  var logged  = taken + skipped;
  var pct = Math.round((taken / MEDS.length) * 100);
  var pl = document.getElementById('prog-label');
  var pf = document.getElementById('prog-fill');
  if (pl) {
    var parts = [];
    if (taken > 0)   parts.push(taken + ' taken');
    if (skipped > 0) parts.push(skipped + ' skipped');
    if (logged < MEDS.length) parts.push((MEDS.length - logged) + ' not logged');
    pl.textContent = parts.join(' · ') + ' (of ' + MEDS.length + ')';
  }
  if (pf) pf.style.width = pct + '%';
}

function toggleMed(id) {
  if (!dayData) return;
  if (!dayData.meds) dayData.meds = {};
  var cur = dayData.meds[id];
  if (cur === 'skip') {
    dayData.meds[id] = false;
  } else {
    dayData.meds[id] = !cur;
  }
  applyMedState(id, dayData.meds[id]);
  updateMedProgress();
  commitSave();
}

function skipMed(evt, id) {
  evt.stopPropagation();
  if (!dayData) return;
  if (!dayData.meds) dayData.meds = {};
  var cur = dayData.meds[id];
  if (cur === 'skip') {
    dayData.meds[id] = false;
  } else {
    dayData.meds[id] = 'skip';
  }
  applyMedState(id, dayData.meds[id]);
  updateMedProgress();
  commitSave();
}

// ═══════════════════════════════════════════════════════════
// UI UPDATE FUNCTIONS
// ═══════════════════════════════════════════════════════════
function updateStarUI(r) {
  for(var i=1;i<=5;i++){
    var s=document.getElementById('star-'+i);
    if(s) s.className='star'+(i<=r?' on':'');
  }
  var l=document.getElementById('star-label');
  if(l) l.textContent=r?STAR_LABELS[r]:'Tap to rate your day';
}

function updateHypnoUI(val) {
  var m={yes:'hyp-yes',no:'hyp-no',notstarted:'hyp-ns'};
  Object.keys(m).forEach(function(k){
    var e=document.getElementById(m[k]);
    if(!e)return;
    e.className='hyp-btn'+(k===val?' active-'+(k==='notstarted'?'ns':k):'');
  });
}

function updateStepsUI(val) {
  var s=parseInt(val)||0, pct=Math.min(100,Math.round((s/10000)*100));
  var d=document.getElementById('steps-display'); 
  if(d) d.textContent=s.toLocaleString();
  var b=document.getElementById('steps-bar'); 
  if(b) b.style.width=pct+'%';
  var l=document.getElementById('steps-pct-label'); 
  if(l) l.textContent=pct+'% of 10,000 goal';
}

function updateTotalProtein() {
  if(!dayData || !dayData.meals) return;
  
  var total = 0;
  var meals = dayData.meals;
  
  if(meals.breakfast && meals.breakfast.protein) total += parseInt(meals.breakfast.protein) || 0;
  if(meals.lunch && meals.lunch.protein) total += parseInt(meals.lunch.protein) || 0;
  if(meals.dinner && meals.dinner.protein) total += parseInt(meals.dinner.protein) || 0;
  if(meals.snacks && meals.snacks.protein) total += parseInt(meals.snacks.protein) || 0;
  
  var display = document.getElementById('total-protein-display');
  if(display) display.textContent = total + 'g';
  
  // Update the legacy protein field for compatibility
  dayData.protein = total.toString();
  
  // Update protein goal display
  updateProteinGoal(total);
}

function updateProteinGoal(total) {
  var goalDisplay = document.getElementById('protein-goal-display');
  var goalBar = document.getElementById('protein-goal-bar');
  var goalPct = document.getElementById('protein-goal-pct');
  
  if(goalDisplay) goalDisplay.textContent = total + 'g / 60g';
  
  var pct = Math.min(100, Math.round((total / 60) * 100));
  if(goalBar) goalBar.style.width = pct + '%';
  if(goalPct) goalPct.textContent = pct + '% of goal';
}

function addExerciseSession() {
  if(!dayData) return;
  
  var minutes = document.getElementById('exercise-minutes');
  var type = document.getElementById('exercise-type');
  
  if(!minutes.value || !type.value) {
    alert('Please enter both minutes and exercise type');
    return;
  }
  
  if(!dayData.exerciseSessions) dayData.exerciseSessions = [];
  
  var session = {
    id: 'ex_' + Date.now(),
    minutes: parseInt(minutes.value),
    type: type.value
  };
  
  dayData.exerciseSessions.push(session);
  
  // Clear inputs
  minutes.value = '';
  type.value = '';
  
  renderExerciseSessions();
  commitSave();
}

function renderExerciseSessions() {
  var sessions = dayData && dayData.exerciseSessions || [];
  var card = document.getElementById('exercise-sessions-card');
  var list = document.getElementById('exercise-sessions-list');
  
  if(!card || !list) return;
  
  if(sessions.length === 0) {
    card.style.display = 'none';
    return;
  }
  
  card.style.display = 'block';
  list.innerHTML = sessions.map(function(session, i) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(200,185,165,0.2)">' +
      '<span style="font-size:12px;color:#5c4a42">' + session.minutes + ' min ' + session.type + '</span>' +
      '<button onclick="removeExerciseSession(' + i + ')" style="background:none;border:none;color:#c46070;cursor:pointer;font-size:14px">&times;</button>' +
      '</div>';
  }).join('');
}

function removeExerciseSession(index) {
  if(!dayData || !dayData.exerciseSessions) return;
  dayData.exerciseSessions.splice(index, 1);
  renderExerciseSessions();
  commitSave();
}

function setBuoy(value) {
  if(!dayData) return;
  dayData.buoy = (dayData.buoy === value) ? '' : value;
  updateBuoyUI();
  updateHydrationDisplay();
  commitSave();
}

function updateBuoyUI() {
  var yesBtn = document.getElementById('buoy-yes');
  var noBtn = document.getElementById('buoy-no');
  
  if(yesBtn) yesBtn.className = 'hyp-btn' + (dayData.buoy === 'yes' ? ' active-yes' : '');
  if(noBtn) noBtn.className = 'hyp-btn' + (dayData.buoy === 'no' ? ' active-no' : '');
}

function updateHydrationDisplay() {
  var water = parseInt(dayData.water) || 0;
  var pct = Math.min(100, Math.round((water / 90) * 100));
  
  var summary = document.getElementById('hydration-summary');
  var bar = document.getElementById('hydration-bar');
  
  if(summary) summary.textContent = water + ' oz of 90 oz goal (' + pct + '%)';
  if(bar) bar.style.width = pct + '%';
}

// ═══════════════════════════════════════════════════════════
// USER ACTIONS
// ═══════════════════════════════════════════════════════════
function collectDayData() {
  if(!dayData) return;
  var st=document.getElementById('steps-input');
  if(st) dayData.steps=st.value;
  var n=document.getElementById('notes-input');
  if(n) dayData.notes=n.value;
  
  // Collect meal data
  if(!dayData.meals) dayData.meals = {};
  
  var breakfastFoods = document.getElementById('breakfast-foods');
  var breakfastProtein = document.getElementById('breakfast-protein');
  if(breakfastFoods && breakfastProtein) {
    dayData.meals.breakfast = {
      foods: breakfastFoods.value || '',
      protein: breakfastProtein.value || '0'
    };
  }
  
  var lunchFoods = document.getElementById('lunch-foods');
  var lunchProtein = document.getElementById('lunch-protein');
  if(lunchFoods && lunchProtein) {
    dayData.meals.lunch = {
      foods: lunchFoods.value || '',
      protein: lunchProtein.value || '0'
    };
  }
  
  var dinnerFoods = document.getElementById('dinner-foods');
  var dinnerProtein = document.getElementById('dinner-protein');
  if(dinnerFoods && dinnerProtein) {
    dayData.meals.dinner = {
      foods: dinnerFoods.value || '',
      protein: dinnerProtein.value || '0'
    };
  }
  
  var snacksFoods = document.getElementById('snacks-foods');
  var snacksProtein = document.getElementById('snacks-protein');
  if(snacksFoods && snacksProtein) {
    dayData.meals.snacks = {
      foods: snacksFoods.value || '',
      protein: snacksProtein.value || '0'
    };
  }
  
  // Collect hydration data
  var waterInput = document.getElementById('water-input');
  if(waterInput) dayData.water = waterInput.value || '';
  
  // Calculate total protein
  updateTotalProtein();
}

function setRating(s) {
  if(!dayData) return;
  dayData.rating=(dayData.rating===s)?0:s;
  updateStarUI(dayData.rating);
  commitSave();
}

function setHypno(val) {
  if(!dayData) return;
  dayData.hypno=(dayData.hypno===val)?'':val;
  updateHypnoUI(dayData.hypno);
  commitSave();
}

function logBP() {
  if(!dayData) return;
  var sys=parseInt(document.getElementById('bp-sys').value);
  var dia=parseInt(document.getElementById('bp-dia').value);
  var pul=parseInt(document.getElementById('bp-pul').value)||null;
  if(!sys||!dia) return;
  var now=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  if(!dayData.bp) dayData.bp=[];
  dayData.bp.push({sys:sys,dia:dia,pul:pul,time:now});
  renderBP();
  document.getElementById('bp-sys').value=''; 
  document.getElementById('bp-dia').value=''; 
  document.getElementById('bp-pul').value='';
  commitSave();
}

function renderBP() {
  var bps=dayData&&dayData.bp||[];
  var card=document.getElementById('bp-history-card');
  var hist=document.getElementById('bp-history');
  if(!card||!hist) return;
  if(bps.length===0){
    card.style.display='none';
    return;
  }
  card.style.display='block';
  hist.innerHTML=bps.map(function(r,i){
    var warn=r.sys>=140||r.dia>=90;
    return'<div class="bp-entry'+(warn?' warn':'')+'"><span>'+r.time+'</span>'+
      '<span style="display:flex;align-items:center;gap:6px">'+r.sys+'/'+r.dia+(r.pul?' · '+r.pul+' bpm':'')+
      (warn?'<span class="warn-badge">High</span>':'')+
      '<button class="bp-del-btn" onclick="deleteBPReading('+i+')">&times;</button></span></div>';
  }).join('');
}

function deleteBPReading(idx) {
  if(!dayData||!dayData.bp) return;
  dayData.bp.splice(idx,1);
  renderBP();
  commitSave();
}

// ═══════════════════════════════════════════════════════════
// WEEK PROGRESS
// ═══════════════════════════════════════════════════════════
function loadWeekProgress() {
  var medCounts = {};
  MEDS.forEach(function(id) { medCounts[id] = 0; });
  var exDays=0, protDays=0, buoyDays=0;

  for (var i=0; i<7; i++) {
    var d = new Date(); d.setDate(d.getDate() - i);
    var dk = d.toISOString().slice(0,10);
    var dayD = lsGet(dk) || {};
    
    // Count medications
    MEDS.forEach(function(id) {
      if (dayD.meds && dayD.meds[id] === true) medCounts[id]++;
    });
    
    // Count exercise sessions
    if (dayD.exerciseSessions && dayD.exerciseSessions.length > 0) {
      exDays++;
    }
    
    // Count protein goals (60g+)
    var totalProtein = 0;
    if (dayD.meals) {
      if (dayD.meals.breakfast && dayD.meals.breakfast.protein) totalProtein += parseInt(dayD.meals.breakfast.protein) || 0;
      if (dayD.meals.lunch && dayD.meals.lunch.protein) totalProtein += parseInt(dayD.meals.lunch.protein) || 0;
      if (dayD.meals.dinner && dayD.meals.dinner.protein) totalProtein += parseInt(dayD.meals.dinner.protein) || 0;
      if (dayD.meals.snacks && dayD.meals.snacks.protein) totalProtein += parseInt(dayD.meals.snacks.protein) || 0;
    }
    if (totalProtein >= 60) {
      protDays++;
    }
    
    // Count Buoy electrolytes
    if (dayD.buoy === 'yes') {
      buoyDays++;
    }
  }

  MEDS.forEach(function(id) {
    var count = medCounts[id];
    var pct = Math.round((count/7)*100);
    var bar = document.getElementById('wk-med-'+id+'-bar');
    var lbl = document.getElementById('wk-med-'+id+'-pct');
    if (bar) bar.style.width = pct + '%';
    if (lbl) lbl.textContent = count+'/7 days ('+pct+'%)';
  });
  
  setWeekBar('wk-ex', exDays, 7, 'days');
  setWeekBar('wk-prot', protDays, 7, 'days');
  setWeekBar('wk-buoy', buoyDays, 7, 'days');
}

function setWeekBar(pfx,val,total,unit){
  var pct=Math.round((val/total)*100);
  var b=document.getElementById(pfx+'-bar'); 
  if(b) b.style.width=pct+'%';
  var p=document.getElementById(pfx+'-pct'); 
  if(p) p.textContent=val+'/'+total+' '+unit+' ('+pct+'%)';
}

// ═══════════════════════════════════════════════════════════
// SAVE FUNCTIONS
// ═══════════════════════════════════════════════════════════
function commitSave() {
  if (!dayData) return;
  var dk = toKey(offset);
  lsPut(dk, dayData);
  flashSave();
}

function debouncedSave(field) {
  if(field==='steps'){
    var sv=document.getElementById('steps-input');
    if(sv) updateStepsUI(sv.value);
  }
  clearTimeout(saveTimer);
  saveTimer=setTimeout(function(){
    if(!dayData) return;
    collectDayData();
    commitSave();
  },1200);
}

// ═══════════════════════════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════════════════════════
function switchTab(tab,btn){
  if(activeTab==='today'&&dayData){
    clearTimeout(saveTimer);
    collectDayData();
    commitSave();
  }
  activeTab=tab;
  document.querySelectorAll('.nav-btn').forEach(function(b){
    b.classList.remove('active');
  });
  btn.classList.add('active');
  
  ['today','bp','monthly','payment','calendar','questions','stats','settings'].forEach(function(t){
    var el=document.getElementById('tab-'+t);
    if(el) el.className=t===tab?'':'hidden';
  });
}

// ═══════════════════════════════════════════════════════════
// PLACEHOLDER FUNCTIONS (for future implementation)
// ═══════════════════════════════════════════════════════════
function manualSync() {
  console.log('Sync functionality - placeholder');
  flashSave();
}

function toggleMonthTask(id) {
  console.log('Month task toggle:', id);
}

function addTransaction() {
  console.log('Add transaction - placeholder');
}

function addQuestion() {
  console.log('Add question - placeholder');
}

function loadStats() {
  console.log('Load stats - placeholder');
}

function exportAllData() {
  try {
    var allData = {
      dailyData: {},
      transactions: JSON.parse(localStorage.getItem('bmj_transactions') || '[]'),
      questions: JSON.parse(localStorage.getItem('bmj_questions') || '[]'),
      monthlyData: JSON.parse(localStorage.getItem('bmj_monthly') || '{}')
    };
    
    // Collect all daily data
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.startsWith(LS_PREFIX)) {
        var dateKey = key.replace(LS_PREFIX, '');
        allData.dailyData[dateKey] = JSON.parse(localStorage.getItem(key));
      }
    }
    
    var dataStr = JSON.stringify(allData, null, 2);
    var dataBlob = new Blob([dataStr], {type: 'application/json'});
    var url = URL.createObjectURL(dataBlob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'baby-mcgee-data-' + new Date().toISOString().slice(0,10) + '.json';
    link.click();
    URL.revokeObjectURL(url);
  } catch(e) {
    alert('Error exporting data: ' + e.message);
  }
}

function importHistoricalData() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,.xlsx,.csv';
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    
    if (file.name.endsWith('.json')) {
      importJSONData(file);
    } else {
      alert('Please select a JSON file. Excel import coming soon.');
    }
  };
  input.click();
}

function importJSONData(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      var imported = 0;
      
      // Import daily data
      if (data.dailyData) {
        Object.keys(data.dailyData).forEach(function(dateKey) {
          lsPut(dateKey, data.dailyData[dateKey]);
          imported++;
        });
      }
      
      // Import transactions
      if (data.transactions) {
        localStorage.setItem('bmj_transactions', JSON.stringify(data.transactions));
      }
      
      // Import questions
      if (data.questions) {
        localStorage.setItem('bmj_questions', JSON.stringify(data.questions));
      }
      
      // Import monthly data
      if (data.monthlyData) {
        localStorage.setItem('bmj_monthly', JSON.stringify(data.monthlyData));
      }
      
      alert('Successfully imported ' + imported + ' days of data!');
      location.reload();
    } catch(err) {
      alert('Error importing data: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function importFromExcelFormat(historicalData) {
  // Function to import data from the Excel format found in Downloads
  var imported = 0;
  
  if (historicalData.DailyLog) {
    historicalData.DailyLog.forEach(function(entry) {
      if (entry.Date && entry.Data) {
        try {
          var dateKey = entry.Date;
          var dayData = typeof entry.Data === 'string' ? JSON.parse(entry.Data) : entry.Data;
          
          // Clean up the data format to match current app structure
          var cleanData = {
            meds: dayData.meds || {},
            rating: dayData.rating || 0,
            hypno: dayData.hypno || '',
            steps: dayData.steps || '',
            notes: dayData.notes || '',
            protein: dayData.protein || '0',
            water: dayData.water || '',
            buoy: dayData.buoy || '',
            meals: dayData.meals || {
              breakfast: {foods: '', protein: ''},
              lunch: {foods: '', protein: ''},
              dinner: {foods: '', protein: ''},
              snacks: {foods: '', protein: ''}
            },
            exerciseSessions: dayData.exerciseSessions || [],
            bp: dayData.bp || []
          };
          
          lsPut(dateKey, cleanData);
          imported++;
        } catch(e) {
          console.warn('Error importing entry for ' + entry.Date + ':', e);
        }
      }
    });
  }
  
  // Import payment data
  if (historicalData.PaymentLog && historicalData.PaymentLog.length > 0) {
    var paymentEntry = historicalData.PaymentLog.find(function(entry) {
      return entry.Key === 'transactions';
    });
    if (paymentEntry && paymentEntry.Value) {
      try {
        var transactions = typeof paymentEntry.Value === 'string' ?
          JSON.parse(paymentEntry.Value) : paymentEntry.Value;
        localStorage.setItem('bmj_transactions', JSON.stringify(transactions));
      } catch(e) {
        console.warn('Error importing transactions:', e);
      }
    }
  }
  
  return imported;
}

function clearAllData() {
  if(confirm('Are you sure you want to clear all data? This cannot be undone.')) {
    localStorage.clear();
    location.reload();
  }
}

// Function to load historical data from the Excel file
function loadHistoricalDataFromExcel() {
  // Historical data extracted from Baby McGee Tracker.xlsx
  var historicalData = {
    "2026-03-29": {"water":"91","buoy":"","notes":"","steps":"","meals":{"breakfast":{"foods":""},"lunch":{"foods":""},"dinner":{"foods":""},"snacks":{"foods":""}},"protein":"0"},
    "2026-03-30": {"meds":{"aspirin":true,"prenatal":true,"lemonbalm":true,"magnesium":true,"vitd":"skip"},"hypno":"notstarted","protein":"0","meals":{"breakfast":{"foods":""},"lunch":{"foods":""},"dinner":{"foods":""},"snacks":{"foods":""}},"water":"91","buoy":"","notes":"","steps":""},
    "2026-03-31": {"meds":{"aspirin":true,"prenatal":true,"lemonbalm":true,"magnesium":true},"hypno":"notstarted","protein":"0","meals":{"breakfast":{"foods":""},"lunch":{"foods":""},"dinner":{"foods":""},"snacks":{"foods":""}},"water":"","buoy":"","notes":"","steps":""},
    "2026-04-01": {"meds":{"aspirin":true,"prenatal":true,"vitd":"skip","fishoil":"skip","lemonbalm":true,"magnesium":true},"hypno":"notstarted","steps":"6703","water":"90","protein":"73","meals":{"breakfast":{"foods":"","protein":"9"},"lunch":{"foods":"","protein":"9"},"dinner":{"foods":"","protein":"55"},"snacks":{"foods":""}},"buoy":"","notes":"","rating":3}
  };
  
  var transactions = [
    {"amount":300,"date":"2026-03-25","note":"03/25/2026 Zelle payment to Melissa Peteris JPM99caieipn","type":"payment","id":"tx_1775079528323"},
    {"date":"2026-03-02","amount":300,"note":"Zelle payment to Melissa Peteris JPM99c7odln4","id":"tx_1775079568197","type":"payment"}
  ];
  
  var imported = 0;
  
  // Import daily data only if it doesn't already exist
  Object.keys(historicalData).forEach(function(dateKey) {
    var existingData = lsGet(dateKey);
    if (!existingData || Object.keys(existingData).length === 0) {
      lsPut(dateKey, historicalData[dateKey]);
      imported++;
    }
  });
  
  // Import transactions if not already present
  var existingTransactions = localStorage.getItem('bmj_transactions');
  if (!existingTransactions) {
    localStorage.setItem('bmj_transactions', JSON.stringify(transactions));
  }
  
  return imported;
}

// ═══════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════
function loadAll() {
  var dk = toKey(offset);
  dayData = lsGet(dk) || {};
  renderAll();
  hideLoading();
}

function hideLoading() {
  var el = document.getElementById('loading-overlay');
  if (el) el.style.display = 'none';
}

function forceLoad() {
  loadAll();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  try {
    renderStats();
    
    // Load historical data on first run
    var hasHistoricalData = localStorage.getItem('bmj_historical_loaded');
    if (!hasHistoricalData) {
      var imported = loadHistoricalDataFromExcel();
      if (imported > 0) {
        localStorage.setItem('bmj_historical_loaded', 'true');
        console.log('Loaded ' + imported + ' days of historical data');
      }
    }
    
    loadAll();
  } catch(e) {
    console.error('Init error:', e);
    hideLoading();
  }
});

// Show "Tap to Load" button after 3s if overlay is still showing
setTimeout(function() {
  var overlay = document.getElementById('loading-overlay');
  if (overlay && overlay.style.display !== 'none') {
    var txt = document.getElementById('loading-text');
    var btn = document.getElementById('loading-tap-btn');
    if (txt) txt.textContent = 'Taking longer than usual...';
    if (btn) btn.style.display = 'block';
  }
}, 3000);

// Hard fallback at 8s
setTimeout(function() {
  var overlay = document.getElementById('loading-overlay');
  if (overlay && overlay.style.display !== 'none') {
    hideLoading();
  }
}, 8000);