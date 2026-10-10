/* =====================================================
   DASHBOARD
===================================================== */


/* =====================================================
   CEK LOGIN
===================================================== */

// Aktifkan bagian ini jika dashboard
// harus hanya bisa dibuka setelah login.


if (sessionStorage.getItem("login") !== "true") {

    window.location.href = "index.html";

}



/* =====================================================
   ELEMENT
===================================================== */

const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const toggle = document.getElementById("toggleSidebar");

const footer = document.getElementById("footer");

const namaUser = document.getElementById("namaUser");
const levelUser = document.getElementById("levelUser");

const logoutBtn = document.getElementById("logoutBtn");


/* =====================================================
   CEK ELEMENT
===================================================== */

if (!sidebar) {
    console.error("Element #sidebar tidak ditemukan.");
}

if (!main) {
    console.error("Element #main tidak ditemukan.");
}

if (!toggle) {
    console.error("Element #toggleSidebar tidak ditemukan.");
}


/* =====================================================
   USER LOGIN
===================================================== */

const nama =
    sessionStorage.getItem("nama") ||
    "Administrator";

const level =
    sessionStorage.getItem("level") ||
    "Admin";


/* =====================================================
   TAMPILKAN USER
===================================================== */

if (namaUser) {

    namaUser.textContent = nama;

}


if (levelUser) {

    levelUser.textContent = level;

}


/* =====================================================
   SIDEBAR
===================================================== */

function setSidebarState() {

    const status =
        localStorage.getItem("sidebar");


    if (status === "close") {

        sidebar.classList.add("collapsed");

        main.classList.add("expand");


        if (footer) {

            footer.classList.add("expand");

        }


    } else {

        sidebar.classList.remove("collapsed");

        main.classList.remove("expand");


        if (footer) {

            footer.classList.remove("expand");

        }

    }

}


/* =====================================================
   LOAD STATUS SIDEBAR
===================================================== */

if (sidebar && main) {

    setSidebarState();

}


/* =====================================================
   TOGGLE SIDEBAR
===================================================== */

if (toggle) {

    toggle.onclick = function () {

        sidebar.classList.toggle("collapsed");

        main.classList.toggle("expand");


        if (footer) {

            footer.classList.toggle("expand");

        }


        if (
            sidebar.classList.contains("collapsed")
        ) {

            localStorage.setItem(
                "sidebar",
                "close"
            );


        } else {

            localStorage.setItem(
                "sidebar",
                "open"
            );

        }

    };

}


/* =====================================================
   HAK AKSES
===================================================== */

if (level === "Operator") {

    document
        .querySelectorAll(".menu-admin")
        .forEach(function (menu) {

            menu.style.display = "none";

        });

}


/* =====================================================
   LOGOUT
===================================================== */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (e) {

            e.preventDefault();


            sessionStorage.clear();


            window.location.href =
                "index.html";

        }
    );

}


/* =====================================================
   TOOLTIP
===================================================== */

const tooltipTriggerList =
    document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );


tooltipTriggerList.forEach(
    function (element) {

        new bootstrap.Tooltip(element);

    }
);

/* =====================================================
   DATA DASHBOARD
===================================================== */

const STORAGE_KARYAWAN = "karyawan";


function tampilkanDashboard() {

    /* =================================================
       CEK HALAMAN DASHBOARD
    ================================================= */

    const totalKaryawanEl =
        document.getElementById("totalKaryawan");

    const totalMandorEl =
        document.getElementById("totalMandor");

const totalBukuEl =
        document.getElementById("totalBuku");

    const rataKaryawanEl =
        document.getElementById("rataKaryawan");


    /*
       Jika elemen dashboard tidak ada,
       berarti halaman ini bukan dashboard.

       Jangan jalankan fungsi dashboard.
       Tetapi dashboard.js tetap bisa digunakan
       untuk fungsi sidebar dan toggle.
    */

    if (
        !totalKaryawanEl &&
        !totalMandorEl &&
	!totalBukuEl &&
        !rataKaryawanEl
    ) {

        console.log(
            "Bukan halaman dashboard. Data dashboard dilewati."
        );

        return;

    }


    /* =================================================
       DATA KARYAWAN
    ================================================= */

    const dataKaryawan =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KARYAWAN
            )
        ) || [];


    const totalKaryawan =
        dataKaryawan.length;


    /* =================================================
       TOTAL KARYAWAN
    ================================================= */

    if (totalKaryawanEl) {

        totalKaryawanEl.textContent =
            totalKaryawan;

    }


    /* =================================================
       DATA MANDOR
    ================================================= */

    const dataMandor =
        JSON.parse(
            localStorage.getItem("mandor")
        ) || [];


    const totalMandor =
        dataMandor.length;


    /* =================================================
       TOTAL MANDOR
    ================================================= */

    if (totalMandorEl) {

        totalMandorEl.textContent =
            totalMandor;

    }

/* =================================================
       DATA BUKU
    ================================================= */

    const dataBuku =
        JSON.parse(
            localStorage.getItem("dataBuku")
        ) || [];


    const totalBuku =
        Array.isArray(dataBuku)
            ? dataBuku.length
            : 0;


    if (totalBukuEl) {

        totalBukuEl.textContent =
            totalBuku;

    }


    /* =================================================
       RATA-RATA KARYAWAN / MANDOR
    ================================================= */

    let rata = 0;


    if (totalMandor > 0) {

        rata =
            totalKaryawan /
            totalMandor;

    }


    if (rataKaryawanEl) {

        rataKaryawanEl.textContent =
            rata.toFixed(1);

    }

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeDashboard(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


/* =====================================================
   JALANKAN DASHBOARD
===================================================== */

tampilkanDashboard();

/* =====================================================
   SELESAI
===================================================== */

console.log(
    "Dashboard berhasil dimuat."
);