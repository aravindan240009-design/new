package com.hostel.application.repository;

import com.hostel.application.entity.HostelApplication;
import com.hostel.application.enums.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HostelApplicationRepository extends JpaRepository<HostelApplication, Long> {
    boolean existsByRegisterNumberIgnoreCase(String registerNumber);
    boolean existsByRegisterNumberIgnoreCaseAndIdNot(String registerNumber, Long id);
    List<HostelApplication> findAllByOrderByCreatedAtDesc();
    long countByGender(Gender gender);

    @Query("""
            select h from HostelApplication h
            where lower(h.studentName) like lower(concat('%', :keyword, '%'))
               or lower(h.registerNumber) like lower(concat('%', :keyword, '%'))
               or lower(h.course) like lower(concat('%', :keyword, '%'))
               or lower(h.studentMobileNo) like lower(concat('%', :keyword, '%'))
               or lower(h.parentName) like lower(concat('%', :keyword, '%'))
               or lower(h.hostelName) like lower(concat('%', :keyword, '%'))
               or lower(h.floorNo) like lower(concat('%', :keyword, '%'))
               or lower(h.roomNo) like lower(concat('%', :keyword, '%'))
               or lower(h.wardenName) like lower(concat('%', :keyword, '%'))
            order by h.createdAt desc
            """)
    List<HostelApplication> search(@Param("keyword") String keyword);

    @Query("""
            select h from HostelApplication h
            where (:gender is null or h.gender = :gender)
              and (:course is null or lower(h.course) = lower(:course))
            order by h.createdAt desc
            """)
    List<HostelApplication> filter(@Param("gender") Gender gender,
                                   @Param("course") String course);
}
