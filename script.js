const TASK_API = "http://localhost:3000/tasks";
const SUBJECT_API = "http://localhost:3000/subjects";

let tasks = [];
let subjects = [];
let filter = "all";
let currentUser = null;

async function loadAll() {
  const t = await fetch(TASK_API);
  tasks = await t.json();

  const s = await fetch(SUBJECT_API);
  subjects = await s.json();

  renderSubjects();
  renderTasks();
}


async function login() {
  const name = document.getElementById("loginName").value;
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ name, email, password })
  });

  const user = await res.json();
  currentUser = user;

  document.getElementById("loginStatus").innerText =
    "Logged in as: " + user.name;
}


function renderSubjects() {
  const list = document.getElementById("subjectList");
  const select = document.getElementById("subjectSelect");

  list.innerHTML = "";
  select.innerHTML = "";

  subjects.forEach(s => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = s.name;
    list.appendChild(div);

    const opt = document.createElement("option");
    opt.value = s.id;
    opt.text = s.name;
    select.appendChild(opt);
  });
}

async function addSubject() {
  const input = document.getElementById("subjectInput");

  if (!input.value) return alert("Enter subject");

  await fetch(SUBJECT_API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ name: input.value })
  });

  input.value = "";
  loadAll();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const search = document.getElementById("searchInput").value.toLowerCase();

  list.innerHTML = "";

  let filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search)
  );

  if (filter === "done") filtered = filtered.filter(t => t.done);
  if (filter === "pending") filtered = filtered.filter(t => !t.done);

  if (filtered.length === 0) {
    list.innerHTML = "<p>No tasks found</p>";
    return;
  }

  filtered.forEach(t => {
    const div = document.createElement("div");
    div.className = "card";

    const today = new Date().toISOString().split("T")[0];

    let statusText = "⏳ Pending";
    if (t.done) statusText = " Done";
    else if (t.due_date && t.due_date < today) statusText = "❌ Overdue";

    div.innerHTML = `
      <strong>${t.title}</strong>
      <p>Subject: ${
        subjects.find(s => s.id == t.subject_id)?.name || "None"
      }</p>
      <p>Due: ${t.due_date || "No date"}</p>
      <p>Status: ${statusText}</p>
      <button onclick="toggleDone(${t.id})">Toggle</button>
      <button onclick="deleteTask(${t.id})">Delete</button>
    `;

    list.appendChild(div);
  });
}

async function addTask() {
  const title = document.getElementById("taskInput").value;
  const date = document.getElementById("dateInput").value;
  const subject = document.getElementById("subjectSelect").value;

  if (!title) return alert("Enter task");

  await fetch(TASK_API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      title: title,
      due_date: date,
      subject_id: subject,
      user_id: currentUser?.id || 1,
      done: false
    })
  });

  document.getElementById("taskInput").value = "";
  loadAll();
}

// DELETE
async function deleteTask(id) {
  await fetch(TASK_API + "/" + id, { method: "DELETE" });
  loadAll();
}

async function toggleDone(id) {
  await fetch(TASK_API + "/" + id, { method: "PUT" });
  loadAll();
}

// START
loadAll();