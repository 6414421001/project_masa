<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('music', function (Blueprint $table) {
            $table->id();
            $table->string('title');              // ชื่อเพลง
            $table->string('artist');             // ศิลปิน
            $table->string('album');              // อัลบั้ม
            $table->string('genre');              // ประเภทเพลง
            $table->integer('release_year');      // ปีที่ออก
            $table->integer('track_number');      // ลำดับเพลงในอัลบั้ม
            $table->string('label')->nullable();  // ค่ายเพลง
            $table->string('duration');             // ระยะเวลาเพลง
            $table->string('composer')->nullable(); // ผู้แต่งเพลง
            $table->string('producer')->nullable(); // โปรดิวเซอร์
            $table->boolean('explicit_content')->default(false); // เนื้อหามีคำหยาบหรือไม่
            $table->string('language');       // ภาษา
            $table->string('cover_image')->nullable(); // ลิงก์รูปปก
            $table->string('file_path');          // ที่อยู่ไฟล์เพลง
            $table->string('plays'); // จำนวนครั้งที่เล่น
            $table->timestamps();                 // timestamps ที่สร้างมาให้โดยอัตโนมัติ
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music');
    }
};
