package com.sundhar.moneymanager.service;

import com.sundhar.moneymanager.dto.IncomeDTO;
import com.sundhar.moneymanager.entity.CategoryEntity;
import com.sundhar.moneymanager.entity.IncomeEntity;
import com.sundhar.moneymanager.entity.ProfileEntity;
import com.sundhar.moneymanager.repository.CategoryRepository;
import com.sundhar.moneymanager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    public IncomeDTO addIncome(IncomeDTO dto){
        ProfileEntity profile=profileService.getCurrentProfile();
        CategoryEntity category=categoryRepository.findByIdAndTypeAndProfileId(dto.getCategoryId(), "income", profile.getId())
                .orElseThrow(()->new RuntimeException("category not found "));

//        if (!category.getType().equalsIgnoreCase("income")) {
//            throw new RuntimeException("Invalid income category");
//        }

        IncomeEntity newIncome=toEntity(dto,profile,category);
        newIncome=incomeRepository.save(newIncome);

        return toDTO(newIncome);

    }
    //retrieves all expenses for the current month based on the start date and end date
    public List<IncomeDTO> getCurrentMonthIncomesForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();
        LocalDate now=LocalDate.now();
        LocalDate startDate=now.withDayOfMonth(1);
        LocalDate endDate=now.withDayOfMonth(now.lengthOfMonth());
        List<IncomeEntity> incomes=incomeRepository.findByProfileIdAndDateBetween(profile.getId(), startDate,endDate);
        return incomes.stream().map(this::toDTO).toList();
    }

    //delete income by id for current user
    public void deleteIncome(Long incomeId){
        ProfileEntity profile=profileService.getCurrentProfile();
        IncomeEntity entity= incomeRepository.findById(incomeId)
                .orElseThrow(()->new RuntimeException("Income not found"));
        //check the entity id is equals to the current profile id
        if(!entity.getProfile().getId().equals(profile.getId())){
            throw new RuntimeException("Unauthorized to delete this income");
        }
        incomeRepository.delete(entity);

    }
    //get latest 5 incomes for the current user
    public List<IncomeDTO> getLatest5IncomesForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();
        List<IncomeEntity> incomes=incomeRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return incomes.stream().map(this::toDTO).toList();

    }

    // get total incomes for the current user
    public BigDecimal getTotalIncomeForCurrentUSer(){
        ProfileEntity profile=profileService.getCurrentProfile();
        BigDecimal total=incomeRepository.findTotalExpenseByProfileId(profile.getId());
        return total!=null? total: BigDecimal.ZERO;
    }
    //filter incomes
    public List<IncomeDTO> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort){
        ProfileEntity profile=profileService.getCurrentProfile();
        List<IncomeEntity> list=incomeRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(),startDate,endDate,keyword,sort);
        return list.stream().map(this::toDTO).toList();
    }

    //helper methods
    private IncomeEntity toEntity(IncomeDTO incomeDTO, ProfileEntity profile, CategoryEntity category){
        return IncomeEntity.builder()
                .name(incomeDTO.getName())
                .icon(incomeDTO.getIcon())
                .amount(incomeDTO.getAmount())
                .date(incomeDTO.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private IncomeDTO toDTO(IncomeEntity incomeEntity){
        return IncomeDTO.builder()
                .id(incomeEntity.getId())
                .amount(incomeEntity.getAmount())
                .icon(incomeEntity.getIcon())
                .name(incomeEntity.getName())
                .date(incomeEntity.getDate())
                .categoryId(incomeEntity.getCategory() !=null ? incomeEntity.getCategory().getId(): null)
                .categoryName(incomeEntity.getCategory() !=null ? incomeEntity.getCategory().getName(): "N/A")
                .createdAt(incomeEntity.getCreatedAt())
                .updatedAt(incomeEntity.getUpdatedAt())
                .build();
    }



}
