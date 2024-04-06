function getEle(id) {
  return document.getElementById(id);
}

function chonLoaiXe() {
  const grabX = getEle("grabX");
  const grabSUV = getEle("grabSUV");
  const grabBlack = getEle("grabBlack");

  let loaiXe;

  if (grabX.checked) {
    loaiXe = "grabX";
  } else if (grabSUV.checked) {
    loaiXe = "grabSUV";
  } else if (grabBlack.checked) {
    loaiXe = "grabBlack";
  }

  return loaiXe;
}

function soKm_1(soKm, giaTien) {
  return soKm * giaTien;
}

function soKm_2(soKm, giaTien) {
  return (soKm - 1) * giaTien;
}

function soKm_3(soKm, giaTien) {
  return (soKm - 19) * giaTien;
}

function tinhTienCho(tgCho, giaTien) {
  let tongTienCho = 0;
  if (tgCho >= 3) {
    tongTienCho = Math.floor(tgCho / 3) * giaTien;
  }
  return tongTienCho;
}

/**
 * Click btnTinhTien
 */
getEle("btnTinhTien").onclick = function () {
  const soKm = getEle("soKm").value * 1;
  const tgCho = getEle("tgCho").value * 1;

  const loaiXe = chonLoaiXe();
  let tongTien = 0;
  switch (loaiXe) {
    case "grabX":
      // Tinh tien cho grabX
      if (0 <= soKm && soKm <= 1) {
        const tienKm_1 = soKm_1(soKm, 8000);
        const tienCho = tinhTienCho(tgCho, 2000);
        tongTien = tienKm_1 + tienCho;
      } else if (1 < soKm && soKm <= 19) {
        const tienKm_1 = soKm_1(1, 8000);
        const tienKm_2 = soKm_2(soKm, 7500);
        const tienCho = tinhTienCho(tgCho, 2000);
        tongTien = tienKm_1 + tienKm_2 + tienCho;
      } else if (19 < soKm) {
        const tienKm_1 = soKm_1(1, 8000);
        const tienKm_2 = soKm_2(19, 7500);
        const tienKm_3 = soKm_3(soKm, 7000);
        const tienCho = tinhTienCho(tgCho, 2000);
        tongTien = tienKm_1 + tienKm_2 + tienKm_3 + tienCho;
      }

      break;
    case "grabSUV":
      // Tinh tien cho grabSUV
      console.log("Tinh tien cho grabSUV");
      break;

    case "grabBlack":
      // Tinh tien cho grabBlack
      console.log("Tinh tien cho grabBlack");
      break;

    default:
      break;
  }

  getEle("divThanhTien").style.display = "block";
  getEle("xuatTien").innerHTML = tongTien;
};
