package com.hostel.application.dto;

import com.hostel.application.enums.Gender;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record HostelApplicationRequest(
        @NotBlank(message = "Student name is required") String studentName,
        @NotBlank(message = "Parent name is required") String parentName,
        @NotBlank(message = "Parent contact number is required") @Pattern(regexp = "\\d{10}", message = "Parent contact number must be exactly 10 digits") String parentContactNo,
        @NotNull(message = "Date of joining is required") LocalDate dateOfJoining,
        @NotNull(message = "Date of birth is required") @PastOrPresent(message = "Date of birth cannot be in the future") LocalDate dateOfBirth,
        @NotNull(message = "Gender is required") Gender gender,
        @NotBlank(message = "Course is required") String course,
        @NotBlank(message = "Register number is required") String registerNumber,
        @NotBlank(message = "Student mobile number is required") @Pattern(regexp = "\\d{10}", message = "Student mobile number must be exactly 10 digits") String studentMobileNo,
        @NotBlank(message = "Residence address is required") String residenceAddress,
        @NotBlank(message = "Permanent address is required") String permanentAddress,
        @NotBlank(message = "Local guardian name is required") String localGuardianName,
        @NotBlank(message = "Local guardian contact number is required") @Pattern(regexp = "\\d{10}", message = "Local guardian contact number must be exactly 10 digits") String localGuardianContactNo,
        @NotBlank(message = "Local guardian address is required") String localGuardianAddress,
        @NotBlank(message = "Hostel name is required") String hostelName,
        @NotBlank(message = "Floor number is required") String floorNo,
        @NotBlank(message = "Room number is required") String roomNo,
        String bedNo,
        @NotBlank(message = "Warden name is required") String wardenName,
        @Pattern(regexp = "^$|\\d{10}", message = "Warden contact number must be exactly 10 digits") String wardenContactNo
) {
}
