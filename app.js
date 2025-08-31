const RV = (() => {
  const qs = s => document.querySelector(s);
  const qsa = s => [...document.querySelectorAll(s)];

  const BASKETS = [
    ["Tomato","Onion","Potato","Green Chilli","Coriander"],
    ["Brinjal","Okra","Cucumber","Cabbage","Drumstick"],
    ["Carrot","Beetroot","Spinach","Bottle Gourd","Ridge Gourd"],
    ["Cauliflower","Capsicum","Beans","Corn","Spring Onion"],
    ["Radish","Pumpkin","Curry Leaves","Peas","Amaranth"]
  ];

  let state = {
    user: null,
    plan: null,
    schedule: null,
    order: null
  };

  function route() {
    let hash = location.hash || "#home";
    qsa(".route").forEach(s => s.classList.remove("visible"));
    let el = qs(hash);
    if(el) el.classList.add("visible");
  }

  function renderYear(){
    qs("#year").textContent = new Date().getFullYear();
  }

  function renderBaskets(){
    let grid = qs("#basketGrid");
    grid.innerHTML = "";
    BASKETS.forEach((items,i) => {
      let div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<h3>Rotation ${i+1}</h3><ul>${items.map(v=>`<li>${v}</li>`).join("")}</ul>`;
      grid.appendChild(div);
    });
  }

  function selectPlan(plan){
    state.plan = plan;
    qs("#planConfirm").classList.remove("hide");
    qs("#planConfirm").textContent = "Selected: " + plan;
  }

  function saveSchedule(e){
    e.preventDefault();
    let start = new Date(qs("#startDate").value);
    let window = qs("#timeWindow").value;
    let out = [];
    for(let i=0;i<10;i++){
      let d = new Date(start);
      d.setDate(start.getDate() + (i*3));
      out.push({day:d.toDateString(), rotation:i+1, items:BASKETS[i%BASKETS.length], window});
    }
    state.schedule = out;
    renderSchedule();
  }

  function renderSchedule(){
    let wrap = qs("#scheduleOut");
    wrap.innerHTML = "";
    if(!state.schedule) return;
    state.schedule.forEach(r=>{
      let row=document.createElement("div");
      row.className="note";
      row.textContent=`${r.day} (${r.window}) → ${r.items.join(", ")}`;
      wrap.appendChild(row);
    });
  }

  function loadFarmers(){
    fetch("assets/farmers.json")
      .then(r=>r.json())
      .then(list=>{
        let wrap=qs("#farmerList");
        wrap.innerHTML="";
        list.forEach(f=>{
          let row=document.createElement("div");
          row.className="note";
          row.textContent=`${f.name} (${f.location}) — ${f.crops.join(", ")}`;
          wrap.appendChild(row);
        });
      });
  }

  function auth(e){
    e.preventDefault();
    state.user = {name:qs("#name").value, phone:qs("#phone").value};
    renderAuth();
  }

  function renderAuth(){
    let logged = !!state.user;
    qs("#loggedOut").classList.toggle("hide", logged);
    qs("#loggedIn").classList.toggle("hide", !logged);
    if(logged){
      qs("#uName").textContent = state.user.name;
      qs("#uPhone").textContent = state.user.phone;
    }
  }

  function placeOrder(){
    if(!state.plan || !state.schedule) return alert("Select plan & schedule first!");
    state.order = {id:"RV"+Math.floor(Math.random()*1e6), status:"Active"};
    renderOrder();
  }

  function renderOrder(){
    qs("#orderStatus").textContent = state.order ? `ID: ${state.order.id} — ${state.order.status}` : "No order";
  }

  function logout(){
    state.user=null;
    renderAuth();
    renderOrder();
  }

  function admin(){
    let stats = qs("#adminStats");
    stats.innerHTML = `<div class="note">Users: ${state.user?1:0}, Plan: ${state.plan||"None"}, Orders: ${state.order?1:0}</div>`;
  }

  function init(){
    renderYear();
    renderBaskets();
    renderSchedule();
    loadFarmers();
    renderAuth();
    renderOrder();
    admin();
    route();
    window.addEventListener("hashchange", route);
  }

  return { init, selectPlan, saveSchedule, auth, logout, placeOrder };
})();
document.addEventListener("DOMContentLoaded", RV.init);
