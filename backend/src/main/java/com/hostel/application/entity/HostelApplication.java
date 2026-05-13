package com.hostel.application.entity;

import com.hostel.application.enums.ApplicationStatus;
import com.hostel.application.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hostel_applications")
public class HostelApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String parentName;

    @Column(nullable = false, length = 10)
    private String parentContactNo;

    @Column(nullable = false)
    private LocalDate dateOfJoining;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Gender gender;

    @Column(nullable = false)
    private String course;

    @Column(nullable = false, unique = true)
    private String registerNumber;

    @Column(nullable = false, length = 10)
    private String studentMobileNo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String residenceAddress;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String permanentAddress;

    @Column(nullable = false)
    private String localGuardianName;

    @Column(nullable = false, length = 10)
    private String localGuardianContactNo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String localGuardianAddress;

    @Column(columnDefinition = "TEXT")
    private String personalHistory;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    private String roomNo;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
        if (status == null) {
            status = ApplicationStatus.PENDING;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
