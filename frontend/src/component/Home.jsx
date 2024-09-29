import React, { useEffect, useState } from "react";

export default function Home() {
    const [dataMusic, setDataMusic] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState(null);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/music"); // อัปเดต URL ให้ตรงกับ API ของคุณ
                const data = await response.json();
                setDataMusic(data);
            } catch (error) {
                console.error("Error fetching Musics:", error);
            }
        };

        fetchMusic();
    }, []);

    const handleShowData = (item) => {
        setSelectedMusic(item);
    };

    const handleCloseModal = () => {
        setSelectedMusic(null);
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-8 bg-cover bg-center"
            style={{ backgroundImage: "url('https://fbi.dek-d.com/27/0404/8000/117427860')" }} // URL รูปภาพที่ต้องการใช้เป็นพื้นหลัง
        >
            <h1 className="text-4xl mb-8 text-pink-500 font-semibold">ประวัติ ความหมายเพลง

            </h1>
            <hr className="mb-10 w-full border-pink-300" />

            {/* Section for displaying music items in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                {dataMusic.map((item) => (
                    <div key={item.id} className="text-center text-3xl mb-10 bg-pink-100 bg-opacity-80 p-6 rounded-lg shadow-lg">
                        <h2 className="mb-4 text-pink-700">{item.title}</h2>
                        <p className="text-lg mb-4 text-pink-600">{item.content}</p>
                        <button
                            onClick={() => handleShowData(item)}
                            className="py-2.5 px-5 mb-2 text-sm font-medium text-pink-900 bg-white rounded-lg border border-pink-300 hover:bg-pink-50 hover:text-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-700 dark:bg-pink-200 dark:text-pink-800 dark:border-pink-300 dark:hover:text-pink-900 dark:hover:bg-pink-100"
                        >
                            อ่านเพิ่มเติม
                        </button>
                        <hr className="mt-10 mb-10 w-full border-pink-300" />
                    </div>
                ))}
            </div>

            {/* Modal section */}
            {selectedMusic && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg w-2/3 max-w-3xl flex flex-col items-center overflow-y-auto" style={{ maxHeight: '80vh' }}>
            <h2 className="text-3xl mb-4 text-pink-700 text-center">{selectedMusic.title}</h2>
            <h2 className="text-xl mb-4 text-black text-center">{selectedMusic.artist}</h2>
            {/* แสดงภาพของ composer */}
            {selectedMusic.cover_image && (
                <a href={selectedMusic.cover_image} target="_blank" rel="noopener noreferrer">
                    <img
                        src={selectedMusic.cover_image}
                        alt={`${selectedMusic.composer} image`}
                        className="mb-4 rounded-full w-32 h-32 object-cover" // ปรับขนาดและรูปทรงตามต้องการ
                    />
                </a>
            )}
            <h2 className="text-xl mb-4 text-black text-center">{selectedMusic.composer}</h2>
            <p className="text-lg mb-6 text-pink-600 text-center">{selectedMusic.content}</p>
            
            {/* แสดงวิดีโอ YouTube */}
            {selectedMusic.file_path && (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* Aspect ratio 16:9 */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={selectedMusic.file_path.replace("watch?v=", "embed/")} // แปลงลิงก์ YouTube
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <button
                onClick={handleCloseModal}
                className="py-2.5 px-5 mb-2 text-sm font-medium text-pink-900 bg-white rounded-lg border border-pink-300 hover:bg-pink-50 hover:text-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-700 dark:bg-pink-200 dark:text-pink-800 dark:border-pink-300 dark:hover:text-pink-900 dark:hover:bg-pink-100 mt-5"
            >
                ปิด
            </button>
        </div>
    </div>
)}
        </div>
    );
}