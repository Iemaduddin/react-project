<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_steps', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->uuid('event_id');
            $table->string('step_name')->nullable();
            $table->date('event_date');
            $table->time('event_time_start');
            $table->time('event_time_end');
            $table->text('description')->nullable();
            $table->enum('execution_system', ['offline', 'online', 'hybrid']);
            $table->enum('location_type', ['campus', 'manual']);
            $table->json('location');
            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_steps');
    }
};
