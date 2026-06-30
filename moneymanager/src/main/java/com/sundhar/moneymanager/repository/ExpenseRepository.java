package com.sundhar.moneymanager.repository;

import com.sundhar.moneymanager.entity.ExpenseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntity,Long> {

    //select * from tbl_expenses where profile_id= ? order ny date desc
    List<ExpenseEntity>findByProfileIdOrderByDateDesc(Long profileId);

    //selectt * from tbl where profile_id=? order by desc limit: 5
    List<ExpenseEntity>findTop5ByProfileIdOrderByDateDesc(Long profileId);

    //JPQL query dont understand the * and it only accept the entityname not the table name select * form tbl_expense this qyery will not woriking
    @Query("SELECT SUM(e.amount) FROM ExpenseEntity e WHERE e.profile.id =:profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    // select * from tbl where profileid= ? and date between ? and ? and name like %?4%
    List<ExpenseEntity>findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort);

    List<ExpenseEntity>findByProfileIdAndDateBetween(Long profileId,LocalDate startDate,LocalDate endDate);

    //select * frim tbl_expenses  where profile_id=profileId and date=date
    List<ExpenseEntity>findByProfileIdAndDate(Long profileId, LocalDate date);

}

