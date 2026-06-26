package com.sundhar.moneymanager.controller;

import com.sundhar.moneymanager.dto.ExpenseDTO;
import com.sundhar.moneymanager.dto.IncomeDTO;
import com.sundhar.moneymanager.service.ExcelService;
import com.sundhar.moneymanager.service.ExpenseService;
import com.sundhar.moneymanager.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {
    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @GetMapping("/download/income")
    public void downloadIncomeExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition","attachment; filename=income.xlsx");
        excelService.writeIncomesToExcel(response.getOutputStream(),incomeService.getCurrentMonthIncomesForCurrentUser());

    }

    @GetMapping("/download/expense")
    public void downloadExpenseExcel(HttpServletResponse response) throws IOException{
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition","attachment; filename=expense.xlsx");
        excelService.writeExpensesToExcel(response.getOutputStream(),expenseService.getCurrentMonthExpensesForCurrentUser());

    }

    @GetMapping("/download/filtered")
    public void downloadFilteredExcel(
            @RequestParam String type,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) String sortOrder,
            HttpServletResponse response) throws IOException {

        LocalDate finalStartDate = startDate != null ? startDate : LocalDate.MIN;
        LocalDate finalEndDate = endDate != null ? endDate : LocalDate.now();
        String finalKeyword = keyword != null ? keyword : "";
        String finalSortField = sortField != null ? sortField : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, finalSortField);

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=filtered_" + type + "_report.xlsx");

        if ("income".equalsIgnoreCase(type)) {
            List<IncomeDTO> incomes = incomeService.filterIncomes(finalStartDate, finalEndDate, finalKeyword, sort);
            excelService.writeIncomesToExcel(response.getOutputStream(), incomes);
        } else if ("expense".equalsIgnoreCase(type)) {
            List<ExpenseDTO> expenses = expenseService.filterExpenses(finalStartDate, finalEndDate, finalKeyword, sort);
            excelService.writeExpensesToExcel(response.getOutputStream(), expenses);
        }
    }
}
