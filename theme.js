/* Display preferences are local to this device; no inventory data changes. */
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
let themePreference = 'system';
try { const stored = localStorage.getItem('momshop-theme'); if (['system','light','dark'].includes(stored)) themePreference = stored; } catch (_) {}
function applyTheme() {
  const effective = themePreference === 'system' ? (themeMedia.matches ? 'dark' : 'light') : themePreference;
  document.documentElement.dataset.theme = effective;
  document.documentElement.style.colorScheme = effective === 'light' ? 'only light' : 'dark';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',effective === 'dark' ? '#111c18' : '#145b48');
  const status = document.getElementById('theme-status');
  if(status) status.textContent = 'กำลังใช้โหมด'+(effective === 'dark' ? 'มืด' : 'สว่าง');
}
applyTheme();
if(themeMedia.addEventListener) themeMedia.addEventListener('change',applyTheme); else if(themeMedia.addListener) themeMedia.addListener(applyTheme);
window.addEventListener('pageshow',applyTheme);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)applyTheme()});
function themeSettings(){return `<div class="panel stack theme-panel"><h3>การแสดงผล</h3><label class="field">ธีมหน้าจอ<select id="theme-choice"><option value="system" ${themePreference==='system'?'selected':''}>ตามการตั้งค่ามือถือ</option><option value="light" ${themePreference==='light'?'selected':''}>โหมดสว่าง</option><option value="dark" ${themePreference==='dark'?'selected':''}>โหมดมืด</option></select></label><p class="note" id="theme-status">กำลังใช้โหมด${document.documentElement.dataset.theme==='dark'?'มืด':'สว่าง'}</p><p class="note">ปรับเฉพาะ MomShop ไม่เปลี่ยนการตั้งค่ามือถือหรือข้อมูลร้าน</p></div>`;}
document.addEventListener('change',event=>{if(event.target.id!=='theme-choice'||!['system','light','dark'].includes(event.target.value))return;themePreference=event.target.value;try{localStorage.setItem('momshop-theme',themePreference)}catch(_){}applyTheme()});
