package com.sundhar.moneymanager.repository;

import ch.qos.logback.core.model.IncludeModel;
import com.sundhar.moneymanager.entity.ExpenseEntity;
import com.sundhar.moneymanager.entity.IncomeEntity;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<IncomeEntity,Long> {

    //select * from tbl_incomes where profile_id= ? order ny date desc
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    //selectt * from tbl_incomes where profile_id=? order by desc limit: 5
    List<IncomeEntity>findTop5ByProfileIdOrderByDateDesc(Long profileId);

    //JPQL query dont understand the * and it only accept the entityname not the table name select * form tbl_incomes this qyery will not woriking
    @Query("SELECT SUM(i.amount) FROM IncomeEntity i WHERE i.profile.id =:profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    // select * from tbl_incomes where profileid= ? and date between ? and ? and name like %?4%
    List<IncomeEntity>findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort);

    List<IncomeEntity>findByProfileIdAndDateBetween(Long profileId,LocalDate startDate,LocalDate endDate);



}
