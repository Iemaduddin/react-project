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
        // Organizers Table
        Schema::create('organizers', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->string('shorten_name', 100)->unique();
            $table->text('vision');
            $table->text('mision');
            $table->text('description');
            $table->json('link_media_social')->nullable();
            $table->bigInteger('whatsapp_number')->nullable();
            $table->uuid('user_id');
            $table->enum('organizer_type', ['HMJ', 'LT', 'UKM', 'Jurusan', 'Kampus']);
            $table->string('logo');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizers');
    }
};
