package com.sundhar.moneymanager.service;

import com.sundhar.moneymanager.dto.ExpenseDTO;
import com.sundhar.moneymanager.dto.IncomeDTO;
import com.sundhar.moneymanager.dto.RecentTransactionDTO;
import com.sundhar.moneymanager.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProfileService profileService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    public Map<String,Object> getDashboard(){
       ProfileEntity profile =profileService.getCurrentProfile();

       //testing
        if(profile ==null){
            System.out.println("null");
        }
       Map<String,Object>returnValue=new LinkedHashMap<>();
       List<IncomeDTO> latestIncomes=incomeService.getLatest5IncomesForCurrentUser();
       List<ExpenseDTO> latestExpenses=expenseService.getLatest5ExpensesForCurrentUser();
       //In dashboard to need the both transtoin so we combine it
       //combine incomedto and expensedto into a single dto so we create the common dto for storing both which is recenttransactiondto
        //user stream.concat method to combine to stream into a single stream
      List<RecentTransactionDTO> recentTransaction= concat(latestIncomes.stream().map(income->
               RecentTransactionDTO.builder()
                       .id(income.getId())
                       .profileId(profile.getId())
                       .name(income.getName())
                       .amount(income.getAmount())
                       .date(income.getDate())
                       .icon(income.getIcon())
                       .type("income")
                       .createdAt(income.getCreatedAt())
                       .updatedAt(income.getUpdatedAt())
                       .build()),
               latestExpenses.stream().map(expense->
                       RecentTransactionDTO.builder()
                               .id(expense.getId())
                               .profileId(profile.getId())
                               .name(expense.getName())
                               .amount(expense.getAmount())
                               .date(expense.getDate())
                               .icon(expense.getIcon())
                               .type("expense")
                               .createdAt(expense.getCreatedAt())
                               .updatedAt(expense.getUpdatedAt())
                               .build())
       ).sorted((a,b)->{
           int cmp=b.getDate().compareTo(a.getDate());
           if(cmp==0 && a.getCreatedAt()!=null && b.getCreatedAt()!=null){
               return b.getCreatedAt().compareTo(a.getCreatedAt());
           }
           return cmp;
      }).toList();
    returnValue.put("totalBalance",incomeService.getTotalIncomeForCurrentUSer().subtract(expenseService.getTotalExpenceForCurrentUSer()));
    returnValue.put("totalIncome",incomeService.getTotalIncomeForCurrentUSer());
    returnValue.put("totalExpense",expenseService.getTotalExpenceForCurrentUSer());
    returnValue.put("recent5Expenses",latestExpenses);
    returnValue.put("recent5Incomes",latestIncomes);
    returnValue.put("recentTransactions",recentTransaction);

    return returnValue;
    }

}
