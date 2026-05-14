package com.hostel.application.service;

import com.hostel.application.dto.HostelApplicationRequest;
import com.hostel.application.dto.HostelApplicationResponse;
import com.hostel.application.entity.HostelApplication;
import com.hostel.application.enums.Gender;
import com.hostel.application.exception.DuplicateResourceException;
import com.hostel.application.exception.ResourceNotFoundException;
import com.hostel.application.repository.HostelApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HostelApplicationService {
    private final HostelApplicationRepository repository;

    public HostelApplicationResponse create(HostelApplicationRequest request) {
        if (repository.existsByRegisterNumberIgnoreCase(request.registerNumber())) {
            throw new DuplicateResourceException("This register number has already submitted hostel details");
        }
        HostelApplication entity = toEntity(new HostelApplication(), request);
        return toResponse(repository.save(entity));
    }

    public List<HostelApplicationResponse> findAll() {
        return repository.findAllByOrderByCreatedAtDesc().stream().map(this::toResponse).toList();
    }

    public HostelApplicationResponse findById(Long id) {
        return toResponse(get(id));
    }

    public HostelApplicationResponse update(Long id, HostelApplicationRequest request) {
        if (repository.existsByRegisterNumberIgnoreCaseAndIdNot(request.registerNumber(), id)) {
            throw new DuplicateResourceException("This register number is already used by another student record");
        }
        HostelApplication entity = toEntity(get(id), request);
        return toResponse(repository.save(entity));
    }

    public List<HostelApplicationResponse> search(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return findAll();
        }
        return repository.search(keyword.trim()).stream().map(this::toResponse).toList();
    }

    public List<HostelApplicationResponse> filter(Gender gender, String course) {
        String normalizedCourse = course == null || course.isBlank() ? null : course.trim();
        return repository.filter(gender, normalizedCourse).stream().map(this::toResponse).toList();
    }

    public Map<String, Long> stats() {
        Map<String, Long> stats = new LinkedHashMap<>();
        stats.put("totalApplications", repository.count());
        stats.put("totalMale", repository.countByGender(Gender.MALE));
        stats.put("totalFemale", repository.countByGender(Gender.FEMALE));
        stats.put("totalOther", repository.countByGender(Gender.OTHER));
        return stats;
    }

    private HostelApplication get(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Application not found"));
    }

    private HostelApplication toEntity(HostelApplication entity, HostelApplicationRequest request) {
        entity.setStudentName(request.studentName().trim());
        entity.setParentName(request.parentName().trim());
        entity.setParentContactNo(request.parentContactNo());
        entity.setDateOfJoining(request.dateOfJoining());
        entity.setDateOfBirth(request.dateOfBirth());
        entity.setGender(request.gender());
        entity.setCourse(request.course().trim());
        entity.setRegisterNumber(request.registerNumber().trim());
        entity.setStudentMobileNo(request.studentMobileNo());
        entity.setResidenceAddress(request.residenceAddress().trim());
        entity.setPermanentAddress(request.permanentAddress().trim());
        entity.setLocalGuardianName(request.localGuardianName().trim());
        entity.setLocalGuardianContactNo(request.localGuardianContactNo());
        entity.setLocalGuardianAddress(request.localGuardianAddress().trim());
        entity.setHostelName(request.hostelName().trim());
        entity.setFloorNo(request.floorNo().trim());
        entity.setRoomNo(request.roomNo().trim());
        entity.setBedNo(request.bedNo() == null ? null : request.bedNo().trim());
        entity.setWardenName(request.wardenName().trim());
        entity.setWardenContactNo(request.wardenContactNo() == null || request.wardenContactNo().isBlank() ? null : request.wardenContactNo());
        return entity;
    }

    private HostelApplicationResponse toResponse(HostelApplication h) {
        return new HostelApplicationResponse(h.getId(), h.getStudentName(), h.getParentName(), h.getParentContactNo(),
                h.getDateOfJoining(), h.getDateOfBirth(), h.getGender(), h.getCourse(), h.getRegisterNumber(),
                h.getStudentMobileNo(), h.getResidenceAddress(), h.getPermanentAddress(), h.getLocalGuardianName(),
                h.getLocalGuardianContactNo(), h.getLocalGuardianAddress(), h.getHostelName(), h.getFloorNo(),
                h.getRoomNo(), h.getBedNo(), h.getWardenName(), h.getWardenContactNo(), h.getCreatedAt(), h.getUpdatedAt());
    }
}
