// ---------- Theme toggle (Night mode / Day mode) ----------
const root = document.documentElement
const themeBtn = document.getElementById("themeBtn")

function setTheme(mode) {
    root.setAttribute("data-theme", mode)
    themeBtn.textContent = mode === "dark" ? "Day mode" : "Night mode"
    themeBtn.setAttribute("aria-pressed", mode === "dark")
    try { localStorage.setItem("theme", mode) } catch (e) {}
}

let saved = null
try { saved = localStorage.getItem("theme") } catch (e) {}
setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))

themeBtn.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark")
})

// keep other open tabs in sync with the chosen theme
window.addEventListener("storage", function (e) {
    if (e.key === "theme" && e.newValue) setTheme(e.newValue)
})

// ---------- Blur the other cards while one is hovered or focused ----------
document.querySelectorAll(".cards").forEach(function (group) {
    const cards = group.querySelectorAll(".card")

    function focusCard(target) {
        cards.forEach(function (card) {
            card.classList.toggle("active", card === target)
            card.classList.toggle("dim", card !== target)
        })
    }

    function clearCards() {
        cards.forEach(function (card) { card.classList.remove("active", "dim") })
    }

    cards.forEach(function (card) {
        card.addEventListener("mouseenter", function () { focusCard(card) })
        card.addEventListener("mouseleave", clearCards)
        card.addEventListener("focusin", function () { focusCard(card) })
        card.addEventListener("focusout", clearCards)
    })
})

// ---------- Images with no file yet: show the placeholder frame and its caption ----------
document.querySelectorAll(".ph img").forEach(function (img) {
    const frame = img.closest(".ph")
    function markEmpty() { frame.classList.add("empty") }
    img.addEventListener("error", markEmpty)
    img.addEventListener("load", function () { frame.classList.remove("empty") })
    if (!img.getAttribute("src") || (img.complete && img.naturalWidth === 0)) markEmpty()
})

// ---------- Highlight the nav link of the section being read ----------
const navLinks = document.querySelectorAll(".site-header nav a")

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return
            navLinks.forEach(function (link) {
                if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "true")
                else link.removeAttribute("aria-current")
            })
        })
    }, { rootMargin: "-45% 0px -50% 0px" })
    document.querySelectorAll("main section[id]").forEach(function (section) { observer.observe(section) })
}

// ---------- Activity log buttons: color odd, color even, hide / show ----------
const logRows = document.querySelectorAll("#logTable tbody tr")
const logWrap = document.getElementById("logWrap")

function toggleRows(className, btn) {
    const on = !logRows[0].classList.contains(className)
    logRows.forEach(function (row) { row.classList.toggle(className, on) })
    btn.setAttribute("aria-pressed", on)
}

document.querySelectorAll(".controls .btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const act = btn.dataset.act
        if (act === "odd") toggleRows("odd-on", btn)
        if (act === "even") toggleRows("even-on", btn)
        if (act === "toggle") {
            const hidden = logWrap.classList.toggle("hidden")
            btn.textContent = hidden ? "Show table" : "Hide table"
            btn.setAttribute("aria-expanded", !hidden)
        }
    })
})