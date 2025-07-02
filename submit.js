document.getElementById("voucherForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    tipe: document.getElementById("tipe").value,
    voucher: document.getElementById("voucher").value,
    tanggal: document.getElementById("tanggal").value,
    catatan: document.getElementById("catatan").value,
    jumlah: document.getElementById("jumlah").value,
    status: document.getElementById("status").value
  };

  // 1. Kirim ke Google Spreadsheet
  fetch("https://script.google.com/macros/s/AKfycbxOt-IE5tBh0-w7Dt94jbAJ0g8m99tf51Xe1pvrNUT_3DSBCJG-kkCkNquvS4f6vQiJ/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(result => {
    alert("✅ Data berhasil disimpan!");

    // 2. Kirim ke WhatsApp
    const waMsg = `Voucher TASPEN\nTipe: ${data.tipe}\nNo: ${data.voucher}\nTanggal: ${data.tanggal}\nCatatan: ${data.catatan}\nJumlah: ${data.jumlah}\nStatus: ${data.status}`;
    const waLink = `https://wa.me/6283834134273?text=${encodeURIComponent(waMsg)}`;
    
    window.open(waLink, '_blank');

    document.getElementById("voucherForm").reset();
  })
  .catch(err => {
    console.error("Gagal:", err);
    alert("❌ Gagal menyimpan data.");
  });
});
