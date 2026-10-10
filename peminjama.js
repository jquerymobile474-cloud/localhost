// ==========================================
// PEMINJAMAN.JS
// ==========================================


// ==========================================
// CEK LOGIN
// ==========================================

// Jika nanti ingin mengaktifkan proteksi login,
// buka komentar di bawah.

// if (sessionStorage.getItem("login") !== "true") {
//     window.location.href = "login.html";
// }


// ==========================================
// USER INFO
// ==========================================

const namaUserPeminjaman =
    document.getElementById("namaUser");

const levelUserPeminjaman =
    document.getElementById("levelUser");

const namaPeminjaman =
    sessionStorage.getItem("nama") || "Administrator";

const levelPeminjaman =
    sessionStorage.getItem("level") || "Admin";


if (namaUserPeminjaman) {
    namaUserPeminjaman.textContent = namaPeminjaman;
}

if (levelUserPeminjaman) {
    levelUserPeminjaman.textContent = levelPeminjaman;
}


// ==========================================
// LOGOUT
// ==========================================

const logoutBtnPeminjaman =
    document.getElementById("logoutBtn");

if (logoutBtnPeminjaman) {

    logoutBtnPeminjaman.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            sessionStorage.clear();

            window.location.href = "login.html";

        }
    );

}


// ==========================================
// SIDEBAR
// ==========================================

const sidebarPeminjaman =
    document.getElementById("sidebar");

const mainPeminjaman =
    document.getElementById("main");

const togglePeminjaman =
    document.getElementById("toggleSidebar");


if (
    sidebarPeminjaman &&
    mainPeminjaman
) {

    if (
        localStorage.getItem("sidebar") === "close"
    ) {

        sidebarPeminjaman.classList.add("collapsed");

        mainPeminjaman.classList.add("expand");

    }

}


if (togglePeminjaman) {

    togglePeminjaman.addEventListener(
        "click",
        function () {

            sidebarPeminjaman.classList.toggle(
                "collapsed"
            );

            mainPeminjaman.classList.toggle(
                "expand"
            );


            if (
                sidebarPeminjaman.classList.contains(
                    "collapsed"
                )
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

        }
    );

}


// ==========================================
// TOOLTIP
// ==========================================

if (typeof bootstrap !== "undefined") {

    const tooltipTriggerList =
        document.querySelectorAll(
            '[data-bs-toggle="tooltip"]'
        );

    tooltipTriggerList.forEach(
        function (el) {

            new bootstrap.Tooltip(el);

        }
    );

}


// ==========================================
// ELEMENT PEMINJAMAN
// ==========================================

const formPeminjaman =
    document.getElementById("formPeminjaman");

const anggotaSelect =
    document.getElementById("anggota");

const bukuSelect =
    document.getElementById("buku");

const nisInput =
    document.getElementById("nis");

const namaSiswaInput =
    document.getElementById("namaSiswa");

const kodeBukuInput =
    document.getElementById("kodeBuku");

const judulBukuInput =
    document.getElementById("judulBuku");

const noPeminjamanInput =
    document.getElementById("noPeminjaman");

const tanggalPinjamInput =
    document.getElementById("tanggalPinjam");

const tanggalKembaliInput =
    document.getElementById("tanggalKembali");

const tbodyPeminjaman =
    document.getElementById("tbodyPeminjaman");

const searchPeminjaman =
    document.getElementById("searchPeminjaman");

const btnTambahPeminjaman =
    document.getElementById(
        "btnTambahPeminjaman"
    );

const modalPeminjamanElement =
    document.getElementById(
        "modalPeminjaman"
    );


// ==========================================
// MODAL
// ==========================================

let modalPeminjaman = null;

if (
    modalPeminjamanElement &&
    typeof bootstrap !== "undefined"
) {

    modalPeminjaman =
        new bootstrap.Modal(
            modalPeminjamanElement
        );

}


// ==========================================
// DATA ANGGOTA
// ==========================================

let dataAnggota = [];

try {

    dataAnggota =
        JSON.parse(
            localStorage.getItem("dataAnggota")
        ) || [];


    if (!Array.isArray(dataAnggota)) {
        dataAnggota = [];
    }

} catch (error) {

    console.error(
        "Data anggota rusak:",
        error
    );

    dataAnggota = [];

}


// ==========================================
// DATA BUKU
// ==========================================

let dataBuku = [];

try {

    dataBuku =
        JSON.parse(
            localStorage.getItem("dataBuku")
        ) || [];


    if (!Array.isArray(dataBuku)) {
        dataBuku = [];
    }

} catch (error) {

    console.error(
        "Data buku rusak:",
        error
    );

    dataBuku = [];

}


// ==========================================
// DATA PEMINJAMAN
// ==========================================

let dataPeminjaman = [];

try {

    dataPeminjaman =
        JSON.parse(
            localStorage.getItem(
                "dataPeminjaman"
            )
        ) || [];


    if (!Array.isArray(dataPeminjaman)) {
        dataPeminjaman = [];
    }

} catch (error) {

    console.error(
        "Data peminjaman rusak:",
        error
    );

    dataPeminjaman = [];

}


// ==========================================
// TAMPILKAN ANGGOTA
// ==========================================

function tampilkanAnggota() {

    if (!anggotaSelect) {
        return;
    }


    anggotaSelect.innerHTML = `
        <option value="">
            -- Pilih Anggota --
        </option>
    `;


    dataAnggota.forEach(
        function (anggota) {

            if (
                anggota.status &&
                anggota.status !== "Aktif"
            ) {
                return;
            }


            const option =
                document.createElement("option");


            option.value =
                anggota.idAnggota;


            option.textContent =
                `${anggota.idAnggota} - ${anggota.nis} - ${anggota.namaSiswa}`;


            anggotaSelect.appendChild(
                option
            );

        }
    );


    console.log(
        "Anggota berhasil ditampilkan:",
        dataAnggota.length
    );

}


// ==========================================
// TAMPILKAN BUKU
// ==========================================

function tampilkanBuku() {

    if (!bukuSelect) {
        return;
    }


    bukuSelect.innerHTML = `
        <option value="">
            -- Pilih Buku --
        </option>
    `;


    dataBuku.forEach(
        function (buku) {

            const stok =
                Number(buku.stok) || 0;


            // Buku dengan stok 0 tidak bisa dipinjam
            if (stok <= 0) {
                return;
            }


            const option =
                document.createElement("option");


            option.value =
                buku.kode;


            option.textContent =
                `${buku.kode} - ${buku.judul} (Stok: ${stok})`;


            bukuSelect.appendChild(
                option
            );

        }
    );


    console.log(
        "Buku berhasil ditampilkan:",
        dataBuku.length
    );

}


// ==========================================
// PILIH ANGGOTA
// ==========================================

if (anggotaSelect) {

    anggotaSelect.addEventListener(
        "change",
        function () {

            const idAnggota =
                this.value;


            const anggota =
                dataAnggota.find(
                    function (item) {

                        return (
                            item.idAnggota ===
                            idAnggota
                        );

                    }
                );


            if (!anggota) {

                nisInput.value = "";

                namaSiswaInput.value = "";

                return;

            }


            nisInput.value =
                anggota.nis || "";

            namaSiswaInput.value =
                anggota.namaSiswa || "";

        }
    );

}


// ==========================================
// PILIH BUKU
// ==========================================

if (bukuSelect) {

    bukuSelect.addEventListener(
        "change",
        function () {

            const kode =
                this.value;


            const buku =
                dataBuku.find(
                    function (item) {

                        return (
                            item.kode ===
                            kode
                        );

                    }
                );


            if (!buku) {

                kodeBukuInput.value = "";

                judulBukuInput.value = "";

                return;

            }


            kodeBukuInput.value =
                buku.kode || "";

            judulBukuInput.value =
                buku.judul || "";

        }
    );

}


// ==========================================
// NOMOR PEMINJAMAN OTOMATIS
// ==========================================

function generateNoPeminjaman() {

    const nomor =
        dataPeminjaman.length + 1;


    return (
        "PJM" +
        String(nomor).padStart(
            3,
            "0"
        )
    );

}


// ==========================================
// TANGGAL HARI INI
// ==========================================

function tanggalWaktuSekarang() {

    const sekarang = new Date();

    const tahun =        sekarang.getFullYear();

    const bulan =        String(            sekarang.getMonth() + 1        ).padStart(2, "0");

    const tanggal =        String(            sekarang.getDate()        ).padStart(2, "0");

    const jam =        String(            sekarang.getHours()        ).padStart(2, "0");

    const menit =        String(            sekarang.getMinutes()        ).padStart(2, "0");

    return (
        tahun +
        "-" +
        bulan +
        "-" +
        tanggal +
        "T" +
        jam +
        ":" +
        menit
    );
}

// ==========================================
// TOMBOL TAMBAH
// ==========================================

if (btnTambahPeminjaman) {

    btnTambahPeminjaman.addEventListener(
        "click",
        function () {

            if (formPeminjaman) {
                formPeminjaman.reset();
            }


            if (noPeminjamanInput) {

                noPeminjamanInput.value =
                    generateNoPeminjaman();

            }


            if (tanggalPinjamInput) {

                tanggalPinjamInput.value =
    		   tanggalWaktuSekarang();

            }


            if (nisInput) {
                nisInput.value = "";
            }

            if (namaSiswaInput) {
                namaSiswaInput.value = "";
            }

            if (kodeBukuInput) {
                kodeBukuInput.value = "";
            }

            if (judulBukuInput) {
                judulBukuInput.value = "";
            }

        }
    );

}


// ==========================================
// SIMPAN PEMINJAMAN
// ==========================================

if (formPeminjaman) {

    formPeminjaman.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const idAnggota =
                anggotaSelect.value;

            const kodeBuku =
                bukuSelect.value;


            if (!idAnggota) {

                alert(
                    "Silakan pilih anggota."
                );

                return;

            }


            if (!kodeBuku) {

                alert(
                    "Silakan pilih buku."
                );

                return;

            }


            const anggota =
                dataAnggota.find(
                    function (item) {

                        return (
                            item.idAnggota ===
                            idAnggota
                        );

                    }
                );


            const buku =
                dataBuku.find(
                    function (item) {

                        return (
                            item.kode ===
                            kodeBuku
                        );

                    }
                );


            if (!anggota) {

                alert(
                    "Data anggota tidak ditemukan."
                );

                return;

            }


            if (!buku) {

                alert(
                    "Data buku tidak ditemukan."
                );

                return;

            }


            const stok =
                Number(buku.stok) || 0;


            if (stok <= 0) {

                alert(
                    "Stok buku sudah habis."
                );

                return;

            }


            const peminjaman = {

    noPeminjaman:
        noPeminjamanInput.value,

    idAnggota:
        anggota.idAnggota,

    nis:
        anggota.nis,

    namaSiswa:
        anggota.namaSiswa,

    kodeBuku:
        buku.kode,

    judulBuku:
        buku.judul,

    tanggalPinjam:
        tanggalPinjamInput.value,

    tanggalJatuhTempo:
        tanggalKembaliInput.value,

    tanggalKembali:
        "",

    status:
        "Dipinjam"

};


            dataPeminjaman.push(
                peminjaman
            );


            // Kurangi stok buku
            buku.stok =
                stok - 1;


            localStorage.setItem(
                "dataPeminjaman",
                JSON.stringify(
                    dataPeminjaman
                )
            );


            localStorage.setItem(
                "dataBuku",
                JSON.stringify(
                    dataBuku
                )
            );


            tampilDataPeminjaman();


            tampilkanBuku();


            formPeminjaman.reset();


            if (modalPeminjaman) {
                modalPeminjaman.hide();
            }


            alert(
                "Peminjaman berhasil disimpan."
            );

        }
    );

}

function formatTanggalWaktu(nilai) {

    if (!nilai) {
        return "-";
    }

    const bagian =
        nilai.split("T");

    if (bagian.length !== 2) {
        return nilai;
    }

    const tanggal =
        bagian[0].split("-");

    const waktu =
        bagian[1];


    return (
        tanggal[2] +
        "-" +
        tanggal[1] +
        "-" +
        tanggal[0] +
        " " +
        waktu
    );
}

// ==========================================
// TAMPIL DATA PEMINJAMAN
// ==========================================

function tampilDataPeminjaman(
    data = dataPeminjaman
) {

    if (!tbodyPeminjaman) {
        return;
    }


    tbodyPeminjaman.innerHTML = "";


    if (data.length === 0) {

        tbodyPeminjaman.innerHTML = `
            <tr>
                <td
                    colspan="11"
                    class="text-center empty-data"
                >
                    <i class="bi bi-journal-x fs-3 d-block mb-2"></i>
                    Belum ada data peminjaman
                </td>
            </tr>
        `;

        return;

    }

//data.forEach(function (pinjam, index) {
    data.slice().reverse().forEach(function (pinjam, index) {
	    const indexAsli = dataPeminjaman.indexOf(pinjam);
            const status = pinjam.status || "Dipinjam";

            tbodyPeminjaman.innerHTML += `
                <tr>
                    <td class="text-center">
                        ${index + 1}
                    </td>

                    <td>
                        ${pinjam.noPeminjaman || "-"}
                    </td>

                    <td>
                        ${pinjam.idAnggota || "-"}
                    </td>

                    <td>
                        ${pinjam.nis || "-"}
                    </td>

                    <td>
                        <strong>
                            ${pinjam.namaSiswa || "-"}
                        </strong>
                    </td>

                    <td>
                        ${pinjam.kodeBuku || "-"}
                    </td>

                    <td>
                        ${pinjam.judulBuku || "-"}
                    </td>

                    <td>
                        ${formatTanggalWaktu(pinjam.tanggalPinjam)}
                    </td>

                    <td>
                        ${formatTanggalWaktu(pinjam.tanggalKembali)}
                    </td>

                    <td class="text-center">
                        <span class="badge-status">
                            ${status}
                        </span>
                    </td>

                    <td class="text-center">

                        <button type="button" class="btn btn-danger btn-sm btn-action"
                            //onclick="hapusPeminjaman(${dataPeminjaman.indexOf(pinjam)})"
			    onclick="hapusPeminjaman(${indexAsli})"
                            title="Hapus">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>  `; } );}


// ==========================================
// HAPUS PEMINJAMAN
// ==========================================

function hapusPeminjaman(index) {

    const peminjaman =
        dataPeminjaman[index];


    if (!peminjaman) {
        return;
    }


    const konfirmasi =
        confirm(
            `Hapus peminjaman "${peminjaman.noPeminjaman}"?`
        );


    if (!konfirmasi) {
        return;
    }


    // Kembalikan stok buku
    const buku =
        dataBuku.find(
            function (item) {

                return (
                    item.kode ===
                    peminjaman.kodeBuku
                );

            }
        );


    if (buku) {

        buku.stok =
            (Number(buku.stok) || 0) + 1;

    }


    dataPeminjaman.splice(
        index,
        1
    );


    localStorage.setItem(
        "dataPeminjaman",
        JSON.stringify(
            dataPeminjaman
        )
    );


    localStorage.setItem(
        "dataBuku",
        JSON.stringify(
            dataBuku
        )
    );


    tampilDataPeminjaman();

    tampilkanBuku();

}


// ==========================================
// SEARCH
// ==========================================

if (searchPeminjaman) {

    searchPeminjaman.addEventListener(
        "input",
        function () {

            const keyword =
                this.value
                    .toLowerCase()
                    .trim();


            const hasil =
                dataPeminjaman.filter(
                    function (pinjam) {

                        return (

                            String(
                                pinjam.noPeminjaman || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                pinjam.idAnggota || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                pinjam.nis || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                pinjam.namaSiswa || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                pinjam.kodeBuku || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                pinjam.judulBuku || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                        );

                    }
                );


            tampilDataPeminjaman(
                hasil
            );

        }
    );

}


// ==========================================
// JALANKAN SAAT HALAMAN DIBUKA
// ==========================================

tampilkanAnggota();

tampilkanBuku();

tampilDataPeminjaman();


// ==========================================
// DEBUG
// ==========================================

console.log(
    "================================="
);

console.log(
    "PEMINJAMAN.JS BERHASIL DIMUAT"
);

console.log(
    "Data Anggota:",
    dataAnggota
);

console.log(
    "Jumlah Anggota:",
    dataAnggota.length
);

console.log(
    "Data Buku:",
    dataBuku
);

console.log(
    "Jumlah Buku:",
    dataBuku.length
);

console.log(
    "Jumlah Peminjaman:",
    dataPeminjaman.length
);

console.log(
    "================================="
);