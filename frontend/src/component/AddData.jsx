import React, { useState, useContext } from "react";
import { UseContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function AddData() {
  const { token } = useContext(UseContext);
  const navigate = useNavigate();

  // สถานะสำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    release_year: "",
    track_number: "",
    label: "",
    duration: "",
    composer: "",
    producer: "",
    explicit_content: false, // แก้เป็น boolean
    language: "",
    cover_image: "",
    file_path: "",
    plays: "", // สามารถใส่ค่าตัวเลขเป็นค่าเริ่มต้นได้
  });

  console.log('data', formData)

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ฟังก์ชันส่งฟอร์มไปยัง API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4" style={{ backgroundColor: "#FFF7F0" }}>
      {token ? (
        <div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#FFB6C1" }}>เพิ่มเพลงใหม่</h1>
          <form>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ชื่อเพลง</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
                required
              />
            </div>

            {/* Artist */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ศิลปิน</label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
                required
              />
            </div>

            {/* Album */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>อัลบั้ม</label>
              <input
                type="text"
                name="album"
                value={formData.album}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Genre */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ประเภทเพลง</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Release Year */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ปีที่วางจำหน่าย</label>
              <input
                type="number"
                name="release_year"
                value={formData.release_year}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Track Number */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>หมายเลขเพลง</label>
              <input
                type="number"
                name="track_number"
                value={formData.track_number}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Label */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ค่ายเพลง</label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ระยะเวลา</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Composer */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>นักแต่งเพลง</label>
              <input
                type="text"
                name="composer"
                value={formData.composer}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Producer */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>โปรดิวเซอร์</label>
              <input
                type="text"
                name="producer"
                value={formData.producer}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Explicit Content */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>มีเนื้อหาที่ไม่เหมาะสมหรือไม่?</label>
              <input
                type="checkbox"
                name="explicit_content"
                checked={formData.explicit_content}
                onChange={handleInputChange}
                className="mr-2 leading-tight"
              />
            </div>

            {/* Language */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ภาษา</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Cover Image */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ภาพปก</label>
              <input
                type="text"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* File Path */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: "#FFC0CB" }}>ลิงค์ไฟล์เพลง</label>
              <input
                type="text"
                name="file_path"
                value={formData.file_path}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFFAFA", color: "#FF69B4" }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleSubmit}
                className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: "#FFB6C1", color: "#FFF" }}
              >
                เพิ่มเพลง
              </button>
            </div>
          </form>
        </div>
      ) : ""}
    </div>
  );
}
