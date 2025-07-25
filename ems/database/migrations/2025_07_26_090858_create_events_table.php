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
        // Events Table
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->uuid('organizer_id');
            $table->string('title', 255);
            $table->string('theme', 255)->nullable();
            $table->text('description')->nullable();
            $table->enum('scope', ['Internal Organisasi', 'Internal Jurusan', 'Internal Kampus', 'Umum']);
            // $table->dateTime('date_event_start')->nullable();
            // $table->dateTime('date_event_end')->nullable();
            $table->text('pamphlet_path')->nullable();
            $table->text('banner_path')->nullable();
            $table->dateTime('registration_date_start')->nullable();
            $table->dateTime('registration_date_end')->nullable();
            $table->boolean('registration_extended')->default(false);
            $table->integer('remaining_quota')->default(0);
            $table->integer('quota')->nullable();
            $table->enum('event_category', ['Seminar', 'Kuliah Tamu', 'Pelatihan', 'Workshop', 'Kompetisi', 'Lainnya']);
            $table->text('benefit')->nullable();
            $table->json('sponsored_by')->nullable();
            $table->json('media_partner')->nullable();
            // $table->text('additional_links')->nullable();
            $table->string('event_leader', 255);
            $table->text('contact_person')->nullable();
            $table->boolean('is_free')->default(true);
            $table->boolean('is_publish')->default(false);
            $table->enum('status', ['planned', 'published', 'blocked', 'completed']);
            $table->timestamps();

            $table->foreign('organizer_id')->references('id')->on('organizers')->onDelete('cascade');
        });

        // // Proces of Event 
        Schema::create('event_prices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('event_id')->nullable();
            $table->string('category_name', 100);
            $table->enum('scope', ['Internal Jurusan', 'Internal Kampus', 'Eksternal Kampus', 'Umum']);
            $table->decimal('price', 10, 2);
            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
        });

        // // Event Categories Table
        // Schema::create('event_categories', function (Blueprint $table) {
        //     $table->uuid('id')->primary()->default(Str::uuid());
        //     $table->uuid('event_id');
        //     $table->uuid('category_id');

        //     $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
        //     $table->foreign('category_id')->references('id')->on('categories_of_event')->onDelete('cascade');
        //     $table->unique(['event_id', 'category_id']);
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
        Schema::dropIfExists('categories_of_event');
        Schema::dropIfExists('event_categories');
    }
};
