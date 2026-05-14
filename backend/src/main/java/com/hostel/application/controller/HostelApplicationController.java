package com.hostel.application.controller;

import com.hostel.application.dto.ApiResponse;
import com.hostel.application.dto.HostelApplicationRequest;
import com.hostel.application.dto.HostelApplicationResponse;
import com.hostel.application.enums.Gender;
import com.hostel.application.service.HostelApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class HostelApplicationController {
    private final HostelApplicationService service;

    @PostMapping
    public ApiResponse<HostelApplicationResponse> create(@Valid @RequestBody HostelApplicationRequest request) {
        return ApiResponse.ok("Hostel details saved successfully", service.create(request));
    }

    @GetMapping
    public ApiResponse<List<HostelApplicationResponse>> all() {
        return ApiResponse.ok("Student records fetched", service.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<HostelApplicationResponse> one(@PathVariable Long id) {
        return ApiResponse.ok("Student record fetched", service.findById(id));
    }

    @PutMapping("/{id}")
    public ApiResponse<HostelApplicationResponse> update(@PathVariable Long id, @Valid @RequestBody HostelApplicationRequest request) {
        return ApiResponse.ok("Student record updated", service.update(id, request));
    }

    @GetMapping("/search")
    public ApiResponse<List<HostelApplicationResponse>> search(@RequestParam(required = false) String keyword) {
        return ApiResponse.ok("Search completed", service.search(keyword));
    }

    @GetMapping("/filter")
    public ApiResponse<List<HostelApplicationResponse>> filter(@RequestParam(required = false) Gender gender,
                                                               @RequestParam(required = false) String course) {
        return ApiResponse.ok("Filter completed", service.filter(gender, course));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Long>> stats() {
        return ApiResponse.ok("Statistics fetched", service.stats());
    }
}
