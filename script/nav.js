// ดึงลิงก์ทั้งหมดในเมนู
const menuLinks = document.querySelectorAll('nav ul li a');

// เพิ่ม event listener ให้กับลิงก์ในเมนู
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();  // ป้องกันการเปลี่ยนหน้าโดยตรง

        // เพิ่มการแสดงข้อความเมื่อคลิก
        alert('คุณคลิกที่: ' + link.textContent);

        // การเปลี่ยนแปลงสีหลังจากคลิก
        link.style.backgroundColor = '#f1edd7'; // เปลี่ยนสีพื้นหลัง
        link.style.color = '#333'; // เปลี่ยนสีตัวอักษร
    });

    // เพิ่ม event listener สำหรับ hover
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)';  // ขยายลิงก์เมื่อผู้ใช้เอาเมาส์ไปอยู่บนลิงก์
    });

    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)';  // คืนสภาพปกติเมื่อเมาส์ออกจากลิงก์
    });
});