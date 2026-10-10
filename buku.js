/* =====================================================
   MASTER BUKU
===================================================== */


/* =====================================================
   DATA BUKU
===================================================== */

let dataBuku = [];


/* =====================================================
   LOAD DATA BUKU
===================================================== */

try {

    dataBuku =
        JSON.parse(
            localStorage.getItem("dataBuku")
        ) || [];


    // Pastikan data berbentuk array
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


/* =====================================================
   ELEMENT
===================================================== */

const formBuku =
    document.getElementById("formBuku");

const tbodyBuku =
    document.getElementById("tbodyBuku");

const searchBuku =
    document.getElementById("searchBuku");

const btnTambah =
    document.getElementById("btnTambah");

const modalBukuElement =
    document.getElementById("modalBuku");


/* =====================================================
   CEK ELEMENT
===================================================== */

if (!formBuku) {
    console.error("Element #formBuku tidak ditemukan.");
}

if (!tbodyBuku) {
    console.error("Element #tbodyBuku tidak ditemukan.");
}

if (!searchBuku) {
    console.error("Element #searchBuku tidak ditemukan.");
}

if (!btnTambah) {
    console.error("Element #btnTambah tidak ditemukan.");
}

if (!modalBukuElement) {
    console.error("Element #modalBuku tidak ditemukan.");
}


/* =====================================================
   MODAL
===================================================== */

let modalBuku = null;

if (modalBukuElement) {

    modalBuku =
        new bootstrap.Modal(
            modalBukuElement
        );

}


/* =====================================================
   INDEX EDIT
===================================================== */

let editIndex = -1;


/* =====================================================
   TAMPIL DATA
===================================================== */

function tampilData(data = dataBuku) {

    if (!tbodyBuku) {
        return;
    }


    tbodyBuku.innerHTML = "";


    /* =================================================
       DATA KOSONG
    ================================================= */

    if (data.length === 0) {

        tbodyBuku.innerHTML = `
            <tr>

                <td
                    colspan="9"
                    class="text-center empty-data"
                >

                    <i class="bi bi-book fs-3 d-block mb-2"></i>

                    Belum ada data buku

                </td>

            </tr>
        `;

        return;

    }


    /* =================================================
       DATA ADA
    ================================================= */

    data.forEach(function (buku, index) {

        const realIndex =
            dataBuku.indexOf(buku);


        tbodyBuku.innerHTML += `
            <tr>

                <td class="text-center">
                    ${index + 1}
                </td>

                <td>
                    <span class="badge-buku">
                        ${buku.kode || "-"}
                    </span>
                </td>

                <td>
                    ${buku.isbn || "-"}
                </td>

                <td>
                    <strong>
                        ${buku.judul || "-"}
                    </strong>
                </td>

                <td>
                    ${buku.penulis || "-"}
                </td>

                <td>
                    ${buku.penerbit || "-"}
                </td>

		<td>
                    ${buku.kotaTerbit || "-"}
                </td>

                <td>
                    ${buku.tahun || "-"}
                </td>

		<td>
    		    ${buku.kategori || "-"}
		</td>

		<td>
    		    ${buku.rak || "-"}
		</td>

                <td class="text-center">
                    ${buku.stok ?? 0}
                </td>

                <td class="text-center">

                    <button
                        type="button"
                        class="btn btn-warning btn-sm btn-action me-1"
                        onclick="editBuku(${realIndex})"
                        title="Edit"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger btn-sm btn-action"
                        onclick="hapusBuku(${realIndex})"
                        title="Hapus"
                    >
                        <i class="bi bi-trash"></i>
                    </button>

                </td>

            </tr>
        `;

    });

}


/* =====================================================
   FORM TAMBAH / EDIT
===================================================== */

if (formBuku) {

    formBuku.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            console.log(
                "Form buku berhasil disubmit"
            );


            /* =========================================
               AMBIL DATA FORM
            ========================================= */

            const kode =
                document
                    .getElementById("kodeBuku")
                    .value
                    .trim();


            const isbn =
                document
                    .getElementById("isbn")
                    .value
                    .trim();


            const judul =
                document
                    .getElementById("judulBuku")
                    .value
                    .trim();


            const penulis =
                document
                    .getElementById("penulis")
                    .value
                    .trim();


            const penerbit =
                document
                    .getElementById("penerbit")
                    .value
                    .trim();

const kotaTerbit =
    document.getElementById("kotaTerbit").value.trim();

            const tahun =
                document
                    .getElementById("tahunTerbit")
                    .value;


            const kategori =
                document
                    .getElementById("kategori")
                    .value
                    .trim();


            const rak =
                document
                    .getElementById("rak")
                    .value
                    .trim();


            const stok =
                parseInt(
                    document
                        .getElementById("stok")
                        .value
                ) || 0;


            /* =========================================
               VALIDASI
            ========================================= */

            if (
                !kode ||
                !judul ||
                !penulis ||
                !penerbit
            ) {

                alert(
                    "Data buku yang wajib diisi belum lengkap."
                );

                return;

            }


            /* =========================================
               CEK KODE DUPLIKAT
            ========================================= */

            const kodeDuplikat =
                dataBuku.some(
                    function (buku, index) {

                        return (

                            String(
                                buku.kode || ""
                            )
                            .toLowerCase() ===
                            kode.toLowerCase()

                            &&

                            index !== editIndex

                        );

                    }
                );


            if (kodeDuplikat) {

                alert(
                    "Kode buku sudah digunakan."
                );

                return;

            }


            /* =========================================
               OBJECT BUKU
            ========================================= */

            const bukuBaru = {

                kode: kode,

                isbn: isbn,

                judul: judul,

                penulis: penulis,

                penerbit: penerbit,

 		kotaTerbit: kotaTerbit,

                tahun: tahun,

                kategori: kategori,

                rak: rak,

                stok: stok

            };


            /* =========================================
               EDIT
            ========================================= */

            if (editIndex !== -1) {

                dataBuku[editIndex] =
                    bukuBaru;

            }


            /* =========================================
               TAMBAH
            ========================================= */

            else {

                dataBuku.push(
                    bukuBaru
                );

            }


            /* =========================================
               SIMPAN
            ========================================= */

            try {

                localStorage.setItem(
                    "dataBuku",
                    JSON.stringify(dataBuku)
                );


                console.log(
                    "Data buku berhasil disimpan:",
                    dataBuku
                );

            } catch (error) {

                console.error(
                    "Gagal menyimpan data buku:",
                    error
                );

                alert(
                    "Data buku gagal disimpan."
                );

                return;

            }


            /* =========================================
               TAMPILKAN DATA
            ========================================= */

            tampilData();


            /* =========================================
               RESET
            ========================================= */

            formBuku.reset();

            editIndex = -1;


            const modalTitle =
                document.getElementById(
                    "modalTitle"
                );


            if (modalTitle) {

                modalTitle.textContent =
                    "Tambah Buku";

            }


            /* =========================================
               TUTUP MODAL
            ========================================= */

            if (modalBuku) {

                modalBuku.hide();

            }

        }
    );

}


/* =====================================================
   TOMBOL TAMBAH
===================================================== */

if (btnTambah) {

    btnTambah.addEventListener(
        "click",
        function () {

            editIndex = -1;


            if (formBuku) {

                formBuku.reset();

            }


            const modalTitle =
                document.getElementById(
                    "modalTitle"
                );


            if (modalTitle) {

                modalTitle.textContent =
                    "Tambah Buku";

            }

        }
    );

}


/* =====================================================
   EDIT BUKU
===================================================== */

function editBuku(index) {

    const buku =
        dataBuku[index];


    if (!buku) {

        return;

    }


    editIndex =
        index;


    document.getElementById(
        "kodeBuku"
    ).value =
        buku.kode || "";


    document.getElementById(
        "isbn"
    ).value =
        buku.isbn || "";


    document.getElementById(
        "judulBuku"
    ).value =
        buku.judul || "";


    document.getElementById(
        "penulis"
    ).value =
        buku.penulis || "";


    document.getElementById(
        "penerbit"
    ).value =
        buku.penerbit || "";

 document.getElementById(
        "kotaTerbit"
    ).value =
        buku.kotaTerbit || "";

    document.getElementById(
        "tahunTerbit"
    ).value =
        buku.tahun || "";


    document.getElementById(
        "kategori"
    ).value =
        buku.kategori || "";


    document.getElementById(
        "rak"
    ).value =
        buku.rak || "";


    document.getElementById(
        "stok"
    ).value =
        buku.stok ?? 0;


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    if (modalTitle) {

        modalTitle.textContent =
            "Edit Buku";

    }


    if (modalBuku) {

        modalBuku.show();

    }

}


/* =====================================================
   HAPUS BUKU
===================================================== */

function hapusBuku(index) {

    const buku =
        dataBuku[index];


    if (!buku) {

        return;

    }


    const konfirmasi =
        confirm(
            `Apakah Anda yakin ingin menghapus buku "${buku.judul}"?`
        );


    if (!konfirmasi) {

        return;

    }


    dataBuku.splice(
        index,
        1
    );


    localStorage.setItem(
        "dataBuku",
        JSON.stringify(dataBuku)
    );


    tampilData();

}


/* =====================================================
   SEARCH
===================================================== */

if (searchBuku) {

    searchBuku.addEventListener(
        "input",
        function () {

            const keyword =
                this.value
                    .toLowerCase()
                    .trim();


            const hasil =
                dataBuku.filter(
                    function (buku) {

                        return (

                            String(
                                buku.kode || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                buku.isbn || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                buku.judul || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                buku.penulis || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                buku.penerbit || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

			     String(
                                buku.kotaTerbit || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                buku.kategori || ""
                            )
                            .toLowerCase()
                            .includes(keyword)

                            ||

                            String(
                                buku.rak || ""
                            )
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

}


/* =====================================================
   MODAL DITUTUP
===================================================== */

if (modalBukuElement) {

    modalBukuElement.addEventListener(
        "hidden.bs.modal",
        function () {

            editIndex = -1;


            if (formBuku) {

                formBuku.reset();

            }


            const modalTitle =
                document.getElementById(
                    "modalTitle"
                );


            if (modalTitle) {

                modalTitle.textContent =
                    "Tambah Buku";

            }

        }
    );

}


/* =====================================================
   TAMPIL DATA SAAT HALAMAN DIBUKA
===================================================== */

tampilData();


/* =====================================================
   DEBUG
===================================================== */

console.log(
    "MASTER BUKU JS BERHASIL DIMUAT"
);

console.log(
    "Data Buku:",
    dataBuku
);