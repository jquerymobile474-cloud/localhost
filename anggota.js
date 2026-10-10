// ==========================================
// DATA MASTER ANGGOTA
// ==========================================

let dataAnggota = [];


// ==========================================
// LOAD DATA
// ==========================================

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
// ELEMENT
// ==========================================

const formAnggota =
    document.getElementById("formAnggota");

const tbodyAnggota =
    document.getElementById("tbodyAnggota");

const searchAnggota =
    document.getElementById("searchAnggota");

const btnTambah =
    document.getElementById("btnTambah");

const modalAnggotaElement =
    document.getElementById("modalAnggota");

const modalAnggota =
    new bootstrap.Modal(
        modalAnggotaElement
    );


let editIndex = -1;


// ==========================================
// GENERATE ID ANGGOTA
// ==========================================

function generateIdAnggota() {

    let nomor = 1;


    while (
        dataAnggota.some(function (anggota) {

            return anggota.idAnggota ===
                "AGT" +
                String(nomor).padStart(3, "0");

        })
    ) {

        nomor++;

    }


    return (
        "AGT" +
        String(nomor).padStart(3, "0")
    );

}


// ==========================================
// TAMPIL DATA
// ==========================================

function tampilData(data = dataAnggota) {

    tbodyAnggota.innerHTML = "";


    if (data.length === 0) {

        tbodyAnggota.innerHTML = `

            <tr>

                <td
                    colspan="11"
                    class="text-center empty-data"
                >

                    <i
                        class="bi bi-person-vcard fs-3 d-block mb-2"
                    ></i>

                    Belum ada data anggota

                </td>

            </tr>

        `;

        return;

    }


    data.forEach(function (anggota, index) {


        const realIndex =
            dataAnggota.indexOf(anggota);


        let badgeStatus = "";


        if (anggota.status === "Aktif") {

            badgeStatus = `
                <span class="badge-aktif">
                    Aktif
                </span>
            `;

        } else {

            badgeStatus = `
                <span class="badge-nonaktif">
                    Tidak Aktif
                </span>
            `;

        }


        tbodyAnggota.innerHTML += `

            <tr>


                <td class="text-center">
                    ${index + 1}
                </td>


                <td>

                    <span class="badge-anggota">

                        ${anggota.idAnggota || "-"}

                    </span>

                </td>


                <td>
                    ${anggota.nis || "-"}
                </td>


                <td>

                    <strong>
                        ${anggota.namaSiswa || "-"}
                    </strong>

                </td>


                <td>
                    ${anggota.kelas || "-"}
                </td>


                <td>
                    ${anggota.jenisKelamin || "-"}
                </td>


                <td>
                    ${anggota.tempatLahir || "-"}
                </td>


                <td>
                    ${formatTanggal(anggota.tanggalLahir)}
                </td>


                <td>
                    ${anggota.noHp || "-"}
                </td>


                <td>
                    ${badgeStatus}
                </td>


                <td class="text-center">


                    <button
                        type="button"
                        class="btn btn-warning btn-sm btn-action me-1"
                        onclick="editAnggota(${realIndex})"
                        title="Edit"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-danger btn-sm btn-action"
                        onclick="hapusAnggota(${realIndex})"
                        title="Hapus"
                    >

                        <i class="bi bi-trash"></i>

                    </button>


                </td>

            </tr>

        `;

    });

}


// ==========================================
// FORMAT TANGGAL
// ==========================================

function formatTanggal(tanggal) {

    if (!tanggal) {

        return "-";

    }


    const parts =
        tanggal.split("-");


    if (parts.length !== 3) {

        return tanggal;

    }


    return (
        parts[2] +
        "-" +
        parts[1] +
        "-" +
        parts[0]
    );

}


// ==========================================
// TAMBAH / EDIT
// ==========================================

formAnggota.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const idAnggota =
            document.getElementById(
                "idAnggota"
            ).value.trim();


        const nis =
            document.getElementById(
                "nis"
            ).value.trim();


        const namaSiswa =
            document.getElementById(
                "namaSiswa"
            ).value.trim();


        const kelas =
            document.getElementById(
                "kelas"
            ).value.trim();


        const jenisKelamin =
            document.getElementById(
                "jenisKelamin"
            ).value;


        const tempatLahir =
            document.getElementById(
                "tempatLahir"
            ).value.trim();


        const tanggalLahir =
            document.getElementById(
                "tanggalLahir"
            ).value;


        const alamat =
            document.getElementById(
                "alamat"
            ).value.trim();


        const noHp =
            document.getElementById(
                "noHp"
            ).value.trim();


        const status =
            document.getElementById(
                "status"
            ).value;


        // ======================================
        // VALIDASI
        // ======================================

        if (
            !nis ||
            !namaSiswa ||
            !kelas ||
            !jenisKelamin
        ) {

            alert(
                "Data anggota yang wajib diisi belum lengkap."
            );

            return;

        }


        // ======================================
        // CEK NIS DUPLIKAT
        // ======================================

        const nisDuplikat =
            dataAnggota.some(
                function (anggota, index) {

                    return (
                        String(
                            anggota.nis || ""
                        ).toLowerCase() ===
                        nis.toLowerCase()
                        &&
                        index !== editIndex
                    );

                }
            );


        if (nisDuplikat) {

            alert(
                "NIS sudah digunakan oleh anggota lain."
            );

            return;

        }


        // ======================================
        // OBJECT
        // ======================================

        const anggotaBaru = {

            idAnggota:
                idAnggota ||
                generateIdAnggota(),

            nis:
                nis,

            namaSiswa:
                namaSiswa,

            kelas:
                kelas,

            jenisKelamin:
                jenisKelamin,

            tempatLahir:
                tempatLahir,

            tanggalLahir:
                tanggalLahir,

            alamat:
                alamat,

            noHp:
                noHp,

            status:
                status

        };


        // ======================================
        // EDIT
        // ======================================

        if (editIndex !== -1) {

            dataAnggota[editIndex] =
                anggotaBaru;

        }


        // ======================================
        // TAMBAH
        // ======================================

        else {

            dataAnggota.push(
                anggotaBaru
            );

        }


        // ======================================
        // SIMPAN
        // ======================================

        try {

            localStorage.setItem(
                "dataAnggota",
                JSON.stringify(dataAnggota)
            );


            console.log(
                "Data anggota berhasil disimpan:",
                dataAnggota
            );

        } catch (error) {

            console.error(
                "Gagal menyimpan data anggota:",
                error
            );

            alert(
                "Data anggota gagal disimpan."
            );

            return;

        }


        // ======================================
        // TAMPILKAN
        // ======================================

        tampilData();


        // ======================================
        // RESET
        // ======================================

        formAnggota.reset();

        editIndex = -1;


        document.getElementById(
            "modalTitle"
        ).textContent =
            "Tambah Anggota";


        // ======================================
        // TUTUP MODAL
        // ======================================

        modalAnggota.hide();

    }
);


// ==========================================
// TOMBOL TAMBAH
// ==========================================

btnTambah.addEventListener(
    "click",
    function () {

        editIndex = -1;

        formAnggota.reset();


        document.getElementById(
            "idAnggota"
        ).value =
            generateIdAnggota();


        document.getElementById(
            "status"
        ).value =
            "Aktif";


        document.getElementById(
            "modalTitle"
        ).textContent =
            "Tambah Anggota";

    }
);


// ==========================================
// EDIT
// ==========================================

function editAnggota(index) {

    const anggota =
        dataAnggota[index];


    if (!anggota) {

        return;

    }


    editIndex = index;


    document.getElementById(
        "idAnggota"
    ).value =
        anggota.idAnggota || "";


    document.getElementById(
        "nis"
    ).value =
        anggota.nis || "";


    document.getElementById(
        "namaSiswa"
    ).value =
        anggota.namaSiswa || "";


    document.getElementById(
        "kelas"
    ).value =
        anggota.kelas || "";


    document.getElementById(
        "jenisKelamin"
    ).value =
        anggota.jenisKelamin || "";


    document.getElementById(
        "tempatLahir"
    ).value =
        anggota.tempatLahir || "";


    document.getElementById(
        "tanggalLahir"
    ).value =
        anggota.tanggalLahir || "";


    document.getElementById(
        "alamat"
    ).value =
        anggota.alamat || "";


    document.getElementById(
        "noHp"
    ).value =
        anggota.noHp || "";


    document.getElementById(
        "status"
    ).value =
        anggota.status || "Aktif";


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Edit Anggota";


    modalAnggota.show();

}


// ==========================================
// HAPUS
// ==========================================

function hapusAnggota(index) {

    const anggota =
        dataAnggota[index];


    if (!anggota) {

        return;

    }


    const konfirmasi =
        confirm(
            `Apakah Anda yakin ingin menghapus anggota "${anggota.namaSiswa}"?`
        );


    if (!konfirmasi) {

        return;

    }


    dataAnggota.splice(
        index,
        1
    );


    localStorage.setItem(
        "dataAnggota",
        JSON.stringify(dataAnggota)
    );


    tampilData();

}


// ==========================================
// SEARCH
// ==========================================

searchAnggota.addEventListener(
    "input",
    function () {

        const keyword =
            this.value
                .toLowerCase()
                .trim();


        const hasil =
            dataAnggota.filter(
                function (anggota) {

                    return (

                        String(
                            anggota.idAnggota || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        String(
                            anggota.nis || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        String(
                            anggota.namaSiswa || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        String(
                            anggota.kelas || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        String(
                            anggota.jenisKelamin || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        String(
                            anggota.tempatLahir || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        String(
                            anggota.noHp || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        String(
                            anggota.status || ""
                        )
                        .toLowerCase()
                        .includes(keyword)

                    );

                }
            );


        tampilData(hasil);

    }
);


// ==========================================
// MODAL DITUTUP
// ==========================================

modalAnggotaElement.addEventListener(
    "hidden.bs.modal",
    function () {

        editIndex = -1;

        formAnggota.reset();


        document.getElementById(
            "modalTitle"
        ).textContent =
            "Tambah Anggota";

    }
);


// ==========================================
// TAMPIL DATA SAAT HALAMAN DIBUKA
// ==========================================

tampilData();


console.log(
    "Master Anggota JS berhasil dimuat."
);

console.log(
    "Data Anggota:",
    dataAnggota
);