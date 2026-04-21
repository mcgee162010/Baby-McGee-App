// ═══════════════════════════════════════════════════════════
// Baby McGee Journal - Enhanced Local Version
// Revamped with modern features, better error handling, and accessibility
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════
var DUE = new Date('2026-09-04');
var MEDS = ['aspirin','prenatal','vitd','fishoil','lemonbalm','magnesium'];
var MED_NAMES = {aspirin:'Baby Aspirin',prenatal:'Thorne Prenatal',vitd:'Vitamin D3',fishoil:'Fish Oil',lemonbalm:'Lemon Balm',magnesium:'Calm Powder'};
var STAR_LABELS = ['','Rough day','Okay','Feeling alright','Good day','Feeling great!'];

// Baby development data by week
var BABY_SIZES = {
  4:  {emoji:'🌸', size:'poppy seed',        fact:'Blastocyst has implanted in the uterus'},
  5:  {emoji:'🌱', size:'sesame seed',        fact:'The tiny heart is beginning to form'},
  6:  {emoji:'🫐', size:'lentil',             fact:'Brain, spinal cord, and heart forming rapidly'},
  7:  {emoji:'🍓', size:'blueberry',          fact:'Hands and feet are forming — tiny arm buds visible'},
  8:  {emoji:'🍇', size:'raspberry',          fact:'Fingers are beginning to separate'},
  9:  {emoji:'🍒', size:'grape',              fact:'Essential organs forming, baby can move'},
  10: {emoji:'🍊', size:'kumquat',            fact:'All vital organs are present and developing'},
  11: {emoji:'🌿', size:'fig',               fact:'Baby can swallow and make facial expressions'},
  12: {emoji:'🍋', size:'lime',              fact:'Reflexes are developing rapidly'},
  13: {emoji:'🍑', size:'peach',             fact:'Fingerprints forming! End of first trimester'},
  14: {emoji:'🍋', size:'lemon',             fact:'Baby can make facial expressions like squinting'},
  15: {emoji:'🍎', size:'apple',             fact:'Skeleton is forming and baby is very active'},
  16: {emoji:'🥑', size:'avocado',           fact:'Baby can hear your voice — talk to them!'},
  17: {emoji:'🍐', size:'pear',              fact:'Baby is storing fat for warmth and energy'},
  18: {emoji:'🫑', size:'bell pepper',       fact:'Baby is very active — you may feel kicks soon'},
  19: {emoji:'🥭', size:'mango',             fact:'Vernix coating is forming to protect baby\'s skin'},
  20: {emoji:'🍌', size:'banana',            fact:'Halfway there! Baby can taste what you eat'},
  21: {emoji:'🥕', size:'carrot',            fact:'Eyebrows and eyelids are present and distinct'},
  22: {emoji:'🌽', size:'ear of corn',       fact:'Baby looks like a miniature newborn'},
  23: {emoji:'🥭', size:'large mango',       fact:'Hearing is fully developed — baby knows your voice'},
  24: {emoji:'🍈', size:'cantaloupe',        fact:'✨ Viability milestone reached — 24 weeks!'},
  25: {emoji:'🥦', size:'cauliflower',       fact:'Hair color and texture are developing'},
  26: {emoji:'🥬', size:'scallion',          fact:'Eyes are beginning to open for the first time'},
  27: {emoji:'🥬', size:'head of lettuce',   fact:'Brain is very active and developing rapidly'},
  28: {emoji:'🍆', size:'eggplant',          fact:'🎉 Welcome to the third trimester!'},
  29: {emoji:'🎃', size:'acorn squash',      fact:'Muscles and lungs are maturing for birth'},
  30: {emoji:'🥬', size:'cabbage',           fact:'Baby has billions of neurons connecting'},
  31: {emoji:'🍍', size:'pineapple',         fact:'Baby is moving a lot — track those kicks!'},
  32: {emoji:'🥥', size:'coconut',           fact:'Toenails are visible and growing'},
  33: {emoji:'🍍', size:'pineapple',         fact:'Skull bones are firming up but remain flexible'},
  34: {emoji:'🍈', size:'large cantaloupe',  fact:'Central nervous system is maturing rapidly'},
  35: {emoji:'🍈', size:'honeydew melon',    fact:'Kidneys are fully developed and functioning'},
  36: {emoji:'🥭', size:'papaya',            fact:'Baby may be dropping into birth position'},
  37: {emoji:'🍈', size:'winter melon',      fact:'✓ Early term — baby is nearly ready!'},
  38: {emoji:'🎃', size:'small pumpkin',     fact:'Baby is practicing breathing movements'},
  39: {emoji:'🍉', size:'watermelon slice',  fact:'Almost ready — could arrive any day!'},
  40: {emoji:'🎃', size:'pumpkin',           fact:'🌟 Full term — Baby McGee is ready to meet you!'}
};

// Protein food database (protein per 100g serving)
var PROTEIN_FOODS = {
  // Meat & Poultry
  'chicken-breast': {name: 'Chicken Breast (cooked)', protein: 31, unit: '100g'},
  'chicken-thigh': {name: 'Chicken Thigh (cooked)', protein: 26, unit: '100g'},
  'ground-turkey': {name: 'Ground Turkey (cooked)', protein: 27, unit: '100g'},
  'lean-beef': {name: 'Lean Beef (cooked)', protein: 26, unit: '100g'},
  'pork-tenderloin': {name: 'Pork Tenderloin (cooked)', protein: 26, unit: '100g'},
  
  // Fish & Seafood
  'salmon': {name: 'Salmon (cooked)', protein: 25, unit: '100g'},
  'tuna': {name: 'Tuna (cooked)', protein: 30, unit: '100g'},
  'cod': {name: 'Cod (cooked)', protein: 23, unit: '100g'},
  'shrimp': {name: 'Shrimp (cooked)', protein: 24, unit: '100g'},
  'canned-tuna': {name: 'Canned Tuna in Water', protein: 25, unit: '100g'},
  
  // Dairy & Eggs
  'greek-yogurt': {name: 'Greek Yogurt (plain)', protein: 10, unit: '100g'},
  'cottage-cheese': {name: 'Cottage Cheese', protein: 11, unit: '100g'},
  'milk': {name: 'Milk (whole)', protein: 3.4, unit: '100ml'},
  'cheddar-cheese': {name: 'Cheddar Cheese', protein: 25, unit: '100g'},
  'eggs': {name: 'Eggs (large)', protein: 6, unit: '1 egg (50g)'},
  
  // Legumes & Beans
  'black-beans': {name: 'Black Beans (cooked)', protein: 9, unit: '100g'},
  'chickpeas': {name: 'Chickpeas (cooked)', protein: 8, unit: '100g'},
  'lentils': {name: 'Lentils (cooked)', protein: 9, unit: '100g'},
  'kidney-beans': {name: 'Kidney Beans (cooked)', protein: 9, unit: '100g'},
  'tofu': {name: 'Tofu (firm)', protein: 15, unit: '100g'},
  
  // Nuts & Seeds
  'almonds': {name: 'Almonds', protein: 21, unit: '100g'},
  'peanut-butter': {name: 'Peanut Butter', protein: 25, unit: '100g'},
  'chia-seeds': {name: 'Chia Seeds', protein: 17, unit: '100g'},
  'hemp-seeds': {name: 'Hemp Seeds', protein: 31, unit: '100g'},
  'walnuts': {name: 'Walnuts', protein: 15, unit: '100g'},
  
  // Grains & Others
  'quinoa': {name: 'Quinoa (cooked)', protein: 4.4, unit: '100g'},
  'oats': {name: 'Oats (dry)', protein: 17, unit: '100g'},
  'protein-powder': {name: 'Protein Powder (whey)', protein: 80, unit: '100g'},
  'peanuts': {name: 'Peanuts', protein: 26, unit: '100g'}
};

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
var activityLog = [];

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
    return true;
  } catch(e) {
    console.error('localStorage error:', e);
    
    // Better error handling with user-friendly messages
    if (e.name === 'QuotaExceededError') {
      showNotification('Storage is full. Please export your data and clear old entries.', 'error');
      return false;
    } else if (e.name === 'SecurityError') {
      showNotification('Storage access denied. Please check your browser settings.', 'error');
      return false;
    } else {
      showNotification('Error saving data. Please try again.', 'error');
      return false;
    }
  }
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()" aria-label="Close notification">&times;</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after duration
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, duration);
}

// Performance optimization: debounced resize handler
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recalculate any responsive elements if needed
    updateViewportHeight();
  }, 250);
}

function updateViewportHeight() {
  // Fix for mobile viewport height issues
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function renderStats() {
  var c = new Date(DUE); c.setDate(c.getDate()-280);
  var t = new Date(), diff = t - c;
  var w = Math.floor(diff/(7*24*3600*1000));
  var d = Math.floor((diff%(7*24*3600*1000))/(24*3600*1000));
  
  var weeksEl = document.getElementById('stat-weeks');
  var daysEl = document.getElementById('stat-days');
  var triEl = document.getElementById('stat-tri');
  
  if (weeksEl) weeksEl.textContent = w+'w '+d+'d';
  if (daysEl) daysEl.textContent = Math.ceil((DUE-t)/(24*3600*1000));
  if (triEl) triEl.textContent = w<13?'1st':w<27?'2nd':'3rd';
  updateBabyCard(w);
}

function toKey(o) { var d=new Date(); d.setDate(d.getDate()+o); return d.toISOString().slice(0,10); }
function toMonthKey(o) { var d=new Date(); d.setDate(d.getDate()+o); return d.toISOString().slice(0,7); }

function getDateLabel(o) {
  var d=new Date(); d.setDate(d.getDate()+o);
  if(o===0)return'Today · '+d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  if(o===-1)return'Yesterday · '+d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
}

function updateBabyCard(week) {
  var w = Math.min(Math.max(week || 4, 4), 40);
  var info = BABY_SIZES[w] || BABY_SIZES[20];
  var triLabel = w < 13 ? '1st Trimester' : w < 27 ? '2nd Trimester' : '3rd Trimester';
  var emojiEl = document.getElementById('baby-card-emoji');
  var weekEl  = document.getElementById('baby-card-week');
  var sizeEl  = document.getElementById('baby-card-size');
  var factEl  = document.getElementById('baby-card-fact');
  var triEl   = document.getElementById('baby-card-tri');
  if (emojiEl) emojiEl.textContent = info.emoji;
  if (weekEl)  weekEl.textContent  = 'Week ' + w;
  if (sizeEl)  sizeEl.textContent  = 'Size of a ' + info.size;
  if (factEl)  factEl.textContent  = info.fact;
  if (triEl)   triEl.textContent   = triLabel;
}

function flashSave() {
  var b=document.getElementById('save-badge');
  if(b) {
    b.classList.add('show');
    setTimeout(function(){b.classList.remove('show');},1800);
  }
}

// ═══════════════════════════════════════════════════════════
// ACTIVITY LOG FUNCTIONS
// ═══════════════════════════════════════════════════════════
function logActivity(action, details) {
  if (!dayData) return;
  
  var timestamp = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  var activity = {
    time: timestamp,
    action: action,
    details: details,
    id: 'act_' + Date.now()
  };
  
  if (!dayData.activityLog) dayData.activityLog = [];
  dayData.activityLog.push(activity);
  
  // Keep only last 50 activities to prevent storage bloat
  if (dayData.activityLog.length > 50) {
    dayData.activityLog = dayData.activityLog.slice(-50);
  }
  
  renderActivityLog();
}

function renderActivityLog() {
  var activities = dayData && dayData.activityLog || [];
  var content = document.getElementById('activity-log-content');
  var dateLabel = document.getElementById('activity-log-date');
  
  if (!content) return;
  
  // Update date label
  if (dateLabel) {
    dateLabel.textContent = getDateLabel(offset).split(' · ')[0];
  }
  
  if (activities.length === 0) {
    content.innerHTML = '<div style="font-size:11px;color:#8b7b72;font-family:sans-serif;font-style:italic;text-align:center;padding:12px">No activity logged yet for this date.</div>';
    return;
  }
  
  // Show most recent activities first
  var recentActivities = activities.slice(-10).reverse();
  
  content.innerHTML = recentActivities.map(function(activity) {
    return '<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:4px 0;border-bottom:1px solid rgba(200,185,165,0.15);font-size:11px;font-family:sans-serif">' +
      '<div style="color:#5c4a42;flex:1">' + activity.details + '</div>' +
      '<div style="color:#9b8880;font-size:10px;margin-left:8px;white-space:nowrap">' + activity.time + '</div>' +
      '</div>';
  }).join('');
  
  if (activities.length > 10) {
    content.innerHTML += '<div style="text-align:center;padding:8px 0;font-size:10px;color:#9b8880;font-family:sans-serif;font-style:italic">Showing 10 most recent activities (' + activities.length + ' total today)</div>';
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
  var todayLabel = document.getElementById('date-label-today');
  if (todayLabel) todayLabel.textContent = dl;
  
  var bpLabel = document.getElementById('date-label-bp');
  if(bpLabel) bpLabel.textContent = dl;
  
  var dp = document.getElementById('date-picker-today');
  if(dp) dp.value = toKey(offset);
  
  var bpPicker = document.getElementById('date-picker-bp');
  if(bpPicker) bpPicker.value = toKey(offset);
  
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
  
  // Activity log
  renderActivityLog();
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
  var newState;
  if (cur === 'skip') {
    newState = false;
  } else {
    newState = !cur;
  }
  dayData.meds[id] = newState;
  
  // Log activity
  var medName = MED_NAMES[id] || id;
  if (newState === true) {
    logActivity('medication', 'Marked ' + medName + ' as taken');
  } else if (newState === false && cur === 'skip') {
    logActivity('medication', 'Unmarked ' + medName + ' (was skipped)');
  } else {
    logActivity('medication', 'Unmarked ' + medName);
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
  var newState;
  if (cur === 'skip') {
    newState = false;
  } else {
    newState = 'skip';
  }
  dayData.meds[id] = newState;
  
  // Log activity
  var medName = MED_NAMES[id] || id;
  if (newState === 'skip') {
    logActivity('medication', 'Skipped ' + medName + ' (marked as not taken)');
  } else {
    logActivity('medication', 'Unmarked ' + medName + ' (was skipped)');
  }
  
  applyMedState(id, dayData.meds[id]);
  updateMedProgress();
  commitSave();
}

function clearAllMedications() {
  if (!dayData) return;
  
  if (confirm('Are you sure you want to clear all medication statuses for today?')) {
    // Clear all medication states
    if (dayData.meds) {
      MEDS.forEach(function(id) {
        dayData.meds[id] = false;
      });
    }
    
    // Log activity
    logActivity('medication', 'Cleared all medication statuses');
    
    // Update UI
    MEDS.forEach(function(id) {
      applyMedState(id, false);
    });
    updateMedProgress();
    commitSave();
  }
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

function updateProteinFromInput() {
  if(!dayData) return;
  
  // Calculate total protein from all meal inputs
  var total = 0;
  
  var breakfastProtein = document.getElementById('breakfast-protein');
  var lunchProtein = document.getElementById('lunch-protein');
  var dinnerProtein = document.getElementById('dinner-protein');
  var snacksProtein = document.getElementById('snacks-protein');
  
  if(breakfastProtein) total += parseInt(breakfastProtein.value) || 0;
  if(lunchProtein) total += parseInt(lunchProtein.value) || 0;
  if(dinnerProtein) total += parseInt(dinnerProtein.value) || 0;
  if(snacksProtein) total += parseInt(snacksProtein.value) || 0;
  
  // Update both displays
  var totalDisplay = document.getElementById('total-protein-display');
  if(totalDisplay) totalDisplay.textContent = total + 'g';
  
  updateProteinGoal(total);
  
  // Update legacy protein field for compatibility
  if(dayData) dayData.protein = total.toString();
}

function addExerciseSession() {
  if(!dayData) return;
  
  var minutes = document.getElementById('exercise-minutes');
  var type = document.getElementById('exercise-type');
  
  if (!minutes || !type) {
    alert('Exercise input fields not found');
    return;
  }
  
  var minutesValue = parseInt(minutes.value);
  
  if(!minutes.value || !type.value) {
    alert('Please enter both minutes and exercise type');
    return;
  }
  
  if (isNaN(minutesValue) || minutesValue <= 0 || minutesValue > 480) {
    alert('Please enter valid exercise minutes (1-480)');
    return;
  }
  
  if(!dayData.exerciseSessions) dayData.exerciseSessions = [];
  
  var session = {
    id: 'ex_' + Date.now(),
    minutes: minutesValue,
    type: type.value
  };
  
  dayData.exerciseSessions.push(session);
  
  // Log activity
  logActivity('exercise', 'Added exercise: ' + minutesValue + ' min ' + type.value);
  
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
  var session = dayData.exerciseSessions[index];
  if (session) {
    logActivity('exercise', 'Removed exercise: ' + session.minutes + ' min ' + session.type);
  }
  dayData.exerciseSessions.splice(index, 1);
  renderExerciseSessions();
  commitSave();
}

function setBuoy(value) {
  if(!dayData) return;
  var oldBuoy = dayData.buoy;
  dayData.buoy = (dayData.buoy === value) ? '' : value;
  
  // Log activity
  if (dayData.buoy === '' && oldBuoy) {
    logActivity('hydration', 'Removed Buoy electrolytes status (was ' + (oldBuoy === 'yes' ? 'Yes' : 'Not yet') + ')');
  } else if (dayData.buoy === 'yes') {
    logActivity('hydration', 'Marked Buoy electrolytes as taken');
  } else if (dayData.buoy === 'no') {
    logActivity('hydration', 'Marked Buoy electrolytes as not yet taken');
  }
  
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
// PROTEIN CALCULATOR FUNCTIONS
// ═══════════════════════════════════════════════════════════
function openProteinCalculator(mealType) {
  var modal = document.getElementById('protein-calculator-modal');
  var mealLabel = document.getElementById('calc-meal-type');
  
  if (modal && mealLabel) {
    modal.dataset.mealType = mealType;
    mealLabel.textContent = mealType.charAt(0).toUpperCase() + mealType.slice(1);
    modal.style.display = 'block';
    
    // Reset calculator
    resetProteinCalculator();
  }
}

function closeProteinCalculator() {
  var modal = document.getElementById('protein-calculator-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function resetProteinCalculator() {
  document.getElementById('calc-food-select').value = '';
  document.getElementById('calc-serving-size').value = '';
  
  var calcList = document.getElementById('calc-food-list');
  if (calcList) calcList.innerHTML = '';
  
  updateCalculatorTotal();
}

function addFoodToCalculator() {
  var foodSelect = document.getElementById('calc-food-select');
  var servingInput = document.getElementById('calc-serving-size');
  
  if (!foodSelect || !servingInput) {
    alert('Calculator input fields not found');
    return;
  }
  
  if (!foodSelect.value || !servingInput.value) {
    alert('Please select a food and enter serving size');
    return;
  }
  
  var foodKey = foodSelect.value;
  var servingSize = parseFloat(servingInput.value);
  var food = PROTEIN_FOODS[foodKey];
  
  if (!food) {
    alert('Selected food not found in database');
    return;
  }
  
  if (isNaN(servingSize) || servingSize <= 0 || servingSize > 1000) {
    alert('Please enter a valid serving size (0.1-1000)');
    return;
  }
  
  // Calculate protein based on serving size
  var proteinAmount;
  if (food.unit === '1 egg (50g)') {
    proteinAmount = food.protein * servingSize; // servingSize = number of eggs
  } else if (food.unit === '100ml') {
    proteinAmount = (food.protein * servingSize) / 100; // servingSize in ml
  } else {
    proteinAmount = (food.protein * servingSize) / 100; // servingSize in grams
  }
  
  // Add to calculator list
  var calcList = document.getElementById('calc-food-list');
  if (!calcList) {
    alert('Calculator list not found');
    return;
  }
  
  var foodItem = document.createElement('div');
  foodItem.className = 'calc-food-item';
  foodItem.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(200,185,165,0.2)">' +
      '<div style="flex:1">' +
        '<div style="font-size:12px;color:#5c4a42;font-weight:500">' + food.name + '</div>' +
        '<div style="font-size:10px;color:#9b8880">' + servingSize + (food.unit === '1 egg (50g)' ? ' eggs' : food.unit === '100ml' ? 'ml' : 'g') + '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px">' +
        '<span style="font-size:12px;color:#4a7c43;font-weight:600">' + proteinAmount.toFixed(1) + 'g</span>' +
        '<button onclick="removeFoodFromCalculator(this)" style="background:none;border:none;color:#c46070;cursor:pointer;font-size:14px">&times;</button>' +
      '</div>' +
    '</div>';
  
  foodItem.dataset.protein = proteinAmount.toFixed(1);
  calcList.appendChild(foodItem);
  
  // Reset inputs
  foodSelect.value = '';
  servingInput.value = '';
  
  updateCalculatorTotal();
}

function removeFoodFromCalculator(button) {
  button.closest('.calc-food-item').remove();
  updateCalculatorTotal();
}

function updateCalculatorTotal() {
  var items = document.querySelectorAll('.calc-food-item');
  var total = 0;
  
  items.forEach(function(item) {
    total += parseFloat(item.dataset.protein) || 0;
  });
  
  var totalDisplay = document.getElementById('calc-total-protein');
  if (totalDisplay) {
    totalDisplay.textContent = total.toFixed(1) + 'g';
  }
}

function applyCalculatorResult() {
  var modal = document.getElementById('protein-calculator-modal');
  var mealType = modal.dataset.mealType;
  var totalDisplay = document.getElementById('calc-total-protein');
  
  if (!mealType || !totalDisplay) return;
  
  var totalProtein = parseFloat(totalDisplay.textContent) || 0;
  var proteinInput = document.getElementById(mealType + '-protein');
  
  if (proteinInput) {
    var currentValue = parseFloat(proteinInput.value) || 0;
    var newValue = currentValue + totalProtein;
    proteinInput.value = newValue.toFixed(1);
    
    // Update protein calculations
    updateProteinFromInput();
    debouncedSave('meals');
    
    // Log activity
    logActivity('nutrition', 'Added ' + totalProtein.toFixed(1) + 'g protein to ' + mealType + ' using calculator');
  }
  
  closeProteinCalculator();
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
  var oldRating = dayData.rating || 0;
  dayData.rating=(dayData.rating===s)?0:s;
  
  // Log activity
  if (dayData.rating === 0 && oldRating > 0) {
    logActivity('rating', 'Removed day rating (was ' + STAR_LABELS[oldRating] + ')');
  } else if (dayData.rating > 0) {
    logActivity('rating', 'Rated day: ' + STAR_LABELS[dayData.rating]);
  }
  
  updateStarUI(dayData.rating);
  commitSave();
}

function setHypno(val) {
  if(!dayData) return;
  var oldHypno = dayData.hypno;
  dayData.hypno=(dayData.hypno===val)?'':val;
  
  // Log activity
  var hypnoLabels = {yes: 'Yes', no: 'Not today', notstarted: 'Not started'};
  if (dayData.hypno === '' && oldHypno) {
    logActivity('hypnobabies', 'Removed Hypnobabies status (was ' + hypnoLabels[oldHypno] + ')');
  } else if (dayData.hypno) {
    logActivity('hypnobabies', 'Set Hypnobabies: ' + hypnoLabels[dayData.hypno]);
  }
  
  updateHypnoUI(dayData.hypno);
  commitSave();
}

function logBP() {
  if(!dayData) return;
  
  var sysInput = document.getElementById('bp-sys');
  var diaInput = document.getElementById('bp-dia');
  var pulInput = document.getElementById('bp-pul');
  
  if (!sysInput || !diaInput) {
    alert('Blood pressure input fields not found');
    return;
  }
  
  var sys = parseInt(sysInput.value);
  var dia = parseInt(diaInput.value);
  var pul = pulInput ? parseInt(pulInput.value) || null : null;
  
  if(!sys || !dia || sys < 50 || sys > 250 || dia < 30 || dia > 150) {
    alert('Please enter valid blood pressure values (systolic: 50-250, diastolic: 30-150)');
    return;
  }
  
  var now = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  if(!dayData.bp) dayData.bp = [];
  dayData.bp.push({sys:sys,dia:dia,pul:pul,time:now});
  
  // Log activity
  var bpText = sys + '/' + dia;
  if (pul) bpText += ' (pulse: ' + pul + ')';
  var warn = sys >= 140 || dia >= 90;
  if (warn) bpText += ' ⚠ HIGH';
  logActivity('blood-pressure', 'Added BP reading: ' + bpText);
  
  renderBP();
  
  // Clear inputs safely
  if (sysInput) sysInput.value = '';
  if (diaInput) diaInput.value = '';
  if (pulInput) pulInput.value = '';
  
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
  var reading = dayData.bp[idx];
  if (reading) {
    var bpText = reading.sys + '/' + reading.dia;
    if (reading.pul) bpText += ' (pulse: ' + reading.pul + ')';
    logActivity('blood-pressure', 'Deleted BP reading: ' + bpText + ' at ' + reading.time);
  }
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
    
    // Store old values for comparison
    var oldSteps = dayData.steps;
    var oldWater = dayData.water;
    var oldNotes = dayData.notes;
    
    collectDayData();
    
    // Log changes
    if (field === 'steps' && dayData.steps !== oldSteps && dayData.steps) {
      logActivity('movement', 'Updated steps: ' + parseInt(dayData.steps).toLocaleString());
    }
    if (field === 'hydration' && dayData.water !== oldWater && dayData.water) {
      logActivity('hydration', 'Updated water intake: ' + dayData.water + ' oz');
    }
    if (field === 'notes' && dayData.notes !== oldNotes && dayData.notes) {
      logActivity('notes', 'Updated symptoms & notes');
    }
    if (field === 'meals') {
      logActivity('nutrition', 'Updated meal information');
    }
    
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
  
  // Initialize B&B events when calendar tab is opened
  if (tab === 'calendar') {
    setTimeout(function() {
      refreshBnBEvents();
    }, 500);
  }
}

// ═══════════════════════════════════════════════════════════
// B&B CALENDAR FUNCTIONS
// ═══════════════════════════════════════════════════════════
function refreshBnBEvents() {
  var eventsList = document.getElementById('bnb-events-list');
  if (!eventsList) return;
  
  eventsList.innerHTML = '<div style="font-size:11px;color:#8b7b72;font-family:sans-serif;font-style:italic;text-align:center;padding:12px">Refreshing B&B calendar events...</div>';
  
  // Simulate loading and show placeholder events
  setTimeout(function() {
    var now = new Date();
    var events = [
      {
        title: 'Check-in: Smith Family',
        date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        type: 'checkin'
      },
      {
        title: 'Check-out: Johnson Couple',
        date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        type: 'checkout'
      },
      {
        title: 'Maintenance: Deep Clean',
        date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        type: 'maintenance'
      }
    ];
    
    if (events.length === 0) {
      eventsList.innerHTML = '<div style="font-size:11px;color:#8b7b72;font-family:sans-serif;font-style:italic;text-align:center;padding:12px">No upcoming B&B events found.</div>';
      return;
    }
    
    eventsList.innerHTML = events.map(function(event) {
      var dateStr = event.date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      var typeColor = event.type === 'checkin' ? '#4a7c43' :
                     event.type === 'checkout' ? '#c46070' : '#8b7b72';
      var typeIcon = event.type === 'checkin' ? '🏠' :
                    event.type === 'checkout' ? '🚪' : '🔧';
      
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(200,185,165,0.15)">' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<span style="font-size:14px">' + typeIcon + '</span>' +
          '<div>' +
            '<div style="font-size:12px;color:#5c4a42;font-weight:500">' + event.title + '</div>' +
            '<div style="font-size:10px;color:' + typeColor + ';text-transform:uppercase;letter-spacing:0.05em">' + event.type + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="font-size:10px;color:#9b8880;text-align:right">' + dateStr + '</div>' +
      '</div>';
    }).join('');
    
    // Log activity
    if (dayData) {
      logActivity('calendar', 'Refreshed B&B calendar events (' + events.length + ' upcoming)');
    }
    
  }, 1000);
}

// ═══════════════════════════════════════════════════════════
// PLACEHOLDER FUNCTIONS (for future implementation)
// ═══════════════════════════════════════════════════════════
function manualSync() {
  console.log('Sync functionality - placeholder');
  flashSave();
}

function toggleMonthTask(id) {
  var monthKey = toMonthKey(0);
  if (!monthData[monthKey]) monthData[monthKey] = {};
  if (!monthData[monthKey].tasks) monthData[monthKey].tasks = {};
  
  monthData[monthKey].tasks[id] = !monthData[monthKey].tasks[id];
  
  // Update UI
  var row = document.getElementById('row-' + id);
  if (row) {
    if (monthData[monthKey].tasks[id]) {
      row.classList.add('checked');
    } else {
      row.classList.remove('checked');
    }
  }
  
  // Save to localStorage
  localStorage.setItem('bmj_monthly', JSON.stringify(monthData));
  flashSave();
}

function debouncedMonthSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(function() {
    var monthKey = toMonthKey(0);
    if (!monthData[monthKey]) monthData[monthKey] = {};
    
    var apptNotes = document.getElementById('appt-notes');
    var monthNotes = document.getElementById('month-notes');
    
    if (apptNotes) monthData[monthKey].appointments = apptNotes.value;
    if (monthNotes) monthData[monthKey].notes = monthNotes.value;
    
    localStorage.setItem('bmj_monthly', JSON.stringify(monthData));
    flashSave();
  }, 1200);
}

function addTransaction() {
  var dateInput = document.getElementById('tx-date');
  var amountInput = document.getElementById('tx-amount');
  var typeSelect = document.getElementById('tx-type');
  var noteInput = document.getElementById('tx-note');
  
  if (!dateInput || !amountInput || !typeSelect) {
    alert('Transaction input fields not found');
    return;
  }
  
  if (!dateInput.value || !amountInput.value) {
    alert('Please enter date and amount');
    return;
  }
  
  var amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0 || amount > 50000) {
    alert('Please enter a valid amount (0.01-50000)');
    return;
  }
  
  var transaction = {
    id: 'tx_' + Date.now(),
    date: dateInput.value,
    amount: amount,
    type: typeSelect.value || 'payment',
    note: noteInput ? noteInput.value || '' : ''
  };
  
  transactions.push(transaction);
  
  try {
    localStorage.setItem('bmj_transactions', JSON.stringify(transactions));
  } catch(e) {
    alert('Error saving transaction: ' + e.message);
    transactions.pop(); // Remove the transaction we just added
    return;
  }
  
  // Clear inputs
  dateInput.value = '';
  amountInput.value = '';
  typeSelect.value = 'payment';
  if (noteInput) noteInput.value = '';
  
  renderTransactions();
  flashSave();
}

function addQuestion() {
  var input = document.getElementById('new-q-input');
  if (!input.value.trim()) return;
  
  var question = {
    id: 'q_' + Date.now(),
    text: input.value.trim(),
    date: new Date().toLocaleDateString(),
    answered: false,
    answer: ''
  };
  
  questions.push(question);
  localStorage.setItem('bmj_questions', JSON.stringify(questions));
  
  input.value = '';
  renderQuestions();
  flashSave();
}

function loadStats() {
  var loadingEl = document.getElementById('stats-loading');
  var contentEl = document.getElementById('stats-content');
  
  if (loadingEl) loadingEl.style.display = 'none';
  if (contentEl) contentEl.classList.remove('hidden');
  
  try {
    // Calculate streak
    var streak = 0;
    var today = new Date();
    for (var i = 0; i < 365; i++) {
      var d = new Date(today);
      d.setDate(d.getDate() - i);
      var dk = d.toISOString().slice(0, 10);
      var dayD = lsGet(dk);
      
      if (dayD && (dayD.meds || dayD.rating || dayD.notes)) {
        streak++;
      } else {
        break;
      }
    }
    
    // Calculate medication adherence (last 30 days)
    var totalPossible = MEDS.length * 30;
    var totalTaken = 0;
    
    for (var i = 0; i < 30; i++) {
      var d = new Date(today);
      d.setDate(d.getDate() - i);
      var dk = d.toISOString().slice(0, 10);
      var dayD = lsGet(dk);
      
      if (dayD && dayD.meds) {
        MEDS.forEach(function(medId) {
          if (dayD.meds[medId] === true) totalTaken++;
        });
      }
    }
    
    var adherence = Math.round((totalTaken / totalPossible) * 100);
    
    // Update UI safely
    var streakEl = document.getElementById('st-streak');
    var adhEl = document.getElementById('st-adh');
    
    if (streakEl) streakEl.textContent = streak;
    if (adhEl) adhEl.textContent = adherence + '%';
    
    // Color code adherence
    var adhCard = document.getElementById('st-adh-card');
    if (adhCard) {
      adhCard.className = 'kpi-tile';
      if (adherence >= 80) adhCard.classList.add('good');
      else if (adherence >= 60) adhCard.classList.add('okay');
      else adhCard.classList.add('poor');
    }
  } catch(e) {
    console.error('Error loading statistics:', e);
    alert('Error loading statistics. Please try again.');
  }
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
function renderTransactions() {
  var list = document.getElementById('tx-list');
  if (!list) return;
  
  if (transactions.length === 0) {
    list.innerHTML = '<div style="font-size:12px;color:#9b8880;font-family:sans-serif;text-align:center;padding:8px">No transactions logged yet.</div>';
    return;
  }
  
  // Sort by date (newest first)
  var sortedTx = transactions.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  
  list.innerHTML = sortedTx.map(function(tx) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(200,185,165,0.2)">' +
      '<div>' +
        '<div style="font-size:12px;color:#5c4a42;font-weight:500">$' + tx.amount.toFixed(2) + ' · ' + tx.type + '</div>' +
        '<div style="font-size:10px;color:#9b8880">' + new Date(tx.date).toLocaleDateString() + (tx.note ? ' · ' + tx.note : '') + '</div>' +
      '</div>' +
      '<button onclick="removeTransaction(\'' + tx.id + '\')" style="background:none;border:none;color:#c46070;cursor:pointer;font-size:14px">&times;</button>' +
      '</div>';
  }).join('');
  
  // Update payment summary
  var total = transactions.reduce(function(sum, tx) {
    return sum + (tx.type === 'payment' ? tx.amount : 0);
  }, 0);
  
  var totalDisplay = document.getElementById('pay-total-display');
  var remaining = document.getElementById('remaining');
  var pctLabel = document.getElementById('pay-pct-label');
  var progBar = document.getElementById('pay-prog');
  
  if (totalDisplay) totalDisplay.textContent = '$' + total.toFixed(0);
  if (remaining) remaining.textContent = '$' + (6700 - total).toFixed(0);
  
  var pct = Math.min(100, Math.round((total / 6700) * 100));
  if (pctLabel) pctLabel.textContent = pct + '% paid of $6,700';
  if (progBar) progBar.style.width = pct + '%';
}

function removeTransaction(id) {
  transactions = transactions.filter(function(tx) { return tx.id !== id; });
  localStorage.setItem('bmj_transactions', JSON.stringify(transactions));
  renderTransactions();
  flashSave();
}

function renderQuestions() {
  var list = document.getElementById('q-list');
  if (!list) return;
  
  if (questions.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:1.5rem;color:#9b8880;font-family:sans-serif;font-style:italic">No questions yet.</div>';
    return;
  }
  
  list.innerHTML = questions.map(function(q) {
    return '<div style="border:1px solid rgba(200,185,165,0.3);border-radius:8px;padding:12px;margin-bottom:8px;background:rgba(255,255,255,0.5)">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">' +
        '<div style="flex:1;font-size:13px;color:#5c4a42">' + q.text + '</div>' +
        '<button onclick="removeQuestion(\'' + q.id + '\')" style="background:none;border:none;color:#c46070;cursor:pointer;font-size:14px;margin-left:8px">&times;</button>' +
      '</div>' +
      '<div style="font-size:10px;color:#9b8880;margin-bottom:' + (q.answered ? '8px' : '0') + '">' + q.date + '</div>' +
      (q.answered ? '<div style="font-size:12px;color:#4a7c43;font-style:italic">Answer: ' + q.answer + '</div>' : '') +
      '</div>';
  }).join('');
}

function removeQuestion(id) {
  questions = questions.filter(function(q) { return q.id !== id; });
  localStorage.setItem('bmj_questions', JSON.stringify(questions));
  renderQuestions();
  flashSave();
}

function renderMonthlyTasks() {
  var monthKey = toMonthKey(0);
  var monthLabel = document.getElementById('month-label');
  if (monthLabel) {
    var d = new Date();
    monthLabel.textContent = d.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
  }
  
  // Load monthly data
  if (monthData[monthKey] && monthData[monthKey].tasks) {
    ['castoroil', 'calcium'].forEach(function(taskId) {
      var row = document.getElementById('row-' + taskId);
      if (row && monthData[monthKey].tasks[taskId]) {
        row.classList.add('checked');
      }
    });
  }
  
  // Load text areas
  if (monthData[monthKey]) {
    var apptNotes = document.getElementById('appt-notes');
    var monthNotes = document.getElementById('month-notes');
    
    if (apptNotes && monthData[monthKey].appointments) {
      apptNotes.value = monthData[monthKey].appointments;
    }
    if (monthNotes && monthData[monthKey].notes) {
      monthNotes.value = monthData[monthKey].notes;
    }
  }
}

function loadAll() {
  var dk = toKey(offset);
  dayData = lsGet(dk) || {};
  
  // Load other data
  try {
    transactions = JSON.parse(localStorage.getItem('bmj_transactions') || '[]');
    questions = JSON.parse(localStorage.getItem('bmj_questions') || '[]');
    monthData = JSON.parse(localStorage.getItem('bmj_monthly') || '{}');
  } catch(e) {
    console.error('Error loading data:', e);
    transactions = [];
    questions = [];
    monthData = {};
  }
  
  renderAll();
  renderTransactions();
  renderQuestions();
  renderMonthlyTasks();
  hideLoading();
}

function hideLoading() {
  var el = document.getElementById('loading-overlay');
  if (el) el.style.display = 'none';
}

function forceLoad() {
  loadAll();
}

// Enhanced initialization with modern features
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize viewport height fix
    updateViewportHeight();
    window.addEventListener('resize', handleResize);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Initialize app
    renderStats();
    
    // Load historical data on first run
    var hasHistoricalData = localStorage.getItem('bmj_historical_loaded');
    if (!hasHistoricalData) {
      var imported = loadHistoricalDataFromExcel();
      if (imported > 0) {
        localStorage.setItem('bmj_historical_loaded', 'true');
        console.log('Loaded ' + imported + ' days of historical data');
        showNotification('Historical data loaded successfully!', 'success');
      }
    }
    
    // Check for app updates
    checkForUpdates();
    
    loadAll();
  } catch(e) {
    console.error('Init error:', e);
    showNotification('Error initializing app. Please refresh the page.', 'error');
    hideLoading();
  }
});

// Keyboard navigation for accessibility
function handleKeyboardNavigation(e) {
  // Tab navigation for bottom nav
  if (e.key === 'Tab' && e.target.classList.contains('nav-btn')) {
    e.preventDefault();
    const navBtns = document.querySelectorAll('.nav-btn');
    const currentIndex = Array.from(navBtns).indexOf(e.target);
    const nextIndex = e.shiftKey ?
      (currentIndex - 1 + navBtns.length) % navBtns.length :
      (currentIndex + 1) % navBtns.length;
    navBtns[nextIndex].focus();
  }
  
  // Enter key for nav buttons
  if (e.key === 'Enter' && e.target.classList.contains('nav-btn')) {
    e.target.click();
  }
}

// Check for app updates (service worker support)
function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(function(registration) {
        console.log('Service Worker registered successfully');
        
        registration.addEventListener('updatefound', function() {
          showNotification('App update available! Refresh to get the latest version.', 'info', 10000);
        });
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  }
}

// Enhanced data export with better formatting
function exportEnhancedData() {
  try {
    var allData = {
      exportDate: new Date().toISOString(),
      appVersion: '2.0.0',
      dailyData: {},
      transactions: JSON.parse(localStorage.getItem('bmj_transactions') || '[]'),
      questions: JSON.parse(localStorage.getItem('bmj_questions') || '[]'),
      monthlyData: JSON.parse(localStorage.getItem('bmj_monthly') || '{}'),
      statistics: generateExportStatistics()
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
    link.download = 'baby-mcgee-enhanced-export-' + new Date().toISOString().slice(0,10) + '.json';
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
  } catch(e) {
    console.error('Export error:', e);
    showNotification('Error exporting data: ' + e.message, 'error');
  }
}

function generateExportStatistics() {
  var stats = {
    totalDaysLogged: 0,
    medicationAdherence: {},
    averageRating: 0,
    totalExerciseSessions: 0,
    averageSteps: 0
  };
  
  var totalRating = 0;
  var ratingCount = 0;
  var totalSteps = 0;
  var stepsCount = 0;
  
  // Initialize medication counters
  MEDS.forEach(function(med) {
    stats.medicationAdherence[med] = { taken: 0, total: 0 };
  });
  
  // Analyze all daily data
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key && key.startsWith(LS_PREFIX)) {
      var dayData = JSON.parse(localStorage.getItem(key));
      if (dayData && Object.keys(dayData).length > 0) {
        stats.totalDaysLogged++;
        
        // Rating analysis
        if (dayData.rating) {
          totalRating += dayData.rating;
          ratingCount++;
        }
        
        // Steps analysis
        if (dayData.steps) {
          var steps = parseInt(dayData.steps);
          if (!isNaN(steps)) {
            totalSteps += steps;
            stepsCount++;
          }
        }
        
        // Medication analysis
        if (dayData.meds) {
          MEDS.forEach(function(med) {
            stats.medicationAdherence[med].total++;
            if (dayData.meds[med] === true) {
              stats.medicationAdherence[med].taken++;
            }
          });
        }
        
        // Exercise analysis
        if (dayData.exerciseSessions) {
          stats.totalExerciseSessions += dayData.exerciseSessions.length;
        }
      }
    }
  }
  
  // Calculate averages
  stats.averageRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0;
  stats.averageSteps = stepsCount > 0 ? Math.round(totalSteps / stepsCount) : 0;
  
  return stats;
}

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