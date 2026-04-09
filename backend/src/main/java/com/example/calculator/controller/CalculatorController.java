package com.example.calculator.controller;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*")
public class CalculatorController {

    private final List<String> history = new ArrayList<>();

    @PostMapping("/calculate")
    public Map<String, Object> calculate(@RequestBody Map<String, String> request) {
        String expressionStr = request.get("expression");
        try {
            Expression expression = new ExpressionBuilder(expressionStr).build();
            double result = expression.evaluate();
            String historyItem = expressionStr + " = " + result;
            history.add(0, historyItem);
            if (history.size() > 50) history.remove(50);
            
            return Map.of(
                "result", result,
                "status", "success"
            );
        } catch (Exception e) {
            return Map.of(
                "error", "Invalid expression: " + e.getMessage(),
                "status", "error"
            );
        }
    }

    @GetMapping("/history")
    public List<String> getHistory() {
        return history;
    }

    @DeleteMapping("/history")
    public void clearHistory() {
        history.clear();
    }
}
