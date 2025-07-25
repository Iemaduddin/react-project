<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Jurusan Table
        Schema::create('jurusan', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->string('nama', 100);
            $table->string('kode_jurusan', 10)->unique();
            $table->timestamps();
        });

        // Prodi Table
        Schema::create('prodi', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->string('nama_prodi', 100);
            $table->string('kode_prodi', 20)->unique();
            $table->uuid('jurusan_id');
            $table->timestamps();

            $table->foreign('jurusan_id')->references('id')->on('jurusan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurusan');
        Schema::dropIfExists('prodi');
    }
};