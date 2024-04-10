const GRAB_X_1 = 8000;
const GRAB_X_2 = 7500;
const GRAB_X_3 = 7000;
const GRAB_X_GIA_CHO = 2000;

const GRAB_SUV_1 = 9000;
const GRAB_SUV_2 = 8500;
const GRAB_SUV_3 = 8000;
const GRAB_SUV_GIA_CHO = 3000;

const GRAB_BLACK_1 = 10000;
const GRAB_BLACK_2 = 9500;
const GRAB_BLACK_3 = 9000;
const GRAB_BLACK_GIA_CHO = 3500;

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

function tinhTienChiTiet(soKm, giaKm_1, giaKm_2, giaKm_3, tgCho, giaCho) {
  let tongTien = 0;
  if (0 <= soKm && soKm <= 1) {
    const tienKm_1 = soKm_1(soKm, giaKm_1);
    const tienCho = tinhTienCho(tgCho, giaCho);
    tongTien = tienKm_1 + tienCho;
  } else if (1 < soKm && soKm <= 19) {
    const tienKm_1 = soKm_1(1, giaKm_1);
    const tienKm_2 = soKm_2(soKm, giaKm_2);
    const tienCho = tinhTienCho(tgCho, giaCho);
    tongTien = tienKm_1 + tienKm_2 + tienCho;
  } else if (19 < soKm) {
    const tienKm_1 = soKm_1(1, giaKm_1);
    const tienKm_2 = soKm_2(19, giaKm_2);
    const tienKm_3 = soKm_3(soKm, giaKm_3);
    const tienCho = tinhTienCho(tgCho, giaCho);
    tongTien = tienKm_1 + tienKm_2 + tienKm_3 + tienCho;
  }
  return tongTien;
}

function inHoaDon(soKm, giaKm_1, giaKm_2, giaKm_3, tgCho, giaCho, tongTien) {
  let contentTbody = "";

  if (0 <= soKm && soKm <= 1) {
    contentTbody += "<tr>";
    contentTbody += "<td>KM đầu</td>";
    contentTbody += "<td>" + soKm + "</td>";
    contentTbody += "<td>" + giaKm_1 + "</td>";
    contentTbody += "<td>" + soKm_1(soKm, giaKm_1) + "</td>";
    contentTbody += "</tr>";
  } else if (1 < soKm && soKm <= 19) {
    contentTbody += "<tr>";
    contentTbody += "<td>KM đầu</td>";
    contentTbody += "<td>1</td>";
    contentTbody += "<td>" + giaKm_1 + "</td>";
    contentTbody += "<td>" + soKm_1(1, giaKm_1) + "</td>";
    contentTbody += "</tr>";

    contentTbody += "<tr>";
    contentTbody += "<td>Từ 1 đến " + soKm + "</td>";
    contentTbody += "<td>" + (soKm - 1) + "</td>";
    contentTbody += "<td>" + giaKm_2 + "</td>";
    contentTbody += "<td>" + soKm_2(soKm, giaKm_2) + "</td>";
    contentTbody += "</tr>";
  } else if (19 < soKm) {
    contentTbody += "<tr>";
    contentTbody += "<td>KM đầu</td>";
    contentTbody += "<td>1</td>";
    contentTbody += "<td>" + giaKm_1 + "</td>";
    contentTbody += "<td>" + soKm_1(1, giaKm_1) + "</td>";
    contentTbody += "</tr>";

    contentTbody += "<tr>";
    contentTbody += "<td>Từ 1 đến 19</td>";
    contentTbody += "<td>18</td>";
    contentTbody += "<td>" + giaKm_2 + "</td>";
    contentTbody += "<td>" + soKm_2(19, giaKm_2) + "</td>";
    contentTbody += "</tr>";

    contentTbody += "<tr>";
    contentTbody += "<td>Trên 19</td>";
    contentTbody += "<td>" + (soKm - 19) + "</td>";
    contentTbody += "<td>" + giaKm_3 + "</td>";
    contentTbody += "<td>" + soKm_3(soKm, giaKm_3) + "</td>";
    contentTbody += "</tr>";
  }

  // Tạo dòng thời gian chờ
  contentTbody += "<tr>";
  contentTbody += "<td>Thời gian chờ</td>";
  contentTbody += "<td>" + tgCho + "</td>";
  contentTbody += "<td>" + giaCho + "</td>";
  contentTbody += "<td>" + tinhTienCho(tgCho, giaCho) + "</td>";
  contentTbody += "</tr>";

  // Tạo dòng tong tien
  contentTbody += "<tr>";
  contentTbody += "<td> Tổng tiền: " + tongTien + "</td>";
  contentTbody += "</tr>";

  getEle("tBodyHoaDon").innerHTML = contentTbody;
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
      tongTien = tinhTienChiTiet(
        soKm,
        GRAB_X_1,
        GRAB_X_2,
        GRAB_X_3,
        tgCho,
        GRAB_X_GIA_CHO
      );

      inHoaDon(
        soKm,
        GRAB_X_1,
        GRAB_X_2,
        GRAB_X_3,
        tgCho,
        GRAB_X_GIA_CHO,
        tongTien
      );
      break;
    case "grabSUV":
      // Tinh tien cho grabSUV
      tongTien = tinhTienChiTiet(
        soKm,
        GRAB_SUV_1,
        GRAB_SUV_2,
        GRAB_SUV_3,
        tgCho,
        GRAB_SUV_GIA_CHO
      );

      inHoaDon(
        soKm,
        GRAB_SUV_1,
        GRAB_SUV_2,
        GRAB_SUV_3,
        tgCho,
        GRAB_SUV_GIA_CHO,
        tongTien
      );
      break;

    case "grabBlack":
      // Tinh tien cho grabBlack
      tongTien = tinhTienChiTiet(
        soKm,
        GRAB_BLACK_1,
        GRAB_BLACK_2,
        GRAB_BLACK_3,
        tgCho,
        GRAB_SUV_GIA_CHO
      );

      inHoaDon(
        soKm,
        GRAB_BLACK_1,
        GRAB_BLACK_2,
        GRAB_BLACK_3,
        tgCho,
        GRAB_SUV_GIA_CHO,
        tongTien
      );
      break;

    default:
      break;
  }

  getEle("divThanhTien").style.display = "block";
  getEle("xuatTien").innerHTML = tongTien;
};
