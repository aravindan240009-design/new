package com.hostel.application.dto;

import com.hostel.application.enums.ApplicationStatus;
import com.hostel.application.enums.Gender;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record HostelApplicationResponse(
        Long id,
        String studentName,
        String parentName,
        String parentContactNo,
        LocalDate dateOfJoining,
        LocalDate dateOfBirth,
        Gender gender,
        String course,
        String registerNumber,
        String studentMobileNo,
        String residenceAddress,
        String permanentAddress,
        String localGuardianName,
        String localGuardianContactNo,
        String localGuardianAddress,
        String hostelName,
        String floorNo,
        String roomNo,
        String bedNo,
        String wardenName,
        String wardenContactNo,
        ApplicationStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
