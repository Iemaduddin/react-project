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
        // Event Speakers Table
        Schema::create('event_speakers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('event_step_id');
            $table->string('name');
            $table->string('role');
            $table->timestamps();

            $table->foreign('event_step_id')->references('id')->on('event_steps')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_speakers');
    }
};
