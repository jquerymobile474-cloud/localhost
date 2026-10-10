/* =====================================================
   MASTER KARYAWAN
===================================================== */


/* =====================================================
   CEK LOGIN
===================================================== */

/*if (sessionStorage.getItem("login") !== "true") {   window.location.href = "login.html";}*/



/* =====================================================
   ELEMENT
===================================================== */

const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const toggle = document.getElementById("toggleSidebar");

const footer = document.getElementById("footer");

const namaUser = document.getElementById("namaUser");
const levelUser = document.getElementById("levelUser");

const tbodyKaryawan = document.getElementById("tbodyKaryawan");

const searchKaryawan = document.getElementById("searchKaryawan");

const formKaryawan = document.getElementById("formKaryawan");

const modalKaryawanElement =
    document.getElementById("modalKaryawan");

const modalKaryawan =
    new bootstrap.Modal(modalKaryawanElement);

const modalTitle =
    document.getElementById("modalTitle");

const btnTambah =
    document.getElementById("btnTambah");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =====================================================
   USER LOGIN
===================================================== */

const nama =
    sessionStorage.getItem("nama") ||
    "Administrator";

const level =
    sessionStorage.getItem("level") ||
    "Admin";


namaUser.textContent = nama;
levelUser.textContent = level;


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


setSidebarState();


/* =====================================================
   TOGGLE SIDEBAR
===================================================== */

toggle.onclick = function () {

    sidebar.classList.toggle("collapsed");
    main.classList.toggle("expand");

    if (footer) {
        footer.classList.toggle("expand");
    }


    if (sidebar.classList.contains("collapsed")) {

        localStorage.setItem("sidebar", "close");

    } else {

        localStorage.setItem("sidebar", "open");

    }

};


/* =====================================================
   HAK AKSES
===================================================== */

if (level === "Operator") {

    document
        .querySelectorAll(".menu-admin")
        .forEach(menu => {

            menu.style.display = "none";

        });

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

const STORAGE_KEY = "karyawan";


/* =====================================================
   DATA KARYAWAN
===================================================== */

let dataKaryawan =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


/* =====================================================
   EDIT INDEX
===================================================== */

let editIndex = -1;


/* =====================================================
   SIMPAN LOCAL STORAGE
===================================================== */

function simpanData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dataKaryawan)
    );

}


/* =====================================================
   TAMPIL DATA
===================================================== */

function tampilData(data = dataKaryawan) {

    tbodyKaryawan.innerHTML = "";


    if (data.length === 0) {

        tbodyKaryawan.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="text-center empty-data"
                >
                    <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                    Belum ada data karyawan
                </td>
            </tr>
        `;

        return;

    }


    data.forEach((karyawan, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td class="text-center">
                ${index + 1}
            </td>

            <td>
                <span class="fw-semibold">
                    ${escapeHTML(karyawan.id)}
                </span>
            </td>

            <td>
                ${escapeHTML(karyawan.nama)}
            </td>

            <td>
                <span class="badge-mandor">
                    ${escapeHTML(karyawan.idMandor)}
                </span>
            </td>

            <td>
                ${escapeHTML(karyawan.namaMandor)}
            </td>

            <td class="text-center">

                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm btn-action me-1"
                    onclick="editKaryawan(${karyawan.index})"
                    title="Edit"
                >
                    <i class="bi bi-pencil"></i>
                </button>

                <button
                    type="button"
                    class="btn btn-outline-danger btn-sm btn-action"
                    onclick="hapusKaryawan(${karyawan.index})"
                    title="Hapus"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </td>

        `;


        tbodyKaryawan.appendChild(tr);

    });

}


/* =====================================================
   ESCAPE HTML
   Mencegah HTML injection
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


/* =====================================================
   INDEX DATA
===================================================== */

function getDataWithIndex(data) {

    return data.map((item, index) => {

        return {
            ...item,
            index: index
        };

    });

}


/* =====================================================
   RENDER ULANG
===================================================== */

function renderData() {

    const data =
        getDataWithIndex(dataKaryawan);

    tampilData(data);

}


/* =====================================================
   TAMBAH KARYAWAN
===================================================== */

btnTambah.addEventListener("click", function () {

    editIndex = -1;

    modalTitle.textContent =
        "Tambah Karyawan";

    formKaryawan.reset();

});


/* =====================================================
   SIMPAN DATA
===================================================== */

formKaryawan.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const id =
            document
                .getElementById("idKaryawan")
                .value
                .trim();

        const nama =
            document
                .getElementById("namaKaryawan")
                .value
                .trim();

        const idMandor =
            document
                .getElementById("idMandor")
                .value
                .trim();

        const namaMandor =
            document
                .getElementById("namaMandor")
                .value
                .trim();


        /* =========================
           VALIDASI
        ========================= */

        if (
            id === "" ||
            nama === "" ||
            idMandor === "" ||
            namaMandor === ""
        ) {

            alert(
                "Semua data harus diisi."
            );

            return;

        }


        /* =========================
           CEK ID DUPLIKAT
        ========================= */

        const duplicate =
            dataKaryawan.some(
                (item, index) => {

                    return (
                        item.id.toLowerCase() ===
                        id.toLowerCase() &&
                        index !== editIndex
                    );

                }
            );


        if (duplicate) {

            alert(
                "ID Karyawan sudah digunakan."
            );

            return;

        }


        /* =========================
           EDIT
        ========================= */

        if (editIndex !== -1) {

            dataKaryawan[editIndex] = {

                id: id,
                nama: nama,
                idMandor: idMandor,
                namaMandor: namaMandor

            };


        }

        /* =========================
           TAMBAH
        ========================= */

        else {

            dataKaryawan.push({

                id: id,
                nama: nama,
                idMandor: idMandor,
                namaMandor: namaMandor

            });

        }


        /* =========================
           SIMPAN
        ========================= */

        simpanData();

        renderData();

        modalKaryawan.hide();

        formKaryawan.reset();

        editIndex = -1;

    }
);


/* =====================================================
   EDIT KARYAWAN
===================================================== */

function editKaryawan(index) {

    const data =
        dataKaryawan[index];


    if (!data) {
        return;
    }


    editIndex = index;


    document
        .getElementById("idKaryawan")
        .value = data.id;

    document
        .getElementById("namaKaryawan")
        .value = data.nama;

    document
        .getElementById("idMandor")
        .value = data.idMandor;

    document
        .getElementById("namaMandor")
        .value = data.namaMandor;


    modalTitle.textContent =
        "Edit Karyawan";


    modalKaryawan.show();

}


/* =====================================================
   HAPUS KARYAWAN
===================================================== */

function hapusKaryawan(index) {

    const data =
        dataKaryawan[index];


    if (!data) {
        return;
    }


    const konfirmasi =
        confirm(
            `Hapus karyawan "${data.nama}"?`
        );


    if (!konfirmasi) {
        return;
    }


    dataKaryawan.splice(index, 1);

    simpanData();

    renderData();

}


/* =====================================================
   PENCARIAN
===================================================== */

searchKaryawan.addEventListener(
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
            dataKaryawan.filter(
                item => {

                    return (

                        item.id
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        item.nama
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        item.idMandor
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        item.namaMandor
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

logoutBtn.addEventListener(
    "click",
    function (e) {

        e.preventDefault();

        sessionStorage.clear();

        window.location.href =
            "login.html";

    }
);


/* =====================================================
   TOOLTIP
===================================================== */

const tooltipTriggerList =
    document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );


[
    ...tooltipTriggerList
].map(
    el => new bootstrap.Tooltip(el)
);


/* =====================================================
   TAMPILKAN DATA AWAL
===================================================== */

renderData();