// ==========================================
// PENGEMBALIAN.JS
// ==========================================


// ==========================================
// USER INFO
// ==========================================

const namaUserPengembalian =
    document.getElementById("namaUser");

const levelUserPengembalian =
    document.getElementById("levelUser");

if (namaUserPengembalian) {
    namaUserPengembalian.textContent =
        sessionStorage.getItem("nama") || "Administrator";
}

if (levelUserPengembalian) {
    levelUserPengembalian.textContent =
        sessionStorage.getItem("level") || "Admin";
}


// ==========================================
// LOGOUT
// ==========================================

const logoutBtnPengembalian =
    document.getElementById("logoutBtn");

if (logoutBtnPengembalian) {

    logoutBtnPengembalian.addEventListener(
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

const sidebarPengembalian =
    document.getElementById("sidebar");

const mainPengembalian =
    document.getElementById("main");

const togglePengembalian =
    document.getElementById("toggleSidebar");


if (
    sidebarPengembalian &&
    mainPengembalian
) {

    if (
        localStorage.getItem("sidebar") === "close"
    ) {

        sidebarPengembalian.classList.add("collapsed");

        mainPengembalian.classList.add("expand");

    }

}


if (togglePengembalian) {

    togglePengembalian.addEventListener(
        "click",
        function () {

            sidebarPengembalian.classList.toggle(
                "collapsed"
            );

            mainPengembalian.classList.toggle(
                "expand"
            );


            if (
                sidebarPengembalian.classList.contains(
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
// ELEMENT
// ==========================================

const tbodyPengembalian =
    document.getElementById(
        "tbodyPengembalian"
    );

const searchPengembalian =
    document.getElementById(
        "searchPengembalian"
    );


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
// DATA BUKU
// ==========================================

let dataBuku = [];

try {

    dataBuku =
        JSON.parse(
            localStorage.getItem(
                "dataBuku"
            )
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
// TANGGAL HARI INI
// ==========================================

function tanggalHariIni() {

    const sekarang = new Date();

    const tahun =
        sekarang.getFullYear();

    const bulan =
        String(
            sekarang.getMonth() + 1
        ).padStart(2, "0");

    const tanggal =
        String(
            sekarang.getDate()
        ).padStart(2, "0");


    return (
        tahun +
        "-" +
        bulan +
        "-" +
        tanggal
    );

}


// ==========================================
// FORMAT TANGGAL
// ==========================================

function formatTanggal(tanggal) {

    if (!tanggal) {
        return "-";
    }


    const bagian =
        String(tanggal).split("-");


    if (bagian.length !== 3) {
        return tanggal;
    }


    return (
        bagian[2] +
        "-" +
        bagian[1] +
        "-" +
        bagian[0]
    );

}


// ==========================================
// TAMPIL DATA PENGEMBALIAN
// ==========================================

function tampilDataPengembalian(
    data = dataPeminjaman
) {

    if (!tbodyPengembalian) {

        console.error(
            "tbodyPengembalian tidak ditemukan!"
        );

        return;

    }


    tbodyPengembalian.innerHTML = "";


    // ======================================
    // JIKA DATA KOSONG
    // ======================================

    if (
        !Array.isArray(data) ||
        data.length === 0
    ) {

        tbodyPengembalian.innerHTML = `
            <tr>
                <td
                    colspan="12"
                    class="text-center empty-data"
                >
                    <i class="bi bi-journal-x fs-3 d-block mb-2"></i>

                    Belum ada data peminjaman
                </td>
            </tr>
        `;

        return;

    }


    // ======================================
    // TAMPIL SEMUA DATA
    // ======================================

    //data.forEach(        function (pinjam) {
data.slice().reverse().forEach(    function (pinjam, index) {

            const indexAsli =                dataPeminjaman.indexOf(                    pinjam                );

            const status =                pinjam.status ||                "Dipinjam";


// ==========================================
// KOLOM TGL KEMBALI
// ==========================================

let kolomTanggalKembali = "-";

if (status === "Dikembalikan") {

    kolomTanggalKembali =
        formatTanggal(
            pinjam.tanggalDikembalikan
        );

}


// ==========================================
// KOLOM AKSI
// ==========================================

let kolomAksi = "";

if (status === "Dipinjam") {

    kolomAksi = `
        <button
            type="button"
            class="btn btn-success btn-sm btn-action"
            onclick="kembalikanBuku(${indexAsli})"
            title="Kembalikan Buku"
        >
            <i class="bi bi-arrow-return-left me-1"></i>
            Kembalikan
        </button>
    `;

}


            // ==================================
            // KOLOM STATUS
            // ==================================

            let kolomStatus = "";


            if (
                status === "Dikembalikan"
            ) {

                kolomStatus = `
                    <span class="badge-dikembalikan">
                        Dikembalikan
                    </span>
                `;

            } else {

                kolomStatus = `
                    <span class="badge-dipinjam">
                        Dipinjam
                    </span>
                `;

            }


            // ==================================
            // BARIS TABEL
            // ==================================

            tbodyPengembalian.innerHTML += `

                <tr>

                    <!-- NO -->

                    <td class="text-center">
                        ${index + 1}
                    </td>


                    <!-- NO PEMINJAMAN -->

                    <td>
                        ${pinjam.noPeminjaman || "-"}
                    </td>


                    <!-- ID ANGGOTA -->

                    <td>
                        ${pinjam.idAnggota || "-"}
                    </td>


                    <!-- NIS -->

                    <td>
                        ${pinjam.nis || "-"}
                    </td>


                    <!-- NAMA SISWA -->

                    <td>
                        <strong>
                            ${pinjam.namaSiswa || "-"}
                        </strong>
                    </td>


                    <!-- KODE BUKU -->

                    <td>
                        ${pinjam.kodeBuku || "-"}
                    </td>


                    <!-- JUDUL BUKU -->

                    <td>
                        ${pinjam.judulBuku || "-"}
                    </td>


                    <!-- TGL PINJAM -->

                    <td>
                        ${formatTanggal(
                            pinjam.tanggalPinjam
                        )}
                    </td>


                    <!-- JATUH TEMPO -->

                    <td>
                        ${formatTanggal(
                            pinjam.tanggalKembali
                        )}
                    </td>


                    <!-- TGL KEMBALI -->

                    <td class="text-center">

                        ${kolomTanggalKembali}

                    </td>


                    <!-- STATUS -->

                    <td class="text-center">

                        ${kolomStatus}

                    </td>


                    <!-- AKSI -->

                    <td class="text-center">
			${kolomAksi}
                    </td>

                </tr>

            `;

        }
    );

}


// ==========================================
// PROSES KEMBALIKAN BUKU
// ==========================================

function kembalikanBuku(index) {

    const peminjaman =
        dataPeminjaman[index];


    if (!peminjaman) {

        alert(
            "Data peminjaman tidak ditemukan."
        );

        return;

    }


    // ======================================
    // CEK SUDAH DIKEMBALIKAN
    // ======================================

    if (
        peminjaman.status ===
        "Dikembalikan"
    ) {

        alert(
            "Buku ini sudah dikembalikan."
        );

        return;

    }


    // ======================================
    // KONFIRMASI
    // ======================================

    const konfirmasi =
        confirm(
            `Kembalikan buku "${peminjaman.judulBuku}" atas nama "${peminjaman.namaSiswa}"?`
        );


    if (!konfirmasi) {
        return;
    }


    // ======================================
    // CARI BUKU
    // ======================================

    const buku =
        dataBuku.find(
            function (item) {

                return (
                    item.kode ===
                    peminjaman.kodeBuku
                );

            }
        );


    // ======================================
    // TAMBAH STOK
    // ======================================

    if (buku) {

        buku.stok =
            (Number(buku.stok) || 0) + 1;

    }


    // ======================================
    // UPDATE STATUS
    // ======================================

    peminjaman.status =
        "Dikembalikan";


    // ======================================
    // ISI TANGGAL KEMBALI SEBENARNYA
    // ======================================

    peminjaman.tanggalDikembalikan =
        tanggalHariIni();


    // ======================================
    // SIMPAN PEMINJAMAN
    // ======================================

    localStorage.setItem(
        "dataPeminjaman",
        JSON.stringify(
            dataPeminjaman
        )
    );


    // ======================================
    // SIMPAN BUKU
    // ======================================

    localStorage.setItem(
        "dataBuku",
        JSON.stringify(
            dataBuku
        )
    );


    // ======================================
    // TAMPIL ULANG
    // ======================================

    tampilDataPengembalian();


    alert(
        "Buku berhasil dikembalikan."
    );

}


// ==========================================
// SEARCH
// ==========================================

if (searchPengembalian) {

    searchPengembalian.addEventListener(
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

                            ||

                            String(
                                pinjam.status || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                        );

                    }
                );


            tampilDataPengembalian(
                hasil
            );

        }
    );

}


// ==========================================
// TAMPIL SAAT HALAMAN DIBUKA
// ==========================================

tampilDataPengembalian();


// ==========================================
// DEBUG
// ==========================================

console.log(
    "================================="
);

console.log(
    "PENGEMBALIAN.JS BERHASIL DIMUAT"
);

console.log(
    "Data Peminjaman:",
    dataPeminjaman
);

console.log(
    "Jumlah Peminjaman:",
    dataPeminjaman.length
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
    "================================="
);