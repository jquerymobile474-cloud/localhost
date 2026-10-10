/* =====================================================
   MASTER USER
===================================================== */


/* =====================================================
   ELEMENT
===================================================== */

const sidebar =
    document.getElementById("sidebar");

const main =
    document.getElementById("main");

const toggle =
    document.getElementById("toggleSidebar");

const footer =
    document.getElementById("footer");

const namaUser =
    document.getElementById("namaUser");

const levelUser =
    document.getElementById("levelUser");

const avatarUser =
    document.getElementById("avatarUser");

const logoutBtn =
    document.getElementById("logoutBtn");

const tbodyUser =
    document.getElementById("tbodyUser");

const searchUser =
    document.getElementById("searchUser");

const btnTambah =
    document.getElementById("btnTambah");

const formUser =
    document.getElementById("formUser");

const modalElement =
    document.getElementById("modalUser");

const modalUser =
    new bootstrap.Modal(modalElement);

const modalTitle =
    document.getElementById("modalTitle");

const totalUser =
    document.getElementById("totalUser");

const totalAdmin =
    document.getElementById("totalAdmin");

const totalOperator =
    document.getElementById("totalOperator");

const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");


/* =====================================================
   USER LOGIN
===================================================== */

const nama =
    sessionStorage.getItem("nama") ||
    "Administrator";

const level =
    sessionStorage.getItem("level") ||
    "Admin";


namaUser.textContent =
    nama;

levelUser.textContent =
    level;


/* =====================================================
   AVATAR
===================================================== */

avatarUser.src =
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(nama) +
    "&background=0d6efd&color=fff";


/* =====================================================
   SIDEBAR STATE
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


/* =====================================================
   HAK AKSES
===================================================== */

if (level === "Operator") {

    document
        .querySelectorAll(".menu-admin")
        .forEach(function(menu) {

            menu.style.display =
                "none";

        });

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

const STORAGE_KEY =
    "users";


/* =====================================================
   DATA USER
===================================================== */

let dataUser =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];


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
        JSON.stringify(dataUser)
    );

}


/* =====================================================
   STATISTIK
===================================================== */

function updateStatistik() {

    const jumlahAdmin =
        dataUser.filter(
            function(user) {

                return user.level === "Admin";

            }
        ).length;


    const jumlahOperator =
        dataUser.filter(
            function(user) {

                return user.level === "Operator";

            }
        ).length;


    totalUser.textContent = dataUser.length;

    totalAdmin.textContent =
        jumlahAdmin;

    totalOperator.textContent =
        jumlahOperator;

}


/* =====================================================
   TAMPIL DATA
===================================================== */

function tampilData(
    data = dataUser
) {

    tbodyUser.innerHTML = "";


    updateStatistik();


    if (data.length === 0) {

        tbodyUser.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center empty-data"
                >

                    <i
                        class="bi bi-inbox fs-2 d-block mb-2"
                    ></i>

                    Belum ada data user

                </td>

            </tr>

        `;

        return;

    }


    data.forEach(
        function(user) {

            const index =
                dataUser.indexOf(user);


            const tr =
                document.createElement("tr");


            let badgeLevel = "";


            if (user.level === "Admin") {

                badgeLevel = `

                    <span class="badge-admin">

                        <i
                            class="bi bi-shield-check me-1"
                        ></i>

                        Admin

                    </span>

                `;

            } else {

                badgeLevel = `

                    <span class="badge-operator">

                        <i
                            class="bi bi-person-workspace me-1"
                        ></i>

                        Operator

                    </span>

                `;

            }


            tr.innerHTML = `

                <td class="text-center">
                    ${index + 1}
                </td>


                <td>

                    <span class="username-badge">

                        <i class="bi bi-person"></i>

                        ${escapeHTML(
                            user.username
                        )}

                    </span>

                </td>


                <td>

                    ${escapeHTML(
                        user.nama
                    )}

                </td>


                <td>

                    <span class="password-cell">

                        ••••••••

                    </span>

                </td>


                <td>

                    ${badgeLevel}

                </td>


                <td class="text-center">


                    <button
                        type="button"
                        class="btn btn-outline-primary btn-sm btn-action me-1"
                        onclick="editUser(${index})"
                        title="Edit"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-outline-danger btn-sm btn-action"
                        onclick="hapusUser(${index})"
                        title="Hapus"
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            `;


            tbodyUser.appendChild(tr);

        }
    );

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
   RENDER
===================================================== */

function renderData() {

    tampilData(
        dataUser
    );

}


/* =====================================================
   TAMBAH USER
===================================================== */

btnTambah.addEventListener(
    "click",
    function() {

        editIndex = -1;


        modalTitle.textContent =
            "Tambah User";


        formUser.reset();


        passwordInput.type =
            "password";


        togglePassword.innerHTML =
            '<i class="bi bi-eye"></i>';


        modalUser.show();

    }
);


/* =====================================================
   SIMPAN USER
===================================================== */

formUser.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const nama =
            document
                .getElementById("nama")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value
                .trim();


        const level =
            document
                .getElementById("level")
                .value;


        /* =========================
           VALIDASI
        ========================= */

        if (
            username === "" ||
            nama === "" ||
            password === "" ||
            level === ""
        ) {

            alert(
                "Semua data harus diisi."
            );

            return;

        }


        /* =========================
           CEK USERNAME DUPLIKAT
        ========================= */

        const duplicate =
            dataUser.some(
                function(item, index) {

                    return (

                        item.username
                            .toLowerCase() ===
                        username.toLowerCase()

                        &&

                        index !== editIndex

                    );

                }
            );


        if (duplicate) {

            alert(
                "Username sudah digunakan."
            );

            return;

        }


        /* =========================
           EDIT
        ========================= */

        if (editIndex !== -1) {

            dataUser[editIndex] = {

                username:
                    username,

                nama:
                    nama,

                password:
                    password,

                level:
                    level

            };

        }


        /* =========================
           TAMBAH
        ========================= */

        else {

            dataUser.push({

                username:
                    username,

                nama:
                    nama,

                password:
                    password,

                level:
                    level

            });

        }


        /* =========================
           SIMPAN
        ========================= */

        simpanData();

        renderData();

        modalUser.hide();

        formUser.reset();

        editIndex = -1;

    }
);


/* =====================================================
   EDIT USER
===================================================== */

function editUser(index) {

    const data =
        dataUser[index];


    if (!data) {

        return;

    }


    editIndex =
        index;


    document
        .getElementById("username")
        .value =
        data.username;


    document
        .getElementById("nama")
        .value =
        data.nama;


    document
        .getElementById("password")
        .value =
        data.password;


    document
        .getElementById("level")
        .value =
        data.level;


    passwordInput.type =
        "password";


    togglePassword.innerHTML =
        '<i class="bi bi-eye"></i>';


    modalTitle.textContent =
        "Edit User";


    modalUser.show();

}


/* =====================================================
   HAPUS USER
===================================================== */

function hapusUser(index) {

    const data =
        dataUser[index];


    if (!data) {

        return;

    }


    /* =========================
       CEK USER YANG SEDANG LOGIN
    ========================= */

    const usernameLogin =
        sessionStorage.getItem(
            "username"
        );


    if (
        usernameLogin &&
        data.username === usernameLogin
    ) {

        alert(
            "User yang sedang login tidak dapat dihapus."
        );

        return;

    }


    /* =========================
       KONFIRMASI
    ========================= */

    const konfirmasi =
        confirm(
            `Hapus user "${data.nama}"?`
        );


    if (!konfirmasi) {

        return;

    }


    dataUser.splice(
        index,
        1
    );


    simpanData();

    renderData();

}


/* =====================================================
   PENCARIAN
===================================================== */

searchUser.addEventListener(
    "input",
    function() {

        const keyword =
            this.value
                .toLowerCase()
                .trim();


        if (keyword === "") {

            renderData();

            return;

        }


        const hasil =
            dataUser.filter(
                function(item) {

                    return (

                        item.username
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        item.nama
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        item.level
                            .toLowerCase()
                            .includes(keyword)

                    );

                }
            );


        tampilData(
            hasil
        );

    }
);


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

togglePassword.addEventListener(
    "click",
    function() {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";


            togglePassword.innerHTML =
                '<i class="bi bi-eye-slash"></i>';

        } else {

            passwordInput.type =
                "password";


            togglePassword.innerHTML =
                '<i class="bi bi-eye"></i>';

        }

    }
);


/* =====================================================
   LOGOUT
===================================================== */

logoutBtn.addEventListener(
    "click",
    function(e) {

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


tooltipTriggerList.forEach(
    function(element) {

        new bootstrap.Tooltip(
            element
        );

    }
);


/* =====================================================
   TAMPIL DATA AWAL
===================================================== */

renderData();
```
