package com.hostel.application.dto;

import jakarta.validation.constraints.NotBlank;

public record RoomAllotmentRequest(@NotBlank(message = "Room number is required") String roomNo) {
}
