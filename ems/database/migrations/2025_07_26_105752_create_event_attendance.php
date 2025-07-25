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
        Schema::create('event_attendance', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('event_participant_id')->nullable();
            $table->unsignedBigInteger('team_member_id')->nullable();
            $table->uuid('event_step_id');
            $table->boolean('attendance_arrival')->default(false);
            $table->boolean('attendance_departure')->default(false);
            $table->timestamp('attendance_arrival_time')->nullable();
            $table->timestamp('attendance_departure_time')->nullable();
            $table->timestamps();

            $table->foreign('event_participant_id')->references('id')->on('event_participants')->onDelete('cascade');
            $table->foreign('team_member_id')->references('id')->on('team_members')->onDelete('cascade');
            $table->foreign('event_step_id')->references('id')->on('event_steps')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_attendance');
    }
};
