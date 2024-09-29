import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Admin() {
  const { token } = useParams();
  const [blog, setBlog] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [idEmployee, setIdEmployee] = useState("");
  const [switchButton, setSwictButton] = useState(false);
  const [formEmployee, setFormEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    position: "",
    department: "",
    salary: "",
    hired_at: "",
    emergency_contact: "",
    nationality: "",
    gender: "",
    marital_status: "",
    notes: "",
    is_visible: true,
  });
  // console.log(token)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/music", {
          headers: {
            Authorization: `Bearer ${token}`, // ใช้ token ใน header
          },
        });
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchBlog();
  }, [token]);

  const handleEdit = async (id) => {
    const response = await fetch(`http://localhost:8000/api/music/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json(); // ใช้ await เพื่อรอให้ response.json() เสร็จ
    // setFormEmployee(data); // จากนั้นค่อย set ค่า formEmployee
    // setShowForm(true); // แสดงฟอร์มแก้ไข
    // setIdEmployee(id);
    // setSwictButton(true);
  };

  const handleDelete = async (id) => {
    window.confirm("Do you want delete it?");
    const response = await fetch(`http://localhost:8000/api/music/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEmployee({ ...formEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formEmployee),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Employee created successfully:", data);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/music/${idEmployee}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formEmployee),
        }
      );
      setShowForm(false);
      setSwictButton(false);
      // window.location.reload();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const showAdd = () => {
    setShowForm((prevShow) => !prevShow);
    setFormEmployee("");
    setSwictButton(false);
  };

  //active
  const toggleVisibility = async (id) => {
    try {
      // หา employee ที่จะถูกสลับค่าใน employees list
      const employeeToToggle = employees.find((employee) => employee.id === id);

      // ตรวจสอบว่าพบ employee ที่ต้องการหรือไม่ก่อนดำเนินการ
      if (!employeeToToggle) {
        throw new Error("Employee not found");
      }

      // ส่งคำขอไปที่ API เพื่ออัปเดตค่า is_visible ของ employee
      const response = await fetch(`http://localhost:8000/api/music/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // ส่งข้อมูลที่ต้องการอัปเดตไปยัง API
          is_visible: !employeeToToggle.is_visible, // สลับค่า is_visible: ถ้าเป็น true ก็เปลี่ยนเป็น false และกลับกัน
        }),
      });

      // ตรวจสอบว่า API ตอบกลับมาด้วยข้อมูลที่ถูกต้องหรือไม่
      if (!response.ok) {
        throw new Error("Failed to update employee visibility");
      }

      // แปลงข้อมูลที่ได้จาก API จาก JSON เป็น JavaScript object
      const updatedEmployee = await response.json();

      // อัปเดตสถานะ employees ใน React state ด้วยข้อมูลใหม่จาก API
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          // ถ้า employee.id ตรงกับ id ที่ส่งไปอัปเดต ก็จะใช้ข้อมูลที่อัปเดตแล้ว (updatedEmployee) มาแทน
          employee.id === id
            ? { ...employee, is_visible: updatedEmployee.is_visible } // อัปเดตฟิลด์ is_visible จากข้อมูลที่ได้จาก API
            : employee // ถ้าไม่ตรงกับ id ที่ส่งไป ก็คืนค่า employee เดิมๆ
        )
      );
    } catch (error) {
      // ถ้ามีข้อผิดพลาด จะแสดงข้อผิดพลาดใน console
      console.error("Error toggling visibility:", error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-800">ความหมายของเพลง</h1>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full bg-pink-50 border border-gray-200">
          <thead className="bg-pink-200">
            <tr>
              <th className="py-2 px-4 border-b text-purple-800">ID</th>
              <th className="py-2 px-4 border-b text-purple-800">ชื่อเพลง</th>
              <th className="py-2 px-4 border-b text-purple-800">ศิลปิน</th>
              <th className="py-2 px-4 border-b text-purple-800">อัลบั้ม</th>
              <th className="py-2 px-4 border-b text-purple-800">ประเภทเพลง</th>
              <th className="py-2 px-4 border-b text-purple-800">ปีที่วางจำหน่าย</th>
              <th className="py-2 px-4 border-b text-purple-800">หมายเลขเพลง</th>
              <th className="py-2 px-4 border-b text-purple-800">ระยะเวลา</th>
              <th className="py-2 px-4 border-b text-purple-800">ค่ายเพลง</th>
              <th className="py-2 px-4 border-b text-purple-800">โปรดิวเซอร์</th>
              <th className="py-2 px-4 border-b text-purple-800">เนื้อหาเพิ่มเติม</th>
              <th className="py-2 px-4 border-b text-purple-800">ภาษา</th>
              <th className="py-2 px-4 border-b text-purple-800">ภาพปก</th>
              <th className="py-2 px-4 border-b text-purple-800">ยูทูป</th>
              <th className="py-2 px-4 border-b text-purple-800">จำนวนการเล่น</th>
              <th className="py-2 px-4 border-b text-purple-800">อื่นๆ</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((val) => (
              <tr key={val.id} className="hover:bg-pink-100">
                <td className="py-2 px-4 border-b text-purple-800">{val.id}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.title}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.artist}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.album}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.genre}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.release_year}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.track_number}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.duration}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.label}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.producer}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.explicit_content}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.language}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.cover_image}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.file_path}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.plays}</td>
                <td className="py-2 px-4 border-b">
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(val.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    ลบ
                  </button>
                </td>
                
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(val.id)}
                    className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    แก้ไข
                  </button>
                </td>
              
                </td>
                <td className="py-2 px-4 border-b text-purple-800">{val.author}</td>
                <td className="py-2 px-4 border-b text-purple-800">{val.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}