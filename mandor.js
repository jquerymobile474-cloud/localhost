/* =====================================================
   MASTER MANDOR
===================================================== */

/* =====================================================
   CEK LOGIN
===================================================== */

// Aktifkan jika ingin wajib login
/*
if (sessionStorage.getItem("login") !== "true") {
    window.location.href = "login.html";
}
*/


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

const tbodyMandor = document.getElementById("tbodyMandor");
const totalMandor = document.getElementById("totalMandor");
const searchMandor = document.getElementById("searchMandor");
const btnTambah = document.getElementById("btnTambah");

const formMandor = document.getElementById("formMandor");
const modalMandorElement =
    document.getElementById("modalMandor");

const modalTitle =
    document.getElementById("modalTitle");


/* =====================================================
   CEK ELEMENT
===================================================== */

console.log("sidebar =", sidebar);
console.log("main =", main);
console.log("toggle =", toggle);
console.log("btnTambah =", btnTambah);
console.log("modalMandor =", modalMandorElement);
console.log("formMandor =", formMandor);


/* =====================================================
   BOOTSTRAP MODAL
===================================================== */

let modalMandor = null;

if (
    modalMandorElement &&
    typeof bootstrap !== "undefined"
) {

    modalMandor =
        new bootstrap.Modal(
            modalMandorElement
        );

} else {

    console.error(
        "Bootstrap atau modalMandor tidak ditemukan."
    );

}

/* =====================================================
   TAMBAH MANDOR
===================================================== */

if (btnTambah) {

    btnTambah.addEventListener(
        "click",
        function () {

            console.log(
                "Tombol Tambah Mandor diklik"
            );

            editIndex = -1;

            modalTitle.textContent =
                "Tambah Mandor";

            formMandor.reset();

            if (modalMandor) {

                modalMandor.show();

            } else {

                console.error(
                    "Modal Mandor belum tersedia."
                );

            }

        }
    );

} else {

    console.error(
        "Tombol #btnTambah tidak ditemukan."
    );

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
   LOAD SIDEBAR
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
   LOCAL STORAGE
===================================================== */

const STORAGE_KEY = "mandor";


/* =====================================================
   DATA MANDOR
===================================================== */

let dataMandor =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];


/* =====================================================
   INDEX EDIT
===================================================== */

let editIndex = -1;


/* =====================================================
   SIMPAN DATA
===================================================== */

function simpanData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dataMandor)
    );

}


/* =====================================================
   TAMPIL TOTAL MANDOR
===================================================== */

function tampilTotalMandor() {

    totalMandor.textContent =
        dataMandor.length;

}


/* =====================================================
   TAMPIL DATA
===================================================== */

function tampilData(data = dataMandor) {

    tbodyMandor.innerHTML = "";


    /* =========================
       DATA KOSONG
    ========================= */

    if (data.length === 0) {

        tbodyMandor.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="text-center empty-data"
                >

                    <i
                        class="bi bi-inbox fs-2 d-block mb-2"
                    ></i>

                    Belum ada data mandor

                </td>

            </tr>

        `;

        return;

    }


    /* =========================
       DATA ADA
    ========================= */

    data.forEach(function (mandor, index) {

        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td class="text-center">
                ${index + 1}
            </td>

            <td>
                <span class="fw-semibold">
                    ${escapeHTML(mandor.id)}
                </span>
            </td>

            <td>
                ${escapeHTML(mandor.nama)}
            </td>

            <td class="text-center">

                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm btn-action me-1"
                    onclick="editMandor(${mandor.index})"
                    title="Edit"
                >

                    <i class="bi bi-pencil"></i>

                </button>


                <button
                    type="button"
                    class="btn btn-outline-danger btn-sm btn-action"
                    onclick="hapusMandor(${mandor.index})"
                    title="Hapus"
                >

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        `;


        tbodyMandor.appendChild(tr);

    });

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


/* =====================================================
   TAMBAHKAN INDEX ASLI
===================================================== */

function getDataWithIndex(data) {

    return data.map(function (item) {

        const index =
            dataMandor.indexOf(item);

        return {
            ...item,
            index: index
        };

    });

}


/* =====================================================
   RENDER DATA
===================================================== */

function renderData() {

    tampilData(
        getDataWithIndex(dataMandor)
    );

    tampilTotalMandor();

}


/* =====================================================
   TAMBAH MANDOR
===================================================== */
/* =====================================================
   TAMPIL DATA AWAL
===================================================== */

renderData();

document.getElementById("btnTambah").addEventListener("click", function () {

    console.log("TOMBOL TAMBAH DIKLIK");

    editIndex = -1;

    document.getElementById("modalTitle").textContent =
        "Tambah Mandor";

    document.getElementById("formMandor").reset();

    modalMandor.show();

});


/* =====================================================
   SIMPAN MANDOR
===================================================== */

formMandor.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const id =
            document
                .getElementById("idMandor")
                .value
                .trim();


        const nama =
            document
                .getElementById("namaMandor")
                .value
                .trim();


        /* =========================
           VALIDASI
        ========================= */

        if (
            id === "" ||
            nama === ""
        ) {

            alert(
                "ID Mandor dan Nama Mandor harus diisi."
            );

            return;

        }


        /* =========================
           CEK DUPLIKAT
        ========================= */

        const duplicate =
            dataMandor.some(
                function (item, index) {

                    return (
                        item.id.toLowerCase() ===
                        id.toLowerCase() &&
                        index !== editIndex
                    );

                }
            );


        if (duplicate) {

            alert(
                "ID Mandor sudah digunakan."
            );

            return;

        }


        /* =========================
           EDIT
        ========================= */

        if (editIndex !== -1) {

            dataMandor[editIndex] = {

                id: id,
                nama: nama

            };

        }


        /* =========================
           TAMBAH
        ========================= */

        else {

            dataMandor.push({

                id: id,
                nama: nama

            });

        }


        /* =========================
           SIMPAN
        ========================= */

        simpanData();

        renderData();

        modalMandor.hide();

        formMandor.reset();

        editIndex = -1;

    }
);


/* =====================================================
   EDIT MANDOR
===================================================== */

function editMandor(index) {

    const data =
        dataMandor[index];


    if (!data) {
        return;
    }


    editIndex = index;


    document
        .getElementById("idMandor")
        .value =
        data.id;


    document
        .getElementById("namaMandor")
        .value =
        data.nama;


    modalTitle.textContent =
        "Edit Mandor";


    modalMandor.show();

}


/* =====================================================
   HAPUS MANDOR
===================================================== */

function hapusMandor(index) {

    const data =
        dataMandor[index];


    if (!data) {
        return;
    }


    const konfirmasi =
        confirm(
            `Hapus mandor "${data.nama}"?`
        );


    if (!konfirmasi) {
        return;
    }


    dataMandor.splice(
        index,
        1
    );


    simpanData();

    renderData();

}


/* =====================================================
   PENCARIAN
===================================================== */

searchMandor.addEventListener(
    "input",
    function () {

        const keyword =
            this.value
                .toLowerCase()
                .trim();


        if (keyword === "") {

            renderData();

            return;

        }


        const hasil =
            dataMandor.filter(
                function (item) {

                    return (

                        item.id
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        item.nama
                            .toLowerCase()
                            .includes(keyword)

                    );

                }
            );


        tampilData(
            getDataWithIndex(hasil)
        );

    }
);


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
                "login.html";

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
   DEBUG
===================================================== */

console.log(
    "Data Mandor:",
    dataMandor
);

console.log(
    "Total Mandor:",
    dataMandor.length
);