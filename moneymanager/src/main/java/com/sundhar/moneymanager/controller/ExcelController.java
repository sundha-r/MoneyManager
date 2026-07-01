package com.sundhar.moneymanager.controller;

import com.sundhar.moneymanager.service.ExcelService;
import com.sundhar.moneymanager.service.ExpenseService;
import com.sundhar.moneymanager.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;

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
            @RequestParam(required = false) String type,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) String sortOrder,
            HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        LocalDate finalStartDate = startDate != null ? startDate : LocalDate.of(1900, 1, 1);
        LocalDate finalEndDate = endDate != null ? endDate : LocalDate.now();
        String finalKeyword = keyword != null ? keyword : "";
        String finalSortField = sortField != null ? sortField : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, finalSortField);

        if ("income".equalsIgnoreCase(type)) {
            response.setHeader("Content-Disposition", "attachment; filename=filtered_income_report.xlsx");
            excelService.writeIncomesToExcel(response.getOutputStream(), incomeService.filterIncomes(finalStartDate, finalEndDate, finalKeyword, sort));
        } else if ("expense".equalsIgnoreCase(type)) {
            response.setHeader("Content-Disposition", "attachment; filename=filtered_expense_report.xlsx");
            excelService.writeExpensesToExcel(response.getOutputStream(), expenseService.filterExpenses(finalStartDate, finalEndDate, finalKeyword, sort));
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid type. Must be 'income' or 'expense'");
        }
    }
}
