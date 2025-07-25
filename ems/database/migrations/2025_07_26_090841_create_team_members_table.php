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
        // Team Members Table
        Schema::create('team_members', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nim', 50);
            $table->string('name', 100);
            $table->uuid('organizer_id');
            $table->enum('level', ['SC', 'OC']);
            $table->string('position', 100);
            $table->boolean('is_leader')->default(false);
            $table->timestamps();

            $table->foreign('organizer_id')->references('id')->on('organizers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};