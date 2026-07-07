package com.sundhar.moneymanager.service;

import com.sundhar.moneymanager.dto.ExpenseDTO;
import com.sundhar.moneymanager.entity.CategoryEntity;
import com.sundhar.moneymanager.entity.ExpenseEntity;
import com.sundhar.moneymanager.entity.ProfileEntity;
import com.sundhar.moneymanager.repository.CategoryRepository;
import com.sundhar.moneymanager.repository.ExpenseRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    // add a new expens to the database
    public ExpenseDTO addExpense(ExpenseDTO dto){
        ProfileEntity profile=profileService.getCurrentProfile();
        CategoryEntity category=categoryRepository.findByIdAndTypeAndProfileId(dto.getCategoryId(),"expense", profile.getId())
                .orElseThrow(()->new RuntimeException("Expense category not found "));

//        if (!category.getType().equalsIgnoreCase("expense")) {
//            throw new RuntimeException("Invalid expense category");
//        }

        ExpenseEntity newExpense=toEntity(dto,profile,category);
        newExpense=expenseRepository.save(newExpense);

        return toDTO(newExpense);

    }
    //retrieves all expenses for the current month based on the start date and end date
    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();
        //1.first get the current date now mothod is used to get the current date month yr
        LocalDate now=LocalDate.now();
        //2.using the current date,month,yr using withdayofmonth method with the parameter 1
        // which indicates the 1st day of the month
        LocalDate startDate=now.withDayOfMonth(1);
        //3.with the help of lenghtofmonth method get the total days in the current month
        //and pass this result to the withdayof month method,and we get the last day of the nonth
        LocalDate endDate=now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> expenses=expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate,endDate);
        return expenses.stream().map(this::toDTO).toList();
    }

    //delete expense by id for current user
    public void deleteExpense(Long expenseId){
        ProfileEntity profile=profileService.getCurrentProfile();
       ExpenseEntity entity= expenseRepository.findById(expenseId)
                .orElseThrow(()->new RuntimeException("Expense not found"));
       //check the entity id is equals to the current profile id
       if(!entity.getProfile().getId().equals(profile.getId())){
          throw new RuntimeException("Unauthorized to delete this expense");
       }
        expenseRepository.delete(entity);

    }
    //get latest 5 expenses for the current user
    public List<ExpenseDTO> getLatest5ExpensesForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();
        List<ExpenseEntity> expenses=expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return expenses.stream().map(this::toDTO).toList();

    }

    // get total expenses for the current user
    public BigDecimal getTotalExpenceForCurrentUSer(){
        ProfileEntity profile=profileService.getCurrentProfile();
        BigDecimal total=expenseRepository.findTotalExpenseByProfileId(profile.getId());
        return total!=null? total: BigDecimal.ZERO;
    }

    //filter expenses
    public List<ExpenseDTO> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort){
        ProfileEntity profile=profileService.getCurrentProfile();
        List<ExpenseEntity> list=expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(),startDate,endDate,keyword,sort);
        return list.stream().map(this::toDTO).toList();
    }

    //Notifications
    public List<ExpenseDTO> getExpensesForUserOnDate(Long profileId, LocalDate date){
        List<ExpenseEntity> list=expenseRepository.findByProfileIdAndDate(profileId,date);
        return list.stream().map(this::toDTO).toList();
    }


    //helper methods
    private ExpenseEntity toEntity(ExpenseDTO expenseDTO, ProfileEntity profile, CategoryEntity category){
        return ExpenseEntity.builder()
                .name(expenseDTO.getName())
                .icon(expenseDTO.getIcon())
                .amount(expenseDTO.getAmount())
                .date(expenseDTO.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private ExpenseDTO toDTO(ExpenseEntity expenseEntity){
        return ExpenseDTO.builder()
                .id(expenseEntity.getId())
                .amount(expenseEntity.getAmount())
                .icon(expenseEntity.getIcon())
                .name(expenseEntity.getName())
                .date(expenseEntity.getDate())
                .categoryId(expenseEntity.getCategory() !=null ? expenseEntity.getCategory().getId(): null)
                .categoryName(expenseEntity.getCategory() !=null ? expenseEntity.getCategory().getName(): "N/A")
                .createdAt(expenseEntity.getCreatedAt())
                .updatedAt(expenseEntity.getUpdatedAt())
                .build();
    }

}
