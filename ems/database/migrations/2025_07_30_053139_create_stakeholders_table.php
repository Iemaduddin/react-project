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
        Schema::create('stakeholders', function (Blueprint $table) {
            $table->id();
            $table->string('name');             // Nama penandatangan
            $table->string('identifier');       // NIM atau NIP
            $table->enum('type', ['dosen', 'mahasiswa']);
            $table->enum('position', ["Direktur", "Wakil Direktur I", "Wakil Direktur II", "Wakil Direktur III", "Wakil Direktur IV", "Ketua Jurusan", "Ketua Prodi", "DPK", "Presiden BEM"]);         // Contoh: 'Ketua Jurusan', 'Presiden BEM', dll.
            $table->boolean('is_active')->default(true);
            $table->uuid('jurusan_id')->nullable();
            $table->uuid('prodi_id')->nullable();
            $table->uuid('organizer_id')->nullable();

            $table->foreign('jurusan_id')->references('id')->on('jurusan')->onDelete('cascade');
            $table->foreign('prodi_id')->references('id')->on('prodi')->onDelete('cascade');
            $table->foreign('organizer_id')->references('id')->on('organizers')->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stakeholders');
    }
};
